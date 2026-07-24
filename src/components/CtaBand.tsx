import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

/** Shared conversion band used on SEO pages. */
export default function CtaBand() {
  const navigate = useNavigate();
  return (
    <div className="mt-12 rounded-2xl bg-[#141b2e] p-8 text-white">
      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <p className="text-lg font-extrabold">Free — €0</p>
          <p className="mt-1 text-sm text-white/60">
            Scan + plan + plugin + guides. Do it yourself, keep everything.
          </p>
        </div>
        <div>
          <p className="text-lg font-extrabold text-[#ffd617]">The Pack — €59</p>
          <p className="mt-1 text-sm text-white/60">
            Everything configured for your site, evidence log, 12 months of updates.
          </p>
        </div>
        <div>
          <p className="text-lg font-extrabold">Done For You — €99</p>
          <p className="mt-1 text-sm text-white/60">
            We install it all on your website and verify it live.
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          className="rounded-full bg-[#ffd617] font-bold text-[#141b2e] hover:bg-[#ffe44d]"
          onClick={() => navigate("/scanner")}
        >
          Scan your site free
        </Button>
        <Button
          variant="outline"
          className="rounded-full border-white/25 bg-transparent text-white hover:bg-white/10"
          onClick={() => navigate("/#pricing")}
        >
          Compare options
        </Button>
      </div>
    </div>
  );
}
