/**
 * Markdown content system — one .md file = one SEO page.
 *
 * Structure: content/<lang>/<type>/<slug>.md
 * Types: answers | vendors | sectors | compare | glossary | blog
 * Langs: en (source) + es | de | fr | it (translation pipeline output).
 * Fallback: any missing lang page renders the EN version.
 */

export type ContentType =
  | "answers"
  | "vendors"
  | "sectors"
  | "compare"
  | "glossary"
  | "blog"
  /** Published assessments and specimens. Drop a .md file in content/<lang>/reports/. */
  | "reports";
export type Lang = "en" | "es" | "de" | "fr" | "it";

export const LANGS: Lang[] = ["en", "es", "de", "fr", "it"];
export const LANG_LABELS: Record<Lang, string> = {
  en: "English",
  es: "Español",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
};

export interface ContentItem {
  type: ContentType;
  slug: string;
  lang: Lang;
  title: string;
  description: string;
  date?: string;
  updated?: string;
  draft: boolean;
  body: string;
  /** Free-form extra frontmatter, used by report documents (subject, ref, specimen). */
  meta: Record<string, string>;
}

/* ---------- tiny frontmatter parser (browser-safe, no deps) ---------- */

function parseFrontmatter(raw: string): {
  data: Record<string, string>;
  body: string;
} {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (kv) {
      let v = kv[2].trim();
      if (
        (v.startsWith('"') && v.endsWith('"')) ||
        (v.startsWith("'") && v.endsWith("'"))
      ) {
        v = v.slice(1, -1);
      }
      data[kv[1]] = v;
    }
  }
  return { data, body: m[2].trim() };
}

/* ---------- registry (built at bundle time by Vite) ---------- */

const modules = import.meta.glob("/content/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const registry: ContentItem[] = [];

for (const [path, raw] of Object.entries(modules)) {
  // /content/<lang>/<type>/<slug>.md
  const parts = path.replace(/^\/content\//, "").split("/");
  if (parts.length !== 3) continue;
  const [lang, type, file] = parts;
  if (!LANGS.includes(lang as Lang)) continue;
  const slug = file.replace(/\.md$/, "");
  const { data, body } = parseFrontmatter(raw);
  registry.push({
    type: type as ContentType,
    slug: data.slug || slug,
    lang: lang as Lang,
    title: data.title || slug,
    description: data.description || "",
    date: data.date,
    updated: data.updated,
    draft: data.draft === "true",
    body,
    meta: data,
  });
}

/* ---------- API ---------- */

export function getContent(
  type: ContentType,
  slug: string,
  lang: Lang
): ContentItem | undefined {
  return (
    registry.find(
      c => c.type === type && c.slug === slug && c.lang === lang && !c.draft
    ) ??
    registry.find(
      c => c.type === type && c.slug === slug && c.lang === "en" && !c.draft
    )
  );
}

export function hasExactContent(type: ContentType, slug: string, lang: Lang) {
  return registry.some(
    content =>
      content.type === type &&
      content.slug === slug &&
      content.lang === lang &&
      !content.draft
  );
}

function plainMarkdownParagraphs(body: string) {
  return body
    .split(/\n\s*\n/)
    .map(paragraph =>
      paragraph
        .replace(/^#{1,6}\s+.*/gm, "")
        .replace(/^[-*>|]\s*/gm, "")
        .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/[`*_~]/g, "")
        .replace(/\s+/g, " ")
        .trim()
    )
    .filter(paragraph => paragraph.length >= 50);
}

export function contentSeoDescription(item: ContentItem) {
  if (item.description.trim().length >= 50) return item.description;
  return plainMarkdownParagraphs(item.body)[0] ?? item.description;
}

export function listContent(type: ContentType, lang: Lang): ContentItem[] {
  // Prefer the requested lang; fill gaps with EN so every page exists in every lang.
  const inLang = registry.filter(
    c => c.type === type && c.lang === lang && !c.draft
  );
  const inEn = registry.filter(
    c => c.type === type && c.lang === "en" && !c.draft
  );
  const slugs = new Set(inLang.map(c => c.slug));
  return [...inLang, ...inEn.filter(c => !slugs.has(c.slug))].sort((a, b) =>
    a.title.localeCompare(b.title)
  );
}

export function allRoutes(): { type: ContentType; slug: string; lang: Lang }[] {
  return registry
    .filter(c => !c.draft)
    .map(c => ({ type: c.type, slug: c.slug, lang: c.lang }));
}

export function relatedContent(item: ContentItem, count = 6): ContentItem[] {
  const sameLanguage = registry.filter(
    content =>
      content.type === item.type &&
      content.lang === item.lang &&
      content.slug !== item.slug &&
      !content.draft
  );
  const translatedSlugs = new Set(sameLanguage.map(content => content.slug));
  const englishFallback = registry.filter(
    content =>
      content.type === item.type &&
      content.lang === "en" &&
      content.slug !== item.slug &&
      !translatedSlugs.has(content.slug) &&
      !content.draft
  );
  return [...sameLanguage, ...englishFallback].slice(0, count);
}

export function contentPath(
  item: Pick<ContentItem, "type" | "slug" | "lang">
): string {
  const prefix = item.lang === "en" ? "" : `/${item.lang}`;
  return `${prefix}/${item.type}/${item.slug}`;
}
