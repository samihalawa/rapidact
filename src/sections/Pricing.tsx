import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { CONVERT, REPORT } from "@/config";
import { REPORT_DELIVERABLES } from "@/data/report";
import { ENTITY_DISPLAY_NAME, HAS_VAT } from "@/data/company";

/** The free tools, kept genuinely free and stated as secondary. */
const freeTools = [
  {
    name: "Website scanner",
    text: "Submit a URL and see which AI systems are detectable on your pages, checked against 52 known chatbot platforms, with the evidence found for each. Unlimited, no account.",
    cta: "Scan a website",
    to: CONVERT.scanner,
  },
  {
    name: "Self-install disclosure layer",
    text: "The visitor notice, AI content labels and evidence log, as a free plugin with guides for WordPress, Wix, Shopify or a plain script tag. Install it yourself and keep it.",
    cta: "Read the guides",
    to: "/article-50",
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  return (
    <section id="pricing" className="paper-alt hairline border-b py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="eyebrow">Fees</p>
        <h2 className="ink mt-3 max-w-2xl text-[28px] leading-tight font-bold tracking-[-0.015em] sm:text-[32px]">
          One fee, charged once
        </h2>
        <p className="ink-soft mt-3 max-w-2xl text-[16px] leading-relaxed">
          The tools on this site are free and remain free. The fee is for a specialist reading your
          case and putting the answer in writing.
        </p>

        <div className="hairline mt-10 border bg-white">
          <div className="hairline grid border-b lg:grid-cols-[22rem_1fr]">
            <div className="hairline border-b p-7 lg:border-r lg:border-b-0">
              <p className="eyebrow">Assessment</p>
              <h3 className="ink mt-2 text-[19px] leading-snug font-semibold">{REPORT.name}</h3>
              <p className="ink mt-5 text-[42px] leading-none font-bold tracking-tight">€99</p>
              <p className="ink-soft mt-1.5 text-[13px]">
                Charged once, per company. Not a subscription.
              </p>
              <Button
                className="mt-6 h-11 w-full rounded bg-[#16181d] text-[15px] font-semibold text-white hover:bg-[#2b2f38]"
                onClick={() => navigate(CONVERT.report)}
              >
                Request the assessment
              </Button>
              <p className="ink-soft mt-3 text-[12px] leading-relaxed">
                You enter your details first and review them before any payment is taken. Nothing
                is charged on this website.
              </p>
            </div>

            <div className="p-7">
              <p className="eyebrow">What the fee covers</p>
              <ul className="mt-4 space-y-3">
                {REPORT_DELIVERABLES.map((d) => (
                  <li key={d} className="flex gap-3 text-[15px]">
                    <span className="ink-soft mono shrink-0 pt-0.5 text-[11px]">&bull;</span>
                    <span className="ink-soft leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <dl className="grid divide-y divide-[#e2e2dd] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              ["Delivery", `Within ${REPORT.delivery} of payment`],
              ["If we miss it", "Refunded in full, on request"],
              ["Payment handled by", "bunq. Card details never reach us"],
            ].map(([t, v]) => (
              <div key={t} className="px-6 py-4">
                <dt className="eyebrow">{t}</dt>
                <dd className="ink-soft mt-1 text-[13px] leading-relaxed">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Free tools, deliberately secondary */}
        <div className="mt-12">
          <p className="eyebrow">Free, with or without an assessment</p>
          <div className="hairline mt-4 grid border-t sm:grid-cols-2">
            {freeTools.map((t) => (
              <div key={t.name} className="hairline border-b py-6 sm:pr-8 sm:last:pl-8 sm:last:pr-0">
                <h3 className="ink text-[15px] font-semibold">{t.name}</h3>
                <p className="ink-soft mt-2 text-[15px] leading-relaxed">{t.text}</p>
                <button
                  onClick={() => navigate(t.to)}
                  className="accent mt-3 text-[14px] font-semibold underline underline-offset-2"
                >
                  {t.cta}
                </button>
              </div>
            ))}
          </div>
        </div>

        <p className="ink-soft mt-8 max-w-3xl text-[13px] leading-relaxed">
          {HAS_VAT
            ? "Prices exclude VAT. A VAT invoice is issued for every payment."
            : `An invoice is issued for every payment by ${ENTITY_DISPLAY_NAME}.`}{" "}
          RapidAct produces technical and organisational compliance assessments. It is not a law
          firm and the report is not legal advice.
        </p>
      </div>
    </section>
  );
}
