import { useNavigate, Link } from "react-router";
import { Button } from "@/components/ui/button";
import { CONVERT, REPORT } from "@/config";
import { REPORT_CHAPTERS } from "@/data/report";
import { daysLeft } from "@/components/Countdown";

/**
 * Contents panel. This shows the actual structure of the deliverable, taken from
 * the same REPORT_CHAPTERS the offer section renders, rather than a mocked-up
 * screenshot of a fictional customer's results. A prospect can check the claim
 * against what they receive.
 */
function ReportContents() {
  return (
    <div className="hairline border bg-white">
      <div className="hairline flex items-baseline justify-between border-b bg-[#16181d] px-6 py-4">
        <div>
          <p className="text-[10px] font-bold tracking-[0.14em] text-white/55 uppercase">
            Deliverable
          </p>
          <p className="mt-1 text-[15px] font-semibold text-white">
            {REPORT.name}
          </p>
        </div>
        <span className="mono text-[11px] text-white/45">€99</span>
      </div>

      <ol className="divide-y divide-[#e2e2dd]">
        {REPORT_CHAPTERS.map(c => (
          <li key={c.n} className="flex gap-4 px-6 py-3.5">
            <span className="mono ink-soft w-6 shrink-0 pt-0.5 text-[11px]">
              {c.n}
            </span>
            <div>
              <p className="ink text-[13px] leading-snug font-semibold">
                {c.title}
              </p>
              <p className="ink-soft mt-0.5 text-[12px] leading-relaxed">
                {c.text.split(".")[0]}.
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="hairline border-t bg-[#f7f7f5] px-6 py-3.5">
        <p className="ink-soft text-[12px] leading-relaxed">
          Prepared for your company specifically. Delivered as a written
          document to the address you give us, within {REPORT.delivery} of
          payment.
        </p>
        <Link
          to={CONVERT.example}
          className="accent mt-2 inline-block text-[12px] font-semibold underline underline-offset-2"
        >
          Read a full specimen before you buy
        </Link>
      </div>
    </div>
  );
}

export default function Hero() {
  const navigate = useNavigate();
  const d = daysLeft();

  return (
    <section className="paper hairline border-b">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="lg:pt-4">
          {/* Regulatory status, stated as fact rather than as an urgency device. */}
          <div className="hairline flex flex-wrap items-center gap-x-3 gap-y-1 border-l-2 border-l-[#16181d] pl-3">
            <span className="ink text-[13px] font-semibold">
              EU AI Act, Article 50
            </span>
            <span className="ink-soft text-[13px]">
              {d === 0
                ? "In force since 2 August 2026"
                : `Applies from 2 August 2026, in ${d} day${d === 1 ? "" : "s"}`}
            </span>
          </div>

          <h1 className="ink mt-6 text-[38px] leading-[1.1] font-bold tracking-[-0.02em] sm:text-[46px]">
            Find out which of your AI systems the EU AI Act actually covers
          </h1>

          <p className="ink-soft mt-5 max-w-xl text-[17px] leading-relaxed">
            Most companies do not have a written list of the AI they run, let
            alone which obligations attach to each system. We produce that list
            for you, classify every system against the regulation, and set out
            what you are required to publish and document.
          </p>

          <p className="ink-soft mt-4 max-w-xl text-[17px] leading-relaxed">
            The assessment costs <span className="ink font-semibold">€99</span>,
            paid once. It reaches your inbox within {REPORT.delivery}. If it
            does not arrive in that window, you are refunded in full.
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <Button
              size="lg"
              className="h-12 rounded bg-[#16181d] px-7 text-[15px] font-semibold text-white hover:bg-[#2b2f38]"
              onClick={() => navigate(CONVERT.report)}
            >
              Request the assessment
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="hairline h-12 rounded border bg-white px-7 text-[15px] font-semibold text-[#16181d] hover:bg-[#f7f7f5]"
              onClick={() => navigate(CONVERT.example)}
            >
              Read a specimen report
            </Button>
          </div>

          <p className="ink-soft mt-4 text-[13px]">
            Need the technical notice only?{" "}
            <Link
              className="accent font-semibold underline underline-offset-2"
              to={CONVERT.badge}
            >
              Install the free badge in one minute
            </Link>
            .
          </p>

          <p className="ink-soft mt-5 max-w-xl text-[13px] leading-relaxed">
            RapidAct produces technical and organisational compliance
            assessments. It is not a law firm, and the report is not legal
            advice. Where a question genuinely requires a legal opinion, the
            report says so and tells you what to put in front of counsel.
          </p>
        </div>

        <div className="lg:pt-2">
          <ReportContents />
        </div>
      </div>
    </section>
  );
}
