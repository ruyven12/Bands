// ------- CONFIG -------
const SMUG = {
  NICKNAME: "vmpix",
  BASE_FOLDER: "Music/Archives/Bands"
};

// add logo URLs here when you have them
const LOGOS_MANUAL = {
  // "13 High": "https://vmpix.smugmug.com/Music/Band-Logos/i-XcmVMQF/0/M/i-XcmVMQF-M.jpg",
  "3FD": "https://photos.smugmug.com/photos/i-XcmVMQF/0/MkbVx2J7MZf5tQ3hrK2NJD7VMPNhWsvLhxWZghLKG/M/i-XcmVMQF-M.jpg",
  "Acoustified": "https://photos.smugmug.com/photos/i-PQJkT2p/0/MZMn3LDBn4Sjgz8zrBChKJ7KsxfB8fhHnRNvJWBwG/M/i-PQJkT2p-M.jpg",
  "Afterblack": "https://photos.smugmug.com/photos/i-5PtmNNj/0/KW6WhmQmsnsTJH8Lbsjfvkwq4wfVnrPcSSSXbmHSc/M/i-5PtmNNj-M.jpg",
  "Alions": "https://photos.smugmug.com/photos/i-fHWLWgV/0/L55C44pDMtzTkkdgsqntGkNz6WdXPcfntxSNpLpFP/S/i-fHWLWgV-S.jpg",
  "Alter the Tides": "https://photos.smugmug.com/photos/i-zDvGGj2/0/Kdw7D9CBqP86dX8TPTw6JzfMsTTptPCgvSn6zwFvp/S/i-zDvGGj2-S.png",
  "Amanita": "https://photos.smugmug.com/photos/i-3dL8kfD/0/LPDQgzSHrGKZdQCJ5ShrWcgTrwkfZCqk8vWz2Pgmq/M/i-3dL8kfD-M.jpg",
};

const REGION_IMAGES = {
  Local: "https://photos.smugmug.com/photos/i-SCzbkmj/1/KjHvTQVKnSz36KmxFS5c2MrtLhgm9Wc8mTghFb5R8/M/i-SCzbkmj-M.png",
  Regional: "https://photos.smugmug.com/photos/i-x5ncQx7/0/KcWqCsJ2cD94cz6fn2hwGxJjdMrbV6kSCXQ3ssGGw/S/i-x5ncQx7-S.jpg",
  National: "https://photos.smugmug.com/photos/i-3Kk8S5k/0/MznDGX8kBgM99xp6RKNKf4L4VHtnKrx3ghQLF85h7/S/i-3Kk8S5k-S.jpg",
  International: "https://photos.smugmug.com/photos/i-jqJ9RJd/0/LhpXpWQjX2Gbbh9nn4DsjxvwMWZBDWSMpSFRfPxJq/S/i-jqJ9RJd-S.jpg"
};

// region → letter → bands
const BANDS = {
  Local: {
    "O-C": [
      { name: "13 High" },
      { name: "3FD" },
	    { name: "G-Gig" },
      { name: "Acoustified" },
      { name: "Afterblack" },
      { name: "Alions" },
      { name: "Alter the Tides" },
      { name: "Amanita" },
      { name: "Among Shadows" },
      { name: "Anatomy of a Thief" },
      { name: "Angel Slayer" },
      { name: "Arta'Sin" },
      { name: "Ascent to Power" },
      { name: "Ashe Madness" },
      { name: "Ashen Grey" },
      { name: "Audio Apocalypse" },
      { name: "Badtude" },
      { name: "The Band Apollo" },  
      { name: "Battery Steele" },
      { name: "Beautiful Pain" },
      { name: "Before the Betrayal" },
      { name: "Beyond the Fall" },
      { name: "Big Meat Hammer" },
      { name: "Black Box" },
      { name: "Black Orange" },
      { name: "Black Vinegar" },
      { name: "Blind Alibi" },
      { name: "Bloodborn" },
      { name: "Brand New Day" },
      { name: "Break The Skin" },
      { name: "BreakThrough" },
      { name: "Broken Empire" },
      { name: "The Burial Curse" },
      { name: "Burning Time" },
      { name: "Cabal" },
      { name: "Calibrating the Calamity" },
      { name: "Capture the Sun" },
      { name: "Cavemanifesto" },
      { name: "Cheers to Verona" },
      { name: "Civil Disturbance" },
      { name: "Clapping in Irons" },
      { name: "Conscious Cadaver" },
      { name: "Corn Borer" },
      { name: "Cover One Eye" },
      { name: "Cradle II Grave" },
      { name: "Creatures" },
      { name: "Cryptid Slaughter" },
      { name: "Culling the Herd" }
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
    link.textContent = bandDisplay;

    card.append(thumb, title, link);
    resultsEl.appendChild(card);
  });
}

function buildTree() {
  treeEl.innerHTML = "";

  Object.entries(BANDS).forEach(([region, letters]) => {
    const regionDet = document.createElement("details");
    regionDet.className = "region";

    // summary with image for regions
    const regionSum = document.createElement("summary");
    const imgSrc = REGION_IMAGES[region];
    if (imgSrc) {
      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = region;
      img.style.height = "200px";         // adjust size as you like
      img.style.objectFit = "contain";
      img.style.display = "block";
      regionSum.appendChild(img);
    } else {
      regionSum.textContent = region;    // fallback for any future regions
    }
    regionDet.appendChild(regionSum);

    // letters
    Object.entries(letters).forEach(([letter, bands]) => {
      const letterDet = document.createElement("details");
      letterDet.className = "letter";

      const letterSum = document.createElement("summary");
      letterSum.textContent = letter;

      // clicking a letter (e.g. O-C) shows ALL bands on the right
      letterSum.addEventListener("click", () => {
        setTimeout(() => showLetterBands(region, letter, bands), 0);
      });

      letterDet.appendChild(letterSum);

      // keep your rule: only non–O-C letters list individual band buttons
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

buildTree();
bindFilter();
