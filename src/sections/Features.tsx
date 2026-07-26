import { useNavigate } from "react-router";
import { CONVERT } from "@/config";

const tools = [
  {
    name: "AI detection scanner",
    text: "Submit a URL and see which AI systems are detectable on the page, checked against 52 known chatbot platforms, with the specific evidence found for each match.",
  },
  {
    name: "Visitor AI disclosure",
    text: "A clear notice for interactive AI, configurable in English or Spanish and visible on every page where the interaction happens.",
  },
  {
    name: "Configurable by data attributes",
    text: "Set the system name, responsible provider, disclosure wording, details URL, screen position and accent colour without rebuilding the script.",
  },
  {
    name: "Privacy-preserving",
    text: "The badge stores no cookies, profiles or visitor data and makes no tracking request. Its only network request is the public script itself.",
  },
  {
    name: "Platform coverage",
    text: "One script tag works in WordPress custom HTML, Wix Custom Code, Shopify Custom Liquid, Webflow or a custom app. Your existing chatbot is left untouched.",
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
          Once you know what your company is required to do, the visitor-facing
          notice is usually the straightforward part. Scan the public page and
          install the disclosure badge whether or not you ever buy an
          assessment.
        </p>

        <div className="hairline mt-10 grid border-t sm:grid-cols-2 lg:grid-cols-3">
          {tools.map(t => (
            <div key={t.name} className="hairline border-b py-6 sm:pr-8">
              <h3 className="ink text-[15px] font-semibold">{t.name}</h3>
              <p className="ink-soft mt-2 text-[15px] leading-relaxed">
                {t.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <p className="ink-soft max-w-2xl text-[15px] leading-relaxed">
            Installing the notice is the straightforward half. Establishing
            which of your systems the regulation covers, and what you must be
            able to produce on request, is the half that costs companies money.
          </p>
          <button
            onClick={() => navigate(CONVERT.badge)}
            className="inline-flex min-h-11 items-center rounded bg-[#16181d] px-5 text-[14px] font-semibold text-white hover:bg-[#2b2f38]"
          >
            Copy the free install code
          </button>
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
