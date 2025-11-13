const express = require("express");
const app = express();

// 1) your existing Bands sheet (this one you already had)
const BANDS_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTdi19qTDyPeBGzq0PpkdlDS_bNg34XpdRiXy8aBa-Jlu-jg2Wzkj1SnLXtRVFU4TGOh5KHJPK8Lwhc/pub?gid=0&single=true&output=csv";

// 2) your Shows sheet
const SHOWS_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTdi19qTDyPeBGzq0PpkdlDS_bNg34XpdRiXy8aBa-Jlu-jg2Wzkj1SnLXtRVFU4TGOh5KHJPK8Lwhc/pub?gid=1306635885&single=true&output=csv";

// SmugMug API key you were using
const SMUG_API_KEY = "SQLhhqgXZJd7MzqgVX563bkbjdCfXt9T";

function allowCors(res) {
  res.set("Access-Control-Allow-Origin", "*");
}

// ================== BANDS CSV ==================
app.get("/sheet/bands", async (req, res) => {
  try {
    const r = await fetch(BANDS_SHEET_URL);
    const csv = await r.text();
    allowCors(res);
    res.type("text/plain").send(csv);
  } catch (err) {
    console.error("sheet /bands fetch failed:", err);
    allowCors(res);
    res.status(500).send("sheet error");
  }
});

// ================== SHOWS CSV ==================
app.get("/sheet/shows", async (req, res) => {
  try {
    const r = await fetch(SHOWS_SHEET_URL);
    const csv = await r.text();
    allowCors(res);
    res.type("text/plain").send(csv);
  } catch (err) {
    console.error("sheet /shows fetch failed:", err);
    allowCors(res);
    res.status(500).send("shows sheet error");
  }
});

// ================== IMAGE PROXY ==================
app.get("/show-poster", async (req, res) => {
  allowCors(res);

  const remoteUrl = req.query.url;
  if (!remoteUrl) {
    return res.status(400).send("missing url");
  }

  try {
    const upstream = await fetch(remoteUrl);
    if (!upstream.ok) {
      console.error("upstream not ok:", upstream.status, remoteUrl);
      return res.status(502).send("bad upstream");
    }

    const contentType = upstream.headers.get("content-type") || "image/jpeg";
    res.setHeader("Content-Type", contentType);

    const buf = Buffer.from(await upstream.arrayBuffer());
    res.send(buf);
  } catch (err) {
    console.error("proxy image error:", err);
    res.status(500).send("error");
  }
});

// ================== SMARTER SMUG FOLDER → albums ==================
app.get("/smug/:slug", async (req, res) => {
  const slug = req.params.slug;
  const folderFromSheet = req.query.folder;

  // the base you were using
  const base =
    "https://api.smugmug.com/api/v2/folder/user/vmpix/Music/Archives/Bands/Local";

  const candidates = [];

  if (folderFromSheet) {
    candidates.push(folderFromSheet);
    candidates.push(folderFromSheet.replace(/\s+/g, "-"));
  }

  const rawLower = slug.replace(/-/g, " ");
  const words = rawLower.split(" ").filter(Boolean);

  const SMALL = new Set([
    "of",
    "the",
    "and",
    "a",
    "an",
    "to",
    "for",
    "at",
    "by",
    "with",
    "in",
  ]);

  const titleSmart = words
    .map((w, i) => {
      const lw = w.toLowerCase();
      if (i !== 0 && SMALL.has(lw)) return lw;
      return lw.charAt(0).toUpperCase() + lw.slice(1);
    })
    .join(" ");

  const titleAll = words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const noSpaces = rawLower.replace(/\s+/g, "");
  const dashedSmart = titleSmart.replace(/\s+/g, "-");

  candidates.push(titleSmart, titleAll, rawLower, dashedSmart, noSpaces);

  let successData = null;
  let usedUrl = null;

  for (const name of candidates) {
    const url = `${base}/${encodeURIComponent(
      name
    )}!albums?APIKey=${SMUG_API_KEY}`;
    console.log("Trying:", url);
    try {
      const r = await fetch(url, {
        headers: {
          Accept: "application/json",
          "User-Agent": "SmugProxy/1.0",
        },
      });
      if (r.ok) {
        const data = await r.json();
        if (data && data.Response && Array.isArray(data.Response.Album)) {
          successData = data;
          usedUrl = url;
          break;
        }
      }
    } catch (err) {
      console.log("Error fetching", url, err.message);
    }
  }

  allowCors(res);
  if (successData) {
    successData._usedUrl = usedUrl;
    return res.json(successData);
  }

  res.json({
    Response: { Album: [] },
    info: `No albums found for slug=${slug} (tried: ${candidates.join(" | ")})`,
  });
});

// ================== SMUG ALBUM → photos (enriched with keywords) ==================
app.get("/smug/album/:albumKey", async (req, res) => {
  const { albumKey } = req.params;
  const count = req.query.count || 200;
  const start = req.query.start || 1;

  // 1) get the list of images in the album
  const albumListUrl = `https://api.smugmug.com/api/v2/album/${albumKey}!images?APIKey=${SMUG_API_KEY}&count=${count}&start=${start}`;

  try {
    const r = await fetch(albumListUrl, {
      headers: {
        Accept: "application/json",
        "User-Agent": "SmugProxy/1.0",
      },
    });
    const listData = await r.json();

    const images =
      (listData &&
        listData.Response &&
        (listData.Response.AlbumImage || listData.Response.Images)) ||
      [];

    // 2) fetch the real image (the one that actually has keywords) using img.Uri
    const enriched = await Promise.all(
      images.map(async (img) => {
        // SmugMug gave us the exact API path already
        const imgUri = img.Uri; // e.g. /api/v2/album/KCdQdZ/image/X3qfdbd-0
        if (!imgUri) {
          return img;
        }

        const imageDetailUrl = `https://api.smugmug.com${imgUri}?APIKey=${SMUG_API_KEY}&_verbosity=1&_expand=Keywords&_expand=KeywordArray`;

        try {
          const ir = await fetch(imageDetailUrl, {
            headers: {
              Accept: "application/json",
              "User-Agent": "SmugProxy/1.0",
            },
          });
          const idata = await ir.json();
          const detail =
            idata &&
            idata.Response &&
            (idata.Response.Image || idata.Response.AlbumImage);

          if (detail) {
            return {
              ...img,
              Keywords: detail.Keywords ?? img.Keywords,
              KeywordArray: detail.KeywordArray ?? img.KeywordArray,
            };
          }
        } catch (err) {
          console.error("error fetching image detail:", err);
        }

        return img;
      })
    );

    // 3) send it back in the same shape
    allowCors(res);
    return res.json({
      ...listData,
      Response: {
        ...(listData.Response || {}),
        AlbumImage: enriched,
      },
    });
  } catch (err) {
    console.error("error fetching album images:", err);
    allowCors(res);
    return res.status(500).json({ error: "album fetch failed" });
  }
});




const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server listening on http://localhost:" + PORT);
});
