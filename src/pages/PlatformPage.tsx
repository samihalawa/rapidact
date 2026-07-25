import { useParams, Link } from "react-router";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Seo from "@/components/Seo";
import CtaBand from "@/components/CtaBand";
import { getPlatform, PLATFORMS } from "@/data/platforms";
import { CheckCircle2, ScanSearch, ListChecks, Blocks } from "lucide-react";

export default function PlatformPage() {
  const { slug } = useParams<{ slug: string }>();
  const guide = slug ? getPlatform(slug) : undefined;

  if (!guide) {
    return (
      <div className="min-h-screen bg-white">
        <SiteNav />
        <main className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="text-2xl font-bold text-[#141b2e]">Platform guide not found</h1>
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
          <span>Platforms</span>
          <span className="mx-2">/</span>
          <span className="text-[#3d445c]">{guide.name}</span>
        </nav>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#141b2e] sm:text-4xl">
          {guide.h1}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#3d445c]">{guide.intro}</p>

        <section className="mt-10 rounded-2xl border border-[#e7e9f2] bg-[#f8f9fc] p-6">
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-[#141b2e]">
            <ScanSearch className="h-5 w-5 text-[#6d5df6]" /> First: know what you're running
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#3d445c]">{guide.detectionNote}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {guide.commonWidgets.map((w) => (
              <span
                key={w}
                className="rounded-full border border-[#e7e9f2] bg-white px-3 py-1 text-xs font-medium text-[#3d445c]"
              >
                {w}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-[#141b2e]">
            <ListChecks className="h-5 w-5 text-[#6d5df6]" /> Install it free on {guide.name}
          </h2>
          <ol className="mt-4 space-y-3">
            {guide.freeInstall.map((s, i) => (
              <li key={s} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#3d445c]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#141b2e] text-xs font-bold text-white">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
          <p className="mt-4 flex items-start gap-2 text-sm text-[#5a6378]">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0e9f6e]" />
            Not sure this is even the right fix for your case? The €99 pre-consultory report tells
            you which of your AI systems the Act actually covers, on {guide.name} and everywhere
            else you operate.
          </p>
        </section>

        <CtaBand />

        <section className="mt-12 border-t border-[#eef0f6] pt-8">
          <h3 className="flex items-center gap-2 text-sm font-bold tracking-wide text-[#8a92a6] uppercase">
            <Blocks className="h-4 w-4" /> Other platforms
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {PLATFORMS.filter((p) => p.slug !== guide.slug).map((p) => (
              <Link
                key={p.slug}
                to={`/platforms/${p.slug}`}
                className="rounded-full border border-[#e7e9f2] bg-white px-4 py-1.5 text-sm font-medium text-[#3d445c] hover:border-[#6d5df6] hover:text-[#6d5df6]"
              >
                {p.name}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
