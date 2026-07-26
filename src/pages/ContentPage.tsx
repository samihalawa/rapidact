import { useParams, Link } from "react-router";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Seo from "@/components/Seo";
import CtaBand from "@/components/CtaBand";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import {
  getContent,
  relatedContent,
  contentPath,
  LANGS,
  LANG_LABELS,
  type ContentType,
  type Lang,
} from "@/lib/content";

const TYPE_LABELS: Record<ContentType, string> = {
  answers: "Answers",
  vendors: "Vendors",
  sectors: "Sectors",
  compare: "Comparisons",
  glossary: "Glossary",
  blog: "Blog",
  reports: "Assessments",
};

export default function ContentPage() {
  const { lang, type, slug } = useParams<{ lang?: string; type: string; slug: string }>();
  const resolvedLang: Lang = LANGS.includes(lang as Lang) ? (lang as Lang) : "en";
  const item =
    type && slug ? getContent(type as ContentType, slug, resolvedLang) : undefined;

  if (!item) {
    return (
      <div className="min-h-screen bg-white">
        <SiteNav />
        <main className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="text-2xl font-bold text-[#16181d]">Page not found</h1>
          <Link to="/learn" className="mt-4 inline-block text-[#1f3a5f] underline">
            Browse all guides
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const siblings = relatedContent(item);

  // hreflang alternates for every language twin that exists in the registry
  const alternates = LANGS.filter((l) => getContent(item.type, item.slug, l)).map((l) => ({
    lang: l === "en" ? "en" : l,
    path: contentPath({ type: item.type, slug: item.slug, lang: l }),
  }));

  return (
    <div className="min-h-screen bg-white">
      <Seo title={item.title} description={item.description} alternates={alternates} />
      <SiteNav />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <nav className="text-xs text-[#6b7280]">
          <Link to="/" className="hover:text-[#16181d]">RapidAct</Link>
          <span className="mx-2">/</span>
          <Link to="/learn" className="hover:text-[#16181d]">Learn</Link>
          <span className="mx-2">/</span>
          <span>{TYPE_LABELS[item.type]}</span>
          <span className="mx-2">/</span>
          <span className="text-[#5c6370]">{item.title.slice(0, 42)}{item.title.length > 42 ? "…" : ""}</span>
        </nav>

        <MarkdownRenderer body={item.body} />

        {/* language switcher (renders only when translations exist in registry) */}
        <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-[#6b7280]">
          {LANGS.map((l) => {
            const twin = getContent(item.type, item.slug, l);
            if (!twin) return null;
            const active = l === item.lang;
            return (
              <Link
                key={l}
                to={contentPath({ type: item.type, slug: item.slug, lang: l })}
                className={
                  active
                    ? "rounded bg-[#16181d] px-3 py-1 font-semibold text-white"
                    : "rounded border border-[#e2e2dd] px-3 py-1 hover:border-[#1f3a5f] hover:text-[#1f3a5f]"
                }
              >
                {LANG_LABELS[l]}
              </Link>
            );
          })}
        </div>

        <CtaBand />

        {siblings.length > 0 && (
          <section className="mt-12 border-t border-[#e2e2dd] pt-8">
            <h3 className="text-sm font-bold tracking-wide text-[#6b7280] uppercase">
              More {TYPE_LABELS[item.type].toLowerCase()}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {siblings.map((s) => (
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
