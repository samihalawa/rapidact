import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const BASE_URL = "https://rapidact.eu";
export const LANGS = ["en", "es", "de", "fr", "it"];

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const LOCALIZED_STATIC_ROUTES = [
  ["/", "1.0"],
  ["/report", "1.0"],
  ["/example-report", "0.9"],
  ["/scanner", "0.9"],
  ["/partners", "0.9"],
  ["/contact", "0.9"],
  ["/article-50", "0.9"],
  ["/learn", "0.9"],
  ["/platforms/wordpress", "0.8"],
  ["/platforms/wix", "0.8"],
  ["/platforms/shopify", "0.8"],
  ["/platforms/tidio", "0.8"],
  ["/platforms/botpress", "0.8"],
  ["/platforms/custom-website", "0.8"],
];

const ENGLISH_STATIC_ROUTES = [
  ["/privacy", "0.3"],
  ["/terms", "0.3"],
  ["/requirements/chatbot-ai-disclosure", "0.8"],
  ["/requirements/ai-content-labeling", "0.8"],
  ["/requirements/deepfake-labeling", "0.8"],
  ["/requirements/ai-disclosure-evidence", "0.8"],
];

function localizedPath(routePath, lang) {
  if (lang === "en") return routePath;
  return `/${lang}${routePath === "/" ? "" : routePath}`;
}

function frontmatterValue(raw, key) {
  const match = raw.match(new RegExp(`^${key}:\\s*["']?([^"'\\r\\n]+)`, "m"));
  return match?.[1]?.trim();
}

function collectMarkdownRoutes() {
  const contentDir = path.join(root, "content");
  if (!fs.existsSync(contentDir)) return [];
  const routes = [];

  for (const lang of fs.readdirSync(contentDir).sort()) {
    if (!LANGS.includes(lang)) continue;
    const langDir = path.join(contentDir, lang);
    for (const type of fs.readdirSync(langDir).sort()) {
      const typeDir = path.join(langDir, type);
      if (!fs.statSync(typeDir).isDirectory()) continue;
      for (const file of fs.readdirSync(typeDir).sort()) {
        if (!file.endsWith(".md")) continue;
        const source = path.join(typeDir, file);
        const raw = fs.readFileSync(source, "utf8");
        if (/^draft:\s*true/m.test(raw)) continue;
        const slug = file.replace(/\.md$/, "");
        const routePath = localizedPath(`/${type}/${slug}`, lang);
        routes.push({
          path: routePath,
          priority: type === "blog" ? "0.6" : "0.7",
          group: `content:${type}:${slug}`,
          lang,
          lastmod:
            frontmatterValue(raw, "updated") ?? frontmatterValue(raw, "date"),
          source,
        });
      }
    }
  }

  return routes;
}

export function getSeoRoutes() {
  const routes = [];

  for (const [routePath, priority] of LOCALIZED_STATIC_ROUTES) {
    for (const lang of LANGS) {
      routes.push({
        path: localizedPath(routePath, lang),
        priority,
        group: `static:${routePath}`,
        lang,
      });
    }
  }

  for (const [routePath, priority] of ENGLISH_STATIC_ROUTES) {
    routes.push({
      path: routePath,
      priority,
      group: `static:${routePath}`,
      lang: "en",
    });
  }

  routes.push(...collectMarkdownRoutes());

  const unique = new Map();
  for (const route of routes) {
    if (unique.has(route.path)) {
      throw new Error(`Duplicate SEO route: ${route.path}`);
    }
    unique.set(route.path, route);
  }

  const byGroup = new Map();
  for (const route of unique.values()) {
    const group = byGroup.get(route.group) ?? [];
    group.push(route);
    byGroup.set(route.group, group);
  }

  return [...unique.values()]
    .map(route => ({
      ...route,
      alternates:
        (byGroup.get(route.group) ?? []).length > 1
          ? (byGroup.get(route.group) ?? [])
              .map(alternate => ({
                lang: alternate.lang,
                path: alternate.path,
              }))
              .sort((a, b) => LANGS.indexOf(a.lang) - LANGS.indexOf(b.lang))
          : [],
    }))
    .sort((a, b) => a.path.localeCompare(b.path));
}

export function getPrerenderOnlyRoutes() {
  return [];
}
