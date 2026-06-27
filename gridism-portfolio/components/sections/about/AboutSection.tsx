import {TeamSlider} from "@/components/TeamSlider"
import Image from "next/image";
import { cn } from "@/utils/cn";
import GallerySection from "./GallerySection";

const theme = {
    typography: {
        fontHeader: "text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
    },
    spacing: {
        fontRed: "flex flex-row justify-between",
        flexCol: "flex flex-col",
        flexRow: "flex flex-row"
    }
}

// "text-base sm:text-xs md:text-lg lg:text-3xl xl:text-4xl font-light text-black tracking-wider leading-relaxed"

const STRATEGY_GROUPS = [
    ["Personal Branding", "Consulting", "E-commerce strategy", "Brand & Strategy"],
    ["User Experience (UX)", "User Interface (UI)", "Wireframes & Prototyping", "User Analysis Research"],
    ["Creative Development", "Research & Development", "Front-end Development", "Back-end Development"]
];

const MARQUEE_IMAGES = [
    { src: "/images/image 5.webp", alt: "Image 1", width: 284 },
    { src: "/images/image 6.webp", alt: "Image 2", width: 355 },
    { src: "/images/image 7.webp", alt: "Image 3", width: 265 },
    { src: "/images/image 9.webp", alt: "Image 4", width: 358 },
    { src: "/images/gridisimd 1ddd.webp", alt: "Image 5", width: 357 },
];

// const FOUNDERS = [
//     { name: "Jeremy Joseph Pohar", position: "Founder & Chief Technology Officer (CTO)", desc: "Jeremy has over 7 years of experience in web development and technical problem-solving. He leads the technical development at Gridisim, focusing on building scalable, efficient, and high-performance digital solutions through clean and structured code.", src: "/images/jeremy foto profile.png", alt: "Founders Picture", width: 300, height: 400 },
//     { name: "Heles Ofalius", position: "Founder & Chief Creative Officer (CCO)", desc: "Ofalius has over 8 years of experience in visual design and digital branding. He leads the creative direction at Gridisim, overseeing brand identity, visual systems, and digital experiences. His work focuses on clarity, aesthetics, and strategic storytelling across platforms.", src: "/images/heles foto profile.png", alt: "Founders Picture", width: 300, height: 400 },
//     { name: "Jason Julius Then", position: "Co-Founder & Head of Engineering", desc: "Jason has more than 5 years of experience in website development and system implementation.At Gridisim, he focuses on execution, optimization, and maintaining development quality to ensure reliable and seamless digital products.", src: "/images/jay foto profile.png", alt: "Founders Picture", width: 300, height: 400 },
//     { name: "Alexander Valentino Lion", position: "Co-Founder & Chief Marketing Officer (CMO)", desc: "Alex has over 5 years of experience in marketing strategy and business management. He leads growth, client acquisition, and brand positioning at Gridisim, ensuring sustainable operations and strong market presence.", src: "/images/alex foto profile.png", alt: "Founders Picture", width: 300, height: 400 },
// ]

