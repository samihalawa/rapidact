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

export default function Home() {
  return (
    <div className="paper min-h-screen">
      <Seo
        title="EU AI Act compliance assessment for your company | RapidAct"
        description="Find out which of your AI systems the EU AI Act covers. A specialist classifies every system, sets out your Article 50 duties and the documentation you must hold, and delivers the written assessment within 24–48h. €99, charged once."
      />
      <JsonLd data={[ORG_LD, PRODUCT_LD, faqLd(FAQS)]} />
      <SiteNav />
      <main>
        <Hero />
        <TrustBar />
        <ReportOffer />
        <HowItWorks />
        <Specialist />
        <Pricing />
        <Features />
        <Faq />
      </main>
      <SiteFooter />
    </div>
  );
}
