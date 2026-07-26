import { useNavigate } from "react-router";
import { Download, ExternalLink, FileText } from "lucide-react";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { CONVERT } from "@/config";
import { SAMPLE_REPORT_URL } from "@/data/company";
import { useI18n } from "@/lib/i18n";

export default function ExampleReport() {
  const navigate = useNavigate();
  const { path, t } = useI18n();

  return (
    <div className="min-h-screen bg-[#ecece8]">
      <Seo
        title="Multi-page specimen EU AI Act assessment PDF | RapidAct"
        description="Preview and download the full eight-page RapidAct assessment specimen before buying."
      />
      <SiteNav />

      <main>
        <section className="border-b border-[#deded8] bg-white">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="eyebrow">{t("specimen.kicker")}</p>
                <h1 className="ink mt-3 max-w-3xl text-[34px] leading-[1.08] font-bold tracking-[-0.025em] sm:text-[46px]">
                  {t("specimen.title")}
                </h1>
                <p className="ink-soft mt-5 max-w-2xl text-[17px] leading-relaxed">
                  {t("specimen.body")}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={SAMPLE_REPORT_URL}
                  data-analytics-event="view_specimen_pdf"
                  target="_blank"
                  rel="noopener"
                  className="hairline ink inline-flex min-h-11 items-center gap-2 rounded border bg-white px-4 text-[14px] font-semibold hover:bg-[#f7f7f5]"
                >
                  <ExternalLink className="h-4 w-4" />
                  {t("specimen.open")}
                </a>
                <a
                  href={SAMPLE_REPORT_URL}
                  download
                  data-analytics-event="download_specimen"
                  className="inline-flex min-h-11 items-center gap-2 rounded bg-[#16181d] px-4 text-[14px] font-semibold text-white hover:bg-[#2b2f38]"
                >
                  <Download className="h-4 w-4" />
                  {t("specimen.download")}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-3 py-6 sm:px-6 sm:py-10">
          <div className="overflow-hidden rounded-md border border-[#cfcfca] bg-[#24272d] shadow-[0_24px_70px_rgba(22,24,29,0.18)]">
            <div className="flex min-h-14 flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5 sm:px-5">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-white/10 text-white">
                  <FileText className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-white">rapidact-specimen-assessment.pdf</p>
                  <p className="text-[11px] text-white/45">{t("specimen.pages")}</p>
                </div>
              </div>
              <span className="rounded-sm border border-[#f0b4b4]/25 bg-[#9b1c1c]/20 px-2.5 py-1 text-[10px] font-bold tracking-[0.08em] text-[#ffd7d7] uppercase">
                {t("specimen.notice")}
              </span>
            </div>

            <div className="bg-[#777a80] p-3 sm:p-6">
              <div className="mx-auto aspect-[1/1.20] min-h-[590px] max-w-[940px] overflow-hidden bg-white shadow-[0_12px_30px_rgba(0,0,0,0.22)] sm:aspect-[1/1.15] sm:min-h-[760px] lg:min-h-[900px]">
                <object
                  data={`${SAMPLE_REPORT_URL}#view=FitH&toolbar=1&navpanes=0`}
                  type="application/pdf"
                  aria-label="RapidAct eight-page specimen assessment PDF"
                  className="h-full w-full"
                >
                  <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                    <FileText className="h-10 w-10 text-[#1f3a5f]" />
                    <p className="ink mt-4 text-lg font-semibold">{t("specimen.title")}</p>
                    <a href={SAMPLE_REPORT_URL} className="accent mt-3 underline">
                      {t("specimen.open")}
                    </a>
                  </div>
                </object>
              </div>
            </div>
          </div>

          <div className="mt-5 border-l-2 border-l-[#9b1c1c] bg-white px-5 py-4">
            <p className="text-[12px] font-bold tracking-[0.08em] text-[#9b1c1c] uppercase">
              {t("specimen.notice")}
            </p>
            <p className="ink-soft mt-1 text-[14px] leading-relaxed">
              {t("specimen.noticeBody")}
            </p>
          </div>

          <div className="hairline mt-8 border bg-white p-7 sm:p-9">
            <h2 className="ink text-[24px] leading-snug font-bold tracking-[-0.015em]">
              {t("specimen.ctaTitle")}
            </h2>
            <p className="ink-soft mt-3 max-w-2xl text-[16px] leading-relaxed">
              {t("specimen.ctaBody")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                data-analytics-event="report_started"
                data-analytics-label="Specimen conversion CTA"
                className="min-h-11 rounded bg-[#16181d] px-6 text-[15px] font-semibold text-white hover:bg-[#2b2f38]"
                onClick={() => navigate(path(CONVERT.report))}
              >
                {t("hero.request")}, €99
              </Button>
              <Button
                data-analytics-event="scan_started"
                data-analytics-label="Specimen free scan CTA"
                variant="outline"
                className="hairline ink min-h-11 rounded border bg-white px-6 text-[15px] font-semibold hover:bg-[#f7f7f5]"
                onClick={() => navigate(path(CONVERT.scanner))}
              >
                {t("nav.scan")}
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
