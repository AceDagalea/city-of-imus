import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public", "disclosure-pdfs");
const outDir = path.join(root, "lib", "generated");

const SITE_URL = "https://www.cityofimus.gov.ph";
const SCALE = 1.5;

const onlySection = process.argv.find((a) => a.startsWith("--section="))?.split("=")[1];
const thumbsOnly = process.argv.includes("--thumbs-only");

const FINANCIAL_ITEMS = [
  { id: "app-2025", badge: "Procurement", title: "Annual Procurement Plan 2025", datePosted: "2025-01-31", year: "2025", pdfPath: "/FULL DISCLOSURE/Full Disclosure Policy/APP 2025.pdf" },
  { id: "soca-2024", badge: "Social Services", title: "State of the Children Address Newsletter 2024", datePosted: "2025-01-15", year: "2024", pdfPath: "/FULL DISCLOSURE/Full Disclosure Policy/LCPC 2024.pdf" },
  { id: "app-2024", badge: "Procurement", title: "Annual Procurement Plan 2024", datePosted: "2024-02-02", year: "2024", pdfPath: "/FULL DISCLOSURE/Full Disclosure Policy/APP 2024.pdf" },
  { id: "app-2023", badge: "Procurement", title: "Annual Procurement Plan 2023", datePosted: "2023-02-14", year: "2023", pdfPath: "/FULL DISCLOSURE/Full Disclosure Policy/APP2023.pdf" },
  { id: "saob-2022", badge: "Financial", title: "Statement of Allotments, Obligations and Balances", datePosted: "2022-08-19", year: "2022", pdfPath: "/FULL DISCLOSURE/Full Disclosure Policy/SAAO REPORT.PDF" },
  { id: "lgsf-drra", badge: "Disaster Management", title: "LG Support Fund — Disaster Rehabilitation & Reconstruction Assistance Program", datePosted: "2022-08-19", year: "2022", pdfPath: "/FULL DISCLOSURE/Full Disclosure Policy/Local-Government-Support-Fund-Disaster-Rehabilitation-and-Reconstruction-Assistance-Program.pdf" },
  { id: "blgf-q2-2022", badge: "Financial", title: "BLGF Statement of Receipts Q2 2022", datePosted: "2022-08-19", year: "2022", pdfPath: "/FULL DISCLOSURE/Full Disclosure Policy/IMUS CITY-Region IV-A_2022-2_SRS.pdf" },
  { id: "ndrrmf-2022", badge: "Disaster Management", title: "Financial Assistance to LGUs — NDRRMF", datePosted: "2022-08-19", year: "2022", pdfPath: "/FULL DISCLOSURE/Full Disclosure Policy/Financial-Assistance-to-Local-Government-Units-Charge-Against-NDRRMF.pdf" },
];

const JOB_ITEMS = [
  { id: "job-2026-a", badge: "CGI", title: "LIST OF VACANT POSITIONS — City Government of Imus", datePosted: "May 5, 2026", year: "2026", pdfPath: "/FULL DISCLOSURE/Job vacancies/Vacant Positions 05052026A.pdf" },
  { id: "job-2026-b", badge: "ONI", title: "LIST OF VACANT POSITIONS — Ospital ng Imus", datePosted: "May 5, 2026", year: "2026", pdfPath: "/FULL DISCLOSURE/Job vacancies/Vacant Positions 05052026B.pdf" },
];

const DISPOSAL_ITEMS = [
  { id: "disposal-2026-02", badge: "ITBD 2026-02", title: "Disposal of nineteen (19) Units of Unserviceable Vehicles", datePosted: "2026", year: "2026", pdfPath: "/FULL DISCLOSURE/Disposal-Invitations/ITBD_2026_02.pdf" },
];

const LGF_ITEMS = [
  { id: "lgf-app-2026", badge: "APP 2026", title: "Annual Procurement Plan for FY 2026", datePosted: "2026", year: "2026", pdfPath: "/FULL DISCLOSURE/TrustFund/Annual_Procurement_Plan_2026.pdf" },
];

function pdfKey(pdfPath) {
  return pdfPath
    .replace(/^\/+/, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase()
    .slice(0, 96);
}

function pdfUrlFromPath(pdfPath) {
  return `${SITE_URL}${encodeURI(pdfPath)}`;
}

const pdfCache = new Map();

async function renderPdf(pdfPath) {
  if (pdfCache.has(pdfPath)) return pdfCache.get(pdfPath);

  const key = pdfKey(pdfPath);
  const cacheDir = path.join(publicDir, key);
  const thumbPath = path.join(cacheDir, "thumb.webp");
  const metaPath = path.join(cacheDir, "meta.json");

  if (fs.existsSync(metaPath)) {
    const cached = JSON.parse(fs.readFileSync(metaPath, "utf8"));
    pdfCache.set(pdfPath, cached);
    return cached;
  }

  const url = pdfUrlFromPath(pdfPath);
  console.log(`  Rendering PDF: ${pdfPath}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${res.status} for ${pdfPath}`);

  const buffer = await res.arrayBuffer();
  const pdf = await getDocument({ data: new Uint8Array(buffer) }).promise;
  fs.mkdirSync(cacheDir, { recursive: true });

  const pages = [];
  let thumbnail = "";

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: SCALE });
    const canvas = createCanvas(Math.floor(viewport.width), Math.floor(viewport.height));
    const ctx = canvas.getContext("2d");
    await page.render({ canvasContext: ctx, viewport }).promise;
    const fileName = `page-${String(pageNum).padStart(2, "0")}.webp`;
    fs.writeFileSync(path.join(cacheDir, fileName), canvas.toBuffer("image/webp", 85));
    pages.push(`/disclosure-pdfs/${key}/${fileName}`);

    if (pageNum === 1) {
      const thumbWidth = 560;
      const thumbScale = thumbWidth / viewport.width;
      const thumbViewport = page.getViewport({ scale: SCALE * thumbScale });
      const thumbCanvas = createCanvas(
        Math.floor(thumbViewport.width),
        Math.floor(thumbViewport.height)
      );
      const thumbCtx = thumbCanvas.getContext("2d");
      await page.render({ canvasContext: thumbCtx, viewport: thumbViewport }).promise;
      fs.writeFileSync(thumbPath, thumbCanvas.toBuffer("image/webp", 82));
      thumbnail = `/disclosure-pdfs/${key}/thumb.webp`;
    }
  }

  const result = { thumbnail, pages, pdfUrl: url };
  fs.writeFileSync(metaPath, JSON.stringify(result, null, 2));
  pdfCache.set(pdfPath, result);
  return result;
}

