"use client";

import Image from "next/image";

interface StickyFooterImageProps {
  imageSrc: string;
  logoSrc?: string;
}

const StickyFooterImage = ({ imageSrc, logoSrc }: StickyFooterImageProps) => {
  return (
    <div className="gridism-sticky-footer-image" aria-hidden="true">
      <img
        src={imageSrc}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
        }}
      />

      {logoSrc ? (
        <div className="gridism-sticky-footer-image-logo">
          <Image src={logoSrc} alt="" width={180} height={180} className="w-[min(180px,22vw)] h-auto" />
        </div>
      ) : null}
    </div>
  );
};

export default StickyFooterImage;
