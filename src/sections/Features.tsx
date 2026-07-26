import { useNavigate } from "react-router";
import { CONVERT } from "@/config";
import { useI18n } from "@/lib/i18n";
import { HOME_COPY } from "@/data/localizedHome";

/**
 * The free self-install layer. Secondary to the paid assessment, but kept
 * substantial: it is a genuine free offer and the main organic search entry
 * point to the site.
 */
export default function Features() {
  const navigate = useNavigate();
  const { lang, path, t } = useI18n();
  const copy = HOME_COPY[lang];
  return (
    <section id="features" className="paper hairline border-b py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="eyebrow">{copy.featuresLabel}</p>
        <h2 className="ink mt-3 max-w-2xl text-[28px] leading-tight font-bold tracking-[-0.015em] sm:text-[32px]">
          {copy.featuresTitle}
        </h2>
        <p className="ink-soft mt-3 max-w-2xl text-[16px] leading-relaxed">
          {copy.featuresIntro}
        </p>

        <div className="hairline mt-10 grid border-t sm:grid-cols-2 lg:grid-cols-3">
          {copy.features.map(tool => (
            <div key={tool.title} className="hairline border-b py-6 sm:pr-8">
              <h3 className="ink text-[15px] font-semibold">{tool.title}</h3>
              <p className="ink-soft mt-2 text-[15px] leading-relaxed">
                {tool.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <p className="ink-soft max-w-2xl text-[15px] leading-relaxed">
            {copy.featuresClose}
          </p>
          <button
            onClick={() => navigate(path(CONVERT.badge))}
            className="inline-flex min-h-11 items-center rounded bg-[#16181d] px-5 text-[14px] font-semibold text-white hover:bg-[#2b2f38]"
          >
            {copy.copyCode}
          </button>
          <button
            onClick={() => navigate(path(CONVERT.report))}
            className="accent shrink-0 text-[14px] font-semibold underline underline-offset-2"
          >
            {t("hero.request")}, €99
          </button>
        </div>
      </div>
    </section>
  );
}
