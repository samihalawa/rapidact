import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { REPORT_FAQS } from "@/data/report";

/** Re-exported so JSON-LD and other pages keep a single source of FAQ truth. */
export const FAQS = REPORT_FAQS;

export default function Faq() {
  return (
    <section id="faq" className="paper py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="eyebrow">Questions</p>
        <h2 className="ink mt-3 max-w-2xl text-[28px] leading-tight font-bold tracking-[-0.015em] sm:text-[32px]">
          What companies ask before they pay
        </h2>

        <Accordion type="single" collapsible className="hairline mt-8 max-w-3xl border-t">
          {FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="hairline border-b">
              <AccordionTrigger className="ink py-4 text-left text-[15px] font-semibold hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="ink-soft pb-5 text-[15px] leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
