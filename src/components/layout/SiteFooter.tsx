import { Link } from "react-router";
import { REQUIREMENTS } from "@/data/requirements";
import { PLATFORMS } from "@/data/platforms";
import {
  ENTITY,
  COMPANIES_HOUSE_URL,
  HAS_ENTITY_DETAILS,
  ENTITY_DISPLAY_NAME,
} from "@/data/company";
import { useI18n } from "@/lib/i18n";
import { PARTNERS_COPY } from "@/data/localizedPartners";

export default function SiteFooter() {
  const { lang, path, t } = useI18n();
  return (
    <footer className="border-t border-[#e2e2dd] bg-white">
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-36 sm:px-6 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1.3fr_repeat(4,minmax(0,1fr))]">
          <div>
            <div className="flex items-center gap-2.5" aria-label="RapidAct">
              <img
                src="/brand/rapidact-exact-symbol.png"
                alt=""
                aria-hidden="true"
                className="h-11 w-auto"
              />
              <span className="brand-wordmark text-xl font-bold tracking-[-0.04em] text-[#03123d]">
                Rapid<span className="text-[#087ee8]">Act</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#5c6370]">
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#16181d]">
              {t("footer.product")}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: t("footer.scan"), href: "/scanner" },
                { label: t("footer.badge"), href: "/article-50#install" },
                { label: t("footer.assessment"), href: "/report" },
                { label: PARTNERS_COPY[lang].footerLabel, href: "/partners" },
                { label: t("footer.article"), href: "/article-50" },
                { label: t("footer.guides"), href: "/learn" },
              ].map(l => (
                <li key={l.label}>
                  <Link
                    to={path(l.href)}
                    className="text-sm text-[#5c6370] transition hover:text-[#16181d]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#16181d]">
              {t("footer.requirements")}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {REQUIREMENTS.map(r => (
                <li key={r.slug}>
                  <Link
                    to={`/requirements/${r.slug}`}
                    className="text-sm text-[#5c6370] transition hover:text-[#16181d]"
                  >
                    {t(
                      `footer.${r.slug === "chatbot-ai-disclosure" ? "chatbot" : r.slug === "ai-content-labeling" ? "content" : r.slug === "deepfake-labeling" ? "deepfake" : "evidence"}`
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#16181d]">
              {t("footer.platforms")}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {PLATFORMS.map(p => (
                <li key={p.slug}>
                  <Link
                    to={path(`/platforms/${p.slug}`)}
                    className="text-sm text-[#5c6370] transition hover:text-[#16181d]"
                  >
                    {p.slug === "custom-website" ? t("footer.any") : p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#16181d]">
              {t("footer.legal")}
            </h4>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: t("footer.privacy"), href: "/privacy" },
                { label: t("footer.terms"), href: "/terms" },
                { label: t("footer.advice"), href: "/terms" },
              ].map(l => (
                <li key={l.label}>
                  <Link
                    to={l.href}
                    className="text-sm text-[#5c6370] transition hover:text-[#16181d]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal entity block. Standard for a company taking payment online, and
            the cheapest, strongest signal that a real business is behind the page. */}
        {HAS_ENTITY_DETAILS && (
          <div className="hairline mt-12 grid gap-6 border-t pt-8 sm:grid-cols-3">
            <div>
              <p className="eyebrow">{t("footer.company")}</p>
              <p className="ink mt-1.5 text-[13px] font-semibold">
                {ENTITY.legalName}
              </p>
              <a
                href={COMPANIES_HOUSE_URL}
                target="_blank"
                rel="noopener"
                className="accent mono mt-0.5 inline-block text-[12px] underline underline-offset-2"
              >
                {t("footer.house")} {ENTITY.registrationNumber}
              </a>
              {ENTITY.vatNumber && (
                <p className="ink-soft mono mt-0.5 text-[12px]">
                  VAT {ENTITY.vatNumber}
                </p>
              )}
            </div>
            <div>
              <p className="eyebrow">{t("footer.office")}</p>
              <p className="ink-soft mt-1.5 text-[12px] leading-relaxed">
                {ENTITY.address}
                <br />
                {ENTITY.country}
              </p>
            </div>
            <div>
              <p className="eyebrow">{t("footer.contact")}</p>
              <a
                href={`tel:${ENTITY.phone.replace(/\s/g, "")}`}
                className="ink mono mt-1.5 block text-[12px] hover:underline"
              >
                {ENTITY.phone}
              </a>
              {ENTITY.contactEmail && (
                <a
                  href={`mailto:${ENTITY.contactEmail}`}
                  className="accent block text-[12px] underline underline-offset-2"
                >
                  {ENTITY.contactEmail}
                </a>
              )}
            </div>
          </div>
        )}

        <div className="hairline ink-soft mt-8 flex flex-col items-start justify-between gap-3 border-t pt-6 text-[12px] sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {ENTITY_DISPLAY_NAME}{" "}
            {t("footer.copyright")}
          </span>
          <span>{t("footer.regulation")}</span>
        </div>
      </div>
    </footer>
  );
}
