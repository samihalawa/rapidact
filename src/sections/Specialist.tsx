import { SPECIALIST, HAS_NAMED_SPECIALIST } from "@/data/company";
import { ExternalLink, Linkedin } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { HOME_COPY } from "@/data/localizedHome";

/**
 * Who performs the assessment.
 *
 * Renders nothing at all until a real person is named in src/data/company.ts.
 * An anonymous "trusted by experts" block would be worse than no block: it is
 * precisely the unfalsifiable claim that makes a page read as machine-made.
 */
export default function Specialist() {
  const { lang, t } = useI18n();
  const copy = HOME_COPY[lang];
  if (!HAS_NAMED_SPECIALIST) return null;

  return (
    <section id="who" className="paper hairline border-b py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="eyebrow">{t("specialist.label")}</p>
        <h2 className="ink mt-3 max-w-3xl text-[28px] leading-tight font-bold tracking-[-0.015em] sm:text-[32px]">
          {t("specialist.title")}
        </h2>

        <div className="hairline mt-8 grid overflow-hidden border bg-white lg:grid-cols-[0.85fr_1.55fr]">
          <div className="flex items-center gap-5 bg-[#16181d] p-6 sm:p-8">
            {SPECIALIST.photo && (
              <img
                src={SPECIALIST.photo}
                alt={SPECIALIST.name}
                width={80}
                height={80}
                className="h-20 w-20 shrink-0 rounded-full border-2 border-white/20 object-cover"
              />
            )}
            <div>
              <p className="text-lg font-semibold text-white">
                {SPECIALIST.name}
              </p>
              {SPECIALIST.role && (
                <p className="text-sm text-white/60">{t("specialist.role")}</p>
              )}
              {SPECIALIST.linkedin && (
                <a
                  href={SPECIALIST.linkedin}
                  data-analytics-event="specialist_profile_click"
                  target="_blank"
                  rel="noopener"
                  className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#b8d4fb] underline underline-offset-4"
                >
                  <Linkedin className="h-4 w-4" />
                  {t("specialist.verify")}
                </a>
              )}
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <p className="ink-soft text-[15px] leading-relaxed">
              {copy.specialistBio}
            </p>
            <p className="ink-soft mt-4 text-[15px] leading-relaxed">
              {t("specialist.human")}
            </p>
            <div className="hairline mt-6 grid border-t sm:grid-cols-3">
              {SPECIALIST.credentials.map((credential, index) => (
                <div
                  key={credential.id}
                  className="hairline border-b py-4 sm:border-r sm:border-b-0 sm:px-4 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
                >
                  <p className="mono ink-soft text-[10px]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="ink mt-2 text-[13px] font-semibold leading-snug">
                    {t(`specialist.credential.${credential.id}.title`)}
                  </p>
                  <p className="ink-soft mt-1.5 text-[11px] leading-relaxed">
                    {t(`specialist.credential.${credential.id}.body`)}
                  </p>
                  {credential.verifyUrl && (
                    <a
                      href={credential.verifyUrl}
                      target="_blank"
                      rel="noopener"
                      className="accent mt-2 inline-flex min-h-11 items-center gap-1 text-[11px] font-semibold underline underline-offset-2"
                    >
                      {t("specialist.credential.verify")}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
            {SPECIALIST.email && (
              <p className="ink-soft mt-4 text-[15px] leading-relaxed">
                {copy.specialistQuestions}{" "}
                <a
                  href={`mailto:${SPECIALIST.email}`}
                  className="accent inline-flex min-h-11 items-center font-medium underline underline-offset-2"
                >
                  {SPECIALIST.email}
                </a>
                . {copy.specialistReply}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
