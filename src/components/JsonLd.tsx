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
  "@type": "Service",
  name: "AI Act Complete Pre-Consultory Report",
  serviceType: "EU AI Act compliance assessment",
  description:
    "A specialist assesses your company's AI systems against the EU AI Act and delivers a complete written pre-consultory report plus a professional contact assessment to your inbox within 24–48 hours. Flat €99, one-time, any company size.",
  provider: { "@type": "Organization", name: "RapidAct", url: "https://rapidact.eu" },
  areaServed: "EU",
  url: "https://rapidact.eu/report",
  offers: {
    "@type": "Offer",
    name: "AI Act Complete Pre-Consultory Report",
    price: "99",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    url: "https://rapidact.eu/report",
    description:
      "Complete written EU AI Act assessment of every AI system your company operates, risk classification per system, exact Article 50 disclosure duties, required evidence, prioritised action plan, and a named specialist's contact assessment. Delivered in 24–48 hours or fully refunded.",
  },
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
