import { Link } from "react-router";
import { REQUIREMENTS } from "@/data/requirements";
import { PLATFORMS } from "@/data/platforms";
import {
  ENTITY,
  COMPANIES_HOUSE_URL,
  HAS_ENTITY_DETAILS,
  ENTITY_DISPLAY_NAME,
} from "@/data/company";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#e2e2dd] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-2">
              <img src="/icons/logo-32.png" alt="RapidAct logo" className="h-7 w-7 rounded-lg" />
              <span className="text-[17px] font-bold text-[#16181d]">RapidAct</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#5c6370]">
              Find out which of your AI systems the EU AI Act covers. A written assessment reaches
              your inbox within 24–48h for €99. The website scanner and the self-install disclosure
              layer are free either way. Technical assessment, not legal advice.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#16181d]">Product</h4>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "The assessment, €99", href: "/report" },
                { label: "Free website scan", href: "/scanner" },
                { label: "Free tools", href: "/#features" },
                { label: "Article 50 guide", href: "/article-50" },
                { label: "Guides", href: "/learn" },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-sm text-[#5c6370] transition hover:text-[#16181d]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#16181d]">Requirements</h4>
            <ul className="mt-4 space-y-2.5">
              {REQUIREMENTS.map((r) => (
                <li key={r.slug}>
                  <Link
                    to={`/requirements/${r.slug}`}
                    className="text-sm text-[#5c6370] transition hover:text-[#16181d]"
                  >
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#16181d]">Platforms</h4>
            <ul className="mt-4 space-y-2.5">
              {PLATFORMS.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/platforms/${p.slug}`}
                    className="text-sm text-[#5c6370] transition hover:text-[#16181d]"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#16181d]">Legal</h4>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "Privacy policy", href: "/privacy" },
                { label: "Terms of service", href: "/terms" },
                { label: "Not legal advice", href: "/terms" },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-sm text-[#5c6370] transition hover:text-[#16181d]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal entity block. Standard for a company taking payment online, and
            the cheapest, strongest signal that a real business is behind the page. */}
        {HAS_ENTITY_DETAILS && (
          <div className="hairline mt-12 grid gap-6 border-t pt-8 sm:grid-cols-3">
            <div>
              <p className="eyebrow">Registered company</p>
              <p className="ink mt-1.5 text-[13px] font-semibold">{ENTITY.legalName}</p>
              <a
                href={COMPANIES_HOUSE_URL}
                target="_blank"
                rel="noopener"
                className="accent mono mt-0.5 inline-block text-[12px] underline underline-offset-2"
              >
                Companies House No. {ENTITY.registrationNumber}
              </a>
              {ENTITY.vatNumber && (
                <p className="ink-soft mono mt-0.5 text-[12px]">VAT {ENTITY.vatNumber}</p>
              )}
            </div>
            <div>
              <p className="eyebrow">Registered office</p>
              <p className="ink-soft mt-1.5 text-[12px] leading-relaxed">
                {ENTITY.address}
                <br />
                {ENTITY.country}
              </p>
            </div>
            <div>
              <p className="eyebrow">Contact</p>
              <a
                href={`tel:${ENTITY.phone.replace(/\s/g, "")}`}
                className="ink mono mt-1.5 block text-[12px] hover:underline"
              >
                {ENTITY.phone}
              </a>
              {ENTITY.contactEmail && (
                <a
                  href={`mailto:${ENTITY.contactEmail}`}
                  className="accent block text-[12px] underline underline-offset-2"
                >
                  {ENTITY.contactEmail}
                </a>
              )}
            </div>
          </div>
        )}

        <div className="hairline ink-soft mt-8 flex flex-col items-start justify-between gap-3 border-t pt-6 text-[12px] sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {ENTITY_DISPLAY_NAME}. RapidAct is a trading name.
          </span>
          <span>Regulation (EU) 2024/1689, Article 50, applies from 2 August 2026</span>
        </div>
      </div>
    </footer>
  );
}
