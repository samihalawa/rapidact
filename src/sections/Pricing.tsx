import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useNavigate } from "react-router";

const tiers = [
  {
    name: "Scanner",
    price: "Free",
    period: "forever",
    tagline: "Know where you stand",
    features: [
      "Unlimited URL scans",
      "52-signature AI detection",
      "Readiness score + evidence",
      "Copyable scan report",
      "Chrome extension",
    ],
    cta: "Scan your site",
    featured: false,
  },
  {
    name: "Pro",
    price: "€19",
    period: "/month per site",
    tagline: "Disclose + prove it",
    features: [
      "Everything in Scanner",
      "WordPress plugin + JS snippet",
      "EN/ES visitor disclosure badge",
      "Timestamped evidence log",
      "Evidence CSV export",
      "White-label badge",
    ],
    cta: "Start with Pro",
    featured: true,
  },
  {
    name: "Agency",
    price: "€99",
    period: "/month · 25 sites",
    tagline: "Cover your whole client roster",
    features: [
      "Everything in Pro",
      "25 sites from one dashboard",
      "Per-site client reports",
      "Priority signature updates",
      "Reseller-friendly licensing",
    ],
    cta: "Talk to us",
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
            Less than one hour of legal advice
          </h2>
          <p className="mt-3 text-lg text-[#5a6378]">
            The scan is free forever. Pay only when you want the fix and the proof.
          </p>
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
              <CardFooter>
                <Button
                  className={
                    t.featured
                      ? "w-full rounded-full bg-white font-semibold text-[#141b2e] hover:bg-[#f1f2f8]"
                      : "w-full rounded-full bg-[#141b2e] font-semibold text-white hover:bg-[#232c4a]"
                  }
                  onClick={() => navigate("/scanner")}
                >
                  {t.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-[#8a92a6]">
          Prices exclude VAT. Cancel anytime. RapidAct is technical transparency tooling — not legal
          advice.
        </p>
      </div>
    </section>
  );
}
