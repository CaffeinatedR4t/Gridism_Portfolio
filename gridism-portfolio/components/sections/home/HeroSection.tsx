"use client";

const HeroSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      data-theme="light"
      style={{ height: "100svh" }}
    >
      {/* White Base Background Layer */}
      <div className="absolute inset-0 bg-[#F9F9F7]" />

      {/* Black Background Placeholder */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <div 
          className="bg-[#060606]"
          style={{ 
            width: "512px", 
            height: "333px", 
            transform: "rotate(90deg)" 
          }}
        />
      </div>

      {/* Content Container - No z-index to avoid isolation */}
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
        <div
          className="text-center"
          style={{
            width: "min(92vw, 1300px)",
            mixBlendMode: "difference",
            pointerEvents: "auto"
          }}
        >
          <h1
            style={{
              fontFamily: "'Switzer', sans-serif",
              fontWeight: 400,
              color: "#FFFFFF",
              margin: 0,
              lineHeight: 1.0,
              fontSize: "clamp(60px, 11vw, 150px)",
              letterSpacing: "-0.02em"
            }}
          >
            A New Order<br />of Design
          </h1>
        </div>
      </div>
    </section>

  );
};

export default HeroSection;