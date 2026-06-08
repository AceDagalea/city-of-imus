const r = await fetch("https://www.cityofimus.gov.ph/full-disclosure.html", {
  headers: { "User-Agent": "Mozilla/5.0" },
});
const html = await r.text();
import fs from "fs";
fs.writeFileSync("tmp-fd.html", html);
const imgs = [...html.matchAll(/<img[^>]+src="([^"]+)"/gi)].map((m) => m[1]);
console.log("images", imgs.filter((s) => /banaag|gad|BanAAg|GAD/i.test(s)).slice(0, 20));
const links = [...html.matchAll(/href="([^"]+)"[^>]*>([^<]{0,80})/gi)]
  .filter((m) => /banaag|gad|BanAAg|GAD/i.test(m[0]))
  .slice(0, 15);
links.forEach((m) => console.log(m[2].trim(), "->", m[1]));
