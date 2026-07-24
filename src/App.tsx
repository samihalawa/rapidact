import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Scanner from "./pages/Scanner";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Guide from "./pages/Guide";
import RequirementPage from "./pages/RequirementPage";
import PlatformPage from "./pages/PlatformPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scanner" element={<Scanner />} />
      <Route path="/article-50" element={<Guide />} />
      <Route path="/requirements/:slug" element={<RequirementPage />} />
      <Route path="/platforms/:slug" element={<PlatformPage />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
