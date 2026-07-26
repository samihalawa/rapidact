import { useParams, Link } from "react-router";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Seo from "@/components/Seo";
import CtaBand from "@/components/CtaBand";
import { getRequirement, REQUIREMENTS } from "@/data/requirements";
import { CheckCircle2, AlertTriangle, Scale, Users, ListChecks } from "lucide-react";

export default function RequirementPage() {
  const { slug } = useParams<{ slug: string }>();
  const guide = slug ? getRequirement(slug) : undefined;

  if (!guide) {
    return (
      <div className="min-h-screen bg-white">
        <SiteNav />
        <main className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="text-2xl font-bold text-[#16181d]">Guide not found</h1>
          <Link to="/" className="mt-4 inline-block text-[#1f3a5f] underline">
            Back to RapidAct
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Seo title={guide.metaTitle} description={guide.metaDescription} />
      <SiteNav />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <nav className="text-xs text-[#6b7280]">
          <Link to="/" className="hover:text-[#16181d]">RapidAct</Link>
          <span className="mx-2">/</span>
          <Link to="/article-50" className="hover:text-[#16181d]">Article 50 guides</Link>
          <span className="mx-2">/</span>
          <span className="text-[#5c6370]">{guide.title}</span>
        </nav>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#16181d] sm:text-4xl">
          {guide.h1}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#5c6370]">{guide.intro}</p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#fecaca] bg-[#fef2f2] px-4 py-1.5 text-sm font-semibold text-[#991b1b]">
          <AlertTriangle className="h-4 w-4" /> Deadline: {guide.deadline}
        </div>

        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-[#16181d]">
            <Users className="h-5 w-5 text-[#1f3a5f]" /> Who this applies to
          </h2>
          <ul className="mt-4 space-y-2.5">
            {guide.whoNeedsIt.map((w) => (
              <li key={w} className="flex items-start gap-2 text-[15px] leading-relaxed text-[#5c6370]">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#0e9f6e]" />
                {w}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 rounded-2xl border border-[#e2e2dd] bg-[#f7f7f5] p-6">
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-[#16181d]">
            <Scale className="h-5 w-5 text-[#1f3a5f]" /> What the law actually says
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#5c6370]">{guide.whatLawSays}</p>
        </section>

        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-[#16181d]">
            <ListChecks className="h-5 w-5 text-[#1f3a5f]" /> Fix it free, step by step
          </h2>
          <ol className="mt-4 space-y-3">
            {guide.freeSteps.map((s, i) => (
              <li key={s} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#5c6370]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#16181d] text-xs font-bold text-white">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10 rounded-2xl border border-[#fde68a] bg-[#fffbeb] p-6">
          <h2 className="text-lg font-extrabold text-[#92400e]">The mistakes everyone makes</h2>
          <ul className="mt-3 space-y-2">
            {guide.mistakes.map((m) => (
              <li key={m} className="flex items-start gap-2 text-sm leading-relaxed text-[#92400e]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d97706]" />
                {m}
              </li>
            ))}
          </ul>
        </section>

        <CtaBand />

        <section className="mt-12 border-t border-[#e2e2dd] pt-8">
          <h3 className="text-sm font-bold tracking-wide text-[#6b7280] uppercase">More guides</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {REQUIREMENTS.filter((r) => r.slug !== guide.slug).map((r) => (
              <Link
                key={r.slug}
                to={`/requirements/${r.slug}`}
                className="rounded-full border border-[#e2e2dd] bg-white px-4 py-1.5 text-sm font-medium text-[#5c6370] hover:border-[#1f3a5f] hover:text-[#1f3a5f]"
              >
                {r.title}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
