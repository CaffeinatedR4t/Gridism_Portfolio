"use client";

import { cn } from "@/utils/cn"
import Image from "next/image";
import StickyFooterImage from "./StickyFooterImage";

const theme = {
  typography: {
    fontFooter: "text-black text-[16px] leading-[19px] cursor-pointer hover:opacity-60 transition-opacity no-underline font-['Switzer',_sans-serif]"
  }
}

interface footerProps {
  footerImage: string,
  footerLogo: string,
  footerBgColor: string
  footerFontColor: string
  footerBorderColor: string
}

const FooterSection = ({ footerImage, footerLogo, footerBgColor, footerFontColor, footerBorderColor }: footerProps) => {
  return (
    <section className="relative gridism-footer-layer" data-theme="black">
      <StickyFooterImage imageSrc={footerImage} />

      <div style={{ position: "relative", zIndex: 10 }}>
        {/* ── White upper footer ── */}
        <div className={cn(footerBgColor,"min-h-screen relative")}>
          <div className="absolute inset-0 flex flex-col items-center justify-center">

            {/* Three-column logo row */}
            <div className={cn(footerFontColor,"flex flex-col sm:flex-row items-center justify-center w-full h-auto mx-auto px-6")}>
              <p
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-[0.3em] flex-1 text-center font-medium"
                style={{ fontFamily: "'Switzer', sans-serif" }}
              >
                G R I D I S M
              </p>

              <Image src={footerLogo} alt="logo" width={283} height={283} className="w-[283px] h-auto" />

              <div className="flex flex-col gap-20 items-center justify-center text-center flex-1">
                <p
                  className="text-base sm:text-lg md:text-xl lg:text-2xl leading-[1.2] w-[90%]"
                  style={{ fontFamily: "'Switzer', sans-serif" }}
                >
                  Web Development<br />& Branding Agency
                </p>
                <a
                  href="mailto:hello@gridism.com"
                  className="hidden md:inline-flex items-center gap-2 text-base sm:text-lg md:text-xl lg:text-2xl leading-[29px] cursor-pointer hover:opacity-60 transition-opacity group"
                  style={{ fontFamily: "'Switzer', sans-serif", textDecoration: "none" }}
                >
                  <span className="transition-transform duration-300 ease-in-out group-hover:-translate-x-1">-</span>
                  <span>Contact Us</span>
                  <span className="transition-transform duration-300 ease-in-out group-hover:translate-x-1">-</span>
                </a>
              </div>
            </div>

            {/* Bottom bar */}
            <div className={cn(footerBorderColor, footerFontColor ,"absolute bottom-0 flex justify-between items-center w-screen border-t-1 py-[20px] px-10 lg:px-[70px] box-border")}>
              <p
                className="text-[16px] leading-[19px] m-0"
                style={{ fontFamily: "'Switzer', sans-serif" }}
              >
                @2026
              </p>

              <div className="flex gap-20">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(theme.typography.fontFooter, footerFontColor, "group flex items-center gap-1")}
                >
                  <span className="transition-transform duration-300 ease-in-out group-hover:-translate-x-1">-</span>
                  <span>Instagram</span>
                  <span className="transition-transform duration-300 ease-in-out group-hover:translate-x-1">-</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(theme.typography.fontFooter, footerFontColor, "group flex items-center gap-1")}
                >
                  <span className="transition-transform duration-300 ease-in-out group-hover:-translate-x-1">-</span>
                  <span>LinkedIn</span>
                  <span className="transition-transform duration-300 ease-in-out group-hover:translate-x-1">-</span>
                </a>
              </div>

              <a
                href="/legals"
                className={cn(theme.typography.fontFooter, footerFontColor, "group flex items-center gap-1")}
              >
                <span className="transition-transform duration-300 ease-in-out group-hover:-translate-x-1">-</span>
                <span>Legals</span>
                <span className="transition-transform duration-300 ease-in-out group-hover:translate-x-1">-</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── Footer over sticky image ── */}
        <div className="relative w-full h-[80svh]">

          {/* Gradient overlay removed per request */}

          <div
            className="absolute inset-0 flex items-end"
            style={{ paddingBottom: "48px" }}
          >
            <div
              className="w-full flex flex-row items-end justify-between"
              style={{
                paddingLeft: "60px",
                paddingRight: "60px",
                boxSizing: "border-box",
              }}
            >
              {/* Left — both buttons side by side */}
              <div
                className="flex flex-row items-end"
                style={{ gap: "48px" }}
              >
                {/* OUR WORKS (DETAILED) */}
                <button
                  className="text-white cursor-pointer hover:opacity-70 transition-opacity"
                  style={{
                    fontFamily: "'Switzer', sans-serif",
                    fontSize: "16px",
                    lineHeight: "22px",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    padding: 0,
                  }}
                >
                  OUR WORKS<br />(DETAILED)
                </button>

                {/* LET'S DISCUSS — right beside OUR WORKS */}
                <button
                  className="text-white cursor-pointer hover:opacity-70 transition-opacity"
                  style={{
                    fontFamily: "'Switzer', sans-serif",
                    fontSize: "16px",
                    lineHeight: "22px",
                    background: "none",
                    border: "none",
                    padding: 0,
                    paddingBottom: "2px", /* align baseline with bottom of OUR WORKS (DETAILED) */
                  }}
                >
                  LET&apos;S DISCUSS
                </button>
              </div>

              {/* Right — Gridism logo, same bottom alignment as buttons */}
              <img
                src={"/images/Alternative Grid Logo.webp"}
                alt="Gridism Icon"
                className="h-[80px] lg:h-[120px] w-auto shrink-0 mix-blend-difference object-contain brightness-0 invert"
              />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default FooterSection;