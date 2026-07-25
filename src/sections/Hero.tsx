import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Clock, UserCheck, Building2, ShieldAlert, Check, Mail } from "lucide-react";
import { CONVERT, REPORT } from "@/config";
import { daysLeft } from "@/components/Countdown";

const pills = [
  { icon: Clock, label: `In your inbox in ${REPORT.delivery}` },
  { icon: UserCheck, label: "Assessed by a human" },
  { icon: Building2, label: "Any company size" },
];

/** Preview of the deliverable — the report itself is the product. */
function ReportMockup() {
  return (
    <div className="shadow-float relative w-full max-w-[520px] rounded-2xl border border-white/60 bg-white/95 backdrop-blur">
      {/* document header */}
      <div className="rounded-t-2xl bg-[#141b2e] px-6 py-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[9px] font-bold tracking-[0.18em] text-[#ffd617] uppercase">
              Pre-Consultory Report
            </p>
            <p className="mt-1 text-[15px] leading-tight font-extrabold text-white">
              EU AI Act — Compliance Assessment
            </p>
            <p className="mt-1 text-[10px] text-white/50">
              Prepared for Acme B.V. · Ref K3F9QP
            </p>
          </div>
          <span className="rounded-md bg-white/10 px-2 py-1 text-[9px] font-bold text-white/80">
            14 pages
          </span>
        </div>
      </div>

      <div className="space-y-4 px-6 py-5">
        {/* exposure summary */}
        <div className="flex items-center gap-3 rounded-xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3">
          <ShieldAlert className="h-5 w-5 shrink-0 text-[#dc2626]" />
          <div>
            <p className="text-[11px] font-extrabold text-[#991b1b]">
              3 systems carry Article 50 duties
            </p>
            <p className="text-[10px] text-[#b91c1c]">
              2 undisclosed · 1 partially disclosed · action needed before 2 Aug 2026
            </p>
          </div>
        </div>

        {/* per-system classification */}
        <div>
          <p className="text-[9px] font-bold tracking-wide text-[#8a92a6] uppercase">
            Your AI systems, classified
          </p>
          <div className="mt-2 space-y-1.5">
            {[
              ["Support chatbot (Intercom)", "Transparency — Art. 50(1)", "#fef3c7", "#92400e"],
              ["AI product descriptions", "Transparency — Art. 50(4)", "#fef3c7", "#92400e"],
              ["CV screening tool", "High-risk — Annex III", "#fee2e2", "#991b1b"],
              ["Internal code assistant", "Out of scope", "#dcfce7", "#166534"],
            ].map(([name, tag, bg, fg]) => (
              <div
                key={name}
                className="flex items-center justify-between rounded-lg border border-[#eef0f6] bg-white px-3 py-2"
              >
                <span className="text-[10px] font-semibold text-[#141b2e]">{name}</span>
                <span
                  className="rounded px-1.5 py-0.5 text-[8px] font-bold"
                  style={{ backgroundColor: bg, color: fg }}
                >
                  {tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* action list */}
        <div>
          <p className="text-[9px] font-bold tracking-wide text-[#8a92a6] uppercase">
            Prioritised actions
          </p>
          <div className="mt-2 space-y-1.5">
            {[
              "Publish AI disclosure before first chatbot message",
              "Label AI-generated product copy at point of display",
              "Document CV-screening logic + human oversight",
            ].map((a) => (
              <div key={a} className="flex items-start gap-2">
                <Check className="mt-0.5 h-3 w-3 shrink-0 text-[#0e9f6e]" />
                <span className="text-[10px] leading-snug text-[#3d445c]">{a}</span>
              </div>
            ))}
          </div>
        </div>

        {/* human assessment footer */}
        <div className="flex items-center gap-2.5 rounded-xl border border-[#e7e9f2] bg-[#f8f9fc] px-4 py-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#6d5df6]">
            <Mail className="h-3.5 w-3.5 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[#141b2e]">
              Professional contact assessment included
            </p>
            <p className="text-[9px] text-[#8a92a6]">
              Written by a named specialist — reply directly with questions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="mesh-bg relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-20 pb-24 sm:px-6 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:pt-28">
        {/* left */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e7e9f2] bg-white/80 px-3 py-1 text-xs font-semibold text-[#5a6378] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#dc2626]" />
            EU AI Act Article 50 · {daysLeft() === 0 ? "in force now" : `live in ${daysLeft()} days`} · fines up to €15M
          </span>
          <h1 className="mt-5 text-[42px] leading-[1.05] font-extrabold tracking-tight text-[#141b2e] sm:text-[54px]">
            Know exactly
            <br />
            where your company
            <br />
            stands
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#5a6378]">
            Tell us about your business and the AI you use. A specialist assesses your actual
            exposure under the EU AI Act and sends you the complete pre-consultory report — plus a
            professional contact assessment — within {REPORT.delivery}.
          </p>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#5a6378]">
            <strong className="text-[#141b2e]">€99, one-time.</strong> The same way a law firm
            charges to review your case before anything else happens.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="rounded-full bg-[#141b2e] px-7 font-semibold text-white hover:bg-[#232c4a]"
              onClick={() => navigate(CONVERT.report)}
            >
              Get my report — €99
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-[#d8dce8] bg-white/80 px-7 font-semibold text-[#141b2e]"
              onClick={() => navigate(CONVERT.scanner)}
            >
              Scan my site free
            </Button>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            {pills.map((p) => (
              <span
                key={p.label}
                className="inline-flex items-center gap-2 rounded-full border border-[#e7e9f2] bg-white/90 px-4 py-2 text-sm font-semibold text-[#141b2e] shadow-sm"
              >
                <p.icon className="h-4 w-4 text-[#6d5df6]" />
                {p.label}
              </span>
            ))}
          </div>
        </div>

        {/* right */}
        <div className="flex justify-center lg:justify-end">
          <ReportMockup />
        </div>
      </div>
    </section>
  );
}
