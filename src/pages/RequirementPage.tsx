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
          <h1 className="text-2xl font-bold text-[#141b2e]">Guide not found</h1>
          <Link to="/" className="mt-4 inline-block text-[#6d5df6] underline">
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
        <nav className="text-xs text-[#8a92a6]">
          <Link to="/" className="hover:text-[#141b2e]">RapidAct</Link>
          <span className="mx-2">/</span>
          <Link to="/article-50" className="hover:text-[#141b2e]">Article 50 guides</Link>
          <span className="mx-2">/</span>
          <span className="text-[#3d445c]">{guide.title}</span>
        </nav>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#141b2e] sm:text-4xl">
          {guide.h1}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#3d445c]">{guide.intro}</p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#fecaca] bg-[#fef2f2] px-4 py-1.5 text-sm font-semibold text-[#991b1b]">
          <AlertTriangle className="h-4 w-4" /> Deadline: {guide.deadline}
        </div>

        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-[#141b2e]">
            <Users className="h-5 w-5 text-[#6d5df6]" /> Who this applies to
          </h2>
          <ul className="mt-4 space-y-2.5">
            {guide.whoNeedsIt.map((w) => (
              <li key={w} className="flex items-start gap-2 text-[15px] leading-relaxed text-[#3d445c]">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#0e9f6e]" />
                {w}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 rounded-2xl border border-[#e7e9f2] bg-[#f8f9fc] p-6">
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-[#141b2e]">
            <Scale className="h-5 w-5 text-[#6d5df6]" /> What the law actually says
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#3d445c]">{guide.whatLawSays}</p>
        </section>

        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-[#141b2e]">
            <ListChecks className="h-5 w-5 text-[#6d5df6]" /> Fix it free, step by step
          </h2>
          <ol className="mt-4 space-y-3">
            {guide.freeSteps.map((s, i) => (
              <li key={s} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#3d445c]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#141b2e] text-xs font-bold text-white">
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

        <section className="mt-12 border-t border-[#eef0f6] pt-8">
          <h3 className="text-sm font-bold tracking-wide text-[#8a92a6] uppercase">More guides</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {REQUIREMENTS.filter((r) => r.slug !== guide.slug).map((r) => (
              <Link
                key={r.slug}
                to={`/requirements/${r.slug}`}
                className="rounded-full border border-[#e7e9f2] bg-white px-4 py-1.5 text-sm font-medium text-[#3d445c] hover:border-[#6d5df6] hover:text-[#6d5df6]"
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
