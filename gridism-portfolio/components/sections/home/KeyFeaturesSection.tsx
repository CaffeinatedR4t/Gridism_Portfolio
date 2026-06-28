"use client";

import { motion, Variants } from "framer-motion";

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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  const pieceVariants: Variants = {
    hidden: { opacity: 0, y: 100 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        delay: 0.2 + (i * 0.2),
        ease: "easeOut" as const 
      }
    })
  };

  return (
    <section
      className="relative w-full bg-[#F9F9F7] overflow-hidden gridism-content-layer flex items-center h-[100svh]"
      data-theme="light"
    >
      <div
        className="relative w-full flex flex-row items-center justify-between px-10 lg:px-[70px]"
      >
        {/* Heading Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2
            style={{
              fontFamily: "'Switzer', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(60px, 8.5vw, 130px)",
              lineHeight: "0.95",
              color: "#000000",
              maxWidth: "850px",
              margin: 0
            }}
          >
            Key Features<br />That Define<br />Us, Always
          </h2>
        </motion.div>

        {/* Right side composition */}
        <div className="relative mt-24" style={{ width: "321.6px", height: "516px" }}>
          
          {/* Piece 1: Knight (Back Left) */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={pieceVariants}
            className="absolute"
            style={{ width: "153.5px", left: "0px", top: "0px", zIndex: 1 }}
          >
            <img
              src="/images/icon-key features-Knight.png"
              alt="Knight"
              className="w-full h-auto object-contain"
            />
          </motion.div>

          {/* Piece 2: Bishop (Back Right) */}
          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={pieceVariants}
            className="absolute"
            style={{ width: "153.5px", left: "168.1px", top: "54.1px", zIndex: 1 }}
          >
            <img
              src="/images/icon-key features-Bishop.png"
              alt="Bishop"
              className="w-full h-auto object-contain"
            />
          </motion.div>

          {/* Piece 3: Rook (Front Center) */}
          <motion.div
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={pieceVariants}
            className="absolute"
            style={{ width: "153.5px", left: "31.38px", top: "126.59px", zIndex: 10 }}
          >
            <img
              src="/images/icon-key features-chess rook.png"
              alt="Rook"
              className="w-full h-auto object-contain"
            />
          </motion.div>

          {/* Text List Overlay */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="absolute flex flex-col gap-1.5 z-20"
            style={{
              left: "-30px",
              bottom: "40px",
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
              <motion.p key={index} variants={itemVariants} className="m-0">
                {service}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default KeyFeaturesSection;
