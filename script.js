// ================== CONFIG ==================
const CSV_ENDPOINT = "http://localhost:3000/sheet/bands"
const SHOWS_ENDPOINT = "http://localhost:3000/sheet/shows"

const REGION_IMAGES = {
  Local:
    "https://photos.smugmug.com/photos/i-SCzbkmj/1/KjHvTQVKnSz36KmxFS5c2MrtLhgm9Wc8mTghFb5R8/M/i-SCzbkmj-M.png",
  Regional:
    "https://photos.smugmug.com/photos/i-x5ncQx7/0/MFxNbXRFkpx24fPVT5z8q76PMgKVWrcHx2X8d6xkN/X2/i-x5ncQx7-X2.jpg",
  National:
    "https://photos.smugmug.com/photos/i-3Kk8S5k/0/LHqPfJS5N5VhVtLxzQXpHBswLR2KR56tqVmQSTGXt/X2/i-3Kk8S5k-X2.jpg",
  International:
    "https://photos.smugmug.com/photos/i-jqJ9RJd/0/MN8NRZ8WvtkwFrRspBRHbCr7h7nLJfXZDpVbj25wq/X2/i-jqJ9RJd-X2.jpg",
}

// where each region actually lives on SmugMug
const REGION_FOLDER_BASE = {
  Local: "Music/Archives/Bands/Local", // this already works from CSV
  Regional: "Music/Archives/Bands/Regional",
  National: "Music/Archives/Bands/National",
  International: "Music/Archives/Bands/International",
}

// manual overrides if you ever want them
const POSTERS_MANUAL = {}

// global data
let BANDS = {}
let SHOWS = []

// remember last letter view for “back to bands”
let LAST_VIEW = null

// DOM refs
const treeEl = document.getElementById("tree")
const resultsEl = document.getElementById("results")
const crumbsEl = document.getElementById("crumbs")
const statusEl = document.getElementById("status")

// ----- top tabs (Bands / Shows) -----
function initTopTabs() {
  const tabsBar = document.createElement("div")
  tabsBar.className = "top-tabs"

  const tabs = [
    { id: "bands", label: "Bands" },
    { id: "shows", label: "Shows" },
  ]

  let currentTab = "bands"

  tabs.forEach((t, idx) => {
    const btn = document.createElement("button")
    btn.textContent = t.label
    btn.className = "top-tab" + (idx === 0 ? " active" : "")
    btn.addEventListener("click", () => {
      currentTab = t.id
      tabsBar
        .querySelectorAll(".top-tab")
        .forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      if (currentTab === "bands") {
        // reset styles that Shows view set
        resultsEl.style.display = ""
        resultsEl.style.width = ""
        buildTree()
        crumbsEl.textContent = "Select a band from the list."
        resultsEl.innerHTML = ""
      } else {
        // swap to the years list
        buildShowsYears()
        crumbsEl.textContent = "Select a year from the list."
        resultsEl.innerHTML = ""
      }
    })

    tabsBar.appendChild(btn)
  })

  // place it right AFTER <header> and BEFORE <div class="wrap">
  const headerEl = document.querySelector("header")
  const wrapEl = document.querySelector(".wrap")

  if (headerEl && wrapEl && wrapEl.parentNode === headerEl.parentNode) {
    headerEl.parentNode.insertBefore(tabsBar, wrapEl)
  } else {
    // fallback
    document.body.insertBefore(tabsBar, document.querySelector(".wrap"))
  }
}

// make left band tree stay put
if (treeEl) {
  treeEl.style.position = "sticky"
  treeEl.style.top = "0" // <-- adjust if you have a header, e.g. "70px"
  treeEl.style.alignSelf = "flex-start"
  treeEl.style.maxHeight = "100vh" // <-- keeps it from growing past viewport
  treeEl.style.overflowY = "auto"
}

// helper
const toSlug = (s) =>
  (s || "")
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]+/gi, "")
    .replace(/\s+/g, "-")
    .toLowerCase()

// =============== CSV helpers =================
function parseCsvLine(line) {
  const out = []
  let cur = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]

    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (ch === "," && !inQuotes) {
      out.push(cur.trim())
      cur = ""
    } else {
      cur += ch
    }
  }
  out.push(cur.trim())
  return out
}

// get all shows that match a given year using the CSV date field
function getShowsForYear(year) {
  const yr = Number(year)
  if (!SHOWS || !SHOWS.length) return []

  return SHOWS.filter((show) => {
    const raw = (show.date || show.show_date || "").trim()
    if (!raw) return false
    // expect format like "10/24/25" or "10/24/2025"
    const parts = raw.split("/")
    if (parts.length !== 3) return false
    let y = parts[2].trim()
    // turn "25" into 2025
    if (y.length === 2) {
      y = Number("20" + y)
    } else {
      y = Number(y)
    }
    return y === yr
  })
}

// =============== load bands from CSV =================
function loadBandsFromCsv() {
  return fetch(CSV_ENDPOINT)
    .then((r) => r.text())
    .then((text) => {
      if (!text.trim()) return {}

      const lines = text.split(/\r?\n/).filter((l) => l.trim())
      const headerLine = lines.shift()
      const header = headerLine.split(",").map((h) => h.trim().toLowerCase())

      const bandIdx = header.indexOf("band")
      const regionIdx = header.indexOf("region")
      const letterIdx = header.indexOf("letter")
      const smugFolderIdx = header.indexOf("smug_folder")
      const logoIdx = header.indexOf("logo_url")

      const locationIdx = header.indexOf("location")
      const stateIdx = header.indexOf("state")
      const countryIdx = header.indexOf("country")
      const statusIdx = header.indexOf("status")
      const vox1Idx = header.indexOf("vox_1")
      const vox2Idx = header.indexOf("vox_2")
      const vox3Idx = header.indexOf("vox_3")
      const guitar1Idx = header.indexOf("guitar_1")
      const guitar2Idx = header.indexOf("guitar_2")
      const guitar3Idx = header.indexOf("guitar_3")
      const bassIdx = header.indexOf("bass")
      const drumIdx = header.indexOf("drum")
      const past1Idx = header.indexOf("past_1")
      const past2Idx = header.indexOf("past_2")
      const past3Idx = header.indexOf("past_3")
      const past4Idx = header.indexOf("past_4")
      const past5Idx = header.indexOf("past_5")
      const past6Idx = header.indexOf("past_6")
      const totalSetsIdx = header.indexOf("total_sets")
      const setsArchiveIdx = header.indexOf("sets_archive")

      if (bandIdx === -1) {
        console.error("CSV must have a 'band' column.")
        return {}
      }

      function bucketFor(name) {
        if (!name) return "0-C"
        const c = name.trim().charAt(0).toUpperCase()
        if ("ABC0123456789".includes(c)) return "0-C"
        if ("DEFG".includes(c)) return "D-G"
        if ("HIJK".includes(c)) return "H-K"
        if ("LMNO".includes(c)) return "L-O"
        if ("PQRS".includes(c)) return "P-S"
        return "T-Z"
      }

      const built = {}

      lines.forEach((line) => {
        const cols = parseCsvLine(line)
        const name = (cols[bandIdx] || "").trim()
        if (!name) return

        // normalize/trim region
        const regionRaw =
          regionIdx !== -1 && cols[regionIdx] ? cols[regionIdx] : "Local"
        const region = regionRaw.trim() || "Local"

        // normalize/trim letter
        const letterRaw =
          letterIdx !== -1 && cols[letterIdx] ? cols[letterIdx] : ""
        const letter = letterRaw.trim() || bucketFor(name)

        // normalize/trim smug folder
        const smugFolder =
          smugFolderIdx !== -1 && cols[smugFolderIdx]
            ? cols[smugFolderIdx].trim()
            : ""

        const logoUrl =
          logoIdx !== -1 && cols[logoIdx] ? cols[logoIdx].trim() : ""

        const bandData = {
          name,
          smug_folder: smugFolder,
          logo_url: logoUrl,
          location: locationIdx !== -1 ? (cols[locationIdx] || "").trim() : "",
          state: stateIdx !== -1 ? (cols[stateIdx] || "").trim() : "",
          country: countryIdx !== -1 ? (cols[countryIdx] || "").trim() : "",
          status: statusIdx !== -1 ? (cols[statusIdx] || "").trim() : "",
          vox_1: vox1Idx !== -1 ? (cols[vox1Idx] || "").trim() : "",
          vox_2: vox2Idx !== -1 ? (cols[vox2Idx] || "").trim() : "",
          vox_3: vox3Idx !== -1 ? (cols[vox3Idx] || "").trim() : "",
          guitar_1: guitar1Idx !== -1 ? (cols[guitar1Idx] || "").trim() : "",
          guitar_2: guitar2Idx !== -1 ? (cols[guitar2Idx] || "").trim() : "",
          guitar_3: guitar3Idx !== -1 ? (cols[guitar3Idx] || "").trim() : "",
          bass: bassIdx !== -1 ? (cols[bassIdx] || "").trim() : "",
          drum: drumIdx !== -1 ? (cols[drumIdx] || "").trim() : "",
          past_1: past1Idx !== -1 ? (cols[past1Idx] || "").trim() : "",
          past_2: past2Idx !== -1 ? (cols[past2Idx] || "").trim() : "",
          past_3: past3Idx !== -1 ? (cols[past3Idx] || "").trim() : "",
          past_4: past4Idx !== -1 ? (cols[past4Idx] || "").trim() : "",
          past_5: past5Idx !== -1 ? (cols[past5Idx] || "").trim() : "",
          past_6: past6Idx !== -1 ? (cols[past6Idx] || "").trim() : "",
          // make sure these become numbers later
          total_sets:
            totalSetsIdx !== -1 ? (cols[totalSetsIdx] || "").trim() : "",
          sets_archive:
            setsArchiveIdx !== -1 ? (cols[setsArchiveIdx] || "").trim() : "",
        }

        if (!built[region]) built[region] = {}
        if (!built[region][letter]) built[region][letter] = []
        built[region][letter].push(bandData)
      })

      return built
    })
    .catch((err) => {
      console.error("Error loading bands CSV:", err)
      return {}
    })
}

