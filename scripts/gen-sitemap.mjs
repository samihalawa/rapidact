/** Generate a canonical multilingual sitemap from the same route inventory used by prerendering. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BASE_URL, getSeoRoutes } from "./seo-routes.mjs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

function xmlEscape(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

const routes = getSeoRoutes();
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...routes.map(route => {
    const fields = [
      `    <loc>${xmlEscape(`${BASE_URL}${route.path}`)}</loc>`,
      route.lastmod
        ? `    <lastmod>${xmlEscape(route.lastmod)}</lastmod>`
        : null,
      ...route.alternates.map(
        alternate =>
          `    <xhtml:link rel="alternate" hreflang="${alternate.lang}" href="${xmlEscape(`${BASE_URL}${alternate.path}`)}" />`
      ),
      route.alternates.some(alternate => alternate.lang === "en")
        ? `    <xhtml:link rel="alternate" hreflang="x-default" href="${xmlEscape(`${BASE_URL}${route.alternates.find(alternate => alternate.lang === "en").path}`)}" />`
        : null,
      `    <priority>${route.priority}</priority>`,
    ].filter(Boolean);
    return ["  <url>", ...fields, "  </url>"].join("\n");
  }),
  "</urlset>",
  "",
].join("\n");

fs.writeFileSync(path.join(root, "public", "sitemap.xml"), xml);
console.log(
  `sitemap.xml: ${routes.length} canonical URLs, all with route alternates`
);
