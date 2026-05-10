"use client";

import { useEffect, useMemo, useState } from "react";

const HeroSection = () => {
  const [viewport, setViewport] = useState({ w: 1440, h: 900 });

  useEffect(() => {
    const update = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  const objectPosition = useMemo(() => {
    const aspect = viewport.w / viewport.h;
    const x = "center";
    let y = "50%";
    if (aspect >= 1.8) y = "45%";
    if (aspect >= 2.1) y = "42%";
    if (aspect <= 1.2) y = "55%";
    return `${x} ${y}`;
  }, [viewport.w, viewport.h]);

  const VerticalText = ({
    children,
    leftPercent,
    topPercent,
  }: {
    children: string;
    leftPercent: number;
    topPercent: number;
  }) => (
    <p
      className="absolute text-white whitespace-nowrap"
      style={{
        left: `${leftPercent}%`,
        top: `${topPercent}%`,
        transform: "rotate(90deg)",
        transformOrigin: "left top",
        fontSize: "clamp(9px, 0.7vw, 10px)",
        lineHeight: "12px",
        fontFamily: "'Switzer', sans-serif",
        fontWeight: 400,
      }}
    >
      {children}
    </p>
  );

  return (
    <section
      className="relative w-full overflow-hidden"
      data-theme="light"
      style={{ height: "100svh" }}
    >
      {/* Background */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/about-hero.webp"
          alt=""
          aria-hidden="true"
          className="w-full h-full"
          style={{
            objectFit: "cover",
            objectPosition,
            display: "block",
          }}
        />
      </div>

      {/* Grid Lines */}
      <div className="absolute inset-0 pointer-events-none">
        {[11.1, 26.4, 41.7, 56.9, 72.2, 87.5].map((percent, index) => (
          <div
            key={index}
            className="absolute top-0 w-px h-full"
            style={{
              left: `${percent}%`,
              background: "rgba(255,255,255,0.20)",
              mixBlendMode: "overlay",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {/* Vertical Labels */}
        <VerticalText leftPercent={12} topPercent={8.2}>Human Centric Approach</VerticalText>
        <VerticalText leftPercent={27.3} topPercent={16.3}>Commitment to Crafting</VerticalText>
        <VerticalText leftPercent={57.8} topPercent={8.5}>Structure with Purpose</VerticalText>
        <VerticalText leftPercent={12} topPercent={31}>Consistency Loyalty</VerticalText>
        <VerticalText leftPercent={42.6} topPercent={30.2}>Growth by Design</VerticalText>
        <VerticalText leftPercent={73.2} topPercent={40}>Creativity within Order</VerticalText>
        <VerticalText leftPercent={88.4} topPercent={42.6}>Digital Creative Agency</VerticalText>
        <VerticalText leftPercent={50.3} topPercent={50.6}>Grit Builds Precision</VerticalText>

        {/* Title block — centered */}
        <div
          className="absolute left-1/2 top-1/2 text-center"
          style={{
            transform: "translate(-50%, -50%)",
            width: "min(92vw, 1100px)",
          }}
        >
          <h1
            style={{
              fontFamily: "'Switzer', sans-serif",
              fontWeight: 400,
              color: "#FFFFFF",
              margin: 0,
              lineHeight: 1.05,
              fontSize: "clamp(44px, 6vw, 90px)",
            }}
          >
            A NEW ORDER
          </h1>

          <div
            className="flex items-center justify-center"
            style={{ gap: "clamp(12px, 2vw, 24px)" }}
          >
            <h2
              style={{
                fontFamily: "'Switzer', sans-serif",
                fontWeight: 400,
                color: "#FFFFFF",
                margin: 0,
                lineHeight: 1.05,
                fontSize: "clamp(44px, 6vw, 90px)",
              }}
            >
              OF
            </h2>

            <div className="relative inline-block">
              <div
                className="absolute inset-0 -z-10"
                style={{
                  background:
                    "linear-gradient(90deg, #000000 0%, rgba(174, 174, 174, 0) 100%)",
                  backgroundBlendMode: "overlay",
                }}
              />
              <h2
                style={{
                  fontFamily: "'Switzer', sans-serif",
                  fontWeight: 400,
                  color: "#FFFFFF",
                  margin: 0,
                  lineHeight: 1.05,
                  fontSize: "clamp(44px, 6vw, 90px)",
                  paddingLeft: "clamp(10px, 1.2vw, 16px)",
                  paddingRight: "clamp(10px, 1.2vw, 16px)",
                }}
              >
                DESIGN
              </h2>
            </div>
          </div>
        </div>

        {/* Jakarta time REMOVED (now floating component) */}
      </div>
    </section>
  );
};

export default HeroSection;