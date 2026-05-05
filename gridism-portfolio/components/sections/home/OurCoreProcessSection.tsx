"use client";

import { useRef, useState, useLayoutEffect } from "react";
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
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideLeftPauseV3 {
          /* Start at Block 2 (33.33% through the 3-block track) */
          0%, 10% { transform: translate3d(-33.3333%, 0, 0); }
          /* Step to Image 2 of Block 2 */
          14.285%, 24.285% { transform: translate3d(-38.0951%, 0, 0); }
          /* Step to Image 3 of Block 2 */
          28.571%, 38.571% { transform: translate3d(-42.8570%, 0, 0); }
          /* Step to Image 4 of Block 2 */
          42.857%, 52.857% { transform: translate3d(-47.6189%, 0, 0); }
          /* Step to Image 5 of Block 2 */
          57.142%, 67.142% { transform: translate3d(-52.3808%, 0, 0); }
          /* Step to Image 6 of Block 2 */
          71.428%, 81.428% { transform: translate3d(-57.1427%, 0, 0); }
          /* Step to Image 7 of Block 2 */
          85.714%, 95.714% { transform: translate3d(-61.9046%, 0, 0); }
          /* Slide to reset position (Start of Block 3, which looks like Start of Block 2) */
          100% { transform: translate3d(-66.6666%, 0, 0); }
        }
        .animate-slider-v3 {
          animation: slideLeftPauseV3 28s infinite cubic-bezier(0.45, 0, 0.15, 1);
          will-change: transform;
          backface-visibility: hidden;
          perspective: 1000px;
          transform-style: preserve-3d;
        }
        .gpu-layer {
          transform: translate3d(0,0,0);
          backface-visibility: hidden;
        }
      `}} />

      {/* 1. Hero Graphic Section */}
      <section className="relative w-full h-screen flex items-center justify-start overflow-hidden">
        {/* Slider Container */}
        <div className="absolute w-full h-[70vh] flex items-center justify-start">
           <div className="flex flex-row w-max animate-slider-v3">
             {/* Block 1 (Buffer) */}
             <div className="flex flex-row shrink-0">
               {coreProcessImages.map((src, index) => (
                  <div key={`b1-${index}`} className="w-[33.3333vw] h-[70vh] shrink-0 px-2 md:px-4 gpu-layer">
                    <img src={src} className="w-full h-full object-cover" loading="eager" alt={`Process Buffer A ${index + 1}`} />
                  </div>
               ))}
             </div>
             {/* Block 2 (Active) */}
             <div className="flex flex-row shrink-0">
               {coreProcessImages.map((src, index) => (
                  <div key={`b2-${index}`} className="w-[33.3333vw] h-[70vh] shrink-0 px-2 md:px-4 gpu-layer">
                    <img src={src} className="w-full h-full object-cover" loading="eager" alt={`Process Active ${index + 1}`} />
                  </div>
               ))}
             </div>
             {/* Block 3 (Buffer) */}
             <div className="flex flex-row shrink-0">
               {coreProcessImages.map((src, index) => (
                  <div key={`b3-${index}`} className="w-[33.3333vw] h-[70vh] shrink-0 px-2 md:px-4 gpu-layer">
                    <img src={src} className="w-full h-full object-cover" loading="eager" alt={`Process Buffer B ${index + 1}`} />
                  </div>
               ))}
             </div>
           </div>
        </div>

        {/* Text Overlay */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
          style={{
            mixBlendMode: "difference",
            color: "#FFFFFF"
          }}
        >
          <h1 
            className="font-['Switzer',sans-serif] text-[clamp(80px,12vw,160px)] leading-[0.9] font-medium text-center m-0"
          >
            Our Core<br />
            <span className="italic">Process</span>
          </h1>
        </div>
      </section>

      {/* 2. Scrolling Section */}
      <section 
        className="relative w-full gridism-content-layer px-8 lg:px-[70px] max-w-[1600px] mx-auto flex flex-row gap-8 lg:gap-[60px]" 
        data-theme="light"
      >
        
        {/* Left Column: Sticky Overview */}
        <div className="w-[150px] lg:w-[200px] shrink-0 relative">
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
              className="min-h-screen flex flex-col xl:flex-row items-center justify-between py-24 gap-12 xl:gap-0"
            >
              {/* Center: Parallax Image Container */}
              <div className="w-full xl:w-[45vw] max-w-[750px] h-[60vh] xl:h-[85vh] max-h-[900px] shrink-0 overflow-hidden relative">
                <ParallaxGraphic parallax={20}>
                  <img 
                    src={step.image} 
                    alt={step.title} 
                    className="w-full h-full object-cover object-center"
                  />
                </ParallaxGraphic>
              </div>

              {/* Right: Text Description */}
              <div className="w-full xl:w-[420px] flex flex-col gap-8 xl:pr-10">
                <h3 className="text-black font-['Switzer',sans-serif] font-normal text-[32px] lg:text-[36px] leading-[1.2]">
                  {step.title}
                </h3>
                
                <div className="flex flex-col gap-6 text-black/50 font-['Switzer',sans-serif] font-normal text-[20px] lg:text-[24px] leading-[1.4]">
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