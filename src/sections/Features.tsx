import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScanSearch, Puzzle, Chrome, FileClock, DatabaseZap, Languages } from "lucide-react";

const features = [
  {
    icon: ScanSearch,
    title: "Outside-in scanner",
    text: "Paste any URL. We check 52 known AI chatbot and assistant signatures — scripts, iframes, DOM nodes, globals — and score your disclosure gaps in seconds.",
  },
  {
    icon: Puzzle,
    title: "WordPress plugin",
    text: "Install, one checkbox, done. The visitor disclosure sits above your chat widget in English and Spanish. Detection stays free forever.",
  },
  {
    icon: Chrome,
    title: "Chrome extension",
    text: "Scan any website from your browser — your competitors, your prospects, your own properties. One click, instant evidence.",
  },
  {
    icon: FileClock,
    title: "Evidence log",
    text: "Every disclosure view is timestamped into your own database. Export the CSV a regulator, auditor or board member asks for.",
  },
  {
    icon: DatabaseZap,
    title: "Signature database",
    text: "52 AI platforms tracked — Tidio, Zendesk, Intercom, Landbot, Chatbase, oct8ne and more — updated as vendors and rules evolve.",
  },
  {
    icon: Languages,
    title: "EN/ES by default",
    text: "The only Article 50 toolkit shipping English and Spanish disclosures out of the box. More EU languages on the roadmap.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-bold tracking-wide text-[#6d5df6] uppercase">Product</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#141b2e] sm:text-4xl">
            Everything Article 50 asks for, in one install
          </h2>
          <p className="mt-3 text-lg text-[#5a6378]">
            No consultants, no custom code, no 40-page report. Tooling that detects, discloses and
            documents.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card
              key={f.title}
              className="border-[#e7e9f2] bg-white shadow-none transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0eeff]">
                  <f.icon className="h-5 w-5 text-[#6d5df6]" />
                </div>
                <CardTitle className="pt-2 text-base font-bold text-[#141b2e]">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-[#5a6378]">{f.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
