"use client";

const OurCoreProcessSection = () => {
  const tallestCard = 965; // Card 1 height — used to align bottoms

  const cards = [
    {
      number: "1.",
      title: "Aligning the Goals & ROI",
      description: null, // rendered manually below with bold/italic
      width: 547,
      height: 965,
      imageHeight: 360,
    },
    {
      number: "2.",
      title: "Prototype to Learn",
      description: "We create a few solution directions and turn the best ones into interactive prototypes to test and validate early.\n\nAI helps speed up exploration, but decisions stay human and intentional.",
      width: 425,
      height: 756,
      imageHeight: 280,
    },
    {
      number: "3.",
      title: "Craft",
      description: "We refine the chosen direction with ruthless attention to detail layout, typography, microcopy, interactions, states, and edge cases, so it ends up premium and consistent.",
      width: 314,
      height: 551,
      imageHeight: 200,
    },
  ];

  return (
    <section
      className="relative w-full bg-white gridism-content-layer"
      data-theme="light"
      style={{ paddingBottom: "80px" }}
    >
      {/* Heading */}
      <div
        style={{
          paddingTop: "80px",
          paddingLeft: "4.86%",
          paddingBottom: "60px",
        }}
      >
        <h2
          style={{
            fontFamily: "'Switzer', sans-serif",
            fontWeight: 500,
            fontSize: "128px",
            lineHeight: "169px",
            letterSpacing: "-0.02em",
            color: "#000000",
            margin: 0,
          }}
        >
          Our Core Process
        </h2>
      </div>

      {/* Cards row — bottom aligned via absolute positioning inside a relative container
          Container height = tallest card (965px)
          Each card sits at top = tallestCard - card.height so bottoms align         */}
      <div
        style={{
          position: "relative",
          height: `${tallestCard}px`,
          marginLeft: "70px",
        }}
      >
        {cards.map((card, i) => {
          // Calculate left offset: sum of previous card widths + gaps
          const gap = 60;
          const leftOffset = cards
            .slice(0, i)
            .reduce((acc, c) => acc + c.width + gap, 0);

          // Top offset so all bottoms align
          const topOffset = tallestCard - card.height;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${leftOffset}px`,
                top: `${topOffset}px`,
                width: `${card.width}px`,
                height: `${card.height}px`,
                backgroundColor: "#000000",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Text content area */}
              <div
                style={{
                  flex: 1,
                  padding: "32px 28px 24px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  overflow: "hidden",
                }}
              >
                {/* Number + Title */}
                <p
                  style={{
                    fontFamily: "'Switzer', sans-serif",
                    fontWeight: 700,
                    fontSize: i === 0 ? "24px" : i === 1 ? "22px" : "20px",
                    lineHeight: i === 0 ? "32px" : "28px",
                    color: "#FFFFFF",
                    margin: 0,
                    textAlign: "justify",
                  }}
                >
                  {card.number}&nbsp;&nbsp;&nbsp;{card.title}
                </p>

                {/* Description */}
                {i === 0 ? (
                  <div>
                    <p
                      style={{
                        fontFamily: "'Switzer', sans-serif",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "22px",
                        color: "#FFFFFF",
                        margin: 0,
                        textAlign: "justify",
                      }}
                    >
                      <strong>Aligning the Goals & ROI.</strong>
                      {" We quickly align on what "}
                      <strong>"success"</strong>
                      {" means—business goal, user outcome, key metrics, and constraints"}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Switzer', sans-serif",
                        fontWeight: 400,
                        fontStyle: "italic",
                        fontSize: "16px",
                        lineHeight: "22px",
                        color: "#FFFFFF",
                        margin: 0,
                        marginTop: "16px",
                        textAlign: "justify",
                      }}
                    >
                      timeline&nbsp;&nbsp;&nbsp;tech&nbsp;&nbsp;&nbsp;brand
                    </p>
                  </div>
                ) : (
                  <p
                    style={{
                      fontFamily: "'Switzer', sans-serif",
                      fontWeight: 400,
                      fontSize: i === 1 ? "16px" : "14px",
                      lineHeight: i === 1 ? "22px" : "20px",
                      color: "#FFFFFF",
                      margin: 0,
                      textAlign: "justify",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {card.description}
                  </p>
                )}
              </div>

              {/* Bottom image */}
              <div
                style={{
                  width: "100%",
                  height: `${card.imageHeight}px`,
                  flexShrink: 0,
                }}
              >
                <img
                  src="/images/ezzralef.png"
                  alt={`Process ${card.number} preview`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OurCoreProcessSection;