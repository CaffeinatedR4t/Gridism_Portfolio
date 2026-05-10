"use client"; // Required for Hooks and Intersection Observer

import { useEffect, useRef } from "react";

const STRATEGY_GROUPS = [
    ["Personal Branding", "Consulting", "E-commerce strategy", "Brand & Strategy"],
    ["User Experience (UX)", "User Interface (UI)", "Wireframes & Prototyping", "User Analysis Research"],
    ["Creative Development", "Research & Development", "Front-end Development", "Back-end Development"]
];

const MovingText = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("translate-x-0", "opacity-100");
                    entry.target.classList.remove("opacity-0");
                }
            });
        }, { threshold: 0.1 });

        const rows = containerRef.current.querySelectorAll(".strategy-row");
        rows.forEach((row) => observer.observe(row));

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="flex flex-col justify-center items-center gap-12 py-20 overflow-hidden">
            <h3 className="text-3xl text-white tracking-[0.2em] mb-8">IDEAS AND STRATEGY</h3>
            
            {STRATEGY_GROUPS.map((group, i) => {
                const isEven = i % 2 === 0;
                // Starting positions: Even rows from Left (-x), Odd rows from Right (+x)
                const startPos = isEven ? "-translate-x-32" : "translate-x-32";

                return (
                    <div 
                        key={i} 
                        className={`strategy-row flex flex-wrap justify-center gap-10 md:gap-20 text-white text-xl md:text-2xl transition-all duration-1000 ease-out opacity-0 transform ${startPos}`}
                    >
                        {group.map((item, idx) => (
                            <p key={idx} className="whitespace-nowrap hover:text-red-500 transition-colors cursor-default">
                                {item}
                            </p>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};

export default MovingText;