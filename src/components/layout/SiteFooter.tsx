import { Link } from "react-router";

const columns = [
  {
    title: "Product",
    links: [
      { label: "AI transparency scanner", href: "/scanner" },
      { label: "WordPress plugin", href: "/#features" },
      { label: "Chrome extension", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Article 50 in plain English", href: "/#faq" },
      { label: "Compliance checklist", href: "/#how" },
      { label: "Signature database", href: "/#features" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
      { label: "Not legal advice", href: "/terms" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#e7e9f2] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ffd617] text-[11px] font-extrabold text-[#141b2e]">
                AI
              </span>
              <span className="text-[17px] font-bold text-[#141b2e]">RapidAct</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#5a6378]">
              AI transparency tooling for the EU AI Act. Detect AI touchpoints, disclose them to
              visitors, keep the evidence. Technical tooling — not legal advice.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-[#141b2e]">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.href} className="text-sm text-[#5a6378] transition hover:text-[#141b2e]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[#eef0f6] pt-6 text-xs text-[#8a92a6] sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} RapidAct. All rights reserved.</span>
          <span>Regulation (EU) 2024/1689 · Article 50 applies from 2 August 2026</span>
        </div>
      </div>
    </footer>
  );
}
