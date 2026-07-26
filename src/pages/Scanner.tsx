import { useEffect, useState } from "react";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/providers/trpc";
import type { ScanResult, ScanFinding } from "@contracts/types";
import { CONVERT, REPORT } from "@/config";
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
} from "lucide-react";
import { track } from "@/lib/analytics";

function scoreColor(score: number) {
  if (score >= 80) return "text-[#0e9f6e]";
  if (score >= 50) return "text-[#d97706]";
  return "text-[#dc2626]";
}

function scoreLabel(score: number) {
  if (score >= 80) return "Low visible exposure";
  if (score >= 50) return "Disclosure gaps found";
  return "High visible exposure — review needed";
}

const SCAN_STAGES = [
  {
    label: "Preparing a secure fetch",
    detail:
      "Normalising the address and checking that the public page can be reached.",
  },
  {
    label: "Reading the public page",
    detail:
      "Fetching the published HTML, scripts and embedded tools a visitor receives.",
  },
  {
    label: "Checking 52 AI signatures",
    detail:
      "Comparing visible technologies and disclosure wording against the scanner library.",
  },
  {
    label: "Building your preview",
    detail:
      "Turning the technical matches into a score and practical next steps.",
  },
] as const;

const MIN_SCAN_DISPLAY_MS = 2_800;

function wait(ms: number) {
  return new Promise(resolve => window.setTimeout(resolve, ms));
}

/** Turn each finding into a plain-English plan item. */
function planItemFor(d: ScanFinding): { what: string; fix: string } {
  if (d.category === "chat") {
    return {
      what: `Your site runs ${d.name}. If you are the provider responsible for Article 50(1), the visitor must receive a clear AI-interaction notice at the latest at first interaction. ${d.existingDisclosureFound ? "We found disclosure wording on the page: verify its timing and prominence." : "We found no disclosure wording on the scanned page."}`,
      fix: `Free: install and tailor the one-script RapidAct notice, then verify it on the live page. The scan cannot determine your provider/deployer role or private AI systems; the €99 pre-consultory report classifies those company-wide questions.`,
    };
  }
  return {
    what: `Your site uses ${d.name}, an AI-powered feature. Check whether visitors can tell AI is involved.`,
    fix: "Free: review the AI content labeling guide. Pack/DFY: labels + templates installed for you.",
  };
}

