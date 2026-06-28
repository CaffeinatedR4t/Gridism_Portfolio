import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FloatingLogo from "@/components/FloatingLogo";
import FloatingJakartaTime from "@/components/FloatingJakartaTime";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Gridism",
    default: "Gridism | Digital Creative Agency",
  },
   authors: [{ name: "Jason Julius Then", url: "https://github.com/yruge" }, { name: "Jeremy Joseph Pohar", url: "https://github.com/CaffeinatedR4t"}],
  description: "Human Centric Approach. Structure with Purpose. Commitment to Crafting.",
  icons: {
    icon: "/images/WEB VIEW 2.png",
    apple: "/images/WEB VIEW 2.png",
  },
  openGraph: {
    title: "Gridism",
    description: "Elevating digital experiences through creative engineering.",
    url: "https://gridism.co",
    siteName: "Gridism",
    images: [
      {
        url: "/images/gridism 2@2x.png",
        width: 4801,
        height: 3601,
        alt: "Gridism Cover Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gridism",
    description: "Elevating digital experiences through creative engineering.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen overflow-x-hidden w-full max-w-[100vw]`} suppressHydrationWarning>
        <SmoothScroll>
          <Navbar />
          <FloatingLogo />
          <FloatingJakartaTime />
          <main className="relative z-20">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}