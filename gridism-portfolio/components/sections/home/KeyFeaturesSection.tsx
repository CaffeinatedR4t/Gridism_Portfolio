"use client";

import { motion } from "framer-motion";

const KeyFeaturesSection = () => {
  const services = [
    "Research and Development",
    "Creative development",
    "Personal Branding",
    "Software / SaaS",
    "E-commerce strategy",
    "User Interface (UI)",
    "User Experience (UX)"
  ];

  return (
    <section
      className="relative w-full bg-white overflow-hidden gridism-content-layer"
      data-theme="light"
    >
      <div
        className="relative max-w-[1440px] mx-auto flex flex-row items-center justify-between"
        style={{ padding: "150px 100px 150px 119px" }}
      >
        {/* Heading - Semi Bold */}
        <h2
          style={{
            fontFamily: "'Switzer', sans-serif",
            fontWeight: 600,
            fontSize: "96px",
            lineHeight: "1.1",
            color: "#000000",
            maxWidth: "852px",
            margin: 0
          }}
        >
          Key Features<br />That Define<br />Us, Always
        </h2>

        {/* Right side container with rising animation */}
        <motion.div
          className="relative flex items-center"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{
            width: "500px",
            height: "500px",
          }}
        >
          {/* Image Container */}
          <div
            style={{
              width: "307.88px",
              height: "494px",
            }}
          >
            <img
              src="/images/Thumbnail Website Porto.png"
              alt="Chess Piece"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Text List Overlay - Mix Blend Mode Difference, Regular Font */}
          <div
            className="absolute left-[200px] top-[260px] flex flex-col gap-2"
            style={{
              fontFamily: "'Switzer', sans-serif",
              fontSize: "20px",
              fontWeight: 400,
              lineHeight: "1.2",
              whiteSpace: "nowrap",
              mixBlendMode: "difference",
              color: "#FFFFFF" 
            }}
          >
            {services.map((service, index) => (
              <p key={index} className="m-0">{service}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default KeyFeaturesSection;
