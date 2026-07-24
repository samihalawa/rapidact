import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import Hero from "@/sections/Hero";
import Features from "@/sections/Features";
import HowItWorks from "@/sections/HowItWorks";
import Pricing from "@/sections/Pricing";
import Faq from "@/sections/Faq";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
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
