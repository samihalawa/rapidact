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
    <section id="faq" className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-bold tracking-wide text-[#6d5df6] uppercase">FAQ</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#141b2e] sm:text-4xl">
            What companies ask before they pay
          </h2>
        </div>
        <Accordion type="single" collapsible className="mt-10">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`item-${i}`}
              className="mb-3 rounded-xl border border-[#e7e9f2] bg-[#f8f9fc] px-5"
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
