import { useNavigate } from "react-router";
import { CONVERT } from "@/config";

const tools = [
  {
    name: "AI detection scanner",
    text: "Submit a URL and see which AI systems are detectable on the page, checked against 52 known chatbot platforms, with the specific evidence found for each match.",
  },
  {
    name: "Visitor AI disclosure",
    text: "The notice Article 50(1) requires, shown before a visitor interacts with your AI, in English and Spanish, styled to match your site.",
  },
  {
    name: "AI content labels",
    text: "Labels for AI-generated images, video and text using the EU standard icon set, so synthetic content is marked rather than argued about later.",
  },
  {
    name: "Evidence log",
    text: "Each disclosure view recorded with a page and a timestamp, exportable as CSV. Questions about what you displayed tend to arrive months afterwards, in writing.",
  },
  {
    name: "Platform coverage",
    text: "A WordPress plugin, a Wix app, a Shopify block, or one script tag for anything else. Your existing chatbot, whether Tidio, Botpress, Zendesk or Intercom, is left untouched.",
  },
  {
    name: "Implementation guides",
    text: "What each rule requires for your platform and the specific steps that satisfy it, written without legal or technical jargon.",
  },
];

/**
 * The free self-install layer. Secondary to the paid assessment, but kept
 * substantial: it is a genuine free offer and the main organic search entry
 * point to the site.
 */
export default function Features() {
  const navigate = useNavigate();
  return (
    <section id="features" className="paper hairline border-b py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="eyebrow">Free tools</p>
        <h2 className="ink mt-3 max-w-2xl text-[28px] leading-tight font-bold tracking-[-0.015em] sm:text-[32px]">
          The implementation tools cost nothing
        </h2>
        <p className="ink-soft mt-3 max-w-2xl text-[16px] leading-relaxed">
          Once you know what your company is required to do, the technical work is not the
          difficult part, so we do not charge for it. Scan your site, install the disclosure layer,
          keep the evidence log, whether or not you ever buy an assessment.
        </p>

        <div className="hairline mt-10 grid border-t sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <div key={t.name} className="hairline border-b py-6 sm:pr-8">
              <h3 className="ink text-[15px] font-semibold">{t.name}</h3>
              <p className="ink-soft mt-2 text-[15px] leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <p className="ink-soft max-w-2xl text-[15px] leading-relaxed">
            Installing the notice is the straightforward half. Establishing which of your systems
            the regulation covers, and what you must be able to produce on request, is the half
            that costs companies money.
          </p>
          <button
            onClick={() => navigate(CONVERT.report)}
            className="accent shrink-0 text-[14px] font-semibold underline underline-offset-2"
          >
            Request the assessment, €99
          </button>
        </div>
      </div>
    </section>
  );
}
