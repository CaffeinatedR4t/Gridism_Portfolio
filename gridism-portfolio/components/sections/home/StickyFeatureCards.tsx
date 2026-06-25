"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";

/* ─── Card data ───────────────────────────────────────────────────────────── */
interface CardImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface CardData {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  images: CardImage[];
  chessPiece: string;
  chessPieceSize: { width: number; height: number };
  slideDirection: "left" | "right";
  panelHeight: string;
  galleryTop: string;
  galleryHeight: string;
  descriptionWidth: string;
}

const CARDS: CardData[] = [
  {
    number: "01",
    title: "Transparent Workflow",
    subtitle: "Clear Scope",
    description:
      "We deliver clear scope, transparent investment, and measurable progress through structured milestones—ensuring focused execution, strategic value, and complete visibility.",
    images: [
      { src: "/images/envato-labs-image-edit%20-%202026-02-08T182910.712%201.webp", alt: "Image 1", width: 587, height: 335 },
      { src: "/images/image%2014.webp", alt: "Image 2", width: 490, height: 333 },
      { src: "/images/image%2015.webp", alt: "Image 3", width: 466, height: 338 },
      { src: "/images/image%2016.webp", alt: "Image 4", width: 312, height: 337 },
    ],
    chessPiece: "/images/Salinan%20Kuda%20png.png",
    chessPieceSize: { width: 88, height: 134 },
    slideDirection: "left",
    panelHeight: "306px",
    galleryTop: "clamp(334px, 44svh, 360px)",
    galleryHeight: "min(338px, 43svh)",
    descriptionWidth: "min(600px, 100%)",
  },
  {
    number: "02",
    title: "Strategic Results Oriented",
    subtitle: "Clear identity.",
    description:
      "We are strategic and results-oriented, focusing on outcomes over rituals by starting with fast, AI-assisted prototyping to surface real problems early. Through sharp decisions and meticulous craft microcopy, spacing, motion, complete UI states, and polish passes. we deliver premium, ship-ready experiences that drive real ROI, with a flexible process but consistently high impact.",
    images: [
      { src: "/images/EZZRALE%2002%2011%201.webp", alt: "EZZRALE", width: 811, height: 569 },
      { src: "/images/Ogohogoh%2006%2011%201.webp", alt: "Ogohogoh", width: 804, height: 568 },
      { src: "/images/iJakarta%2005%203%201.webp", alt: "iJakarta", width: 805, height: 569 },
    ],
    chessPiece: "/images/Salinan%20luncur%20png.png",
    chessPieceSize: { width: 150, height: 350 },
    slideDirection: "right",
    panelHeight: "453px",
    galleryTop: "198px",
    galleryHeight: "min(569px, calc(100svh - 198px))",
    descriptionWidth: "688px",
  },
  {
    number: "03",
    title: "Scalable Technology",
    subtitle: "Clear Quality",
    description:
      "We use AI technology system to accelerate processes so we can focus fully on refining prototypes, combining AI technology and design into one unified system. Our approach is human–technology, AI-centric—where efficiency is powered by AI, but vision and meaning remain human, reflected across our website, branding, and every experience we create.",
    images: [
      { src: "/images/envato-labs-image-edit%20-%202026-02-03T165127.390%201.webp", alt: "Envato Labs Edit", width: 574, height: 574 },
      { src: "/images/903bd99a-d751-4420-982c-4fcdf1ff93f2%201.webp", alt: "Portrait", width: 377, height: 565 },
      { src: "/images/image-gen%20(24)ffh%201.webp", alt: "Generated Art", width: 1020, height: 574 },
      { src: "/images/portrait-fashion-and-a-woman-on-a-chair-in-studio-2026-01-09-11-02-50-utc%201.webp", alt: "Fashion Portrait", width: 743, height: 557 },
      { src: "/images/close-up-beauty-face-of-model-girl-with-smokey-eye-2026-01-11-09-09-55-utc%201.webp", alt: "Beauty Close-up", width: 554, height: 554 },
      { src: "/images/close-up-black-and-white-shot-portrait-2026-01-07-06-57-46-utc%201.webp", alt: "B&W Portrait", width: 833, height: 556 },
    ],
    chessPiece: "/images/Salinan%20Benteng%20png.png",
    chessPieceSize: { width: 90, height: 110 },
    slideDirection: "left",
    panelHeight: "453px",
    galleryTop: "263px",
    galleryHeight: "574px",
    descriptionWidth: "695px",
  },
];

