import { ScanSearch, MessageSquareWarning, FolderCheck } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: ScanSearch,
    title: "Scan",
    text: "Run the free scan. In under a minute you see every AI touchpoint we can detect on your site, with evidence and a readiness score.",
  },
  {
    n: "02",
    icon: MessageSquareWarning,
    title: "Disclose",
    text: "Install the plugin or snippet. The AI disclosure appears above your chat widget — clearly, at first contact, like Article 50(1) demands.",
  },
  {
    n: "03",
    icon: FolderCheck,
    title: "Evidence",
    text: "Every disclosure view is logged with a timestamp. When someone asks 'prove it', you export the file instead of panicking.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="mesh-bg py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-bold tracking-wide text-[#6d5df6] uppercase">How it works</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#141b2e] sm:text-4xl">
            Three steps. Zero legal jargon.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="rounded-2xl border border-white/70 bg-white/80 p-7 shadow-sm backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#141b2e]">
                  <s.icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-3xl font-extrabold text-[#e7e9f2]">{s.n}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-[#141b2e]">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5a6378]">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-[#fde68a] bg-[#fffbeb] p-6">
          <p className="text-sm leading-relaxed text-[#92400e]">
            <strong>The two-clock problem:</strong> the EU delayed the <em>high-risk</em> AI Act
            deadlines to 2027–2028 — but Article 50 transparency duties were{" "}
            <strong>not</strong> postponed. They apply from <strong>2 August 2026</strong>, to any
            company whose AI touches EU users, at any size. Fines go up to €15M or 3% of worldwide
            turnover.
          </p>
        </div>
      </div>
    </section>
  );
}
