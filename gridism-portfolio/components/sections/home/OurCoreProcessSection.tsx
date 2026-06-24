"use client";

import { useRef, useState, useLayoutEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

/* ─── Parallax Wrapper Component ────────────────────────────────────────── */
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
      className="relative overflow-hidden flex justify-center items-center w-full h-full"
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



/* ─── Core Process Images ─────────────────────────────────────────────────── */
const coreProcessImages = [
  "/images/CP 1.webp",
  "/images/CP 2.webp",
  "/images/CP 3.webp",
  "/images/CP 4.webp",
  "/images/CP 5.webp",
  "/images/CP 6.webp",
  "/images/CP 7.webp",
];

/* ─── Main Section ────────────────────────────────────────────────────────── */
const OurCoreProcessSection = () => {
  const steps = [
    {
      title: "Aligning the Goals & ROI",
      description: "We quickly align on what “success” means—business goal, user outcome, key metrics, and constraints.",
      image: "/images/image.jpg",
      keywords: "timeline    tech    brand",
    },
    {
      title: "Prototype to Learn",
      description: "We create a few solution directions and turn the best ones into interactive prototypes to test and validate early. AI helps speed up exploration, but decisions stay human and intentional.",
      image: "/images/Artboard 1sssdwsdws.png",
      keywords: "interactive    validation    logic",
    },
    {
      title: "Craft",
      description: "We refine the chosen direction with ruthless attention to detail—layout, typography, microcopy, interactions, states, and edge cases, so it ends up premium and consistent.",
      image: "/images/ezzrale 1 portos.png",
      keywords: "detail    precision    craft",
    },
    {
      title: "Ship & Scale",
      description: "We don't just deliver; we launch for growth. Every product is optimized for speed, SEO, and scalability, ensuring your digital presence is built to evolve and dominate.",
      image: "/images/Artboard 1sssdwsdws.png",
      keywords: "growth    optimized    scale",
    }
  ];

  return (
    <div className="bg-[#F9F9F7] relative gridism-content-layer">

      {/* 1. Hero Graphic Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Centered Image Background - matches Home hero frame */}
        <div className="absolute w-full h-full flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden bg-black"
            style={{
              width: "333px",
              height: "512px",
            }}
          >
            <Image
              src="/images/CP 2.webp"
              alt="Core Process"
              fill
              sizes="333px"
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Text Overlay */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
        >
          <div className="relative">
            {/* Layer 1: Liquid Glass Body (Thickness via 5-stop Gradient) */}
            <h1 
              className="font-['Switzer',sans-serif] text-[clamp(80px,12vw,160px)] leading-[0.9] font-semibold text-center m-0"
              style={{
                background: "linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.1) 15%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.9) 85%, rgba(255, 255, 255, 0.8) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0px 3px 6px rgba(0, 0, 0, 0.32)",
              }}
            >
              <motion.span
                variants={{
                  hidden: { x: "-50vw", opacity: 0 },
                  visible: { x: 0, opacity: 1, transition: { duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.3 } }
                }}
                className="inline-block"
              >
                Our Core
              </motion.span>
              <br />
              <motion.span
                variants={{
                  hidden: { x: "50vw", opacity: 0 },
                  visible: { x: 0, opacity: 1, transition: { duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.3 } }
                }}
                className="italic inline-block"
              >
                Process
              </motion.span>
            </h1>

            {/* Layer 2: Specular Rim & Surface Texture */}
            <h1 
              className="absolute inset-0 font-['Switzer',sans-serif] text-[clamp(80px,12vw,160px)] leading-[0.9] font-semibold text-center m-0"
              style={{
                background: "linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 30%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                WebkitTextStroke: "1px rgba(255, 255, 255, 0.8)",
                textShadow: "0px 1px 1px rgba(255, 255, 255, 0.35)",
                mixBlendMode: "overlay",
              }}
            >
              <motion.span
                variants={{
                  hidden: { x: "-50vw", opacity: 0 },
                  visible: { x: 0, opacity: 1, transition: { duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.3 } }
                }}
                className="inline-block"
              >
                Our Core
              </motion.span>
              <br />
              <motion.span
                variants={{
                  hidden: { x: "50vw", opacity: 0 },
                  visible: { x: 0, opacity: 1, transition: { duration: 2, ease: [0.22, 1, 0.36, 1], delay: 0.3 } }
                }}
                className="italic inline-block"
              >
                Process
              </motion.span>
            </h1>
          </div>
        </motion.div>
      </section>

      {/* 2. Scrolling Section */}
      <section 
        className="relative w-full gridism-content-layer px-8 lg:px-[70px] max-w-[1440px] mx-auto flex flex-row gap-8 lg:gap-[29px]" 
        data-theme="light"
      >
        
        {/* Left Column: Sticky Overview */}
        <div className="w-[150px] lg:w-[191px] shrink-0 relative">
          <div className="sticky top-[150px] pt-10 h-fit">
            <h2 className="text-black font-['Switzer',sans-serif] font-normal italic text-[20px] lg:text-[24px] leading-[30px]">
              Our Core Process
            </h2>
          </div>
        </div>

        {/* Right Area: Scrolling Steps */}
        <div className="flex-1 flex flex-col w-full">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="min-h-screen flex flex-col lg:flex-row items-start py-24 gap-12 lg:gap-[55px]"
            >
              {/* Center: Parallax Image Container */}
              <div className="w-full lg:w-[min(603px,calc(100vw-837px))] h-[60vh] lg:h-[643px] shrink-0 overflow-hidden relative">
                <ParallaxGraphic parallax={20}>
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                  />
                </ParallaxGraphic>
              </div>

              {/* Right: Text Description */}
              <div className="w-full lg:w-[422px] shrink-0 flex flex-col gap-[50px]">
                <h3 className="text-black font-['Switzer',sans-serif] font-normal text-[32px] lg:text-[36px] leading-[30px]">
                  {step.title}
                </h3>
                
                <div className="flex flex-col gap-6 text-black/50 font-['Switzer',sans-serif] font-normal text-[16px] leading-[19px]">
                  <p>{step.description}</p>
                  {step.keywords && (
                    <p className="italic whitespace-pre-wrap">{step.keywords}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OurCoreProcessSection;
