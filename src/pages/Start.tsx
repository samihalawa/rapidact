import { useState } from "react";
import { useSearchParams } from "react-router";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/providers/trpc";
import { CONVERT } from "@/config";
import { CheckCircle2, Loader2, PartyPopper } from "lucide-react";

const PLATFORMS = ["WordPress", "Wix", "Shopify", "Custom / other"];

/**
 * Post-purchase / post-booking intake — where payment links and the
 * Cal.com booking redirect to. Captures the site we need to work on.
 */
export default function Start() {
  const [params] = useSearchParams();
  const plan = params.get("plan") === "dfy" ? "dfy" : "pack";
  const [siteUrl, setSiteUrl] = useState("");
  const [platform, setPlatform] = useState(PLATFORMS[0]);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const lead = trpc.leads.capture.useMutation({ onSuccess: () => setDone(true) });

  const submit = () => {
    if (!siteUrl.trim() || !email.includes("@")) return;
    lead.mutate({
      email: email.trim(),
      url: `${siteUrl.trim()} | platform: ${platform} | plan: ${plan}`,
      source: plan === "dfy" ? "dfy-intake" : "pack-intake",
    });
  };

  return (
    <div className="mesh-bg min-h-screen">
      <Seo
        title="Let's get you compliant — intake | RapidAct"
        description="Tell us your site and stack. We deliver your Compliance Pack within 24h or schedule your Done-For-You install."
      />
      <SiteNav />
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        {done ? (
          <div className="rounded-2xl border border-[#e7e9f2] bg-white p-10 text-center shadow-sm">
            <PartyPopper className="mx-auto h-10 w-10 text-[#6d5df6]" />
            <h1 className="mt-4 text-2xl font-extrabold text-[#141b2e]">You're in the queue</h1>
            <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-[#5a6378]">
              {plan === "dfy"
                ? "We'll review your site and confirm your install slot by email within one business day. The install itself takes under 48 hours from confirmation — guaranteed."
                : "Your Compliance Pack, configured for your stack, lands in your inbox within 24 hours — including the evidence log setup and label templates."}
            </p>
            <p className="mt-5 text-xs text-[#8a92a6]">
              Anything urgent? Reply to your confirmation email or book a slot at{" "}
              <a href={CONVERT.calBooking} target="_blank" rel="noopener" className="text-[#6d5df6] underline">
                cal.com/oulang/aiact
              </a>
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#141b2e] sm:text-4xl">
              {plan === "dfy" ? "Let's schedule your install" : "Let's configure your pack"}
            </h1>
            <p className="mt-4 text-lg text-[#5a6378]">
              {plan === "dfy"
                ? "Tell us where to work. We install everything on your website and verify it live — within 48 hours of confirmation."
                : "Tell us your site and stack. Your configured Compliance Pack arrives within 24 hours."}
            </p>

            <div className="mt-8 space-y-4 rounded-2xl border border-[#e7e9f2] bg-white p-7 shadow-sm">
              <div>
                <label className="text-sm font-semibold text-[#141b2e]">Your website</label>
                <Input
                  value={siteUrl}
                  onChange={(e) => setSiteUrl(e.target.value)}
                  placeholder="https://your-site.com"
                  className="mt-1.5 h-11 rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#141b2e]">Platform</label>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {PLATFORMS.map((p) => (
                    <button
                      key={p}
                      onClick={() => setPlatform(p)}
                      className={
                        platform === p
                          ? "rounded-full bg-[#141b2e] px-4 py-1.5 text-sm font-semibold text-white"
                          : "rounded-full border border-[#e7e9f2] px-4 py-1.5 text-sm font-medium text-[#3d445c] hover:border-[#6d5df6]"
                      }
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-[#141b2e]">Work email</label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="mt-1.5 h-11 rounded-xl"
                />
              </div>
              <Button
                onClick={submit}
                disabled={lead.isPending || !siteUrl.trim() || !email.includes("@")}
                className="h-12 w-full rounded-full bg-[#141b2e] font-bold text-white hover:bg-[#232c4a]"
              >
                {lead.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : plan === "dfy" ? (
                  "Confirm my install — €99"
                ) : (
                  "Configure my pack — €59"
                )}
              </Button>
              <p className="flex items-start gap-2 text-xs leading-relaxed text-[#8a92a6]">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0e9f6e]" />
                {plan === "dfy"
                  ? "48-hour install or full refund. Booking confirmation goes to your email."
                  : "Delivered within 24 hours. Everything in the pack is yours to keep."}
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["1", "You tell us the site", "URL + stack — 30 seconds"],
                ["2", plan === "dfy" ? "We install it all" : "We configure everything", plan === "dfy" ? "On your stack, verified live" : "Pack tailored to your platform"],
                ["3", "You're covered", "Disclosure live + evidence log running"],
              ].map(([n, t, s]) => (
                <div key={n} className="rounded-xl border border-[#e7e9f2] bg-white/70 p-4">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#141b2e] text-xs font-bold text-white">{n}</span>
                  <p className="mt-2 text-sm font-bold text-[#141b2e]">{t}</p>
                  <p className="mt-0.5 text-xs text-[#5a6378]">{s}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
