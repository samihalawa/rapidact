import { Link } from "react-router";
import {
  CalendarDays,
  FileText,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import Seo from "@/components/Seo";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteNav from "@/components/layout/SiteNav";
import { CONVERT } from "@/config";
import { ENTITY } from "@/data/company";
import { useI18n } from "@/lib/i18n";

export default function Contact() {
  const { path, t } = useI18n();
  const phoneHref = `tel:${ENTITY.phone.replace(/\s/g, "")}`;

  const contactMethods = [
    {
      label: t("contact.email"),
      value: ENTITY.contactEmail,
      href: `mailto:${ENTITY.contactEmail}`,
      Icon: Mail,
      event: "contact_email_click",
    },
    {
      label: t("contact.phone"),
      value: ENTITY.phone,
      href: phoneHref,
      Icon: Phone,
      event: "contact_phone_click",
    },
    {
      label: t("contact.whatsapp"),
      value: "+34 679 794 037",
      href: CONVERT.whatsapp,
      Icon: MessageCircle,
      event: "support_contact_click",
    },
  ];

  return (
    <div className="paper min-h-screen">
      <Seo
        title={t("contact.seoTitle")}
        description={t("contact.seoDescription")}
        localized
      />
      <SiteNav />
      <main>
        <section className="border-b border-[#dbe3ee] bg-[#f7f9fc]">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="eyebrow">{t("contact.kicker")}</p>
              <h1 className="ink mt-4 max-w-3xl text-[36px] leading-[1.06] font-bold tracking-[-0.035em] sm:text-[52px]">
                {t("contact.title")}
              </h1>
              <p className="ink-soft mt-5 max-w-2xl text-[17px] leading-relaxed">
                {t("contact.body")}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={CONVERT.calBooking}
                  target="_blank"
                  rel="noopener"
                  data-analytics-event="booking_click"
                  data-analytics-label="Contact page book a call CTA"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded bg-[#03123d] px-6 text-sm font-bold text-white transition hover:bg-[#123b7d]"
                >
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  {t("contact.call")}
                </a>
                <Link
                  to={path(CONVERT.report)}
                  data-analytics-event="report_started"
                  data-analytics-label="Contact page report CTA"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded border border-[#9eb3cf] bg-white px-6 text-sm font-bold text-[#174a9b] transition hover:bg-[#edf5ff]"
                >
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  {t("contact.report")}
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-[#9eb3cf] bg-white p-6 shadow-[0_20px_55px_rgba(3,18,61,0.10)] sm:p-8">
              <p className="text-lg font-bold text-[#16181d]">
                {t("contact.details")}
              </p>
              <div className="mt-5 divide-y divide-[#dbe3ee]">
                {contactMethods.map(({ label, value, href, Icon, event }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener" : undefined}
                    data-analytics-event={event}
                    data-analytics-label={`Contact page ${label}`}
                    className="flex min-h-16 items-center gap-4 py-3 text-[#334155] transition hover:text-[#174a9b]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#edf5ff] text-[#174a9b]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold tracking-[0.08em] text-[#64748b] uppercase">
                        {label}
                      </span>
                      <span className="mt-0.5 block break-all text-sm font-semibold">
                        {value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
