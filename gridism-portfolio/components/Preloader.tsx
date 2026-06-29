"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

/* ── Cross size (the +.svg is 18 × 18) ───────────────────── */
const SZ = 18;

const SPIRAL: [number, number][] = [
  /* ① top row  right → left */
  [119, 0], [102, 0], [85, 0], [68, 0], [17, 0], [0, 0],
  /* ② down the left edge */
  [0, 68], [0, 119], [0, 136],
  /* ③ bottom → right (centered perfectly!) */
  [51, 136], [68, 136], [119, 136],
  /* ④ up the right edge (5 crosses total) */
  [119, 119], [119, 102], [119, 85], [119, 68],
  /* ⑤ middle row inward (R → L) */
  [85, 68], [68, 68], [51, 68], [34, 68], [17, 68],
];

const LOGO_W = 119;
const LOGO_H = 136;

export default function Preloader() {
  const pathname = usePathname();
  const router = useRouter();

  const [theme, setTheme] = useState<"light" | "dark">(
    pathname === "/work" ? "dark" : "light"
  );
  
  const [gone, setGone] = useState<Set<number>>(new Set());
  
  const [phase, setPhase] = useState<"show" | "spiral" | "fade-out" | "done" | "prepare" | "bg-fade-in" | "logo-fade-in">(
    "bg-fade-in"
  );

  const runOutAnimation = () => {
    const bag: ReturnType<typeof setTimeout>[] = [];
    const later = (fn: () => void, ms: number) => {
      bag.push(setTimeout(fn, ms));
    };

    setPhase("spiral");
    SPIRAL.forEach((_, i) => {
      later(() => setGone((s) => new Set(s).add(i)), i * 90);
    });

    later(() => {
      setPhase("fade-out");
      later(() => {
        setPhase("done");
        document.body.style.overflow = "";
      }, 600);
    }, SPIRAL.length * 90 + 200);

    return bag;
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const bag: ReturnType<typeof setTimeout>[] = [];

    // 1. Fade in the logo (background is already visible from initial render)
    bag.push(setTimeout(() => {
      setPhase("logo-fade-in");
    }, 500));

    // 2. Wait for logo to fully fade in, then spiral out
    bag.push(setTimeout(() => {
      const outBag = runOutAnimation();
      bag.push(...outBag);
    }, 1200));

    return () => {
      bag.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleTransition = (e: Event) => {
      const customEvent = e as CustomEvent<{ url: string }>;
      const { url } = customEvent.detail;

      if (pathname === url) return;

      document.body.style.overflow = "hidden";

      setTheme(url === "/work" ? "dark" : "light");
      setGone(new Set());
      setPhase("prepare");

      setTimeout(() => {
        setPhase("bg-fade-in");
      }, 20);

      setTimeout(() => {
        setPhase("logo-fade-in");
      }, 400);

      setTimeout(() => {
        router.push(url);

        setTimeout(() => {
          runOutAnimation();
        }, 150);
      }, 800);
    };

    window.addEventListener("start-transition", handleTransition);
    return () => window.removeEventListener("start-transition", handleTransition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, router]);

  if (phase === "done") return null;

  const isDark = theme === "dark";
  const bgColor = isDark ? "#060606" : "#F9F9F7";
  const svgFilter = isDark ? "none" : "invert(1)";
  
  const overlayOpacity = (phase === "fade-out" || phase === "prepare") ? 0 : 1;
  const logoOpacity = (phase === "prepare" || phase === "bg-fade-in" || phase === "fade-out") ? 0 : 1;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: bgColor,
        opacity: overlayOpacity,
        transition: "opacity 400ms cubic-bezier(0.4, 0, 0.2, 1), background-color 400ms ease",
      }}
    >
      <div
        style={{
          position: "relative",
          width: LOGO_W + SZ,
          height: LOGO_H + SZ,
          opacity: logoOpacity,
          transition: "opacity 300ms ease",
          transform: "scale(0.49)", 
        }}
      >
        {SPIRAL.map(([cx, cy], i) => {
          const off = gone.has(i);
          return (
            <img
              key={i}
              src="/images/+.svg"
              alt=""
              width={SZ}
              height={SZ}
              draggable={false}
              style={{
                position: "absolute",
                left: cx,
                top: cy,
                width: SZ,
                height: SZ,
                opacity: off ? 0 : 1,
                transform: off ? "scale(0.3)" : "scale(1)",
                transition: "opacity 80ms ease-out, transform 80ms ease-out",
                pointerEvents: "none",
                filter: svgFilter,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
