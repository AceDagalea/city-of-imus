import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public", "banaag");
const outJson = path.join(root, "lib", "generated", "banaag.json");

const BANAAG_ITEMS = [
  { id: "banaag-2025-h2", title: "Ang Ikalawang Anim na Buwan sa Taong 2025", datePosted: "Jul–Dec 2025", pdfPath: "/FULL DISCLOSURE/BanAAg/BanAAg_2025_July_to_Dec.pdf" },
  { id: "banaag-2025-dec", title: "December 2025", datePosted: "December 2025", pdfPath: "/FULL DISCLOSURE/BanAAg/BanAAg_2025_Dec.pdf" },
  { id: "banaag-2025-nov", title: "November 2025", datePosted: "November 2025", pdfPath: "/FULL DISCLOSURE/BanAAg/BanAAg_2025_Nov.pdf" },
  { id: "banaag-2025-oct", title: "October 2025", datePosted: "October 2025", pdfPath: "/FULL DISCLOSURE/BanAAg/BanAAg_2025_Oct.pdf" },
  { id: "banaag-2025-sept", title: "September 2025", datePosted: "September 2025", pdfPath: "/FULL DISCLOSURE/BanAAg/BanAAg_2025_Sept.pdf" },
  { id: "banaag-2025-aug", title: "August 2025", datePosted: "August 2025", pdfPath: "/FULL DISCLOSURE/BanAAg/BanAAg_2025_August.pdf" },
  { id: "banaag-2025-jul", title: "July 2025", datePosted: "July 2025", pdfPath: "/FULL DISCLOSURE/BanAAg/BanAAg_2025_July.pdf" },
  { id: "banaag-2025-h1", title: "Ang Unang Anim na Buwan sa Taong 2025", datePosted: "Jan–Jun 2025", pdfPath: "/FULL DISCLOSURE/BanAAg/BanAAg_2025_Jan_to_Jun.pdf" },
  { id: "banaag-2025-jun", title: "June 2025", datePosted: "June 2025", pdfPath: "/FULL DISCLOSURE/BanAAg/BanAAg_2025_June.pdf" },
  { id: "banaag-2025-may", title: "May 2025", datePosted: "May 2025", pdfPath: "/FULL DISCLOSURE/BanAAg/BanAAg_2025_May.pdf" },
  { id: "banaag-2025-apr", title: "April 2025", datePosted: "April 2025", pdfPath: "/FULL DISCLOSURE/BanAAg/BanAAg_2025_April.pdf" },
  { id: "banaag-2025-mar", title: "March 2025", datePosted: "March 2025", pdfPath: "/FULL DISCLOSURE/BanAAg/BanAAg_2025_March.pdf" },
  { id: "banaag-2025-feb", title: "February 2025", datePosted: "February 2025", pdfPath: "/FULL DISCLOSURE/BanAAg/BanAAg_2025_Feb.pdf" },
  { id: "banaag-2025-jan", title: "January 2025", datePosted: "January 2025", pdfPath: "/FULL DISCLOSURE/BanAAg/BanAAg_2025_Jan.pdf" },
  { id: "banaag-2024-h2", title: "Ang Ikalawang Anim na Buwan sa Taong 2024", datePosted: "Jul–Dec 2024", pdfPath: "/FULL DISCLOSURE/BanAAg/BanAAg_2024_Jul_to_Dec.pdf" },
  { id: "banaag-2024-dec", title: "December 2024", datePosted: "December 2024", pdfPath: "/FULL DISCLOSURE/BanAAg/BanAAg_2024_December.pdf" },
  { id: "banaag-2024-nov", title: "November 2024", datePosted: "November 2024", pdfPath: "/FULL DISCLOSURE/BanAAg/BanAAg_2024_November.pdf" },
  { id: "banaag-2024-oct", title: "October 2024", datePosted: "October 2024", pdfPath: "/FULL DISCLOSURE/BanAAg/BanAAg_2024_October.pdf" },
  { id: "banaag-2024-sept", title: "September 2024", datePosted: "September 2024", pdfPath: "/FULL DISCLOSURE/BanAAg/BanAAg_2024_September.pdf" },
  { id: "banaag-2024-aug", title: "August 2024", datePosted: "August 2024", pdfPath: "/FULL DISCLOSURE/BanAAg/BanAAg_2024_August.pdf" },
];

