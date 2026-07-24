import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
}

/** Sets per-page title + meta description (+ canonical) for SEO on a SPA. */
export default function Seo({ title, description, canonical }: SeoProps) {
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

    // Open Graph basics
    const og: Record<string, string> = {
      "og:title": title,
      "og:description": description,
      "og:type": "website",
      "og:url": `https://rapidact.eu${window.location.pathname}`,
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
  }, [title, description, canonical]);

  return null;
}
