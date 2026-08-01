import { useParams, Link } from "react-router";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Seo from "@/components/Seo";
import CtaBand from "@/components/CtaBand";
import {
  getPlatform,
  getPlatforms,
  PLATFORM_PAGE_COPY,
} from "@/data/platforms";
import {
  CheckCircle2,
  ScanSearch,
  ListChecks,
  Blocks,
  ExternalLink,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { track } from "@/lib/analytics";

export default function PlatformPage() {
  const { slug } = useParams<{ slug: string }>();
  const { lang, path } = useI18n();
  const copy = PLATFORM_PAGE_COPY[lang];
  const guide = slug ? getPlatform(slug, lang) : undefined;
  const platforms = getPlatforms(lang);

  if (!guide) {
    return (
      <div className="min-h-screen bg-white">
        <SiteNav />
        <main className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="text-2xl font-bold text-[#16181d]">{copy.notFound}</h1>
          <Link
            to={path("/")}
            className="mt-4 inline-block text-[#1f3a5f] underline"
          >
            {copy.back}
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title={guide.metaTitle}
        description={guide.metaDescription}
        localized
      />
      <SiteNav />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <nav className="text-xs text-[#6b7280]">
          <Link to={path("/")} className="hover:text-[#16181d]">
            RapidAct
          </Link>
          <span className="mx-2">/</span>
          <span>{copy.platforms}</span>
          <span className="mx-2">/</span>
          <span className="text-[#5c6370]">{guide.name}</span>
        </nav>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#16181d] sm:text-4xl">
          {guide.h1}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#5c6370]">
          {guide.intro}
        </p>

        <section className="mt-10 rounded border border-[#e2e2dd] bg-[#f7f7f5] p-6">
          <h2 className="flex items-center gap-2 text-xl font-bold text-[#16181d]">
            <ScanSearch className="h-5 w-5 text-[#1f3a5f]" />{" "}
            {copy.confirmTitle}
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#5c6370]">
            {guide.detectionNote}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {guide.commonWidgets.map(w => (
              <span
                key={w}
                className="rounded border border-[#e2e2dd] bg-white px-3 py-1 text-xs font-medium text-[#5c6370]"
              >
                {w}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-xl font-bold text-[#16181d]">
            <ListChecks className="h-5 w-5 text-[#1f3a5f]" />{" "}
            {copy.installTitle(guide)}
          </h2>
          <ol className="mt-4 space-y-3">
            {guide.freeInstall.map((s, i) => (
              <li
                key={s}
                className="flex items-start gap-3 text-[15px] leading-relaxed text-[#5c6370]"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#16181d] text-xs font-bold text-white">
                  {i + 1}
                </span>
                {s}
              </li>
            ))}
          </ol>
          {guide.installUrl ? (
            <a
              href={guide.installUrl}
              target="_blank"
              rel="noopener"
              onClick={() =>
                track("badge_installer_marketplace_clicked", {
                  installer: guide.slug,
                  marketplace: guide.slug,
                  source: "platform_guide",
                })
              }
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded bg-[#16181d] px-6 text-sm font-bold text-white transition hover:bg-[#2b2f38]"
            >
              {copy.installOfficial(guide)}
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : (
            <Link
              to={path("/article-50#install")}
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded bg-[#16181d] px-6 text-sm font-bold text-white transition hover:bg-[#2b2f38]"
            >
              {copy.addNotice}
            </Link>
          )}
          <p className="mt-4 flex items-start gap-2 text-sm text-[#5c6370]">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#0e9f6e]" />
            {copy.assessment(guide)}
          </p>
        </section>

        <CtaBand />

        <section className="mt-12 border-t border-[#e2e2dd] pt-8">
          <h3 className="flex items-center gap-2 text-sm font-bold tracking-wide text-[#6b7280] uppercase">
            <Blocks className="h-4 w-4" /> {copy.otherPlatforms}
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {platforms
              .filter(p => p.slug !== guide.slug)
              .map(p => (
                <Link
                  key={p.slug}
                  to={path(`/platforms/${p.slug}`)}
                  className="rounded border border-[#e2e2dd] bg-white px-4 py-1.5 text-sm font-medium text-[#5c6370] hover:border-[#1f3a5f] hover:text-[#1f3a5f]"
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
