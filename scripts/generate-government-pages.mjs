import fs from "fs";
import path from "path";

const OUT = "lib/generated";

function stripHtml(html) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; ImusProposal/1.0)" },
  });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return res.text();
}

function parseBarangay(html) {
  const clusters = [];
  let current = null;
  const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let m;
  while ((m = rowRe.exec(html)) !== null) {
    const row = m[1];
    const clusterMatch = row.match(/Cluster\s+(\d+)/i);
    if (clusterMatch) {
      current = { id: `cluster-${clusterMatch[1]}`, name: `Cluster ${clusterMatch[1]}`, officials: [] };
      clusters.push(current);
      continue;
    }
    const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((c) => stripHtml(c[1]));
    if (cells.length === 2 && cells[0] !== "Barangay" && current) {
      current.officials.push({ barangay: cells[0], captain: cells[1] });
    }
  }
  return clusters;
}

function parsePastMayors(html) {
  const tableMatch = html.match(/<table class="tableizer-table-xl[^"]*"[\s\S]*?<\/table>/i);
  if (!tableMatch) return [];
  const table = tableMatch[0];
  const rows = [];
  const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let m;
  let seenHeader = false;
  while ((m = rowRe.exec(table)) !== null) {
    const row = m[1];
    if (/<th[\s>]/i.test(row)) {
      seenHeader = true;
      continue;
    }
    if (!seenHeader) continue;
    const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((c) => stripHtml(c[1]));
    if (cells.length < 3) continue;
    if (cells[0].toLowerCase().startsWith("source:")) break;
    rows.push({
      name: cells[0] && cells[0] !== "" ? cells[0] : null,
      status: cells[1] && cells[1] !== "" ? cells[1] : null,
      year: cells[2],
    });
  }
  return rows;
}

const barangayHtml = await fetchHtml("https://www.cityofimus.gov.ph/barangayofficials.html");
const pastMayorsHtml = await fetchHtml("https://www.cityofimus.gov.ph/past-mayors.html");

const barangay = parseBarangay(barangayHtml);
const pastMayors = parsePastMayors(pastMayorsHtml);

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, "barangay-officials.json"), JSON.stringify(barangay, null, 2));
fs.writeFileSync(path.join(OUT, "past-mayors.json"), JSON.stringify(pastMayors, null, 2));

console.log("barangay clusters:", barangay.length);
console.log("past mayors rows:", pastMayors.length);
