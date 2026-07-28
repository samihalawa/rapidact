import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#16181d]">
          Terms of service
        </h1>
        <p className="mt-2 text-sm text-[#6b7280]">Last updated: July 2026</p>
        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-[#5c6370]">
          <section>
            <h2 className="text-lg font-bold text-[#16181d]">
              1. What RapidAct is
            </h2>
            <p className="mt-2">
              RapidAct provides a public website scanner, a configurable
              one-script AI-use notice, educational guides and a paid written
              company assessment. The scanner records rendered public-page
              observations and any inspection blockers; it does not classify
              every AI system or determine legal responsibility.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#16181d]">
              2. Scope of the service
            </h2>
            <p className="mt-2">
              RapidAct provides technical and organisational assessments, not
              legal advice. Our tools support specific transparency steps under
              Regulation (EU) 2024/1689 Article 50. Your organisation remains
              responsible for its legal obligations, and using RapidAct does not
              create a lawyer-client relationship.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#16181d]">
              3. Acceptable use of the scanner
            </h2>
            <p className="mt-2">
              Scan only publicly accessible websites, at reasonable volumes.
              Don't use the scanner to attack, flood or misrepresent third
              parties. We rate-limit and may block abusive usage.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#16181d]">
              4. Fees and refunds
            </h2>
            <p className="mt-2">
              The current €99 assessment is a one-time purchase, not a recurring
              subscription. Any applicable VAT is shown before payment. The
              delivery promise and refund condition displayed on the order page
              form part of the offer. The website scanner and notice are
              currently free.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#16181d]">5. Liability</h2>
            <p className="mt-2">
              The service is provided "as is". To the maximum extent permitted
              by law, RapidAct is not liable for regulatory fines, penalties, or
              indirect damages arising from use or non-use of the tooling. Our
              aggregate liability is capped at the amounts you paid us in the
              preceding 12 months.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#16181d]">6. Contact</h2>
            <p className="mt-2">RapidAct · legal@rapidact.eu</p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
