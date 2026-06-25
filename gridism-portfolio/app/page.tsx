import HeroAndBrandSection from "@/components/sections/home/HeroAndBrandSection";
import OurCoreServiceSection from "@/components/sections/home/OurCoreServiceSection";
import KeyFeaturesSection from "@/components/sections/home/KeyFeaturesSection";
import StickyFeatureCards from "@/components/sections/home/StickyFeatureCards";
import OurCoreProcessSection from "@/components/sections/home/OurCoreProcessSection";
import OurMainClientsSection from "@/components/sections/home/OurMainClientsSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <>
      <HeroAndBrandSection />
      <OurCoreServiceSection />
      <KeyFeaturesSection />
      <StickyFeatureCards />
      <OurCoreProcessSection />
      <OurMainClientsSection />
      <FooterSection footerImage="/images/Group 75.png" footerLogo="/images/ICON GRADIENT TM.webp" footerBgColor="bg-white" footerFontColor="text-black" footerBorderColor="border-black"/>
    </>
  );
}