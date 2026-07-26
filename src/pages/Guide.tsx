import { useState } from "react";
import { Link } from "react-router";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Seo from "@/components/Seo";
import CtaBand from "@/components/CtaBand";
import { REQUIREMENTS } from "@/data/requirements";
import { PLATFORMS } from "@/data/platforms";
import {
  ArrowRight,
  Check,
  Code2,
  Copy,
  Download,
  FileClock,
  MessagesSquare,
  Tags,
  Video,
} from "lucide-react";
import { track } from "@/lib/analytics";
import { useI18n } from "@/lib/i18n";
import { GUIDE_COPY } from "@/data/localizedGuide";

const reqIcons = [MessagesSquare, Tags, Video, FileClock];
const platformInstallers = [
  {
    slug: "wordpress" as const,
    name: "WordPress",
    href: "/downloads/rapidact-wordpress.zip",
  },
  {
    slug: "shopify" as const,
    name: "Shopify",
    href: "/downloads/rapidact-shopify.zip",
  },
  {
    slug: "wix" as const,
    name: "Wix",
    href: "/downloads/rapidact-wix.zip",
  },
];

export default function Guide() {
  const [copied, setCopied] = useState(false);
  const { lang, path } = useI18n();
  const copy = GUIDE_COPY[lang];
  const installSnippet = `<script defer src="https://rapidact.eu/rapidact-badge.js" data-message="${copy.noticeMessage}" data-position="right"></script>`;

  const copySnippet = async () => {
    await navigator.clipboard.writeText(installSnippet);
    track("badge_installer_copy", { installer: "script" });
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Seo title={copy.seoTitle} description={copy.seoDescription} />
      <SiteNav />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-[#16181d] sm:text-5xl">
          {copy.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#5c6370]">
          {copy.intro}
        </p>

        <section
          id="install"
          className="mt-10 scroll-mt-28 border border-[#16181d] bg-[#f7f7f5] p-5 sm:p-7"
        >
          <div className="flex items-start gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded bg-[#16181d] text-white">
              <Code2 className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="eyebrow">{copy.installLabel}</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#16181d]">
                {copy.installTitle}
              </h2>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#5c6370]">
                {copy.installBody}
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-5 rounded-xl border border-[#b9d8ff] bg-white p-4 shadow-[0_12px_32px_rgba(5,25,70,0.12)]">
            <div className="flex min-w-0 items-center gap-3">
              <img
                src="/brand/rapidact-exact-symbol.png"
                alt=""
                aria-hidden="true"
                className="h-14 w-auto shrink-0"
              />
              <div className="min-w-0">
                <p className="brand-wordmark text-lg font-bold tracking-[-0.04em] text-[#03123d]">
                  Rapid<span className="text-[#087ee8]">Act</span>
                </p>
                <p className="mt-0.5 text-[10px] leading-none font-extrabold tracking-[0.08em] text-[#12366c] uppercase">
                  AI use disclosed
                </p>
              </div>
            </div>
            <span className="eyebrow shrink-0">{copy.preview}</span>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold tracking-tight text-[#16181d]">
              {copy.installerTitle}
            </h3>
            <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[#5c6370]">
              {copy.installerBody}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {platformInstallers.map(installer => {
                const installerCopy = copy.installers[installer.slug];
                return (
                  <article
                    key={installer.slug}
                    className="flex min-h-full flex-col border border-[#d8d8d2] bg-white p-4"
                  >
                    <p className="mono text-[10px] font-bold tracking-[0.08em] text-[#6b7280] uppercase">
                      {installerCopy.type}
                    </p>
                    <h4 className="mt-2 text-base font-bold text-[#16181d]">
                      {installer.name}
                    </h4>
                    <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[#5c6370]">
                      {installerCopy.body}
                    </p>
                    <a
                      href={installer.href}
                      download
                      onClick={() =>
                        track("platform_installer_download", {
                          platform: installer.slug,
                        })
                      }
                      className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded bg-[#16181d] px-3 text-center text-[12px] font-bold text-white transition hover:bg-[#2b2f38] focus-visible:ring-2 focus-visible:ring-[#1f3a5f] focus-visible:ring-offset-2 focus-visible:outline-none"
                    >
                      <Download className="h-4 w-4" aria-hidden="true" />
                      {installerCopy.action}
                    </a>
                    <Link
                      to={path(`/platforms/${installer.slug}`)}
                      className="mt-3 text-center text-[12px] font-semibold text-[#1f3a5f] underline underline-offset-2"
                    >
                      {copy.openGuide}
                    </Link>
                  </article>
                );
              })}
            </div>
            <div className="mt-3 border border-[#d8d8d2] bg-[#eef5ff] p-4">
              <p className="mono text-[10px] font-bold tracking-[0.08em] text-[#1f3a5f] uppercase">
                Google Tag Manager
              </p>
              <h4 className="mt-2 text-base font-bold text-[#16181d]">
                {copy.tagManagerTitle}
              </h4>
              <p className="mt-1 text-[13px] leading-relaxed text-[#5c6370]">
                {copy.tagManagerBody}
              </p>
            </div>
          </div>

          <h3 className="mt-8 text-lg font-bold tracking-tight text-[#16181d]">
            {copy.anySiteTitle}
          </h3>
          <div className="mt-6 overflow-hidden border border-[#d8d8d2] bg-[#16181d]">
            <div className="flex items-center justify-between border-b border-white/15 px-4 py-2.5">
              <span className="mono text-[11px] font-bold tracking-[0.1em] text-white/60 uppercase">
                {copy.installCode}
              </span>
              <button
                type="button"
                onClick={copySnippet}
                className="inline-flex min-h-11 items-center gap-2 rounded border border-white/25 px-3 text-[13px] font-semibold text-white transition hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                aria-live="polite"
              >
                {copied ? (
                  <Check className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4" aria-hidden="true" />
                )}
                {copied ? copy.copied : copy.copy}
              </button>
            </div>
            <pre className="overflow-x-auto p-4 text-[12px] leading-relaxed text-white/85">
              <code>{installSnippet}</code>
            </pre>
          </div>

          <ol className="mt-5 grid gap-3 sm:grid-cols-3">
            {copy.steps.map(([number, title, text]) => (
              <li key={number} className="border-t border-[#d8d8d2] pt-3">
                <span className="mono text-[11px] text-[#6b7280]">
                  {number}
                </span>
                <p className="mt-1 text-[14px] font-bold text-[#16181d]">
                  {title}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-[#5c6370]">
                  {text}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-5 border-l-2 border-[#1f3a5f] pl-4 text-[13px] leading-relaxed text-[#5c6370]">
            {copy.scope}{" "}
            <a
              href="https://digital-strategy.ec.europa.eu/en/library/guidelines-transparency-obligations-providers-and-deployers-ai-systems"
              target="_blank"
              rel="noopener"
              className="font-semibold text-[#1f3a5f] underline underline-offset-2"
            >
              {copy.scopeLink}
            </a>
            .
          </p>
        </section>

        <section className="mt-10 space-y-6 text-[15px] leading-relaxed text-[#5c6370]">
          <div className="rounded border border-[#e2e2dd] bg-[#f7f7f5] p-6">
            <h2 className="text-xl font-bold text-[#16181d]">
              {copy.appliesTitle}
            </h2>
            <p className="mt-3">{copy.appliesBody}</p>
          </div>
          <div className="rounded border border-[#e2e2dd] bg-[#f7f7f5] p-6">
            <h2 className="text-xl font-bold text-[#16181d]">
              {copy.deadlineTitle}
            </h2>
            <p className="mt-3">{copy.deadlineBody}</p>
          </div>
          <div className="rounded border border-[#e2e2dd] bg-[#f7f7f5] p-6">
            <h2 className="text-xl font-bold text-[#16181d]">
              {copy.riskTitle}
            </h2>
            <p className="mt-3">{copy.riskBody}</p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#16181d]">
            {copy.dutiesTitle}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {REQUIREMENTS.map((r, i) => {
              const Icon = reqIcons[i % reqIcons.length];
              return (
                <Link
                  key={r.slug}
                  to={path(`/requirements/${r.slug}`)}
                  className="group rounded border border-[#e2e2dd] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#1f3a5f] hover:shadow-lg"
                >
                  <Icon className="h-5 w-5 text-[#1f3a5f]" />
                  <p className="mt-3 font-bold text-[#16181d]">{r.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-[#5c6370]">
                    {r.metaDescription}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#1f3a5f]">
                    {copy.readGuide}{" "}
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#16181d]">
            {copy.platformsTitle}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {PLATFORMS.map(p => (
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

        <CtaBand />
      </main>
      <SiteFooter />
    </div>
  );
}