export default function Scanner() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [leadDone, setLeadDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scanActive, setScanActive] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStage, setScanStage] = useState(0);

  const scan = trpc.scan.run.useMutation();
  const lead = trpc.leads.capture.useMutation({
    onSuccess: () => setLeadDone(true),
  });

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

  const runScan = async () => {
    const submittedUrl = url.trim();
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

  const downloadReport = () => {
    if (!result?.report) return;
    const blob = new Blob([result.report], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "rapidact-scan.txt";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="paper min-h-screen">
      <Seo
        title="Free AI transparency scan + implementation plan | RapidAct"
        description="Scan your website free: detect AI chatbots missing the EU AI Act Article 50 disclosure, get a readiness score and a free plain-English implementation plan."
      />
      <SiteNav />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div>
          <p className="eyebrow">Free tool</p>
          <h1 className="ink mt-3 text-[32px] leading-tight font-bold tracking-[-0.02em] sm:text-[38px]">
            Check which AI systems are visible on your website
          </h1>
          <p className="ink-soft mt-4 max-w-2xl text-[16px] leading-relaxed">
            The same outside-in check a regulator, an enterprise client or a
            competitor can run on you in under a minute. It reads only the
            public HTML of the address you submit, matches it against 52 known
            platforms, and returns an implementation plan you keep. Free, with
            no account.
          </p>
          <p className="ink-soft mt-3 max-w-2xl text-[14px] leading-relaxed">
            A signature match is a technical signal, not a legal classification.
            Your role, the system's purpose and any applicable exception still
            need to be established.
          </p>
          <p className="ink-soft mt-3 max-w-2xl text-[15px] leading-relaxed">
            The scan sees your website. It cannot see the AI systems that never
            touch a public page, which is where most of the exposure sits. That
            is what the{" "}
            <button
              onClick={() => navigate(CONVERT.report)}
              className="accent font-semibold underline underline-offset-2"
            >
              €99 assessment
            </button>{" "}
            covers.
          </p>
        </div>

        <div className="mt-8 flex max-w-2xl gap-2">
          <Input
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === "Enter" && runScan()}
            placeholder="your-site.com"
            className="hairline h-11 rounded border bg-white px-4 text-[15px]"
          />
          <Button
            data-analytics-event="scan_button_click"
            onClick={runScan}
            disabled={scanActive || !url.trim()}
            className="h-11 rounded bg-[#16181d] px-6 text-[15px] font-semibold text-white hover:bg-[#2b2f38]"
          >
            {scanActive ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ScanSearch className="h-4 w-4" />
            )}
            <span className="ml-2">{scanActive ? "Scanning" : "Scan"}</span>
          </Button>
        </div>

        {scanActive && (
          <section
            aria-live="polite"
            className="mt-6 max-w-2xl rounded-xl border border-[#cbd8ec] bg-white p-5 shadow-[0_12px_34px_rgba(5,25,70,0.09)]"
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="eyebrow">Public-page scan in progress</p>
                <p className="ink mt-2 text-[16px] font-bold">
                  {SCAN_STAGES[scanStage].label}
                </p>
                <p className="ink-soft mt-1 text-[13px] leading-relaxed">
                  {SCAN_STAGES[scanStage].detail}
                </p>
              </div>
              <span className="shrink-0 font-mono text-[13px] font-semibold text-[#1f3a5f]">
                {scanProgress}%
              </span>
            </div>
            <div
              role="progressbar"
              aria-label={SCAN_STAGES[scanStage].label}
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
              {SCAN_STAGES.map((stage, index) => (
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

        <aside className="mt-6 flex max-w-2xl flex-col gap-4 rounded-xl border border-[#9fc5ff] bg-[#f3f8ff] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow text-[#174a9b]">Full assessment</p>
            <p className="ink mt-2 text-[15px] leading-relaxed font-semibold">
              This free scan is a public-page preview. The €99 assessment
              reviews the AI your company actually runs—including private
              systems, your provider/deployer role, the notices required and a
              written action plan.
            </p>
          </div>
          <Button
            data-analytics-event="scanner_full_assessment_click"
            data-analytics-label="Scanner full assessment fallback"
            onClick={() => navigate(CONVERT.report)}
            className="min-h-11 shrink-0 rounded bg-[#174a9b] px-5 text-white hover:bg-[#123b7d]"
          >
            Get the full assessment · €99
          </Button>
        </aside>

        {(scan.isError || (result && !result.reachable)) && (
          <Card className="mx-auto mt-10 max-w-xl border-[#fecaca] bg-[#fef2f2]">
            <CardContent className="flex items-start gap-3 pt-6 pb-6">
              <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#dc2626]" />
              <div>
                <p className="font-semibold text-[#991b1b]">
                  We couldn't scan that URL
                </p>
                <p className="mt-1 text-sm text-[#b91c1c]">
                  {result?.error === "rate-limited"
                    ? "Too many scans from your network — try again in a few minutes."
                    : result?.error === "invalid-url"
                      ? "That doesn't look like a valid public URL."
                      : `The site didn't respond (${result?.error ?? scan.error?.data?.code ?? "unreachable"}). It may block automated checks — the €99 pre-consultory report covers your systems by manual review instead.`}
                </p>
                <button
                  type="button"
                  data-analytics-event="scanner_failure_assessment_click"
                  onClick={() => navigate(CONVERT.report)}
                  className="mt-3 min-h-11 rounded bg-[#991b1b] px-4 text-sm font-bold text-white"
                >
                  Continue with the full assessment · €99
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
                    readiness / 100
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-lg font-bold text-[#16181d]">
                    {scoreLabel(result.score)}
                  </p>
                  <p className="mt-1 text-sm text-[#5c6370]">
                    {result.summary.total} AI touchpoint
                    {result.summary.total === 1 ? "" : "s"} detected ·{" "}
                    {result.summary.high} high-exposure ·{" "}
                    <span className="font-semibold text-[#dc2626]">
                      {result.summary.undisclosed} without visible AI disclosure
                    </span>
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
                        Art. {d.article}
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
                      evidence: {e}
                    </p>
                  ))}
                  {d.existingDisclosureFound ? (
                    <p className="flex items-center gap-2 pt-1 text-sm font-semibold text-[#0e9f6e]">
                      <CheckCircle2 className="h-4 w-4" /> AI disclosure wording
                      detected on the page
                    </p>
                  ) : (
                    <p className="flex items-center gap-2 pt-1 text-sm font-semibold text-[#dc2626]">
                      <XCircle className="h-4 w-4" /> No AI disclosure wording
                      detected — review Article 50(1), your role and the
                      first-interaction experience
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}

            {!result.detected.length && (
              <Card className="border-[#e2e2dd] bg-white shadow-sm">
                <CardContent className="pt-6 text-center">
                  <p className="font-semibold text-[#16181d]">
                    No known AI chat signatures found on this page.
                  </p>
                  <p className="mt-1 text-sm text-[#5c6370]">
                    This covers 52 known vendor signatures — custom-built AI may
                    still be present. If you use AI for images, videos or text,
                    the labeling rules may still apply to you.
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
                      Your free implementation plan
                    </CardTitle>
                    <p className="text-sm text-[#6b7280]">
                      Yours to keep — no email required.
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                {result.detected.map((d, i) => {
                  const plan = planItemFor(d);
                  return (
                    <div
                      key={d.id}
                      className="rounded border border-[#e2e2dd] p-4"
                    >
                      <p className="text-xs font-bold tracking-wide text-[#1f3a5f] uppercase">
                        Step {i + 1} — {d.name}
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
                    Always-on step — your evidence
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#5c6370]">
                    Whatever you install, keep proportionate proof: the live
                    URL, approved wording, provider/deployer roles, owner,
                    publication date and a rendered desktop/mobile check. The
                    notice itself does not track visitors or create an evidence
                    log.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* CTAs + lead capture */}
            <Card className="border-[#16181d] bg-[#16181d] text-white shadow-lg">
              <CardContent className="flex flex-col gap-5 pt-7 pb-7">
                <div className="grid gap-3 sm:grid-cols-[1.3fr_1fr]">
                  <button
                    onClick={() => navigate(CONVERT.report)}
                    className="rounded border border-white/25 bg-white/10 p-4 text-left transition hover:bg-white/20"
                  >
                    <PackageCheck className="h-5 w-5 text-white" />
                    <p className="mt-2 font-bold">
                      This scan sees your website. The report sees your company
                      — €99
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-white/60">
                      A specialist classifies every AI system you run, states
                      your exact Article 50 duties and the evidence you must
                      hold, and sends it with a professional contact assessment
                      within {REPORT.delivery}. Full refund if it does not
                      arrive →
                    </p>
                  </button>
                  <button
                    onClick={() => navigate(CONVERT.badge)}
                    className="rounded border border-white/15 p-4 text-left transition hover:bg-white/5"
                  >
                    <PackageCheck className="h-5 w-5 text-[#4ade80]" />
                    <p className="mt-2 font-bold">
                      Add the AI-use notice — free
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-white/60">
                      One script, no account, cookies or visitor tracking.
                      Tailor the wording, publish, then read it as a visitor →
                    </p>
                  </button>
                </div>
                <div className="border-t border-white/10 pt-5">
                  {leadDone ? (
                    <p className="flex items-center gap-2 text-sm font-semibold text-[#4ade80]">
                      <CheckCircle2 className="h-4 w-4" /> Done — we'll send the
                      plan and the install link.
                    </p>
                  ) : (
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Work email — get this plan + install link"
                        autoComplete="email"
                        className="h-11 flex-1 rounded border-white/20 bg-white/10 px-5 text-white placeholder:text-white/40"
                      />
                      <Button
                        disabled={lead.isPending || !email.includes("@")}
                        onClick={() =>
                          lead.mutate({
                            email: email.trim(),
                            url: result.summary.url,
                            source: "scanner-plan",
                          })
                        }
                        className="h-11 rounded bg-white px-6 font-bold text-[#16181d] hover:bg-[#f7f7f5]"
                      >
                        {lead.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Send my plan"
                        )}
                      </Button>
                    </div>
                  )}
                  <div className="mt-4 flex gap-2">
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
                      {copied ? "Copied!" : "Copy report"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="min-h-11 rounded border-white/25 bg-transparent text-white hover:bg-white/10"
                      onClick={downloadReport}
                    >
                      <Download className="mr-2 h-3.5 w-3.5" /> Download .txt
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-center text-xs text-[#6b7280]">
              Technical scan, not legal advice. Regulation (EU) 2024/1689, Art.
              50 · fines up to €15M or 3% of global turnover (Art. 99).
            </p>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
