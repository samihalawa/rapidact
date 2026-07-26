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
  FileClock,
  MessagesSquare,
  Tags,
  Video,
} from "lucide-react";
import { track } from "@/lib/analytics";

const reqIcons = [MessagesSquare, Tags, Video, FileClock];
const INSTALL_SNIPPET =
  '<script defer src="https://rapidact.eu/rapidact-badge.js" data-title="AI transparency" data-message="This site uses an AI assistant. You are interacting with an AI system, not a person." data-position="right"></script>';

export default function Guide() {
  const [copied, setCopied] = useState(false);

  const copySnippet = async () => {
    await navigator.clipboard.writeText(INSTALL_SNIPPET);
    track("badge_installer_copy", { installer: "script" });
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="EU AI Act Article 50 in plain English — what your website must do by 2 Aug 2026 | RapidAct"
        description="Article 50 explained without legal jargon: chatbot AI disclosure, AI content labels, deepfake labeling and evidence — who it applies to, deadlines, fines, and how to comply free."
      />
      <SiteNav />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-[#16181d] sm:text-5xl">
          Article 50 of the EU AI Act, in plain English
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#5c6370]">
          From <strong>2 August 2026</strong>, Article 50 introduces
          transparency duties for providers and deployers of certain AI systems.
          The exact duty depends on what the system does and on your role. The
          practical starting point is simple: identify the system, decide who
          holds the duty, and give people the right notice at the right moment.
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
              <p className="eyebrow">Free installer</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-[#16181d]">
                Add the badge with one script tag
              </h2>
              <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#5c6370]">
                No account, plugin or build step. Copy this line into your
                site-wide custom code, just before the closing body tag. Change
                the message inside{" "}
                <code className="mono text-[13px] text-[#16181d]">
                  data-message
                </code>{" "}
                to describe the AI your visitors actually meet.
              </p>
            </div>
          </div>

          <div className="mt-6 overflow-hidden border border-[#d8d8d2] bg-[#16181d]">
            <div className="flex items-center justify-between border-b border-white/15 px-4 py-2.5">
              <span className="mono text-[11px] font-bold tracking-[0.1em] text-white/60 uppercase">
                Install code
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
                {copied ? "Copied" : "Copy code"}
              </button>
            </div>
            <pre className="overflow-x-auto p-4 text-[12px] leading-relaxed text-white/85">
              <code>{INSTALL_SNIPPET}</code>
            </pre>
          </div>

          <ol className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              ["01", "Copy", "Use the button above."],
              [
                "02",
                "Paste",
                "Add it to site-wide custom code or your footer template.",
              ],
              [
                "03",
                "Publish",
                "Open the live site and click the badge to verify the notice.",
              ],
            ].map(([number, title, text]) => (
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
            The badge is a technical disclosure aid, not a universal compliance
            certificate. Under Article 50(1), the design duty sits with the
            provider of the interactive AI system; deployers have separate
            duties for emotion recognition, biometric categorisation, deepfakes
            and certain public-interest text.{" "}
            <a
              href="https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act"
              target="_blank"
              rel="noopener"
              className="font-semibold text-[#1f3a5f] underline underline-offset-2"
            >
              Read the Commission's current scope guidance
            </a>
            .
          </p>
        </section>

        <section className="mt-10 space-y-6 text-[15px] leading-relaxed text-[#5c6370]">
          <div className="rounded border border-[#e2e2dd] bg-[#f7f7f5] p-6">
            <h2 className="text-xl font-bold text-[#16181d]">
              Does it apply to me?
            </h2>
            <p className="mt-3">
              Start by separating role from use. Providers of AI systems that
              directly interact with people must design the system to disclose
              that interaction unless it is obvious. Professional deployers have
              separate disclosure duties when they use emotion or biometric
              categorisation systems, publish deepfakes, or publish AI-generated
              text on matters of public interest without substantive human
              review or editorial control. Company size affects proportionality,
              not the four scope tests.
            </p>
          </div>
          <div className="rounded border border-[#e2e2dd] bg-[#f7f7f5] p-6">
            <h2 className="text-xl font-bold text-[#16181d]">
              The deadline everyone gets wrong
            </h2>
            <p className="mt-3">
              In 2026 the EU delayed parts of the AI Act — the{" "}
              <em>high-risk</em> rules moved to December 2027 and August 2028.
              Many businesses read "AI Act delayed" and relaxed. Article 50
              still applies from <strong>2 August 2026</strong>. The narrow
              transition to 2 December 2026 concerns the provider-side
              machine-readable marking obligation for eligible generative AI
              systems already on the market; it is not a blanket grace period
              for every Article 50 duty.
            </p>
          </div>
          <div className="rounded border border-[#e2e2dd] bg-[#f7f7f5] p-6">
            <h2 className="text-xl font-bold text-[#16181d]">
              What happens if I ignore it?
            </h2>
            <p className="mt-3">
              Article 50 violations can attract fines of{" "}
              <strong>
                up to €15 million or 3% of worldwide annual turnover
              </strong>
              . The Act also requires proportionality to be considered for
              smaller companies. The more immediate commercial risk is being
              unable to explain which system you use, who is responsible for its
              notice, and what users actually saw.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#16181d]">
            The four duties, one guide each
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {REQUIREMENTS.map((r, i) => {
              const Icon = reqIcons[i % reqIcons.length];
              return (
                <Link
                  key={r.slug}
                  to={`/requirements/${r.slug}`}
                  className="group rounded border border-[#e2e2dd] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#1f3a5f] hover:shadow-lg"
                >
                  <Icon className="h-5 w-5 text-[#1f3a5f]" />
                  <p className="mt-3 font-bold text-[#16181d]">{r.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-[#5c6370]">
                    {r.metaDescription}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#1f3a5f]">
                    Read the guide{" "}
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#16181d]">
            Guides for your platform
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {PLATFORMS.map(p => (
              <Link
                key={p.slug}
                to={`/platforms/${p.slug}`}
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
