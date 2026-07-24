import { Link } from "react-router";
import { REQUIREMENTS } from "@/data/requirements";
import { PLATFORMS } from "@/data/platforms";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#e7e9f2] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ffd617] text-[11px] font-extrabold text-[#141b2e]">
                AI
              </span>
              <span className="text-[17px] font-bold text-[#141b2e]">RapidAct</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#5a6378]">
              AI transparency for the EU AI Act, installed on your website. Free to start — €59 for
              the pack, €99 done for you. Technical tooling, not legal advice.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#141b2e]">Product</h4>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "Free scan + plan", href: "/scanner" },
                { label: "What we install", href: "/#features" },
                { label: "Pricing — €0/€59/€99", href: "/#pricing" },
                { label: "Article 50 guide", href: "/article-50" },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-sm text-[#5a6378] transition hover:text-[#141b2e]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#141b2e]">Requirements</h4>
            <ul className="mt-4 space-y-2.5">
              {REQUIREMENTS.map((r) => (
                <li key={r.slug}>
                  <Link
                    to={`/requirements/${r.slug}`}
                    className="text-sm text-[#5a6378] transition hover:text-[#141b2e]"
                  >
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#141b2e]">Platforms</h4>
            <ul className="mt-4 space-y-2.5">
              {PLATFORMS.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/platforms/${p.slug}`}
                    className="text-sm text-[#5a6378] transition hover:text-[#141b2e]"
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[#141b2e]">Legal</h4>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "Privacy policy", href: "/privacy" },
                { label: "Terms of service", href: "/terms" },
                { label: "Not legal advice", href: "/terms" },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.href} className="text-sm text-[#5a6378] transition hover:text-[#141b2e]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[#eef0f6] pt-6 text-xs text-[#8a92a6] sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} RapidAct. All rights reserved.</span>
          <span>Regulation (EU) 2024/1689 · Article 50 applies from 2 August 2026</span>
        </div>
      </div>
    </footer>
  );
}
