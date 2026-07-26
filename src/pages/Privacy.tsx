import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#16181d]">
          Privacy policy
        </h1>
        <p className="mt-2 text-sm text-[#6b7280]">Last updated: July 2026</p>
        <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-[#5c6370]">
          <section>
            <h2 className="text-lg font-bold text-[#16181d]">
              What we collect
            </h2>
            <p className="mt-2">
              <strong>Scanner:</strong> when you scan a URL, we fetch that
              page's public HTML and store the URL, the resulting score and the
              report so you can retrieve them.
              <strong> Email capture:</strong> if you give us your email, we
              store it with the scanned URL and the form source to send you what
              you asked for. That's all.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#16181d]">
              What the disclosure badge collects
            </h2>
            <p className="mt-2">
              The one-script RapidAct badge downloads a JavaScript file from
              rapidact.eu and renders the disclosure configured by the site
              operator. It does not set cookies, use browser storage, identify
              visitors, send interaction events or create an evidence log. The
              site loading the badge may still have its own analytics and
              privacy practices.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#16181d]">
              What we never do
            </h2>
            <p className="mt-2">
              We don't sell data, we don't run third-party trackers on this
              site, and we don't build advertising profiles. Scan results are
              never published with identifying site ownership.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#16181d]">
              Your rights (GDPR)
            </h2>
            <p className="mt-2">
              You can request access, correction or deletion of your email and
              associated scan data at any time via privacy@rapidact.eu. We
              respond within 30 days. Our legal basis is your consent (email
              capture) and legitimate interest (operating the scanner).
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-[#16181d]">Contact</h2>
            <p className="mt-2">RapidAct · privacy@rapidact.eu</p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
