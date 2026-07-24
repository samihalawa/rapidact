import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Scanner from "./pages/Scanner";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scanner" element={<Scanner />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
