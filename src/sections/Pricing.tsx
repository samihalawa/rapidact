import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Check, ShieldCheck, ArrowRight, ScanSearch, Puzzle } from "lucide-react";
import { CONVERT, REPORT } from "@/config";
import { REPORT_DELIVERABLES } from "@/data/report";
import Countdown from "@/components/Countdown";

/** The free tools that stay free — secondary to the paid report. */
const freeTools = [
  {
    icon: ScanSearch,
    name: "Site scanner",
    price: "€0",
    text: "Paste a URL, see which AI systems are detectable on your site and whether they are disclosed. Unlimited, no signup.",
    cta: "Scan my site",
    to: CONVERT.scanner,
  },
  {
    icon: Puzzle,
    name: "Self-install disclosure layer",
    price: "€0",
    text: "The transparency badge, AI content labels and evidence log — free plugin and guides for WordPress, Wix, Shopify or any stack. Install it yourself, keep it forever.",
    cta: "See the guides",
    to: "/article-50",
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  return (
    <section id="pricing" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold tracking-wide text-[#6d5df6] uppercase">Pricing</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#141b2e] sm:text-4xl">
            One report. One price. No subscription.
          </h2>
          <p className="mt-3 text-lg text-[#5a6378]">
            The tools on this site are free and stay free. What you pay for is a specialist telling
            you, in writing, exactly where your company stands.
          </p>
          <Countdown className="mt-4" />
        </div>

        {/* primary offer */}
        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border border-[#141b2e] bg-[#141b2e] text-white shadow-2xl">
          <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <span className="rounded-full bg-[#ffd617] px-3 py-1 text-[11px] font-extrabold tracking-wide text-[#141b2e] uppercase">
                The report
              </span>
              <h3 className="mt-4 text-2xl leading-tight font-extrabold">{REPORT.name}</h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold tracking-tight">€99</span>
                <span className="text-sm text-white/60">one-time · per company</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                The same model as a law firm's pre-consultation fee: you pay to have your case
                properly looked at, and you walk away with a document you can act on.
              </p>
              <Button
                className="mt-6 h-12 w-full rounded-full bg-white text-base font-bold text-[#141b2e] hover:bg-[#f1f2f8]"
                onClick={() => navigate(CONVERT.report)}
              >
                Get my report
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
              <p className="mt-3 text-center text-xs text-white/50">
                You fill in your details first — nothing is charged until you review them.
              </p>
            </div>

            <div className="lg:border-l lg:border-white/10 lg:pl-8">
              <p className="text-xs font-bold tracking-wide text-[#ffd617] uppercase">
                Everything included
              </p>
              <ul className="mt-4 space-y-3">
                {REPORT_DELIVERABLES.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#ffd617]" />
                    <span className="leading-relaxed text-white/85">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 border-t border-white/10 bg-white/[0.03] px-8 py-4">
            {[
              `Delivered in ${REPORT.delivery} or full refund`,
              "One-time — never a subscription",
              "VAT invoice included",
              "Any company size",
            ].map((g) => (
              <span key={g} className="flex items-center gap-2 text-xs font-semibold text-white/70">
                <ShieldCheck className="h-4 w-4 text-[#0e9f6e]" />
                {g}
              </span>
            ))}
          </div>
        </div>

        {/* free tools — secondary */}
        <div className="mx-auto mt-10 max-w-4xl">
          <p className="text-center text-sm font-semibold text-[#8a92a6]">
            Free either way — with or without the report
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {freeTools.map((t) => (
              <div
                key={t.name}
                className="rounded-2xl border border-[#e7e9f2] bg-[#f8f9fc] p-6 transition hover:border-[#6d5df6]/40"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white">
                    <t.icon className="h-4 w-4 text-[#6d5df6]" />
                  </div>
                  <span className="text-lg font-extrabold text-[#141b2e]">{t.price}</span>
                </div>
                <p className="mt-3 text-base font-bold text-[#141b2e]">{t.name}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#5a6378]">{t.text}</p>
                <button
                  onClick={() => navigate(t.to)}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#6d5df6] transition hover:gap-2.5"
                >
                  {t.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-[#8a92a6]">
          Prices exclude VAT. RapidAct produces technical and organisational compliance
          assessments — it is not a law firm and the report is not legal advice.
        </p>
      </div>
    </section>
  );
}
