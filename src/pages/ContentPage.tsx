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
          <h1 className="text-2xl font-bold text-[#141b2e]">Page not found</h1>
          <Link to="/learn" className="mt-4 inline-block text-[#6d5df6] underline">
            Browse all guides
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const siblings = relatedContent(item);

  return (
    <div className="min-h-screen bg-white">
      <Seo title={item.title} description={item.description} />
      <SiteNav />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <nav className="text-xs text-[#8a92a6]">
          <Link to="/" className="hover:text-[#141b2e]">RapidAct</Link>
          <span className="mx-2">/</span>
          <Link to="/learn" className="hover:text-[#141b2e]">Learn</Link>
          <span className="mx-2">/</span>
          <span>{TYPE_LABELS[item.type]}</span>
          <span className="mx-2">/</span>
          <span className="text-[#3d445c]">{item.title.slice(0, 42)}{item.title.length > 42 ? "…" : ""}</span>
        </nav>

        <MarkdownRenderer body={item.body} />

        {/* language switcher (renders only when translations exist in registry) */}
        <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-[#8a92a6]">
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
                    ? "rounded-full bg-[#141b2e] px-3 py-1 font-semibold text-white"
                    : "rounded-full border border-[#e7e9f2] px-3 py-1 hover:border-[#6d5df6] hover:text-[#6d5df6]"
                }
              >
                {LANG_LABELS[l]}
              </Link>
            );
          })}
        </div>

        <CtaBand />

        {siblings.length > 0 && (
          <section className="mt-12 border-t border-[#eef0f6] pt-8">
            <h3 className="text-sm font-bold tracking-wide text-[#8a92a6] uppercase">
              More {TYPE_LABELS[item.type].toLowerCase()}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {siblings.map((s) => (
                <Link
                  key={s.slug}
                  to={contentPath(s)}
                  className="rounded-full border border-[#e7e9f2] bg-white px-4 py-1.5 text-sm font-medium text-[#3d445c] hover:border-[#6d5df6] hover:text-[#6d5df6]"
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
