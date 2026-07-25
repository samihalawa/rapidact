import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Zap, ShieldCheck, MessagesSquare, Lock, Send, Sparkles, ChartColumn, BadgeCheck } from "lucide-react";
import { openConversion } from "@/config";
import { daysLeft } from "@/components/Countdown";

const pills = [
  { icon: Zap, label: "Fast setup" },
  { icon: ShieldCheck, label: "Build trust" },
  { icon: MessagesSquare, label: "Works with any chatbot" },
];

function BrowserMockup() {
  return (
    <div className="shadow-float relative w-full max-w-[560px] rounded-2xl border border-white/60 bg-white/90 backdrop-blur">
      {/* browser chrome */}
      <div className="flex items-center gap-3 border-b border-[#eef0f6] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto flex items-center gap-1.5 rounded-md bg-[#f1f2f8] px-3 py-1 text-[11px] font-medium text-[#5a6378]">
          <Lock className="h-3 w-3" />
          rapidact.eu
        </div>
        <span className="w-10" />
      </div>

      {/* page body */}
      <div className="relative px-6 pt-5 pb-6 sm:px-8">
        {/* mini nav */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#141b2e]" />
            <span className="text-[13px] font-bold text-[#141b2e]">YourSite</span>
          </div>
          <div className="hidden gap-4 text-[11px] font-medium text-[#8a92a6] sm:flex">
            <span>Product</span>
            <span>Solutions</span>
            <span>Resources</span>
            <span>Pricing</span>
          </div>
          <span className="rounded-full bg-[#141b2e] px-3 py-1 text-[10px] font-semibold text-white">Get started</span>
        </div>

        {/* mini hero */}
        <div className="mt-5 max-w-[240px]">
          <span className="rounded-full bg-[#ede9fe] px-2 py-0.5 text-[10px] font-semibold text-[#6d28d9]">New</span>
          <h3 className="mt-2 text-[22px] leading-tight font-extrabold tracking-tight text-[#141b2e]">
            AI that works <span className="brand-gradient-text">with you</span>
          </h3>
          <p className="mt-2 text-[11px] leading-relaxed text-[#8a92a6]">
            Get instant answers, automate tasks, and unlock insights across your business.
          </p>
        </div>

        {/* mini feature row */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { icon: Sparkles, t: "Smart automation" },
            { icon: ChartColumn, t: "Better insights" },
            { icon: BadgeCheck, t: "Enterprise ready" },
          ].map((f) => (
            <div key={f.t} className="rounded-lg border border-[#eef0f6] bg-white p-2">
              <f.icon className="h-3.5 w-3.5 text-[#6d5df6]" />
              <p className="mt-1 text-[9px] leading-tight font-semibold text-[#141b2e]">{f.t}</p>
            </div>
          ))}
        </div>

        {/* chat widget card */}
        <div className="absolute top-16 right-4 hidden w-[220px] overflow-hidden rounded-xl border border-[#e7e9f2] bg-white shadow-xl sm:block">
          <div className="flex items-center gap-2 bg-[#6d5df6] px-3 py-2">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/25 text-[8px] font-bold text-white">
              ✦
            </span>
            <span className="text-[11px] font-semibold text-white">Support Copilot</span>
          </div>
          <div className="space-y-2 p-3">
            <div className="max-w-[85%] rounded-lg rounded-tl-none bg-[#f1f2f8] px-2.5 py-1.5 text-[10px] leading-snug text-[#3d445c]">
              Hi there! How can I help you today?
            </div>
            <div className="ml-auto max-w-[85%] rounded-lg rounded-tr-none bg-[#6d5df6] px-2.5 py-1.5 text-[10px] leading-snug text-white">
              What integrations do you support?
            </div>
            <div className="flex items-center gap-1 rounded-full border border-[#e7e9f2] px-2 py-1">
              <span className="flex-1 text-[9px] text-[#b0b6c8]">Ask a follow-up…</span>
              <Send className="h-2.5 w-2.5 text-[#6d5df6]" />
            </div>
          </div>
        </div>

        {/* RapidAct disclosure badge + bubble (like the reference) */}
        <div className="mt-6 flex items-center justify-end gap-2.5">
          <div className="flex items-center gap-2 rounded-full border border-[#e7e9f2] bg-white px-3 py-1.5 shadow-md">
            <ShieldCheck className="h-3.5 w-3.5 text-[#6d5df6]" />
            <div className="leading-none">
              <p className="text-[10px] font-bold text-[#141b2e]">AI Transparency</p>
              <p className="text-[8px] font-medium text-[#8a92a6]">
                by <span className="font-bold text-[#6d5df6]">RapidAct</span>
              </p>
            </div>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6d5df6] shadow-lg">
            <MessagesSquare className="h-4 w-4 text-white" />
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
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-20 pb-24 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-8 lg:pt-28">
        {/* left */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e7e9f2] bg-white/80 px-3 py-1 text-xs font-semibold text-[#5a6378] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#dc2626]" />
            EU AI Act Article 50 · {daysLeft() === 0 ? "in force now" : `live in ${daysLeft()} days`} · fines up to €15M
          </span>
          <h1 className="mt-5 text-[44px] leading-[1.05] font-extrabold tracking-tight text-[#141b2e] sm:text-[56px]">
            Install AI
            <br />
            transparency
            <br />
            in minutes
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-[#5a6378]">
            The EU AI Act says every site using AI must disclose it. Scan free, get your free
            implementation plan, then install it yourself for €0 — or the full pack for €59, or
            done for you for €99.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              className="rounded-full bg-[#141b2e] px-7 font-semibold text-white hover:bg-[#232c4a]"
              onClick={() => navigate("/scanner")}
            >
              Scan your site free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-[#d8dce8] bg-white/80 px-7 font-semibold text-[#141b2e]"
              onClick={() => openConversion("dfy", navigate)}
            >
              We install it — €99
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
          <BrowserMockup />
        </div>
      </div>
    </section>
  );
}
