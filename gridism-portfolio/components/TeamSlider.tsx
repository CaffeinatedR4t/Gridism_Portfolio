"use client";

import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";

import agencyFounderAImg from "../public/images/Jeremy J Pohar 1 (1).webp"
import agencyFounderBImg from "../public/images/Heles Ofalius 1 (1).webp"
import agencyFounderCImg from "../public/images/Jason Then 1 (1).webp"
import agencyFounderDImg from "../public/images/Alexander V Lion 1 (1).webp"


// 1. The Interface
interface Founder {
    name: string;
    position: string;
    desc: string;
    src: StaticImageData,
    alt: string;
    width: number;
    height: number;
}

// 2. The Data Array
const FOUNDERS: Founder[] = [
    {
        name: "Jeremy Joseph Pohar",
        position: "Founder & Chief Executive Officer (CEO)",
        desc: "Jeremy has over 5 years of experience in web development and technical problem-solving. He leads the technical development at Gridism, focusing on building scalable, efficient, and high-performance digital solutions through clean and structured code.",
        src: agencyFounderAImg, 
        alt: "Jeremy Pohar",
        width: 300,
        height: 400
    },
    {
        name: "Heles Ofalius",
        position: "Founder & Chief Creative Officer (CCO)",
        desc: "Ofalius has over 7 years of experience in visual design and digital branding. He leads the creative direction at Gridism, overseeing brand identity, visual systems, and digital experiences. His work focuses on clarity, aesthetics, and strategic storytelling across platforms.",
        src: agencyFounderBImg, 
        alt: "Heles Ofalius",
        width: 300,
        height: 400
    },
    {
        name: "Jason Julius Then",
        position: "Co-Founder & Head of Engineering", 
        desc: "Jason has more than 5 years of experience in website development and system implementation. At Gridism, he focuses on execution, optimization, and maintaining development quality to ensure reliable and seamless digital products.",
        src: agencyFounderCImg,
        alt: "Jason Then",
        width: 300,
        height: 400
    },
    {
        name: "Alexander Valentino Lion",
        position: "Co-Founder & Chief Marketing Officer (CMO)",
        desc: "Alex has over 5 years of experience in marketing strategy and business management. He leads growth, client acquisition, and brand positioning at Gridism, ensuring sustainable operations and a strong market presence.",
        src: agencyFounderDImg, 
        alt: "Alexander Lion",
        width: 300,
        height: 400
    }
];

// 3. The Component
export function TeamSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev === FOUNDERS.length - 1 ? 0 : prev + 1));
        }, 4000);

        return () => clearInterval(timer);
    }, [currentIndex]);

    const nextSlide = () => setCurrentIndex((prev) => (prev === FOUNDERS.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? FOUNDERS.length - 1 : prev - 1));

    return (
        <div className="min-h-screen flex flex-col justify-center">
            <h3 className="flex-start text-xl md:text-3xl mb-10 max-w px-10">
                Our team of skilled professionals specializes in personalized, high quality branding and website design solutions.
            </h3>

            <div className="relative w-full max-w-[95%] mx-auto overflow-hidden group">
                <div 
                    className="flex transition-transform duration-2000 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {FOUNDERS.map((item, index) => (
                        <div key={index} className="w-full shrink-0 grid grid-cols-1 md:grid-cols-[1fr_auto_2fr] items-center justify-between gap-6 my-10 px-4 md:px-12">
                            
                            <div className="flex flex-col gap-2">
                                <p className="text-2xl md:text-3xl text-gray-900">{item.name}</p>
                                <p className="text-sm italic text-gray-500">{item.position}</p>
                            </div>

                            <Image 
                                src={item.src} 
                                alt={item.alt} 
                                width={item.width} 
                                height={item.height} 
                                className="mx-auto object-cover w-[250px] md:w-[300px] h-auto"
                            />

                            <div className="h-full flex items-center">
                                <p className="text-base max-w-prose md:text-lg opacity-[90%]">{item.desc}</p>
                            </div>
                            
                        </div>
                    ))}
                </div>

                <button
                    onClick={prevSlide}
                    className="absolute top-1/2 left-0 md:left-2 -translate-y-1/2 text-[#060606] transition-opacity z-10"
                    aria-label="Previous slide"
                >
                    ❮
                </button>
                
                <button
                    onClick={nextSlide}
                    className="absolute top-1/2 right-0 md:right-2 -translate-y-1/2 text-[#060606] transition-opacity z-10"
                    aria-label="Next slide"
                >
                    ❯
                </button>
            </div>
        </div>
    );
}

export default TeamSlider