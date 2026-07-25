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
import Start from "./pages/Start";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scanner" element={<Scanner />} />
      <Route path="/article-50" element={<Guide />} />
      <Route path="/requirements/:slug" element={<RequirementPage />} />
      <Route path="/platforms/:slug" element={<PlatformPage />} />
      <Route path="/learn" element={<ContentHub />} />
      <Route path="/:lang?/learn" element={<ContentHub />} />
      <Route path="/start" element={<Start />} />
      {/* Markdown content system: /answers/x, /es/vendors/y, … */}
      <Route path="/:lang?/:type/:slug" element={<ContentPage />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
