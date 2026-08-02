import { useParams, Link } from "react-router";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Seo from "@/components/Seo";
import CtaBand from "@/components/CtaBand";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import JsonLd from "@/components/JsonLd";
import {
  getContent,
  hasExactContent,
  contentSeoDescription,
  relatedContent,
  contentPath,
  LANGS,
  type ContentType,
  type Lang,
} from "@/lib/content";
import { useI18n } from "@/lib/i18n";

const TYPE_LABELS: Record<Lang, Record<ContentType, string>> = {
  en: {
    answers: "Answers",
    vendors: "Vendors",
    sectors: "Sectors",
    compare: "Comparisons",
    glossary: "Glossary",
    blog: "Updates",
    reports: "Assessments",
  },
  es: {
    answers: "Respuestas",
    vendors: "Proveedores",
    sectors: "Sectores",
    compare: "Comparativas",
    glossary: "Glosario",
    blog: "Actualizaciones",
    reports: "Evaluaciones",
  },
  de: {
    answers: "Antworten",
    vendors: "Anbieter",
    sectors: "Branchen",
    compare: "Vergleiche",
    glossary: "Glossar",
    blog: "Aktuelles",
    reports: "Bewertungen",
  },
  fr: {
    answers: "Réponses",
    vendors: "Fournisseurs",
    sectors: "Secteurs",
    compare: "Comparaisons",
    glossary: "Glossaire",
    blog: "Actualités",
    reports: "Évaluations",
  },
  it: {
    answers: "Risposte",
    vendors: "Fornitori",
    sectors: "Settori",
    compare: "Confronti",
    glossary: "Glossario",
    blog: "Aggiornamenti",
    reports: "Valutazioni",
  },
};

const PAGE_UI: Record<
  Lang,
  { learn: string; notFound: string; browse: string; more: string }
> = {
  en: {
    learn: "Guides",
    notFound: "Page not found",
    browse: "Browse all guides",
    more: "More",
  },
  es: {
    learn: "Guías",
    notFound: "Página no encontrada",
    browse: "Ver todas las guías",
    more: "Más",
  },
  de: {
    learn: "Leitfäden",
    notFound: "Seite nicht gefunden",
    browse: "Alle Leitfäden",
    more: "Weitere",
  },
  fr: {
    learn: "Guides",
    notFound: "Page introuvable",
    browse: "Voir tous les guides",
    more: "Plus de",
  },
  it: {
    learn: "Guide",
    notFound: "Pagina non trovata",
    browse: "Vedi tutte le guide",
    more: "Altri",
  },
};

export default function ContentPage() {
  const { lang, type, slug } = useParams<{
    lang?: string;
    type: string;
    slug: string;
  }>();
  const { lang: contextLang, path } = useI18n();
  const resolvedLang: Lang = LANGS.includes(lang as Lang)
    ? (lang as Lang)
    : contextLang;
  const labels = TYPE_LABELS[resolvedLang];
  const ui = PAGE_UI[resolvedLang];
  const item =
    type && slug
      ? getContent(type as ContentType, slug, resolvedLang)
      : undefined;

  if (!item) {
    return (
      <div className="min-h-screen bg-white">
        <SiteNav />
        <main className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="text-2xl font-bold text-[#16181d]">{ui.notFound}</h1>
          <Link
            to={path("/learn")}
            className="mt-4 inline-block text-[#1f3a5f] underline"
          >
            {ui.browse}
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const siblings = relatedContent(item);

  // hreflang alternates for every language twin that exists in the registry
  const languageTwins = LANGS.filter(l =>
    hasExactContent(item.type, item.slug, l)
  ).map(l => ({
    lang: l,
    path: contentPath({ type: item.type, slug: item.slug, lang: l }),
  }));
  const alternates = languageTwins.length > 1 ? languageTwins : [];
  const canonicalPath = contentPath(item);
  const title = item.title.replace(/ \| RapidAct(?: blog)?$/i, "");
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "RapidAct",
        item: "https://rapidact.eu/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: ui.learn,
        item: `https://rapidact.eu${path("/learn")}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `https://rapidact.eu${canonicalPath}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title={item.title}
        description={contentSeoDescription(item)}
        alternates={alternates}
      />
      <JsonLd data={breadcrumbLd} />
      <SiteNav />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <nav className="text-xs text-[#6b7280]">
          <Link to={path("/")} className="hover:text-[#16181d]">
            RapidAct
          </Link>
          <span className="mx-2">/</span>
          <Link to={path("/learn")} className="hover:text-[#16181d]">
            {ui.learn}
          </Link>
          <span className="mx-2">/</span>
          <span>{labels[item.type]}</span>
          <span className="mx-2">/</span>
          <span className="text-[#5c6370]">
            {item.title.slice(0, 42)}
            {item.title.length > 42 ? "…" : ""}
          </span>
        </nav>

        <MarkdownRenderer body={item.body} />

        <CtaBand />

        {siblings.length > 0 && (
          <section className="mt-12 border-t border-[#e2e2dd] pt-8">
            <h3 className="text-sm font-bold tracking-wide text-[#6b7280] uppercase">
              {ui.more} {labels[item.type].toLowerCase()}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {siblings.map(s => (
                <Link
                  key={s.slug}
                  to={contentPath(s)}
                  className="rounded border border-[#e2e2dd] bg-white px-4 py-1.5 text-sm font-medium text-[#5c6370] hover:border-[#1f3a5f] hover:text-[#1f3a5f]"
                >
                  {s.title.replace(/ \| RapidAct$/, "").slice(0, 48)}
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
