// ------- CONFIG -------
const SMUG = {
  NICKNAME: "vmpix",
  BASE_FOLDER: "Music/Archives/Bands",
};

// add logo URLs here when you have them
const LOGOS_MANUAL = {
  // "13 High": "https://vmpix.smugmug.com/Music/Band-Logos/i-XcmVMQF/0/M/i-XcmVMQF-M.jpg",
  "3FD":
    "https://photos.smugmug.com/photos/i-XcmVMQF/0/MkbVx2J7MZf5tQ3hrK2NJD7VMPNhWsvLhxWZghLKG/M/i-XcmVMQF-M.jpg",
  "Absence of the Sun":
    "https://photos.smugmug.com/Music/Band-Logos/i-j39NTr3/0/MV7cxTwRtrTBbjTsJ4XvfWsWL3kwqVNRLCjsjdrvL/S/Absence%20of%20the%20Sun-S.jpg",
  Acoustified:
    "https://photos.smugmug.com/Music/Band-Logos/i-PQJkT2p/0/K4wJX3zVsRWMpgFkMPqBcHntt3ctDwzm66QqX5Rbc/L/Acoustified-L.jpg",
  Afterblack:
    "https://photos.smugmug.com/Music/Band-Logos/i-5PtmNNj/0/LcQjGLX7tXDgNLDWvSBVNLPDRxwphpkVgkvncNQhK/X2/Afterblack-X2.jpg",
  Alions:
    "https://photos.smugmug.com/photos/i-fHWLWgV/0/L55C44pDMtzTkkdgsqntGkNz6WdXPcfntxSNpLpFP/S/i-fHWLWgV-S.jpg",
  "Alter the Tides":
    "https://photos.smugmug.com/photos/i-zDvGGj2/0/Kdw7D9CBqP86dX8TPTw6JzfMsTTptPCgvSn6zwFvp/S/i-zDvGGj2-S.png",
  Amanita:
    "https://photos.smugmug.com/photos/i-3dL8kfD/0/LPDQgzSHrGKZdQCJ5ShrWcgTrwkfZCqk8vWz2Pgmq/M/i-3dL8kfD-M.jpg",
  "Among Shadows":
    "https://photos.smugmug.com/photos/i-fWBP2sT/0/LF28tqDzLhNZgZ4T8djJr5QfLMHnTCfNgZ4xQkF7d/M/i-fWBP2sT-M.png",
  "Anatomy of a Thief":
    "https://photos.smugmug.com/photos/i-4kdTtbF/0/NhVsB8B2Q7vFLz2StNrdRBsv6KtDB8RRVsBpp7QtW/M/i-4kdTtbF-M.jpg",
  "Arta'Sin":
    "https://photos.smugmug.com/photos/i-9xxWH27/0/NNnQJg6LjjmvQ22nM5scBZTMX69Bd5xMvh3MLPrmx/M/i-9xxWH27-M.jpg",
  "Ascent to Power":
    "https://photos.smugmug.com/photos/i-hBxRmNx/0/NX8nPCFMf8LkzGxCds9pMFtJ29w8BjXwRnhpd4J8P/M/i-hBxRmNx-M.jpg",
  "Ashen Grey":
    "https://photos.smugmug.com/photos/i-mKTmsVz/0/LM98RHH956dBvGzQB4R3rkn8NfsSCRmStPbmBrh2m/M/i-mKTmsVz-M.jpg",
  "The Band Apollo":
    "https://photos.smugmug.com/Music/Band-Logos/i-LpTjbhd/0/L4mGjhgWzHLbrvFZtZqV7GPCxckxgFbfmT5KqfNFQ/X2/Band%20Apollo%2C%20The-X2.jpg",
  "Before the Betrayal":
    "https://photos.smugmug.com/Music/Band-Logos/i-dz9CmWC/0/M4b9tFqwPxC9gZw57xqbFbWp5SDhfCSvf6dxrqq3w/S/Before%20the%20Betrayal-S.jpg",
  "Black Box":
    "https://photos.smugmug.com/Music/Band-Logos/i-H2S4sbn/1/MTTk7wQCxW8dSX7J5Cq23rBCF96dJr2RQCwjxLSKT/X2/Black%20Box-X2.png",
  "Black Orange":
    "https://photos.smugmug.com/Music/Band-Logos/i-cNnJ8wz/0/NXFmZQh9jL7rpTbKwVMNbNKfd3NRq7K8qDmpNrfQq/X2/Black%20Orange-X2.jpg",
  "Black Vinegar":
    "https://photos.smugmug.com/Music/Band-Logos/i-jDghVqX/0/LRXQVGCrV9N5gdFtN7dDJZP2kVnmGwzP9GTSc3khf/L/Black%20Vinegar-L.jpg",
  "Blind Alibi":
    "https://photos.smugmug.com/Music/Band-Logos/i-9Jg3Q3G/0/MRZXmZZ6WjGjfdPjHXDzJf8PqdqsFXXjVNGPsnkfD/XL/Blind%20Alibi-XL.jpg",
  "Brand New Day":
    "https://photos.smugmug.com/Music/Band-Logos/i-L4m7swh/0/KZRJX3fsmfSkndnTHvVcZJLVf5hVnND49VVMhL92m/M/Brand%20New%20Day-M.jpg",
  "Broken Empire":
    "https://photos.smugmug.com/Music/Band-Logos/i-C8FkPgF/0/MBXk2dqwsbNPWqL8g6vWLhxvpvMRGxjKWKMVvQ7L9/L/Broken%20Empire-L.jpg",
  "Burning Time":
    "https://photos.smugmug.com/Music/Band-Logos/i-WChJBx8/0/KvpTfhC7qvpSFPT5Jr6TqmRRbRP2vZT2BmLhkKP9B/X2/Burning%20Time-X2.jpg",
  Cabal:
    "https://photos.smugmug.com/Music/Band-Logos/i-SLwBmDm/0/LWv4LCZQnKVJncSWH4BV86w3d6p9N5jbkdfxgJVdV/L/Cabal-L.jpg",
  "Calibrating the Calamity":
    "https://photos.smugmug.com/Music/Band-Logos/i-WpKSz88/0/KXFfPc7C9LrC8zH2t4nTXjbgHWzZ822dC3C8V7xwV/X2/Calibrating%20the%20Calamity-X2.jpg",
  "Capture the Sun":
    "https://photos.smugmug.com/Music/Band-Logos/i-rc3TQWw/0/MPJx4P8XJctjVbFW2fP96vKrKbxMmbhtfLbHnHHZj/L/Capture%20the%20Sun-L.jpg",
  Cavemanifesto:
    "https://photos.smugmug.com/Music/Band-Logos/i-bw9Mrv4/0/NGxqzcXwhS8V4Rm6FM2fHRVvdDZTJvQrm7tkVD98j/X2/Cavemanifesto-X2.jpg",
  "Civil Disturbance":
    "https://photos.smugmug.com/Music/Band-Logos/i-86SdM8F/0/KbpHMWnmwg2Z9VsN6NdnCxqWKfZHJphX6DtVbVfdM/M/Civil%20Disturbance-M.jpg",
  "Culling the Herd":
    "https://photos.smugmug.com/Music/Band-Logos/i-FzLL5rj/0/KF43JppWJDGz32bHf8VwGNHHkS3dLcX5jkP887wKB/M/Culling%20the%20Herd-M.jpg",
};

