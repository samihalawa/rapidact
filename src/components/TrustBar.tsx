import { ENTITY, COMPANIES_HOUSE_URL, HAS_ENTITY_DETAILS } from "@/data/company";
import { REPORT } from "@/config";

/**
 * Who you are paying, stated plainly and made checkable.
 *
 * Placed directly beneath the hero and again beside the payment button, because
 * this is the moment the visitor silently asks "who actually receives this
 * money". A registered number they can verify on the public register answers it
 * far more convincingly than a badge or a testimonial.
 */
export default function TrustBar() {
  if (!HAS_ENTITY_DETAILS) return null;

  return (
    <section className="paper-alt hairline border-b">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 md:grid-cols-4">
        <div>
          <p className="eyebrow">Registered company</p>
          <p className="ink mt-1.5 text-[14px] font-semibold">{ENTITY.legalName}</p>
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
          <p className="eyebrow">Registered office</p>
          <p className="ink-soft mt-1.5 text-[13px] leading-relaxed">
            {ENTITY.address}
            <br />
            {ENTITY.country}
          </p>
        </div>

        <div>
          <p className="eyebrow">Contact</p>
          <a
            href={`tel:${ENTITY.phone.replace(/\s/g, "")}`}
            className="ink mono mt-1.5 block text-[13px] hover:underline"
          >
            {ENTITY.phone}
          </a>
          {ENTITY.contactEmail && (
            <a
              href={`mailto:${ENTITY.contactEmail}`}
              className="accent mt-0.5 block text-[13px] underline underline-offset-2"
            >
              {ENTITY.contactEmail}
            </a>
          )}
        </div>

        <div>
          <p className="eyebrow">Our commitment</p>
          <p className="ink-soft mt-1.5 text-[13px] leading-relaxed">
            Delivered within {REPORT.delivery} of payment, or refunded in full.
          </p>
        </div>
      </div>
    </section>
  );
}
