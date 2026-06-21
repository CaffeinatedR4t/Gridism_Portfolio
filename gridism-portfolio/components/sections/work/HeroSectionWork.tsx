import Image from "next/image"
import horseChessPieceImg from "../../../public/images/Kuda.svg"

export const HeroSectionWork = () => {
    return (
        <section className="bg-black min-h-screen text-white gridism-content-layer">
            <div className="max-w-[1440px] min-h-screen flex justify-center items-center mx-auto px-15">
                <div className="relative min-h-[500px] flex flex-col justify-start w-full">
                    <div className="items-center flex mb-5 justify-center gap-5">
                        <Image priority src={horseChessPieceImg} alt="Horse Chess Piece" width={100} height={100} className="h-auto w-[150px]" />
                        <h1 className="text-[6vw] lg:text-[150px] font-normal tracking-[0.5em]">GRIDISM</h1>
                    </div> 
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal pl-4 w-[35%] font-family">All works that we proud to show</h2>

                    <div className="text-base w-full gap-5 flex flex-row text-left absolute bottom-0 right-0 text-balance flex-end md:w-[45%] md:gap-0 md:flex-col md:text-right md:text-lg lg:text-xl">
                        <p className="font-bold">We do Branding and Web for the Global Market.</p> <br/>
                        <p>Full-service creative solutions for lifestyle and tech brands. From Jakarta to the world, we deliver strategy, identity, and digital products.</p>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default HeroSectionWork