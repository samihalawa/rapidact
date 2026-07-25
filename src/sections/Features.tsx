import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageSquareWarning,
  FileClock,
  Tags,
  Layers,
  BookOpenCheck,
  ScanSearch,
  ArrowRight,
} from "lucide-react";
import { CONVERT } from "@/config";

const features = [
  {
    icon: ScanSearch,
    title: "AI detection scanner",
    text: "Paste your URL and see which AI systems are detectable on your site, matched against 52 known chatbot platforms, with the exact evidence found on each page.",
  },
  {
    icon: MessageSquareWarning,
    title: "Visitor AI disclosure",
    text: "The clear notice Article 50(1) demands, shown before anyone chats with your AI — in English and Spanish, styled to match your site.",
  },
  {
    icon: Tags,
    title: "AI content labels",
    text: "Ready-made labels for AI-generated images, video and text, using the EU-standard icon set — so synthetic content is marked, not debated.",
  },
  {
    icon: FileClock,
    title: "Timestamped evidence log",
    text: "Every disclosure view logged with a time and a page. When a regulator, client or board asks you to prove it, you export a CSV instead of panicking.",
  },
  {
    icon: Layers,
    title: "Works on your stack",
    text: "WordPress plugin, Wix app, Shopify block, or a single script tag for anything else. Your chatbot — Tidio, Botpress, Zendesk, Intercom — stays exactly as it is.",
  },
  {
    icon: BookOpenCheck,
    title: "Plain-English guides",
    text: "No legal jargon, no technical jargon. Each guide explains what the rule means for your site and the exact clicks that satisfy it.",
  },
];

/**
 * The free self-install layer. Secondary to the paid report, but kept prominent —
 * it is a genuine free offer and the main organic-search entry point to the site.
 */
export default function Features() {
  const navigate = useNavigate();
  return (
    <section id="features" className="mesh-bg py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#bbf7d0] bg-[#ecfdf5] px-3 py-1 text-xs font-bold text-[#047857]">
            Free forever · no account needed
          </span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#141b2e] sm:text-4xl">
            The tools stay free. Always.
          </h2>
          <p className="mt-3 text-lg text-[#5a6378]">
            Once you know what your company has to do, the technical part is not the hard part — so
            we do not charge for it. Scan your site, install the disclosure layer, keep the evidence
            log. €0, yours to keep, whether or not you ever buy a report.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card
              key={f.title}
              className="border-white/70 bg-white/85 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0eeff]">
                  <f.icon className="h-5 w-5 text-[#6d5df6]" />
                </div>
                <CardTitle className="pt-2 text-base font-bold text-[#141b2e]">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-[#5a6378]">{f.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4 rounded-2xl border border-[#e7e9f2] bg-white/80 px-6 py-5 backdrop-blur">
          <p className="flex-1 text-sm leading-relaxed text-[#5a6378]">
            <strong className="text-[#141b2e]">Installing is the easy half.</strong> Knowing which
            of your systems the AI Act actually covers — and what you must be able to prove — is the
            half that costs companies money. That is what the report is for.
          </p>
          <button
            onClick={() => navigate(CONVERT.report)}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#141b2e] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#232c4a]"
          >
            Get my report — €99
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
