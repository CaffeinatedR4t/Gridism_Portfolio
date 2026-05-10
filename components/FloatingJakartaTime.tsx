"use client";

import { useJakartaTime } from "@/hooks/useJakartaTime";

const FloatingJakartaTime = () => {
  const jakartaTime = useJakartaTime();

  return (
    <div
      className="fixed z-30 pointer-events-none"
      style={{
        right: "0px",
        top: "62%",
        transform: "translateY(-50%) rotate(90deg)",
        transformOrigin: "right top",
        paddingRight: "14px", // prevent edge clipping
        mixBlendMode: "difference",
        opacity: 0.8,
      }}
    >
      <p
        className="whitespace-nowrap"
        style={{
          margin: 0,
          letterSpacing: "1.5px",
          fontFamily: "'Switzer', sans-serif",
          fontWeight: 600,
          fontSize: "clamp(8px, 0.75vw, 10px)",
          lineHeight: 1,
          color: "#FFFFFF", // difference blend handles contrast
        }}
      >
        {(jakartaTime || "00:00") + " | 6°10′06″ S, 106°45′32″ E"}
      </p>
    </div>
  );
};

export default FloatingJakartaTime;