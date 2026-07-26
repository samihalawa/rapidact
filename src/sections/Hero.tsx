import { useNavigate, Link } from "react-router";
import { Button } from "@/components/ui/button";
import { CONVERT, REPORT } from "@/config";
import { daysLeft } from "@/components/Countdown";
import { FileText } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { HOME_COPY } from "@/data/localizedHome";

/** Preview generated from pages in the downloadable specimen PDF. */
function ReportPreview() {
  const { lang, path, t } = useI18n();
  const copy = HOME_COPY[lang];
  return (
    <div className="relative pt-4 pr-4">
      <div
        className="absolute top-0 right-0 bottom-4 left-4 border border-[#d8d8d2] bg-[#eeeee9]"
        aria-hidden="true"
      />
      <div className="hairline relative overflow-hidden border bg-[#f7f7f5] shadow-[0_16px_35px_rgba(22,24,29,0.10)]">
        <div className="hairline flex items-center justify-between border-b bg-[#16181d] px-5 py-4 sm:px-6">
          <p className="text-[10px] font-bold tracking-[0.14em] text-white/55 uppercase">
            {t("nav.specimen")} PDF
          </p>
          <span className="inline-flex items-center gap-1.5 text-[11px] text-white/55">
            <FileText className="h-3.5 w-3.5" /> {t("specimen.pages")}
          </span>
        </div>

        <div className="relative mx-auto grid max-w-[31rem] grid-cols-[0.78fr_1fr] items-end px-5 pt-7 pb-6 sm:px-8 sm:pt-9">
          <img
            src="/reports/rapidact-specimen-cover.webp"
            alt={`${REPORT.name} — ${t("nav.specimen")} cover`}
            width="760"
            height="1075"
            loading="eager"
            className="relative z-0 w-full -rotate-2 border border-[#d8d8d2] shadow-[0_12px_28px_rgba(22,24,29,0.16)]"
          />
          <img
            src="/reports/rapidact-specimen-inventory.webp"
            alt={copy.chapters[0].title}
            width="760"
            height="1075"
            loading="eager"
            className="relative z-10 -ml-6 w-[calc(100%+1.5rem)] rotate-1 border border-[#d8d8d2] bg-white shadow-[0_14px_30px_rgba(22,24,29,0.18)] sm:-ml-9 sm:w-[calc(100%+2.25rem)]"
          />
        </div>

        <div className="hairline border-t bg-white px-5 py-4 sm:px-6">
          <p className="ink text-[13px] font-semibold">{REPORT.name}</p>
          <p className="ink-soft mt-1 text-[12px] leading-relaxed">
            {copy.prepared}
          </p>
          <Link
            to={path(CONVERT.example)}
            data-analytics-event="view_specimen"
            data-analytics-label="Hero report preview"
            className="accent mt-2 inline-block text-[12px] font-semibold underline underline-offset-2"
          >
            {t("hero.specimen")}
          </Link>
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
          {/* Regulatory status, stated as fact rather than as an urgency device. */}
          <div className="hairline flex flex-wrap items-center gap-x-3 gap-y-1 border-l-2 border-l-[#16181d] pl-3">
            <span className="ink text-[13px] font-semibold">
              {t("hero.kicker")}
            </span>
            <span className="ink-soft text-[13px]">
              {d === 0 ? copy.statusLive : copy.statusFuture(d)}
            </span>
          </div>

          <h1 className="ink mt-6 text-[34px] leading-[1.08] font-bold tracking-[-0.02em] sm:text-[46px] sm:leading-[1.1]">
            {t("hero.title")}
          </h1>

          <p className="ink-soft mt-5 max-w-xl text-[17px] leading-relaxed">
            {t("hero.body")}
          </p>

          <p className="ink-soft mt-4 max-w-xl text-[17px] leading-relaxed">
            {t("hero.price")}
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Button
              data-analytics-event="report_started"
              data-analytics-label="Hero assessment CTA"
              size="lg"
              className="h-12 rounded bg-[#16181d] px-7 text-[15px] font-semibold text-white hover:bg-[#2b2f38]"
              onClick={() => navigate(path(CONVERT.report))}
            >
              {t("hero.request")}
            </Button>
            <Button
              data-analytics-event="view_specimen"
              data-analytics-label="Hero specimen CTA"
              size="lg"
              variant="outline"
              className="hairline h-12 rounded border bg-white px-7 text-[15px] font-semibold text-[#16181d] hover:bg-[#f7f7f5]"
              onClick={() => navigate(path(CONVERT.example))}
            >
              {t("hero.specimen")}
            </Button>
          </div>

          <p className="ink-soft mt-4 text-[13px]">
            {t("hero.badgeLead")}{" "}
            <Link
              data-analytics-event="badge_installer_view"
              className="accent font-semibold underline underline-offset-2"
              to={path(CONVERT.badge)}
            >
              {t("hero.badgeLink")}
            </Link>
            .
          </p>

          <p className="ink-soft mt-5 max-w-xl text-[13px] leading-relaxed">
            {copy.heroDisclaimer}
          </p>
        </div>

        <div className="lg:pt-2">
          <ReportPreview />
        </div>
      </div>
    </section>
  );
}
