import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ShieldCheck, CalendarClock } from "lucide-react";
import { useNavigate } from "react-router";
import { openConversion, type Tier } from "@/config";
import Countdown from "@/components/Countdown";

interface TierDef {
  name: string;
  tier: Tier;
  price: string;
  period: string;
  tagline: string;
  features: string[];
  cta: string;
  featured: boolean;
}

const tiers: TierDef[] = [
  {
    name: "Free — do it yourself",
    tier: "free",
    price: "€0",
    period: "forever",
    tagline: "Everything you need, you install it",
    features: [
      "Unlimited site scans",
      "Free implementation plan for your site",
      "Free plugin for WordPress, Wix & any stack",
      "Step-by-step guides per platform",
      "EN/ES disclosure texts, ready to paste",
      "EU-standard AI icons",
    ],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Compliance Pack",
    tier: "pack",
    price: "€59",
    period: "one-time · per site",
    tagline: "Everything needed, ready for your site",
    features: [
      "Everything in Free",
      "Disclosure layer configured for your stack",
      "Timestamped evidence log + CSV export",
      "Per-page AI label templates",
      "Chatbot notice presets (Tidio, Botpress, Zendesk…)",
      "12 months of rule updates",
      "Email support",
    ],
    cta: "Buy the pack — €59",
    featured: true,
  },
  {
    name: "Done For You",
    tier: "dfy",
    price: "€99",
    period: "one-time · per site",
    tagline: "We install everything on your website",
    features: [
      "Everything in the Pack",
      "We install it on your site — WordPress, Wix, Shopify, custom",
      "Disclosure verified live on your pages",
      "Evidence log running + tested",
      "Handover call + documentation",
      "You do literally nothing",
    ],
    cta: "Book your install — €99",
    featured: false,
  },
];

export default function Pricing() {
  const navigate = useNavigate();
  return (
    <section id="pricing" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold tracking-wide text-[#6d5df6] uppercase">Pricing</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#141b2e] sm:text-4xl">
            Start free. Pay only if you want it done.
          </h2>
          <p className="mt-3 text-lg text-[#5a6378]">
            Scan and plan are always free. Install it yourself for €0, get the full pack for €59, or
            have us install everything for €99. One-time — no subscriptions.
          </p>
          <Countdown className="mt-4" />
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {tiers.map((t) => (
            <Card
              key={t.name}
              className={
                t.featured
                  ? "relative border-[#141b2e] bg-[#141b2e] text-white shadow-xl"
                  : "border-[#e7e9f2] bg-white shadow-none"
              }
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#ffd617] px-3 py-1 text-[11px] font-extrabold tracking-wide text-[#141b2e] uppercase">
                  Most popular
                </span>
              )}
              <CardHeader>
                <CardTitle className={t.featured ? "text-white" : "text-[#141b2e]"}>{t.name}</CardTitle>
                <p className={`text-sm ${t.featured ? "text-white/60" : "text-[#8a92a6]"}`}>{t.tagline}</p>
                <div className="pt-3">
                  <span className="text-4xl font-extrabold tracking-tight">{t.price}</span>
                  <span className={`ml-1 text-sm ${t.featured ? "text-white/60" : "text-[#8a92a6]"}`}>
                    {t.period}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${t.featured ? "text-[#ffd617]" : "text-[#0e9f6e]"}`}
                      />
                      <span className={t.featured ? "text-white/85" : "text-[#3d445c]"}>{f}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button
                  className={
                    t.featured
                      ? "w-full rounded-full bg-white font-semibold text-[#141b2e] hover:bg-[#f1f2f8]"
                      : "w-full rounded-full bg-[#141b2e] font-semibold text-white hover:bg-[#232c4a]"
                  }
                  onClick={() => openConversion(t.tier, navigate)}
                >
                  {t.cta}
                </Button>
                {t.tier === "dfy" && (
                  <p className={`flex items-center gap-1.5 text-[11px] ${t.featured ? "text-white/50" : "text-[#8a92a6]"}`}>
                    <CalendarClock className="h-3 w-3" /> Book directly on Cal.com — pick your slot
                  </p>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* guarantee strip */}
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-[#e7e9f2] bg-[#f8f9fc] px-6 py-4">
          {[
            "48-hour install or full refund",
            "One-time payment — never a subscription",
            "VAT invoice included",
            "You keep everything, even free tier",
          ].map((g) => (
            <span key={g} className="flex items-center gap-2 text-xs font-semibold text-[#3d445c]">
              <ShieldCheck className="h-4 w-4 text-[#0e9f6e]" />
              {g}
            </span>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-[#8a92a6]">
          Prices exclude VAT. RapidAct is technical transparency tooling — not legal advice.
        </p>
      </div>
    </section>
  );
}
