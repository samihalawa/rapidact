import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CONVERT } from "@/config";
import { ENTITY, HAS_ENTITY_DETAILS } from "@/data/company";
import { LanguageSelector, useI18n } from "@/lib/i18n";
import { Menu } from "lucide-react";

export default function SiteNav() {
  const { path, t } = useI18n();
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Utility strip: a reachable phone number above the fold, on every page. */}
      {HAS_ENTITY_DETAILS && (
        <div className="hidden border-b border-[#2b2f38] bg-[#16181d] md:block">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5 sm:px-6">
            <p className="text-[12px] text-white/60">{t("nav.deadline")}</p>
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
            aria-label={`RapidAct — ${t("nav.home")}`}
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

          <nav className="ink-soft hidden items-center gap-5 text-[13px] lg:flex">
            <a
              href={`${path("/")}#features`}
              className="whitespace-nowrap hover:text-[#16181d]"
            >
              {t("nav.product")}
            </a>
            <Link
              to={path(CONVERT.report)}
              className="whitespace-nowrap hover:text-[#16181d]"
            >
              {t("nav.report")}
            </Link>
            <Link
              to={path(CONVERT.badge)}
              className="whitespace-nowrap hover:text-[#16181d]"
            >
              {t("nav.badge")}
            </Link>
            <Link
              to={path("/contact")}
              className="whitespace-nowrap hover:text-[#16181d]"
            >
              {t("nav.contact")}
            </Link>
            <Link
              to={path(CONVERT.example)}
              className="hidden whitespace-nowrap hover:text-[#16181d] xl:inline"
            >
              {t("nav.specimen")}
            </Link>
            <Link
              to={path("/article-50")}
              className="hidden whitespace-nowrap hover:text-[#16181d] 2xl:inline"
            >
              {t("nav.article")}
            </Link>
            <Link
              to={path("/learn")}
              className="hidden whitespace-nowrap hover:text-[#16181d] 2xl:inline"
            >
              {t("nav.guides")}
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden lg:block">
              <LanguageSelector />
            </div>
            <Button
              asChild
              className="h-11 rounded bg-[#16181d] px-3 text-[13px] font-semibold text-white hover:bg-[#2b2f38] sm:px-4 sm:text-[14px]"
            >
              <a
                href={CONVERT.calBooking}
                target="_blank"
                rel="noopener"
                aria-label={t("nav.bookCall")}
                data-analytics-event="booking_click"
                data-analytics-label="Header book a call CTA"
              >
                <span className="lg:hidden">{t("nav.bookCallShort")}</span>
                <span className="hidden lg:inline">{t("nav.bookCall")}</span>
              </a>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label={t("nav.menu")}
                  className="inline-flex h-11 w-11 items-center justify-center rounded border border-[#cbd5e1] bg-white text-[#03123d] transition hover:bg-[#f4f7fb] focus-visible:ring-2 focus-visible:ring-[#174a9b] focus-visible:outline-none lg:hidden"
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </button>
              </SheetTrigger>
              <SheetContent
                closeLabel={t("nav.close")}
                className="w-[min(88vw,22rem)] bg-white p-0"
              >
                <SheetHeader className="border-b border-[#dbe3ee] p-5 pr-14 text-left">
                  <SheetTitle className="brand-wordmark text-xl text-[#03123d]">
                    Rapid<span className="text-[#087ee8]">Act</span>
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    {t("nav.menuDescription")}
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col px-5">
                  {[
                    {
                      label: t("nav.bookCall"),
                      href: CONVERT.calBooking,
                      external: true,
                      newTab: true,
                    },
                    { label: t("nav.report"), href: path(CONVERT.report) },
                    {
                      label: t("nav.product"),
                      href: `${path("/")}#features`,
                      external: true,
                    },
                    { label: t("nav.badge"), href: path(CONVERT.badge) },
                    { label: t("nav.contact"), href: path("/contact") },
                    { label: t("nav.specimen"), href: path(CONVERT.example) },
                    { label: t("nav.scan"), href: path(CONVERT.scanner) },
                    { label: t("nav.article"), href: path("/article-50") },
                    { label: t("nav.guides"), href: path("/learn") },
                  ].map(item => (
                    <SheetClose asChild key={`${item.label}-${item.href}`}>
                      {item.external ? (
                        <a
                          href={item.href}
                          target={"newTab" in item ? "_blank" : undefined}
                          rel={"newTab" in item ? "noopener" : undefined}
                          className="flex min-h-12 items-center border-b border-[#edf0f4] text-sm font-semibold text-[#334155]"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          to={item.href}
                          className="flex min-h-12 items-center border-b border-[#edf0f4] text-sm font-semibold text-[#334155]"
                        >
                          {item.label}
                        </Link>
                      )}
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto border-t border-[#dbe3ee] p-5">
                  <p className="mb-2 text-xs font-bold tracking-[0.1em] text-[#64748b] uppercase">
                    {t("nav.language")}
                  </p>
                  <LanguageSelector />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
