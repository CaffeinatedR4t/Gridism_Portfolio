import Footer from "@/components/FooterSection";
import Projects from "@/components/sections/work/ProjectSectionWork";
import Hero from "@/components/sections/work/HeroSectionWork"

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work",
  robots: "index, follow",
  alternates: {
    canonical: "https://gridism.co/work",
  },
  keywords: [
    // Core Page Identity
    "Gridism portfolio",
    "Gridism case studies",
    "digital agency works",
    "our work",

    // Specific Services Shown
    "campaign branding",
    "web development portfolio",
    "brand revamp",
    "brand identity design",
    "global market branding",

    // Technical Capabilities & Niches 
    "full-stack web development",
    "3D product visualization",
    "interactive web experiences",
    "creative engineering portfolio",
    "custom CMS development",
    "AI application prototyping",

    // Target Audience / Intent
    "lifestyle brand digital solutions",
    "tech brand digital strategy",
    "creative digital solutions Jakarta"
  ]
};

export default function Home() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://gridism.co"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Our Work",
        "item": "https://gridism.co/work" // The current page
      }
    ]
  };

  return (
    <>
     <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Hero />
      <Projects />
      <Footer footerImage="/images/Work Footer.webp" footerLogo="/images/ICON GRADIENT TM 2.png" footerBgColor="bg-[#060606]" footerFontColor="text-white" footerBorderColor="border-white" />
    </>
  );
}