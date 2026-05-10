"use client";

import { useEffect, useState } from "react";

export const useColorDetection = (yPosition: number) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      // Get element at specific Y position (center X)
      const x = window.innerWidth / 2;
      const y = yPosition;
      
      const element = document.elementFromPoint(x, y);
      
      if (!element) return;

      // Walk up DOM to find section with data-theme
      let currentElement: HTMLElement | null = element as HTMLElement;
      
      while (currentElement) {
        const theme = currentElement.getAttribute('data-theme');
        
        if (theme) {
          const newIsDark = theme === 'dark';
          if (newIsDark !== isDark) {
            setIsDark(newIsDark);
          }
          break;
        }
        
        currentElement = currentElement.parentElement;
      }
    };

    // Initial check
    setTimeout(checkTheme, 100);

    // Check on scroll
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkTheme();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', checkTheme);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkTheme);
    };
  }, [yPosition, isDark]);

  return isDark;
};