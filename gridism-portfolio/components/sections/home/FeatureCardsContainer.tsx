"use client";

import FeatureCardSection from "./FeatureCardSection";

const FeatureCardsContainer = () => {

  const transparentWorkflowImages = [
    { src: "/images/envato-labs-image-edit%20-%202026-02-08T182910.712%201.webp", alt: "Image 1", width: 587, height: 335 },
    { src: "/images/image%2014.webp", alt: "Image 2", width: 490, height: 333 },
    { src: "/images/image%2015.webp", alt: "Image 3", width: 466, height: 338 },
    { src: "/images/image%2016.webp", alt: "Image 4", width: 312, height: 337 },
  ];


  const strategicResultsImages = [
    { src: "/images/EZZRALE%2002%2011%201.webp", alt: "EZZRALE",  width: 811, height: 569 },
    { src: "/images/Ogohogoh%2006%2011%201.webp", alt: "Ogohogoh", width: 804, height: 568 },
    { src: "/images/iJakarta%2005%203%201.webp", alt: "iJakarta", width: 805, height: 569 },
  ];

  const scalableTechImages = [
    { src: "/images/envato-labs-image-edit%20-%202026-02-03T165127.390%201.webp", alt: "Envato Labs Edit", width: 574,  height: 574 },
    { src: "/images/903bd99a-d751-4420-982c-4fcdf1ff93f2%201.webp",             alt: "Portrait",         width: 377,  height: 565 },
    { src: "/images/image-gen%20(24)ffh%201.webp",                               alt: "Generated Art",    width: 1020, height: 574 },
    { src: "/images/portrait-fashion-and-a-woman-on-a-chair-in-studio-2026-01-09-11-02-50-utc%201.webp", alt: "Fashion Portrait", width: 743, height: 557 },
    { src: "/images/close-up-beauty-face-of-model-girl-with-smokey-eye-2026-01-11-09-09-55-utc%201.webp", alt: "Beauty Close-up", width: 554, height: 554 },
    { src: "/images/close-up-black-and-white-shot-portrait-2026-01-07-06-57-46-utc%201.webp",            alt: "B&W Portrait",    width: 833, height: 556 },
  ];

  return (
    <>
      {/* Card 01 — Kuda (horse) */}
      <FeatureCardSection
        number="01"
        title="Transparent Workflow"
        subtitle="Clear Scope"
        description="We deliver clear scope, transparent investment, and measurable progress through structured milestones—ensuring focused execution, strategic value, and complete visibility."
        images={transparentWorkflowImages}
        chessPiece="/images/Salinan%20Kuda%20png.png"
        chessPieceSize={{ width: 88, height: 134 }}
        bgColor="white"
        slideDirection="left"
        cardClassName="feature-card-01"
        galleryTop="clamp(334px, 44svh, 360px)"
      />

      {/* Card 02 — Luncur (bishop/slider) — taller and narrower */}
      <FeatureCardSection
        number="02"
        title="Strategic Results Oriented"
        subtitle="Clear identity."
        description="We are strategic and results-oriented, focusing on outcomes over rituals by starting with fast, AI-assisted prototyping to surface real problems early. Through sharp decisions and meticulous craft microcopy, spacing, motion, complete UI states, and polish passes. we deliver premium, ship-ready experiences that drive real ROI, with a flexible process but consistently high impact."
        images={strategicResultsImages}
        chessPiece="/images/Salinan%20luncur%20png.png"
        chessPieceSize={{ width: 150, height: 350 }}
        bgColor="white"
        slideDirection="right"
        cardClassName="feature-card-02"
        panelHeight="453px"
        galleryTop="198px"
        galleryHeight="min(569px, calc(100svh - 198px))"
        descriptionWidth="688px"
      />

      {/* Card 03 — Benteng (rook) — aligned with Card 01 layout, chess piece visible */}
      <FeatureCardSection
        number="03"
        title="Scalable Technology"
        subtitle="Clear Quality"
        description="We use AI technology system to accelerate processes so we can focus fully on refining prototypes, combining AI technology and design into one unified system. Our approach is human–technology, AI-centric—where efficiency is powered by AI, but vision and meaning remain human, reflected across our website, branding, and every experience we create."
        images={scalableTechImages}
        chessPiece="/images/Salinan%20Benteng%20png.png"
        chessPieceSize={{ width: 90, height: 110 }}
        bgColor="white"
        slideDirection="left"
        cardClassName="feature-card-03"
        panelHeight="453px"
        galleryTop="263px"
        galleryHeight="574px"
        descriptionWidth="695px"
      />
    </>
  );
};

export default FeatureCardsContainer;
