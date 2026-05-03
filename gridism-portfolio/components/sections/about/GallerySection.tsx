"use client"; // Required because we are using React hooks

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function GallerySection() {
  // 1. Create the reference for the section
  const containerRef = useRef(null);

  // 2. Track scroll progress when this section is in the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 3. Map vertical scroll to horizontal movement (0% to -50%)
  const xMovement = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const photos = [
    {
      src: '/images/IMG_6297.jpg',
      alt: 'Group of four friends in a casual room setting',
      width: 3024,
      height: 4032,
    },
    {
      src: '/images/IMG_8790.jpg',
      alt: 'Screen displaying various design projects and portfolio work',
      width: 1920,
      height: 1080,
    },
    {
      src: '/images/image.jpg',
      alt: 'Two speakers presenting on stage with an event background',
      width: 2000,
      height: 2667,
    },
     {
      src: '/images/image.jpg',
      alt: 'Two speakers presenting on stage with an event background',
      width: 2000,
      height: 2667,
    },
     {
      src: '/images/image.jpg',
      alt: 'Two speakers presenting on stage with an event background',
      width: 2000,
      height: 2667,
    },
  ]

  return (
    // 4. Attaching the ref to the section so Framer Motion can track it
    <section ref={containerRef} className="mb-16 h-[500px] w-full overflow-hidden">

      <motion.div 
        style={{ x: xMovement }}
        className="flex shrink-0 w-max h-full"
      >
        <div className="flex shrink-0 w-max h-full run-marquee-left hover:[animation-play-state:paused]">
            <div className="flex shrink-0 gap-1 pr-1 h-full">
          {photos.map((photo, index) => (
              <Image
                key={`photo-orig-${index}`}
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={500}
                className="h-full w-auto aspect-[3/4] object-cover shrink-0"
              />
          ))}
        </div>
        <div className="flex shrink-0 gap-1 pr-1 h-full">
          {photos.map((photo, index) => (
              <Image
                key={`photo-clone-${index}`}
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={500}
                className="h-full w-auto aspect-[3/4] object-cover shrink-0"
              />
          ))}
        </div>
          </div>
      
      </motion.div>
    </section>
  )
}