import Image from "next/image"
import horseChessPieceImg from "../../../public/images/Kuda.svg"

// Each line segment is a solid-background div — immune to Tailwind border resets
const Line = ({
    style,
    className = "",
}: {
    style: React.CSSProperties
    className?: string
}) => (
    <div
        aria-hidden="true"
        className={className}
        style={{
            position: "absolute",
            backgroundColor: "#FFFFFF",
            pointerEvents: "none",
            zIndex: 10,
            ...style,
        }}
    />
)

export const HeroSectionWork = () => {
    return (
        <section className="bg-[#060606] min-h-screen text-white gridism-content-layer">
            <div className="max-w-[1440px] min-h-screen flex justify-center items-center mx-auto px-15">
                <div
                    className="relative min-h-[500px] flex flex-col justify-start w-full"
                    style={{ overflow: "visible" }}
                >

                    {/* GRIDISM + chess piece — centered */}
                    <div className="items-center flex mb-5 justify-center gap-5">
                        <Image priority src={horseChessPieceImg} alt="Horse Chess Piece" className="h-auto w-full max-w-[40px] sm:max-w-[60px] md:max-w-[80px] lg:max-w-[120px]" />
                        <h1 className="text-[40px] sm:text-[60px] md:text-[80px] lg:text-[120px] font-normal tracking-[0.5em]">GRIDISM</h1>
                    </div>

                    {/* Subtitle — unchanged */}
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal font-family">All works that we <br/> proud to show</h2>

                    {/* Description — completely unchanged */}
                    <div className="text-base w-full gap-5 flex flex-row text-left absolute bottom-0 right-0 text-balance flex-end md:w-[45%] md:gap-0 md:flex-col md:text-right md:text-lg lg:text-xl">
                        <h3 className="font-bold">We do Branding and Web for the Global Market.</h3> <br/>
                        <p>Full-service creative solutions for lifestyle and tech brands. From Jakarta to the world, we deliver strategy, identity, and digital products.</p>
                    </div>

                    {/*
                     * ─── UPPER BRACKET ───────────────────────────────────────────────
                     * Connects "All works that we proud to show" (left)
                     * to "We do Branding and Web..." (right).
                     *
                     * Path: horizontal → (from subtitle right edge to description left)
                     *       then vertical ↓ (down to description level)
                     *
                     * x-anchor: description is right:0 width:45%, so its left edge
                     * sits at 55% from the container's left edge.
                     * ──────────────────────────────────────────────────────────────── */}

                    {/* Horizontal — extends right over description text */}
                    <Line
                        className="hidden lg:block"
                        style={{ top: 250, left: 320, right: "15%", height: 1 }}
                    />
                    {/* Vertical — drops from horizontal right end */}
                    <Line
                        className="hidden lg:block"
                        style={{ top: 250, left: "85%", width: 1, height: 90 }}
                    />

                    {/* Horizontal — short span left of the description */}
                    <Line
                        className="hidden lg:block"
                        style={{ top: 440, left: "25%", right: "calc(45% - 120px)", height: 1 }}
                    />
                    {/* Vertical — drops from left end of horizontal into content below */}
                    <Line
                        className="hidden lg:block"
                        style={{ top: 440, left: "25%", width: 1, height: 250 }}
                    />

                </div>
            </div>
        </section>
    )
}

export default HeroSectionWork
