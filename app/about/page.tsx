import FooterSection from "@/components/FooterSection";
import AboutSection from "@/components/sections/about/AboutSection";

export default function Home() {
  return (
    <>
    <AboutSection/>
    <FooterSection footerImage="/images/Group 75.png" footerLogo="/images/gridism-logo - Copy.svg" footerBgColor="bg-white" footerFontColor="text-black" footerBorderColor="border-black"/>
    </>
  );
}