import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Seo from "@/components/Seo";
import Hero from "@/sections/Hero";
import Features from "@/sections/Features";
import HowItWorks from "@/sections/HowItWorks";
import Pricing from "@/sections/Pricing";
import Faq from "@/sections/Faq";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Seo
        title="RapidAct — AI transparency installed on your website | EU AI Act Article 50"
        description="EU AI Act Article 50 requires AI disclosure on your website from 2 Aug 2026. Free scan + plan, free DIY plugin, €59 full pack, or €99 installed for you. No subscriptions."
      />
      <SiteNav />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <Faq />
      </main>
      <SiteFooter />
    </div>
  );
}
