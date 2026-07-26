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
  ENTITY,
  COMPANIES_HOUSE_URL,
  HAS_ENTITY_DETAILS,
  HAS_VAT,
  SPECIALIST,
  HAS_NAMED_SPECIALIST,
  ENTITY_DISPLAY_NAME,
} from "@/data/company";
import { Loader2, ArrowLeft, Copy, Check } from "lucide-react";

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
  "AI-generated text or copy",
  "AI-generated images or video",
  "Voice AI or phone agents",
  "Recommendation or ranking engine",
  "AI in hiring or HR",
  "AI scoring or profiling of people",
  "Internal AI tools only",
  "Not sure, that is what I need assessed",
];

/** Small square selectable chip. Square, not pill: this is a form, not a launch page. */
function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "min-h-11 rounded border border-[#16181d] bg-[#16181d] px-3 py-2 text-[13px] font-semibold text-white"
          : "hairline ink-soft min-h-11 rounded border bg-white px-3 py-2 text-[13px] transition hover:border-[#16181d] hover:text-[#16181d]"
      }
    >
      {children}
    </button>
  );
}

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
    onSuccess: r => setRef(r.ref),
  });

  // The payment step is much shorter than the intake form, so keeping the old scroll
  // position would drop the buyer onto blank space below the content. Jump to the top
  // after the DOM has committed, instantly, since a smooth scroll gets cancelled by
  // the page shrinking underneath it.
  useLayoutEffect(() => {
    if (ref) window.scrollTo(0, 0);
  }, [ref]);

  const valid =
    company.trim().length > 1 && email.includes("@") && email.includes(".");

  const toggle = (s: string) =>
    setSystems(cur =>
      cur.includes(s) ? cur.filter(x => x !== s) : [...cur, s]
    );

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
    <div className="paper min-h-screen">
      <Seo
        title={`${REPORT.name}, €99 | RapidAct`}
        description={`Tell us about your company and the AI you use. Your complete EU AI Act assessment reaches your inbox within ${REPORT.delivery}. €99, charged once, by ${ENTITY_DISPLAY_NAME}.`}
      />
      <SiteNav />

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {ref ? (
          /* ─── Step 2: payment ──────────────────────────────────────── */
          <div className="mx-auto max-w-2xl">
            <p className="eyebrow">Step 2 of 2</p>
            <h1 className="ink mt-3 text-[30px] leading-tight font-bold tracking-[-0.015em]">
              Your details are recorded. The fee is €99.
            </h1>
            <p className="ink-soft mt-3 text-[16px] leading-relaxed">
              {/* Many legal names end in a period ("B.V.", "Ltd."), so trim one before
                  adding our own rather than printing a doubled full stop. */}
              We hold the details for {company.trim().replace(/\.$/, "")}. Work
              begins when the payment arrives, and the assessment is sent to{" "}
              <span className="ink font-semibold">{email.trim()}</span> within{" "}
              {REPORT.delivery}.
            </p>

            <div className="hairline mt-8 border bg-white">
              <div className="hairline border-b px-6 py-5">
                <p className="eyebrow">Your reference</p>
                <div className="mt-2 flex items-center gap-3">
                  <span className="ink mono text-[26px] font-semibold tracking-[0.18em]">
                    {ref}
                  </span>
                  <button
                    onClick={copyRef}
                    className="hairline ink-soft inline-flex min-h-11 items-center gap-1.5 rounded border bg-white px-3 text-[12px] font-semibold transition hover:border-[#16181d] hover:text-[#16181d]"
                  >
                    {copied ? (
                      <Check className="h-3 w-3 text-[#15803d]" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <p className="ink-soft mt-2 text-[13px] leading-relaxed">
                  This code is already written into the payment description, so
                  your payment is matched to your submission without you doing
                  anything. Keep it for your records.
                </p>
              </div>

              <div className="px-6 py-6">
                <a
                  href={bunqPayUrl(ref)}
                  target="_blank"
                  rel="noopener"
                  className="block"
                >
                  <Button className="h-12 w-full rounded bg-[#16181d] text-[15px] font-semibold text-white hover:bg-[#2b2f38]">
                    Pay €99 with bunq
                  </Button>
                </a>
                <p className="ink-soft mt-3 text-center text-[12px] leading-relaxed">
                  Payment is processed by bunq. Card and bank details are never
                  seen by, or stored on, this website.
                </p>
              </div>

              {/* Who receives the money. This is the question every buyer asks here. */}
              {HAS_ENTITY_DETAILS && (
                <dl className="hairline grid gap-4 border-t bg-[#f7f7f5] px-6 py-5 sm:grid-cols-2">
                  <div>
                    <dt className="eyebrow">Paid to</dt>
                    <dd className="ink mt-1 text-[13px] font-semibold">
                      {ENTITY.legalName}
                    </dd>
                    <dd className="mt-0.5">
                      <a
                        href={COMPANIES_HOUSE_URL}
                        target="_blank"
                        rel="noopener"
                        className="accent mono text-[12px] underline underline-offset-2"
                      >
                        Companies House No. {ENTITY.registrationNumber}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Registered office</dt>
                    <dd className="ink-soft mt-1 text-[12px] leading-relaxed">
                      {ENTITY.address}, {ENTITY.country}
                    </dd>
                    <dd className="mt-0.5">
                      <a
                        href={`tel:${ENTITY.phone.replace(/\s/g, "")}`}
                        className="ink mono text-[12px] hover:underline"
                      >
                        {ENTITY.phone}
                      </a>
                    </dd>
                  </div>
                </dl>
              )}
            </div>

            <div className="hairline mt-8 border-t pt-6">
              <p className="eyebrow">What happens next</p>
              <ol className="mt-4 space-y-4">
                {[
                  [
                    "Payment received",
                    HAS_VAT
                      ? "You are sent a receipt and a VAT invoice quoting your reference."
                      : `You are sent a receipt and an invoice from ${ENTITY_DISPLAY_NAME}, quoting your reference.`,
                  ],
                  [
                    "Your case is assessed",
                    HAS_NAMED_SPECIALIST
                      ? `${SPECIALIST.name} reviews your systems, your sector and your website against the current text of the regulation and the guidance issued under it.`
                      : "A specialist reviews your systems, your sector and your website against the current text of the regulation and the guidance issued under it.",
                  ],
                  [
                    `The assessment is delivered within ${REPORT.delivery}`,
                    "It arrives as a written document from a monitored address. You can reply with follow-up questions about your own case at no additional cost.",
                  ],
                ].map(([t, s], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="mono ink-soft shrink-0 pt-0.5 text-[12px]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="ink text-[14px] font-semibold">{t}</p>
                      <p className="ink-soft mt-1 text-[14px] leading-relaxed">
                        {s}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="hairline mt-8 border-l-2 border-l-[#16181d] pl-4">
              <p className="ink text-[14px] font-semibold">
                If the assessment does not arrive, you do not pay for it.
              </p>
              <p className="ink-soft mt-1 text-[14px] leading-relaxed">
                Nothing in your inbox within {REPORT.delivery}? Reply to your
                receipt and the fee is refunded in full. You do not need to
                explain or ask twice.
              </p>
            </div>

            <button
              onClick={() => setRef(null)}
              className="ink-soft mt-8 inline-flex items-center gap-1.5 text-[14px] hover:text-[#16181d]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Change my details
            </button>
          </div>
        ) : (
          /* ─── Step 1: intake ───────────────────────────────────────── */
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div>
              <p className="eyebrow">Step 1 of 2</p>
              <h1 className="ink mt-3 text-[32px] leading-[1.12] font-bold tracking-[-0.02em] sm:text-[38px]">
                Tell us what your company runs
              </h1>
              <p className="ink-soft mt-4 max-w-xl text-[16px] leading-relaxed">
                This takes about two minutes. The more precisely you describe
                what you operate, the more specific the assessment can be. You
                review everything before any payment is taken.
              </p>

              <div className="hairline mt-8 space-y-6 border bg-white p-6 sm:p-7">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="ink block text-[13px] font-semibold">
                      Company name <span className="text-[#b91c1c]">*</span>
                    </label>
                    <Input
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                      placeholder="Acme B.V."
                      className="hairline mt-1.5 h-11 rounded border"
                      autoComplete="organization"
                      required
                    />
                  </div>
                  <div>
                    <label className="ink block text-[13px] font-semibold">
                      Work email <span className="text-[#b91c1c]">*</span>
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="hairline mt-1.5 h-11 rounded border"
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div>
                    <label className="ink block text-[13px] font-semibold">
                      Website
                    </label>
                    <Input
                      value={website}
                      onChange={e => setWebsite(e.target.value)}
                      placeholder="https://company.com"
                      className="hairline mt-1.5 h-11 rounded border"
                      autoComplete="url"
                    />
                  </div>
                  <div>
                    <label className="ink block text-[13px] font-semibold">
                      Countries you operate in
                    </label>
                    <Input
                      value={country}
                      onChange={e => setCountry(e.target.value)}
                      placeholder="Spain, Germany, UK"
                      className="hairline mt-1.5 h-11 rounded border"
                      autoComplete="country-name"
                    />
                  </div>
                </div>

                <div className="hairline border-t pt-5">
                  <label className="ink block text-[13px] font-semibold">
                    Company size
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {SIZES.map(s => (
                      <Chip
                        key={s}
                        active={size === s}
                        onClick={() => setSize(s === size ? "" : s)}
                      >
                        {s}
                      </Chip>
                    ))}
                  </div>
                  <p className="ink-soft mt-2 text-[12px] leading-relaxed">
                    Obligations trigger on what a system does, not on company
                    size. Size affects the penalty calculation, not whether the
                    duty applies.
                  </p>
                </div>

                <div className="hairline border-t pt-5">
                  <label className="ink block text-[13px] font-semibold">
                    Sector
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {SECTORS.map(s => (
                      <Chip
                        key={s}
                        active={sector === s}
                        onClick={() => setSector(s === sector ? "" : s)}
                      >
                        {s}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div className="hairline border-t pt-5">
                  <label className="ink block text-[13px] font-semibold">
                    Which AI does your company use? Select all that apply.
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {AI_SYSTEMS.map(s => (
                      <Chip
                        key={s}
                        active={systems.includes(s)}
                        onClick={() => toggle(s)}
                      >
                        {s}
                      </Chip>
                    ))}
                  </div>
                </div>

                <div className="hairline border-t pt-5">
                  <label className="ink block text-[13px] font-semibold">
                    Anything specific you want assessed
                  </label>
                  <Textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="For example: we run an AI voice agent for bookings and are unsure whether it is covered; our legal team has asked about the August 2026 date; an enterprise client is requesting documentation from us."
                    className="hairline mt-1.5 min-h-24 rounded border text-[14px]"
                  />
                </div>

                {request.isError && (
                  <p className="border-l-2 border-l-[#b91c1c] bg-[#fef4f4] px-4 py-3 text-[14px] text-[#991b1b]">
                    Your details could not be sent. Please try again. If it
                    keeps failing, contact us directly and we will take them by
                    email.
                  </p>
                )}

                <Button
                  onClick={submit}
                  disabled={!valid || request.isPending}
                  className="h-12 w-full rounded bg-[#16181d] text-[15px] font-semibold text-white hover:bg-[#2b2f38]"
                >
                  {request.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Continue to payment"
                  )}
                </Button>
                <p className="ink-soft text-center text-[12px]">
                  Nothing is charged on this screen. You see the fee and who you
                  are paying on the next step.
                </p>
              </div>
            </div>

            {/* Sidebar: what is bought, and from whom */}
            <aside className="lg:pt-12">
              <div className="sticky top-24 space-y-6">
                <div className="hairline border bg-white">
                  <div className="hairline border-b px-6 py-5">
                    <p className="eyebrow">You are buying</p>
                    <p className="ink mt-2 text-[17px] leading-snug font-semibold">
                      {REPORT.name}
                    </p>
                    <p className="ink mt-3 text-[32px] leading-none font-bold">
                      €99
                    </p>
                    <p className="ink-soft mt-1 text-[12px]">
                      Charged once, per company.
                    </p>
                    <a
                      href={CONVERT.example}
                      className="accent mt-2 inline-block text-[12px] font-semibold underline underline-offset-2"
                    >
                      See a full specimen of this document
                    </a>
                  </div>
                  <ul className="divide-y divide-[#e2e2dd]">
                    {REPORT_DELIVERABLES.map(d => (
                      <li
                        key={d}
                        className="ink-soft px-6 py-3 text-[13px] leading-relaxed"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                {HAS_ENTITY_DETAILS && (
                  <div className="hairline border bg-[#f7f7f5] px-6 py-5">
                    <p className="eyebrow">Sold by</p>
                    <p className="ink mt-1.5 text-[13px] font-semibold">
                      {ENTITY.legalName}
                    </p>
                    <p className="ink-soft mt-0.5 text-[12px] leading-relaxed">
                      {ENTITY.address}, {ENTITY.country}
                    </p>
                    <a
                      href={COMPANIES_HOUSE_URL}
                      target="_blank"
                      rel="noopener"
                      className="accent mono mt-1.5 inline-block text-[12px] underline underline-offset-2"
                    >
                      Verify No. {ENTITY.registrationNumber} on Companies House
                    </a>
                    <p className="ink-soft mt-3 text-[12px] leading-relaxed">
                      Delivered within {REPORT.delivery} or refunded in full.
                      Questions before you buy:{" "}
                      <a
                        href={`tel:${ENTITY.phone.replace(/\s/g, "")}`}
                        className="ink mono"
                      >
                        {ENTITY.phone}
                      </a>
                      .
                    </p>
                  </div>
                )}

                <p className="ink-soft text-[12px] leading-relaxed">
                  RapidAct produces technical and organisational compliance
                  assessments. It is not a law firm and the report is not legal
                  advice. Where your situation requires a legal opinion, the
                  report says so and sets out what to put in front of counsel.
                  Prefer to speak first?{" "}
                  <a
                    href={CONVERT.calBooking}
                    target="_blank"
                    rel="noopener"
                    className="accent underline underline-offset-2"
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