const SITE_URL = "https://www.cityofimus.gov.ph";
const SCALE = 1.5;
const onlyId = process.argv.find((a) => a.startsWith("--id="))?.split("=")[1];
const thumbsOnly = process.argv.includes("--thumbs-only");

async function generateThumbsFromExisting(issue) {
  const issueDir = path.join(publicDir, issue.id);
  const page1Path = path.join(issueDir, "page-01.webp");
  if (!fs.existsSync(page1Path)) {
    throw new Error(`Missing page-01.webp for ${issue.id}`);
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
  const thumbPath = path.join(issueDir, "thumb.webp");
  fs.writeFileSync(thumbPath, thumbCanvas.toBuffer("image/webp", 82));

  return {
    ...issue,
    thumbnail: `/banaag/${issue.id}/thumb.webp`,
  };
}

if (thumbsOnly) {
  const existing = JSON.parse(fs.readFileSync(outJson, "utf8"));
  const targets = onlyId ? existing.filter((i) => i.id === onlyId) : existing;
  const updated = [];
  for (const issue of targets) {
    try {
      updated.push(await generateThumbsFromExisting(issue));
      console.log(`Thumb: ${issue.id}`);
    } catch (err) {
      console.error(`Error on ${issue.id}:`, err.message);
      updated.push(issue);
    }
  }
  const merged = onlyId
    ? existing.map((item) => updated.find((u) => u.id === item.id) ?? item)
    : updated;
  fs.writeFileSync(outJson, JSON.stringify(merged, null, 2));
  console.log(`Updated thumbnails for ${updated.length} issues`);
  process.exit(0);
}

async function renderPdfToImages(item) {
  const pdfUrl = `${SITE_URL}${encodeURI(item.pdfPath)}`;
  console.log(`Downloading ${item.id}...`);
  const res = await fetch(pdfUrl);
  if (!res.ok) throw new Error(`Failed ${res.status} for ${item.id}`);
  const buffer = await res.arrayBuffer();
  const pdf = await getDocument({ data: new Uint8Array(buffer) }).promise;
  const issueDir = path.join(publicDir, item.id);
  fs.mkdirSync(issueDir, { recursive: true });

  const pages = [];
  let thumbnail = "";

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: SCALE });
    const canvas = createCanvas(Math.floor(viewport.width), Math.floor(viewport.height));
    const ctx = canvas.getContext("2d");
    await page.render({ canvasContext: ctx, viewport }).promise;
    const fileName = `page-${String(pageNum).padStart(2, "0")}.webp`;
    const filePath = path.join(issueDir, fileName);
    fs.writeFileSync(filePath, canvas.toBuffer("image/webp", 85));
    pages.push(`/banaag/${item.id}/${fileName}`);

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
      const thumbPath = path.join(issueDir, "thumb.webp");
      fs.writeFileSync(thumbPath, thumbCanvas.toBuffer("image/webp", 82));
      thumbnail = `/banaag/${item.id}/thumb.webp`;
    }

    console.log(`  Page ${pageNum}/${pdf.numPages}`);
  }

  return {
    id: item.id,
    title: item.title,
    datePosted: item.datePosted,
    pdfUrl,
    thumbnail,
    pages,
  };
}

const items = onlyId ? BANAAG_ITEMS.filter((i) => i.id === onlyId) : BANAAG_ITEMS;
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
      const order = BANAAG_ITEMS.map((i) => i.id);
      return order.indexOf(a.id) - order.indexOf(b.id);
    })
  : generated;

fs.mkdirSync(path.dirname(outJson), { recursive: true });
fs.writeFileSync(outJson, JSON.stringify(merged, null, 2));
console.log(`Wrote ${merged.length} issues to ${outJson}`);
