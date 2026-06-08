const res = await fetch("https://www.cityofimus.gov.ph/city_mayor.html", {
  headers: { "User-Agent": "Mozilla/5.0" },
});
const html = await res.text();
const text = html
  .replace(/<script[\s\S]*?<\/script>/gi, "")
  .replace(/<style[\s\S]*?<\/style>/gi, "")
  .replace(/<br\s*\/?>/gi, "\n")
  .replace(/<\/p>/gi, "\n\n")
  .replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;/g, " ")
  .replace(/\s+\n/g, "\n")
  .replace(/[ \t]+/g, " ")
  .replace(/\n{3,}/g, "\n\n")
  .trim();

const start = text.indexOf("Alex Lacson");
const end = text.indexOf("Eight-Point Agenda");
console.log(text.slice(start, end > start ? end : start + 3000));
const imgs = [...html.matchAll(/src="([^"]+)"/gi)]
  .map((m) => m[1])
  .filter((s) => /mayor|Mayor|standing/i.test(s));
console.log("\nIMAGES:", imgs);