// ---- SmugMug folder helpers ----

// find all band albums whose album name looks like this show's date
async function findAlbumsForShow(show) {
  const matches = []
  const rawDate = (show.date || show.show_date || "").trim()
  if (!rawDate) return matches

  // we’ll match both "10/24/25" and, if present, the 4-digit version "10/24/2025"
  let shortDate = rawDate
  let longDate = ""
  const parts = rawDate.split("/")
  if (parts.length === 3 && parts[2].length === 2) {
    longDate = `${parts[0]}/${parts[1]}/20${parts[2]}`
  }

  // walk every band we have, just like showBandCard() does
  for (const [region, letters] of Object.entries(BANDS)) {
    for (const [letter, bandArr] of Object.entries(letters)) {
      for (const bandObj of bandArr) {
        const bandName = bandObj.name
        const bandLogo = bandObj.logo_url || ""
        const smugFolder = (bandObj.smug_folder || "").trim()
        const nameSlug = toSlug(bandName)

        const candidates = []

        // CSV override – just the band folder name
        if (smugFolder) {
          candidates.push(smugFolder)
        }

        // guesses from band name (slug + raw), no region prefix
        if (nameSlug) {
          candidates.push(nameSlug)
        }
        if (bandName) {
          candidates.push(bandName)
        }

        let albums = []

        // try each candidate until we get albums
        for (const cand of candidates) {
          const cleanPath = cand.replace(/\/+/g, "/")
          const slug = toSlug(cleanPath || bandName)
          const url = `http://localhost:3000/smug/${encodeURIComponent(
            slug,
          )}?folder=${encodeURIComponent(cleanPath)}&count=100&start=1`

          try {
            const res = await fetch(url)
            const data = await res.json()
            const found =
              (data &&
                data.Response &&
                (data.Response.Album || data.Response.Albums)) ||
              []

            if (found.length) {
              albums = found
              break
            }
          } catch (err) {
            // ignore and try next
          }
        }

        if (!albums.length) continue

        // now filter albums by date in the name
        albums.forEach((alb) => {
          const name = (alb && alb.Name ? alb.Name : "").trim()
          if (!name) return

          const hasShort = shortDate && name.includes(shortDate)
          const hasLong = longDate && name.includes(longDate)

          if (hasShort || hasLong) {
            matches.push({
              bandName,
              bandLogo,
              albumName: name,
            })
          }
        })
      }
    }
  }

  return matches
}

// test helper: build { date: Set(bands) } using current data + album finder
async function buildShowDateBandIndex() {
  const index = {} // { "10/24/25": Set(["Trawl", "Re:Vision", ...]) }

  for (const show of SHOWS || []) {
    const date = (show.date || show.show_date || "").trim()
    if (!date) continue

    // use the same (slow-ish) finder we already wrote
    const matches = await findAlbumsForShow(show)

    // de-dupe by band name
    const bands = new Set()
    matches.forEach((m) => {
      if (m.bandName) bands.add(m.bandName)
    })

    if (!index[date]) {
      index[date] = new Set()
    }
    bands.forEach((b) => index[date].add(b))
  }

  // turn Sets into arrays so it's easy to inspect
  const printable = {}
  Object.keys(index).forEach((d) => {
    printable[d] = Array.from(index[d])
  })

  console.log("show-date → bands:", printable)
  return printable
}

// get all albums inside a SmugMug folder using the same pattern
// your code already uses in showBandCard(...)
async function fetchFolderAlbums(folderPath) {
  // make a slug the same way the band view does
  const baseSlug = toSlug(folderPath || "")

  const res = await fetch(
    `http://localhost:3000/smug/${encodeURIComponent(
      baseSlug,
    )}?folder=${encodeURIComponent(folderPath)}&count=200&start=1`,
  )
  const data = await res.json()

  // your /smug/... handler returns Response.Album
  const albums =
    (data && data.Response && (data.Response.Album || data.Response.Albums)) ||
    []

  return albums
}

// get ALL images from ONE album (paged) – same paging behavior as your album view
async function fetchAllAlbumImages(albumKey) {
  const all = []
  let start = 1
  let more = true

  while (more) {
    const res = await fetch(
      `http://localhost:3000/smug/album/${encodeURIComponent(
        albumKey,
      )}?count=200&start=${start}`,
    )
    const data = await res.json()
    const imgs =
      (data &&
        data.Response &&
        (data.Response.AlbumImage || data.Response.Images)) ||
      []
    all.push(...imgs)
    if (imgs.length === 200) {
      start += 200
    } else {
      more = false
    }
  }

  return all
}

// =============== load shows from CSV =================
function loadShowsFromCsv() {
  return fetch(SHOWS_ENDPOINT)
    .then((r) => r.text())
    .then((text) => {
      if (!text.trim()) return []

      const lines = text.split(/\r?\n/).filter((l) => l.trim())
      const headerLine = lines.shift()

      // use the same CSV parser we already defined above
      const header = parseCsvLine(headerLine).map((h) => h.trim())
      const headerLower = header.map((h) => h.toLowerCase())

      // find the “main” fields by name (case-insensitive)
      const nameIdx =
        headerLower.indexOf("show_name") !== -1
          ? headerLower.indexOf("show_name")
          : headerLower.indexOf("title")
      const urlIdx =
        headerLower.indexOf("show_url") !== -1
          ? headerLower.indexOf("show_url")
          : headerLower.indexOf("poster_url")
      const dateIdx =
        headerLower.indexOf("show_date") !== -1
          ? headerLower.indexOf("show_date")
          : headerLower.indexOf("date")
      const venueIdx = headerLower.indexOf("show_venue")
      const cityIdx =
        headerLower.indexOf("show_city") !== -1
          ? headerLower.indexOf("show_city")
          : headerLower.indexOf("city")
      const stateIdx =
        headerLower.indexOf("show_state") !== -1
          ? headerLower.indexOf("show_state")
          : headerLower.indexOf("state")

      const rows = []

      lines.forEach((line) => {
        const cols = parseCsvLine(line)

        // start with the “known” fields
        const row = {
          title: nameIdx !== -1 ? (cols[nameIdx] || "").trim() : "",
          poster_url: urlIdx !== -1 ? (cols[urlIdx] || "").trim() : "",
          date: dateIdx !== -1 ? (cols[dateIdx] || "").trim() : "",
          venue: venueIdx !== -1 ? (cols[venueIdx] || "").trim() : "",
          city: cityIdx !== -1 ? (cols[cityIdx] || "").trim() : "",
          state: stateIdx !== -1 ? (cols[stateIdx] || "").trim() : "",
        }

        // now keep EVERY other column too (band_1 … band_20, etc.)
        header.forEach((colName, i) => {
          const key = colName.toLowerCase()
          const val = (cols[i] || "").trim()
          // don’t overwrite the ones we set above, but do keep all band_*
          if (typeof row[key] === "undefined") {
            row[key] = val
          }
        })

        rows.push(row)
      })

      return rows
    })
    .catch((err) => {
      console.error("Error loading shows CSV:", err)
      return []
    })
}

