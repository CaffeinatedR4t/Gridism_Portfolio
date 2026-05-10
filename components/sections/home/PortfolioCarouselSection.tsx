"use client";

const PortfolioCarouselSection = () => {
  const images = [
    { w: 310, h: 253 },
    { w: 310, h: 253 },
    { w: 263, h: 253 },
    { w: 316, h: 252 },
    { w: 257, h: 254 },
    { w: 407, h: 254 },
  ];

  return (
    <section
      className="relative w-full bg-black overflow-hidden"
      style={{ height: "254px" }}
      data-theme="dark"
    >
      <div
        className="absolute flex flex-row items-center"
        style={{
          left: "-508px",
          top: "0px",
          gap: "20px",
          padding: "0px 295px",
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="flex-none"
            style={{ width: `${img.w}px`, height: `${img.h}px` }}
          >
            <img
              src="/images/ezzralef.png"
              alt={`Portfolio ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioCarouselSection;