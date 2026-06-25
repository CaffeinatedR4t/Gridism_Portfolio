"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isBlended, setIsBlended] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // 1. Show/Hide Logic
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
      // 2. Blend Mode Threshold (10px)
      setIsBlended(true)
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { href: "/", label: "Home", italic: false },
    { href: "/work", label: "Work", italic: false },
    { href: "/about", label: "About", italic: false },
    { href: "/connect", label: "Connect", italic: true },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-transform duration-700 ease-[cubic-bezier(0.45,0,0.15,1)] bg-transparent"
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
        mixBlendMode: isBlended ? "difference" : "normal",
      }}
    >
      <nav
        className="relative w-full mx-auto flex items-center justify-between"
        style={{
          maxWidth: "1440px",
          padding: "20px 50px",
        }}
      >
        
        {/* Logo — far left */}
        <Link href="/" className="relative z-50 flex items-center" style={{ gap: "10px" }}>
          <img
            src="/images/GRD WHITE TM.png"
            alt="Gridism"
            width={32}
            height={29}
            className="transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
          />
        </Link>

        {/* Nav links — far right */}
        <ul className="flex items-center" style={{ gap: "104px" }}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:opacity-70 group ${
                  link.italic ? "italic" : ""
                }`}
                style={{  
                  fontFamily: "'Switzer', sans-serif",
                  fontSize: "18px",
                  lineHeight: "24px",
                  fontWeight: 400,
                  color: "#FFFFFF",
                }}
              >
                {link.label}
                <span
                  className="absolute left-1/2 bottom-[-2px] w-0 h-[2px] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:w-full group-hover:left-0"
                  style={{ backgroundColor: "#F9F9F7"}}
                />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
