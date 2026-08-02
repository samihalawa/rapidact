import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { CONVERT } from "@/config";
import { daysLeft } from "@/components/Countdown";
import { useI18n } from "@/lib/i18n";
import { HOME_COPY } from "@/data/localizedHome";

const WORKFLOW_KEYS = ["scan", "disclose", "implement", "assess"] as const;

/**
 * RapidAct is a progressive workflow, not only a report. The free operational
 * layer makes the practice useful before purchase; the specialist assessment
 * remains the primary commercial action for companies that need a complete view.
 */
function RapidActWorkflow() {
  const { t } = useI18n();

  return (
    <div className="relative pt-4 pr-4">
      <div
        className="absolute top-0 right-0 bottom-4 left-4 border border-[#d8d8d2] bg-[#eeeee9]"
        aria-hidden="true"
      />
      <div className="hairline relative overflow-hidden border bg-white shadow-[0_16px_35px_rgba(22,24,29,0.10)]">
        <div className="flex items-center justify-between bg-[#16181d] px-5 py-4 sm:px-6">
          <p className="text-[10px] font-bold tracking-[0.14em] text-white/60 uppercase">
            {t("hero.workflow")}
          </p>
          <span className="text-[11px] font-semibold text-white/80">
            {t("hero.workflowStatus")}
          </span>
        </div>

        <div>
          {WORKFLOW_KEYS.map((key, index) => (
            <div
              key={key}
              className="hairline grid grid-cols-[2.25rem_1fr_auto] items-center gap-3 border-b px-5 py-5 last:border-b-0 sm:grid-cols-[2.75rem_1fr_auto] sm:px-6"
            >
              <span className="mono ink-soft text-[11px]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="ink text-[15px] font-semibold">
                  {t(`hero.workflow.${key}`)}
                </p>
                <p className="ink-soft mt-1 text-[12px] leading-relaxed">
                  {t(`hero.workflow.${key}Body`)}
                </p>
              </div>
              <span
                className={`min-w-14 border px-2.5 py-1 text-center text-[10px] font-bold tracking-[0.08em] uppercase ${
                  key === "assess"
                    ? "border-[#16181d] bg-[#16181d] text-white"
                    : "hairline bg-[#f7f7f5] text-[#5c6370]"
                }`}
              >
                {key === "assess" ? "€99" : t("hero.free")}
              </span>
            </div>
          ))}
        </div>

        <div className="hairline border-t bg-[#f7f7f5] px-5 py-4 sm:px-6">
          <p className="ink-soft text-[12px] leading-relaxed">
            {t("hero.workflowFoot")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const navigate = useNavigate();
  const d = daysLeft();
  const { lang, path, t } = useI18n();
  const copy = HOME_COPY[lang];

  return (
    <section className="paper hairline border-b">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="lg:pt-4">
          <div className="hairline flex flex-wrap items-center gap-x-3 gap-y-1 border-l-2 border-l-[#16181d] pl-3">
            <span className="ink text-[13px] font-semibold">
              {t("hero.kicker")}
            </span>
            <span className="ink-soft text-[13px]">
              {d === 0 ? copy.statusLive : copy.statusFuture(d)}
            </span>
          </div>

          <h1 className="ink mt-6 text-[36px] leading-[1.04] font-bold tracking-[-0.025em] sm:text-[50px] sm:leading-[1.06]">
            {t("hero.title")}
          </h1>

          <p className="ink-soft mt-5 max-w-xl text-[17px] leading-relaxed">
            {t("hero.body")}
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Button
              data-analytics-event="report_started"
              data-analytics-label="Hero assessment CTA"
              size="lg"
              className="h-12 rounded bg-[#16181d] px-7 text-[15px] font-semibold text-white hover:bg-[#2b2f38]"
              onClick={() => navigate(path(CONVERT.report))}
            >
              {t("hero.request")} · €99
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="hairline h-12 rounded border bg-white px-7 text-[15px] font-semibold text-[#16181d] hover:bg-[#f7f7f5]"
            >
              <a
                href={CONVERT.calBooking}
                target="_blank"
                rel="noopener"
                data-analytics-event="booking_click"
                data-analytics-label="Hero book a call CTA"
              >
                {t("hero.bookCall")}
              </a>
            </Button>
          </div>

          <p className="ink-soft mt-4 max-w-xl text-[13px] leading-relaxed">
            {t("hero.price")}
          </p>

          <p className="ink-soft mt-5 max-w-xl text-[13px] leading-relaxed">
            {copy.heroDisclaimer}
          </p>
        </div>

        <div className="lg:pt-2">
          <RapidActWorkflow />
        </div>
      </div>
    </section>
  );
}
