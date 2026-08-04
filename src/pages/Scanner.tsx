import { useState } from "react";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { trpc, TRPCProvider } from "@/providers/trpc";
import type { ScanResult, ScanFinding } from "@contracts/types";
import { CONVERT } from "@/config";
import { useNavigate } from "react-router";
import {
  ScanSearch,
  Loader2,
  CheckCircle2,
  XCircle,
  Copy,
  Download,
  ShieldAlert,
  PackageCheck,
  Wrench,
  MessageCircle,
  Mail,
  CalendarDays,
  ArrowRight,
  Eye,
} from "lucide-react";
import { ANALYTICS_EVENTS, isLeadRetained, track } from "@/lib/analytics";
import { isValidEmail } from "@contracts/types";
import { useI18n } from "@/lib/i18n";
import { SCANNER_COPY } from "@/data/localizedScanner";

function wait(ms: number) {
  return new Promise(resolve => window.setTimeout(resolve, ms));
}

/** Turn each finding into a plain-English plan item. */
function planItemFor(
  d: ScanFinding,
  copy: (typeof SCANNER_COPY)[keyof typeof SCANNER_COPY]
): { what: string; fix: string } {
  if (d.category === "chat") {
    return {
      what: copy.chatWhat(d.name, d.existingDisclosureFound),
      fix: copy.chatFix,
    };
  }
  return {
    what: copy.otherWhat(d.name),
    fix: copy.otherFix,
  };
}

