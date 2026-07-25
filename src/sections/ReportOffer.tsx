import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { CONVERT, REPORT } from "@/config";
import { REPORT_CHAPTERS } from "@/data/report";

/** The primary offer: what is actually inside the paid report. */
export default function ReportOffer() {
  const navigate = useNavigate();
  return (
    <section id="report" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-bold tracking-wide text-[#6d5df6] uppercase">
            What you receive
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#141b2e] sm:text-4xl">
            Six chapters that answer the only question that matters
          </h2>
          <p className="mt-3 text-lg text-[#5a6378]">
            Not a checklist and not a template. A written assessment of{" "}
            <em>your</em> systems, prepared by a specialist, in your inbox within {REPORT.delivery}.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REPORT_CHAPTERS.map((c) => (
            <Card
              key={c.n}
              className="border-[#e7e9f2] bg-white shadow-none transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <CardHeader>
                <span className="text-xs font-extrabold tracking-widest text-[#6d5df6]">{c.n}</span>
                <CardTitle className="pt-1 text-base font-bold text-[#141b2e]">{c.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-[#5a6378]">{c.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button
            size="lg"
            className="rounded-full bg-[#141b2e] px-7 font-semibold text-white hover:bg-[#232c4a]"
            onClick={() => navigate(CONVERT.report)}
          >
            Get my report — €99
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
          <p className="text-sm text-[#8a92a6]">
            One-time payment · Delivered in {REPORT.delivery} or refunded in full
          </p>
        </div>
      </div>
    </section>
  );
}
