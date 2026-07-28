import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Scanner from "./pages/Scanner";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Guide from "./pages/Guide";
import RequirementPage from "./pages/RequirementPage";
import PlatformPage from "./pages/PlatformPage";
import ContentHub from "./pages/ContentHub";
import ContentPage from "./pages/ContentPage";
import Report from "./pages/Report";
import ExampleReport from "./pages/ExampleReport";
import Partners from "./pages/Partners";
import { MessageCircle } from "lucide-react";
import { CONVERT } from "./config";
import { useI18n } from "@/lib/i18n";
import Analytics from "@/components/Analytics";

export default function App() {
  const { t } = useI18n();
  return (
    <>
      <Analytics />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:lang" element={<Home />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/:lang/scanner" element={<Scanner />} />
        <Route path="/article-50" element={<Guide />} />
        <Route path="/:lang/article-50" element={<Guide />} />
        <Route path="/requirements/:slug" element={<RequirementPage />} />
        <Route path="/:lang/requirements/:slug" element={<RequirementPage />} />
        <Route path="/platforms/:slug" element={<PlatformPage />} />
        <Route path="/:lang/platforms/:slug" element={<PlatformPage />} />
        <Route path="/learn" element={<ContentHub />} />
        <Route path="/:lang/learn" element={<ContentHub />} />
        <Route path="/report" element={<Report />} />
        <Route path="/:lang/report" element={<Report />} />
        <Route path="/example-report" element={<ExampleReport />} />
        <Route path="/:lang/example-report" element={<ExampleReport />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/:lang/partners" element={<Partners />} />
        {/* Legacy intake path — kept so old links and payment redirects still land. */}
        <Route path="/start" element={<Report />} />
        <Route path="/:lang/start" element={<Report />} />
        {/* Markdown content system: /answers/x, /es/vendors/y, … */}
        <Route path="/:lang?/:type/:slug" element={<ContentPage />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/:lang/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/:lang/terms" element={<Terms />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <a
        href={CONVERT.whatsapp}
        target="_blank"
        rel="noopener"
        aria-label={`${t("whatsapp")} — RapidAct`}
        data-analytics-event="support_contact_click"
        data-analytics-label="WhatsApp floating widget"
        className="fixed right-4 bottom-4 z-50 inline-flex min-h-12 items-center gap-2 rounded-md bg-[#128c5e] px-3.5 text-[13px] font-bold text-white shadow-lg transition hover:bg-[#0f7a52] focus-visible:ring-4 focus-visible:ring-[#128c5e]/25 focus-visible:outline-none sm:right-6 sm:bottom-6"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        <span className="hidden sm:inline">{t("whatsapp")}</span>
      </a>
    </>
  );
}
