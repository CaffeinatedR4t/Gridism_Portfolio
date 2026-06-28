import Image from "next/image"
import horseChessPieceImg from "../../../public/images/Kuda.svg"

export const HeroSectionWork = () => {
    return (
        <section className="bg-[#060606] min-h-screen text-white gridism-content-layer">
            <div className="max-w-[1440px] min-h-screen flex justify-center items-center mx-auto px-15">
                <div className="relative min-h-[500px] flex flex-col justify-start w-full">
                    <div className="items-center flex mb-5 flex-start gap-5">
                        <Image priority src={horseChessPieceImg} alt="Horse Chess Piece" className="h-auto w-full max-w-[40px] sm:max-w-[60px] md:max-w-[80px] lg:max-w-[120px]" />
                        <h1 className="text-[40px] sm:text-[60px] md:text-[80px] lg:text-[120px] font-normal tracking-[0.5em]">GRIDISM</h1>
                    </div> 
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal font-family">All works that we <br/> proud to show</h2>
                    <div className="text-base w-full gap-5 flex flex-row text-left absolute bottom-0 right-0 text-balance flex-end md:w-[45%] md:gap-0 md:flex-col md:text-right md:text-lg lg:text-xl">
                        <h3 className="font-bold">We do Branding and Web for the Global Market.</h3> <br/>
                        <p>Full-service creative solutions for lifestyle and tech brands. From Jakarta to the world, we deliver strategy, identity, and digital products.</p>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default HeroSectionWork