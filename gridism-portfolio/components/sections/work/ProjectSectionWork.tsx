import Image from "next/image";

const projects = [
    { title: "Campaign Branding", desc: "IKEA", src: "/images/ezzralef.png", span: "row-span-2", ratio: "aspect-square" },
    { title: "Web Development", desc: "KINGSMAN", src: "/images/ijaakrta.png", span: "row-span-3", ratio: "aspect-[2/3]" },
    { title: "Branding", desc: "EZZRALE", src: "/images/ezzralef.png", span: "row-span-2", ratio: "aspect-square" },
    { title: "Revamp", desc: "iJakarta", src: "/images/ijaakrta.png", span: "row-span-3", ratio: "aspect-[2/3]" },
    { title: "Branding", desc: "EZZRALE", src: "/images/dummy.png", span: "row-span-2", ratio: "aspect-square" },
    { title: "Branding", desc: "EZZRALE", src: "/images/dummy.png", span: "row-span-3", ratio: "aspect-[2/3]" },
    { title: "Branding", desc: "EZZRALE", src: "/images/Legacy in Every Line.svg", span: "row-span-3", ratio: "aspect-[2/3]" },
]

const ProjectSectionWork = () => {

    return (
        <section className="bg-[#060606] w-full gridism-content-layer">
            <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-dense auto-rows-[250px] gap-6 py-6 max-w-[1440px] mx-auto px-6">
                {projects.map((project, index) => (
                    <div key={index} className={`relative ${project.span} group overflow-hidden bg-zinc-900`}>
                        <img
                            src={project.src}
                            alt={project.desc}
                            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${project.ratio}`}
                        />
                        {/* Overlay Label */}
                        <div className="absolute bottom-0 flex h-[60px] w-full items-center justify-between bg-[#F9F9F7]/90 px-8 text-black backdrop-blur-sm transition-opacity duration-300">
                            <span className="text-xs md:text-sm font-bold uppercase tracking-widest">{project.title}</span>
                            <span className="text-xs md:text-sm font-bold uppercase tracking-widest">{project.desc}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ProjectSectionWork