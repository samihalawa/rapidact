import { useEffect } from "react";

/** Injects JSON-LD structured data for SEO rich results. */
export default function JsonLd({ data }: { data: object | object[] }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(Array.isArray(data) ? data : [data]);
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [data]);
  return null;
}

export const ORG_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RapidAct",
  url: "https://rapidact.eu",
  logo: "https://rapidact.eu/favicon.svg",
  description:
    "AI transparency tooling for EU AI Act Article 50 — scanner, disclosure layer and evidence log installed on your website.",
};

export const PRODUCT_LD = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "RapidAct AI Disclosure",
  description:
    "Article 50 compliance installed on your website: AI-touchpoint detection, EN/ES visitor disclosure, timestamped evidence log. Free tier, €59 pack, €99 done-for-you install.",
  brand: { "@type": "Brand", name: "RapidAct" },
  offers: [
    {
      "@type": "Offer",
      name: "Free",
      price: "0",
      priceCurrency: "EUR",
      description: "Scanner, implementation plan, DIY plugin and guides.",
    },
    {
      "@type": "Offer",
      name: "Compliance Pack",
      price: "59",
      priceCurrency: "EUR",
      description: "Everything configured for your site, evidence log + export, 12 months of updates.",
    },
    {
      "@type": "Offer",
      name: "Done For You",
      price: "99",
      priceCurrency: "EUR",
      description: "Full installation on your website, verified live, within 48 hours.",
    },
  ],
};

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
