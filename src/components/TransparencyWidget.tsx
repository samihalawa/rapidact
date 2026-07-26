import { useEffect, useState } from "react";
import { X, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router";
import { CONVERT } from "@/config";

const STORAGE_KEY = "rapidact-widget-closed";

/**
 * Our own product running on our own site: the Article 50 transparency badge.
 *
 * Deliberately plain. This badge is what a customer's visitors will see on their
 * site, so it has to look like a compliance notice rather than a promotion. A
 * glowing gradient chip would undermine the thing it is demonstrating.
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
        <div className="hairline mb-2 w-80 border bg-white p-5 shadow-lg">
          <p className="ink text-[13px] font-semibold">This badge is the product, running live</p>
          <p className="ink-soft mt-2 text-[13px] leading-relaxed">
            What you are looking at is the Article 50 disclosure layer installed on our own site,
            the same component your visitors would see on yours. Scanning your site and installing
            this layer are free. Establishing which obligations apply to your company is what the
            €99 assessment answers.
          </p>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => navigate(CONVERT.report)}
              className="flex-1 rounded bg-[#16181d] py-2 text-[13px] font-semibold text-white hover:bg-[#2b2f38]"
            >
              Request assessment
            </button>
            <button
              onClick={() => navigate(CONVERT.scanner)}
              className="hairline ink flex-1 rounded border bg-white py-2 text-[13px] font-semibold hover:bg-[#f7f7f5]"
            >
              Free scan
            </button>
          </div>
        </div>
      )}

      <div
        role="note"
        aria-label="AI transparency disclosure"
        className="hairline flex items-center gap-2 rounded border bg-white py-1.5 pr-2 pl-2.5 shadow-sm"
      >
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2"
          aria-expanded={open}
          aria-label="About this AI transparency badge"
        >
          <ShieldCheck className="h-4 w-4 text-[#1f3a5f]" />
          <span className="text-left leading-tight">
            <span className="ink block text-[11px] font-semibold">AI transparency</span>
            <span className="ink-soft block text-[10px]">by RapidAct</span>
          </span>
        </button>
        <button
          onClick={dismiss}
          aria-label="Dismiss AI transparency badge"
          className="ink-soft ml-1 hover:text-[#16181d]"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
