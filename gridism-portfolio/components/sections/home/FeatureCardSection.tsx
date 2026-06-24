"use client";

interface Image {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface FeatureCardProps {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  images: Image[];
  chessPiece: string;
  chessPieceSize: { width: number; height: number };
  bgColor?: "white" | "black";
  slideDirection?: "left" | "right";
  cardClassName?: string;
  panelHeight?: string;
  galleryTop?: string;
  galleryHeight?: string;
  descriptionWidth?: string;
  hideChessPiece?: boolean;
}

const FeatureCardSection = ({
  number,
  title,
  subtitle,
  description,
  images,
  chessPiece,
  chessPieceSize,
  bgColor = "white",
  slideDirection = "left",
  cardClassName = "",
  panelHeight = "306px",
  galleryTop = "clamp(300px, 42svh, 334px)",
  galleryHeight = "min(338px, 43svh)",
  descriptionWidth = "min(600px, 100%)",
  hideChessPiece = false,
}: FeatureCardProps) => {
  const theme = bgColor === "black" ? "dark" : "light";
  const sectionBg = bgColor === "black" ? "#000000" : "#FFFFFF";

  const trackAnimationClass =
    slideDirection === "left" ? "run-marquee-left" : "run-marquee-right";

  const renderImageBlock = (suffix: string) => (
    <div
      key={suffix}
      className="flex shrink-0"
      style={{ gap: "20px", paddingRight: "20px" }}
    >
      {images.map((image, i) => (
        <div
          className="feature-card-image"
          key={`${suffix}-${i}`}
          style={{
            flexShrink: 0,
            width: `calc(${image.width}px * var(--feature-card-image-scale, 1))`,
            height: `calc(${image.height}px * var(--feature-card-image-scale, 1))`,
            outlineOffset: "2px",
          }}
        >
          <img
            src={image.src}
            alt={image.alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      ))}
    </div>
  );

  return (
    <section
      className={`feature-card-section relative w-full gridism-content-layer ${cardClassName}`.trim()}
      data-theme={theme}
      style={{
        backgroundColor: sectionBg,
        height: "100svh",
        overflow: "hidden",
      }}
    >
      <div
        className="feature-card-panel-wrap"
        style={{
          position: "absolute",
          top: "clamp(96px, 19svh, 153px)",
          left: 0,
          width: "100%",
          paddingLeft: "70px",
          paddingRight: "70px",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <div
          className="feature-card-panel"
          style={{
            position: "relative",
            width: "min(1300px, 100%)",
            height: panelHeight,
            backgroundColor: "#000000",
            backgroundImage: "url('/images/Key Features Text Background.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "50px",
            overflow: "visible",
          }}
        >
          {/* Title row — height=92px */}
          <div
            className="feature-card-title-row"
            style={{
              width: "100%",
              height: "92px",
              display: "flex",
              alignItems: "flex-end",
              paddingLeft: "58px",
              paddingRight: "59px",
              boxSizing: "border-box",
            }}
          >
            <p
              className="feature-card-title"
              style={{
                fontFamily: "'Switzer', sans-serif",
                fontWeight: 400,
                fontSize: "40px",
                lineHeight: "53px",
                color: "#FFFFFF",
                margin: 0,
              }}
            >
              {title}
            </p>
          </div>

          {/* Info row — number, subtitle, description */}
          <div
            className="feature-card-copy-wrap"
            style={{
              width: "100%",
              paddingLeft: "55px",
              paddingRight: "55px",
              boxSizing: "border-box",
            }}
          >
            <div
              className="feature-card-info-row"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: "25px",
                width: "100%",
                paddingBottom: "50px",
              }}
            >
              {/* Number — no border */}
              <p
                className="feature-card-number"
                style={{
                  flexShrink: 0,
                  width: "109px",
                  height: "21px",
                  fontFamily: "'Switzer', sans-serif",
                  fontWeight: 400,
                  fontSize: "20px",
                  lineHeight: "26px",
                  color: "#FFFFFF",
                  margin: 0,
                }}
              >
                {number}
              </p>

              {/* Subtitle — no border */}
              <p
                className="feature-card-subtitle"
                style={{
                  flexShrink: 0,
                  width: "195px",
                  height: "21px",
                  fontFamily: "'Switzer', sans-serif",
                  fontWeight: 400,
                  fontSize: "20px",
                  lineHeight: "26px",
                  color: "#FFFFFF",
                  margin: 0,
                }}
              >
                {subtitle}
              </p>

              {/* Description — capped so chess piece is visible */}
              <p
                className="feature-card-description"
                style={{
                  width: descriptionWidth,
                  fontFamily: "'Switzer', sans-serif",
                  fontWeight: 400,
                  fontSize: "20px",
                  lineHeight: "26px",
                  textAlign: "justify",
                  color: "#FFFFFF",
                  margin: 0,
                }}
              >
                {description}
              </p>
            </div>
          </div>

          {/* Chess piece — right side of black box */}
          {!hideChessPiece && (
            <div
              className="feature-card-chess-piece"
              style={{
                position: "absolute",
                right: "40px",
                top: "50%",
                transform: "translateY(-50%)",
                width: `${chessPieceSize.width}px`,
                height: `${chessPieceSize.height}px`,
                zIndex: 20,
              }}
            >
              <img
                src={chessPiece}
                alt="Chess Piece"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Image gallery */}
      <div
        className="feature-card-gallery-wrap"
        style={{
          backgroundColor: sectionBg,
          overflow: "hidden",
          position: "absolute",
          top: galleryTop,
          left: 0,
          width: "100%",
          height: galleryHeight,
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: "100%",
            overflow: "hidden",
            paddingLeft: "30px",
            height: "100%",
          }}
        >
          <div className={`flex shrink-0 w-max ${trackAnimationClass}`}>
            {renderImageBlock("orig")}
            {renderImageBlock("clone")}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCardSection;