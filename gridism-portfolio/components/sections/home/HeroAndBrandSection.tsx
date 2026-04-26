"use client";

import { useEffect, useMemo, useState } from "react";

/* ─── carousel image sets ────────────────────────────────────────────────── */
const topRowImages = [
  { w: 260, h: 170, src: "/images/ezzralef.png", alt: "Portfolio 1" },
  { w: 260, h: 170, src: "/images/ezzralef.png", alt: "Portfolio 2" },
  { w: 220, h: 170, src: "/images/ezzralef.png", alt: "Portfolio 3" },
  { w: 265, h: 170, src: "/images/ezzralef.png", alt: "Portfolio 4" },
  { w: 215, h: 170, src: "/images/ezzralef.png", alt: "Portfolio 5" },
  { w: 340, h: 170, src: "/images/ezzralef.png", alt: "Portfolio 6" },
];

const bottomRowImages = [
  { w: 175, h: 100, src: "/images/ezzralef.png", alt: "Portfolio 7" },
  { w: 190, h: 100, src: "/images/ezzralef.png", alt: "Portfolio 8" },
  { w: 165, h: 100, src: "/images/ezzralef.png", alt: "Portfolio 9" },
  { w: 205, h: 100, src: "/images/ezzralef.png", alt: "Portfolio 10" },
  { w: 155, h: 100, src: "/images/ezzralef.png", alt: "Portfolio 11" },
  { w: 180, h: 100, src: "/images/ezzralef.png", alt: "Portfolio 12" },
  { w: 175, h: 100, src: "/images/ezzralef.png", alt: "Portfolio 13" },
];

/* ─── MarqueeRow — mirrors AboutSection double-block pattern exactly ─────── */
const MarqueeRow = ({
  images,
  direction = "left",
  gap = 14,
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

  const objectPosition = useMemo(() => {
    const aspect = viewport.w / viewport.h;
    let y = "50%";
    if (aspect >= 1.8) y = "45%";
    if (aspect >= 2.1) y = "42%";
    if (aspect <= 1.2) y = "55%";
    return `center ${y}`;
  }, [viewport.w, viewport.h]);

  const VerticalText = ({
    children,
    leftPercent,
    topPercent,
  }: {
    children: string;
    leftPercent: number;
    topPercent: number;
  }) => (
    <p
      className="absolute text-white whitespace-nowrap"
      style={{
        left: `${leftPercent}%`,
        top: `${topPercent}%`,
        transform: "rotate(90deg)",
        transformOrigin: "left top",
        fontSize: "clamp(9px, 0.7vw, 10px)",
        lineHeight: "12px",
        fontFamily: "'Switzer', sans-serif",
        fontWeight: 400,
      }}
    >
      {children}
    </p>
  );

  return (
    <section className="relative w-full" data-theme="dark">

      {/* ── PART 1: HERO (100svh) ──────────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "100svh" }}
      >
        {/* Background */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/images/about-hero.webp"
            alt=""
            aria-hidden="true"
            className="w-full h-full"
            style={{ objectFit: "cover", objectPosition, display: "block" }}
          />
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none">
          {[11.1, 26.4, 41.7, 56.9, 72.2, 87.5].map((pct, i) => (
            <div
              key={i}
              className="absolute top-0 w-px h-full"
              style={{
                left: `${pct}%`,
                background: "rgba(255,255,255,0.20)",
                mixBlendMode: "overlay",
              }}
            />
          ))}
        </div>

        {/* Labels + title */}
        <div className="relative z-10 w-full h-full">
          <VerticalText leftPercent={12} topPercent={8.2}>Human Centric Approach</VerticalText>
          <VerticalText leftPercent={27.3} topPercent={16.3}>Commitment to Crafting</VerticalText>
          <VerticalText leftPercent={57.8} topPercent={8.5}>Structure with Purpose</VerticalText>
          <VerticalText leftPercent={12} topPercent={31}>Consistency Loyalty</VerticalText>
          <VerticalText leftPercent={42.6} topPercent={30.2}>Growth by Design</VerticalText>
          <VerticalText leftPercent={73.2} topPercent={40}>Creativity within Order</VerticalText>
          <VerticalText leftPercent={88.4} topPercent={42.6}>Digital Creative Agency</VerticalText>
          <VerticalText leftPercent={50.3} topPercent={50.6}>Grit Builds Precision</VerticalText>

          <div
            className="absolute left-1/2 top-1/2 text-center"
            style={{ transform: "translate(-50%, -50%)", width: "min(92vw, 1100px)" }}
          >
            <h1
              style={{
                fontFamily: "'Switzer', sans-serif",
                fontWeight: 400,
                color: "#FFFFFF",
                margin: 0,
                lineHeight: 1.05,
                fontSize: "clamp(44px, 6vw, 90px)",
              }}
            >
              A NEW ORDER
            </h1>

            <div
              className="flex items-center justify-center"
              style={{ gap: "clamp(12px, 2vw, 24px)" }}
            >
              <h2
                style={{
                  fontFamily: "'Switzer', sans-serif",
                  fontWeight: 400,
                  color: "#FFFFFF",
                  margin: 0,
                  lineHeight: 1.05,
                  fontSize: "clamp(44px, 6vw, 90px)",
                }}
              >
                OF
              </h2>

              <div className="relative inline-block">
                <div
                  className="absolute inset-0 -z-10"
                  style={{
                    background:
                      "linear-gradient(90deg, #000000 0%, rgba(174,174,174,0) 100%)",
                    backgroundBlendMode: "overlay",
                  }}
                />
                <h2
                  style={{
                    fontFamily: "'Switzer', sans-serif",
                    fontWeight: 400,
                    color: "#FFFFFF",
                    margin: 0,
                    lineHeight: 1.05,
                    fontSize: "clamp(44px, 6vw, 90px)",
                    paddingLeft: "clamp(10px, 1.2vw, 16px)",
                    paddingRight: "clamp(10px, 1.2vw, 16px)",
                  }}
                >
                  DESIGN
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── KING PIECE — centered at the seam ─────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "100svh",
          transform: "translate(-50%, -50%)",
          height: "clamp(350px, 16vw, 230px)",
          width: "auto",
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        <img
          src="/images/king.webp"
          alt="King chess piece"
          style={{ height: "100%", width: "auto", objectFit: "contain", display: "block" }}
        />
      </div>

      {/* ── PART 2: BRAND + CAROUSEL (100svh) ─────────────────────────── */}
      <div
        className="relative w-full bg-black"
        data-theme="dark"
        style={{
          height: "100svh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Logo — padding-top creates breathing room below the king piece */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            /* half the king height so logo clears the overlap zone */
            paddingTop: "clamp(80px, 10vw, 130px)",
            paddingBottom: "20px",
          }}
        >
          <img
            src="/images/Salinan hero-logo-horizontal.png"
            alt="G R I D I S M"
            style={{
              width: "min(780px, 65vw)",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Tagline */}
        <p
          className="text-center text-white"
          style={{
            fontFamily: "'Switzer', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(14px, 1.8vw, 24px)",
            lineHeight: "1.4",
            maxWidth: "min(680px, 88vw)",
            margin: 0,
            paddingBottom: "32px",
          }}
        >
          Driving Global Scale Through Brand Identity and Digital Innovation.
        </p>

        {/* Top carousel — scrolls left, AboutSection double-block pattern */}
        <div style={{ width: "100%", marginBottom: "10px" }}>
          <MarqueeRow images={topRowImages} direction="left" gap={14} />
        </div>

        {/* Bottom carousel — scrolls right */}
        <div style={{ width: "100%", paddingBottom: "28px" }}>
          <MarqueeRow images={bottomRowImages} direction="right" gap={14} />
        </div>
      </div>

    </section>
  );
};

export default HeroAndBrandSection;