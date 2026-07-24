import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#141b2e]">Terms of service</h1>
        <p className="mt-2 text-sm text-[#8a92a6]">Last updated: July 2026</p>
        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-[#3d445c]">
          <section>
            <h2 className="text-lg font-bold text-[#141b2e]">1. What RapidAct is</h2>
            <p className="mt-2">
              RapidAct provides technical transparency tooling: a website scanner, a WordPress plugin,
              a browser extension and related software that detect AI touchpoints, display AI
              disclosures and keep evidence logs.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#141b2e]">2. Not legal advice — ever</h2>
            <p className="mt-2">
              RapidAct is not a law firm and provides no legal advice. Our tools implement and
              document specific technical duties under Regulation (EU) 2024/1689 Article 50.
              Compliance with your full legal obligations remains your responsibility. No use of
              RapidAct creates a lawyer-client relationship, and "compliant" claims made by any tool —
              ours included — should be treated with scepticism.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#141b2e]">3. Acceptable use of the scanner</h2>
            <p className="mt-2">
              Scan only publicly accessible websites, at reasonable volumes. Don't use the scanner to
              attack, flood or misrepresent third parties. We rate-limit and may block abusive usage.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#141b2e]">4. Subscriptions</h2>
            <p className="mt-2">
              Paid plans renew monthly or yearly until cancelled. You can cancel anytime; access runs
              to the end of the paid period. Prices exclude VAT. Free-tier features (detection,
              scanning) may change but the core scanner stays free.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#141b2e]">5. Liability</h2>
            <p className="mt-2">
              The service is provided "as is". To the maximum extent permitted by law, RapidAct is not
              liable for regulatory fines, penalties, or indirect damages arising from use or non-use
              of the tooling. Our aggregate liability is capped at the amounts you paid us in the
              preceding 12 months.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#141b2e]">6. Contact</h2>
            <p className="mt-2">RapidAct · legal@rapidact.eu</p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
