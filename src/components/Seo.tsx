import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  /** hreflang alternates: [{lang, path}] — path starting with "/" */
  alternates?: { lang: string; path: string }[];
}

/** Sets per-page title + meta description (+ canonical + hreflang) for SEO on a SPA. */
export default function Seo({ title, description, canonical, alternates }: SeoProps) {
  useEffect(() => {
    document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);

    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute(
      "href",
      canonical ?? `https://rapidact.eu${window.location.pathname}`,
    );

    // hreflang alternates (multilingual SEO)
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    if (alternates?.length) {
      for (const alt of alternates) {
        const l = document.createElement("link");
        l.setAttribute("rel", "alternate");
        l.setAttribute("hreflang", alt.lang);
        l.setAttribute("href", `https://rapidact.eu${alt.path}`);
        document.head.appendChild(l);
      }
      const xd = document.createElement("link");
      xd.setAttribute("rel", "alternate");
      xd.setAttribute("hreflang", "x-default");
      xd.setAttribute("href", `https://rapidact.eu${alternates[0].path}`);
      document.head.appendChild(xd);
    }

    // Open Graph basics
    const og: Record<string, string> = {
      "og:title": title,
      "og:description": description,
      "og:type": "website",
      "og:url": `https://rapidact.eu${window.location.pathname}`,
      "og:image": "https://rapidact.eu/social/open-graph-1200x630.png",
      "og:image:alt": "RapidAct — EU AI Act assessments",
    };
    Object.entries(og).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    });

    const twitter: Record<string, string> = {
      "twitter:card": "summary_large_image",
      "twitter:title": title,
      "twitter:description": description,
      "twitter:image": "https://rapidact.eu/social/open-graph-1200x630.png",
    };
    Object.entries(twitter).forEach(([name, content]) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    });
  }, [title, description, canonical, alternates]);

  return null;
}
