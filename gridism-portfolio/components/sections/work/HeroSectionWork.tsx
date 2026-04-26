
export const HeroSectionWork = () => {
    return (
        <section className="bg-black min-h-screen text-white gridism-content-layer">
            <div className="max-w-[1440px] min-h-screen flex justify-center items-center mx-auto px-15">
                <div className="relative min-h-[500px] flex flex-col justify-start w-full">
                    <div className="items-center flex">
                        <img src="/images/Kuda.svg" alt="Horse Chess Piece" className="h-auto w-20" />
                        <h1 className="text-[6vw] lg:text-[90px] font-normal tracking-[0.5em]">GRIDISM</h1>
                    </div>
                    <h2 className="text-2xl font-normal pl-4">All works that we proud to show</h2>

                    <div className="w-[45%] absolute bottom-0 right-0 text-sm text-right flex-end">
                        <p>We are a full-service creative agency, based in Jakarta,specializing in lifestyle and technology</p><br />
                        <p>By crafting bespoke concepts, we create emotional connections between brands and their audiences. Combining our savoir-faire in strategy, art direction and production, we deliver creativity for high-end campaigns, social narratives and digital objects.</p>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default HeroSectionWork