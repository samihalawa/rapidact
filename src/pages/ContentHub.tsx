import { Link } from "react-router";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Seo from "@/components/Seo";
import CtaBand from "@/components/CtaBand";
import {
  listContent,
  contentPath,
  type ContentType,
} from "@/lib/content";

const SECTIONS: { type: ContentType; title: string; blurb: string }[] = [
  { type: "answers", title: "Answers", blurb: "The exact questions everyone searches about the EU AI Act — answered directly." },
  { type: "vendors", title: "By vendor", blurb: "What Article 50 means for your specific chatbot or AI platform." },
  { type: "sectors", title: "By sector", blurb: "Your industry's AI exposure, in your industry's language." },
  { type: "compare", title: "Comparisons", blurb: "How the Article 50 tools stack up against each other." },
  { type: "glossary", title: "Glossary", blurb: "The regulation's vocabulary, translated to plain English." },
  { type: "blog", title: "Blog", blurb: "Deadlines, enforcement, and what changes next." },
];

export default function ContentHub() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="Learn — EU AI Act Article 50 guides, answers and playbooks | RapidAct"
        description="Every guide you need for EU AI Act transparency: plain-English answers, vendor-specific instructions, sector playbooks, tool comparisons and glossary."
      />
      <SiteNav />
      <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#16181d] sm:text-5xl">
          Learn Article 50
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[#5c6370]">
          No legal jargon, no technical jargon. Pick your question, your tool, or your industry —
          and get a straight answer with the fix included.
        </p>

        {SECTIONS.map((sec) => {
          const items = listContent(sec.type, "en");
          if (!items.length) return null;
          return (
            <section key={sec.type} className="mt-12">
              <div className="flex items-baseline justify-between">
                <h2 className="text-2xl font-extrabold text-[#16181d]">{sec.title}</h2>
                <span className="text-xs font-semibold text-[#6b7280]">{items.length} pages</span>
              </div>
              <p className="mt-1 text-sm text-[#5c6370]">{sec.blurb}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <Link
                    key={item.slug}
                    to={contentPath(item)}
                    className="group rounded-xl border border-[#e2e2dd] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#1f3a5f] hover:shadow-md"
                  >
                    <p className="text-[15px] leading-snug font-bold text-[#16181d] group-hover:text-[#1f3a5f]">
                      {item.title.replace(/ \| RapidAct$/, "")}
                    </p>
                    <p className="mt-1.5 line-clamp-2 text-[13px] leading-snug text-[#5c6370]">
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <CtaBand />
      </main>
      <SiteFooter />
    </div>
  );
}
