const https = require("https");
const fs = require("fs");
const path = require("path");

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });
}

function stripHtml(s) {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function getEoSection(html, year) {
  const re = new RegExp(`id="Executive${year}"([\\s\\S]*?)(?=id="Executive|$)`);
  const m = html.match(re);
  return m ? m[1] : "";
}

function parseEoSection(section, year) {
  const items = [];
  const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let row;
  while ((row = rowRe.exec(section))) {
    const rowHtml = row[1];
    const cells = [...rowHtml.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((m) => stripHtml(m[1]));
    const pdfM = rowHtml.match(/href="([^"]*\.pdf)"/i);
    if (cells.length < 3 || !pdfM || cells[0].includes("__number") || cells[2] === "___title") continue;
    const number = cells[0].replace(/EXECUTIVE ORDER NO\./i, "").trim();
    const date = cells[1] && cells[1] !== "&nbsp;" ? cells[1] : `${year}-01-01`;
    const title = cells[2].replace(/\|\s*$/, "").trim();
    const pdfPath = pdfM[1].startsWith("/") ? pdfM[1] : `/${pdfM[1]}`;
    items.push({ id: `eo-${year}-${number.replace(/\s+/g, "")}`, title, postedDate: date, year, pdfPath, number });
  }
  return items;
}

function parseResolutions(html, slug) {
  const items = [];
  const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let row;
  while ((row = rowRe.exec(html))) {
    const cells = [...row[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((m) => stripHtml(m[1]));
    if (cells.length < 3 || !cells[0].includes("SP RESOLUTION")) continue;
    const id = cells[0].toLowerCase().replace(/[^a-z0-9]+/g, "-");
    items.push({
      id: `res-${slug}-${id}`,
      number: cells[0],
      date: cells[1],
      title: cells[2].slice(0, 120),
      description: cells[2],
    });
  }
  return items;
}

function parseOrdinances(html, slug) {
  const items = [];
  const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let row;
  while ((row = rowRe.exec(html))) {
    const rowHtml = row[1];
    const cells = [...rowHtml.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((m) => stripHtml(m[1]));
    const pdfM = rowHtml.match(/href="([^"]*\.pdf)"/i);
    if (cells.length < 2 || !pdfM) continue;
    const title = cells.length >= 3 ? cells[2] || cells[1] : cells[1];
    if (!title || title.length < 10) continue;
    const num = cells[0];
    if (num.includes("ORDINANCE NO") || num.includes("SP") || num.match(/\d{4}/)) {
      const pdfPath = pdfM[1].startsWith("/") ? pdfM[1] : `/${pdfM[1]}`;
      items.push({
        id: `ord-${slug}-${items.length}`,
        title: title.slice(0, 200),
        number: num,
        postedDate: cells[1] || "2011-01-01",
        pdfPath,
      });
    }
  }
  return items;
}

function parseBids(html) {
  const items = [];
  const seen = new Set();
  const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let row;
  while ((row = rowRe.exec(html))) {
    const rowHtml = row[1];
    const cells = [...rowHtml.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((m) => stripHtml(m[1]));
    const pdfM = rowHtml.match(/href="([^"]*\.pdf)"/i);
    if (cells.length < 2 || !pdfM || cells[0].includes("reference")) continue;
    const ref = cells[0];
    const title = cells[1];
    if (!title || title === "___title") continue;
    const pdfPath = pdfM[1].startsWith("/") ? pdfM[1] : `/${pdfM[1]}`;
    const key = `${ref}|${title}|${pdfPath}`;
    if (seen.has(key)) continue;
    seen.add(key);
    items.push({ id: `bid-${items.length}`, reference: ref, title, datePosted: "2026", pdfPath });
  }
  return items;
}

(async () => {
  const base = "https://www.cityofimus.gov.ph";
  const outDir = path.join(__dirname, "..", "lib", "generated");
  fs.mkdirSync(outDir, { recursive: true });

  const eoHtml = await fetch(`${base}/executive_order.html`);
  const eoByYear = {};
  for (const year of [2026, 2025, 2024, 2023, 2022]) {
    eoByYear[year] = parseEoSection(getEoSection(eoHtml, year), year);
  }
  fs.writeFileSync(path.join(outDir, "executive-orders.json"), JSON.stringify(eoByYear, null, 2));

  const resArchives = [
    ["2024", "resolutions_2024.html"],
    ["2023", "resolutions_2023.html"],
    ["5th-2022", "resolutions_5th2022.html"],
    ["4th-2022", "resolutions_4th2022.html"],
    ["2020", "resolutions_2020.html"],
    ["2019-4th", "resolutions_4th2019.html"],
    ["2019-3rd", "resolutions_3rd2019.html"],
    ["2018", "resolutions_2018.html"],
    ["2017", "resolutions_2017.html"],
    ["2016", "resolutions_2016.html"],
    ["2015", "resolutions_2015.html"],
    ["2014", "resolutions_2014.html"],
    ["2013", "resolutions_2013.html"],
    ["2012", "resolutions_2012.html"],
    ["2011", "resolutions_2011.html"],
    ["2010", "resolutions_2010.html"],
  ];
  const resolutionsByArchive = { current: parseResolutions(await fetch(`${base}/resolutions.html`), "current") };
  for (const [slug, file] of resArchives) {
    try {
      const html = await fetch(`${base}/${file}`);
      resolutionsByArchive[slug] = parseResolutions(html, slug);
      console.log("res", slug, resolutionsByArchive[slug].length);
    } catch (e) {
      console.error("res fail", slug, e.message);
    }
  }
  fs.writeFileSync(path.join(outDir, "resolutions.json"), JSON.stringify(resolutionsByArchive, null, 2));

  const ordHtml1 = await fetch(`${base}/full-disclosure.html`);
  const ordHtml2 = await fetch(`${base}/ordinance_1919-2010.html`);
  const ordinances = {
    "2011-2024": parseOrdinances(ordHtml1, "2011-2024"),
    "1919-2010": parseOrdinances(ordHtml2, "1919-2010"),
  };
  fs.writeFileSync(path.join(outDir, "ordinances.json"), JSON.stringify(ordinances, null, 2));

  const bidsHtml = await fetch(`${base}/bids-and-awards.html`);
  const bids = parseBids(bidsHtml);
  fs.writeFileSync(path.join(outDir, "bids-awards.json"), JSON.stringify(bids, null, 2));

  console.log("EO years:", Object.fromEntries(Object.entries(eoByYear).map(([k,v]) => [k, v.length])));
  console.log("ordinances:", ordinances["2011-2024"].length, ordinances["1919-2010"].length);
  console.log("bids:", bids.length);
})();