const REGION_IMAGES = {
  Local:
    "https://photos.smugmug.com/photos/i-SCzbkmj/1/KjHvTQVKnSz36KmxFS5c2MrtLhgm9Wc8mTghFb5R8/M/i-SCzbkmj-M.png",
  Regional:
    "https://photos.smugmug.com/photos/i-x5ncQx7/0/KcWqCsJ2cD94cz6fn2hwGxJjdMrbV6kSCXQ3ssGGw/S/i-x5ncQx7-S.jpg",
  National:
    "https://photos.smugmug.com/photos/i-3Kk8S5k/0/MznDGX8kBgM99xp6RKNKf4L4VHtnKrx3ghQLF85h7/S/i-3Kk8S5k-S.jpg",
  International:
    "https://photos.smugmug.com/photos/i-jqJ9RJd/0/LhpXpWQjX2Gbbh9nn4DsjxvwMWZBDWSMpSFRfPxJq/S/i-jqJ9RJd-S.jpg",
};

// region → letter → bands
const BANDS = {
  Local: {
    "O-C": [
      { name: "13 High" },
      { name: "3FD" },
      { name: "G-Gig" },
      { name: "Absence of the Sun" },
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
      { name: "Culling the Herd" },
    ],
    "D-G": [
      { name: "Dark Rain" },
      { name: "Dark River Rising" },
      { name: "Dave Osborne Band" },
      { name: "Dead In Your Eyes" },
      { name: "Dead Season" },
      { name: "Deadly Desire" },
      { name: "Death's Hand" },
      { name: "Destination: Void" },
      { name: "Devil's Nite Out" },
      { name: "Diablooo" },
      { name: "Dirty Rotten Winter" },
      { name: "Division North" },
      { name: "Drown in Filth" },
      { name: "Drunk in Public" },
      { name: "Echo Ritual" },
      { name: "El Grande" },
      { name: "Eldemur Krimm" },
      { name: "EndGame" },
      { name: "enigmatheory" },
      { name: "Enlightened StrangeLink" },
      { name: "Estabrook Inc" },
      { name: "Ethereal Rot" },
      { name: "Everything In-Between (EIB)" },
      { name: "Exclave" },
      { name: "The Fall of Babylon" },
      { name: "False Prophecy" },
      { name: "Fates Last Fight" },
      { name: "Fifth Freedom" },
      { name: "Forbidden Covenant" },
      { name: "Forward Momentum Prophecy (FMP)" },
      { name: "Four Feet Out" },
      { name: "Friday Night Lites" },
      { name: "The Great North" },
    ],
    "H-K": [
      { name: "The Hailing Tides" },
      { name: "Hatred Alive" },
      { name: "Heart Shaped Rock" },
      { name: "Hogan's Alley" },
      { name: "The Hollow Glow" },
      { name: "Holy Filth" },
      { name: "I, The Conqueror" },
      { name: "Identity Crisis" },
      { name: "In The Key of Suffering" },
      { name: "In the Kingdom of Nightmares" },
      { name: "In The Wind" },
      { name: "Inhuman Nature" },
      { name: "Interloc" },
      { name: "Iron Dynamite" },
      { name: "J-Dubb & CPE" },
      { name: "Juboybe" },
      { name: "Kamikaze Angel" },
      { name: "Ken/James Grimmsley (Acoustic)" },
      { name: "Killing Voorhees" },
      { name: "Kolossos" },
      { name: "Kryptosporidium" },
    ],
    "L-O": [
      { name: "Last Ones Alive" },
      { name: "Lawton" },
      { name: "Leach Field" },
      { name: "Left on the Outside (LOTO)" },
      { name: "Lemonade" },
      { name: "Lethal Creed" },
      { name: "Loki" },
      { name: "Manuel" },
      { name: "The Marble Socket" },
      { name: "Marshall Marquis Band" },
      { name: "Mechanical Banshees" },
      { name: "Metal Night" },
      { name: "Midnight Possession" },
      { name: "Mill Fire" },
      { name: "MindShiver" },
      { name: "Misantrophy" },
      { name: "Misgyded" },
      { name: "Morganite" },
      { name: "The Motor Creeps" },
      { name: "MOUND" },
      { name: "Murcielago" },
      { name: "My Tempered Soul" },
      { name: "NOBIS" },
      { name: "Notyetlost" },
      { name: "NOVA" },
      { name: "Objet" },
      { name: "Omniterra" },
    ],
    "P-S": [
      { name: "Paradise is Cancelled" },
      { name: "Pariah" },
      { name: "Peter Mack (Acoustic)" },
      { name: "Ponder" },
      { name: "Project 246" },
      { name: "Project 1313" },
      { name: "Pulsifier" },
      { name: "Pushing the Clock" },
      { name: "Rapper Ashley" },
      { name: "RC.Budaka" },
      { name: "Rebirth to Ends" },
      { name: "Render" },
      { name: "The Resistance" },
      { name: "Re:Vision" },
      { name: "Ripfence" },
      { name: "A River of Trees" },
      { name: "Roseview" },
      { name: "Ruckus" },
      { name: "RUIN" },
      { name: "Ryze Above" },
      { name: "Salvo" },
      { name: "Saturn's Return" },
      { name: "S.C.O.B.Y." },
      { name: "Scotty Saints and the True Believers" },
      { name: "Seasons of Ash" },
      { name: "Seattle" },
      { name: "Second Sight" },
      { name: "The Secret of Esrever" },
      { name: "Seize the Vatican" },
      { name: "Shy Green" },
      { name: "Sidecar Radio" },
      { name: "Sinfist" },
      { name: "Skrye" },
      { name: "Slampig" },
      { name: "Smothered Sun" },
      { name: "Society, Inc" },
      { name: "Something Stupid" },
      { name: "Sonic Libido" },
      { name: "Sound and Vice" },
      { name: "Spawn of Man" },
      { name: "Spectrobot" },
      { name: "Spidermilk" },
      { name: "Stillborn Condition" },
      { name: "Stoned Audio" },
      { name: "Stove Up" },
      { name: "Strict9" },
      { name: "Strictly Business" },
      { name: "The Struggle Within" },
      { name: "Sygnal to Noise" },
      { name: "Sythe" },
    ],
    "T-Z": [
      { name: "Tattered Hearts Club" },
      { name: "Terrible Old Man" },
      { name: "Thousand Mile Fall" },
      { name: "Throttle" },
      { name: "Thy Enemy" },
      { name: "Too Late the Hero" },
      { name: "Towers" },
      { name: "Toxic Cross" },
      { name: "A Traitor's Pact" },
      { name: "Trash Fire" },
      { name: "Trawl" },
      { name: "Tried and True" },
      { name: "Twin Grizzly" },
      { name: "Two Forty Gordy" },
      { name: "Typhoid Mary" },
      { name: "Uncertainty" },
      { name: "Uncle Jack" },
      { name: "The Unscarred" },
      { name: "The Vanityites" },
      { name: "VennDetta" },
      { name: "Viqueen" },
      { name: "The Waking Life" },
      { name: "War Criminal" },
      { name: "Weaoons at Hand" },
      { name: "Wecreatedthismonster" },
      { name: "When Muppetz Attack" },
      { name: "When The Dead Won't Die" },
      { name: "Worthy Bones" },
      { name: "Y Wouldn't U" },
      { name: "Years Go By" },
      { name: "Zealous Bellus" },
    ],
  },
  Regional: {
    "O-G": [
      { name: "4x4 Barracuda" },
      { name: "Aegri Somnia" },
      { name: "The Beast of Nod" },
      { name: "Begat the Nephilim" },
      { name: "Bottlefight" },
      { name: "Carnivora" },
      { name: "Carolina Burn" },
      { name: "Cougar Bait" },
      { name: "Cryptius" },
      { name: "Cytokine" },
      { name: "Dawn of End" },
      { name: "Dead By Wednesday" },
      { name: "Death Rattle" },
      { name: "Death Ray Vision" },
      { name: "Deathcode" },
      { name: "Diamond Edge" },
      { name: "Diecast" },
      { name: "Empty Halls" },
      { name: "Exhale" },
    ],
    "H-M": [
      { name: "Hope Before the Fall" },
      { name: "I-Invent" },
      { name: "Ire & Woe" },
      { name: "Iron Gate" },
      { name: "Leaving Eden" },
      { name: "Lone Wolf James" },
      { name: "Mammothor" },
      { name: "Manifest" },
      { name: "Mindset-X" },
      { name: "Muckler's Circle" },
      { name: "My Missing Half" },
    ],
    "N-S": [
      { name: "No Room To Breathe" },
      { name: "Novus Dae" },
      { name: "Pistol Shot Gypsy" },
      { name: "Prospect Hill" },
      { name: "Puddles of Joy" },
      { name: "Reaver" },
      { name: "Renegade Cartel" },
      { name: "SEXcoffee" },
      { name: "SIXTEENx20" },
      { name: "Sonic Pulse" },
      { name: "Stand Abandoned" },
    ],
    "T-Z": [
      { name: "Tactiles" },
      { name: "Time Out Timmy" },
      { name: "TREE" },
      { name: "Voices of the Dead" },
      { name: "VRSA" },
      { name: "Widow Sunday" },
      { name: "Wreckless Child" },
    ],
  },
  National: {
    "O-G": [
      { name: "10 Years" },
      { name: "Adema" },
      { name: "Aerosmith" },
      { name: "All That Remains" },
      { name: "Almost Accounted For" },
      { name: "Alter Bridge" },
      { name: "Avenged Sevenfolkd" },
      { name: "AWOLNATION" },
      { name: "Bam Margera-Fuckface Unstoppable" },
      { name: "Bastardane" },
      { name: "Beartooth" },
      { name: "Black Stone Cherry" },
      { name: "Bonded by Blood" },
      { name: "Brett Young" },
      { name: "Buckcherry" },
      { name: "Burden of the Sky" },
      { name: "Butcher Babies" },
      { name: "Chevelle" },
      { name: "Cliver" },
      { name: "Clutch" },
      { name: "Core" },
      { name: "Corrosion of Conformity" },
      { name: "Dark Sky Choir" },
      { name: "Devil You Know" },
      { name: "Devour the Day" },
      { name: "Dillinger Escape Plan" },
      { name: "Disturbed" },
      { name: "Eric Church" },
      { name: "Eva Under Fire" },
      { name: "Evanescence" },
      { name: "Extreme" },
      { name: "Eye Empire" },
      { name: "Fever 333" },
      { name: "Filmore" },
      { name: "First Jason/Ari Lehman" },
      { name: "Fozzy" },
      { name: "Godsmack" },
      { name: "GFM" },
    ],
    "H-M": [
      { name: "Hatebreed" },
      { name: "Hed-PE" },
      { name: "Hell or Highwater" },
      { name: "Hellyeah" },
      { name: "I, Prevail" },
      { name: "Ill Nino" },
      { name: "Imagine Dragons" },
      { name: "In This Moment" },
      { name: "Incite" },
      { name: "Janus" },
      { name: "Josey Scott Band" },
      { name: "Joyous Wolf" },
      { name: "Killswitch Engage" },
      { name: "KrashKarma" },
      { name: "Kyng" },
      { name: "Lamb of God" },
      { name: "Lody Kong" },
      { name: "Losing September" },
      { name: "Maddie & Tae" },
      { name: "Mastodon" },
      { name: "Memphis May Fire" },
      { name: "Middle Class Rut" },
      { name: "Modern Day Outlaw" },
      { name: "Mushroomhead" },
    ],
    "N-S": [
      { name: "The Nocturnal Affair" },
      { name: "Nonpoint" },
      { name: "Octobrists" },
      { name: "Papa Roach" },
      { name: "Powerman 5000" },
      { name: "Rob Zombie" },
      { name: "Sevendust" },
      { name: "Shadowplay" },
      { name: "Slash/Myles Kennedy" },
      { name: "SoiL" },
      { name: "Soulfly" },
      { name: "Starset" },
      { name: "Stone Sour" },
      { name: "Sykosis" },
    ],
    "T-Z": [
      { name: "Taproot" },
      { name: "Texas Hippie Coalition" },
      { name: "Thrashole" },
      { name: "Threatpoint" },
      { name: "Through Fire" },
      { name: "Trans-Siberian Orchestra" },
      { name: "Tremonti" },
      { name: "Trivium" },
      { name: "Ultra Major" },
      { name: "Unlocking the Truth" },
      { name: "Unsaid Fate" },
      { name: "VentanA" },
      { name: "Wayland" },
      { name: "We Came As Romans" },
      { name: "Wikkid Witch" },
    ],
  },
  International: {
    "All": [
      { name: "The Agonist" },
  { name: "Amon Amarth" },
  { name: "Avatar" },
  { name: "Blackguard" },
  { name: "Crown Lands" },
  { name: "Deep Purple" },
  { name: "In Flames" },
  { name: "Kittie" },
  { name: "Lacuna Coil" },
  { name: "Seether" },
  { name: "Threat Signal" },
  { name: "Volbeat" }
    ]
  },
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
    resultsEl.innerHTML =
      '<div class="empty">No bands in this group yet.</div>';
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
      none.textContent = "N/A";
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
      img.style.height = "200px"; // adjust size as you like
      img.style.objectFit = "contain";
      img.style.display = "block";
      regionSum.appendChild(img);
    } else {
      regionSum.textContent = region; // fallback for any future regions
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
      if (
        letter !== "O-C" &&
        letter !== "O-G" &&
        letter !== "D-G" &&
        letter !== "H-K" &&
        letter !== "H-M" &&
        letter !== "L-O" &&
        letter !== "N-S" &&
        letter !== "P-S" &&
        letter !== "T-Z" &&
        letter !== "All"
      ) {
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
            btn.addEventListener("click", () =>
              showBandCard(region, letter, b),
            );
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
