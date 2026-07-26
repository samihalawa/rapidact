import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { CONVERT, REPORT } from "@/config";
import { REPORT_CHAPTERS } from "@/data/report";

/** What each section of the assessment contains, set out as a document outline. */
export default function ReportOffer() {
  const navigate = useNavigate();
  return (
    <section id="report" className="paper-alt hairline border-b py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="eyebrow">Contents of the assessment</p>
        <h2 className="ink mt-3 max-w-2xl text-[28px] leading-tight font-bold tracking-[-0.015em] sm:text-[32px]">
          Six sections, written for your systems
        </h2>
        <p className="ink-soft mt-3 max-w-2xl text-[16px] leading-relaxed">
          The same structure every time, so the document is comparable and auditable. The content
          of each section is specific to what your company actually operates.
        </p>

        <div className="hairline mt-10 border-t">
          {REPORT_CHAPTERS.map((c) => (
            <div
              key={c.n}
              className="hairline grid gap-2 border-b py-6 sm:grid-cols-[3rem_1fr] sm:gap-6 lg:grid-cols-[3rem_16rem_1fr]"
            >
              <span className="mono ink-soft pt-0.5 text-[12px]">{c.n}</span>
              <h3 className="ink text-[15px] font-semibold">{c.title}</h3>
              <p className="ink-soft max-w-2xl text-[15px] leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button
            className="rounded bg-[#16181d] px-6 text-[15px] font-semibold text-white hover:bg-[#2b2f38]"
            onClick={() => navigate(CONVERT.report)}
          >
            Request the assessment, €99
          </Button>
          <p className="ink-soft text-sm">
            Paid once. Delivered within {REPORT.delivery} or refunded in full.
          </p>
        </div>
      </div>
    </section>
  );
}
