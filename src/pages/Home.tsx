import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Seo from "@/components/Seo";
import JsonLd, { ORG_LD, PRODUCT_LD, faqLd } from "@/components/JsonLd";
import Hero from "@/sections/Hero";
import ReportOffer from "@/sections/ReportOffer";
import HowItWorks from "@/sections/HowItWorks";
import Pricing from "@/sections/Pricing";
import Features from "@/sections/Features";
import Faq, { FAQS } from "@/sections/Faq";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="AI Act Complete Pre-Consultory Report — know exactly where your company stands | RapidAct"
        description="Tell us about your company and the AI you use. A specialist assesses your real EU AI Act exposure and sends the complete report plus a professional contact assessment to your inbox within 24–48h. €99 one-time, any company size. Free site scanner and self-install disclosure layer included."
      />
      <JsonLd data={[ORG_LD, PRODUCT_LD, faqLd(FAQS)]} />
      <SiteNav />
      <main>
        <Hero />
        <ReportOffer />
        <HowItWorks />
        <Pricing />
        <Features />
        <Faq />
      </main>
      <SiteFooter />
    </div>
  );
}
