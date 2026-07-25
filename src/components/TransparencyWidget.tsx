import { useEffect, useState } from "react";
import { X, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router";

const STORAGE_KEY = "rapidact-widget-closed";

/**
 * Our own product, running on our own site: the floating Article 50
 * transparency badge — small, closable, and a live demo for prospects.
 */
export default function TransparencyWidget() {
  const [closed, setClosed] = useState(true); // hidden until hydrated
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setClosed(localStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  const dismiss = () => {
    setClosed(true);
    localStorage.setItem(STORAGE_KEY, "1");
  };

  if (closed) return null;

  return (
    <div className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
      {open && (
        <div className="mb-3 w-72 rounded-2xl border border-[#e7e9f2] bg-white p-5 shadow-2xl">
          <p className="text-sm font-extrabold text-[#141b2e]">This is the product, live.</p>
          <p className="mt-1.5 text-xs leading-relaxed text-[#5a6378]">
            The badge you're looking at is the Article 50 disclosure layer running on our own site
            — the same one your visitors would see on yours. Detection is free; the pack is €59; we
            install it for €99.
          </p>
          <button
            onClick={() => navigate("/scanner")}
            className="mt-3 w-full rounded-full bg-[#141b2e] py-2 text-xs font-bold text-white hover:bg-[#232c4a]"
          >
            Scan your site free
          </button>
        </div>
      )}

      {/* the badge itself — mirrors the inspiration: gradient ring, shield, byline */}
      <div
        role="note"
        aria-label="AI transparency disclosure"
        className="relative rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 p-[2px] shadow-lg"
      >
        <div className="flex items-center gap-2 rounded-full bg-white/95 py-1.5 pr-2.5 pl-1.5 backdrop-blur">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2"
            aria-expanded={open}
            aria-label="About this AI transparency badge"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500">
              <ShieldCheck className="h-3.5 w-3.5 text-white" />
            </span>
            <span className="leading-none text-left">
              <span className="block text-[11px] font-extrabold text-[#141b2e]">AI Transparency</span>
              <span className="block text-[9px] font-semibold text-[#8a92a6]">
                by <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text font-extrabold text-transparent">RapidAct</span>
              </span>
            </span>
          </button>
          <button
            onClick={dismiss}
            aria-label="Dismiss AI transparency badge"
            className="ml-1 rounded-full p-0.5 text-[#8a92a6] transition hover:bg-[#f1f2f8] hover:text-[#141b2e]"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
