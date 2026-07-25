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
        <h1 className="text-3xl font-extrabold tracking-tight text-[#141b2e] sm:text-5xl">
          Learn Article 50
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[#5a6378]">
          No legal jargon, no technical jargon. Pick your question, your tool, or your industry —
          and get a straight answer with the fix included.
        </p>

        {SECTIONS.map((sec) => {
          const items = listContent(sec.type, "en");
          if (!items.length) return null;
          return (
            <section key={sec.type} className="mt-12">
              <div className="flex items-baseline justify-between">
                <h2 className="text-2xl font-extrabold text-[#141b2e]">{sec.title}</h2>
                <span className="text-xs font-semibold text-[#8a92a6]">{items.length} pages</span>
              </div>
              <p className="mt-1 text-sm text-[#5a6378]">{sec.blurb}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <Link
                    key={item.slug}
                    to={contentPath(item)}
                    className="group rounded-xl border border-[#e7e9f2] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#6d5df6] hover:shadow-md"
                  >
                    <p className="text-[15px] leading-snug font-bold text-[#141b2e] group-hover:text-[#6d5df6]">
                      {item.title.replace(/ \| RapidAct$/, "")}
                    </p>
                    <p className="mt-1.5 line-clamp-2 text-[13px] leading-snug text-[#5a6378]">
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
