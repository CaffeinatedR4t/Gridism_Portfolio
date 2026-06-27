"use client";

const FloatingLogo = () => {
  return (
    <div
      className="fixed z-30 pointer-events-none"
      style={{
        left: "0px",
        top: "55%",
        /* Nudge inward so the rotated SVG doesn't get clipped by the viewport edge */
        transform: "translate(6px, -50%) rotate(-90deg)",
        transformOrigin: "left center",
        mixBlendMode: "difference",
        opacity: 1,
      }}
    >
      <img
        src="/images/WORDMARK WHITE.webp"
        alt=""
        aria-hidden="true"
        className="select-none h-auto"
        style={{
          width: "76px",
          display: "block",
          transform: "rotate(180deg)",
        }}
      />
    </div>
  );
};

export default FloatingLogo;