/* ─── Image Carousel (marquee) ────────────────────────────────────────────── */
const ImageCarousel = ({ card }: { card: CardData }) => {
  const trackAnimationClass =
    card.slideDirection === "left" ? "run-marquee-left" : "run-marquee-right";

  const renderImageBlock = (suffix: string) => (
    <div
      key={suffix}
      className="flex shrink-0"
      style={{ gap: "20px", paddingRight: "20px" }}
    >
      {card.images.map((image, i) => (
        <div
          className="feature-card-image"
          key={`${suffix}-${i}`}
          style={{
            flexShrink: 0,
            width: `calc(${image.width}px * var(--feature-card-image-scale, 1))`,
            height: `calc(${image.height}px * var(--feature-card-image-scale, 1))`,
            outlineOffset: "2px",
          }}
        >
          <img
            src={image.src}
            alt={image.alt}
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
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        paddingLeft: "30px",
        height: "100%",
      }}
    >
      <div className={`flex shrink-0 w-max ${trackAnimationClass}`}>
        {renderImageBlock("orig")}
        {renderImageBlock("clone")}
      </div>
    </div>
  );
};

/* ─── Smooth easing ───────────────────────────────────────────────────────── */
const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/* ─── Scroll-driven Card Layer ────────────────────────────────────────────── */
/**
 * Each card is a full layer rendered inside the sticky viewport.
 * Its panel and carousel slide up from below (enter), dwell in place,
 * then slide up out of view (exit) — all driven directly by scroll position.
 */
const CardLayer = ({
  card,
  index,
  totalCards,
  scrollYProgress,
}: {
  card: CardData;
  index: number;
  totalCards: number;
  scrollYProgress: MotionValue<number>;
}) => {
  // Use a ref for viewport height so the transform function always has the latest value
  const vhRef = useRef(900);

  useEffect(() => {
    const update = () => { vhRef.current = window.innerHeight; };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const seg = 1 / totalCards;
  const segStart = index * seg;
  const isLast = index === totalCards - 1;

  const isFirst = index === 0;

  /* ── Scroll-phase breakpoints within this card's segment ──
   *  Enter panel:    0%  → 25% of segment  (panel slides up slowly)
   *  Dwell:          25% → 75% of segment  (panel stays fixed)
   *  Exit:           75% → 100% of segment (panel slides up out slowly)
   *  First card: shorter enter distance (no big white gap).
   *  Last card: no exit — stays in place.
   */
  const pEnterStart  = segStart;
  const pEnterEnd    = segStart + seg * 0.25;
  const exitStart    = segStart + seg * 0.75;
  const exitEnd      = segStart + seg * 1.0;

  // Panel: slides from +enterDist → 0 (enter), then 0 → -vh (exit)
  // Card 01 enters from 10% of viewport (almost no gap), others from 100%
  const panelY = useTransform(scrollYProgress, (p: number) => {
    const h = vhRef.current;
    const enterDist = isFirst ? h * 0.10 : h;
    if (p <= pEnterStart) return enterDist;
    if (p <= pEnterEnd) {
      const t = easeInOutCubic((p - pEnterStart) / (pEnterEnd - pEnterStart));
      return enterDist * (1 - t);
    }
    if (isLast) return 0; // last card never exits
    if (p <= exitStart) return 0;
    if (p <= exitEnd) {
      const t = easeInOutCubic((p - exitStart) / (exitEnd - exitStart));
      return -h * t;
    }
    return -h;
  });

  return (
    <>
      {/* ── Panel (black card with text) ── */}
      <motion.div
        className="feature-card-panel-wrap"
        style={{
          y: panelY,
          position: "absolute",
          top: "clamp(96px, 19svh, 153px)",
          left: 0,
          width: "100%",
          paddingLeft: "70px",
          paddingRight: "70px",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          zIndex: 2 + (totalCards - index),
          willChange: "transform",
        }}
      >
        <div
          className="feature-card-panel"
          style={{
            position: "relative",
            width: "min(1300px, 100%)",
            height: card.panelHeight,
            backgroundColor: "#060606",
            backgroundImage: "url('/images/Key Features Text Background.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "50px",
            overflow: "visible",
          }}
        >
          {/* Title row */}
          <div
            className="feature-card-title-row"
            style={{
              width: "100%",
              height: "92px",
              display: "flex",
              alignItems: "flex-end",
              paddingLeft: "58px",
              paddingRight: "59px",
              boxSizing: "border-box",
            }}
          >
            <p
              className="feature-card-title"
              style={{
                fontFamily: "'Switzer', sans-serif",
                fontWeight: 400,
                fontSize: "40px",
                lineHeight: "53px",
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              {card.title}
            </p>
          </div>

          {/* Info row — number, subtitle, description */}
          <div
            className="feature-card-copy-wrap"
            style={{
              width: "100%",
              paddingLeft: "55px",
              paddingRight: "55px",
              boxSizing: "border-box",
            }}
          >
            <div
              className="feature-card-info-row"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: "25px",
                width: "100%",
                paddingBottom: "50px",
              }}
            >
              <p
                className="feature-card-number"
                style={{
                  flexShrink: 0,
                  width: "109px",
                  height: "21px",
                  fontFamily: "'Switzer', sans-serif",
                  fontWeight: 400,
                  fontSize: "20px",
                  lineHeight: "26px",
                  color: "#FFFFFF",
                  margin: 0,
                }}
              >
                {card.number}
              </p>

              <p
                className="feature-card-subtitle"
                style={{
                  flexShrink: 0,
                  width: "195px",
                  height: "21px",
                  fontFamily: "'Switzer', sans-serif",
                  fontWeight: 400,
                  fontSize: "20px",
                  lineHeight: "26px",
                  color: "#FFFFFF",
                  margin: 0,
                }}
              >
                {card.subtitle}
              </p>

              <p
                className="feature-card-description"
                style={{
                  width: card.descriptionWidth,
                  fontFamily: "'Switzer', sans-serif",
                  fontWeight: 400,
                  fontSize: "20px",
                  lineHeight: "26px",
                  textAlign: "justify",
                  color: "#FFFFFF",
                  margin: 0,
                }}
              >
                {card.description}
              </p>
            </div>
          </div>

          {/* Chess piece — uses wrapper for centering, no framer-motion transform conflicts */}
          <div
            className="feature-card-chess-piece"
            style={{
              position: "absolute",
              right: "40px",
              top: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              zIndex: 20,
              pointerEvents: "none",
            }}
          >
            <img
              src={card.chessPiece}
              alt="Chess Piece"
              style={{
                width: `${card.chessPieceSize.width}px`,
                height: `${card.chessPieceSize.height}px`,
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
};

/* ─── Main Section ────────────────────────────────────────────────────────── */
const StickyFeatureCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track which card is active for the instant carousel swap
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const segSize = 1 / CARDS.length;
    let idx = Math.floor(p / segSize);
    idx = Math.max(0, Math.min(CARDS.length - 1, idx));
    setActiveIndex(idx);
  });

  const activeCard = CARDS[activeIndex];

  return (
    <section
      ref={containerRef}
      className="relative w-full gridism-content-layer"
      data-theme="light"
      style={{
        /* Each card gets ~200vh of scroll distance + 100vh for the pinned viewport */
        height: `${CARDS.length * 200 + 100}vh`,
        backgroundColor: "#F9F9F7",
      }}
    >
      {/* Sticky viewport — stays pinned while user scrolls through the tall container */}
      <div
        className="sticky top-0 w-full"
        style={{
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#F9F9F7",
        }}
      >
        {/* Panels — scroll-driven slide */}
        {CARDS.map((card, index) => (
          <CardLayer
            key={index}
            card={card}
            index={index}
            totalCards={CARDS.length}
            scrollYProgress={scrollYProgress}
          />
        ))}

        {/* Carousel — fades in/out when card changes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`carousel-${activeIndex}`}
            className="feature-card-gallery-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.45, 0, 0.15, 1] }}
            style={{
              position: "absolute",
              top: activeCard.galleryTop,
              left: 0,
              width: "100%",
              height: activeCard.galleryHeight,
              backgroundColor: "#F9F9F7",
              overflow: "hidden",
              zIndex: 1,
            }}
          >
            <ImageCarousel card={activeCard} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default StickyFeatureCards;
