import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  BASE_URL,
  getPrerenderOnlyRoutes,
  getSeoRoutes,
} from "./seo-routes.mjs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const publicDir = path.join(root, "dist", "public");
const ssrEntry = path.join(root, "dist", "ssr", "entry-server.js");
const template = fs.readFileSync(path.join(publicDir, "index.html"), "utf8");
const { renderRoute } = await import(pathToFileURL(ssrEntry).href);

function htmlEscape(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function removeRouteMetadata(html) {
  return html
    .replace(/\s*<title>[\s\S]*?<\/title>/i, "")
    .replace(
      /\s*<meta\s+name=["'](?:description|robots|googlebot|twitter:title|twitter:description)["'][^>]*>/gi,
      ""
    )
    .replace(
      /\s*<meta\s+property=["'](?:og:title|og:description|og:type|og:url|og:locale|og:site_name)["'][^>]*>/gi,
      ""
    )
    .replace(/\s*<link\s+rel=["'](?:canonical|alternate)["'][^>]*>/gi, "");
}

function metadataHtml(seo) {
  const socialUrl = seo.canonical ?? `${BASE_URL}/404`;
  const locale =
    {
      en: "en_GB",
      es: "es_ES",
      de: "de_DE",
      fr: "fr_FR",
      it: "it_IT",
    }[seo.lang] ?? "en_GB";
  const tags = [
    `<title>${htmlEscape(seo.title)}</title>`,
    `<meta name="description" content="${htmlEscape(seo.description)}" />`,
    `<meta name="robots" content="${htmlEscape(seo.robots)}" />`,
    `<meta name="googlebot" content="${htmlEscape(seo.robots)}" />`,
    seo.canonical
      ? `<link rel="canonical" href="${htmlEscape(seo.canonical)}" />`
      : null,
    ...seo.alternates.map(
      alternate =>
        `<link rel="alternate" hreflang="${htmlEscape(alternate.lang)}" href="${htmlEscape(`${BASE_URL}${alternate.path}`)}" />`
    ),
    seo.alternates.length
      ? `<link rel="alternate" hreflang="x-default" href="${htmlEscape(`${BASE_URL}${seo.alternates.find(alternate => alternate.lang === "en")?.path ?? seo.alternates[0].path}`)}" />`
      : null,
    `<meta property="og:title" content="${htmlEscape(seo.title)}" />`,
    `<meta property="og:description" content="${htmlEscape(seo.description)}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:url" content="${htmlEscape(socialUrl)}" />`,
    `<meta property="og:locale" content="${locale}" />`,
    '<meta property="og:site_name" content="RapidAct" />',
    `<meta name="twitter:title" content="${htmlEscape(seo.title)}" />`,
    `<meta name="twitter:description" content="${htmlEscape(seo.description)}" />`,
  ].filter(Boolean);
  return tags.map(tag => `    ${tag}`).join("\n");
}

function renderDocument(pathname) {
  const rendered = renderRoute(pathname);
  const normalized = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  if (
    rendered.seo.canonical &&
    rendered.seo.canonical !== `${BASE_URL}${normalized}` &&
    !normalized.endsWith("/start")
  ) {
    throw new Error(
      `${pathname} rendered the wrong canonical: ${rendered.seo.canonical}`
    );
  }
  let html = removeRouteMetadata(template);
  html = html.replace(
    /<html\s+lang=["'][^"']+["']/,
    `<html lang="${rendered.seo.lang}"`
  );
  html = html.replace("  </head>", `${metadataHtml(rendered.seo)}\n  </head>`);
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${rendered.appHtml}</div>`
  );
  if (!html.includes(rendered.appHtml) || !/<h1\b/i.test(rendered.appHtml)) {
    throw new Error(`${pathname} did not produce an indexable rendered body`);
  }
  return html;
}

function routeOutputPath(pathname) {
  if (pathname === "/") return path.join(publicDir, "index.html");
  const segments = pathname.split("/").filter(Boolean);
  if (segments.some(segment => segment === "." || segment === "..")) {
    throw new Error(`Unsafe prerender route: ${pathname}`);
  }
  return path.join(publicDir, ...segments, "index.html");
}

const seoRoutes = getSeoRoutes();
for (const route of seoRoutes) {
  const destination = routeOutputPath(route.path);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, renderDocument(route.path));
}

for (const pathname of getPrerenderOnlyRoutes()) {
  const destination = routeOutputPath(pathname);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, renderDocument(pathname));
}

fs.writeFileSync(path.join(publicDir, "404.html"), renderDocument("/404"));
fs.rmSync(path.join(root, "dist", "ssr"), { recursive: true, force: true });
console.log(
  `prerender: ${seoRoutes.length} canonical routes, ${getPrerenderOnlyRoutes().length} legacy routes, and a noindex 404`
);
