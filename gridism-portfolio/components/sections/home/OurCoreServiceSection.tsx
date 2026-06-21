"use client";

import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";

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

/* ─── Service Configuration ─────────────────────────────────────────────── */
const LOREM_IPSUM = "We deliver premium brand and digital experiences. Built fast, crafted with precision, and designed to perform. From first concept to final pixel, we move with flexibility but never compromise on outcome, quality, or impact.";

const SERVICES = [
  {
    title: "Web Design & Development",
    description: LOREM_IPSUM,
    height: 580,
    graphic: (
      <div className="relative w-[656px] h-[580px]">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle, #333 1px, transparent 1px)`,
            backgroundSize: "20px 20px"
          }}
        />
        <div className="absolute top-0 left-0 w-full h-[327px] overflow-hidden">
          <img 
            src="/images/Artboard 1sssdwsdws.png" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[253px] overflow-hidden">
          <img 
            src="/images/image 5.webp" 
            alt="" 
            className="w-full h-full object-cover opacity-80"
          />
        </div>
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
    )
  },
  {
    title: "Branding & Visual Identity",
    description: LOREM_IPSUM,
    height: 516,
    graphic: (
      <div className="relative w-[741px] h-[516px]">
        <img 
          src="/images/ezzrale 1 portos.png" 
          alt="Ezzrale Branding" 
          className="w-full h-full object-contain"
        />
      </div>
    )
  },
  {
    title: "Digital Transformation Consulting",
    description: LOREM_IPSUM,
    height: 644,
    graphic: (
      <div className="relative w-[728px] h-[644px]">
        <img 
          src="/images/IMG_8790.jpg" 
          alt="Digital Consulting" 
          className="w-full h-full object-cover"
        />
      </div>
    )
  }
];

/* ─── Service Image Block ───────────────────────────────────────────────── */
const ServiceImageBlock = ({ 
  index, 
  setActiveIndex, 
  children 
}: { 
  index: number; 
  setActiveIndex: (i: number) => void; 
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  // Trigger when the element crosses the middle of the viewport
  const isInView = useInView(ref, { 
    margin: "-50% 0px -50% 0px",
    amount: "some"
  });
  
  useEffect(() => {
    if (isInView) {
      setActiveIndex(index);
    }
  }, [isInView, index, setActiveIndex]);

  return (
    <div 
      ref={ref} 
      className="relative min-h-[120vh] flex items-center justify-center py-20"
    >
      {children}
    </div>
  );
};

/* ─── Main Section ────────────────────────────────────────────────────────── */
const OurCoreServiceSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Safeguard against out-of-bounds or undefined services
  const currentService = SERVICES[activeIndex] || SERVICES[0];

  return (
    <section className="relative w-full bg-black gridism-content-layer flex flex-row" data-theme="dark">
      
      {/* 1. Left Column: Sticky Text content */}
      <div className="w-[40%] sticky top-0 h-screen flex flex-col justify-between pt-[153px] pb-[85px] px-10 lg:px-[70px] shrink-0 z-20">
        
        {/* Top: Section Title */}
        <div className="relative">
          <h2 
            className="text-white font-['Switzer',sans-serif] italic font-normal text-[24px] leading-[30px] tracking-tight"
          >
            Our Core Service
          </h2>
        </div>

        {/* Middle: Active Service Title */}
        <div className="flex-1 flex items-center relative">
          <AnimatePresence mode="wait">
            <motion.h3
              key={`title-${activeIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.45, 0, 0.15, 1] }}
              className="text-white font-['Switzer',sans-serif] font-normal text-[40px] leading-[40px] max-w-[600px] absolute"
            >
              {currentService.title}
            </motion.h3>
          </AnimatePresence>
        </div>

        {/* Bottom: Active Service Description */}
        <div className="w-full max-w-[339px] relative h-[85px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${activeIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-white font-['Switzer',sans-serif] font-normal text-[14px] leading-normal absolute bottom-0"
            >
              {currentService.description}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* 2. Right Column: Scrolling Images */}
      <div className="flex-1 relative pr-10 lg:pr-[70px]">
        {SERVICES.map((service, index) => (
          <ServiceImageBlock key={index} index={index} setActiveIndex={setActiveIndex}>
            <div 
              className="w-full max-w-[800px] flex items-center justify-center relative"
              style={{ height: `${service.height}px` }}
            >
              <ParallaxGraphic parallax={25}>
                {service.graphic}
              </ParallaxGraphic>
            </div>
          </ServiceImageBlock>
        ))}
      </div>

    </section>
  );
};

export default OurCoreServiceSection;