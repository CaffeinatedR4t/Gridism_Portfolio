"use client";

import { useState } from "react";
import { cn } from "@/utils/cn";

const ConnectSection = () => {
    // State to handle button UI changes
    const [result, setResult] = useState("Submit");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setResult("Sending...");
        
        const form = event.currentTarget;
        const formData = new FormData(form);

        formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_KEY as string);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setResult("Message Sent");
                form.reset(); // Clear the form
                
                // Reset button text after 3 seconds
                setTimeout(() => setResult("Submit"), 3000);
            } else {
                console.log("Error", data);
                setResult("Error! Try Again");
            }
        } catch (error) {
            console.log("Submit Error:", error);
            setResult("Error! Try Again");
        }
    };

    return (
        <section className="bg-white w-full min-h-screen flex flex-col justify-start">
            <div className="w-full max-w-full flex-1 flex flex-col md:grid md:grid-cols-2 pt-[153px] pb-[100px] px-10 lg:px-[70px] gap-20">
                
                {/* Left Side: Address, Socials & Title */}
                <div className="flex flex-col justify-between h-full">
                    <div className="flex flex-col gap-10">
                        {/* Address */}
                        <div className="flex flex-col gap-4">
                            <p className="font-medium text-[20px] text-black m-0">Address</p>
                            <p className="font-light text-[16px] text-black leading-relaxed whitespace-pre-wrap m-0">
                                Summit Tower, 17th Floor{"\n"}
                                Jl. Jendral Sudirman No. 45{"\n"}
                                SCBD, Jakarta 12190{"\n"}
                                Indonesia
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-10">
                            <a href="https://instagram.com/gridism.co" target="_blank" rel="noopener noreferrer" className="font-semibold text-[20px] text-black hover:opacity-60 transition-opacity no-underline">Instagram</a>
                            <a href="https://id.linkedin.com/company/gridismco" target="_blank" rel="noopener noreferrer" className="font-semibold text-[20px] text-black hover:opacity-60 transition-opacity no-underline">Linkedin</a>
                            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-[20px] text-black hover:opacity-60 transition-opacity no-underline">X</a>
                        </div>
                    </div>

                    {/* Branding Title */}
                    <h1 className="font-light text-[64px] lg:text-[80px] leading-[0.9] text-black m-0 mt-auto">
                        Let&apos;s Connect
                    </h1>
                </div>

                {/* Right Side: Form */}
                <div className="w-full flex flex-col justify-center">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                        
                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-[16px] text-black">Name*</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Hello..."
                                required
                                className="border-b border-black/20 bg-transparent py-3 focus:outline-none focus:border-black transition-colors rounded-none w-full font-light text-[14px] placeholder:text-black/35"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-[16px] text-black">Email*</label>
                            <input
                                type="email"
                                name="email" 
                                placeholder="HappyJohn@gmail.com"
                                required
                                className="border-b border-black/20 bg-transparent py-3 focus:outline-none focus:border-black transition-colors rounded-none w-full font-light text-[14px] placeholder:text-black/35"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-[16px] text-black">Company Name</label>
                            <input
                                type="text"
                                name="company" 
                                placeholder="Your company or website"
                                className="border-b border-black/20 bg-transparent py-3 focus:outline-none focus:border-black transition-colors rounded-none w-full font-light text-[14px] placeholder:text-black/35"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-[16px] text-black">Social Media*</label>
                            <input
                                type="text"
                                name="social"
                                placeholder="Your company or website"
                                required
                                className="border-b border-black/20 bg-transparent py-3 focus:outline-none focus:border-black transition-colors rounded-none w-full font-light text-[14px] placeholder:text-black/35"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-medium text-[16px] text-black">Message?*</label>
                            <textarea
                                name="message"
                                placeholder="I want to build...."
                                required
                                rows={2}
                                className="border-b border-black/20 bg-transparent py-3 focus:outline-none focus:border-black transition-colors rounded-none w-full font-light text-[14px] placeholder:text-black/35 resize-none" 
                            />
                        </div>
                        
                        <div className="flex justify-end mt-4">
                            <button 
                                type="submit"
                                disabled={result === "Sending..."} 
                                className="bg-black text-white px-10 py-3 text-[18px] font-medium transition-all duration-300 hover:bg-black/90 disabled:opacity-50"
                            >
                                {result === "Submit" ? "Submit" : result}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ConnectSection;