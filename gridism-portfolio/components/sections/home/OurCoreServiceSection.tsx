"use client";

import { useRef, useState, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ─── Parallax Wrapper Component ────────────────────────────────────────── */
/**
 * One-to-one port of the ParallaxMedia logic provided.
 */
const ParallaxGraphic = ({ 
  children, 
  parallax = 25, 
  direction = "vertical", 
  invert = false,
  focalX = 50,
  focalY = 50
}: { 
  children: React.ReactNode;
  parallax?: number;
  direction?: "vertical" | "horizontal";
  invert?: boolean;
  focalX?: number;
  focalY?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));

  useLayoutEffect(() => {
    if (!ref.current || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0].contentRect;
      setSize({ width: r.width, height: r.height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Exact Parallax Math from snippet
  const base = direction === "vertical" ? size.height : size.width;
  const pct = clamp(parallax, 5, 60) / 100;
  const desiredOverflow = base > 0 ? clamp(base * pct, 40, 480) : 0;
  const scale = base > 0 ? 1 + desiredOverflow / Math.max(base, 1) : 1.2;
  const overflow = Math.max(base, 1) * (scale - 1);
  const from = invert ? overflow / 2 : -overflow / 2;
  const to = invert ? -overflow / 2 : overflow / 2;
  const mv = useTransform(scrollYProgress, [0, 1], [from, to]);

  const transformOrigin = `${clamp(focalX, 0, 100)}% ${clamp(focalY, 0, 100)}%`;

  return (
    <div 
      ref={ref} 
      className="relative overflow-hidden flex justify-center items-center w-full max-w-[800px]"
      style={{ height: "100%" }}
    >
      <motion.div 
        style={{ 
          position: "absolute",
          inset: 0,
          x: direction === "horizontal" ? mv : 0,
          y: direction === "vertical" ? mv : 0,
          scale,
          transformOrigin,
          willChange: "transform",
        }}
        className="w-full h-full flex justify-center items-center"
      >
        {children}
      </motion.div>
    </div>
  );
};

/* ─── Main Section ────────────────────────────────────────────────────────── */
const OurCoreServiceSection = () => {
  return (
    <section className="relative w-full bg-[#000000] gridism-content-layer px-[70px] flex flex-row" data-theme="dark">
      
      {/* 1. Left Column: Sticky Heading */}
      <div className="w-[350px] sticky top-0 h-screen flex items-center shrink-0">
        <h2 
          className="text-white"
          style={{
            fontFamily: "'Switzer', sans-serif",
            fontWeight: 400,
            fontSize: "40px",
            lineHeight: "40px",
          }}
        >
          Our Core Service
        </h2>
      </div>

      {/* 2. Right Column: Scrolling Services */}
      <div className="flex-1 flex flex-col">
        
        {/* BLOCK 1: Web Design & Development */}
        <div className="min-h-screen flex flex-col justify-center items-end py-20 gap-10">
          <h3 
            className="text-white text-right"
            style={{
              fontFamily: "'Switzer', sans-serif",
              fontWeight: 400,
              fontSize: "24px",
              lineHeight: "30px",
              maxWidth: "350px",
            }}
          >
            Web Design & Development
          </h3>
          
          <div className="w-full max-w-[800px] h-[580px]">
            <ParallaxGraphic parallax={25}>
              <div className="relative w-[656px] h-[580px]">
                {/* Base Grid Background */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `radial-gradient(circle, #333 1px, transparent 1px)`,
                    backgroundSize: "20px 20px"
                  }}
                />
                
                {/* Top Artwork */}
                <div className="absolute top-0 left-0 w-full h-[327px] overflow-hidden">
                  <img 
                    src="/images/Artboard 1sssdwsdws.png" 
                    alt="" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Bottom Sketch Image */}
                <div className="absolute bottom-0 left-0 w-full h-[253px] overflow-hidden">
                  <img 
                    src="/images/image 5.webp" 
                    alt="" 
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>

                {/* Floating Hero Mockup */}
                <div 
                  className="absolute left-[117px] top-[135px] w-[422px] h-[309px] bg-white overflow-hidden"
                  style={{
                    borderRadius: "65px",
                    filter: "drop-shadow(3px 3px 40px rgba(0, 0, 0, 0.4))",
                  }}
                >
                  <img 
                    src="/images/gridism 2@2x.png" 
                    alt="Gridism Layout" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </ParallaxGraphic>
          </div>
        </div>

        {/* BLOCK 2: Branding & Visual Identity */}
        <div className="min-h-screen flex flex-col justify-center items-end py-20 gap-10">
          <h3 
            className="text-white text-right"
            style={{
              fontFamily: "'Switzer', sans-serif",
              fontWeight: 400,
              fontSize: "24px",
              lineHeight: "30px",
              maxWidth: "350px",
            }}
          >
            Branding & Visual Identity
          </h3>
          
          <div className="w-full max-w-[800px] h-[516px]">
            <ParallaxGraphic parallax={25}>
              <div className="relative w-[741px] h-[516px]">
                <img 
                  src="/images/ezzrale 1 portos.png" 
                  alt="Ezzrale Branding" 
                  className="w-full h-full object-contain"
                />
              </div>
            </ParallaxGraphic>
          </div>
        </div>

        {/* BLOCK 3: Digital Transformation Consulting */}
        <div className="min-h-screen flex flex-col justify-center items-end py-20 gap-10">
          <h3 
            className="text-white text-right"
            style={{
              fontFamily: "'Switzer', sans-serif",
              fontWeight: 400,
              fontSize: "24px",
              lineHeight: "30px",
              maxWidth: "350px",
            }}
          >
            Digital Transformation Consulting
          </h3>
          
          <div className="w-full max-w-[800px] h-[644px]">
            <ParallaxGraphic parallax={25}>
              <div className="relative w-[728px] h-[644px]">
                <img 
                  src="/images/IMG_8790.jpg" 
                  alt="Digital Consulting" 
                  className="w-full h-full object-cover"
                />
              </div>
            </ParallaxGraphic>
          </div>
        </div>

      </div>
    </section>
  );
};

export default OurCoreServiceSection;