import { useState } from "react";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/providers/trpc";
import type { ScanResult, ScanFinding } from "@contracts/types";
import { openConversion } from "@/config";
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

function scoreColor(score: number) {
  if (score >= 80) return "text-[#0e9f6e]";
  if (score >= 50) return "text-[#d97706]";
  return "text-[#dc2626]";
}

function scoreLabel(score: number) {
  if (score >= 80) return "Low visible exposure";
  if (score >= 50) return "Disclosure gaps found";
  return "High exposure — undisclosed AI";
}

/** Turn each finding into a plain-English plan item. */
function planItemFor(d: ScanFinding): { what: string; fix: string } {
  if (d.category === "chat") {
    return {
      what: `Your site runs ${d.name}. From 2 August 2026, visitors must be told — clearly, before the conversation starts — that they are talking to an AI, not a person. ${d.existingDisclosureFound ? "We found disclosure wording on the page: verify it appears before the first message." : "We found no disclosure near it."}`,
      fix: `Free: install the RapidAct plugin (WordPress / Wix / any stack) — it adds the notice above ${d.name} automatically. Pack (€59): configured for your site with evidence log. Done For You (€99): we install and verify it live.`,
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

  const scan = trpc.scan.run.useMutation({
    onSuccess: (data) => setResult(data as ScanResult),
  });
  const lead = trpc.leads.capture.useMutation({
    onSuccess: () => setLeadDone(true),
  });

  const runScan = () => {
    if (!url.trim()) return;
    setResult(null);
    scan.mutate({ url: url.trim() });
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
    <div className="mesh-bg min-h-screen">
      <Seo
        title="Free AI transparency scan + implementation plan | RapidAct"
        description="Scan your website free: detect AI chatbots missing the EU AI Act Article 50 disclosure, get a readiness score and a free plain-English implementation plan."
      />
      <SiteNav />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#141b2e] sm:text-5xl">
            Scan your site.
            <br />
            <span className="brand-gradient-text">Get your free fix-it plan.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[#5a6378]">
            The same outside-in check a regulator — or your competitor — can run in 30 seconds.
            Free forever, no signup. You keep the plan either way.
          </p>
        </div>

        <div className="mx-auto mt-8 flex max-w-xl gap-2">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runScan()}
            placeholder="your-site.com"
            className="h-12 rounded-full border-[#d8dce8] bg-white px-5 text-base"
          />
          <Button
            onClick={runScan}
            disabled={scan.isPending || !url.trim()}
            className="h-12 rounded-full bg-[#141b2e] px-6 font-semibold text-white hover:bg-[#232c4a]"
          >
            {scan.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ScanSearch className="h-4 w-4" />}
            <span className="ml-2">{scan.isPending ? "Scanning…" : "Scan free"}</span>
          </Button>
        </div>

        {scan.isPending && (
          <p className="mt-6 text-center text-sm text-[#8a92a6]">
            Fetching the page and checking 52 signatures… usually under 15 seconds.
          </p>
        )}

        {result && !result.reachable && (
          <Card className="mx-auto mt-10 max-w-xl border-[#fecaca] bg-[#fef2f2]">
            <CardContent className="flex items-start gap-3 pt-6">
              <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#dc2626]" />
              <div>
                <p className="font-semibold text-[#991b1b]">We couldn't scan that URL</p>
                <p className="mt-1 text-sm text-[#b91c1c]">
                  {result.error === "rate-limited"
                    ? "Too many scans from your network — try again in a few minutes."
                    : result.error === "invalid-url"
                      ? "That doesn't look like a valid public URL."
                      : `The site didn't respond (${result.error ?? "unreachable"}). It may block automated checks — the Done-For-You install (€99) includes a manual review instead.`}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {result?.reachable && result.summary && (
          <div className="mt-10 space-y-5">
            {/* score card */}
            <Card className="border-[#e7e9f2] bg-white shadow-sm">
              <CardContent className="flex flex-col items-center gap-6 pt-8 pb-8 sm:flex-row sm:justify-center sm:gap-12">
                <div className="text-center">
                  <div className={`text-6xl font-extrabold ${scoreColor(result.score)}`}>
                    {result.score}
                  </div>
                  <div className="mt-1 text-xs font-semibold tracking-wide text-[#8a92a6] uppercase">
                    readiness / 100
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-lg font-bold text-[#141b2e]">{scoreLabel(result.score)}</p>
                  <p className="mt-1 text-sm text-[#5a6378]">
                    {result.summary.total} AI touchpoint{result.summary.total === 1 ? "" : "s"} detected
                    · {result.summary.high} high-exposure ·{" "}
                    <span className="font-semibold text-[#dc2626]">
                      {result.summary.undisclosed} without visible AI disclosure
                    </span>
                  </p>
                  <p className="mt-1 text-xs break-all text-[#8a92a6]">{result.summary.url}</p>
                </div>
              </CardContent>
            </Card>

            {/* findings */}
            {result.detected.map((d) => (
              <Card key={d.id} className="border-[#e7e9f2] bg-white shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className="text-base font-bold text-[#141b2e]">
                      {d.name}
                      <span className="ml-2 text-sm font-medium text-[#8a92a6]">Art. {d.article}</span>
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
                  {d.evidence.map((e) => (
                    <p key={e} className="text-xs break-all text-[#8a92a6]">
                      evidence: {e}
                    </p>
                  ))}
                  {d.existingDisclosureFound ? (
                    <p className="flex items-center gap-2 pt-1 text-sm font-semibold text-[#0e9f6e]">
                      <CheckCircle2 className="h-4 w-4" /> AI disclosure wording detected on the page
                    </p>
                  ) : (
                    <p className="flex items-center gap-2 pt-1 text-sm font-semibold text-[#dc2626]">
                      <XCircle className="h-4 w-4" /> No AI disclosure detected — Art. 50(1) requires
                      informing users they interact with AI
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}

            {!result.detected.length && (
              <Card className="border-[#e7e9f2] bg-white shadow-sm">
                <CardContent className="pt-6 text-center">
                  <p className="font-semibold text-[#141b2e]">
                    No known AI chat signatures found on this page.
                  </p>
                  <p className="mt-1 text-sm text-[#5a6378]">
                    This covers 52 known vendor signatures — custom-built AI may still be present. If
                    you use AI for images, videos or text, the labeling rules may still apply to you.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* FREE IMPLEMENTATION PLAN */}
            <Card className="border-[#6d5df6] bg-white shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0eeff]">
                    <ClipboardList className="h-5 w-5 text-[#6d5df6]" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-extrabold text-[#141b2e]">
                      Your free implementation plan
                    </CardTitle>
                    <p className="text-sm text-[#8a92a6]">Yours to keep — no email required.</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                {result.detected.map((d, i) => {
                  const plan = planItemFor(d);
                  return (
                    <div key={d.id} className="rounded-xl border border-[#eef0f6] p-4">
                      <p className="text-xs font-extrabold tracking-wide text-[#6d5df6] uppercase">
                        Step {i + 1} — {d.name}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-[#3d445c]">{plan.what}</p>
                      <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-[#141b2e]">
                        <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-[#6d5df6]" />
                        {plan.fix}
                      </p>
                    </div>
                  );
                })}
                <div className="rounded-xl border border-[#eef0f6] p-4">
                  <p className="text-xs font-extrabold tracking-wide text-[#6d5df6] uppercase">
                    Always-on step — your evidence
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#3d445c]">
                    Whatever you install, keep proof: which pages show the disclosure, and when.
                    Article 50 questions arrive months later, in writing. The RapidAct evidence log
                    records every disclosure view automatically.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* CTAs + lead capture */}
            <Card className="border-[#141b2e] bg-[#141b2e] text-white shadow-lg">
              <CardContent className="flex flex-col gap-5 pt-7 pb-7">
                <div className="grid gap-3 sm:grid-cols-3">
                  <button
                    onClick={() => navigate("/learn")}
                    className="rounded-xl border border-white/15 p-4 text-left transition hover:bg-white/5"
                  >
                    <PackageCheck className="h-5 w-5 text-[#4ade80]" />
                    <p className="mt-2 font-bold">Do it yourself — €0</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/60">
                      Free plugin for WordPress, Wix or any stack + step-by-step guide →
                    </p>
                  </button>
                  <button
                    onClick={() => openConversion("pack", navigate)}
                    className="rounded-xl border border-[#ffd617]/40 bg-[#ffd617]/10 p-4 text-left transition hover:bg-[#ffd617]/20"
                  >
                    <PackageCheck className="h-5 w-5 text-[#ffd617]" />
                    <p className="mt-2 font-bold">The Pack — €59</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/60">
                      Everything configured for your site + evidence log + 12 months of updates. Buy directly →
                    </p>
                  </button>
                  <button
                    onClick={() => openConversion("dfy", navigate)}
                    className="rounded-xl border border-white/15 p-4 text-left transition hover:bg-white/5"
                  >
                    <PackageCheck className="h-5 w-5 text-white" />
                    <p className="mt-2 font-bold">Done For You — €99</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/60">
                      We install everything on your website and verify it live. Book your slot →
                    </p>
                  </button>
                </div>
                <div className="border-t border-white/10 pt-5">
                  {leadDone ? (
                    <p className="flex items-center gap-2 text-sm font-semibold text-[#4ade80]">
                      <CheckCircle2 className="h-4 w-4" /> Done — we'll send the plan and the install
                      link.
                    </p>
                  ) : (
                    <div className="flex flex-col gap-2 sm:flex-row">
                      <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Work email — get this plan + install link"
                        className="h-11 flex-1 rounded-full border-white/20 bg-white/10 px-5 text-white placeholder:text-white/40"
                      />
                      <Button
                        disabled={lead.isPending || !email.includes("@")}
                        onClick={() =>
                          lead.mutate({ email: email.trim(), url: result.summary.url, source: "scanner-plan" })
                        }
                        className="h-11 rounded-full bg-[#ffd617] px-6 font-bold text-[#141b2e] hover:bg-[#ffe44d]"
                      >
                        {lead.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send my plan"}
                      </Button>
                    </div>
                  )}
                  <div className="mt-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full border-white/25 bg-transparent text-white hover:bg-white/10"
                      onClick={() => {
                        navigator.clipboard.writeText(result.report).then(() => {
                          setCopied(true);
                          setTimeout(() => setCopied(false), 1500);
                        });
                      }}
                    >
                      <Copy className="mr-2 h-3.5 w-3.5" /> {copied ? "Copied!" : "Copy report"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full border-white/25 bg-transparent text-white hover:bg-white/10"
                      onClick={downloadReport}
                    >
                      <Download className="mr-2 h-3.5 w-3.5" /> Download .txt
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <p className="text-center text-xs text-[#8a92a6]">
              Technical scan, not legal advice. Regulation (EU) 2024/1689, Art. 50 · fines up to €15M or
              3% of global turnover (Art. 99).
            </p>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
