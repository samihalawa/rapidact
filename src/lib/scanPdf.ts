import { jsPDF } from "jspdf";
import type { ScanResult } from "@contracts/types";

export type ScanPdfCopy = {
  title: string;
  generated: string;
  readiness: string;
  findings: string;
  actions: string;
  scope: string;
  status: string;
  pages: string;
  blockers: string;
  disclosureFound: string;
  disclosureMissing: string;
};

type ScanPdfOptions = {
  result: ScanResult;
  copy: ScanPdfCopy;
  actionItems: string[];
  brandImage?: string;
};

const NAVY = "#03123d";
const BLUE = "#174a9b";
const CYAN = "#53ddff";
const INK = "#16181d";
const MUTED = "#5c6370";
const LINE = "#dbe5f2";

function ellipsis(value: string, max: number) {
  return value.length > max ? `${value.slice(0, max - 1).trim()}…` : value;
}

function hostnameForFilename(value: string) {
  try {
    return new URL(value).hostname.replace(/^www\./, "").replace(/[^\w.-]/g, "-");
  } catch {
    return "website";
  }
}

export function createScanPdf({
  result,
  copy,
  actionItems,
  brandImage,
}: ScanPdfOptions) {
  const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  const width = pdf.internal.pageSize.getWidth();
  const margin = 17;
  const contentWidth = width - margin * 2;
  const scannedAt = new Date(result.summary.scannedAt);
  const generated = Number.isNaN(scannedAt.getTime())
    ? result.summary.scannedAt
    : new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(scannedAt);

  pdf.setFillColor(NAVY);
  pdf.rect(0, 0, width, 42, "F");
  pdf.setDrawColor(CYAN);
  pdf.setLineWidth(0.7);
  pdf.line(0, 42, width, 42);

  if (brandImage) {
    pdf.addImage(brandImage, "PNG", margin, 10, 13, 15);
  }
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.setTextColor("#ffffff");
  pdf.text("Rapid", brandImage ? 34 : margin, 18.5);
  pdf.setTextColor(CYAN);
  pdf.text("Act", brandImage ? 51.5 : margin + 17.5, 18.5);
  pdf.setFontSize(7.5);
  pdf.setTextColor("#cceeff");
  pdf.text("EU AI ACT TRANSPARENCY PRACTICE", brandImage ? 34 : margin, 24.5);

  pdf.setFontSize(9);
  pdf.setTextColor("#ffffff");
  pdf.text(copy.title, margin, 35);
  pdf.setTextColor(CYAN);
  pdf.text("ARTICLE 50", width - margin, 35, { align: "right" });

  let y = 54;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.setTextColor(BLUE);
  pdf.text(copy.generated.toUpperCase(), margin, y);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(MUTED);
  pdf.text(generated, margin + 28, y);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(result.summary.scanStatus === "partial" ? "#9a6700" : "#0e7c57");
  pdf.text(copy.status.toUpperCase(), width - margin, y, { align: "right" });

  y += 10;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(17);
  pdf.setTextColor(INK);
  pdf.text(ellipsis(result.summary.url, 75), margin, y);
  y += 6;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7.5);
  pdf.setTextColor(MUTED);
  const pageUrls = result.summary.pagesVisited.map(page => page.url).join(" · ") || result.summary.url;
  pdf.text(
    `${copy.pages}: ${ellipsis(pageUrls, 155)}`,
    margin,
    y
  );
  y += 6;
  pdf.setDrawColor(LINE);
  pdf.setLineWidth(0.35);
  pdf.line(margin, y, width - margin, y);

  y += 9;
  pdf.setFillColor("#f3f8ff");
  pdf.roundedRect(margin, y, contentWidth, 28, 2, 2, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(25);
  pdf.setTextColor(BLUE);
  pdf.text(String(result.summary.total), margin + 8, y + 18);
  pdf.setFontSize(8);
  pdf.setTextColor(MUTED);
  pdf.text(copy.readiness.toUpperCase(), margin + 30, y + 10);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9.5);
  pdf.setTextColor(INK);
  pdf.text(
    `${result.summary.undisclosed} without visible disclosure · ${result.summary.pagesVisited.length} public page`,
    margin + 30,
    y + 18
  );

  y += 39;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.setTextColor(INK);
  pdf.text(copy.findings, margin, y);
  y += 6;

  const findings = result.detected.slice(0, 5);
  if (!findings.length) {
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(MUTED);
    pdf.text("No visible public-page AI touchpoints were observed.", margin, y + 2);
    y += 10;
  } else {
    findings.forEach((finding, index) => {
      pdf.setFillColor(index % 2 === 0 ? "#f8fafc" : "#ffffff");
      pdf.rect(margin, y - 3.5, contentWidth, 13, "F");
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8.6);
      pdf.setTextColor(INK);
      pdf.text(ellipsis(finding.name, 42), margin + 3, y + 1.5);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(MUTED);
      pdf.text(`Article ${finding.article} · ${finding.severity}`, margin + 76, y + 1.5);
      pdf.setTextColor(finding.existingDisclosureFound ? "#0e7c57" : "#b42318");
      pdf.text(
        finding.existingDisclosureFound
          ? copy.disclosureFound
          : copy.disclosureMissing,
        margin + 3,
        y + 6.5
      );
      y += 13;
    });
  }

  y += 6;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.setTextColor(INK);
  pdf.text(copy.actions, margin, y);
  y += 7;
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8.8);
  pdf.setTextColor(MUTED);
  actionItems.slice(0, 4).forEach((item, index) => {
    const lines = pdf.splitTextToSize(ellipsis(item, 280), contentWidth - 10);
    pdf.setFillColor(BLUE);
    pdf.circle(margin + 2.5, y - 1.3, 2.5, "F");
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor("#ffffff");
    pdf.text(String(index + 1), margin + 2.5, y - 0.4, { align: "center" });
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(INK);
    pdf.text(lines.slice(0, 4), margin + 8, y);
    y += Math.min(4, lines.length) * 4.4 + 3;
  });

  const scopeY = Math.max(248, Math.min(y + 5, 260));
  pdf.setFillColor("#fff8e8");
  pdf.roundedRect(margin, scopeY, contentWidth, 18, 2, 2, "F");
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7.8);
  pdf.setTextColor("#6b4f16");
  const scopeText = result.summary.blockers.length
    ? `${copy.blockers}: ${result.summary.blockers.join("; ")}. ${copy.scope}`
    : copy.scope;
  pdf.text(
    pdf.splitTextToSize(scopeText, contentWidth - 8).slice(0, 3),
    margin + 4,
    scopeY + 6
  );

  pdf.setDrawColor(LINE);
  pdf.line(margin, 282, width - margin, 282);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(8);
  pdf.setTextColor(NAVY);
  pdf.text("rapidact.eu", margin, 288);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(MUTED);
  pdf.text("+44 7883 306011", width - margin, 288, { align: "right" });

  return pdf;
}

async function loadBrandImage() {
  try {
    const response = await fetch("/brand/rapidact-exact-symbol.png");
    if (!response.ok) return undefined;
    const blob = await response.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
  } catch {
    return undefined;
  }
}

export async function downloadScanPdf(options: Omit<ScanPdfOptions, "brandImage">) {
  const brandImage = await loadBrandImage();
  const pdf = createScanPdf({ ...options, brandImage });
  pdf.save(`RapidAct-public-page-scan-${hostnameForFilename(options.result.summary.url)}.pdf`);
}
