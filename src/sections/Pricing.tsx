import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { CONVERT, REPORT } from "@/config";
import { useI18n } from "@/lib/i18n";
import { HOME_COPY } from "@/data/localizedHome";

export default function Pricing() {
  const navigate = useNavigate();
  const { lang, path, t } = useI18n();
  const copy = HOME_COPY[lang];
  return (
    <section id="pricing" className="paper-alt hairline border-b py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="eyebrow">{copy.pricingLabel}</p>
        <h2 className="ink mt-3 max-w-2xl text-[28px] leading-tight font-bold tracking-[-0.015em] sm:text-[32px]">
          {copy.pricingTitle}
        </h2>
        <p className="ink-soft mt-3 max-w-2xl text-[16px] leading-relaxed">
          {copy.pricingIntro}
        </p>

        <div className="hairline mt-10 border bg-white">
          <div className="hairline grid border-b lg:grid-cols-[22rem_1fr]">
            <div className="hairline border-b p-7 lg:border-r lg:border-b-0">
              <p className="eyebrow">{copy.assessmentLabel}</p>
              <h3 className="ink mt-2 text-[19px] leading-snug font-semibold">
                {REPORT.name}
              </h3>
              <p className="ink mt-5 text-[42px] leading-none font-bold tracking-tight">
                €99
              </p>
              <p className="ink-soft mt-1.5 text-[13px]">
                {copy.chargedOnce}
              </p>
              <Button
                className="mt-6 h-11 w-full rounded bg-[#16181d] text-[15px] font-semibold text-white hover:bg-[#2b2f38]"
                onClick={() => navigate(path(CONVERT.report))}
              >
                {t("hero.request")}
              </Button>
              <p className="ink-soft mt-3 text-[12px] leading-relaxed">
                {copy.paymentLead}
              </p>
              <button
                onClick={() => navigate(path(CONVERT.example))}
                className="accent mt-3 text-[13px] font-semibold underline underline-offset-2"
              >
                {copy.specimenFirst}
              </button>
            </div>

            <div className="p-7">
              <p className="eyebrow">{copy.feeCovers}</p>
              <ul className="mt-4 space-y-3">
                {copy.deliverables.map(d => (
                  <li key={d} className="flex gap-3 text-[15px]">
                    <span className="ink-soft mono shrink-0 pt-0.5 text-[11px]">
                      &bull;
                    </span>
                    <span className="ink-soft leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <dl className="grid divide-y divide-[#e2e2dd] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {copy.facts.map(([label, value]) => (
              <div key={label} className="px-6 py-4">
                <dt className="eyebrow">{label}</dt>
                <dd className="ink-soft mt-1 text-[13px] leading-relaxed">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Free tools, deliberately secondary */}
        <div className="mt-12">
          <p className="eyebrow">{copy.freeLabel}</p>
          <div className="hairline mt-4 grid border-t sm:grid-cols-2">
            {copy.freeTools.map((tool, index) => (
              <div
                key={tool.title}
                className="hairline border-b py-6 sm:pr-8 sm:last:pl-8 sm:last:pr-0"
              >
                <h3 className="ink text-[15px] font-semibold">{tool.title}</h3>
                <p className="ink-soft mt-2 text-[15px] leading-relaxed">
                  {tool.text}
                </p>
                <button
                  onClick={() => navigate(path(index === 0 ? CONVERT.scanner : CONVERT.badge))}
                  className="accent mt-3 text-[14px] font-semibold underline underline-offset-2"
                >
                  {tool.cta}
                </button>
              </div>
            ))}
          </div>
        </div>

        <p className="ink-soft mt-8 max-w-3xl text-[13px] leading-relaxed">
          {copy.invoice}
        </p>
      </div>
    </section>
  );
}
