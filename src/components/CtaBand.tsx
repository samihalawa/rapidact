import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { CONVERT, REPORT } from "@/config";
import {
  ENTITY,
  COMPANIES_HOUSE_URL,
  HAS_ENTITY_DETAILS,
} from "@/data/company";

/** Shared conversion band used on every SEO page. */
export default function CtaBand() {
  const navigate = useNavigate();
  return (
    <div className="hairline mt-12 border bg-white">
      <div className="hairline grid border-b lg:grid-cols-[1.1fr_1fr]">
        <div className="hairline border-b p-7 lg:border-r lg:border-b-0">
          <p className="eyebrow">Assessment</p>
          <p className="ink mt-2 text-[19px] leading-snug font-semibold">
            {REPORT.name}
          </p>
          <p className="ink mt-4 text-[34px] leading-none font-bold">€99</p>
          <p className="ink-soft mt-1.5 text-[13px]">
            Charged once, per company.
          </p>
          <p className="ink-soft mt-4 text-[15px] leading-relaxed">
            Tell us what your company runs. A specialist classifies every AI
            system against the regulation and sets out what you must publish and
            document. Delivered within {REPORT.delivery}, or refunded in full.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Button
              className="rounded bg-[#16181d] px-6 text-[15px] font-semibold text-white hover:bg-[#2b2f38]"
              onClick={() => navigate(CONVERT.report)}
            >
              Request the assessment
            </Button>
            <button
              onClick={() => navigate(CONVERT.example)}
              className="accent min-h-11 text-[14px] font-semibold underline underline-offset-2"
            >
              Read a specimen first
            </button>
          </div>
        </div>

        <div className="p-7">
          <p className="eyebrow">Contents</p>
          <ul className="mt-3 space-y-2">
            {[
              "Every AI system you operate, listed and classified",
              "Your Article 50 duties, stated per touchpoint",
              "The disclosure wording, and where it must appear",
              "The documentation you must be able to produce",
              "A prioritised action list with deadlines",
              "A direct assessment from the person who prepared it",
            ].map(f => (
              <li
                key={f}
                className="ink-soft flex gap-3 text-[14px] leading-relaxed"
              >
                <span className="mono shrink-0 pt-0.5 text-[11px]">&bull;</span>
                {f}
              </li>
            ))}
          </ul>
          <p className="ink-soft mt-4 text-[13px] leading-relaxed">
            The{" "}
            <button
              onClick={() => navigate(CONVERT.scanner)}
              className="accent underline underline-offset-2"
            >
              website scanner
            </button>{" "}
            and the{" "}
            <button
              onClick={() => navigate(CONVERT.badge)}
              className="accent underline underline-offset-2"
            >
              one-script disclosure badge
            </button>{" "}
            are free, with or without an assessment.
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
