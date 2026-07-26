import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { CONVERT } from "@/config";
import { ENTITY, HAS_ENTITY_DETAILS } from "@/data/company";
import { LanguageSelector, useI18n } from "@/lib/i18n";

export default function SiteNav() {
  const navigate = useNavigate();
  const { path, t } = useI18n();
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Utility strip: a reachable phone number above the fold, on every page. */}
      {HAS_ENTITY_DETAILS && (
        <div className="hidden border-b border-[#2b2f38] bg-[#16181d] md:block">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5 sm:px-6">
            <p className="text-[12px] text-white/60">
              {t("nav.deadline")}
            </p>
            <a
              href={`tel:${ENTITY.phone.replace(/\s/g, "")}`}
              className="mono text-[12px] text-white/80 hover:text-white"
            >
              {ENTITY.phone}
            </a>
          </div>
        </div>
      )}

      <div className="hairline border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-14 sm:px-6">
          <Link
            to={path("/")}
            className="shrink-0"
            aria-label="RapidAct home"
          >
            <img
              src="/brand/rapidact-horizontal.svg"
              alt="RapidAct"
              className="h-8 w-auto sm:h-9"
            />
          </Link>

          <nav className="ink-soft hidden items-center gap-5 text-[13px] md:flex">
            <a href={`${path("/")}#report`} className="whitespace-nowrap hover:text-[#16181d]">
              {t("nav.assessment")}
            </a>
            <Link to={path(CONVERT.example)} className="whitespace-nowrap hover:text-[#16181d]">
              {t("nav.specimen")}
            </Link>
            <a href={`${path("/")}#pricing`} className="whitespace-nowrap hover:text-[#16181d]">
              {t("nav.fees")}
            </a>
            <a href={`${path("/")}#features`} className="hidden whitespace-nowrap hover:text-[#16181d] 2xl:inline">
              {t("nav.tools")}
            </a>
            <Link to={path("/article-50")} className="hidden whitespace-nowrap hover:text-[#16181d] 2xl:inline">
              {t("nav.article")}
            </Link>
            <Link to={path(CONVERT.badge)} className="whitespace-nowrap hover:text-[#16181d]">
              {t("nav.badge")}
            </Link>
            <Link to={path("/learn")} className="hidden whitespace-nowrap hover:text-[#16181d] 2xl:inline">
              {t("nav.guides")}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSelector />
            <button
              onClick={() => navigate(path(CONVERT.scanner))}
              className="ink-soft hidden text-[14px] hover:text-[#16181d] sm:inline"
            >
              {t("nav.scan")}
            </button>
            <Button
              data-analytics-event="report_started"
              data-analytics-label="Header assessment CTA"
              className="h-11 rounded bg-[#16181d] px-3 text-[13px] font-semibold text-white hover:bg-[#2b2f38] sm:px-4 sm:text-[14px]"
              onClick={() => navigate(path(CONVERT.report))}
            >
              <span className="sm:hidden">{t("nav.requestShort")}</span>
              <span className="hidden sm:inline">{t("nav.request")}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
