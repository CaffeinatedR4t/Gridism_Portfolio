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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Gridism",
    "url": "https://gridism.co",
    "logo": "https://gridism.co/images/ICON BLACK.webp",
    "description": "A creative digital agency specializing in immersive 3D web design, software development, and distinct visual identities.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jakarta",
      "addressCountry": "ID"
    },
    "sameAs": [
      "https://www.instagram.com/gridism.co",
      "https://www.linkedin.com/company/gridismco"
    ]
  };

  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroAndBrandSection />
      <OurCoreServiceSection />
      <KeyFeaturesSection />
      <StickyFeatureCards />
      <OurCoreProcessSection />
      <OurMainClientsSection />
      <FooterSection footerImage="/images/Home Footer.webp" footerLogo="/images/ICON GRADIENT TM.webp" footerBgColor="bg-[#F9F9F7]" footerFontColor="text-black" footerBorderColor="border-black" />
    </>
  );
}