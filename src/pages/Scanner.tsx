import { useEffect, useState } from "react";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { trpc } from "@/providers/trpc";
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
  ClipboardList,
  PackageCheck,
  Wrench,
  MessageCircle,
  Mail,
  Bot,
} from "lucide-react";
import { track } from "@/lib/analytics";
import { useI18n } from "@/lib/i18n";
import { SCANNER_COPY } from "@/data/localizedScanner";

function scoreColor(score: number) {
  if (score >= 80) return "text-[#0e9f6e]";
  if (score >= 50) return "text-[#d97706]";
  return "text-[#dc2626]";
}

function scoreLabel(score: number, labels: [string, string, string]) {
  if (score >= 80) return labels[2];
  if (score >= 50) return labels[1];
  return labels[0];
}

const MIN_SCAN_DISPLAY_MS = 2_800;

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

export default function Scanner() {
  const navigate = useNavigate();
  const { lang, path } = useI18n();
  const copy = SCANNER_COPY[lang];
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [scanActive, setScanActive] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStage, setScanStage] = useState(0);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [emailError, setEmailError] = useState("");

  const scan = trpc.scan.run.useMutation();
  const lead = trpc.leads.capture.useMutation();

  useEffect(() => {
    if (!scanActive) return;
    const startedAt = Date.now();
    const timer = window.setInterval(() => {
      const elapsed = Date.now() - startedAt;
      if (elapsed < 650) {
        setScanStage(0);
        setScanProgress(Math.min(22, 8 + Math.round(elapsed / 48)));
      } else if (elapsed < 1_350) {
        setScanStage(1);
        setScanProgress(Math.min(48, 24 + Math.round((elapsed - 650) / 30)));
      } else if (elapsed < 2_100) {
        setScanStage(2);
        setScanProgress(Math.min(74, 50 + Math.round((elapsed - 1_350) / 31)));
      } else {
        setScanStage(3);
        setScanProgress(Math.min(94, 76 + Math.round((elapsed - 2_100) / 250)));
      }
    }, 120);
    return () => window.clearInterval(timer);
  }, [scanActive]);

  const runScan = async (submittedUrl: string) => {
    if (!submittedUrl || scanActive) return;
    setResult(null);
    setScanProgress(8);
    setScanStage(0);
    setScanActive(true);
    const startedAt = Date.now();
    track("scan_started", { has_protocol: /^https?:\/\//i.test(submittedUrl) });

    try {
      const next = (await scan.mutateAsync({
        url: submittedUrl,
      })) as ScanResult;
      await wait(Math.max(0, MIN_SCAN_DISPLAY_MS - (Date.now() - startedAt)));
      setScanStage(3);
      setScanProgress(100);
      await wait(180);
      setResult(next);
      track("scan_completed", {
        reachable: next.reachable,
        detected_count: next.summary?.total ?? 0,
        high_exposure_count: next.summary?.high ?? 0,
        undisclosed_count: next.summary?.undisclosed ?? 0,
      });
    } catch (error) {
      const typedError = error as { data?: { code?: string } };
      track("scan_failed", { error_type: typedError.data?.code || "unknown" });
    } finally {
      setScanActive(false);
    }
  };

  const requestScan = () => {
    if (!url.trim() || scanActive) return;
    setEmailError("");
    setEmailDialogOpen(true);
    track("scanner_email_gate_opened");
  };

  const submitEmailGate = async () => {
    const submittedEmail = email.trim();
    const submittedUrl = url.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submittedEmail)) {
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
      track("scanner_lead_captured", { crm_status: captured.crm ?? "unknown" });
      setEmailDialogOpen(false);
      await runScan(submittedUrl);
    } catch {
      setEmailError(copy.emailGateError);
      track("scanner_lead_capture_failed");
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
  const guidedAssessmentUrl = result?.summary
    ? `${CONVERT.guidedAssessment}?${new URLSearchParams({
        Website: result.summary.url,
        Language: lang,
      }).toString()}`
    : CONVERT.guidedAssessment;

  return (
    <div className="paper min-h-screen">
      <Seo title={copy.seoTitle} description={copy.seoDescription} />
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

        <div className="mt-8 flex max-w-2xl gap-2">
          <Input
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => {
              if (e.key !== "Enter") return;
              e.preventDefault();
              requestScan();
            }}
            placeholder={copy.placeholder}
            className="hairline h-11 rounded border bg-white px-4 text-[15px]"
          />
          <Button
            data-analytics-event="scan_button_click"
            onClick={requestScan}
            disabled={scanActive || !url.trim()}
            className="h-11 rounded bg-[#16181d] px-6 text-[15px] font-semibold text-white hover:bg-[#2b2f38]"
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
                {scanProgress}%
              </span>
            </div>
            <div
              role="progressbar"
              aria-label={copy.stages[scanStage].label}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={scanProgress}
              className="mt-4 h-2 overflow-hidden rounded-full bg-[#e5ebf4]"
            >
              <div
                className="h-full rounded-full bg-[#1f5fd2] transition-[width] duration-300 ease-out"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2" aria-hidden="true">
              {copy.stages.map((stage, index) => (
                <span
                  key={stage.label}
                  className={`h-1 rounded-full ${
                    index <= scanStage ? "bg-[#1f5fd2]" : "bg-[#e5ebf4]"
                  }`}
                />
              ))}
            </div>
          </section>
        )}

        {(scan.isError || (result && !result.reachable)) && (
          <Card className="mx-auto mt-10 max-w-xl border-[#fecaca] bg-[#fef2f2]">
            <CardContent className="flex items-start gap-3 pt-6 pb-6">
              <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#dc2626]" />
              <div>
                <p className="font-semibold text-[#991b1b]">
                  {copy.failureTitle}
                </p>
                <p className="mt-1 text-sm text-[#b91c1c]">
                  {result?.error === "rate-limited"
                    ? copy.rateLimited
                    : result?.error === "invalid-url"
                      ? copy.invalidUrl
                      : copy.unreachable(
                          result?.error ??
                            scan.error?.data?.code ??
                            "unreachable"
                        )}
                </p>
                <button
                  type="button"
                  data-analytics-event="scanner_failure_assessment_click"
                  onClick={() => navigate(path(CONVERT.report))}
                  className="mt-3 min-h-11 rounded bg-[#991b1b] px-4 text-sm font-bold text-white"
                >
                  {copy.failureCta}
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        {result?.reachable && result.summary && (
          <div className="mt-10 space-y-5">
            {/* score card */}
            <Card className="border-[#e2e2dd] bg-white shadow-sm">
              <CardContent className="flex flex-col items-center gap-6 pt-8 pb-8 sm:flex-row sm:justify-center sm:gap-12">
                <div className="text-center">
                  <div
                    className={`text-6xl font-bold ${scoreColor(result.score)}`}
                  >
                    {result.score}
                  </div>
                  <div className="mt-1 text-xs font-semibold tracking-wide text-[#6b7280] uppercase">
                    {copy.readiness}
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-lg font-bold text-[#16181d]">
                    {scoreLabel(result.score, copy.scoreLabels)}
                  </p>
                  <p className="mt-1 text-sm text-[#5c6370]">
                    {copy.summary(
                      result.summary.total,
                      result.summary.high,
                      result.summary.undisclosed
                    )}
                  </p>
                  <p className="mt-1 text-xs break-all text-[#6b7280]">
                    {result.summary.url}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* findings */}
            {result.detected.map(d => (
              <Card key={d.id} className="border-[#e2e2dd] bg-white shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-base font-bold text-[#16181d]">
                      {d.name}
                      <span className="ml-2 text-sm font-medium text-[#6b7280]">
                        {copy.article} {d.article}
                      </span>
                    </CardTitle>
                    <Badge
                      className={
                        d.severity === "high"
                          ? "bg-[#fde2e2] text-[#dc2626] hover:bg-[#fde2e2]"
                          : d.severity === "medium"
                            ? "bg-[#fdf0d9] text-[#d97706] hover:bg-[#fdf0d9]"
                            : "bg-[#e2e8f8] text-[#3556e8] hover:bg-[#e2e8f8]"
                      }
                    >
                      {d.severity}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {d.evidence.map(e => (
                    <p key={e} className="text-xs break-all text-[#6b7280]">
                      {copy.evidence}: {e}
                    </p>
                  ))}
                  {d.existingDisclosureFound ? (
                    <p className="flex items-center gap-2 pt-1 text-sm font-semibold text-[#0e9f6e]">
                      <CheckCircle2 className="h-4 w-4" />{" "}
                      {copy.disclosureFound}
                    </p>
                  ) : (
                    <p className="flex items-center gap-2 pt-1 text-sm font-semibold text-[#dc2626]">
                      <XCircle className="h-4 w-4" /> {copy.disclosureMissing}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}

            {!result.detected.length && (
              <Card className="border-[#e2e2dd] bg-white shadow-sm">
                <CardContent className="pt-6 text-center">
                  <p className="font-semibold text-[#16181d]">
                    {copy.noSignaturesTitle}
                  </p>
                  <p className="mt-1 text-sm text-[#5c6370]">
                    {copy.noSignaturesBody}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* FREE IMPLEMENTATION PLAN */}
            <Card className="border-[#1f3a5f] bg-white shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-[#f7f7f5]">
                    <ClipboardList className="h-5 w-5 text-[#1f3a5f]" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-[#16181d]">
                      {copy.planTitle}
                    </CardTitle>
                    <p className="text-sm text-[#6b7280]">
                      {copy.planSubtitle}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                {result.detected.map((d, i) => {
                  const plan = planItemFor(d, copy);
                  return (
                    <div
                      key={d.id}
                      className="rounded border border-[#e2e2dd] p-4"
                    >
                      <p className="text-xs font-bold tracking-wide text-[#1f3a5f] uppercase">
                        {copy.step} {i + 1} — {d.name}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[#5c6370]">
                        {plan.what}
                      </p>
                      <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-[#16181d]">
                        <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-[#1f3a5f]" />
                        {plan.fix}
                      </p>
                    </div>
                  );
                })}
                <div className="rounded border border-[#e2e2dd] p-4">
                  <p className="text-xs font-bold tracking-wide text-[#1f3a5f] uppercase">
                    {copy.alwaysStep}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#5c6370]">
                    {copy.evidenceBody}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-[#9fc5ff] bg-[#f3f8ff] shadow-[0_16px_40px_rgba(23,74,155,0.12)]">
              <CardContent className="grid gap-6 pt-7 pb-7 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <p className="eyebrow text-[#174a9b]">{copy.fullLabel}</p>
                  <h2 className="ink mt-2 text-[22px] leading-tight font-bold">
                    {copy.fullTitle}
                  </h2>
                  <p className="ink-soft mt-2 max-w-2xl text-[14px] leading-relaxed">
                    {copy.fullBody}
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    asChild
                    className="min-h-12 rounded bg-[#079455] px-5 font-bold text-white hover:bg-[#067647]"
                  >
                    <a
                      href={completeScanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-analytics-event="scanner_complete_scan_whatsapp_click"
                      data-analytics-label={result.summary.url}
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      {copy.fullWhatsapp}
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    data-analytics-event="scanner_result_assessment_click"
                    onClick={() => navigate(path(CONVERT.report))}
                    className="min-h-11 rounded border-[#174a9b] bg-white text-[#174a9b] hover:bg-[#e9f2ff]"
                  >
                    {copy.fullCta}
                  </Button>
                  <a
                    href={guidedAssessmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-analytics-event="scanner_guided_assessment_click"
                    data-analytics-label={result.summary.url}
                    className="flex min-h-11 items-center justify-center rounded px-3 text-center text-[13px] font-semibold text-[#174a9b] underline decoration-[#9fc5ff] underline-offset-4 transition hover:bg-[#e9f2ff]"
                  >
                    <Bot className="mr-2 h-4 w-4 shrink-0" />
                    {copy.guidedCta}
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Next actions and downloadable evidence */}
            <Card className="border-[#16181d] bg-[#16181d] text-white shadow-lg">
              <CardContent className="flex flex-col gap-5 pt-7 pb-7">
                <div>
                  <button
                    onClick={() => navigate(path(CONVERT.badge))}
                    className="flex w-full items-start gap-3 rounded border border-white/15 p-4 text-left transition hover:bg-white/5"
                  >
                    <PackageCheck className="h-5 w-5 text-[#4ade80]" />
                    <span>
                      <span className="block font-bold">{copy.noticeTitle}</span>
                      <span className="mt-1 block text-xs leading-relaxed text-white/60">
                        {copy.noticeBody} →
                      </span>
                    </span>
                  </button>
                </div>
                <div className="border-t border-white/10 pt-5">
                  <p className="flex items-center gap-2 text-sm font-semibold text-[#4ade80]">
                    <CheckCircle2 className="h-4 w-4" /> {copy.leadDone}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="min-h-11 rounded border-white/25 bg-transparent text-white hover:bg-white/10"
                      onClick={() => {
                        navigator.clipboard
                          .writeText(result.report)
                          .then(() => {
                            setCopied(true);
                            setTimeout(() => setCopied(false), 1500);
                          });
                      }}
                    >
                      <Copy className="mr-2 h-3.5 w-3.5" />{" "}
                      {copied ? copy.copied : copy.copyReport}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="min-h-11 rounded border-white/25 bg-transparent text-white hover:bg-white/10"
                      onClick={() => void downloadReport()}
                    >
                      <Download className="mr-2 h-3.5 w-3.5" /> {copy.download}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-center text-xs text-[#6b7280]">
              {copy.disclaimer}
            </p>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
