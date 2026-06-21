"use client";

import { useEffect, useState } from "react";

/* ─── carousel image sets ────────────────────────────────────────────────── */
const topRowImages = [
  { w: 312, h: 255, src: "/images/Artboard 1.png", alt: "Portfolio 1" },
  { w: 313, h: 255, src: "/images/Artboard 1_2.png", alt: "Portfolio 2" },
  { w: 313, h: 255, src: "/images/Artboard 1_3.png", alt: "Portfolio 3" },
  { w: 313, h: 256, src: "/images/Artboard 1_5.png", alt: "Portfolio 4" },
  { w: 312, h: 255, src: "/images/Artboard 1_1.png", alt: "Portfolio 5" },
  { w: 312, h: 255, src: "/images/Artboard 1_10.png", alt: "Portfolio 6" },
  { w: 311, h: 254, src: "/images/Artboard 1_13.png", alt: "Portfolio 7" },
];

const bottomRowImages = [
  { w: 250, h: 204, src: "/images/Artboard 1_4.png", alt: "Portfolio 8" },
  { w: 250, h: 204, src: "/images/Artboard 1_6.png", alt: "Portfolio 9" },
  { w: 249, h: 203, src: "/images/Artboard 1_7.png", alt: "Portfolio 10" },
  { w: 250, h: 204, src: "/images/Artboard 1_8.png", alt: "Portfolio 11" },
  { w: 249, h: 203, src: "/images/Artboard 1_11.png", alt: "Portfolio 12" },
  { w: 248, h: 203, src: "/images/Artboard 1_14.png", alt: "Portfolio 13" },
  { w: 248, h: 203, src: "/images/Artboard 1_12.png", alt: "Portfolio 14" },
  { w: 249, h: 203, src: "/images/Artboard 1_9.png", alt: "Portfolio 15" },
  { w: 249, h: 203, src: "/images/Artboard 1_15.png", alt: "Portfolio 16" },
];

/* ─── MarqueeRow — mirrors AboutSection double-block pattern exactly ─────── */
const MarqueeRow = ({
  images,
  direction = "left",
  gap = 20,
}: {
  images: { w: number; h: number; src: string; alt: string }[];
  direction?: "left" | "right";
  gap?: number;
}) => {
  const animClass =
    direction === "left" ? "run-marquee-left" : "run-marquee-right";

  const block = (suffix: string) => (
    <div
      key={suffix}
      className="flex shrink-0"
      style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}
    >
      {images.map((img, i) => (
        <div
          key={`${suffix}-${i}`}
          style={{ flexShrink: 0, width: `${img.w}px`, height: `${img.h}px` }}
        >
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      {/* one flex track — two identical blocks side by side, same as AboutSection */}
      <div className={`flex shrink-0 w-max ${animClass}`}>
        {block("orig")}
        {block("clone")}
      </div>
    </div>
  );
};

/* ─── HeroAndBrandSection ────────────────────────────────────────────────── */
const HeroAndBrandSection = () => {
  const [viewport, setViewport] = useState({ w: 1440, h: 900 });

  useEffect(() => {
    const update = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section className="relative w-full gridism-content-layer" data-theme="dark">

      {/* ── PART 1: HERO (100svh) ──────────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "100svh" }}
      >
        {/* White Base Background Layer */}
        <div className="absolute inset-0 bg-white" />

        {/* Black Background Placeholder */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <div 
            className="bg-black"
            style={{ 
              width: "512px", 
              height: "333px", 
              transform: "rotate(90deg)" 
            }}
          />
        </div>

        {/* Title Container - No z-index to avoid isolation */}
        <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
          <div
            className="text-center"
            style={{ 
              width: "min(92vw, 1300px)",
              mixBlendMode: "difference",
              pointerEvents: "auto"
            }}
          >
            <h1
              style={{
                fontFamily: "'Switzer', sans-serif",
                fontWeight: 400,
                color: "#FFFFFF",
                margin: 0,
                lineHeight: 1.0,
                fontSize: "clamp(60px, 11vw, 150px)",
                letterSpacing: "-0.02em"
              }}
            >
              A New Order<br />of Design
            </h1>
          </div>
        </div>
      </div>

      {/* ── PART 2: BRAND + CAROUSEL (100svh) ─────────────────────────── */}
      <div
        className="relative w-full bg-black flex flex-col items-center justify-center overflow-hidden pt-20 lg:pt-32"
        data-theme="dark"
        style={{ height: "100svh" }}
      >
        {/* Top Header Row (Logo, King, Text) */}
        <div 
          className="flex flex-row items-center justify-between w-full px-10 lg:px-[70px]"
        >
          {/* Left: Logo */}
          <div className="flex-1 flex justify-start">
            <img
              src="/images/Alternative Grid Wordmark with Icon.webp"
              alt="G R I D I S M"
              style={{ width: "244px", height: "auto", objectFit: "contain" }}
            />
          </div>

          {/* Center: King Piece */}
          <div className="flex-shrink-0 flex justify-center items-center">
            <img
              src="/images/king.webp"
              alt="King chess piece"
              style={{ height: "227px", width: "auto", objectFit: "contain" }}
            />
          </div>

          {/* Right: Tagline */}
          <div className="flex-1 flex justify-end">
            <p
              className="text-right text-white"
              style={{
                fontFamily: "'Switzer', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(18px, 2vw, 26px)",
                lineHeight: "1.2",
                maxWidth: "351px",
                margin: 0,
              }}
            >
              Driving Global Scale Through Brand Identity and Digital Innovation.
            </p>
          </div>
        </div>

        {/* Overlapping Carousels */}
        <div className="relative w-full" style={{ height: "405px" }}>
          {/* Bottom carousel (Smaller) — Behind */}
          <div className="absolute w-full" style={{ top: "201px", zIndex: 0 }}>
            <MarqueeRow images={bottomRowImages} direction="right" gap={20} />
          </div>
          
          {/* Top carousel (Bigger) — In front */}
          <div className="absolute w-full" style={{ top: "0px", zIndex: 10, filter: "drop-shadow(0px 20px 31.75px rgba(0, 0, 0, 0.69))" }}>
            <MarqueeRow images={topRowImages} direction="left" gap={20} />
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroAndBrandSection;