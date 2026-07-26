import { REPORT } from "@/config";

const steps = [
  {
    n: "1",
    title: "You describe your company",
    text: "A short form: your business, sector, size, the countries you operate in, and the AI you know you are using. If you are not certain what counts as AI under the regulation, say so. Establishing that is part of the work, not a prerequisite for it.",
  },
  {
    n: "2",
    title: "We assess your case",
    text: "Your systems, your website and your sector are reviewed against the current text of the regulation and the guidance published under it. Each system is classified, and the obligations that follow from that classification are set out individually.",
  },
  {
    n: "3",
    title: `You receive the written assessment within ${REPORT.delivery}`,
    text: "A document you can act on, forward to your board, or hand to counsel, together with a direct assessment from the person who prepared it. If it has not arrived inside the window, you are refunded in full without needing to ask twice.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="paper hairline border-b py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="eyebrow">Procedure</p>
        <h2 className="ink mt-3 max-w-2xl text-[28px] leading-tight font-bold tracking-[-0.015em] sm:text-[32px]">
          What happens after you pay
        </h2>

        <div className="hairline mt-10 grid divide-y divide-[#e2e2dd] border-y md:grid-cols-3 md:divide-x md:divide-y-0">
          {steps.map(s => (
            <div
              key={s.n}
              className="px-0 py-6 md:px-6 md:py-7 md:first:pl-0 md:last:pr-0"
            >
              <span className="mono ink-soft text-[12px]">Step {s.n}</span>
              <h3 className="ink mt-2 text-[15px] font-semibold">{s.title}</h3>
              <p className="ink-soft mt-2 text-[15px] leading-relaxed">
                {s.text}
              </p>
            </div>
          ))}
        </div>

        <div className="hairline mt-10 border-l-2 border-l-[#8a6d1f] bg-[#fdfaf1] px-6 py-5">
          <p className="ink text-[13px] font-semibold">
            On the reports that the AI Act was delayed
          </p>
          <p className="ink-soft mt-2 max-w-3xl text-[15px] leading-relaxed">
            The postponement covered the high-risk rulebook: Annex III
            obligations moved to December 2027 and Annex I to August 2028. The
            Article 50 transparency obligations were left on their original
            schedule and apply from 2 August 2026. Whether a particular duty is
            yours depends on the system, your provider or deployer role, the EU
            nexus and any applicable exception. Penalties can reach €15M or 3%
            of worldwide turnover, subject to proportionality and the case.
            Establishing which timetable and duty applies to each system is the
            first thing the assessment answers.
          </p>
        </div>
      </div>
    </section>
  );
}
