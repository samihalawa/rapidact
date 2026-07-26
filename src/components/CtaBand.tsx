import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { CONVERT, REPORT } from "@/config";
import {
  ENTITY,
  COMPANIES_HOUSE_URL,
  HAS_ENTITY_DETAILS,
} from "@/data/company";
import { useI18n } from "@/lib/i18n";

/** Shared conversion band used on every SEO page. */
export default function CtaBand() {
  const navigate = useNavigate();
  const { path, t } = useI18n();
  const contents = [
    "cta.item1",
    "cta.item2",
    "cta.item3",
    "cta.item4",
    "cta.item5",
    "cta.item6",
  ];
  return (
    <div className="hairline mt-12 border bg-white">
      <div className="hairline grid border-b lg:grid-cols-[1.1fr_1fr]">
        <div className="hairline border-b p-7 lg:border-r lg:border-b-0">
          <p className="eyebrow">{t("cta.label")}</p>
          <p className="ink mt-2 text-[19px] leading-snug font-semibold">
            {REPORT.name}
          </p>
          <p className="ink mt-4 text-[34px] leading-none font-bold">€99</p>
          <p className="ink-soft mt-1.5 text-[13px]">{t("cta.once")}</p>
          <p className="ink-soft mt-4 text-[15px] leading-relaxed">
            {t("cta.body")}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Button
              className="rounded bg-[#16181d] px-6 text-[15px] font-semibold text-white hover:bg-[#2b2f38]"
              onClick={() => navigate(path(CONVERT.report))}
            >
              {t("cta.primary")}
            </Button>
            <button
              onClick={() => navigate(path(CONVERT.example))}
              className="accent min-h-11 text-[14px] font-semibold underline underline-offset-2"
            >
              {t("cta.secondary")}
            </button>
          </div>
        </div>

        <div className="p-7">
          <p className="eyebrow">{t("cta.contents")}</p>
          <ul className="mt-3 space-y-2">
            {contents.map(key => (
              <li
                key={key}
                className="ink-soft flex gap-3 text-[14px] leading-relaxed"
              >
                <span className="mono shrink-0 pt-0.5 text-[11px]">&bull;</span>
                {t(key)}
              </li>
            ))}
          </ul>
          <p className="ink-soft mt-4 text-[13px] leading-relaxed">
            {t("cta.freeLead")}{" "}
            <button
              onClick={() => navigate(path(CONVERT.scanner))}
              className="accent underline underline-offset-2"
            >
              {t("cta.scan")}
            </button>{" "}
            · {t("cta.badgeLead")}{" "}
            <button
              onClick={() => navigate(path(CONVERT.badge))}
              className="accent underline underline-offset-2"
            >
              {t("cta.badge")}
            </button>{" "}
          </p>
        </div>
      </div>

      {HAS_ENTITY_DETAILS && (
        <p className="ink-soft bg-[#f7f7f5] px-7 py-3 text-[12px] leading-relaxed">
          Sold by {ENTITY.legalName}, {ENTITY.address}, {ENTITY.country}.{" "}
          <a
            href={COMPANIES_HOUSE_URL}
            target="_blank"
            rel="noopener"
            className="accent mono underline underline-offset-2"
          >
            Companies House No. {ENTITY.registrationNumber}
          </a>
        </p>
      )}
    </div>
  );
}
