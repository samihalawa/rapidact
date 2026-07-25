import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQS = [
  {
    q: "Does this make my site compliant with the EU AI Act?",
    a: "No tool can promise that, and anyone who does is selling you risk. RapidAct implements and documents the Article 50(1) visitor-disclosure duty for AI interaction — the part that is genuinely automatable. Scoping your full obligations stays with you; for edge cases, talk to a qualified EU technology lawyer.",
  },
  {
    q: "My chatbot vendor already shows a label. Am I covered?",
    a: "Usually not. Article 50(1) puts the disclosure duty on the deployer — that's you, the site owner — not only on the platform providing the chatbot. Your vendor's label covers their obligation; RapidAct covers yours.",
  },
  {
    q: "We're a small company. Surely there's an SME exemption?",
    a: "There isn't. Article 50 triggers by use case, not company size. A five-person shop with an AI chatbot on its checkout page has the same disclosure duty as an enterprise. Fine structures do consider scale.",
  },
  {
    q: "Didn't the EU delay the AI Act to 2027?",
    a: "That was the high-risk rulebook (Annex III moved to December 2027, Annex I to August 2028). Article 50 transparency obligations were deliberately left on schedule and apply from 2 August 2026. This 'two-clock' misreading is the most common — and most dangerous — compliance mistake right now.",
  },
  {
    q: "What data do you collect when I scan a site?",
    a: "The scan fetches the public HTML of the URL you submit — nothing else. We store the URL, the score and the report so you can retrieve them. The WordPress plugin's evidence log stores only event type, page URL and timestamp: no IPs, no user agents, no cookies, and it never leaves your server.",
  },
  {
    q: "What counts as an AI chatbot under Article 50?",
    a: "Any system your visitors interact with that generates automated responses presented as conversation: support chatbots, virtual agents, AI assistants, voice bots. Our signature database covers 52 known platforms, and the scanner flags each one with the exact evidence found on your page.",
  },
  {
    q: "What's the real difference between free, the €59 pack and the €99 install?",
    a: "Same destination, different amounts of your time. Free: you get the scan, the plan, the plugin and the guides — you do the clicking, €0. The €59 pack: everything arrives preconfigured for your site — disclosure, labels, evidence log, 12 months of updates — you just switch it on. €99: we log into your stack and install everything ourselves, then verify it live on your pages. All one-time payments, no subscriptions.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="mesh-bg py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-bold tracking-wide text-[#6d5df6] uppercase">FAQ</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#141b2e] sm:text-4xl">
            The questions everyone asks after the scan
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-10">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`item-${i}`}
              className="mb-3 rounded-xl border border-white/70 bg-white/85 px-5 backdrop-blur"
            >
              <AccordionTrigger className="text-left text-[15px] font-semibold text-[#141b2e] hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-[#5a6378]">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
