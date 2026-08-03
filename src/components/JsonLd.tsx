import { COMPANIES_HOUSE_URL, ENTITY, SPECIALIST } from "@/data/company";

/** Renders structured data in both prerendered HTML and the hydrated app. */
export default function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(Array.isArray(data) ? data : [data]).replace(
    /</g,
    "\\u003c"
  );
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export const WEBSITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "RapidAct",
  alternateName: "rapidact.eu",
  url: "https://rapidact.eu/",
};

export const ORG_LD = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  name: "RapidAct",
  legalName: ENTITY.legalName || undefined,
  url: "https://rapidact.eu",
  logo: "https://rapidact.eu/icons/icon-512x512.png",
  description:
    "A specialist EU AI Act transparency practice helping companies scope Article 50 duties, publish AI notices, deploy disclosure plugins and badges, and document their implementation.",
  slogan: "EU AI Act transparency, implemented and documented.",
  sameAs: [COMPANIES_HOUSE_URL, SPECIALIST.linkedin],
  founder: {
    "@type": "Person",
    name: SPECIALIST.name,
    jobTitle: "EU AI Act transparency specialist",
    url: SPECIALIST.linkedin,
  },
  identifier: ENTITY.registrationNumber
    ? {
        "@type": "PropertyValue",
        name: "Companies House registration number",
        value: ENTITY.registrationNumber,
      }
    : undefined,
  address: ENTITY.address
    ? {
        "@type": "PostalAddress",
        streetAddress: "27 Old Gloucester Street",
        addressLocality: "London",
        postalCode: "WC1N 3AX",
        addressCountry: "GB",
      }
    : undefined,
  contactPoint: ENTITY.phone
    ? {
        "@type": "ContactPoint",
        telephone: ENTITY.phone,
        contactType: "customer service",
        email: ENTITY.contactEmail || undefined,
        areaServed: "EU",
        availableLanguage: ["en", "es", "de", "fr", "it"],
      }
    : undefined,
};

export const PRODUCT_LD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "EU AI Act Transparency Implementation",
  serviceType: "EU AI Act Article 50 transparency implementation",
  description:
    "RapidAct combines Article 50 scoping, a public AI scanner, disclosure notices, platform plugins, an AI transparency badge and a specialist-reviewed company assessment.",
  provider: {
    "@type": "Organization",
    name: "RapidAct",
    url: "https://rapidact.eu",
  },
  areaServed: "EU",
  url: "https://rapidact.eu",
  offers: [
    {
      "@type": "Offer",
      name: "Public AI website scan",
      price: "0",
      priceCurrency: "EUR",
      url: "https://rapidact.eu/scanner",
    },
    {
      "@type": "Offer",
      name: "Article 50 AI disclosure notice and implementation guidance",
      price: "0",
      priceCurrency: "EUR",
      url: "https://rapidact.eu/article-50",
    },
    {
      "@type": "Offer",
      name: "EU AI Act Company Assessment",
      price: "99",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: "https://rapidact.eu/report",
      description:
        "Company-specific AI inventory, system classifications, Article 50 duties, recommended disclosure wording, evidence gaps, prioritised action plan and specialist review. Delivered in 24–48 hours or fully refunded.",
    },
  ],
};
