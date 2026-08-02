import {
  ENTITY,
  COMPANIES_HOUSE_URL,
  HAS_ENTITY_DETAILS,
} from "@/data/company";
import { useI18n } from "@/lib/i18n";
import { HOME_COPY } from "@/data/localizedHome";

/** Verifiable company identity and the plain free-to-paid product model. */
export default function TrustBar() {
  const { lang, t } = useI18n();
  const copy = HOME_COPY[lang];
  if (!HAS_ENTITY_DETAILS) return null;

  return (
    <section className="paper-alt hairline border-b">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 md:grid-cols-4">
        <div>
          <p className="eyebrow">{t("footer.company")}</p>
          <p className="ink mt-1.5 text-[14px] font-semibold">
            {ENTITY.legalName}
          </p>
          <a
            href={COMPANIES_HOUSE_URL}
            target="_blank"
            rel="noopener"
            className="accent mono mt-0.5 inline-block text-[12px] underline underline-offset-2"
          >
            No. {ENTITY.registrationNumber}
          </a>
        </div>

        <div>
          <p className="eyebrow">{t("footer.office")}</p>
          <p className="ink-soft mt-1.5 text-[13px] leading-relaxed">
            {ENTITY.address}
            <br />
            {ENTITY.country}
          </p>
        </div>

        <div>
          <p className="eyebrow">{t("footer.contact")}</p>
          <a
            href={`tel:${ENTITY.phone.replace(/\s/g, "")}`}
            className="ink mono mt-1.5 inline-flex min-h-11 items-center text-[13px] hover:underline"
          >
            {ENTITY.phone}
          </a>
          {ENTITY.contactEmail && (
            <a
              href={`mailto:${ENTITY.contactEmail}`}
              className="accent flex min-h-11 items-center text-[13px] underline underline-offset-2"
            >
              {ENTITY.contactEmail}
            </a>
          )}
        </div>

        <div>
          <p className="eyebrow">{t("trust.commitment")}</p>
          <p className="ink-soft mt-1.5 text-[13px] leading-relaxed">
            {copy.trustCommitment}
          </p>
        </div>
      </div>
    </section>
  );
}
