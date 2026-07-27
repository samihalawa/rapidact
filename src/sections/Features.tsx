import { useNavigate } from "react-router";
import { CONVERT } from "@/config";
import { useI18n } from "@/lib/i18n";
import { HOME_COPY } from "@/data/localizedHome";

/** The complete RapidAct workflow, from free detection to paid assessment. */
export default function Features() {
  const navigate = useNavigate();
  const { lang, path, t } = useI18n();
  const copy = HOME_COPY[lang];
  return (
    <section id="features" className="paper hairline border-b py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="eyebrow">{copy.featuresLabel}</p>
        <h2 className="ink mt-3 max-w-2xl text-[28px] leading-tight font-bold tracking-[-0.015em] sm:text-[32px]">
          {copy.featuresTitle}
        </h2>
        <p className="ink-soft mt-3 max-w-2xl text-[16px] leading-relaxed">
          {copy.featuresIntro}
        </p>

        <div className="hairline mt-10 grid border-t sm:grid-cols-2 lg:grid-cols-4">
          {copy.features.map((tool, index) => (
            <div
              key={tool.title}
              className="hairline border-b py-6 sm:pr-8 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
            >
              <span className="mono ink-soft text-[11px]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="ink text-[15px] font-semibold">{tool.title}</h3>
              <p className="ink-soft mt-2 text-[15px] leading-relaxed">
                {tool.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <p className="ink-soft max-w-2xl text-[15px] leading-relaxed">
            {copy.featuresClose}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              data-analytics-event="free_scan_click"
              data-analytics-label="Workflow scan CTA"
              onClick={() => navigate(path(CONVERT.scanner))}
              className="inline-flex min-h-11 items-center rounded bg-[#16181d] px-5 text-[14px] font-semibold text-white hover:bg-[#2b2f38]"
            >
              {t("hero.scan")}
            </button>
            <button
              data-analytics-event="badge_installer_view"
              data-analytics-label="Workflow notice CTA"
              onClick={() => navigate(path(CONVERT.badge))}
              className="hairline inline-flex min-h-11 items-center rounded border bg-white px-5 text-[14px] font-semibold text-[#16181d] hover:bg-[#f7f7f5]"
            >
              {copy.copyCode}
            </button>
            <button
              onClick={() => navigate(path(CONVERT.report))}
              className="accent inline-flex min-h-11 items-center px-1 text-[14px] font-semibold underline underline-offset-2"
            >
              {t("hero.request")} · €99
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