// =============== small show helpers ===============
function findShowForAlbumName(albName) {
  if (!albName) return null
  if (!SHOWS.length) return null

  const clean = albName.trim().toLowerCase()
  for (const show of SHOWS) {
    const title = (show.title || "").trim().toLowerCase()
    const date = (show.date || "").trim().toLowerCase()
    if ((date && clean.includes(date)) || (title && clean.includes(title))) {
      return show
    }
  }
  return null
}

function findPosterForAlbumName(albName) {
  const show = findShowForAlbumName(albName)
  if (!show) return null
  return show.poster_url || show.show_url || show.image || null
}

function formatShowDate(raw) {
  if (!raw) return ""
  const parts = raw.split("/")
  if (parts.length !== 3) return raw
  let [m, d, y] = parts.map((p) => p.trim())

  m = parseInt(m, 10)
  d = parseInt(d, 10)
  if (y.length === 2) {
    y = Number("20" + y)
  } else {
    y = parseInt(y, 10)
  }

  const monthNames = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  function ordinal(n) {
    const s = ["th", "st", "nd", "rd"]
    const v = n % 100
    return n + (s[(v - 20) % 10] || s[v] || s[0])
  }

  if (!monthNames[m] || !d || !y) return raw
  return `${monthNames[m]} ${ordinal(d)}, ${y}`
}

// =============== letter view ===============
function showLetter(region, letter) {
  // remember what we opened so "back to bands" works
  LAST_VIEW = { type: "letter", region, letter }

  const bandsArr = (BANDS[region] && BANDS[region][letter]) || []

  // HEADER + LEGEND (one time)
  crumbsEl.innerHTML = ""

  const crumbText = document.createElement("span")
  crumbText.textContent = `${region} › ${letter}`
  crumbsEl.appendChild(crumbText)

  const legend = document.createElement("div")
  legend.style.display = "inline-flex"
  legend.style.gap = "12px"
  legend.style.alignItems = "center"
  legend.style.marginLeft = "200px" // keep your left margin
  crumbsEl.appendChild(legend)

  function makeLegendItem(color, label) {
    const wrap = document.createElement("div")
    wrap.style.display = "flex"
    wrap.style.alignItems = "center"
    wrap.style.gap = "6px"

    const box = document.createElement("div")
    box.style.width = "22px"
    box.style.height = "14px"
    box.style.border = `4px solid ${color}`
    box.style.borderRadius = "6px"
    box.style.background = "transparent"

    const txt = document.createElement("span")
    txt.textContent = `= ${label}`
    txt.style.fontSize = "12px"
    txt.style.color = "#fff"

    wrap.appendChild(box)
    wrap.appendChild(txt)
    return wrap
  }

  // exactly 3 items — no extras
  legend.appendChild(
    makeLegendItem("#4a0000", "Nothing yet, keep checking back"),
  )
  legend.appendChild(makeLegendItem("#d1a91b", "In Progress"))
  legend.appendChild(makeLegendItem("#0a7f3a", "Fully updated/completed"))

  // now clear the results area for the cards
  resultsEl.innerHTML = ""

  if (!bandsArr.length) {
    resultsEl.appendChild(document.createTextNode("No bands in this group."))
    return
  }

  bandsArr.forEach((bandObj) => {
    const bandDisplay = bandObj.name
    const logoUrl = bandObj.logo_url

    // NEW: read the two numbers safely
    const total = Number(bandObj.total_sets) || 0
    const archived = Number(bandObj.sets_archive) || 0

    // make the card
    const card = document.createElement("article")
    card.className = "card"

    // decide color class
    let statusClass = "card-empty"
    if (total === 0 && archived === 0) {
      statusClass = "card-empty"
    } else if (archived > 0 && archived < total) {
      statusClass = "card-partial"
    } else if (total > 0 && archived === total) {
      statusClass = "card-complete"
    }
    card.classList.add(statusClass)

    // thumbnail area
    const thumb = document.createElement("div")
    thumb.className = "thumb"

    if (logoUrl) {
      const img = document.createElement("img")
      img.src = logoUrl
      img.alt = bandDisplay + " logo"
      img.style.width = "100%"
      img.style.height = "100%"
      img.style.objectFit = "contain"
      thumb.appendChild(img)
    } else {
      const none = document.createElement("div")
      none.className = "empty"
      none.textContent = "N/A"
      thumb.appendChild(none)
    }

    // band name button
    const titleBtn = document.createElement("button")
    titleBtn.className = "small-link"
    titleBtn.textContent = bandDisplay
    titleBtn.style.background = "transparent"
    titleBtn.style.border = "none"
    titleBtn.style.color = "inherit"
    titleBtn.style.fontSize = "18px"
    titleBtn.style.textAlign = "left"
    titleBtn.style.cursor = "pointer"
    titleBtn.addEventListener("click", () =>
      showBandCard(region, letter, bandObj),
    )

    // put it together
    card.append(thumb, titleBtn)
    resultsEl.appendChild(card)
  })
}

