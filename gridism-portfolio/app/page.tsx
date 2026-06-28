import HeroAndBrandSection from "@/components/sections/home/HeroAndBrandSection";
import OurCoreServiceSection from "@/components/sections/home/OurCoreServiceSection";
import KeyFeaturesSection from "@/components/sections/home/KeyFeaturesSection";
import StickyFeatureCards from "@/components/sections/home/StickyFeatureCards";
import OurCoreProcessSection from "@/components/sections/home/OurCoreProcessSection";
import OurMainClientsSection from "@/components/sections/home/OurMainClientsSection";
import FooterSection from "@/components/FooterSection";

import { Metadata } from "next";

export const metadata: Metadata = {  
  robots: "index, follow",
  alternates: {
    canonical: "https://gridism.co",
  },
  keywords: [
    "web design", 
    "web development", 
    "software development",  
    "branding", 
    "visual identity", 
    "SaaS", 
    "UI/UX design",
    "research development"
  ]
};

export default function Home() {
  return (
    <>
      <HeroAndBrandSection />
      <OurCoreServiceSection />
      <KeyFeaturesSection />
      <StickyFeatureCards />
      <OurCoreProcessSection />
      <OurMainClientsSection />
      <FooterSection footerImage="/images/Group 75.png" footerLogo="/images/ICON GRADIENT TM.webp" footerBgColor="bg-[#F9F9F7]" footerFontColor="text-black" footerBorderColor="border-black" />
    </>
  );
}