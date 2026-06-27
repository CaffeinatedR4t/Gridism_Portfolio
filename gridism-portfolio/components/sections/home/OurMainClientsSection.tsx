"use client";

import { motion } from "framer-motion";

const clients = [
  { id: "01", name: "EZZRALE", src: "/images/ezzralef.png", w: 955 },
  { id: "02", name: "Alfred Situmorang", src: "/images/Frame 64.png", w: 828 },
  // Add more clients here as needed
];

const ClientCard = ({ client }: { client: typeof clients[0] }) => (
  <div 
    className="relative shrink-0 overflow-hidden group"
    style={{ 
      width: `calc(65vh * ${client.w / 913})`, 
      height: "65vh",
      maxHeight: "700px",
      transform: "translate3d(0,0,0)",
      backfaceVisibility: "hidden"
    }}
  >
    <img
      src={client.src}
      alt={client.name}
      loading="eager"
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-[#060606]/10 group-hover:bg-transparent transition-colors duration-500" />
    <p
      className="absolute top-6 right-6 lg:top-10 lg:right-10 text-white font-['Switzer',sans-serif] text-[24px] lg:text-[40px] font-normal leading-tight"
    >
      {client.id} &nbsp; {client.name}
    </p>
  </div>
);

const OurMainClientsSection = () => {
  return (
    <section
      className="relative w-full bg-[#F9F9F7] overflow-hidden pt-16 lg:pt-24 gridism-content-layer flex flex-col items-center"
      data-theme="light"
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slideRightInfinite {
          0% { transform: translate3d(-33.3333%, 0, 0); }
          100% { transform: translate3d(0%, 0, 0); }
        }
        .animate-main-clients-right {
          animation: slideRightInfinite 40s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }
      `}} />

      {/* "Main Clients" heading */}
      <div className="w-full max-w-[1720px] mx-auto px-6 md:px-10 mb-12 lg:mb-20 text-center">
        <h2 className="text-black font-['Switzer',sans-serif] font-medium text-[64px] lg:text-[120px] leading-[0.9] tracking-tight m-0">
          Main Clients
        </h2>
      </div>

      {/* Infinite Slider */}
      <div className="relative w-full overflow-hidden mb-20 lg:mb-32">
        <div className="flex w-max animate-main-clients-right">
          {/* Block 1 (Buffer) */}
          <div className="flex gap-6 lg:gap-10 pr-6 lg:pr-10">
            {clients.map((client, i) => (
              <ClientCard key={`b1-${i}`} client={client} />
            ))}
          </div>
          {/* Block 2 (Active) */}
          <div className="flex gap-6 lg:gap-10 pr-6 lg:pr-10">
            {clients.map((client, i) => (
              <ClientCard key={`b2-${i}`} client={client} />
            ))}
          </div>
          {/* Block 3 (Buffer) */}
          <div className="flex gap-6 lg:gap-10 pr-6 lg:pr-10">
            {clients.map((client, i) => (
              <ClientCard key={`b3-${i}`} client={client} />
            ))}
          </div>
        </div>
      </div>

      {/* 1. Grid Separator Strip */}
      <div className="w-full h-[30vh] lg:h-[40vh] flex items-start justify-center bg-[#F9F9F7] overflow-hidden">
        <img 
          src="/images/Alternative Grid Logo.webp" 
          className="h-[80px] lg:h-[120px] w-auto object-contain" 
          alt="Separator" 
        />
      </div>

      {/* 2. Video Branding Section */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/Animasi Coklat.mp4" type="video/mp4" />
        </video>

        {/* Branding Overlay */}
        <div className="absolute inset-0 flex items-center justify-between px-10 lg:px-[70px]">
          {/* Left: Logo */}
          <div className="relative z-10">
            <img 
              src="/images/GRD WHITE LOGO.png" 
              className="h-[30px] md:h-[40px] lg:h-[50px] w-auto object-contain" 
              alt="Gridism Logo" 
            />
          </div>

          {/* Center: King Mask Shape */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
             <img 
              src="/images/Salinan Raja png.png" 
              className="h-full w-auto object-contain scale-110" 
              style={{ transformOrigin: 'center' }}
              alt="King Piece" 
            />
          </div>

          {/* Right: Branding Text */}
          <div className="relative z-10">
             <p className="text-white font-['Switzer',sans-serif] text-[18px] md:text-[20px] lg:text-[24px] tracking-[0.4em] font-normal uppercase">
               G R I D I S M
             </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMainClientsSection;