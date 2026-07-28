import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {
  getConsent,
  initAnalytics,
  isAnalyticsHost,
  setConsent,
  track,
  trackPageView,
} from "@/lib/analytics";
import { useI18n } from "@/lib/i18n";

export default function Analytics() {
  const location = useLocation();
  const { t } = useI18n();
  const enabled = isAnalyticsHost();
  const [choice, setChoice] = useState(getConsent());

  useEffect(() => {
    initAnalytics();
    const onConsent = (event: Event) =>
      setChoice((event as CustomEvent<"all" | "essential">).detail);
    window.addEventListener("rapidact:consent", onConsent);
    return () => window.removeEventListener("rapidact:consent", onConsent);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(trackPageView, 0);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>(
        "[data-analytics-event]"
      );
      if (!target) return;
      track(target.dataset.analyticsEvent || "cta_clicked", {
        action_label:
          target.dataset.analyticsLabel ||
          target.textContent?.trim().slice(0, 80),
        destination:
          target instanceof HTMLAnchorElement ? target.href : undefined,
      });
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  if (!enabled || choice) return null;

  return (
    <aside
      aria-label="Analytics preferences"
      className="fixed right-3 bottom-20 left-3 z-[70] mx-auto max-w-2xl border border-[#d8d8d2] bg-white p-4 shadow-[0_16px_45px_rgba(22,24,29,0.20)] sm:right-6 sm:bottom-6 sm:left-auto sm:w-[29rem]"
    >
      <p className="ink text-[14px] font-semibold">{t("consent.title")}</p>
      <p className="ink-soft mt-1 text-[12px] leading-relaxed">
        {t("consent.body")}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          className="min-h-11 rounded bg-[#16181d] px-4 text-[12px] font-semibold text-white"
          onClick={() => setConsent("all")}
        >
          {t("consent.allow")}
        </button>
        <button
          type="button"
          className="hairline ink min-h-11 rounded border bg-white px-4 text-[12px] font-semibold"
          onClick={() => setConsent("essential")}
        >
          {t("consent.essential")}
        </button>
      </div>
    </aside>
  );
}
