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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const pieceVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        delay: 0.2 + (i * 0.2),
        ease: "easeOut" 
      }
    })
  };

  return (
    <section
      className="relative w-full bg-white overflow-hidden gridism-content-layer"
      data-theme="light"
    >
      <div
        className="relative max-w-[1440px] mx-auto flex flex-row items-center justify-between"
        style={{ padding: "clamp(60px, 10vw, 150px) 70px" }}
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
              fontSize: "clamp(60px, 11vw, 150px)",
              lineHeight: "0.95",
              color: "#000000",
              maxWidth: "1009px",
              margin: 0
            }}
          >
            Key Features<br />That Define<br />Us, Always
          </h2>
        </motion.div>

        {/* Right side composition */}
        <div className="relative flex items-center justify-end" style={{ width: "400px", height: "550px" }}>
          
          {/* Piece 1: Knight (Back Left) */}
          <motion.div
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={pieceVariants}
            className="absolute"
            style={{ width: "220px", left: "-50px", top: "0px", zIndex: 1 }}
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
            style={{ width: "220px", right: "-30px", top: "50px", zIndex: 1 }}
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
            style={{ width: "280px", left: "60px", top: "160px", zIndex: 10 }}
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
            className="absolute flex flex-col gap-1 z-20"
            style={{
              left: "110px",
              top: "280px",
              fontFamily: "'Switzer', sans-serif",
              fontSize: "24px",
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
