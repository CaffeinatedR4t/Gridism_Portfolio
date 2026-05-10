"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/* ─── Tilt hook ───────────────────────────────────────────────────────────── */
function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: -y * 5, rotateY: x * 5 });
  };

  const onMouseLeave = () => setTilt({ rotateX: 0, rotateY: 0 });
  return { ref, tilt, onMouseMove, onMouseLeave };
}

/* ─── Service data ────────────────────────────────────────────────────────── */
const services = [
  {
    label: "Web Design & Development",
    image: "/images/Artboard 1sssdwsdws.png",
    titleLeft: "8%",
    titleWidth: "52%",
    imageTop: 120,   // px below top of card content area
    imageHeight: 461,
    titleTop: 0,
  },
  {
    label: "Branding & Visual Identity",
    image: "/images/ezzrale 1 portos.png",
    titleLeft: "26%",
    titleWidth: "56%",
    imageTop: 120,
    imageHeight: 461,
    titleTop: 0,
  },
  {
    label: "Digital Transformation Consulting",
    image: "/images/gridism 2@2x.png",
    titleLeft: "6%",
    titleWidth: "56%",
    imageTop: 240,
    imageHeight: 466,
    titleTop: 120,
  },
];

/* ─── HEADING PANEL — sticky sibling #0 ─────────────────────────────────── */
/**
 * Exactly like turugshan's "about" heading panel:
 *   - position: sticky, top: 0
 *   - height: 100vh
 *   - z-index: 0  ← lowest, all cards stack on top of it
 *   - Heading text is top-left with padding
 */
function HeadingPanel({ sectionRef }: { sectionRef: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Horse piece drifts up as section scrolls
  const horseRawY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);
  const horseY    = useSpring(horseRawY, { stiffness: 60, damping: 20 });

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        width: "100%",
        zIndex: 0,
        backgroundColor: "#000000",
        display: "flex",
        alignItems: "flex-start",       // top-left, like turugshan
        justifyContent: "flex-start",
        paddingTop: "60px",
        paddingLeft: "67px",
        boxSizing: "border-box",
        pointerEvents: "none",
      }}
    >
      {/* Heading + chess piece on same row */}
      <div style={{ position: "relative", display: "inline-block" }}>
        <h2
          style={{
            fontFamily: "'Switzer', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(56px, 6.7vw, 96px)",
            lineHeight: 1.32,
            color: "#FFFFFF",
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          Our Core Service
        </h2>

        {/* Chess piece — vertically centered to the heading text */}
        <motion.div
          style={{
            position: "absolute",
            right: "-64px",
            top: "50%",
            translateY: "-50%",
            y: horseY,
            width: "47.74px",
            height: "72px",
          }}
        >
          <img
            src="/images/Salinan Kuda png.png"
            alt=""
            aria-hidden="true"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </motion.div>
      </div>
    </div>
  );
}

/* ─── CARD PANEL — sticky sibling #1/#2/#3 ──────────────────────────────── */
/**
 * Exactly like turugshan's work cards:
 *   - position: sticky, top: 0
 *   - height: 100vh
 *   - z-index: index + 1  → each card sits above the previous one
 *   - backgroundColor: #000  → fully covers whatever is below
 *   - Content is centered vertically inside the 100vh panel
 *
 * Because these are sticky siblings in a tall parent, scrolling naturally
 * causes each panel to slide up and pin — covering the heading and each
 * previous card. No JS translateY animation needed for the core stack.
 *
 * Framer motion is only used for the entry scale + tilt on hover.
 */
function CardPanel({
  service,
  index,
}: {
  service: typeof services[0];
  index: number;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { ref: tiltRef, tilt, onMouseMove, onMouseLeave } = useTilt();

  const springRotateX = useSpring(tilt.rotateX, { stiffness: 200, damping: 22 });
  const springRotateY = useSpring(tilt.rotateY, { stiffness: 200, damping: 22 });

  // Subtle scale-in as this card enters (using its own scroll progress)
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "start start"],
  });
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const scale    = useSpring(rawScale, { stiffness: 80, damping: 22 });

  return (
    <div
      ref={panelRef}
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        width: "100%",
        zIndex: index + 1,            // 1, 2, 3 — each above the previous
        backgroundColor: "#000000",   // fully opaque → covers heading + prior cards
        display: "flex",
        alignItems: "center",         // vertically center the card block
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Scale wrapper — animates as card enters */}
      <motion.div
        style={{
          scale,
          width: "100%",
          maxWidth: "calc(100% - 64px)", // 32px margin each side
        }}
      >
        {/* Tilt wrapper */}
        <motion.div
          ref={(node) => {
            (tiltRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: "preserve-3d",
            willChange: "transform",
            cursor: "default",
            width: "100%",
          }}
        >
          {/* Card content block */}
          <div
            className="relative w-full"
            style={{
              // Height = title box + image. Title is always 120px tall.
              // imageTop is where the image starts (120 or 240).
              // imageHeight varies per card.
              height: `${service.imageTop + service.imageHeight}px`,
            }}
          >
            {/* Title white box */}
            <div
              className="absolute bg-white flex items-center justify-center"
              style={{
                left: service.titleLeft,
                top: `${service.titleTop}px`,
                width: service.titleWidth,
                height: "120px",
                zIndex: 2,
              }}
            >
              <p
                className="text-black text-center"
                style={{
                  fontFamily: "'Switzer', sans-serif",
                  fontWeight: 400,
                  fontSize: "clamp(22px, 2.6vw, 40px)",
                  lineHeight: 1.35,
                  margin: 0,
                  padding: "0 16px",
                }}
              >
                {service.label}
              </p>
            </div>

            {/* Service image — full width of card block */}
            <img
              src={service.image}
              alt={service.label}
              className="absolute object-cover w-full"
              style={{
                left: 0,
                top: `${service.imageTop}px`,
                height: `${service.imageHeight}px`,
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─── Main section ────────────────────────────────────────────────────────── */
/**
 * TURUGSHAN PATTERN — EXACT COPY:
 *
 *   <section style="height: 400vh">        ← (N+1) × 100vh, N=3 cards
 *     <HeadingPanel />                     ← sticky, top:0, z-index:0, height:100vh
 *     <CardPanel index=0 />               ← sticky, top:0, z-index:1, height:100vh
 *     <CardPanel index=1 />               ← sticky, top:0, z-index:2, height:100vh
 *     <CardPanel index=2 />               ← sticky, top:0, z-index:3, height:100vh
 *   </section>
 *
 * As you scroll:
 *   - HeadingPanel pins. Card 1 enters from below and pins over it.
 *   - Card 2 enters from below and pins over Card 1.
 *   - Card 3 enters from below and pins over Card 2.
 *   - After Card 3 pins, the section bottom exits and the next section enters.
 *
 * No translateY, no complex progress math. Pure sticky layering.
 */
const OurCoreServiceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black gridism-content-layer"
      data-theme="dark"
      style={{
        // 1 heading panel + 3 card panels = 4 × 100vh
        height: "400vh",
      }}
    >
      {/* Sticky sibling 0: Heading */}
      <HeadingPanel sectionRef={sectionRef} />

      {/* Sticky siblings 1–3: Cards */}
      {services.map((service, i) => (
        <CardPanel key={service.label} service={service} index={i} />
      ))}
    </section>
  );
};

export default OurCoreServiceSection;