import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public", "gad");
const outJson = path.join(root, "lib", "generated", "gad.json");

const GAD_ITEMS = [
  { id: "gad-pregnant-2025", category: "Health", title: "GAD Requested Docs on Pregnant Mothers 2025", datePosted: "2025", pdfPath: "/FULL DISCLOSURE/GAD DATABASE/GAD requested Docs on Pregnant Mothers 2025.pdf" },
  { id: "gad-newsletter", category: "Publication", title: "GAD News Letter", datePosted: "2025", pdfPath: "/FULL DISCLOSURE/GAD DATABASE/GAD News Letter.pdf" },
  { id: "gad-converge", category: "Demography", title: "List of Beneficiaries — Free CONVERGE Installation (Bida I-Konek Mo Project)", datePosted: "2025", pdfPath: "/FULL DISCLOSURE/GAD DATABASE/Demography/By-Sex-Beneficiaries-of-Free-CONVERGE-Installation_BIDA-I-KONEK-MO-PROJECT.pdf" },
  { id: "gad-pop-sex", category: "Demography", title: "Projected Population by Sex 2020–2025", datePosted: "2025", pdfPath: "/FULL DISCLOSURE/GAD DATABASE/Demography/Proj Pop_n by Sex 2020-2025.pdf" },
  { id: "gad-edu-2023", category: "Education", title: "GAD Database for Education Year 2023", datePosted: "2023", pdfPath: "/FULL DISCLOSURE/GAD DATABASE/Education/2023_GAD_Education.pdf" },
  { id: "gad-maternal-2024", category: "Health", title: "GAD Database for Maternal Care Pregnant Women Year 2024", datePosted: "2024", pdfPath: "/FULL DISCLOSURE/GAD DATABASE/Health/2024_Maternal_Care_Pregnant_Women.pdf" },
  { id: "gad-cswdo-2024", category: "CSWDO", title: "GAD Database for CSWDO Year 2024", datePosted: "2024", pdfPath: "/FULL DISCLOSURE/GAD DATABASE/CSWDO/2024_CSWDO.pdf" },
  { id: "gad-osca-2025", category: "OSCA", title: "Office of the Senior Citizens Affairs 2025", datePosted: "2025", pdfPath: "/FULL DISCLOSURE/GAD DATABASE/OCM-OSCA GAD DATABASE.pdf" },
  { id: "gad-osca-2024", category: "OSCA", title: "Office of the Senior Citizens Affairs 2024", datePosted: "2024", pdfPath: "/FULL DISCLOSURE/GAD DATABASE/OSCA//2024_OSCA.pdf" },
  { id: "gad-pdao-2024", category: "PDAO", title: "Summary Report of PWD by Type, Age and Sex-disaggregated, 2024", datePosted: "2024", pdfPath: "/FULL DISCLOSURE/GAD DATABASE/PDAO/2024_PDAO.pdf" },
];

const SITE_URL = "https://www.cityofimus.gov.ph";
const SCALE = 1.5;
const onlyId = process.argv.find((a) => a.startsWith("--id="))?.split("=")[1];
const thumbsOnly = process.argv.includes("--thumbs-only");

async function generateThumbsFromExisting(doc) {
  const docDir = path.join(publicDir, doc.id);
  const page1Path = path.join(docDir, "page-01.webp");
  if (!fs.existsSync(page1Path)) {
    throw new Error(`Missing page-01.webp for ${doc.id}`);
  }

  const image = await loadImage(page1Path);
  const thumbWidth = 560;
  const scale = thumbWidth / image.width;
  const thumbCanvas = createCanvas(
    Math.floor(image.width * scale),
    Math.floor(image.height * scale)
  );
  const ctx = thumbCanvas.getContext("2d");
  ctx.drawImage(image, 0, 0, thumbCanvas.width, thumbCanvas.height);
  const thumbPath = path.join(docDir, "thumb.webp");
  fs.writeFileSync(thumbPath, thumbCanvas.toBuffer("image/webp", 82));

  return {
    ...doc,
    thumbnail: `/gad/${doc.id}/thumb.webp`,
  };
}

if (thumbsOnly) {
  const existing = JSON.parse(fs.readFileSync(outJson, "utf8"));
  const targets = onlyId ? existing.filter((i) => i.id === onlyId) : existing;
  const updated = [];
  for (const doc of targets) {
    try {
      updated.push(await generateThumbsFromExisting(doc));
      console.log(`Thumb: ${doc.id}`);
    } catch (err) {
      console.error(`Error on ${doc.id}:`, err.message);
      updated.push(doc);
    }
  }
  const merged = onlyId
    ? existing.map((item) => updated.find((u) => u.id === item.id) ?? item)
    : updated;
  fs.writeFileSync(outJson, JSON.stringify(merged, null, 2));
  console.log(`Updated thumbnails for ${updated.length} documents`);
  process.exit(0);
}

async function renderPdfToImages(item) {
  const pdfUrl = `${SITE_URL}${encodeURI(item.pdfPath)}`;
  console.log(`Downloading ${item.id}...`);
  const res = await fetch(pdfUrl);
  if (!res.ok) throw new Error(`Failed ${res.status} for ${item.id}`);
  const buffer = await res.arrayBuffer();
  const pdf = await getDocument({ data: new Uint8Array(buffer) }).promise;
  const docDir = path.join(publicDir, item.id);
  fs.mkdirSync(docDir, { recursive: true });

  const pages = [];
  let thumbnail = "";

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: SCALE });
    const canvas = createCanvas(Math.floor(viewport.width), Math.floor(viewport.height));
    const ctx = canvas.getContext("2d");
    await page.render({ canvasContext: ctx, viewport }).promise;
    const fileName = `page-${String(pageNum).padStart(2, "0")}.webp`;
    const filePath = path.join(docDir, fileName);
    fs.writeFileSync(filePath, canvas.toBuffer("image/webp", 85));
    pages.push(`/gad/${item.id}/${fileName}`);

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
      const thumbPath = path.join(docDir, "thumb.webp");
      fs.writeFileSync(thumbPath, thumbCanvas.toBuffer("image/webp", 82));
      thumbnail = `/gad/${item.id}/thumb.webp`;
    }

    console.log(`  Page ${pageNum}/${pdf.numPages}`);
  }

  return {
    id: item.id,
    title: item.title,
    category: item.category,
    datePosted: item.datePosted,
    pdfUrl,
    thumbnail,
    pages,
  };
}

const items = onlyId ? GAD_ITEMS.filter((i) => i.id === onlyId) : GAD_ITEMS;
if (items.length === 0) throw new Error(`No item for id ${onlyId}`);

let existing = [];
if (fs.existsSync(outJson) && onlyId) {
  existing = JSON.parse(fs.readFileSync(outJson, "utf8"));
}

const generated = [];
for (const item of items) {
  try {
    generated.push(await renderPdfToImages(item));
  } catch (err) {
    console.error(`Error on ${item.id}:`, err.message);
  }
}

const merged = onlyId
  ? [...existing.filter((e) => e.id !== onlyId), ...generated].sort((a, b) => {
      const order = GAD_ITEMS.map((i) => i.id);
      return order.indexOf(a.id) - order.indexOf(b.id);
    })
  : generated;

fs.mkdirSync(path.dirname(outJson), { recursive: true });
fs.writeFileSync(outJson, JSON.stringify(merged, null, 2));
console.log(`Wrote ${merged.length} documents to ${outJson}`);
