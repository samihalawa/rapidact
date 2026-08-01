import { Link } from "react-router";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Seo from "@/components/Seo";
import CtaBand from "@/components/CtaBand";
import BadgeInstallDashboard from "@/components/BadgeInstallDashboard";
import { getPlatforms } from "@/data/platforms";
import {
  ArrowRight,
  FileClock,
  MessagesSquare,
  Tags,
  Video,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { GUIDE_CARDS, GUIDE_COPY } from "@/data/localizedGuide";

const reqIcons = [MessagesSquare, Tags, Video, FileClock];

export default function Guide() {
  const { lang, path } = useI18n();
  const copy = GUIDE_COPY[lang];
  const platforms = getPlatforms(lang);

  return (
    <div className="min-h-screen bg-white">
      <Seo title={copy.seoTitle} description={copy.seoDescription} localized />
      <SiteNav />
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight text-[#16181d] sm:text-5xl">
          {copy.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-[#5c6370]">
          {copy.intro}
        </p>

        <BadgeInstallDashboard guideCopy={copy} />

        <p className="mt-6 border-l-2 border-[#1f3a5f] pl-4 text-[13px] leading-relaxed text-[#5c6370]">
          {copy.scope}{" "}
          <a
            href="https://digital-strategy.ec.europa.eu/en/library/guidelines-transparency-obligations-providers-and-deployers-ai-systems"
            target="_blank"
            rel="noopener"
            className="font-semibold text-[#1f3a5f] underline underline-offset-2"
          >
            {copy.scopeLink}
          </a>
          .
        </p>

        <section className="mt-10 space-y-6 text-[15px] leading-relaxed text-[#5c6370]">
          <div className="rounded border border-[#e2e2dd] bg-[#f7f7f5] p-6">
            <h2 className="text-xl font-bold text-[#16181d]">
              {copy.appliesTitle}
            </h2>
            <p className="mt-3">{copy.appliesBody}</p>
          </div>
          <div className="rounded border border-[#e2e2dd] bg-[#f7f7f5] p-6">
            <h2 className="text-xl font-bold text-[#16181d]">
              {copy.deadlineTitle}
            </h2>
            <p className="mt-3">{copy.deadlineBody}</p>
          </div>
          <div className="rounded border border-[#e2e2dd] bg-[#f7f7f5] p-6">
            <h2 className="text-xl font-bold text-[#16181d]">
              {copy.riskTitle}
            </h2>
            <p className="mt-3">{copy.riskBody}</p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#16181d]">
            {copy.dutiesTitle}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {GUIDE_CARDS[lang].map((r, i) => {
              const Icon = reqIcons[i % reqIcons.length];
              return (
                <Link
                  key={r.slug}
                  to={path(`/requirements/${r.slug}`)}
                  className="group rounded border border-[#e2e2dd] bg-white p-5 transition hover:-translate-y-0.5 hover:border-[#1f3a5f] hover:shadow-lg"
                >
                  <Icon className="h-5 w-5 text-[#1f3a5f]" />
                  <p className="mt-3 font-bold text-[#16181d]">{r.title}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-[#5c6370]">
                    {r.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#1f3a5f]">
                    {copy.readGuide}{" "}
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#16181d]">
            {copy.platformsTitle}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {platforms.map(p => (
              <Link
                key={p.slug}
                to={path(`/platforms/${p.slug}`)}
                className="rounded border border-[#e2e2dd] bg-white px-4 py-1.5 text-sm font-medium text-[#5c6370] hover:border-[#1f3a5f] hover:text-[#1f3a5f]"
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
