// ------- CONFIG -------
const SMUG = {
  NICKNAME: "vmpix",
  BASE_FOLDER: "Music/Archives/Bands"
};

// add logo URLs here when you have them
const LOGOS_MANUAL = {
  // "13 High": "https://vmpix.smugmug.com/Music/Band-Logos/i-XcmVMQF/0/M/i-XcmVMQF-M.jpg",
  "3FD": "https://photos.smugmug.com/photos/i-XcmVMQF/0/MkbVx2J7MZf5tQ3hrK2NJD7VMPNhWsvLhxWZghLKG/M/i-XcmVMQF-M.jpg",
};

// region → letter → bands
const BANDS = {
  Local: {
    "O-C": [
      { name: "13 High" },
      { name: "3FD" }
	  { name: "G-Gig" }	
    ],
    "D-G": [],
    "H-K": [],
    "L-O": [],
    "P-S": [],
    "T-Z": []
  },
  Regional: { "O-C": [], "D-G": [], "H-K": [], "L-O": [], "P-S": [], "T-Z": [] },
  National: { "O-C": [], "D-G": [], "H-K": [], "L-O": [], "P-S": [], "T-Z": [] },
  International: { "O-C": [], "D-G": [], "H-K": [], "L-O": [], "P-S": [], "T-Z": [] }
};
// ------- /CONFIG -------

const treeEl = document.getElementById("tree");
const resultsEl = document.getElementById("results");
const crumbsEl = document.getElementById("crumbs");
const statusEl = document.getElementById("status");
const filterInput = document.getElementById("filterInput");

const toSlug = (s) =>
  (s || "")
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]+/gi, "")
    .replace(/\s+/g, "-")
    .toLowerCase();

function resolveLogoUrl(bandName) {
  const slug = toSlug(bandName);
  return LOGOS_MANUAL[bandName] || LOGOS_MANUAL[slug] || "";
}

function showBandCard(region, letter, bandObj) {
  const bandDisplay = bandObj.name;
  const bandFolder = bandObj.folder || toSlug(bandDisplay);
  const bandUrl = `https://${SMUG.NICKNAME}.smugmug.com/${SMUG.BASE_FOLDER}/${region}/${bandFolder}`;
  const logoUrl = resolveLogoUrl(bandDisplay);

  crumbsEl.textContent = `${region} › ${letter} › ${bandDisplay}`;
  resultsEl.innerHTML = "";

  const card = document.createElement("article");
  card.className = "card";

  const thumb = document.createElement("div");
  thumb.className = "thumb";

  if (logoUrl) {
    const img = document.createElement("img");
    img.src = logoUrl;
    img.alt = bandDisplay + " logo";
    thumb.appendChild(img);
  } else {
    const none = document.createElement("div");
    none.className = "empty";
    none.textContent = "Add this band's logo in LOGOS_MANUAL.";
    thumb.appendChild(none);
  }

  const title = document.createElement("h3");
  title.textContent = bandDisplay;

  const link = document.createElement("a");
  link.className = "small-link";
  link.href = bandUrl;
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = "Open band page ↗";

  card.append(thumb, title, link);
  resultsEl.appendChild(card);
}

// show ALL bands in a letter group
function showLetterBands(region, letter, bandsArr) {
  crumbsEl.textContent = `${region} › ${letter}`;
  resultsEl.innerHTML = "";

  if (!bandsArr.length) {
    resultsEl.innerHTML = '<div class="empty">No bands in this group yet.</div>';
    return;
  }

  bandsArr.forEach((bandObj) => {
    const bandDisplay = bandObj.name;
    const bandFolder = bandObj.folder || toSlug(bandDisplay);
    const bandUrl = `https://${SMUG.NICKNAME}.smugmug.com/${SMUG.BASE_FOLDER}/${region}/${bandFolder}`;
    const logoUrl = resolveLogoUrl(bandDisplay);

    const card = document.createElement("article");
    card.className = "card";

    const thumb = document.createElement("div");
    thumb.className = "thumb";

    if (logoUrl) {
      const img = document.createElement("img");
      img.src = logoUrl;
      img.alt = bandDisplay + " logo";
      thumb.appendChild(img);
    } else {
      const none = document.createElement("div");
      none.className = "empty";
      none.textContent = "No logo for this band.";
      thumb.appendChild(none);
    }

    const title = document.createElement("h3");
    title.textContent = bandDisplay;

    const link = document.createElement("a");
    link.className = "small-link";
    link.href = bandUrl;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Open band page ↗";

    card.append(thumb, title, link);
    resultsEl.appendChild(card);
  });
}

function buildTree() {
  treeEl.innerHTML = "";

  Object.entries(BANDS).forEach(([region, letters]) => {
    const regionDet = document.createElement("details");
    regionDet.className = "region";

    const regionSum = document.createElement("summary");
    regionSum.textContent = region;
    regionDet.appendChild(regionSum);

    Object.entries(letters).forEach(([letter, bands]) => {
      const letterDet = document.createElement("details");
      letterDet.className = "letter";

      const letterSum = document.createElement("summary");
      letterSum.textContent = letter;

      // 👉 If this is O-C, show all bands on click and DON'T render per-band buttons
      letterSum.addEventListener("click", () => {
        setTimeout(() => showLetterBands(region, letter, bands), 0);
      });

      letterDet.appendChild(letterSum);

      // For NON O-C letters, still show individual band buttons
      if (letter !== "O-C") {
        const ul = document.createElement("ul");
        if (!bands.length) {
          const li = document.createElement("li");
          li.textContent = `(Add bands for ${region} • ${letter})`;
          ul.appendChild(li);
        } else {
          bands.forEach((b) => {
            const li = document.createElement("li");
            const btn = document.createElement("button");
            btn.textContent = b.name;
            btn.addEventListener("click", () => showBandCard(region, letter, b));
            li.appendChild(btn);
            ul.appendChild(li);
          });
        }
        letterDet.appendChild(ul);
      }

      regionDet.appendChild(letterDet);
    });

    treeEl.appendChild(regionDet);
  });

  statusEl.textContent = "Static mode (GitHub hosted). Edit in script.js.";
}

function bindFilter() {
  if (!filterInput) return;
  filterInput.addEventListener("input", () => {
    const q = filterInput.value.toLowerCase();
    treeEl.querySelectorAll("li").forEach((li) => {
      li.style.display = li.textContent.toLowerCase().includes(q) ? "" : "none";
    });
  });
}

buildTree();
bindFilter();
