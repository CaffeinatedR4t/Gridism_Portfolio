import ConnectSection from "@/components/sections/connect/ConnectSection";
import StickyFooterImage from "@/components/StickyFooterImage";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us",
    robots: "index, follow",
    description: "Ready to build something iconic? Get in touch with Gridism to discuss your next digital project, branding, or web development needs.",
    alternates: {
        canonical: "https://gridism.co/connect",
    }
}

export default function Home() {
    return (
        <>
            <div className="relative gridism-content-layer bg-[#F9F9F7] flex flex-col">
                {/* Main connect content — exactly 100vh */}
                <ConnectSection />

                {/* Bottom bar — OUTSIDE the 100vh, attached below it */}
                <div
                    className="flex items-center w-full bg-[#F9F9F7]"
                    style={{
                        borderTop: "1px solid #000000",
                        padding: "24px 68px",
                        fontFamily: "'Switzer', sans-serif",
                        fontWeight: 400,
                        fontSize: "16px",
                        lineHeight: "21px",
                        color: "#000000",
                    }}
                >
                    {/* Left — @2026 */}
                    <p className="m-0" style={{ marginRight: "auto" }}>
                        @2026
                    </p>

                    {/* Center — Instagram & LinkedIn */}
                    <div className="flex items-center" style={{ gap: "40px" }}>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-60 transition-opacity no-underline group flex items-center gap-1"
                            style={{
                                fontFamily: "'Switzer', sans-serif",
                                fontWeight: 400,
                                fontSize: "16px",
                                lineHeight: "21px",
                                color: "#000000",
                                textAlign: "center",
                            }}
                        >
                            <span className="transition-transform duration-300 ease-in-out group-hover:-translate-x-1">-</span>
                            <span>Instagram</span>
                            <span className="transition-transform duration-300 ease-in-out group-hover:translate-x-1">-</span>
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-60 transition-opacity no-underline group flex items-center gap-1"
                            style={{
                                fontFamily: "'Switzer', sans-serif",
                                fontWeight: 400,
                                fontSize: "16px",
                                lineHeight: "21px",
                                color: "#000000",
                                textAlign: "center",
                            }}
                        >
                            <span className="transition-transform duration-300 ease-in-out group-hover:-translate-x-1">-</span>
                            <span>LinkedIn</span>
                            <span className="transition-transform duration-300 ease-in-out group-hover:translate-x-1">-</span>
                        </a>
                    </div>

                    {/* Right — Legals */}
                    <a
                        href="/legals"
                        className="hover:opacity-60 transition-opacity no-underline"
                        style={{
                            fontFamily: "'Switzer', sans-serif",
                            fontWeight: 400,
                            fontSize: "16px",
                            lineHeight: "21px",
                            color: "#000000",
                            textAlign: "right",
                            marginLeft: "auto",
                        }}
                    >
                        Legals
                    </a>
                </div>
            </div>

            {/* Sticky footer reveal section — invisible scroll space */}
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