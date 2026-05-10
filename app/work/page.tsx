import Footer from "@/components/FooterSection";
import Projects from "@/components/sections/work/ProjectSectionWork";
import Hero from "@/components/sections/work/HeroSectionWork"

export default function Home() {
  return (
    <>
    <Hero/>
    <Projects/>
    <Footer footerImage="/images/footer works page.png" footerLogo="/images/gridisim-blur bgblack.png" footerBgColor="bg-black" footerFontColor="text-white" footerBorderColor="border-white"/>
    </>
  );
}