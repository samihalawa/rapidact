/**
 * Generates public/sitemap.xml from routes + the markdown content registry.
 * Run: node scripts/gen-sitemap.mjs  (re-run whenever content changes)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const BASE = "https://rapidact.eu";
const LANGS = ["en", "es", "de", "fr", "it"];

const staticRoutes = [
  ["", "1.0"],
  ["/report", "1.0"],
  ["/scanner", "0.9"],
  ["/article-50", "0.9"],
  ["/learn", "0.9"],
  ["/privacy", "0.3"],
  ["/terms", "0.3"],
  ["/requirements/chatbot-ai-disclosure", "0.8"],
  ["/requirements/ai-content-labeling", "0.8"],
  ["/requirements/deepfake-labeling", "0.8"],
  ["/requirements/ai-disclosure-evidence", "0.8"],
  ["/platforms/wordpress", "0.8"],
  ["/platforms/wix", "0.8"],
  ["/platforms/shopify", "0.8"],
  ["/platforms/tidio", "0.8"],
  ["/platforms/botpress", "0.8"],
  ["/platforms/custom-website", "0.8"],
];

function collectMarkdown() {
  const out = [];
  const contentDir = path.join(root, "content");
  if (!fs.existsSync(contentDir)) return out;
  for (const lang of fs.readdirSync(contentDir)) {
    if (!LANGS.includes(lang)) continue;
    const langDir = path.join(contentDir, lang);
    for (const type of fs.readdirSync(langDir)) {
      const typeDir = path.join(langDir, type);
      if (!fs.statSync(typeDir).isDirectory()) continue;
      for (const file of fs.readdirSync(typeDir)) {
        if (!file.endsWith(".md")) continue;
        const raw = fs.readFileSync(path.join(typeDir, file), "utf-8");
        if (/^draft:\s*true/m.test(raw)) continue;
        const slug = file.replace(/\.md$/, "");
        const prefix = lang === "en" ? "" : `/${lang}`;
        out.push([`${prefix}/${type}/${slug}`, type === "blog" ? "0.6" : "0.7"]);
      }
    }
  }
  return out;
}

const urls = [...staticRoutes, ...collectMarkdown()];
const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls
    .map(
      ([u, p]) =>
        `  <url><loc>${BASE}${u}</loc><changefreq>weekly</changefreq><priority>${p}</priority></url>`,
    )
    .join("\n") +
  "\n</urlset>\n";

fs.writeFileSync(path.join(root, "public", "sitemap.xml"), xml);
console.log(`sitemap.xml: ${urls.length} URLs`);
