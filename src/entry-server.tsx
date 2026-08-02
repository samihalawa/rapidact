import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";
import { I18nProvider } from "@/lib/i18n";
import { SeoCollectorProvider, type SeoData } from "@/components/Seo";

export interface RenderedRoute {
  appHtml: string;
  seo: SeoData;
}

export function renderRoute(pathname: string): RenderedRoute {
  const collector: { current: SeoData | null } = { current: null };
  const appHtml = renderToString(
    <StrictMode>
      <StaticRouter location={pathname}>
        <I18nProvider>
          <SeoCollectorProvider collector={collector}>
            <App />
          </SeoCollectorProvider>
        </I18nProvider>
      </StaticRouter>
    </StrictMode>
  );

  if (!collector.current) {
    throw new Error(`Route ${pathname} rendered without SEO metadata`);
  }

  return { appHtml, seo: collector.current };
}
