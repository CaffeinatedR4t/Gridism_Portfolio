"use client";

import FeatureCardSection from "./FeatureCardSection";

const FeatureCardsContainer = () => {

  const transparentWorkflowImages = [
    { src: "/images/ezzralef.png", alt: "Image 1", width: 490, height: 333 },
    { src: "/images/ezzralef.png", alt: "Image 2", width: 442, height: 336 },
    { src: "/images/ezzralef.png", alt: "Image 3", width: 587, height: 335 },
    { src: "/images/ezzralef.png", alt: "Image 4", width: 466, height: 338 },
    { src: "/images/ezzralef.png", alt: "Image 5", width: 312, height: 337 },
  ];

  const strategicResultsImages = [
    { src: "/images/ezzralef.png", alt: "EZZRALE",  width: 811, height: 569 },
    { src: "/images/ezzralef.png", alt: "Ogohogoh", width: 804, height: 568 },
    { src: "/images/ezzralef.png", alt: "iJakarta", width: 805, height: 569 },
  ];

  const scalableTechImages = [
    { src: "/images/ezzralef.png", alt: "Image 1", width: 574,  height: 574 },
    { src: "/images/ezzralef.png", alt: "Image 2", width: 377,  height: 565 },
    { src: "/images/ezzralef.png", alt: "Image 3", width: 1020, height: 574 },
    { src: "/images/ezzralef.png", alt: "Image 4", width: 743,  height: 557 },
    { src: "/images/ezzralef.png", alt: "Image 5", width: 554,  height: 554 },
    { src: "/images/ezzralef.png", alt: "Image 6", width: 833,  height: 556 },
  ];

  return (
    <>
      {/* Card 01 — Kuda (horse) */}
      <FeatureCardSection
        number="01"
        title="TRANSPARENT WORKFLOW"
        subtitle="Clear Scope"
        description="We deliver clear scope, transparent investment, and measurable progress through structured milestones—ensuring focused execution, strategic value, and complete visibility."
        images={transparentWorkflowImages}
        chessPiece="/images/Salinan%20Kuda%20png.png"
        chessPieceSize={{ width: 88, height: 134 }}
        bgColor="white"
        slideDirection="left"
      />

      {/* Card 02 — Luncur (bishop/slider) — taller and narrower */}
      <FeatureCardSection
        number="02"
        title="STRATEGIC RESULTS ORIENTED"
        subtitle="Clear identity."
        description="We are strategic and results-oriented, focusing on outcomes over rituals by starting with fast, AI-assisted prototyping to surface real problems early. Through sharp decisions and meticulous craft microcopy, spacing, motion, complete UI states, and polish passes. we deliver premium, ship-ready experiences that drive real ROI, with a flexible process but consistently high impact."
        images={strategicResultsImages}
        chessPiece="/images/Salinan%20luncur%20png.png"
        chessPieceSize={{ width: 150, height: 350 }}
        bgColor="white"
        slideDirection="right"
      />

      {/* Card 03 — Benteng (rook) — wide and shorter */}
      <FeatureCardSection
        number="03"
        title="SCALABLE TECHNOLOGY"
        subtitle="Clear Quality"
        description="We use AI technology system to accelerate processes so we can focus fully on refining prototypes, combining AI technology and design into one unified system. Our approach is human–technology, AI-centric—where efficiency is powered by AI, but vision and meaning remain human, reflected across our website, branding, and every experience we create."
        images={scalableTechImages}
        chessPiece="/images/Salinan%20Benteng%20png.png"
        chessPieceSize={{ width: 90, height: 110 }}
        bgColor="white"
        slideDirection="left"
      />
    </>
  );
};

export default FeatureCardsContainer;