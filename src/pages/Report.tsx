import { useState, useLayoutEffect } from "react";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/providers/trpc";
import { REPORT, bunqPayUrl, CONVERT } from "@/config";
import {
  ENTITY,
  COMPANIES_HOUSE_URL,
  HAS_ENTITY_DETAILS,
} from "@/data/company";
import { Loader2, ArrowLeft, Copy, Check, ChevronDown } from "lucide-react";
import { track } from "@/lib/analytics";
import { useI18n } from "@/lib/i18n";
import { REPORT_COPY } from "@/data/localizedReport";
import { HOME_COPY } from "@/data/localizedHome";

const SIZES = ["1–10", "11–50", "51–250", "251–1000", "1000+"];

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
  const { lang, path } = useI18n();
  const copy = REPORT_COPY[lang];
  const homeCopy = HOME_COPY[lang];
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
    onSuccess: r => {
      setRef(r.ref);
      track("report_submitted", {
        company_size: size || "not_provided",
        sector: sector || "not_provided",
        ai_system_count: systems.length,
      });
    },
    onError: error =>
      track("report_submission_failed", {
        error_type: error.data?.code || "unknown",
      }),
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
    track("report_intake_submit", {
      has_website: Boolean(website.trim()),
      has_country: Boolean(country.trim()),
      ai_system_count: systems.length,
    });
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
      <Seo title={copy.seoTitle} description={copy.seoDescription} />
      <SiteNav />

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {ref ? (
          /* ─── Step 2: payment ──────────────────────────────────────── */
          <div className="mx-auto max-w-2xl">
            <p className="eyebrow">{copy.step2}</p>
            <h1 className="ink mt-3 text-[30px] leading-tight font-bold tracking-[-0.015em]">
              {copy.recordedTitle}
            </h1>
            <p className="ink-soft mt-3 text-[16px] leading-relaxed">
              {copy.recordedBody}{" "}
              <span className="ink font-semibold">{email.trim()}</span>
            </p>

            <div className="hairline mt-8 border bg-white">
              <div className="hairline border-b px-6 py-5">
                <p className="eyebrow">{copy.reference}</p>
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
                    {copied ? copy.copied : copy.copy}
                  </button>
                </div>
                <p className="ink-soft mt-2 text-[13px] leading-relaxed">
                  {copy.referenceHelp}
                </p>
              </div>

              <div className="px-6 py-6">
                <a
                  href={bunqPayUrl(ref)}
                  target="_blank"
                  rel="noopener"
                  className="block"
                  data-analytics-event="payment_initiated"
                  data-analytics-label="bunq report payment"
                >
                  <Button className="h-12 w-full rounded bg-[#16181d] text-[15px] font-semibold text-white hover:bg-[#2b2f38]">
                    {copy.pay}
                  </Button>
                </a>
                <p className="ink-soft mt-3 text-center text-[12px] leading-relaxed">
                  {copy.paymentPrivacy}
                </p>
              </div>

              {/* Who receives the money. This is the question every buyer asks here. */}
              {HAS_ENTITY_DETAILS && (
                <dl className="hairline grid gap-4 border-t bg-[#f7f7f5] px-6 py-5 sm:grid-cols-2">
                  <div>
                    <dt className="eyebrow">{copy.paidTo}</dt>
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
                    <dt className="eyebrow">{copy.registeredOffice}</dt>
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
              <p className="eyebrow">{copy.next}</p>
              <ol className="mt-4 space-y-4">
                {copy.nextSteps.map(([t, s], i) => (
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
                {copy.refundTitle}
              </p>
              <p className="ink-soft mt-1 text-[14px] leading-relaxed">
                {copy.refundBody}
              </p>
            </div>

            <button
              onClick={() => setRef(null)}
              className="ink-soft mt-8 inline-flex items-center gap-1.5 text-[14px] hover:text-[#16181d]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {copy.change}
            </button>
          </div>
        ) : (
          /* ─── Step 1: intake ───────────────────────────────────────── */
          <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div>
              <p className="eyebrow">{copy.step1}</p>
              <h1 className="ink mt-3 text-[32px] leading-[1.12] font-bold tracking-[-0.02em] sm:text-[38px]">
                {copy.intakeTitle}
              </h1>
              <p className="ink-soft mt-4 max-w-xl text-[16px] leading-relaxed">
                {copy.intakeBody}
              </p>

              <div className="hairline mt-8 space-y-5 border bg-white p-5 sm:p-7">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="ink block text-[13px] font-semibold">
                      {copy.company} <span className="text-[#b91c1c]">*</span>
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
                      {copy.email} <span className="text-[#b91c1c]">*</span>
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
                  <div className="sm:col-span-2">
                    <label className="ink block text-[13px] font-semibold">
                      {copy.website}
                    </label>
                    <Input
                      value={website}
                      onChange={e => setWebsite(e.target.value)}
                      placeholder="https://company.com"
                      className="hairline mt-1.5 h-11 rounded border"
                      autoComplete="url"
                    />
                  </div>
                </div>

                <div className="hairline border-t pt-5">
                  <label className="ink block text-[13px] font-semibold">
                    {copy.systems}
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {copy.systemsList.map(option => (
                      <Chip
                        key={option.value}
                        active={systems.includes(option.value)}
                        onClick={() => toggle(option.value)}
                      >
                        {option.label}
                      </Chip>
                    ))}
                  </div>
                </div>

                <details className="group hairline border-t pt-1">
                  <summary className="ink flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 text-[14px] font-semibold focus-visible:ring-2 focus-visible:ring-[#1f3a5f]/25 focus-visible:outline-none">
                    <span>
                      {copy.optionalContext}
                      <span className="ink-soft mt-0.5 block text-[12px] font-normal">
                        {copy.optionalContextHint}
                      </span>
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180"
                    />
                  </summary>

                  <div className="hairline grid gap-5 border-t bg-[#f7f7f5] p-4 sm:grid-cols-2 sm:p-5">
                    <div>
                      <label className="ink block text-[13px] font-semibold">
                        {copy.countries}
                      </label>
                      <Input
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        placeholder={copy.countriesPlaceholder}
                        className="hairline mt-1.5 h-11 rounded border bg-white"
                        autoComplete="country-name"
                      />
                    </div>

                    <div>
                      <label className="ink block text-[13px] font-semibold">
                        {copy.size}
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
                    </div>

                    <div className="sm:col-span-2">
                      <label className="ink block text-[13px] font-semibold">
                        {copy.sector}
                      </label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {copy.sectors.map(option => (
                          <Chip
                            key={option.value}
                            active={sector === option.value}
                            onClick={() =>
                              setSector(
                                option.value === sector ? "" : option.value
                              )
                            }
                          >
                            {option.label}
                          </Chip>
                        ))}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="ink block text-[13px] font-semibold">
                        {copy.notes}
                      </label>
                      <Textarea
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                        placeholder={copy.notesPlaceholder}
                        className="hairline mt-1.5 min-h-24 rounded border bg-white text-[14px]"
                      />
                    </div>
                  </div>
                </details>

                {request.isError && (
                  <p className="border-l-2 border-l-[#b91c1c] bg-[#fef4f4] px-4 py-3 text-[14px] text-[#991b1b]">
                    {copy.sendError}
                  </p>
                )}

                <Button
                  onClick={submit}
                  disabled={!valid || request.isPending}
                  className="h-12 w-full rounded bg-[#16181d] text-[15px] font-semibold text-white hover:bg-[#2b2f38]"
                >
                  {request.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {copy.continuing}
                    </>
                  ) : (
                    copy.continue
                  )}
                </Button>
                <p className="ink-soft text-center text-[12px]">
                  {copy.noCharge}
                </p>
              </div>
            </div>

            {/* Sidebar: what is bought, and from whom */}
            <aside className="lg:pt-12">
              <div className="sticky top-24 space-y-6">
                <div className="hairline border bg-white">
                  <div className="hairline border-b px-6 py-5">
                    <p className="eyebrow">{copy.buying}</p>
                    <p className="ink mt-2 text-[17px] leading-snug font-semibold">
                      {REPORT.name}
                    </p>
                    <p className="ink mt-3 text-[32px] leading-none font-bold">
                      €99
                    </p>
                    <p className="ink-soft mt-1 text-[12px]">
                      {copy.chargedOnce}
                    </p>
                    <a
                      href={path(CONVERT.example)}
                      className="accent mt-2 inline-block text-[12px] font-semibold underline underline-offset-2"
                    >
                      {copy.specimen}
                    </a>
                  </div>
                  <ul className="grid grid-cols-2 gap-x-5 gap-y-3 px-6 py-5">
                    {homeCopy.chapters.map(d => (
                      <li
                        key={d.n}
                        className="ink flex gap-2 text-[13px] leading-snug"
                      >
                        <span className="mono ink-soft shrink-0 text-[10px]">
                          {d.n}
                        </span>
                        <span className="font-semibold">{d.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {HAS_ENTITY_DETAILS && (
                  <div className="hairline border bg-[#f7f7f5] px-6 py-5">
                    <p className="eyebrow">{copy.soldBy}</p>
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
                      {copy.verifyCompany} · {ENTITY.registrationNumber}
                    </a>
                    <p className="ink-soft mt-3 text-[12px] leading-relaxed">
                      {copy.deliveryPromise} {copy.questionsBefore}{" "}
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
                  {copy.technicalNotice}{" "}
                  <a
                    href={CONVERT.calBooking}
                    target="_blank"
                    rel="noopener"
                    className="accent underline underline-offset-2"
                  >
                    {copy.bookCall}
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
