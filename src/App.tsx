import {
  lazy,
  Suspense,
  useEffect,
  type ComponentType,
  type LazyExoticComponent,
} from "react";
import { Routes, Route, useLocation } from "react-router";
import { MessageCircle } from "lucide-react";
import { CONVERT } from "./config";
import { useI18n } from "@/lib/i18n";
import Analytics from "@/components/Analytics";

type PageModule = { default: ComponentType };
type RouteComponent = ComponentType | LazyExoticComponent<ComponentType>;

const pageModules = import.meta.glob<PageModule>("./pages/*.tsx", {
  // Vite replaces this value for each client/SSR build. The literal cast keeps
  // TypeScript on the lazy overload while the SSR build still receives `true`.
  eager: import.meta.env.SSR as false,
}) as unknown as Record<
  string,
  PageModule | (() => Promise<PageModule>)
>;

function page(path: string): RouteComponent {
  const module = pageModules[path];
  if (!module) throw new Error(`Missing route module: ${path}`);
  return import.meta.env.SSR
    ? (module as PageModule).default
    : lazy(module as () => Promise<PageModule>);
}

const Home = page("./pages/Home.tsx");
const Scanner = page("./pages/Scanner.tsx");
const Privacy = page("./pages/Privacy.tsx");
const Terms = page("./pages/Terms.tsx");
const Guide = page("./pages/Guide.tsx");
const RequirementPage = page("./pages/RequirementPage.tsx");
const PlatformPage = page("./pages/PlatformPage.tsx");
const ContentHub = page("./pages/ContentHub.tsx");
const ContentPage = page("./pages/ContentPage.tsx");
const Report = page("./pages/Report.tsx");
const ExampleReport = page("./pages/ExampleReport.tsx");
const Partners = page("./pages/Partners.tsx");
const Contact = page("./pages/Contact.tsx");
const NotFound = page("./pages/NotFound.tsx");

export default function App() {
  const { t } = useI18n();
  const { pathname } = useLocation();
  const isConversionFlow = /(^|\/)(report|start|contact)\/?$/.test(pathname);

  useEffect(() => {
    document.body.toggleAttribute("data-conversion-flow", isConversionFlow);
    return () => document.body.removeAttribute("data-conversion-flow");
  }, [isConversionFlow]);

  return (
    <>
      <Analytics />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:lang" element={<Home />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/:lang/scanner" element={<Scanner />} />
          <Route path="/article-50" element={<Guide />} />
          <Route path="/:lang/article-50" element={<Guide />} />
          <Route path="/requirements/:slug" element={<RequirementPage />} />
          <Route
            path="/:lang/requirements/:slug"
            element={<RequirementPage />}
          />
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
          <Route path="/contact" element={<Contact />} />
          <Route path="/:lang/contact" element={<Contact />} />
          {/* Legacy intake path — kept so old links and payment redirects still land. */}
          <Route path="/start" element={<Report />} />
          <Route path="/:lang/start" element={<Report />} />
          {/* Markdown content system: /answers/x, /es/vendors/y, … */}
          <Route path="/:lang?/:type/:slug" element={<ContentPage />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/:lang/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/:lang/terms" element={<Terms />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {!isConversionFlow && (
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
      )}
    </>
  );
}
