import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { CONVERT } from "@/config";

export default function SiteNav() {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/40 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src="/icons/logo-32.png" alt="RapidAct logo" className="h-7 w-7 rounded-lg" />
          <span className="text-[17px] font-bold tracking-tight text-[#141b2e]">RapidAct</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-[#5a6378] md:flex">
          <a href="/#report" className="transition hover:text-[#141b2e]">
            The report
          </a>
          <a href="/#features" className="transition hover:text-[#141b2e]">
            Free tools
          </a>
          <Link to="/article-50" className="transition hover:text-[#141b2e]">
            Article 50 guide
          </Link>
          <Link to="/learn" className="transition hover:text-[#141b2e]">
            Learn
          </Link>
          <a href="/#faq" className="transition hover:text-[#141b2e]">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="hidden text-sm font-medium text-[#5a6378] sm:inline-flex"
            onClick={() => navigate(CONVERT.scanner)}
          >
            Free scan
          </Button>
          <Button
            className="rounded-full bg-[#141b2e] px-5 text-sm font-semibold text-white hover:bg-[#232c4a]"
            onClick={() => navigate(CONVERT.report)}
          >
            Get my report
          </Button>
        </div>
      </div>
    </header>
  );
}
