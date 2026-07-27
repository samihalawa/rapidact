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
            <span className="flex items-center gap-2">
              <img
                src="/brand/rapidact-exact-symbol.png"
                alt=""
                aria-hidden="true"
                className="h-9 w-auto sm:h-10"
              />
              <span className="brand-wordmark text-[17px] font-bold tracking-[-0.04em] text-[#03123d] sm:text-[19px]">
                Rapid<span className="text-[#087ee8]">Act</span>
              </span>
            </span>
          </Link>

          <nav className="ink-soft hidden items-center gap-5 text-[13px] md:flex">
            <a href={`${path("/")}#features`} className="whitespace-nowrap hover:text-[#16181d]">
              {t("nav.product")}
            </a>
            <Link to={path(CONVERT.scanner)} className="whitespace-nowrap hover:text-[#16181d]">
              {t("nav.scan")}
            </Link>
            <Link to={path(CONVERT.badge)} className="whitespace-nowrap hover:text-[#16181d]">
              {t("nav.badge")}
            </Link>
            <a href={`${path("/")}#report`} className="whitespace-nowrap hover:text-[#16181d]">
              {t("nav.assessment")}
            </a>
            <Link to={path(CONVERT.example)} className="hidden whitespace-nowrap hover:text-[#16181d] xl:inline">
              {t("nav.specimen")}
            </Link>
            <Link to={path("/article-50")} className="hidden whitespace-nowrap hover:text-[#16181d] 2xl:inline">
              {t("nav.article")}
            </Link>
            <Link to={path("/learn")} className="hidden whitespace-nowrap hover:text-[#16181d] 2xl:inline">
              {t("nav.guides")}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Button
              data-analytics-event="free_scan_click"
              data-analytics-label="Header free scan CTA"
              className="h-11 rounded bg-[#16181d] px-3 text-[13px] font-semibold text-white hover:bg-[#2b2f38] sm:px-4 sm:text-[14px]"
              onClick={() => navigate(path(CONVERT.scanner))}
            >
              <span className="sm:hidden">{t("nav.scanShort")}</span>
              <span className="hidden sm:inline">{t("nav.scan")}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
