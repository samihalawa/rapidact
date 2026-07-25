import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { CONVERT, REPORT } from "@/config";

/** Shared conversion band used on every SEO page. Report-first. */
export default function CtaBand() {
  const navigate = useNavigate();
  return (
    <div className="mt-12 overflow-hidden rounded-2xl bg-[#141b2e] text-white">
      <div className="grid gap-8 p-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <span className="rounded-full bg-[#ffd617] px-3 py-1 text-[11px] font-extrabold tracking-wide text-[#141b2e] uppercase">
            Know where you stand
          </span>
          <p className="mt-4 text-2xl leading-tight font-extrabold">{REPORT.name}</p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold">€99</span>
            <span className="text-sm text-white/60">one-time · per company</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Tell us about your company and the AI you use. A specialist assesses your real exposure
            and sends the complete report plus a professional contact assessment to your inbox
            within {REPORT.delivery} — or you get a full refund.
          </p>
          <Button
            className="mt-5 rounded-full bg-white font-bold text-[#141b2e] hover:bg-[#f1f2f8]"
            onClick={() => navigate(CONVERT.report)}
          >
            Get my report — €99
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </div>

        <div className="lg:border-l lg:border-white/10 lg:pl-8">
          <p className="text-xs font-bold tracking-wide text-[#ffd617] uppercase">In the report</p>
          <ul className="mt-3 space-y-2">
            {[
              "Every AI system you run, classified by real risk category",
              "Your exact Article 50 duties, per touchpoint",
              "The disclosure wording and where it must appear",
              "The evidence you must be able to produce",
              "A prioritised action list with deadlines",
              "A named specialist's assessment you can reply to",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#ffd617]" />
                <span className="leading-relaxed text-white/80">{f}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-white/50">
            Prefer to start free? The{" "}
            <button
              onClick={() => navigate(CONVERT.scanner)}
              className="font-semibold text-white/80 underline"
            >
              site scanner
            </button>{" "}
            and the self-install disclosure layer are free forever, with or without a report.
          </p>
        </div>
      </div>
    </div>
  );
}
