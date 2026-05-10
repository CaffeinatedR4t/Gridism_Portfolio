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
        src="/images/gridism-logo-tilted.svg"
        alt=""
        aria-hidden="true"
        className="select-none h-auto"
        style={{
          width: "124px",
          display: "block",
          filter: "invert(1)",
        }}
      />
    </div>
  );
};

export default FloatingLogo;