"use client";

const OurMainClientsSection = () => {
  return (
    <section
      className="relative w-full overflow-hidden gridism-content-layer"
      data-theme="light"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      {/* "Main Clients" heading */}
      <div
        style={{
          paddingTop: "0px",
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
          Main Clients
        </h2>
      </div>

      {/* Client cards */}
      <div
        style={{
          position: "relative",
          height: "1104px",
          marginBottom: "80px",
        }}
      >
        {/* Card 1 — EZZRALE: 955×913px */}
        <div
          style={{
            position: "absolute",
            left: "0px",
            top: "0px",
            width: "955px",
            height: "913px",
          }}
        >
          <img
            src="/images/ezzralef.png"
            alt="EZZRALE"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <p
            style={{
              position: "absolute",
              left: "653px",
              top: "68px",
              width: "302px",
              fontFamily: "'Switzer', sans-serif",
              fontWeight: 400,
              fontSize: "40px",
              lineHeight: "53px",
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            01  EZZRALE
          </p>
        </div>

        {/* Card 2 — Alfred Situmorang: 828×1104px */}
        <div
          style={{
            position: "absolute",
            left: "1000px",
            top: "0px",
            width: "828px",
            height: "1104px",
          }}
        >
          <img
            src="/images/Frame 64.png"
            alt="Alfred Situmorang"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          <p
            style={{
              position: "absolute",
              left: "471px",
              top: "68px",
              width: "617px",
              fontFamily: "'Switzer', sans-serif",
              fontWeight: 400,
              fontSize: "40px",
              lineHeight: "53px",
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            02  Alfred Situmorang
          </p>
        </div>
      </div>

      {/* Group 103 — full-bleed image
          Figma: width=1525px left=-36px → bleeds 36px on both sides
          We use w-full + overflow-hidden on section to crop sides naturally
          height=120svh                                                     */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "120svh",
          overflow: "hidden",
        }}
      >
        <img
          src="/images/Group 103.webp"
          alt="Gridism"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            width: "1525px",
            height: "120svh",
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* "G R I D I S M" text
            Figma: left=1040px, top=11027px - 10528px = 499px from image top
            width=292px, height=37px, color=#FFFFFF                         */}
        <p
          style={{
            position: "absolute",
            left: "1040px",
            top: "499px",
            width: "292px",
            height: "37px",
            fontFamily: "'Switzer', sans-serif",
            fontWeight: 400,
            fontSize: "20px",
            letterSpacing: "0.3em",
            color: "#FFFFFF",
            margin: 0,
            display: "flex",
            alignItems: "center",
          }}
        >

        </p>
      </div>
    </section>
  );
};

export default OurMainClientsSection;