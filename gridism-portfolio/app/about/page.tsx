import FooterSection from "@/components/FooterSection";
import AboutSection from "@/components/sections/about/AboutSection";

import { Metadata } from "next";

export const metadata: Metadata = {  
  title: "About",
  robots: "index, follow",
  alternates: {
    canonical: "https://gridism.co/about",
  },
  keywords: [
  // Core Identity
  "Gridism",
  "Gridism JKT",
  "digital creative agency",
  "brand and digital consultancy",
  "lifestyle brand strategy",
  "tech brand development",
  
  // Design & UX
  "UI/UX design",
  "user interface design",
  "wireframes and prototyping",
  "user analysis research",
  "visual identity",
  
  // Engineering & Development
  "creative engineering",
  "3D web design",
  "front-end development",
  "back-end development",
  "full-stack development",
  "rapid AI prototyping",
  
  // Strategy & Business
  "personal branding",
  "e-commerce strategy",
  "brand consulting",
  "digital experiences",
  "ROI-driven development"
]
};

export default function Home() {
  return (
    <>
    <AboutSection/>
    <FooterSection footerImage="/images/About Footer.webp" footerLogo="/images/ICON BLACK.webp" footerBgColor="bg-[#F9F9F7]" footerFontColor="text-black" footerBorderColor="border-black"/>
    </>
  );
}