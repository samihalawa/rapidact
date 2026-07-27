import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Seo from "@/components/Seo";
import JsonLd, { ORG_LD, PRODUCT_LD, faqLd } from "@/components/JsonLd";
import TrustBar from "@/components/TrustBar";
import Hero from "@/sections/Hero";
import ReportOffer from "@/sections/ReportOffer";
import HowItWorks from "@/sections/HowItWorks";
import Specialist from "@/sections/Specialist";
import Pricing from "@/sections/Pricing";
import Features from "@/sections/Features";
import Faq, { FAQS } from "@/sections/Faq";
import { useI18n } from "@/lib/i18n";
import { HOME_COPY } from "@/data/localizedHome";

export default function Home() {
  const { lang } = useI18n();
  const copy = HOME_COPY[lang];

  return (
    <div className="paper min-h-screen">
      <Seo
        title={copy.seoTitle}
        description={copy.seoDescription}
      />
      <JsonLd data={[ORG_LD, PRODUCT_LD, faqLd(FAQS)]} />
      <SiteNav />
      <main>
        <Hero />
        <TrustBar />
        <Features />
        <ReportOffer />
        <HowItWorks />
        <Specialist />
        <Pricing />
        <Faq />
      </main>
      <SiteFooter />
    </div>
  );
}
