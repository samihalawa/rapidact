import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { CONVERT } from "@/config";
import { ENTITY, HAS_ENTITY_DETAILS } from "@/data/company";

export default function SiteNav() {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Utility strip: a reachable phone number above the fold, on every page. */}
      {HAS_ENTITY_DETAILS && (
        <div className="hidden border-b border-[#2b2f38] bg-[#16181d] md:block">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5 sm:px-6">
            <p className="text-[12px] text-white/60">
              EU AI Act Article 50 applies from 2 August 2026
            </p>
            <a
              href={`tel:${ENTITY.phone.replace(/\s/g, "")}`}
              className="mono text-[12px] text-white/80 hover:text-white"
            >
              {ENTITY.phone}
            </a>
          </div>
        </div>
      )}

      <div className="hairline border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <img src="/icons/logo-32.png" alt="" className="h-6 w-6 rounded" />
            <span className="ink text-[16px] font-bold tracking-tight">RapidAct</span>
          </Link>

          <nav className="ink-soft hidden items-center gap-6 text-[14px] md:flex">
            <a href="/#report" className="hover:text-[#16181d]">
              The assessment
            </a>
            <a href="/#pricing" className="hover:text-[#16181d]">
              Fees
            </a>
            <a href="/#features" className="hover:text-[#16181d]">
              Free tools
            </a>
            <Link to="/article-50" className="hover:text-[#16181d]">
              Article 50
            </Link>
            <Link to="/learn" className="hover:text-[#16181d]">
              Guides
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(CONVERT.scanner)}
              className="ink-soft hidden text-[14px] hover:text-[#16181d] sm:inline"
            >
              Free scan
            </button>
            <Button
              className="h-9 rounded bg-[#16181d] px-4 text-[14px] font-semibold text-white hover:bg-[#2b2f38]"
              onClick={() => navigate(CONVERT.report)}
            >
              Request assessment
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
