import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../lib/generated/departments.json");

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function cleanText(value) {
  return value
    .replace(/&nbsp;/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeFloor(floor) {
  const f = cleanText(floor);
  if (!f) return "Unknown";
  return f;
}

async function main() {
  const res = await fetch("https://www.cityofimus.gov.ph/departments-and-units.html", {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; ImusProposal/1.0)" },
  });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const html = await res.text();

  const tableMatch = html.match(/<table[^>]*>([\s\S]*?)<\/table>/i);
  if (!tableMatch) throw new Error("No table found");

  const rows = [...tableMatch[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((m) => m[1]);
  const departments = [];

  for (const row of rows) {
    const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((m) => m[1]);
    if (cells.length < 4) continue;

    const deptHtml = cells[0];
    const linkMatch = deptHtml.match(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i);
    const name = cleanText(linkMatch ? linkMatch[2] : deptHtml.replace(/<[^>]+>/g, " "));
    const href = linkMatch ? linkMatch[1] : null;

    const head = cleanText(cells[1].replace(/<[^>]+>/g, " "));
    const room = cleanText(cells[2].replace(/<[^>]+>/g, " ")) || "—";
    const floor = normalizeFloor(cells[3].replace(/<[^>]+>/g, " "));

    if (!name || name.toLowerCase().includes("department")) continue;

    departments.push({
      id: slugify(name),
      name,
      headOfOffice: head || "—",
      room,
      floor,
      detailUrl: href
        ? href.startsWith("http")
          ? href
          : `https://www.cityofimus.gov.ph${href.startsWith("/") ? "" : "/"}${href}`
        : null,
    });
  }

  const unique = new Map();
  for (const item of departments) {
    if (!unique.has(item.id)) unique.set(item.id, item);
  }
  const list = [...unique.values()].sort((a, b) => a.name.localeCompare(b.name));

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(list, null, 2));
  console.log(`Wrote ${list.length} departments to ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