// =============== single album → photos (with delegation so toggle still lightboxes) ===============
async function loadAndShowAlbumPhotos(
  albumKey,
  container,
  albumTitle = "",
  nodeKey = "",
) {
  if (!albumKey) return

  const globalBack = document.getElementById("back-to-albums-btn")
  if (globalBack) {
    globalBack.style.display = "none"
  }

  // clear right side
  container.innerHTML = ""

  function makeHeaderPill({ text, minWidth = "400px" }) {
    const el = document.createElement("div")
    el.textContent = text
    el.style.background = "rgba(15,23,42,0.25)"
    el.style.border = "1px solid rgba(148,163,184,0.15)"
    el.style.borderRadius = "9999px"
    el.style.padding = "10px 22px"
    el.style.color = "#e2e8f0"
    el.style.fontWeight = "800"
    el.style.fontSize = "18px"
    el.style.display = "inline-flex"
    el.style.alignItems = "center"
    el.style.justifyContent = "center"
    el.style.minHeight = "50px"
    el.style.minWidth = minWidth
    return el
  }

  function makeActionPill({
    text,
    as = "button",
    href = "",
    onClick = null,
    minWidth = "160px",
  }) {
    const el =
      as === "a"
        ? document.createElement("a")
        : document.createElement("button")
    el.textContent = text
    el.style.background =
      "radial-gradient(circle at top, rgba(125,197,255,0.22), rgba(2,6,23,0))"
    el.style.border = "1px solid rgba(125,197,255,0.25)"
    el.style.borderRadius = "9999px"
    el.style.padding = "12px 26px"
    el.style.display = "flex"
    el.style.alignItems = "center"
    el.style.justifyContent = "center"
    el.style.boxShadow = "0 8px 25px rgba(0,0,0,0.28)"
    el.style.backdropFilter = "blur(8px)"
    el.style.minHeight = "54px"
    el.style.minWidth = minWidth
    el.style.color = "#eff6ff"
    el.style.fontWeight = "600"
    el.style.fontSize = "14px"
    el.style.textDecoration = "none"
    el.style.cursor = "pointer"

    if (as === "a" && href) {
      el.href = href
      el.target = "_blank"
      el.rel = "noopener"
    }
    if (typeof onClick === "function") {
      el.addEventListener("click", onClick)
    }
    return el
  }

  const topBar = document.createElement("div")
  topBar.style.display = "flex"
  topBar.style.flexDirection = "column"
  topBar.style.gap = "8px"
  topBar.style.marginBottom = "8px"
  container.appendChild(topBar)

  const row1 = document.createElement("div")
  row1.style.display = "flex"
  const headerPill = makeHeaderPill({
    text: albumTitle ? albumTitle : "Album photos",
    minWidth: "240px",
  })
  row1.appendChild(headerPill)
  topBar.appendChild(row1)

  const row2 = document.createElement("div")
  row2.style.display = "flex"
  row2.style.gap = "14px"
  topBar.appendChild(row2)

  const backPill = makeActionPill({
    text: "← Back to albums",
    minWidth: "200px",
    onClick: () => {
      const realBack = document.getElementById("back-to-albums-btn")
      if (realBack) {
        realBack.style.display = "none"
        realBack.click()
      }
    },
  })
  row2.appendChild(backPill)

  let currentSort = "capture"

  // we'll call renderAll() from here
  let renderAllRef = null

  const sortPill = makeActionPill({
    text: "Sort by Keyword",
    minWidth: "190px",
    onClick: () => {
      currentSort = currentSort === "capture" ? "keyword" : "capture"
      sortPill.textContent =
        currentSort === "capture" ? "Sort by Keyword" : "Sort by Capture Time"
      if (typeof renderAllRef === "function") {
        renderAllRef()
      }
    },
  })
  row2.appendChild(sortPill)

  if (nodeKey) {
    const buyPill = makeActionPill({
      text: "Buy Photos",
      as: "a",
      href: `https://vmpix.smugmug.com/shop?nodeKey=${encodeURIComponent(nodeKey)}`,
      minWidth: "160px",
    })
    row2.appendChild(buyPill)
  }

  const loading = document.createElement("div")
  loading.textContent = "Loading photos…"
  loading.style.fontSize = "13px"
  loading.style.color = "rgba(226,232,240,0.6)"
  container.appendChild(loading)

  let allImgs = []
  let photosWrap = null
  let currentViewList = []

  function keywordsFromImg(img) {
    if (Array.isArray(img.KeywordArray) && img.KeywordArray.length) {
      return img.KeywordArray.map((k) => k.trim())
        .filter(Boolean)
        .map((k) => k.toLowerCase())
    }
    if (typeof img.Keywords === "string" && img.Keywords.trim() !== "") {
      return img.Keywords.split(/[;,]/)
        .map((k) => k.trim())
        .filter(Boolean)
        .map((k) => k.toLowerCase())
    }
    return ["(no keyword)"]
  }

  // ===== LIGHTBOX =====
  let lightboxEl = null
  let lightboxImg = null
  let lightboxCaption = null
  let lightboxIndex = 0

  function ensureLightbox() {
    if (lightboxEl) return
    lightboxEl = document.createElement("div")
    lightboxEl.style.position = "fixed"
    lightboxEl.style.inset = "0"
    lightboxEl.style.background = "rgba(0,0,0,0.85)"
    lightboxEl.style.display = "flex"
    lightboxEl.style.flexDirection = "column"
    lightboxEl.style.alignItems = "center"
    lightboxEl.style.justifyContent = "center"
    lightboxEl.style.zIndex = "99999"
    lightboxEl.style.gap = "12px"

    lightboxImg = document.createElement("img")
    lightboxImg.style.maxWidth = "96vw"
    lightboxImg.style.maxHeight = "96vh"
    lightboxImg.style.objectFit = "contain"
    lightboxImg.style.borderRadius = "12px"
    lightboxImg.style.boxShadow = "0 18px 45px rgba(0,0,0,0.35)"
    lightboxEl.appendChild(lightboxImg)

    lightboxCaption = document.createElement("div")
    lightboxCaption.style.color = "#fff"
    lightboxCaption.style.fontSize = "12px"
    lightboxCaption.style.opacity = "0.75"
    lightboxEl.appendChild(lightboxCaption)

    const controls = document.createElement("div")
    controls.style.display = "flex"
    controls.style.gap = "10px"
    controls.style.marginTop = "8px"

    function btn(txt) {
      const b = document.createElement("button")
      b.textContent = txt
      b.style.background = "rgba(15,23,42,0.35)"
      b.style.border = "1px solid rgba(255,255,255,0.18)"
      b.style.borderRadius = "9999px"
      b.style.padding = "8px 16px"
      b.style.color = "#fff"
      b.style.cursor = "pointer"
      return b
    }

    const prevBtn = btn("← Prev")
    const nextBtn = btn("Next →")
    const closeBtn = btn("Close ✕")

    prevBtn.onclick = () => showAt(lightboxIndex - 1)
    nextBtn.onclick = () => showAt(lightboxIndex + 1)
    closeBtn.onclick = () => {
      if (lightboxEl && lightboxEl.parentNode) {
        lightboxEl.parentNode.removeChild(lightboxEl)
      }
      // reset so next click can recreate it
      lightboxEl = null
      lightboxImg = null
      lightboxCaption = null
    }

    controls.appendChild(prevBtn)
    controls.appendChild(nextBtn)
    controls.appendChild(closeBtn)
    lightboxEl.appendChild(controls)

    lightboxEl.addEventListener("click", (e) => {
      if (e.target === lightboxEl) {
        lightboxEl.parentNode.removeChild(lightboxEl)
        // reset here too
        lightboxEl = null
        lightboxImg = null
        lightboxCaption = null
      }
    })

    document.body.appendChild(lightboxEl)
  }

  // upsize SmugMug-sized URLs
  function upgradeSmugToOriginal(url) {
    if (!url) return ""
    let out = url.replace(/\/(S|M|L|XL|X2|X3|Th|T)\//gi, "/O/")
    out = out.replace(/-(S|M|L|XL|X2|X3|Th|T)\./gi, "-O.")
    return out
  }

  function bestFullUrl(img) {
    const candidates = [
      img.OriginalUrl,
      img.OriginalImageUrl,
      img.OriginalSizeUrl,
      img.ArchivedSizeUrl,
      img.ImageUrl,
      img.X3LargeUrl,
      img.X2LargeUrl,
      img.LargeUrl,
      img.Url,
      img.MediumUrl,
      img.SmallUrl,
      img.ThumbnailUrl,
    ].filter(Boolean)

    if (candidates.length === 0) {
      console.log("No usable image fields on image object:", img)
      return ""
    }

    const first = candidates[0]
    if (
      candidates.length === 1 &&
      /photos\.smugmug\.com\/.+\/(S|M|L|XL|X2|X3|Th|T)\//i.test(first)
    ) {
      const bumped = upgradeSmugToOriginal(first)
      console.log("Only thumbnail/sized URL present, bumped to:", bumped, img)
      return bumped
    }

    return first
  }

  function showAt(idx) {
    if (!currentViewList.length) return
    if (idx < 0) idx = currentViewList.length - 1
    if (idx >= currentViewList.length) idx = 0
    lightboxIndex = idx
    const img = currentViewList[idx]
    if (!img) return
    lightboxImg.src = bestFullUrl(img)
    lightboxCaption.textContent =
      img.FileName || `${idx + 1} / ${currentViewList.length}`
  }

  function openLightbox(idx) {
    ensureLightbox()
    showAt(idx)
  }

  // ---- event delegation so rebuilt grids still open lightbox ----
  let delegated = false
  function ensureDelegation() {
    if (delegated) return
    container.addEventListener("click", (e) => {
      const box = e.target.closest(".smug-photo-box")
      if (!box) return
      const idx = Number(box.dataset.index || "-1")
      if (!Number.isFinite(idx) || idx < 0) return
      e.preventDefault()
      e.stopPropagation()
      openLightbox(idx)
    })
    delegated = true
  }

  function buildPhotoBox(img, viewIndex) {
    const thumbUrl =
      img.ThumbnailUrl ||
      img.SquareUrl ||
      img.SmallUrl ||
      img.MediumUrl ||
      img.Url ||
      ""

    const box = document.createElement("div")
    box.className = "smug-photo-box" // <--- class for delegation
    box.dataset.index = String(viewIndex)
    box.style.background = "#0f172a"
    box.style.border = "1px solid rgba(148,163,184,0.15)"
    box.style.borderRadius = "10px"
    box.style.overflow = "hidden"
    box.style.cursor = "pointer"
    box.style.width = "150px"
    box.style.height = "110px"
    box.style.display = "flex"
    box.style.alignItems = "center"
    box.style.justifyContent = "center"

    const imgEl = document.createElement("img")
    imgEl.src = thumbUrl
    imgEl.alt = img.FileName || "photo"
    imgEl.style.width = "100%"
    imgEl.style.height = "100%"
    imgEl.style.objectFit = "cover"
    box.appendChild(imgEl)

    return box
  }

  function renderAll() {
    if (photosWrap && photosWrap.parentNode) {
      photosWrap.parentNode.removeChild(photosWrap)
    }
    photosWrap = document.createElement("div")
    photosWrap.style.display = "flex"
    photosWrap.style.flexDirection = "column"
    photosWrap.style.gap = "20px"
    photosWrap.style.marginTop = "8px"
    container.appendChild(photosWrap)

    currentViewList = []

    if (currentSort === "capture") {
      const imgs = allImgs.slice().sort((a, b) => {
        const da = new Date(a.Date || a.LastUpdated || a.LastUpdatedTime || 0)
        const db = new Date(b.Date || b.LastUpdated || b.LastUpdatedTime || 0)
        return db - da
      })

      const gridEl = document.createElement("div")
      gridEl.style.display = "grid"
      gridEl.style.gridTemplateColumns = "repeat(10, 150px)"
      gridEl.style.gap = "12px"
      photosWrap.appendChild(gridEl)

      imgs.forEach((img) => {
        const viewIndex = currentViewList.length
        currentViewList.push(img)
        gridEl.appendChild(buildPhotoBox(img, viewIndex))
      })
    } else {
      const groups = {}
      allImgs.forEach((img) => {
        const kws = keywordsFromImg(img)
        kws.forEach((kw) => {
          if (!groups[kw]) groups[kw] = []
          groups[kw].push(img)
        })
      })

      const sortedKeys = Object.keys(groups).sort((a, b) => {
        const aa = a === "(no keyword)" ? "zzzzzz" : a
        const bb = b === "(no keyword)" ? "zzzzzz" : b
        return aa.localeCompare(bb)
      })

      sortedKeys.forEach((kw) => {
        const h = document.createElement("div")
        h.textContent = kw === "(no keyword)" ? "Unlabeled" : kw
        h.style.fontSize = "15px"
        h.style.fontWeight = "700"
        h.style.color = "#e2e8f0"
        h.style.marginLeft = "4px"
        photosWrap.appendChild(h)

        const grid = document.createElement("div")
        grid.style.display = "grid"
        grid.style.gridTemplateColumns = "repeat(10, 150px)"
        grid.style.gap = "12px"
        photosWrap.appendChild(grid)

        groups[kw].forEach((img) => {
          const viewIndex = currentViewList.length
          currentViewList.push(img)
          grid.appendChild(buildPhotoBox(img, viewIndex))
        })
      })
    }

    // make sure clicks work even on this new DOM
    ensureDelegation()
  }

  // keep a reference so the sort button can call it
  renderAllRef = renderAll

  try {
    allImgs = await fetchAllAlbumImages(albumKey)
    loading.remove()

    if (!allImgs.length) {
      const msg = document.createElement("div")
      msg.textContent = "No photos in this album."
      msg.style.color = "rgba(226,232,240,0.6)"
      container.appendChild(msg)
      return
    }

    renderAll()
  } catch (err) {
    console.error("error loading this album", err)
    loading.textContent = "Error loading this album."
  }
}

// =============== band detail ===============
function showBandCard(region, letter, bandObj) {
  const bandDisplay = bandObj.name
  const smugFolder = bandObj.smug_folder
  const bandLogo = bandObj.logo_url || ""

  const clean = (v) =>
    (v || "")
      .toString()
      .trim()
      .replace(/^"+|"+$/g, "")
      .replace(/^'+|'+$/g, "")

  const isRealMember = (v) => {
    const c = clean(v).toLowerCase()
    if (!c) return false
    if (c === "me" || c === "me*") return false
    return true
  }

  crumbsEl.textContent = ""
  resultsEl.innerHTML = ""

  const wrapper = document.createElement("div")
  wrapper.className = "band-detail"

  // back button
  const backBtn = document.createElement("button")
  backBtn.textContent = "← Back to bands"
  backBtn.style.marginBottom = "14px"
  backBtn.style.padding = "5px 14px"
  backBtn.style.background = "rgba(17,24,39,0.35)"
  backBtn.style.color = "#fff"
  backBtn.style.border = "1px solid rgba(148,163,184,0.25)"
  backBtn.style.borderRadius = "9999px"
  backBtn.style.cursor = "pointer"
  backBtn.style.fontSize = "0.75rem"
  backBtn.style.backdropFilter = "blur(6px)"
  backBtn.addEventListener("click", () => {
    if (LAST_VIEW && LAST_VIEW.type === "letter") {
      showLetter(LAST_VIEW.region, LAST_VIEW.letter)
    } else {
      resultsEl.innerHTML = ""
      crumbsEl.textContent = "Select a band from the list."
    }
  })
  wrapper.appendChild(backBtn)

  // header
  const headerWrap = document.createElement("div")
  headerWrap.style.display = "flex"
  headerWrap.style.flexDirection = "column"
  headerWrap.style.alignItems = "flex-start"
  headerWrap.style.gap = "10px"
  headerWrap.style.marginBottom = "16px"
  wrapper.appendChild(headerWrap)

  if (bandLogo) {
    const logoImg = document.createElement("img")
    logoImg.src = bandLogo
    logoImg.alt = bandDisplay
    logoImg.style.width = "400px"
    logoImg.style.objectFit = "contain"
    logoImg.style.filter = "drop-shadow(0 10px 24px rgba(0,0,0,0.35))"
    logoImg.style.marginBottom = "4px"
    headerWrap.appendChild(logoImg)
  }

  const pill = document.createElement("div")
  pill.style.background =
    "radial-gradient(circle at top, rgba(125,197,255,0.22), rgba(2,6,23,0))"
  pill.style.border = "1px solid rgba(125,197,255,0.25)"
  pill.style.borderRadius = "9999px"
  pill.style.padding = "12px 26px"
  pill.style.display = "flex"
  pill.style.alignItems = "center"
  pill.style.justifyContent = "center"
  pill.style.boxShadow = "0 8px 25px rgba(0,0,0,0.28)"
  pill.style.backdropFilter = "blur(8px)"
  pill.style.minHeight = "54px"
  pill.style.minWidth = "420px"

  const title = document.createElement("div")
  title.textContent = bandDisplay
  title.style.fontSize = "1.55rem"
  title.style.letterSpacing = "-0.02em"
  title.style.color = "#eff6ff"
  title.style.fontWeight = "600"
  pill.appendChild(title)

  headerWrap.appendChild(pill)

  // separator
  const sep = document.createElement("div")
  sep.style.height = "3px"
  sep.style.background =
    "linear-gradient(to right, rgba(200,163,184,0.05), rgba(200,0,0,0.45), rgba(200,163,184,0.02))"
  sep.style.margin = "10px 0 18px"
  sep.style.width = "1000px"
  wrapper.appendChild(sep)

  // ===== simple info row (location / status / sets) =====
  const topInfoRow = document.createElement("div")
  topInfoRow.style.display = "flex"
  topInfoRow.style.flexWrap = "nowrap"
  topInfoRow.style.gap = "14px"
  topInfoRow.style.marginBottom = "16px"
  topInfoRow.style.width = "1000px" // <-- match separator width

  // small helper to make a pill that looks like the top one
  function pillBox(label, value) {
    const box = document.createElement("div")

    // COLORS / BORDER / RADIUS
    box.style.background =
      "radial-gradient(circle at top, rgba(125,197,255,0.08), rgba(2,6,23,0))"
    box.style.border = "1px solid rgba(125,197,255,0.15)"
    box.style.borderRadius = "9999px" // <-- make it pill shaped
    box.style.backdropFilter = "blur(5px)"
    box.style.background =
      "radial-gradient(circle at top, rgba(125,197,255,0.22), rgba(2,6,23,0))"
    box.style.boxShadow = "0 6px 18px rgba(0,0,0,0.22)"

    // SPACING
    box.style.padding = "12px 20px" // <-- increase/decrease pill padding
    box.style.minWidth = "210px" // <-- width of each pill
    box.style.display = "flex"
    box.style.flexDirection = "column"
    box.style.gap = "3px"

    // LABEL
    const lab = document.createElement("div")
    lab.textContent = label
    lab.style.fontSize = "10px"
    lab.style.textTransform = "uppercase"
    lab.style.color = "rgba(226,232,240,0.6)"
    lab.style.letterSpacing = "0.08em"
    box.appendChild(lab)

    // VALUE
    const main = document.createElement("div")
    main.textContent = value
    main.style.fontSize = "1rem" // <-- text size of value
    main.style.fontWeight = "600"
    main.style.color = "#eff6ff"
    main.style.lineHeight = "1.2"
    box.appendChild(main)

    return box
  }

  // build location string
  const locParts = []
  if (bandObj.location) locParts.push(clean(bandObj.location))
  if (bandObj.state) locParts.push(clean(bandObj.state))
  const loc = locParts.join(", ")
  const country = bandObj.country ? clean(bandObj.country) : ""
  const locationText =
    loc && country ? `${loc} - ${country}` : loc || country || "—"

  topInfoRow.appendChild(pillBox("Home location/region", locationText))
  topInfoRow.appendChild(
    pillBox("Status", bandObj.status ? clean(bandObj.status) : "N/A"),
  )
  topInfoRow.appendChild(
    pillBox(
      "Sets (archive / total)",
      `${bandObj.sets_archive || 0} / ${bandObj.total_sets || 0}`,
    ),
  )

  wrapper.appendChild(topInfoRow)

  // ===== members (2nd line) =====
  // REPLACE your existing members block (from this line down to wrapper.appendChild(membersRow))
  // inside showBandCard(...) with this version.
  const membersRow = document.createElement("div")
  membersRow.style.display = "flex"
  membersRow.style.flexWrap = "nowrap"
  membersRow.style.gap = "14px"
  membersRow.style.marginBottom = "16px"
  membersRow.style.width = "1000px" // <-- keep same overall width as line 1

  // helper to make a member pill (so you can tweak line 2 separately from line 1)
  function memberPill(label, membersArr) {
    const box = document.createElement("div")

    // MATCH LINE 1 GRADIENT / BORDER
    box.style.background =
      "radial-gradient(circle at top, rgba(125,197,255,0.08), rgba(2,6,23,0))"
    box.style.border = "1px solid rgba(125,197,255,0.15)"
    box.style.borderRadius = "20px"
    box.style.backdropFilter = "blur(4px)"
    box.style.boxShadow = "0 4px 12px rgba(0,0,0,0.14)"

    // SPACING
    box.style.padding = "12px 18px"
    box.style.minWidth = "260px"
    box.style.display = "flex"
    box.style.flexDirection = "column"
    box.style.gap = "4px"

    // LABEL
    const head = document.createElement("div")
    head.textContent = label
    head.style.fontSize = "10px"
    head.style.textTransform = "uppercase"
    head.style.color = "rgba(226,232,240,0.6)"
    head.style.letterSpacing = "0.08em"
    box.appendChild(head)

    // BODY
    if (!membersArr.length) {
      const none = document.createElement("div")
      none.textContent = "—"
      none.style.fontSize = "15px"
      none.style.color = "#e2e8f0"
      box.appendChild(none)
    } else {
      membersArr.forEach((m) => {
        const line = document.createElement("div")
        line.textContent = m
        line.style.fontSize = "16px"
        line.style.color = "#e2e8f0"
        line.style.fontWeight = "400"
        line.style.lineHeight = "1.2"
        box.appendChild(line)
      })
    }

    return box
  }

  // build current/core members WITH short role tags in parentheses
  const coreMembers = []
  const roleMap = {} // name -> array of roles

  function addCore(nameRaw, role) {
    const name = clean(nameRaw)
    if (!isRealMember(name)) return
    if (!roleMap[name]) roleMap[name] = []
    roleMap[name].push(role)
  }

  addCore(bandObj.vox_1, "vox")
  addCore(bandObj.vox_2, "vox")
  addCore(bandObj.vox_3, "vox")
  addCore(bandObj.guitar_1, "gtr")
  addCore(bandObj.guitar_2, "gtr")
  addCore(bandObj.guitar_3, "gtr")
  addCore(bandObj.bass, "bass")
  addCore(bandObj.drum, "drums")

  Object.keys(roleMap).forEach((name) => {
    const roles = roleMap[name].join(", ")
    coreMembers.push(`${name} (${roles})`)
  })

  // other / past members
  const otherMembers = []
  if (isRealMember(bandObj.past_1)) otherMembers.push(clean(bandObj.past_1))
  if (isRealMember(bandObj.past_2)) otherMembers.push(clean(bandObj.past_2))
  if (isRealMember(bandObj.past_3)) otherMembers.push(clean(bandObj.past_3))
  if (isRealMember(bandObj.past_4)) otherMembers.push(clean(bandObj.past_4))
  if (isRealMember(bandObj.past_5)) otherMembers.push(clean(bandObj.past_5))
  if (isRealMember(bandObj.past_6)) otherMembers.push(clean(bandObj.past_6))

  membersRow.appendChild(memberPill("Core members", coreMembers))
  membersRow.appendChild(memberPill("Other members", otherMembers))

  wrapper.appendChild(membersRow)

  // lower separator (before albums/photos)
  const lowerSep = document.createElement("div")
  lowerSep.style.height = "3px"
  lowerSep.style.background =
    "linear-gradient(to right, rgba(200,163,184,0.05), rgba(200,0,0,0.45), rgba(200,163,184,0.02))"
  lowerSep.style.margin = "6px 0 14px"
  lowerSep.style.width = "1000px"
  wrapper.appendChild(lowerSep)

  // back to albums (shows album cards again)
  const backToAlbumsBtn = document.createElement("button")
  backToAlbumsBtn.id = "back-to-albums-btn"
  backToAlbumsBtn.textContent = "← Back to albums"
  backToAlbumsBtn.style.marginBottom = "10px"
  backToAlbumsBtn.style.padding = "5px 14px"
  backToAlbumsBtn.style.background = "rgba(17,24,39,0.35)"
  backToAlbumsBtn.style.color = "#fff"
  backToAlbumsBtn.style.border = "1px solid rgba(148,163,184,0.25)"
  backToAlbumsBtn.style.borderRadius = "9999px"
  backToAlbumsBtn.style.cursor = "pointer"
  backToAlbumsBtn.style.fontSize = "0.75rem"
  backToAlbumsBtn.style.backdropFilter = "blur(6px)"
  backToAlbumsBtn.style.display = "none" // <-- hide in band (album list) view
  backToAlbumsBtn.addEventListener("click", () => {
    showBandCard(region, letter, bandObj)
  })
  wrapper.appendChild(backToAlbumsBtn)

  // ===== albums heading =====
  const info = document.createElement("p")
  info.textContent = `Current Albums in Archive:`
  info.style.marginBottom = "10px"
  info.style.whiteSpace = "nowrap"
  info.style.display = "inline-block"
  wrapper.appendChild(info)

  // create this FIRST so the button can use it
  const albumsArea = document.createElement("div")
  albumsArea.id = "albums-area"
  wrapper.appendChild(albumsArea)

  resultsEl.appendChild(wrapper)

  // ===== fetch albums for this band (try several folder shapes) =====
  ;(async () => {
    const name = bandDisplay
    const csvFolder = (smugFolder || "").trim()
    const nameSlug = toSlug(name)

    const candidates = []

    // 1) Start from CSV smug_folder if present
    //    Assume smug_folder is just the band folder name (e.g. "13-High", "Cytokine")
    if (csvFolder) {
      candidates.push(csvFolder)
    }

    // 2) Guesses based on the band name ONLY
    //    (no region prefix; the server already knows the region)
    if (nameSlug) {
      candidates.push(nameSlug)
    }
    if (name) {
      candidates.push(name)
    }

    // 3) De-dupe and clean
    const cleanCandidates = []
    const seen = new Set()
    candidates.forEach((cand) => {
      const val = (cand || "").trim()
      if (!val) return
      const key = val.toLowerCase()
      if (!seen.has(key)) {
        seen.add(key)
        cleanCandidates.push(val.replace(/\/+/g, "/"))
      }
    })

    let albums = []

    for (const folderRel of cleanCandidates) {
      // slug is just a safe ID for your /smug route
      const slug = toSlug(folderRel || name)

      // IMPORTANT: `folder` is now RELATIVE, e.g. "Local/13-high"
      const url = `http://localhost:3000/smug/${encodeURIComponent(
        slug,
      )}?folder=${encodeURIComponent(folderRel)}&count=100&start=1`

      console.log("trying", region, name, "→", folderRel)

      try {
        const res = await fetch(url)
        const data = await res.json()
        const found =
          (data &&
            data.Response &&
            (data.Response.Album || data.Response.Albums)) ||
          []

        if (found.length) {
          albums = found
          break
        }
      } catch (err) {
        console.warn("error trying", folderRel, err)
      }
    }

    if (!albums.length) {
      info.textContent = `No albums found for ${name}. Tried: ${cleanCandidates.join(
        " | ",
      )}`
      return
    }

    // we found albums — render them
    const ROW_SIZE = 4
    albumsArea.innerHTML = ""

    for (let i = 0; i < albums.length; i += ROW_SIZE) {
      const rowAlbums = albums.slice(i, i + ROW_SIZE)
      const row = document.createElement("div")
      row.style.display = "grid"
      row.style.gridTemplateColumns = `repeat(${rowAlbums.length}, 250px)`
      row.style.gap = "14px"
      row.style.marginBottom = "14px"
      albumsArea.appendChild(row)

      rowAlbums.forEach((alb) => {
        const albumName =
          (
            (alb && (alb.Name || alb.Title || alb.NiceName || "")) ||
            ""
          ).trim() || "Untitled album"
        const albumKey = (alb && (alb.AlbumKey || alb.Key)) || ""
        const nodeKey = (alb && (alb.NodeID || alb.NodeId || alb.NodeKey)) || ""

        // try to find a poster from the shows CSV first
        const posterFromShow = findPosterForAlbumName(albumName)
        const posterUrl =
          POSTERS_MANUAL[albumName] ||
          posterFromShow ||
          alb.ThumbnailUrl ||
          alb.SquareThumbURL ||
          alb.ThumbUrl ||
          ""

        // outer card
        const card = document.createElement("button")
        card.type = "button"
        card.style.background = "rgba(11,15,25,0.55)"
        card.style.border = "1px solid rgba(148,163,184,0.28)"
        card.style.borderRadius = "18px"
        card.style.padding = "10px"
        card.style.display = "flex"
        card.style.flexDirection = "column"
        card.style.gap = "8px"
        card.style.cursor = albumKey ? "pointer" : "default"
        card.style.textAlign = "left"
        card.style.width = "250px"
        card.style.boxShadow = "0 10px 25px rgba(0,0,0,0.35)"

        // poster area
        const posterBox = document.createElement("div")
        posterBox.style.width = "100%"
        posterBox.style.height = "200px"
        posterBox.style.borderRadius = "12px"
        posterBox.style.overflow = "hidden"
        posterBox.style.background = "rgba(0,0,0,0.25)"
        posterBox.style.display = "flex"
        posterBox.style.alignItems = "center"
        posterBox.style.justifyContent = "center"

        if (posterUrl) {
          const img = document.createElement("img")
          img.src = posterUrl
          img.alt = albumName
          img.style.width = "100%"
          img.style.height = "100%"
          img.style.objectFit = "cover"
          posterBox.appendChild(img)
        } else {
          const empty = document.createElement("div")
          empty.textContent = "No poster"
          empty.style.color = "rgba(248,250,252,0.6)"
          empty.style.fontSize = "12px"
          posterBox.appendChild(empty)
        }

        card.appendChild(posterBox)

        // album title
        const titleEl = document.createElement("div")

        // remove leading MM/DD/YY - from the albumName
        const titleNoDate = albumName.replace(
          /^\s*\d{1,2}\/\d{1,2}\/\d{2,4}\s*-\s*/,
          "",
        )

        titleEl.textContent = titleNoDate
        titleEl.style.fontSize = "14px"
        titleEl.style.fontWeight = "700"
        titleEl.style.color = "#e5e7eb"
        titleEl.style.whiteSpace = "normal"
        titleEl.style.wordBreak = "break-word"
        card.appendChild(titleEl)

        // show metadata if we can match this album to a show
        const show = findShowForAlbumName(albumName)
        if (show) {
          const meta = document.createElement("div")
          const datePretty = formatShowDate(show.date || show.show_date || "")
          const venueBits = [show.venue, show.city, show.state]
            .map((v) => (v || "").trim())
            .filter(Boolean)
          meta.textContent = [datePretty, venueBits.join(" • ")]
            .filter(Boolean)
            .join(" — ")
          meta.style.fontSize = "12px"
          meta.style.color = "rgba(203,213,225,0.85)"
          card.appendChild(meta)
        }

        // click → open photo grid
        if (albumKey) {
          card.addEventListener("click", () => {
            const backToAlbumsBtn =
              document.getElementById("back-to-albums-btn")
            if (backToAlbumsBtn) {
              backToAlbumsBtn.style.display = "inline-flex"
            }

            loadAndShowAlbumPhotos(albumKey, albumsArea, albumName, nodeKey)
          })
        } else {
          // no key → visually "disabled"
          card.style.opacity = "0.6"
        }

        row.appendChild(card)
      })
    }
  })()
}

// build the left pane for "Shows" tab – just years
function buildShowsYears() {
  if (!treeEl) return
  treeEl.innerHTML = ""

  const years = []
  for (let y = 2025; y >= 2011; y--) {
    years.push(y)
  }

  years.forEach((year) => {
    const details = document.createElement("details")
    details.className = "letter"
    const summary = document.createElement("summary")
    summary.textContent = String(year)
    details.appendChild(summary)

    summary.addEventListener("click", () => {
      const matches = getShowsForYear(year)
      crumbsEl.textContent = `Shows › ${year}`
      renderShowListForYear(year, matches)
    })

    treeEl.appendChild(details)
  })

  if (statusEl) {
    statusEl.textContent = "Showing shows by year."
  }
}

// =============== tree build ===============
function buildTree() {
  treeEl.innerHTML = ""

  Object.entries(BANDS).forEach(([region, letters]) => {
    const regionDet = document.createElement("details")
    regionDet.className = "region"

    const regionSum = document.createElement("summary")
    const imgSrc = REGION_IMAGES[region]
    if (imgSrc) {
      const img = document.createElement("img")
      img.src = imgSrc
      img.alt = region
      img.style.height = "200px"
      img.style.objectFit = "contain"
      regionSum.appendChild(img)
    } else {
      regionSum.textContent = region
    }
    regionDet.appendChild(regionSum)

    Object.keys(letters).forEach((letter) => {
      const letterDet = document.createElement("details")
      letterDet.className = "letter"

      const letterSum = document.createElement("summary")
      letterSum.textContent = letter
      letterSum.addEventListener("click", () =>
        setTimeout(() => showLetter(region, letter), 0),
      )
      letterDet.appendChild(letterSum)

      regionDet.appendChild(letterDet)
    })

    treeEl.appendChild(regionDet)
  })

  if (statusEl) {
    let count = 0
    Object.values(BANDS).forEach((letters) => {
      Object.values(letters).forEach((arr) => {
        count += arr.length
      })
    })
    statusEl.textContent = `Loaded ${count} bands from CSV.`
  }
}

// grab shows that look like they're from that year based on title text
function filterShowsByYearLikeTitle(year) {
  // we want things like "10/14/25" in the title
  const needle = `/${String(year).slice(-2)}` // year 2025 -> "/25"
  return (SHOWS || []).filter((show) => {
    const title = (show.title || show.name || "").toLowerCase()
    return title.includes(needle.toLowerCase())
  })
}

// pull any band_1 ... band_20 / band1 / Band 1 style fields off the show row
function getBandsFromShowRow(show) {
  const bands = []
  for (const key in show) {
    // match: band1, band_1, band 1, Band_1, etc.
    if (/^band[\s_]?(\d{1,2})$/i.test(key)) {
      const val = (show[key] || "").trim()
      if (val) bands.push(val)
    }
  }
  return bands
}

// render them on the right, simple list for now
function renderShowListForYear(year, shows) {
  // make sure the right pane can stretch for the grid we’re about to add
  // resultsEl.style.display = "block"
  // resultsEl.style.width = "100%"

  resultsEl.innerHTML = ""

  if (!shows.length) {
    const msg = document.createElement("div")
    msg.textContent = `No shows found for ${year} (looked in the show date column).`
    msg.style.color = "rgba(255,255,255,0.6)"
    resultsEl.appendChild(msg)
    return
  }

  const list = document.createElement("div")
  list.style.display = "grid"
  list.style.gridTemplateColumns = "repeat(2, minmax(0, 1fr))"
  list.style.gap = "16px"
  list.style.width = "100%"
  resultsEl.appendChild(list)

  shows.forEach((show) => {
    const row = document.createElement("div")
    row.style.display = "grid"
    row.style.gridTemplateColumns = "160px auto"
    row.style.gap = "14px"
    row.style.background = "rgba(11,15,25,0.25)"
    row.style.border = "1px solid rgba(255,255,255,0.03)"
    row.style.borderRadius = "10px"
    row.style.padding = "10px 12px"
    row.style.alignItems = "flex-start"
    row.style.position = "relative"
    row.style.overflow = "hidden"
    row.style.width = "100%"
    row.style.boxSizing = "border-box"

    // details panel
    const details = document.createElement("div")
    const inner = document.createElement("div")
    inner.textContent =
      "Extra show info goes here. (We can wire your idea in next.)"
    inner.style.padding = "10px 0"
    details.appendChild(inner)

    // poster
    const left = document.createElement("div")
    left.style.width = "250px"
    left.style.height = "160px"
    left.style.borderRadius = "10px"
    left.style.overflow = "hidden"
    left.style.background = "rgba(0,0,0,0.15)"
    left.style.display = "flex"
    left.style.alignItems = "center"
    left.style.justifyContent = "center"
    left.style.cursor = "pointer"

    const poster = show.poster_url || show.show_url || show.url || ""

    if (poster) {
      const img = document.createElement("img")
      img.src = poster
      img.alt = show.title || "show poster"
      img.style.width = "100%"
      img.style.height = "100%"
      img.style.objectFit = "cover"

      img.addEventListener("click", () => {
        // toggle closed
        if (details.classList.contains("open")) {
          details.classList.remove("open")
          details.style.maxHeight = "0px"
          return
        }

        const bands = getBandsFromShowRow(show)

        // normalize names so "Re:Vision" == "ReVision" == "re vision"
        function normName(s) {
          return (s || "").toLowerCase().replace(/[^a-z0-9]/g, "")
        }

        // find the actual band object + region + letter
        function findBandInfo(bandName) {
          const target = normName(bandName)
          if (!target) return null
          for (const [region, letters] of Object.entries(BANDS)) {
            for (const [letter, bandArr] of Object.entries(letters)) {
              const match = bandArr.find((b) => normName(b.name) === target)
              if (match) {
                return { band: match, region, letter }
              }
            }
          }
          return null
        }

        details.classList.add("open")

        const wrap = document.createElement("div")
        wrap.style.display = "flex"
        wrap.style.flexWrap = "wrap"
        wrap.style.gap = "14px"
        wrap.style.padding = "10px 0"

        if (!bands.length) {
          const none = document.createElement("div")
          none.textContent = "No data just yet - keep checking back"
          none.style.color = "rgba(255,255,255,0.6)"
          wrap.appendChild(none)
        } else {
          bands.forEach((name) => {
            const info = findBandInfo(name)

            const card = document.createElement("div")
            card.style.background = "rgba(15,23,42,0.18)"
            card.style.border = "1px solid rgba(148,163,184,0.12)"
            card.style.borderRadius = "16px"
            card.style.width = "200px"
            card.style.padding = "10px"
            card.style.display = "flex"
            card.style.flexDirection = "column"
            card.style.alignItems = "center"
            card.style.gap = "6px"
            card.style.cursor = info ? "pointer" : "default"

            const logoBox = document.createElement("div")
            logoBox.style.width = "100%"
            logoBox.style.height = "120px"
            logoBox.style.display = "flex"
            logoBox.style.alignItems = "center"
            logoBox.style.justifyContent = "center"
            logoBox.style.overflow = "hidden"
            logoBox.style.borderRadius = "12px"
            logoBox.style.background = "rgba(0,0,0,0.15)"

            const logoUrl = info && info.band.logo_url ? info.band.logo_url : ""

            if (logoUrl) {
              const img = document.createElement("img")
              img.src = logoUrl
              img.alt = name
              img.style.maxWidth = "100%"
              img.style.maxHeight = "100%"
              img.style.objectFit = "contain"
              logoBox.appendChild(img)
            } else {
              const txt = document.createElement("div")
              txt.textContent = name.charAt(0).toUpperCase()
              txt.style.fontSize = "28px"
              txt.style.fontWeight = "700"
              txt.style.color = "#e5e7eb"
              logoBox.appendChild(txt)
            }

            card.appendChild(logoBox)

            const label = document.createElement("div")
            label.textContent = name
            label.style.fontSize = "13px"
            label.style.color = "#e5e7eb"
            label.style.textAlign = "center"
            label.style.marginTop = "2px"
            card.appendChild(label)

            if (info) {
              card.addEventListener("click", () => {
                showBandCard(info.region, info.letter, info.band)
              })
            }

            wrap.appendChild(card)
          })
        }

        // clear & re-attach
        details.innerHTML = ""
        details.appendChild(wrap)
        details.style.maxHeight = "700px"
      })

      left.appendChild(img)
    } else {
      const fallback = document.createElement("div")
      fallback.textContent = "No poster yet"
      fallback.style.color = "rgba(255,255,255,0.6)"
      fallback.style.fontSize = "12px"
      fallback.style.textAlign = "center"
      fallback.style.padding = "10px 6px"
      left.appendChild(fallback)
    }

    row.appendChild(left)

    // RIGHT COLUMN (title, date, venue, details)
    const right = document.createElement("div")
    right.style.display = "flex"
    right.style.flexDirection = "column"
    right.style.gap = "6px"
    row.appendChild(right)

    // title
    const titleBox = document.createElement("div")
    titleBox.textContent = show.title || "(Untitled show)"
    titleBox.style.fontSize = "18px"
    titleBox.style.fontWeight = "700"
    titleBox.style.color = "#f9fafb"
    titleBox.style.marginBottom = "4px"

    // date
    const dateBox = document.createElement("div")
    dateBox.textContent = formatShowDate(show.date || show.show_date)
    dateBox.style.fontSize = "13px"
    dateBox.style.color = "rgba(226,232,240,0.9)"

    // venue
    const venueBox = document.createElement("div")
    const city = (show.city || "").trim()
    const state = (show.state || "").trim()
    const venue = (show.venue || "").trim()

    const locBits = [city, state].filter(Boolean).join(", ")
    const venueLine = [locBits, venue].filter(Boolean).join(" — ")
    venueBox.textContent = venueLine || "Location TBA"
    venueBox.style.fontSize = "13px"
    venueBox.style.color = "rgba(148,163,184,0.95)"

    // attach text + details into right column
    right.appendChild(titleBox)
    right.appendChild(dateBox)
    right.appendChild(venueBox)
    right.appendChild(details)

    // details spans both columns
    details.style.gridColumn = "1 / -1"
    details.style.maxHeight = "0"
    details.style.overflow = "hidden"
    details.style.transition = "max-height 0.3s ease"
    details.style.padding = "0 4px 0 4px"

    list.appendChild(row)
  })
}


// =============== init ===============
Promise.all([loadBandsFromCsv(), loadShowsFromCsv()]).then(
  ([builtBands, shows]) => {
    BANDS = builtBands
    SHOWS = shows
    initTopTabs() // <-- add this line
    buildTree()
    crumbsEl.textContent = "Select a band from the list."
  },
)