async function generateThumbsOnly(sectionName, items, outFile) {
  const existing = JSON.parse(fs.readFileSync(outFile, "utf8"));
  const updated = [];
  for (const item of existing) {
    const key = pdfKey(item.pdfPath ?? "");
    const page1 = path.join(publicDir, key, "page-01.webp");
    if (!fs.existsSync(page1)) {
      updated.push(item);
      continue;
    }
    const image = await loadImage(page1);
    const thumbWidth = 560;
    const scale = thumbWidth / image.width;
    const thumbCanvas = createCanvas(
      Math.floor(image.width * scale),
      Math.floor(image.height * scale)
    );
    const ctx = thumbCanvas.getContext("2d");
    ctx.drawImage(image, 0, 0, thumbCanvas.width, thumbCanvas.height);
    const thumbPath = path.join(publicDir, key, "thumb.webp");
    fs.writeFileSync(thumbPath, thumbCanvas.toBuffer("image/webp", 82));
    updated.push({ ...item, thumbnail: `/disclosure-pdfs/${key}/thumb.webp` });
    console.log(`Thumb: ${item.id}`);
  }
  fs.writeFileSync(outFile, JSON.stringify(updated, null, 2));
}

async function buildSection(sectionName, items, outFile) {
  console.log(`\n=== ${sectionName} (${items.length} items) ===`);
  const docs = [];
  for (const item of items) {
    try {
      const rendered = await renderPdf(item.pdfPath);
      docs.push({
        id: item.id,
        title: item.title,
        badge: item.badge,
        datePosted: item.datePosted,
        year: item.year,
        pdfUrl: rendered.pdfUrl,
        thumbnail: rendered.thumbnail,
        pages: rendered.pages,
      });
      console.log(`  OK: ${item.id}`);
    } catch (err) {
      console.error(`  FAIL ${item.id}: ${err.message}`);
    }
  }
  fs.writeFileSync(outFile, JSON.stringify(docs, null, 2));
  console.log(`Wrote ${docs.length} docs to ${outFile}`);
}

function readJson(filePath) {
  const text = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  return JSON.parse(text);
}

function loadBids() {
  const raw = readJson(path.join(outDir, "bids-awards.json"));
  return raw.map((item) => ({
    id: item.id,
    badge: item.reference,
    title: item.title,
    datePosted: item.datePosted,
    year: item.datePosted,
    pdfPath: item.pdfPath,
  }));
}

function loadExecutiveOrders() {
  const raw = readJson(path.join(outDir, "executive-orders.json"));
  const items = [];
  for (const [year, list] of Object.entries(raw)) {
    for (const item of list) {
      items.push({
        id: item.id,
        badge: `EO ${item.number}`,
        title: item.title,
        datePosted: item.postedDate,
        year: String(item.year ?? year),
        pdfPath: item.pdfPath,
      });
    }
  }
  return items;
}

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(publicDir, { recursive: true });

const sections = {
  financial: { items: FINANCIAL_ITEMS, out: "financial-docs.json" },
  jobs: { items: JOB_ITEMS, out: "jobs-docs.json" },
  disposal: { items: DISPOSAL_ITEMS, out: "disposal-docs.json" },
  lgf: { items: LGF_ITEMS, out: "lgf-docs.json" },
  bids: { items: loadBids, out: "bids-docs.json" },
  eo: { items: loadExecutiveOrders, out: "executive-orders-docs.json" },
};

if (onlySection && !sections[onlySection]) {
  console.error("Unknown section. Use: financial, jobs, disposal, lgf, bids, eo");
  process.exit(1);
}

const runList = onlySection ? { [onlySection]: sections[onlySection] } : sections;

for (const [name, cfg] of Object.entries(runList)) {
  if (!cfg) continue;
  const outFile = path.join(outDir, cfg.out);
  const items = typeof cfg.items === "function" ? cfg.items() : cfg.items;
  if (thumbsOnly && fs.existsSync(outFile)) {
    await generateThumbsOnly(name, items, outFile);
  } else {
    await buildSection(name, items, outFile);
  }
}

console.log("\nDone.");