function Scanner() {
  const navigate = useNavigate();
  const { lang, path } = useI18n();
  const copy = SCANNER_COPY[lang];
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [scanActive, setScanActive] = useState(false);
  const [scanStage, setScanStage] = useState(0);
  const [scanElapsed, setScanElapsed] = useState(0);
  const [scanError, setScanError] = useState("");
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [emailError, setEmailError] = useState("");

  const startScan = trpc.scan.start.useMutation();
  const scanStatus = trpc.scan.status.useMutation();
  const lead = trpc.leads.capture.useMutation();

  const runScan = async (submittedUrl: string) => {
    if (!submittedUrl || scanActive) return;
    setResult(null);
    setScanError("");
    setScanStage(0);
    setScanElapsed(0);
    setScanActive(true);
    startScan.reset();
    scanStatus.reset();
    track("scan_started", { has_protocol: /^https?:\/\//i.test(submittedUrl) });
    const scanStartedAt = Date.now();
    const elapsedTimer = window.setInterval(() => {
      const elapsed = Math.floor((Date.now() - scanStartedAt) / 1_000);
      setScanElapsed(elapsed);
    }, 1_000);

    try {
      const started = await startScan.mutateAsync({ url: submittedUrl });
      if (!started.ok) {
        setScanError(started.error);
        track("scan_failed", { error_type: started.error });
        return;
      }

      setScanStage(1);
      const deadline = Date.now() + 90 * 1_000;
      let completed: ScanResult | null = null;
      while (Date.now() < deadline) {
        await wait(1_250);
        const state = await scanStatus.mutateAsync({ token: started.token });
        if (state.status === "running") continue;
        if (state.status === "failed") {
          setScanError(state.error);
          track("scan_failed", { error_type: state.error });
          return;
        }
        setScanStage(2);
        await wait(350);
        completed = state.result;
        break;
      }

      if (!completed) {
        setScanError("anchor-timeout");
        track("scan_failed", { error_type: "anchor-timeout" });
        return;
      }

      setResult(completed);
      track("scan_completed", {
        reachable: completed.reachable,
        scan_status: completed.summary.scanStatus,
        pages_visited: completed.summary.pagesVisited.length,
        detected_count: completed.summary.total,
        high_exposure_count: completed.summary.high,
        undisclosed_count: completed.summary.undisclosed,
      });
    } catch (error) {
      const typedError = error as { data?: { code?: string } };
      const errorType = typedError.data?.code || "anchor-unavailable";
      setScanError(errorType);
      track("scan_failed", { error_type: errorType });
    } finally {
      window.clearInterval(elapsedTimer);
      setScanActive(false);
    }
  };

  const requestScan = () => {
    if (!url.trim() || scanActive) return;
    setResult(null);
    setScanError("");
    setCopied(false);
    setEmailError("");
    setEmailDialogOpen(true);
    track("scanner_email_gate_opened");
  };

  const submitEmailGate = async () => {
    const submittedEmail = email.trim();
    const submittedUrl = url.trim();
    if (!isValidEmail(submittedEmail)) {
      setEmailError(copy.emailGateInvalid);
      return;
    }
    setEmailError("");
    try {
      const captured = await lead.mutateAsync({
        email: submittedEmail,
        url: submittedUrl,
        source: "scanner-gate",
      });
      if (!isLeadRetained(captured)) {
        setEmailError(copy.emailGateError);
        track("scanner_lead_capture_failed", {
          stored: captured.stored,
          crm_status: captured.crm ?? "unknown",
          failure_type: "lead_not_retained",
        });
        return;
      }
      track(ANALYTICS_EVENTS.scannerLeadCaptured, {
        lead_type: "free_scan",
        lead_source: "scanner_email_gate",
        stored: captured.stored,
        crm_status: captured.crm ?? "unknown",
      });
      setEmailDialogOpen(false);
      await runScan(submittedUrl);
    } catch (error) {
      const typedError = error as {
        data?: { code?: string };
        message?: string;
      };
      const isEmailValidationError =
        typedError.data?.code === "BAD_REQUEST" &&
        /invalid email address/i.test(typedError.message ?? "");
      setEmailError(
        isEmailValidationError ? copy.emailGateInvalid : copy.emailGateError
      );
      track("scanner_lead_capture_failed", {
        failure_type: isEmailValidationError
          ? "invalid_email"
          : "request_failed",
      });
    }
  };

  const downloadReport = async () => {
    if (!result?.reachable) return;
    const { downloadScanPdf } = await import("@/lib/scanPdf");
    await downloadScanPdf({
      result,
      actionItems: [
        ...result.detected.map(finding => planItemFor(finding, copy).fix),
        copy.evidenceBody,
      ],
      copy: {
        title: copy.pdfTitle,
        generated: copy.pdfGenerated,
        readiness: copy.readiness,
        findings: copy.pdfFindings,
        actions: copy.pdfActions,
        scope: copy.pdfScope,
        status: copy.scanStatus[result.summary.scanStatus],
        pages: copy.pagesInspected,
        blockers: copy.blockersTitle,
        disclosureFound: copy.disclosureFound,
        disclosureMissing: copy.disclosureMissing,
      },
    });
    track("scanner_pdf_downloaded", {
      detected_count: result.summary.total,
    });
  };

  const completeScanUrl = result?.summary
    ? `${CONVERT.whatsapp}?text=${encodeURIComponent(
        `[REQUEST COMPLETE SCAN ${result.summary.url}]`
      )}`
    : CONVERT.whatsapp;
  return (
    <div className="paper min-h-screen">
      <Seo title={copy.seoTitle} description={copy.seoDescription} localized />
      <SiteNav />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="ink mt-3 text-[32px] leading-tight font-bold tracking-[-0.02em] sm:text-[38px]">
            {copy.title}
          </h1>
          <p className="ink-soft mt-4 max-w-2xl text-[16px] leading-relaxed">
            {copy.intro}
          </p>
          <p className="ink-soft mt-3 max-w-2xl text-[14px] leading-relaxed">
            {copy.scope}
          </p>
        </div>

        <div className="mt-8 flex max-w-2xl flex-col gap-2 sm:flex-row">
          <label htmlFor="scanner-url" className="sr-only">
            {copy.urlLabel}
          </label>
          <Input
            id="scanner-url"
            inputMode="url"
            autoCapitalize="none"
            spellCheck={false}
            maxLength={1000}
            value={url}
            onChange={e => {
              setUrl(e.target.value);
              setResult(null);
              setScanError("");
              setCopied(false);
            }}
            onKeyDown={e => {
              if (e.key !== "Enter") return;
              e.preventDefault();
              requestScan();
            }}
            placeholder={copy.placeholder}
            disabled={scanActive}
            className="hairline h-11 min-w-0 rounded border bg-white px-4 text-[15px]"
          />
          <Button
            data-analytics-event="scan_button_click"
            onClick={requestScan}
            disabled={scanActive || !url.trim()}
            className="h-11 w-full rounded bg-[#16181d] px-6 text-[15px] font-semibold text-white hover:bg-[#2b2f38] sm:w-auto"
          >
            {scanActive ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ScanSearch className="h-4 w-4" />
            )}
            <span className="ml-2">
              {scanActive ? copy.scanning : copy.scan}
            </span>
          </Button>
        </div>

        <Dialog
          open={emailDialogOpen}
          onOpenChange={open => {
            setEmailDialogOpen(open);
            if (!open) setEmailError("");
          }}
        >
          <DialogContent className="overflow-hidden border-[#cbd8ec] bg-white p-0 shadow-[0_28px_90px_rgba(3,18,61,0.28)] sm:max-w-md">
            <div className="h-1.5 bg-gradient-to-r from-[#174a9b] via-[#2e8cff] to-[#53ddff]" />
            <div className="p-6 sm:p-7">
              <DialogHeader>
                <div className="mb-1 flex h-11 w-11 items-center justify-center rounded-full bg-[#edf5ff]">
                  <Mail className="h-5 w-5 text-[#174a9b]" />
                </div>
                <p className="eyebrow text-[#174a9b]">{copy.emailGateLabel}</p>
                <DialogTitle className="text-[23px] leading-tight text-[#16181d]">
                  {copy.emailGateTitle}
                </DialogTitle>
                <DialogDescription className="text-[14px] leading-relaxed text-[#5c6370]">
                  {copy.emailGateBody}
                </DialogDescription>
              </DialogHeader>
              <form
                className="mt-5 space-y-3"
                noValidate
                onSubmit={event => {
                  event.preventDefault();
                  void submitEmailGate();
                }}
              >
                <label
                  htmlFor="scanner-email"
                  className="block text-sm font-bold text-[#16181d]"
                >
                  {copy.emailGateField}
                </label>
                <Input
                  id="scanner-email"
                  type="email"
                  maxLength={255}
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={event => {
                    setEmail(event.target.value);
                    if (emailError) setEmailError("");
                  }}
                  placeholder="name@company.com"
                  aria-invalid={Boolean(emailError)}
                  aria-describedby="scanner-email-help scanner-email-error"
                  className="h-12 rounded border-[#b9c8dc] bg-white px-4 text-[15px]"
                />
                <p
                  id="scanner-email-help"
                  className="text-xs leading-relaxed text-[#6b7280]"
                >
                  {copy.emailGateHint}
                </p>
                {emailError && (
                  <p
                    id="scanner-email-error"
                    role="alert"
                    className="text-sm font-semibold text-[#b42318]"
                  >
                    {emailError}
                  </p>
                )}
                <DialogFooter className="pt-2">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="min-h-11 rounded border-[#cbd5e1]"
                    >
                      {copy.emailGateCancel}
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    disabled={lead.isPending}
                    className="min-h-11 rounded bg-[#174a9b] px-5 text-white hover:bg-[#123b7d]"
                  >
                    {lead.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ScanSearch className="h-4 w-4" />
                    )}
                    <span className="ml-2">{copy.emailGateContinue}</span>
                  </Button>
                </DialogFooter>
              </form>
            </div>
          </DialogContent>
        </Dialog>

        {scanActive && (
          <section
            aria-live="polite"
            className="mt-6 max-w-2xl rounded-xl border border-[#cbd8ec] bg-white p-5 shadow-[0_12px_34px_rgba(5,25,70,0.09)]"
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="eyebrow">{copy.progress}</p>
                <p className="ink mt-2 text-[16px] font-bold">
                  {copy.stages[scanStage].label}
                </p>
                <p className="ink-soft mt-1 text-[13px] leading-relaxed">
                  {copy.stages[scanStage].detail}
                </p>
              </div>
              <span className="shrink-0 font-mono text-[13px] font-semibold text-[#1f3a5f]">
                {copy.elapsed(scanElapsed)}
              </span>
            </div>
            <p className="ink-soft mt-3 text-xs leading-relaxed">
              {copy.progressScope}
            </p>
            <div
              role="progressbar"
              aria-label={copy.stages[scanStage].label}
              aria-valuetext={copy.stages[scanStage].detail}
              className="mt-4 h-2 overflow-hidden rounded-full bg-[#e5ebf4]"
            >
              <div className="scanner-progress-indicator h-full w-1/3 rounded-full bg-[#1f5fd2]" />
            </div>
          </section>
        )}

        {scanError && (
          <Card
            role="alert"
            className="mt-8 max-w-2xl border-[#fecaca] bg-[#fef2f2]"
          >
            <CardContent className="flex items-start gap-3 pt-6 pb-6">
              <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#dc2626]" />
              <div>
                <p className="font-semibold text-[#991b1b]">
                  {copy.failureTitle}
                </p>
                <p className="mt-1 text-sm text-[#b91c1c]">
                  {scanError === "rate-limited"
                    ? copy.rateLimited
                    : scanError === "invalid-url"
                      ? copy.invalidUrl
                      : copy.unreachable(scanError)}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    data-analytics-event="scanner_retry_click"
                    onClick={() => void runScan(url.trim())}
                    className="min-h-11 rounded bg-[#991b1b] px-4 text-sm font-bold text-white transition hover:bg-[#7f1d1d]"
                  >
                    {copy.failureRetry}
                  </button>
                  <a
                    href={CONVERT.calBooking}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-analytics-event="scanner_booking_click"
                    className="inline-flex min-h-11 items-center rounded border border-[#f2a7a7] bg-white px-4 text-sm font-bold text-[#991b1b] transition hover:bg-[#fff7f7]"
                  >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {copy.bookCall}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {result?.reachable && result.summary && (
          <div className="mt-10 space-y-4">
            <section className="overflow-hidden rounded-xl border border-[#cbd8ec] bg-white shadow-[0_16px_45px_rgba(3,18,61,0.09)]">
              <div className="flex bg-[#03123d] px-5 py-5 text-white sm:px-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 font-mono text-sm font-bold">
                    01
                  </span>
                  <div>
                    <p className="text-xs font-bold tracking-[0.14em] text-[#8fddff] uppercase">
                      {copy.scanStatus[result.summary.scanStatus]}
                    </p>
                    <p className="mt-1 max-w-xl text-sm break-all text-white/70">
                      {result.summary.url}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#edf5ff] text-[#174a9b]">
                    <span className="text-4xl font-bold">
                      {result.summary.total}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-start gap-3">
                      <Eye className="mt-0.5 h-5 w-5 shrink-0 text-[#174a9b]" />
                      <div>
                        <h2 className="text-xl font-bold text-[#16181d]">
                          {result.detected.length
                            ? copy.summary(
                                result.summary.total,
                                result.summary.high,
                                result.summary.undisclosed
                              )
                            : copy.noSignaturesTitle}
                        </h2>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#5c6370]">
                          {result.detected.length
                            ? copy.fullBody
                            : copy.noSignaturesBody}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-4">
                  <p className="text-xs font-bold tracking-[0.12em] text-[#1f3a5f] uppercase">
                    {copy.pagesInspected}
                  </p>
                  {result.summary.pagesVisited.map(page => (
                    <p
                      key={page.url}
                      className="mt-1 text-sm leading-relaxed break-all text-[#5c6370]"
                    >
                      <span className="font-semibold text-[#16181d]">
                        {page.title || new URL(page.url).hostname}
                      </span>{" "}
                      — {page.url}
                    </p>
                  ))}
                </div>

                {result.detected.length > 0 && (
                  <div className="mt-6 divide-y divide-[#e2e8f0] border-y border-[#e2e8f0]">
                    {result.detected.map(d => {
                      const plan = planItemFor(d, copy);
                      return (
                        <div key={d.id} className="py-5">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <p className="font-bold text-[#16181d]">
                                {d.name}
                              </p>
                              <p className="mt-1 text-xs text-[#6b7280]">
                                {d.category} · {copy.article} {d.article}
                              </p>
                            </div>
                            <Badge
                              className={
                                d.severity === "high"
                                  ? "bg-[#fde2e2] text-[#b42318] hover:bg-[#fde2e2]"
                                  : d.severity === "medium"
                                    ? "bg-[#fdf0d9] text-[#9a6700] hover:bg-[#fdf0d9]"
                                    : "bg-[#e2e8f8] text-[#174a9b] hover:bg-[#e2e8f8]"
                              }
                            >
                              {d.severity}
                            </Badge>
                          </div>
                          <p
                            className={`mt-3 flex items-start gap-2 text-sm font-semibold ${
                              d.existingDisclosureFound
                                ? "text-[#087a55]"
                                : "text-[#b42318]"
                            }`}
                          >
                            {d.existingDisclosureFound ? (
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                            ) : (
                              <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
                            )}
                            {d.existingDisclosureFound
                              ? copy.disclosureFound
                              : copy.disclosureMissing}
                          </p>
                          <div className="mt-3 rounded-md bg-[#f8fafc] p-3">
                            <p className="flex items-start gap-2 text-sm leading-relaxed text-[#334155]">
                              <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-[#174a9b]" />
                              {plan.fix}
                            </p>
                            <details className="mt-2">
                              <summary className="min-h-11 cursor-pointer py-3 text-xs font-bold text-[#174a9b]">
                                {copy.evidence}
                              </summary>
                              <div className="space-y-1 pb-2 text-xs leading-relaxed break-all text-[#6b7280]">
                                {d.evidence.map(item => (
                                  <p key={item}>— {item}</p>
                                ))}
                                <p>
                                  {copy.source}: {d.sourceUrl}
                                </p>
                              </div>
                            </details>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {result.summary.blockers.length > 0 && (
                  <div className="mt-5 rounded-lg border border-[#f4c96b] bg-[#fff9e8] p-4">
                    <p className="text-xs font-bold tracking-wide text-[#8a5a00] uppercase">
                      {copy.blockersTitle}
                    </p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#6b4f16]">
                      {result.summary.blockers.map(blocker => (
                        <li key={blocker}>{blocker}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    className="min-h-11 rounded"
                    onClick={() => {
                      navigator.clipboard.writeText(result.report).then(() => {
                        setCopied(true);
                        track("scanner_results_copied");
                        setTimeout(() => setCopied(false), 1500);
                      });
                    }}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    {copied ? copy.copied : copy.copyReport}
                  </Button>
                  <Button
                    variant="outline"
                    className="min-h-11 rounded"
                    onClick={() => void downloadReport()}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    {copy.download}
                  </Button>
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-xl border border-[#9fc5ff] bg-white shadow-[0_16px_45px_rgba(23,74,155,0.11)]">
              <div className="grid lg:grid-cols-[1.35fr_0.9fr]">
                <div className="bg-gradient-to-br from-[#03123d] to-[#174a9b] p-6 text-white sm:p-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 font-mono text-sm font-bold">
                      02
                    </span>
                    <p className="text-xs font-bold tracking-[0.14em] text-[#8fddff] uppercase">
                      {copy.fullLabel}
                    </p>
                  </div>
                  <h2 className="mt-5 text-2xl font-bold">
                    {copy.assessmentTitle}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75">
                    {copy.assessmentBody}
                  </p>
                  <Button
                    data-analytics-event="scanner_result_assessment_click"
                    onClick={() => navigate(path(CONVERT.report))}
                    className="mt-6 min-h-12 w-full rounded bg-white px-5 font-bold text-[#03123d] hover:bg-[#eaf5ff] sm:w-auto"
                  >
                    {copy.fullCta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-col justify-center gap-1 border-t border-[#dbe3ee] p-6 sm:p-8 lg:border-t-0 lg:border-l">
                  <a
                    href={CONVERT.calBooking}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-analytics-event="scanner_booking_click"
                    data-analytics-label={result.summary.url}
                    className="inline-flex min-h-11 items-center rounded px-3 text-sm font-semibold text-[#174a9b] transition hover:bg-[#edf5ff]"
                  >
                    <CalendarDays className="mr-2 h-5 w-5" />
                    {copy.bookCall}
                  </a>
                  <a
                    href={completeScanUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-analytics-event="scanner_complete_scan_whatsapp_click"
                    data-analytics-label={result.summary.url}
                    className="inline-flex min-h-11 items-center rounded px-3 text-sm font-semibold text-[#087a55] transition hover:bg-[#f0fbf7]"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    {copy.fullWhatsapp}
                  </a>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-[#d9e2ee] bg-[#f8fafc] p-5 sm:p-7">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#03123d] font-mono text-sm font-bold text-white">
                  03
                </span>
                <div>
                  <h2 className="text-xl font-bold text-[#16181d]">
                    {copy.noticeTitle}
                  </h2>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => navigate(path(CONVERT.badge))}
                  data-analytics-event="scanner_notice_install_click"
                  className="group w-full rounded-lg border border-[#bfd3ee] bg-[#edf5ff] p-4 text-left transition hover:border-[#174a9b]"
                >
                  <div className="flex items-start gap-3">
                    <PackageCheck className="h-5 w-5 shrink-0 text-[#174a9b]" />
                    <span>
                      <span className="block text-sm leading-relaxed text-[#5c6370]">
                        {copy.noticeBody}
                      </span>
                      <span className="mt-3 inline-flex items-center text-sm font-bold text-[#174a9b]">
                        {copy.noticeCta}
                        <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" />
                      </span>
                    </span>
                  </div>
                </button>
              </div>

              <p className="mt-5 text-center text-xs text-[#6b7280]">
                {copy.disclaimer}
              </p>
            </section>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

export default function ScannerPage() {
  return (
    <TRPCProvider>
      <Scanner />
    </TRPCProvider>
  );
}
