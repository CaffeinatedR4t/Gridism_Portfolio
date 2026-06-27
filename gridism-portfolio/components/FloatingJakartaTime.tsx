"use client";

import { useState, useEffect } from "react";
import { useJakartaTime } from "@/hooks/useJakartaTime";

const FloatingJakartaTime = () => {
  const jakartaTime = useJakartaTime();
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 250); // Glide back after 250ms of no scrolling
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div
      className={`fixed z-30 pointer-events-none transition-transform duration-700 ease-in-out ${isScrolling ? "translate-x-[40px]" : "translate-x-0"}`}
      style={{
        right: "0px",
        top: "62%",
        mixBlendMode: "difference",
        opacity: 0.8,
      }}
    >
      <div
        style={{
          transform: "translateY(-50%) rotate(90deg)",
          transformOrigin: "right top",
          paddingRight: "14px", // prevent edge clipping
        }}
      >
        <p
          className="whitespace-nowrap"
          style={{
            margin: 0,
            letterSpacing: "1.5px",
            fontFamily: "'Switzer', sans-serif",
            fontWeight: 400,
            fontSize: "clamp(8px, 0.75vw, 10px)",
            lineHeight: 1,
            color: "#FFFFFF", // difference blend handles contrast
          }}
        >
          {(jakartaTime || "00:00") + " | 6°10′06″ S, 106°45′32″ E"}
        </p>
      </div>
    </div>
  );
};

export default FloatingJakartaTime;