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
import TransparencyWidget from "./components/TransparencyWidget";

export default function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scanner" element={<Scanner />} />
      <Route path="/article-50" element={<Guide />} />
      <Route path="/requirements/:slug" element={<RequirementPage />} />
      <Route path="/platforms/:slug" element={<PlatformPage />} />
      <Route path="/learn" element={<ContentHub />} />
      <Route path="/:lang?/learn" element={<ContentHub />} />
      <Route path="/report" element={<Report />} />
      <Route path="/example-report" element={<ExampleReport />} />
      {/* Legacy intake path — kept so old links and payment redirects still land. */}
      <Route path="/start" element={<Report />} />
      {/* Markdown content system: /answers/x, /es/vendors/y, … */}
      <Route path="/:lang?/:type/:slug" element={<ContentPage />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<Home />} />
    </Routes>
    <TransparencyWidget />
    </>
  );
}