const AboutSection = () => {
    // Shared class for the mission statement headers
    return (
        <section className="bg-[#F9F9F7] gridism-content-layer">
            {/* HERO SECTION: Cyborg + Absolute Text */}
            <div className="relative min-h-screen">
                <div className="relative min-h-screen">
                    <video src="/videos/about/people-skating-on-ice-skating-rink-outdoors-winter.mov" width={"full"} height={"auto"} autoPlay muted playsInline></video>
                </div>
                <Image src="/images/ICON WHITE.webp" alt="gridism logo" width={200} height={200} className="absolute inset-0 m-auto" />
            </div>

            {/* DESCRIPTION SECTION */}
            <div className={cn(theme.spacing.flexCol, "min-h-screen items-center justify-center")}>
                <div className="w-[90%] mx-auto max-w-6xl flex flex-col items-center gap-10 text-center">
                    {/* Mapped Mission Headers */}
                    <h1 className={cn(theme.typography.fontHeader, "text-balance")}>Building Iconic Brands and Digital Experiences</h1>
                    <h2 className="font-regular text-xl sm:text-2xl md:text-3xl lg:text-4xl text-balance">Brand & Digital Consultancy, We help Lifestyle and tech brands build the presence they deserve.</h2>
                </div>
            </div>
            <div className="flex flex-col flex-start gap-5 md:flex-row md:gap-20 p-5 bg-[#060606] md:items-center text-white text-left">
                <h3 className="text-base sm:text-sm md:text-lg lg:text-2xl xl:text-3xl font-semibold leading-normal">Outcomes Over Process.</h3>
                <p className="text-base sm:text-sm md:text-md lg:text-xl xl:text-2xl font-regular tracking-wider text-justify">
                    We help brands and products build premium experiences that deliver ROI through rapid prototyping (AI), sharp decision-making, and meticulous detail crafting from start to finish. My process is flexible—what remains consistent are the outcome, quality, and impact.
                </p>
            </div>

            {/* STRATEGY & OVERLAY SECTION */}
            <div className="relative overflow-hidden w-full my-30">
                <div className="flex flex-col gap-[8vw] text-black text-center">

                    <div className="flex flex-col gap-20">
                        <h3 className={cn(theme.typography.fontHeader, "text-balance")}>Ideas and Strategy</h3>

                        {/* Mapped Strategy Groups - The Infinite Marquee */}
                        {STRATEGY_GROUPS.map((group, groupIndex) => {
                            // Determine direction: Evens go left, Odds go right
                            const isEven = groupIndex % 2 === 0;
                            const animationClass = isEven ? "run-marquee-left" : "run-marquee-right";

                            return (
                                // The main wrapper MUST have overflow-hidden
                                <div key={groupIndex} className="flex w-full overflow-hidden bg-[#F9F9F7]/5 py-4">

                                    {/* The animated moving track */}
                                    <div className={cn("flex shrink-0 w-max", animationClass)}>

                                        {/* Block 1 (Original) */}
                                        <div className="flex shrink-0 gap-20 px-10 items-center">
                                            {group.map((item, itemIndex) => (
                                                <p key={`original-${itemIndex}`} className="text-2xl md:text-3xl  font-light whitespace-nowrap">
                                                    {item}
                                                </p>
                                            ))}
                                        </div>

                                        {/* Block 2 (The Clone Illusion) */}
                                        <div className="flex shrink-0 gap-20 px-10 items-center">
                                            {group.map((item, itemIndex) => (
                                                <p key={`clone-${itemIndex}`} className="text-2xl md:text-3xl font-light whitespace-nowrap">
                                                    {item}
                                                </p>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* The main wrapper MUST have overflow-hidden and take full width */}
            <div className={cn(theme.spacing.flexCol, "relative h-[355px] w-full overflow-hidden")}>

                {/* The animated moving track */}
                <div className="flex shrink-0 w-max run-marquee-left">

                    {/* Block 1 (Original Images) */}
                    <div className="flex shrink-0 gap-1 pr-1">
                        {MARQUEE_IMAGES.map((img, index) => (
                            <Image
                                key={`img-orig-${index}`}
                                src={img.src}
                                alt={img.alt}
                                width={img.width}
                                height={355}
                            />
                        ))}
                    </div>

                    {/* Block 2 (The Clone Illusion) */}
                    <div className="flex shrink-0 gap-1 pr-1">
                        {MARQUEE_IMAGES.map((img, index) => (
                            <Image
                                key={`img-clone-${index}`}
                                src={img.src}
                                alt={img.alt}
                                width={img.width}
                                height={355}
                            />
                        ))}
                    </div>
                </div>
                <div className={cn(theme.spacing.flexCol, "absolute p-5 text-[#E40000] h-[355px] w-full font-bold justify-between")}>
                    <div className="flex flex-row flex-start justify-between">
                        <p>GRIDISM</p><p>JKT</p><p>INTERNATIONAL</p>
                    </div>
                    <div className="">
                        <div className={cn(theme.spacing.fontRed)}>
                            <p>WHY</p><p>DO</p><p>ALL</p><p>AGENCIES</p><p>HAVE</p><p>THE</p><p>SAME</p><p>PATTERNS?</p>
                        </div>

                        <div className={cn(theme.spacing.fontRed)}>
                            <p>BECAUSE</p><p>THEY</p><p>STICK</p><p>TO</p><p>OLD</p><p>DESIGN</p><p>SYSTEMS</p><p>AND</p><p>ARE</p><p>NOT</p><p>TRANSPARENT</p><p>ABOUT</p><p>THEIR</p><p>PROCESS</p>
                        </div>

                        <div className={cn(theme.spacing.fontRed)}>
                            <p>WE</p><p>DO</p><p>NOT</p><p>NEED</p><p>MEANINGLESS</p><p>PROCESSES,</p>
                        </div>

                        <p>BECAUSE EMBRACING RESULTS IS OUR POLICY AND REALISM.</p>
                    </div>
                </div>
            </div>

            <TeamSlider/>
            <GallerySection/>

            <div className={cn(theme.spacing.flexRow, "min-h-[50vh] justify-evenly gap-15 mx-auto w-[90%]")}>
                <div className={cn(theme.spacing.flexCol, "gap-5")}>
                    <p>We started in the smallest space possible: a cramped dorm room, no desk, no proper setup, only the floor and a shared belief.</p>
                    <p>Day after day, we moved from one cheap cafe to another, working on things that <span className="font-bold">felt uncertain, unclear, and far from guaranteed.</span>Time, energy, and faith were spent on outcomes we couldn't yet see</p>
                    <p><span className="font-bold">There were moments of doubt exhaustion, and silence but never division.</span>The four of us come from different roles and backgrounds, yet we were aligne by one vision, to build something meaningful, not just something that survives</p>
                </div>

                <div className={cn(theme.spacing.flexCol, "gap-5")}>
                    <p>In the middle of limitation, we learned a hard truth without foundation, no system can last. So we stopped everything. We chose focus, we refined how we worked, clarified what we stood for, and began laying down principles strong enough to carry us forward: trust, discipline, and direction.</p>
                    <p className="font-bold">Slowly, chaos turned into structure. Uncertainty turned into intention.</p>
                </div>
            </div>
        </section >
    );
};

export default AboutSection;