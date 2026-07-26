import { useI18n } from "@/lib/i18n";
import { HOME_COPY } from "@/data/localizedHome";

export default function HowItWorks() {
  const { lang } = useI18n();
  const copy = HOME_COPY[lang];
  return (
    <section id="how" className="paper hairline border-b py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="eyebrow">{copy.procedureLabel}</p>
        <h2 className="ink mt-3 max-w-2xl text-[28px] leading-tight font-bold tracking-[-0.015em] sm:text-[32px]">
          {copy.procedureTitle}
        </h2>

        <div className="hairline mt-10 grid divide-y divide-[#e2e2dd] border-y md:grid-cols-3 md:divide-x md:divide-y-0">
          {copy.steps.map((s, index) => (
            <div
              key={s.title}
              className="px-0 py-6 md:px-6 md:py-7 md:first:pl-0 md:last:pr-0"
            >
              <span className="mono ink-soft text-[12px]">{copy.stepLabel} {index + 1}</span>
              <h3 className="ink mt-2 text-[15px] font-semibold">{s.title}</h3>
              <p className="ink-soft mt-2 text-[15px] leading-relaxed">
                {s.text}
              </p>
            </div>
          ))}
        </div>

        <div className="hairline mt-10 border-l-2 border-l-[#8a6d1f] bg-[#fdfaf1] px-6 py-5">
          <p className="ink text-[13px] font-semibold">
            {copy.delayTitle}
          </p>
          <p className="ink-soft mt-2 max-w-3xl text-[15px] leading-relaxed">
            {copy.delayText}
          </p>
        </div>
      </div>
    </section>
  );
}
