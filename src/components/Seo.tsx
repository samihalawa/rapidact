import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { useLocation } from "react-router";
import { normalizeSeoDescription, normalizeSeoTitle } from "@/lib/seo";

const BASE_URL = "https://rapidact.eu";
const LANGS = ["en", "es", "de", "fr", "it"] as const;
const DEFAULT_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

export interface SeoData {
  title: string;
  description: string;
  canonical: string | null;
  alternates: { lang: string; path: string }[];
  robots: string;
  lang: string;
}

interface SeoProps {
  title: string;
  description: string;
  canonical?: string | null;
  /** hreflang alternates: [{lang, path}] — path starting with "/" */
  alternates?: { lang: string; path: string }[];
  /** Generate EN/ES/DE/FR/IT alternates for a translated static route. */
  localized?: boolean;
  robots?: string;
}

type SeoCollector = { current: SeoData | null };
const SeoCollectorContext = createContext<SeoCollector | null>(null);

export function SeoCollectorProvider({
  collector,
  children,
}: {
  collector: SeoCollector;
  children: ReactNode;
}) {
  return (
    <SeoCollectorContext.Provider value={collector}>
      {children}
    </SeoCollectorContext.Provider>
  );
}

function normalizePath(pathname: string) {
  const withoutEnglishPrefix = pathname.replace(/^\/en(?=\/|$)/, "");
  const withoutTrailingSlash = withoutEnglishPrefix.replace(/\/+$/, "");
  return withoutTrailingSlash || "/";
}

function localizedAlternates(pathname: string) {
  const base =
    normalizePath(pathname).replace(/^\/(es|de|fr|it)(?=\/|$)/, "") || "/";
  return LANGS.map(lang => ({
    lang,
    path: lang === "en" ? base : `/${lang}${base === "/" ? "" : base}`,
  }));
}

function absoluteUrl(value: string) {
  return value.startsWith("http://") || value.startsWith("https://")
    ? value
    : `${BASE_URL}${value}`;
}

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let tag = document.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    document.head.appendChild(tag);
  }
  for (const [name, value] of Object.entries(attributes)) {
    tag.setAttribute(name, value);
  }
}

/**
 * Supplies route-specific search metadata in the browser and to the build-time
 * renderer. The collector keeps the server markup identical to the hydrated
 * client tree while allowing the prerender step to write metadata into <head>.
 */
export default function Seo({
  title,
  description,
  canonical,
  alternates,
  localized = false,
  robots = DEFAULT_ROBOTS,
}: SeoProps) {
  const location = useLocation();
  const collectorRef = useContext(SeoCollectorContext);
  const pathname = normalizePath(location.pathname);
  const canonicalUrl =
    canonical === null
      ? null
      : absoluteUrl(canonical === undefined ? pathname : canonical);
  const resolvedAlternates = useMemo(
    () => alternates ?? (localized ? localizedAlternates(pathname) : []),
    [alternates, localized, pathname]
  );
  const lang =
    (pathname.match(/^\/(es|de|fr|it)(?=\/|$)/)?.[1] as string | undefined) ??
    "en";
  const resolvedTitle = normalizeSeoTitle(title);
  const resolvedDescription = normalizeSeoDescription(description);
  const data: SeoData = {
    title: resolvedTitle,
    description: resolvedDescription,
    canonical: canonicalUrl,
    alternates: resolvedAlternates,
    robots,
    lang,
  };

  // Build-time rendering is synchronous; this collector never runs in the browser.
  // eslint-disable-next-line react-hooks/refs
  if (collectorRef) collectorRef.current = data;

  useEffect(() => {
    document.title = resolvedTitle;
    document.documentElement.lang = lang;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: resolvedDescription,
    });
    upsertMeta('meta[name="robots"]', { name: "robots", content: robots });
    upsertMeta('meta[name="googlebot"]', {
      name: "googlebot",
      content: robots,
    });

    let canonicalLink = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (canonicalUrl) {
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.rel = "canonical";
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = canonicalUrl;
    } else {
      canonicalLink?.remove();
    }

    document
      .querySelectorAll('link[rel="alternate"][hreflang]')
      .forEach(element => element.remove());
    for (const alternate of resolvedAlternates) {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = alternate.lang;
      link.href = absoluteUrl(alternate.path);
      document.head.appendChild(link);
    }
    if (resolvedAlternates.length) {
      const xDefault = document.createElement("link");
      xDefault.rel = "alternate";
      xDefault.hreflang = "x-default";
      xDefault.href = absoluteUrl(
        resolvedAlternates.find(alternate => alternate.lang === "en")?.path ??
          resolvedAlternates[0].path
      );
      document.head.appendChild(xDefault);
    }

    const socialUrl = canonicalUrl ?? `${BASE_URL}${pathname}`;
    const openGraph: Record<string, string> = {
      "og:title": resolvedTitle,
      "og:description": resolvedDescription,
      "og:type": "website",
      "og:url": socialUrl,
      "og:image": `${BASE_URL}/social/rapidact-app-icon-navy-1200x1200.png`,
      "og:image:alt": "RapidAct — EU AI Act transparency specialists",
    };
    for (const [property, content] of Object.entries(openGraph)) {
      upsertMeta(`meta[property="${property}"]`, { property, content });
    }

    const twitter: Record<string, string> = {
      "twitter:card": "summary",
      "twitter:title": resolvedTitle,
      "twitter:description": resolvedDescription,
      "twitter:image": `${BASE_URL}/social/rapidact-app-icon-navy-1200x1200.png`,
    };
    for (const [name, content] of Object.entries(twitter)) {
      upsertMeta(`meta[name="${name}"]`, { name, content });
    }
  }, [
    canonicalUrl,
    lang,
    pathname,
    resolvedAlternates,
    resolvedDescription,
    resolvedTitle,
    robots,
  ]);

  return null;
}
