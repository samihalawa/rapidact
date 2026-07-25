import { useState, useLayoutEffect } from "react";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/providers/trpc";
import { REPORT, bunqPayUrl, CONVERT } from "@/config";
import { REPORT_DELIVERABLES } from "@/data/report";
import {
  ShieldCheck,
  Loader2,
  Mail,
  FileText,
  Clock,
  Building2,
  Lock,
  ArrowLeft,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";

const SIZES = ["1–10", "11–50", "51–250", "251–1000", "1000+"];

const SECTORS = [
  "E-commerce / retail",
  "SaaS / software",
  "Healthcare",
  "Finance / insurance",
  "Legal / professional services",
  "Education",
  "Travel / hospitality",
  "Manufacturing / industry",
  "Public sector",
  "Other",
];

const AI_SYSTEMS = [
  "Customer-facing chatbot",
  "AI-generated text / copy",
  "AI-generated images or video",
  "Voice AI / phone agents",
  "Recommendation or ranking engine",
  "AI in hiring or HR",
  "AI scoring or profiling of people",
  "Internal AI tools only",
  "Not sure — that's what I need assessed",
];

export default function Report() {
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [size, setSize] = useState("");
  const [sector, setSector] = useState("");
  const [systems, setSystems] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [ref, setRef] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const request = trpc.report.request.useMutation({
    onSuccess: (r) => setRef(r.ref),
  });

  // The payment step is much shorter than the intake form, so keeping the old scroll
  // position would drop the buyer onto blank space below the content. Jump to the top
  // after the DOM has committed — instantly, since a smooth scroll gets cancelled by
  // the page shrinking underneath it.
  useLayoutEffect(() => {
    if (ref) window.scrollTo(0, 0);
  }, [ref]);

  const valid = company.trim().length > 1 && email.includes("@") && email.includes(".");

  const toggle = (s: string) =>
    setSystems((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  const submit = () => {
    if (!valid || request.isPending) return;
    request.mutate({
      company: company.trim(),
      website: website.trim() || undefined,
      email: email.trim(),
      country: country.trim() || undefined,
      companySize: size || undefined,
      sector: sector || undefined,
      aiSystems: systems.length ? systems : undefined,
      notes: notes.trim() || undefined,
    });
  };

  const copyRef = () => {
    if (!ref) return;
    void navigator.clipboard.writeText(ref);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mesh-bg min-h-screen">
      <Seo
        title={`${REPORT.name} — €99 | RapidAct`}
        description={`Tell us about your company and AI systems. Your complete EU AI Act pre-consultory report and professional contact assessment arrive in your inbox within ${REPORT.delivery}. Flat €99, one-time.`}
      />
      <SiteNav />

      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        {ref ? (
          /* ─── Step 2: payment ─────────────────────────────────────── */
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-[#e7e9f2] bg-white p-8 shadow-sm sm:p-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#ecfdf5] px-3 py-1 text-xs font-bold text-[#047857]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Details received
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#141b2e]">
                One step left — pay €99 to start your report
              </h1>
              <p className="mt-3 text-[15px] leading-relaxed text-[#5a6378]">
                We have {company.trim()}'s details. Your assessment begins the moment the payment
                lands, and your report reaches <strong>{email.trim()}</strong> within{" "}
                {REPORT.delivery}.
              </p>

              <div className="mt-6 rounded-xl border border-[#e7e9f2] bg-[#f8f9fc] p-5">
                <p className="text-xs font-semibold tracking-wide text-[#8a92a6] uppercase">
                  Your reference
                </p>
                <div className="mt-1.5 flex items-center gap-3">
                  <code className="text-2xl font-extrabold tracking-[0.2em] text-[#141b2e]">
                    {ref}
                  </code>
                  <button
                    onClick={copyRef}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#e7e9f2] bg-white px-2.5 py-1 text-xs font-semibold text-[#5a6378] transition hover:border-[#6d5df6] hover:text-[#141b2e]"
                  >
                    {copied ? <Check className="h-3 w-3 text-[#0e9f6e]" /> : <Copy className="h-3 w-3" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#5a6378]">
                  This code is already filled into the payment description, so your payment is
                  matched to your details automatically. Keep it for your records.
                </p>
              </div>

              <a href={bunqPayUrl(ref)} target="_blank" rel="noopener" className="mt-6 block">
                <Button className="h-14 w-full rounded-full bg-[#141b2e] text-base font-bold text-white hover:bg-[#232c4a]">
                  Pay €99 securely with bunq
                </Button>
              </a>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-[#8a92a6]">
                <Lock className="h-3 w-3" />
                Payment is handled entirely by bunq. Card and bank details never touch RapidAct.
              </p>

              <div className="mt-8 border-t border-[#eef0f6] pt-6">
                <p className="text-sm font-bold text-[#141b2e]">What happens next</p>
                <ol className="mt-3 space-y-3">
                  {[
                    ["Payment confirmed", "You get an email receipt with a VAT invoice, quoting your reference."],
                    [
                      "We assess your case",
                      "A specialist reviews your systems, your sector and your site against the current AI Act text and guidance.",
                    ],
                    [
                      `Report delivered within ${REPORT.delivery}`,
                      "The full written report plus a professional contact assessment arrive in your inbox. You can reply to it and reach a human.",
                    ],
                  ].map(([t, s], i) => (
                    <li key={t} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#141b2e] text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#141b2e]">{t}</p>
                        <p className="mt-0.5 text-sm leading-relaxed text-[#5a6378]">{s}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <p className="mt-6 rounded-xl bg-[#f8f9fc] p-4 text-xs leading-relaxed text-[#5a6378]">
                <strong className="text-[#141b2e]">If it does not arrive, you do not pay.</strong>{" "}
                No report in your inbox within {REPORT.delivery}? Reply to your receipt and we refund
                you in full, no questions asked.
              </p>

              <button
                onClick={() => setRef(null)}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#8a92a6] transition hover:text-[#141b2e]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Change my details
              </button>
            </div>
          </div>
        ) : (
          /* ─── Step 1: intake ──────────────────────────────────────── */
          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            {/* form */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#e7e9f2] bg-white/80 px-3 py-1 text-xs font-semibold text-[#5a6378] shadow-sm">
                <FileText className="h-3.5 w-3.5 text-[#6d5df6]" />
                {REPORT.name} · €99 one-time
              </span>
              <h1 className="mt-4 text-[34px] leading-[1.1] font-extrabold tracking-tight text-[#141b2e] sm:text-[42px]">
                Tell us about your company.
                <br />
                We tell you exactly where you stand.
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#5a6378]">
                Two minutes of details. A specialist assesses your actual AI systems against the EU
                AI Act, and your complete report plus a professional contact assessment reach your
                inbox within {REPORT.delivery}.
              </p>

              <div className="mt-8 space-y-5 rounded-2xl border border-[#e7e9f2] bg-white p-6 shadow-sm sm:p-7">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-semibold text-[#141b2e]">
                      Company name <span className="text-[#dc2626]">*</span>
                    </label>
                    <Input
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme B.V."
                      className="mt-1.5 h-11 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-[#141b2e]">
                      Work email <span className="text-[#dc2626]">*</span>
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="mt-1.5 h-11 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-[#141b2e]">Website</label>
                    <Input
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://company.com"
                      className="mt-1.5 h-11 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-[#141b2e]">
                      Country of operation
                    </label>
                    <Input
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      placeholder="Spain, Germany, UK…"
                      className="mt-1.5 h-11 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#141b2e]">Company size</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {SIZES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSize(s === size ? "" : s)}
                        className={
                          size === s
                            ? "rounded-full bg-[#141b2e] px-4 py-1.5 text-sm font-semibold text-white"
                            : "rounded-full border border-[#e7e9f2] px-4 py-1.5 text-sm font-medium text-[#3d445c] transition hover:border-[#6d5df6]"
                        }
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-[#8a92a6]">
                    The obligations trigger on what your AI does, not on how big you are — the report
                    is scoped either way.
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#141b2e]">Sector</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {SECTORS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSector(s === sector ? "" : s)}
                        className={
                          sector === s
                            ? "rounded-full bg-[#141b2e] px-3.5 py-1.5 text-sm font-semibold text-white"
                            : "rounded-full border border-[#e7e9f2] px-3.5 py-1.5 text-sm font-medium text-[#3d445c] transition hover:border-[#6d5df6]"
                        }
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#141b2e]">
                    Which AI do you use? Select all that apply.
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {AI_SYSTEMS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggle(s)}
                        className={
                          systems.includes(s)
                            ? "inline-flex items-center gap-1.5 rounded-full bg-[#6d5df6] px-3.5 py-1.5 text-sm font-semibold text-white"
                            : "rounded-full border border-[#e7e9f2] px-3.5 py-1.5 text-sm font-medium text-[#3d445c] transition hover:border-[#6d5df6]"
                        }
                      >
                        {systems.includes(s) && <Check className="h-3 w-3" />}
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-[#141b2e]">
                    Anything specific you want assessed?
                  </label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. we use an AI voice agent for bookings and are unsure whether it counts, our legal team asked about the August 2026 deadline, a client is asking us for documentation…"
                    className="mt-1.5 min-h-24 rounded-xl"
                  />
                </div>

                {request.isError && (
                  <p className="rounded-lg bg-[#fef2f2] px-4 py-3 text-sm text-[#991b1b]">
                    Something went wrong sending your details. Please try again, or email us and
                    we'll take it from there.
                  </p>
                )}

                <Button
                  onClick={submit}
                  disabled={!valid || request.isPending}
                  className="h-14 w-full rounded-full bg-[#141b2e] text-base font-bold text-white hover:bg-[#232c4a]"
                >
                  {request.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    "Continue to payment — €99"
                  )}
                </Button>
                <p className="text-center text-xs text-[#8a92a6]">
                  You review everything before paying. Nothing is charged on this screen.
                </p>
              </div>
            </div>

            {/* trust panel */}
            <aside className="lg:pt-24">
              <div className="sticky top-24 space-y-4">
                <div className="rounded-2xl border border-[#141b2e] bg-[#141b2e] p-7 text-white shadow-xl">
                  <p className="text-xs font-bold tracking-wide text-[#ffd617] uppercase">
                    What lands in your inbox
                  </p>
                  <p className="mt-2 text-2xl font-extrabold tracking-tight">{REPORT.name}</p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold">€99</span>
                    <span className="text-sm text-white/60">one-time · per company</span>
                  </div>
                  <ul className="mt-5 space-y-3">
                    {REPORT_DELIVERABLES.map((d) => (
                      <li key={d} className="flex items-start gap-2.5 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#ffd617]" />
                        <span className="leading-relaxed text-white/85">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {[
                    [Clock, `Delivered in ${REPORT.delivery}`, "Or your money back in full, no questions."],
                    [Mail, "A human replies", "The report comes from a person you can write back to."],
                    [Building2, "Any company size", "Sole trader to enterprise — scoped to what you actually run."],
                    [ShieldCheck, "One-time payment", "Never a subscription. VAT invoice included."],
                  ].map(([Icon, t, s]) => {
                    const I = Icon as typeof Clock;
                    return (
                      <div
                        key={t as string}
                        className="flex items-start gap-3 rounded-xl border border-[#e7e9f2] bg-white/85 p-4 backdrop-blur"
                      >
                        <I className="mt-0.5 h-4 w-4 shrink-0 text-[#0e9f6e]" />
                        <div>
                          <p className="text-sm font-bold text-[#141b2e]">{t as string}</p>
                          <p className="mt-0.5 text-xs leading-relaxed text-[#5a6378]">
                            {s as string}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="px-1 text-xs leading-relaxed text-[#8a92a6]">
                  RapidAct produces technical and organisational compliance assessments. It is not a
                  law firm and the report is not legal advice — where your case needs a legal
                  opinion, the report says so and tells you what to bring to counsel. Prefer to talk
                  first?{" "}
                  <a
                    href={CONVERT.calBooking}
                    target="_blank"
                    rel="noopener"
                    className="font-medium text-[#6d5df6] underline"
                  >
                    Book a call
                  </a>
                  .
                </p>
              </div>
            </aside>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
