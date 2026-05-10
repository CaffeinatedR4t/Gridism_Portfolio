"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isBlended, setIsBlended] = useState(pathname != "/");


  useEffect(() => {
      if(pathname == "/") {
        setIsBlended(window.scrollY > 30)
      }
      else {
        setIsBlended(true)
      }    
  }, [pathname])

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
      if(pathname == "/") {
        setIsBlended(currentScrollY > 30)
      }
      else {
        setIsBlended(true)
      }    
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, pathname]);

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
      <nav className="relative w-full max-w-[1440px] mx-auto px-15 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="relative z-50">
          <img
            src="icon.svg"
            alt="Gridism"
            width={100}
            height={100}
            className="transition-all duration-300"
            style={{
              // When blended, it must be white (#FFFFFF) to work with "difference"
              // When normal (at top), it stays its original color (assuming black)
              filter: isBlended ? "invert(1)" : "none",
            }}
          />
        </Link>

        {/* Nav links */}
        <ul className="flex items-center gap-8 lg:gap-35">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative text-[14px] lg:text-[16px] leading-[20px] transition-colors duration-500 hover:opacity-70 group ${
                  link.italic ? "italic" : ""
                }`}
                style={{  
                  // Force white color when blended so it can invert against backgrounds
                  color: "#FFFFFF"
                }}
              >
                {link.label}
                <span
                  className="absolute left-1/2 bottom-0 w-0 h-[1.5px] transition-all duration-300 ease-out group-hover:w-full group-hover:left-0"
                  style={{ backgroundColor: "#FFFFFF"}}
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