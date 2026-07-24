import { Link } from "react-router";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Seo from "@/components/Seo";
import CtaBand from "@/components/CtaBand";
import { REQUIREMENTS } from "@/data/requirements";
import { PLATFORMS } from "@/data/platforms";
import { ArrowRight, MessagesSquare, Tags, Video, FileClock } from "lucide-react";

const reqIcons = [MessagesSquare, Tags, Video, FileClock];

export default function Guide() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="EU AI Act Article 50 in plain English — what your website must do by 2 Aug 2026 | RapidAct"
        description="Article 50 explained without legal jargon: chatbot AI disclosure, AI content labels, deepfake labeling and evidence — who it applies to, deadlines, fines, and how to comply free."
      />
      <SiteNav />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#141b2e] sm:text-5xl">
          Article 50 of the EU AI Act, in plain English
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#3d445c]">
          From <strong>2 August 2026</strong>, if your website uses AI in front of visitors, you
          must say so. That's the whole idea. The details — what counts, who it covers, what
          happens if you ignore it — take four minutes to read and one afternoon to fix.
        </p>

        <section className="mt-10 space-y-6 text-[15px] leading-relaxed text-[#3d445c]">
          <div className="rounded-2xl border border-[#e7e9f2] bg-[#f8f9fc] p-6">
            <h2 className="text-xl font-extrabold text-[#141b2e]">Does it apply to me?</h2>
            <p className="mt-3">
              It applies if any of these are true: your site has a chatbot or AI assistant; you
              publish AI-generated images, videos or voices that look real; you publish AI-written
              articles on public topics; or you use emotion/biometric recognition. It doesn't
              matter how small your company is — <strong>there is no SME exemption</strong> — and
              it doesn't matter where your company is registered: if EU visitors use your site,
              you're in scope.
            </p>
          </div>
          <div className="rounded-2xl border border-[#e7e9f2] bg-[#f8f9fc] p-6">
            <h2 className="text-xl font-extrabold text-[#141b2e]">The deadline everyone gets wrong</h2>
            <p className="mt-3">
              In 2026 the EU delayed parts of the AI Act — the <em>high-risk</em> rules moved to
              December 2027 and August 2028. Many businesses read "AI Act delayed" and relaxed.
              Mistake: <strong>Article 50 was explicitly not delayed.</strong> It applies from 2
              August 2026, with only one narrow grace period (machine-readable marking for AI
              systems already on the market, until 2 December 2026).
            </p>
          </div>
          <div className="rounded-2xl border border-[#e7e9f2] bg-[#f8f9fc] p-6">
            <h2 className="text-xl font-extrabold text-[#141b2e]">What happens if I ignore it?</h2>
            <p className="mt-3">
              Article 50 violations sit in the mid-tier of AI Act fines:{" "}
              <strong>up to €15 million or 3% of worldwide annual turnover</strong>, whichever is
              higher (scaled down for smaller companies). Beyond fines: enforcement is public, and
              "company X hid its AI from customers" is a headline no brand wants.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-extrabold text-[#141b2e]">The four duties, one guide each</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {REQUIREMENTS.map((r, i) => {
              const Icon = reqIcons[i % reqIcons.length];
              return (
                <Link
                  key={r.slug}
                  to={`/requirements/${r.slug}`}
                  className="group rounded-2xl border border-[#e7e9f2] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#6d5df6] hover:shadow-lg"
                >
                  <Icon className="h-5 w-5 text-[#6d5df6]" />
                  <p className="mt-3 font-bold text-[#141b2e]">{r.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-[#5a6378]">{r.metaDescription}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#6d5df6]">
                    Read the guide <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-extrabold text-[#141b2e]">Guides for your platform</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {PLATFORMS.map((p) => (
              <Link
                key={p.slug}
                to={`/platforms/${p.slug}`}
                className="rounded-full border border-[#e7e9f2] bg-white px-4 py-1.5 text-sm font-medium text-[#3d445c] hover:border-[#6d5df6] hover:text-[#6d5df6]"
              >
                {p.name}
              </Link>
            ))}
          </div>
        </section>

        <CtaBand />
      </main>
      <SiteFooter />
    </div>
  );
}
