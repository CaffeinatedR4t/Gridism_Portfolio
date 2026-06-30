"use client";

import { useState, useCallback } from "react";
import { cn } from "@/utils/cn";
import Toast from "@/components/Toast";

const ConnectSection = () => {
    // State to handle button UI changes
    const [result, setResult] = useState("Submit");
    const [toastVisible, setToastVisible] = useState(false);
    const dismissToast = useCallback(() => setToastVisible(false), []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setResult("Sending...");
        
        const form = event.currentTarget;
        const formData = new FormData(form);

        const payload = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            company: formData.get("company") as string,
            social: formData.get("social") as string,
            message: formData.get("message") as string,
        };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (data.success) {
                setResult("Message Sent");
                form.reset();
                setToastVisible(true);

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
        <>
        <section
            className="bg-[#F9F9F7] w-full flex flex-col justify-start"
            style={{ height: "100vh", overflow: "hidden" }}
        >
            <div
                className="w-full flex-1 flex flex-col md:grid md:grid-cols-2 px-10 lg:px-[70px]"
                style={{
                    paddingTop: "120px",
                    paddingBottom: "40px",
                    gap: "40px",
                }}
            >
                
                {/* Left Side: Address, Socials & Title */}
                <div className="flex flex-col justify-between h-full">
                    <div className="flex flex-col gap-6">
                        {/* Address */}
                        <div className="flex flex-col gap-2">
                            <p
                                className="m-0"
                                style={{
                                    fontFamily: "'Switzer', sans-serif",
                                    fontWeight: 500,
                                    fontSize: "20px",
                                    lineHeight: "26px",
                                    color: "#000000",
                                }}
                            >
                                Address
                            </p>
                            <p
                                className="whitespace-pre-wrap m-0"
                                style={{
                                    fontFamily: "'Switzer', sans-serif",
                                    fontWeight: 300,
                                    fontSize: "16px",
                                    lineHeight: "21px",
                                    color: "#000000",
                                }}
                            >
                                Summit Tower, 17th Floor{"\n"}
                                Jl. Jendral Sudirman No. 45{"\n"}
                                SCBD, Jakarta 12190{"\n"}
                                Indonesia
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-8">
                            <a
                                href="https://instagram.com/gridism.co"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:opacity-60 transition-opacity no-underline"
                                style={{
                                    fontFamily: "'Switzer', sans-serif",
                                    fontWeight: 600,
                                    fontSize: "20px",
                                    lineHeight: "26px",
                                    color: "#000000",
                                }}
                            >
                                Instagram
                            </a>
                            <a
                                href="https://id.linkedin.com/company/gridismco"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:opacity-60 transition-opacity no-underline"
                                style={{
                                    fontFamily: "'Switzer', sans-serif",
                                    fontWeight: 600,
                                    fontSize: "20px",
                                    lineHeight: "26px",
                                    color: "#000000",
                                }}
                            >
                                Linkedin
                            </a>
                            <a
                                href="https://gridismco.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:opacity-60 transition-opacity no-underline"
                                style={{
                                    fontFamily: "'Switzer', sans-serif",
                                    fontWeight: 600,
                                    fontSize: "20px",
                                    lineHeight: "26px",
                                    color: "#000000",
                                }}
                            >
                                X
                            </a>
                        </div>
                    </div>

                    {/* Branding Title */}
                    <h1
                        className="m-0 mt-auto"
                        style={{
                            fontFamily: "'Switzer', sans-serif",
                            fontWeight: 300,
                            fontSize: "clamp(36px, 5vw, 64px)",
                            lineHeight: "1.3",
                            color: "#000000",
                        }}
                    >
                        Let&apos;s Connect
                    </h1>
                </div>

                {/* Right Side: Gmail-style compose card */}
                <div className="w-full flex flex-col justify-center" style={{ maxWidth: "886px" }}>
                    <div style={{ border: "1px solid #000000", borderRadius: 0, overflow: "hidden" }}>

                        {/* Card Header */}
                        <div
                            style={{
                                backgroundColor: "#060606",
                                padding: "10px 20px",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                            }}
                        >
                            <img
                                src="/images/ICON BLACK.webp"
                                alt="Gridism"
                                style={{ width: "20px", height: "20px", objectFit: "contain", filter: "invert(1)" }}
                            />
                            <span
                                style={{
                                    fontFamily: "'Switzer', sans-serif",
                                    fontWeight: 500,
                                    fontSize: "14px",
                                    color: "#F9F9F7",
                                    letterSpacing: "0.02em",
                                }}
                            >
                                New Message
                            </span>
                        </div>

                        {/* Card Body */}
                        <div style={{ backgroundColor: "#F9F9F7", padding: "28px 24px 24px" }}>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                                <div className="flex flex-col gap-2">
                                    <label
                                        style={{
                                            fontFamily: "'Switzer', sans-serif",
                                            fontWeight: 500,
                                            fontSize: "16px",
                                            lineHeight: "21px",
                                            color: "#000000",
                                        }}
                                    >
                                        Name*
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Hello..."
                                        required
                                        className="bg-transparent py-3 focus:outline-none w-full"
                                        style={{
                                            fontFamily: "'Switzer', sans-serif",
                                            fontWeight: 300,
                                            fontSize: "14px",
                                            lineHeight: "18px",
                                            color: "#000000",
                                            border: "none",
                                            borderBottom: "1px solid #000000",
                                            borderRadius: 0,
                                        }}
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label
                                        style={{
                                            fontFamily: "'Switzer', sans-serif",
                                            fontWeight: 500,
                                            fontSize: "16px",
                                            lineHeight: "21px",
                                            color: "#000000",
                                        }}
                                    >
                                        Email*
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="HappyJohn@gmail.com"
                                        required
                                        className="bg-transparent py-3 focus:outline-none w-full"
                                        style={{
                                            fontFamily: "'Switzer', sans-serif",
                                            fontWeight: 300,
                                            fontSize: "14px",
                                            lineHeight: "18px",
                                            color: "#000000",
                                            border: "none",
                                            borderBottom: "1px solid #000000",
                                            borderRadius: 0,
                                        }}
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label
                                        style={{
                                            fontFamily: "'Switzer', sans-serif",
                                            fontWeight: 500,
                                            fontSize: "16px",
                                            lineHeight: "21px",
                                            color: "#000000",
                                        }}
                                    >
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        placeholder="Your company or website"
                                        className="bg-transparent py-3 focus:outline-none w-full"
                                        style={{
                                            fontFamily: "'Switzer', sans-serif",
                                            fontWeight: 300,
                                            fontSize: "14px",
                                            lineHeight: "18px",
                                            color: "#000000",
                                            border: "none",
                                            borderBottom: "1px solid #000000",
                                            borderRadius: 0,
                                        }}
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label
                                        style={{
                                            fontFamily: "'Switzer', sans-serif",
                                            fontWeight: 500,
                                            fontSize: "16px",
                                            lineHeight: "21px",
                                            color: "#000000",
                                        }}
                                    >
                                        Social Media*
                                    </label>
                                    <input
                                        type="text"
                                        name="social"
                                        placeholder="@yourhandle"
                                        required
                                        className="bg-transparent py-3 focus:outline-none w-full"
                                        style={{
                                            fontFamily: "'Switzer', sans-serif",
                                            fontWeight: 300,
                                            fontSize: "14px",
                                            lineHeight: "18px",
                                            color: "#000000",
                                            border: "none",
                                            borderBottom: "1px solid #000000",
                                            borderRadius: 0,
                                        }}
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label
                                        style={{
                                            fontFamily: "'Switzer', sans-serif",
                                            fontWeight: 500,
                                            fontSize: "16px",
                                            lineHeight: "21px",
                                            color: "#000000",
                                        }}
                                    >
                                        Message?*
                                    </label>
                                    <textarea
                                        name="message"
                                        placeholder="I want to build...."
                                        required
                                        rows={2}
                                        className="bg-transparent py-3 focus:outline-none w-full resize-none"
                                        style={{
                                            fontFamily: "'Switzer', sans-serif",
                                            fontWeight: 300,
                                            fontSize: "14px",
                                            lineHeight: "18px",
                                            color: "#000000",
                                            border: "none",
                                            borderBottom: "1px solid #000000",
                                            borderRadius: 0,
                                        }}
                                    />
                                </div>

                                <div className="flex justify-end mt-2">
                                    <button
                                        type="submit"
                                        disabled={result === "Sending..."}
                                        className="bg-[#060606] text-white px-10 py-3 text-[18px] font-medium transition-all duration-300 hover:bg-[#060606]/90 disabled:opacity-50"
                                        style={{ borderRadius: 0 }}
                                    >
                                        {result}
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </section>

        <Toast
            message="Message sent. We will get back to you soon."
            visible={toastVisible}
            onClose={dismissToast}
        />
        </>
    )
}

export default ConnectSection;