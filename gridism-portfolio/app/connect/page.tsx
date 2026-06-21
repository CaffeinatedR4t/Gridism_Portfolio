import ConnectSection from "@/components/sections/connect/ConnectSection";
import StickyFooterImage from "@/components/StickyFooterImage";

export default function Home() {
    return (
        <>
            <div className="relative gridism-content-layer bg-white flex flex-col">
                <ConnectSection />
                
                {/* Bottom bar */}
                <div className="flex justify-between items-center w-full border-t border-black py-5 px-[30px] bg-white">
                    <p className="text-[16px] leading-[19px] m-0 font-['Switzer',_sans-serif] text-black">
                        @2026
                    </p>
                    <div className="flex gap-20">
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-black text-[16px] hover:opacity-60 transition-opacity font-['Switzer',_sans-serif] no-underline"
                        >
                            -&nbsp; Instagram &nbsp;-
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-black text-[16px] hover:opacity-60 transition-opacity font-['Switzer',_sans-serif] no-underline"
                        >
                            -&nbsp; LinkedIn &nbsp;-
                        </a>
                    </div>
                    <a
                        href="/legals"
                        className="text-black text-[16px] hover:opacity-60 transition-opacity font-['Switzer',_sans-serif] no-underline"
                    >
                        Legals
                    </a>
                </div>
            </div>

            <section className="relative gridism-footer-layer" data-theme="black">
                <StickyFooterImage imageSrc="/images/Connect Footer.webp" />

                <div style={{ position: "relative", zIndex: 10 }}>
                    {/* ── Footer over sticky image ── */}
                    <div className="relative w-full h-[80svh]">
                        <div className="absolute inset-0 flex items-end" style={{ paddingBottom: "48px" }}>
                            <div className="w-full flex flex-row items-end justify-between px-[60px] box-border">
                                {/* Left — both buttons side by side */}
                                <div className="flex flex-row items-end gap-[48px]">
                                    <button
                                        className="text-white cursor-pointer hover:opacity-70 transition-opacity"
                                        style={{
                                            fontFamily: "'Switzer', sans-serif",
                                            fontSize: "16px",
                                            lineHeight: "22px",
                                            textAlign: "left",
                                            background: "none",
                                            border: "none",
                                            padding: 0,
                                        }}
                                    >
                                        OUR WORKS<br />(DETAILED)
                                    </button>

                                    <button
                                        className="text-white cursor-pointer hover:opacity-70 transition-opacity"
                                        style={{
                                            fontFamily: "'Switzer', sans-serif",
                                            fontSize: "16px",
                                            lineHeight: "22px",
                                            background: "none",
                                            border: "none",
                                            padding: 0,
                                            paddingBottom: "2px",
                                        }}
                                    >
                                        LET&apos;S DISCUSS
                                    </button>
                                </div>

                                {/* Right — Gridism logo */}
                                <img
                                    src="/images/Alternative Grid Logo.webp"
                                    alt="Gridism Icon"
                                    className="h-[80px] lg:h-[120px] w-auto shrink-0 mix-blend-difference object-contain brightness-0 invert"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}