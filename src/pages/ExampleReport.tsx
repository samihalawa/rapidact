import { useNavigate } from "react-router";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Seo from "@/components/Seo";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Button } from "@/components/ui/button";
import { CONVERT, REPORT } from "@/config";
import { ENTITY_DISPLAY_NAME, SAMPLE_REPORT_URL } from "@/data/company";
import { getContent } from "@/lib/content";
import { Download } from "lucide-react";

/**
 * The published specimen assessment.
 *
 * The document body is NOT written in this file. It comes from
 * content/en/reports/example-eu-ai-act-assessment.md, so the report can be
 * edited, replaced or added to by dropping a markdown file in that folder with
 * no code change. This page only supplies the surrounding chrome: the specimen
 * warning, the document header and the closing call to action.
 */
const SLUG = "example-eu-ai-act-assessment";

/** The banner that must never be missing from this page. */
function SpecimenNotice({ subject, compact = false }: { subject: string; compact?: boolean }) {
  return (
    <div className="border-l-2 border-l-[#9b1c1c] bg-[#fdf7f7] px-5 py-4">
      <p className="text-[13px] font-bold tracking-wide text-[#9b1c1c] uppercase">
        Specimen document
      </p>
      <p className="ink-soft mt-1.5 text-[14px] leading-relaxed">
        This is an illustrative assessment written for an invented company, published so you can
        read the format and depth before buying. {subject} does not exist, and this is not a real
        client's report, which would be confidential.
        {!compact && (
          <>
            {" "}
            Your assessment covers your own systems and reaches your inbox within {REPORT.delivery}.
          </>
        )}
      </p>
    </div>
  );
}

export default function ExampleReport() {
  const navigate = useNavigate();
  const doc = getContent("reports", SLUG, "en");

  if (!doc) {
    return (
      <div className="paper min-h-screen">
        <SiteNav />
        <main className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="ink text-2xl font-bold">Specimen not available</h1>
          <p className="ink-soft mt-3 text-[15px]">
            The specimen assessment could not be loaded. Request the full assessment instead.
          </p>
          <Button
            className="mt-6 rounded bg-[#16181d] px-6 font-semibold text-white hover:bg-[#2b2f38]"
            onClick={() => navigate(CONVERT.report)}
          >
            Request the assessment
          </Button>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const subject = doc.meta.subject || "The company in this document";
  const isSpecimen = doc.meta.specimen === "true";

  return (
    <div className="paper min-h-screen">
      <Seo
        title="Specimen EU AI Act assessment: what the €99 report looks like | RapidAct"
        description="Read a full specimen of the AI Act Complete Pre-Consultory Report before you buy: AI system inventory, risk classification per system, exact Article 50 disclosure wording, evidence position and a prioritised action plan."
      />
      <SiteNav />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <p className="eyebrow">Example of the deliverable</p>
        <h1 className="ink mt-3 text-[32px] leading-[1.12] font-bold tracking-[-0.02em] sm:text-[38px]">
          What the €99 assessment actually looks like
        </h1>
        <p className="ink-soft mt-4 max-w-2xl text-[16px] leading-relaxed">
          Rather than ask you to take our word for it, here is a complete specimen of the document,
          reproduced in full.
        </p>

        {isSpecimen && (
          <div className="mt-8">
            <SpecimenNotice subject={subject} />
          </div>
        )}

        <div className="hairline mt-10 border">
          <div className="hairline flex flex-wrap items-baseline justify-between gap-2 border-b bg-[#16181d] px-6 py-5">
            <div>
              <p className="text-[10px] font-bold tracking-[0.14em] text-white/55 uppercase">
                {REPORT.name}
              </p>
              <p className="mt-1 text-[16px] font-semibold text-white">{subject}</p>
              {doc.meta.subjectNote && (
                <p className="mt-0.5 text-[12px] text-white/50">{doc.meta.subjectNote}</p>
              )}
            </div>
            {doc.meta.ref && (
              <span className="mono text-[11px] text-white/45">Ref {doc.meta.ref}</span>
            )}
          </div>

          <div className="px-6 py-7">
            <MarkdownRenderer body={doc.body} />
            <p className="ink-soft hairline mt-8 border-t pt-4 text-[13px] leading-relaxed">
              Prepared by {ENTITY_DISPLAY_NAME}. This document is a technical and organisational
              compliance assessment. It is not legal advice, and where a question turns on a point
              of law the assessment says so and sets out what to put in front of counsel.
            </p>
          </div>
        </div>

        {/* Optional downloadable version, appears only once a file is published. */}
        {SAMPLE_REPORT_URL && (
          <a
            href={SAMPLE_REPORT_URL}
            target="_blank"
            rel="noopener"
            className="hairline ink mt-6 inline-flex items-center gap-2 rounded border bg-white px-4 py-2.5 text-[14px] font-semibold hover:bg-[#f7f7f5]"
          >
            <Download className="h-4 w-4" />
            Download this specimen as a document
          </a>
        )}

        {isSpecimen && (
          <div className="mt-8">
            <SpecimenNotice subject={subject} compact />
          </div>
        )}

        <div className="hairline mt-10 border bg-white p-7">
          <h2 className="ink text-[22px] leading-snug font-bold tracking-[-0.015em]">
            The same document, written for your systems
          </h2>
          <p className="ink-soft mt-3 max-w-2xl text-[16px] leading-relaxed">
            Tell us what your company runs and this is what arrives in your inbox within{" "}
            {REPORT.delivery}, covering your own systems, your markets and your obligations. €99,
            charged once. If it does not arrive in that window, you are refunded in full.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              className="rounded bg-[#16181d] px-6 text-[15px] font-semibold text-white hover:bg-[#2b2f38]"
              onClick={() => navigate(CONVERT.report)}
            >
              Request the assessment, €99
            </Button>
            <Button
              variant="outline"
              className="hairline ink rounded border bg-white px-6 text-[15px] font-semibold hover:bg-[#f7f7f5]"
              onClick={() => navigate(CONVERT.scanner)}
            >
              Scan your website first, free
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
