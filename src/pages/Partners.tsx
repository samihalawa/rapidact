import { useMemo, useState, type FormEvent } from "react";
import { Link, useLocation } from "react-router";
import {
  ArrowRight,
  CalendarDays,
  Check,
  FileCheck2,
  Scale,
  Wrench,
} from "lucide-react";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CONVERT } from "@/config";
import { PARTNERS_COPY, type PartnerProfileId } from "@/data/localizedPartners";
import { ANALYTICS_EVENTS, track } from "@/lib/analytics";
import { useI18n } from "@/lib/i18n";
import { trpc } from "@/providers/trpc";
import { isValidEmail } from "@contracts/types";

const PROFILE_ICONS = {
  legal: Scale,
  audit: FileCheck2,
  delivery: Wrench,
} satisfies Record<PartnerProfileId, typeof Scale>;

function isProfile(value: string | null): value is PartnerProfileId {
  return value === "legal" || value === "audit" || value === "delivery";
}

export default function Partners() {
  const { search } = useLocation();
  const { lang, path } = useI18n();
  const copy = PARTNERS_COPY[lang];
  const initialProfile = useMemo(() => {
    const value = new URLSearchParams(search).get("type");
    return isProfile(value) ? value : "legal";
  }, [search]);
  const [profile, setProfile] = useState<PartnerProfileId>(initialProfile);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const captureLead = trpc.leads.capture.useMutation();
  const selectedProfile =
    copy.profiles.find(item => item.id === profile) ?? copy.profiles[0];

  const selectProfile = (next: PartnerProfileId) => {
    setProfile(next);
    track("partner_type_selected", { partner_type: next });
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(false);
    setEmailInvalid(false);
    if (!isValidEmail(email)) {
      setEmailInvalid(true);
      return;
    }
    try {
      const result = await captureLead.mutateAsync({
        name: name.trim(),
        company: company.trim(),
        email: email.trim(),
        url: website.trim() || undefined,
        partnerType: profile,
        notes: notes.trim() || undefined,
        source: "partner-intake",
      });
      if (result.crm !== "synced") {
        setSubmitError(true);
        track("partner_application_failed", {
          partner_type: profile,
          stored: result.stored,
          crm_status: result.crm ?? "unknown",
          failure_type: "crm_not_synced",
        });
        return;
      }
      track(ANALYTICS_EVENTS.partnerApplicationSubmitted, {
        lead_type: "partner",
        lead_source: "partner_intake",
        partner_type: profile,
        stored: result.stored,
        crm_status: result.crm,
      });
      setSubmitted(true);
    } catch {
      setSubmitError(true);
      track("partner_application_failed", { partner_type: profile });
    }
  };

  return (
    <div className="paper min-h-screen">
      <Seo title={copy.seoTitle} description={copy.seoDescription} />
      <SiteNav />

      <main>
        <section className="border-b border-[#dbe3ee] bg-[#f7f9fc]">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="eyebrow">{copy.kicker}</p>
              <h1 className="ink mt-4 max-w-3xl text-[36px] leading-[1.08] font-bold tracking-[-0.035em] sm:text-[52px]">
                {copy.title}
              </h1>
              <p className="ink-soft mt-5 max-w-2xl text-[16px] leading-relaxed sm:text-[18px]">
                {copy.body}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#apply"
                  data-analytics-event="partner_primary_click"
                  className="inline-flex min-h-12 items-center justify-center rounded bg-[#03123d] px-5 text-sm font-bold text-white transition hover:bg-[#123b7d]"
                >
                  {copy.primary}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <Link
                  to={path(CONVERT.example)}
                  data-analytics-event="partner_example_click"
                  className="inline-flex min-h-12 items-center justify-center rounded border border-[#9eb3cf] bg-white px-5 text-sm font-bold text-[#174a9b] transition hover:bg-[#edf5ff]"
                >
                  {copy.secondary}
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#9eb3cf] bg-white shadow-[0_20px_55px_rgba(3,18,61,0.12)]">
              <div className="bg-[#03123d] p-6 text-white">
                <p className="text-xs font-bold tracking-[0.14em] text-[#8fddff] uppercase">
                  {copy.rateLabel}
                </p>
                <p className="mt-2 text-5xl font-bold">{copy.rateValue}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  {copy.rateBody}
                </p>
              </div>
              <div className="grid grid-cols-2 border-b border-[#dbe3ee]">
                <div className="border-r border-[#dbe3ee] p-5">
                  <p className="text-xs font-bold text-[#5c6370] uppercase">
                    {copy.publicLabel}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-[#16181d]">
                    {copy.publicValue}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[#6b7280]">
                    {copy.publicBody}
                  </p>
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold text-[#5c6370] uppercase">
                    {copy.servicesLabel}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-[#087a55]">
                    {copy.servicesValue}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[#6b7280]">
                    {copy.servicesBody}
                  </p>
                </div>
              </div>
              <div className="space-y-3 p-5">
                {[copy.noMinimum, copy.noPortal, copy.clientOwned].map(item => (
                  <p
                    key={item}
                    className="flex items-center gap-2 text-sm font-semibold text-[#334155]"
                  >
                    <Check className="h-4 w-4 shrink-0 text-[#087a55]" />
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="eyebrow">{copy.profilesKicker}</p>
          <h2 className="ink mt-3 max-w-3xl text-[30px] leading-tight font-bold tracking-[-0.025em] sm:text-[38px]">
            {copy.profilesTitle}
          </h2>
          <p className="ink-soft mt-4 max-w-2xl text-[15px] leading-relaxed">
            {copy.profilesBody}
          </p>

          <div
            className="mt-8 grid gap-2 sm:grid-cols-3"
            aria-label={copy.profilesTitle}
          >
            {copy.profiles.map(item => {
              const Icon = PROFILE_ICONS[item.id];
              const active = profile === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => selectProfile(item.id)}
                  className={`flex min-h-12 items-center gap-3 rounded-lg border px-4 py-3 text-left transition ${
                    active
                      ? "border-[#174a9b] bg-[#edf5ff] shadow-[0_8px_20px_rgba(23,74,155,0.10)]"
                      : "border-[#dbe3ee] bg-white hover:border-[#9eb3cf]"
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0 text-[#174a9b]" />
                  <span className="text-sm font-bold text-[#174a9b]">
                    {item.tab}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-xl border border-[#9eb3cf] bg-[#f7f9fc] p-5 sm:p-7">
            <p className="text-xl font-bold text-[#16181d]">
              {selectedProfile.title}
            </p>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#5c6370]">
              {selectedProfile.body}
            </p>
            <p className="mt-4 text-sm font-bold text-[#174a9b]">
              {selectedProfile.next}
            </p>
          </div>
        </section>

        <section className="border-y border-[#dbe3ee] bg-[#03123d] text-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <p className="text-xs font-bold tracking-[0.15em] text-[#8fddff] uppercase">
              {copy.stepsKicker}
            </p>
            <h2 className="mt-3 max-w-3xl text-[30px] leading-tight font-bold tracking-[-0.025em] sm:text-[38px]">
              {copy.stepsTitle}
            </h2>
            <div className="mt-9 grid gap-px overflow-hidden rounded-xl bg-white/15 md:grid-cols-3">
              {copy.steps.map(([title, body], index) => (
                <div key={title} className="bg-[#071943] p-6">
                  <span className="font-mono text-sm font-bold text-[#8fddff]">
                    0{index + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="apply"
          className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.8fr_1.2fr]"
        >
          <div>
            <p className="eyebrow">{copy.formKicker}</p>
            <h2 className="ink mt-3 text-[30px] leading-tight font-bold tracking-[-0.025em] sm:text-[38px]">
              {copy.formTitle}
            </h2>
            <p className="ink-soft mt-4 text-[15px] leading-relaxed">
              {copy.formBody}
            </p>
            <a
              href={CONVERT.calBooking}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="partner_booking_click"
              className="mt-4 inline-flex min-h-11 items-center text-sm font-bold text-[#174a9b] hover:underline"
            >
              <CalendarDays className="mr-2 h-4 w-4" />
              {copy.bookCall}
            </a>
          </div>

          <div className="rounded-xl border border-[#cbd8ec] bg-white p-5 shadow-[0_18px_45px_rgba(3,18,61,0.09)] sm:p-7">
            {submitted ? (
              <div
                role="status"
                aria-live="polite"
                className="flex min-h-96 flex-col justify-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f7f1]">
                  <Check className="h-6 w-6 text-[#087a55]" />
                </span>
                <h3 className="ink mt-5 text-2xl font-bold">
                  {copy.successTitle}
                </h3>
                <p className="ink-soft mt-3 max-w-xl text-sm leading-relaxed">
                  {copy.successBody}
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={CONVERT.calBooking}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-12 items-center justify-center rounded bg-[#03123d] px-5 text-sm font-bold text-white"
                  >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {copy.bookCall}
                  </a>
                  <Link
                    to={path(CONVERT.report)}
                    className="inline-flex min-h-12 items-center justify-center rounded border border-[#9eb3cf] px-5 text-sm font-bold text-[#174a9b]"
                  >
                    {copy.viewAssessment}
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="text-sm font-bold text-[#16181d]">
                    {copy.name}
                    <Input
                      required
                      maxLength={160}
                      autoComplete="name"
                      value={name}
                      onChange={event => setName(event.target.value)}
                      className="mt-2 h-12 rounded"
                    />
                  </label>
                  <label className="text-sm font-bold text-[#16181d]">
                    {copy.company}
                    <Input
                      required
                      maxLength={200}
                      autoComplete="organization"
                      value={company}
                      onChange={event => setCompany(event.target.value)}
                      className="mt-2 h-12 rounded"
                    />
                  </label>
                  <label className="text-sm font-bold text-[#16181d]">
                    {copy.email}
                    <Input
                      required
                      type="email"
                      maxLength={255}
                      autoComplete="email"
                      value={email}
                      onChange={event => {
                        setEmail(event.target.value);
                        if (emailInvalid) setEmailInvalid(false);
                      }}
                      className="mt-2 h-12 rounded"
                      aria-invalid={emailInvalid}
                      aria-describedby={
                        emailInvalid ? "partner-email-error" : undefined
                      }
                    />
                  </label>
                  <label className="text-sm font-bold text-[#16181d]">
                    {copy.website}
                    <Input
                      type="url"
                      maxLength={1000}
                      inputMode="url"
                      autoComplete="url"
                      value={website}
                      onChange={event => setWebsite(event.target.value)}
                      placeholder="https://"
                      className="mt-2 h-12 rounded"
                    />
                  </label>
                </div>

                <label className="block text-sm font-bold text-[#16181d]">
                  {copy.notes}
                  <Textarea
                    maxLength={2000}
                    value={notes}
                    onChange={event => setNotes(event.target.value)}
                    placeholder={copy.notesPlaceholder}
                    className="mt-2 min-h-28 rounded"
                  />
                </label>

                {emailInvalid && (
                  <p
                    id="partner-email-error"
                    role="alert"
                    className="text-sm font-semibold text-[#b42318]"
                  >
                    {copy.invalidEmail}
                  </p>
                )}

                {(captureLead.isError || submitError) && !emailInvalid && (
                  <p
                    role="alert"
                    className="text-sm font-semibold text-[#b42318]"
                  >
                    {copy.error}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={captureLead.isPending}
                  className="min-h-12 w-full rounded bg-[#03123d] text-sm font-bold text-white hover:bg-[#123b7d]"
                >
                  {captureLead.isPending ? copy.submitting : copy.submit}
                  {!captureLead.isPending && (
                    <ArrowRight className="ml-2 h-4 w-4" />
                  )}
                </Button>
              </form>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
