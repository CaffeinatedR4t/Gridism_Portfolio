"use client";

const KeyFeaturesSection = () => {
  return (
    <section
      className="relative w-full bg-white overflow-hidden gridism-content-layer"
      data-theme="light"
    >
      <div
        className="relative max-w-[1440px] mx-auto"
        style={{ padding: "300px 200px 140px 119px" }}
      >
        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Switzer', sans-serif",
            fontWeight: 500,
            fontSize: "96px",
            lineHeight: "127px",
            color: "#000000",
            maxWidth: "852px",
          }}
        >
          Key Features That Define Us
        </h2>

        {/* Chess piece — absolute, right side, vertically centered */}
        <div
          className="absolute"
          style={{
            right: "80px",
            top: "50%",
            transform: "translateY(-50%)",
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
      </div>
    </section>
  );
};

export default KeyFeaturesSection;