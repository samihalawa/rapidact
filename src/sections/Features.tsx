import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquareWarning, FileClock, Tags, Layers, BookOpenCheck, RefreshCcw } from "lucide-react";

const features = [
  {
    icon: MessageSquareWarning,
    title: "Visitor AI disclosure",
    text: "The clear notice Article 50(1) demands, shown before anyone chats with your AI — in English and Spanish, styled for your site.",
  },
  {
    icon: Tags,
    title: "AI content labels",
    text: "Ready-made labels for AI-generated images, videos and text, with the EU-standard icon set — so synthetic content is marked, not debated.",
  },
  {
    icon: FileClock,
    title: "Timestamped evidence log",
    text: "Every disclosure view is logged with a time and page. When a regulator, client or board asks 'prove it', you export a CSV instead of panicking.",
  },
  {
    icon: Layers,
    title: "Works on your stack",
    text: "WordPress plugin, Wix app, Shopify block, or one script tag for anything else. Your chatbot — Tidio, Botpress, Zendesk, Intercom — stays exactly as it is.",
  },
  {
    icon: BookOpenCheck,
    title: "Plain-English guides",
    text: "No legal jargon, no technical jargon. Each guide tells you what the rule means for your site and the exact clicks to fix it.",
  },
  {
    icon: RefreshCcw,
    title: "Rule updates for 12 months",
    text: "The regulation and its guidelines keep moving. Your pack stays current with every update for a year — included.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-bold tracking-wide text-[#6d5df6] uppercase">What gets installed</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#141b2e] sm:text-4xl">
            Everything Article 50 asks for, on your website
          </h2>
          <p className="mt-3 text-lg text-[#5a6378]">
            Not a report, not a subscription. Actual things installed on your actual site — free if
            you do it yourself, €59 for the pack, €99 done for you.
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
