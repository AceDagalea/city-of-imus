import fs from "fs";

const PAGES = [
  { key: "barangay", url: "https://www.cityofimus.gov.ph/barangayofficials.html" },
  { key: "history", url: "https://www.cityofimus.gov.ph/history.html" },
  { key: "past-mayors", url: "https://www.cityofimus.gov.ph/past-mayors.html" },
];

for (const page of PAGES) {
  const res = await fetch(page.url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; ImusProposal/1.0)" },
  });
  const html = await res.text();
  const out = `tmp-${page.key}.html`;
  fs.writeFileSync(out, html);
  console.log(page.key, res.status, html.length);

  // Extract main content roughly
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)
    || html.match(/<div[^>]*class="[^"]*content[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
  if (mainMatch) {
    const text = mainMatch[1]
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, "\n")
      .replace(/\n\s*\n/g, "\n")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    console.log("--- sample lines ---");
    console.log(text.slice(0, 40).join("\n"));
  }
}
