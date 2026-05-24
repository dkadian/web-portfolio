import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Mr_De_Haviland } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ParticleBackground from "./components/ParticleBackground";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const signature = Mr_De_Haviland({
  weight: "400",
  variable: "--font-signature",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deepak Kadian | AI-ML Engineer",
  description: "Portfolio of Deepak Kadian, a Full-Stack Developer specializing in clean, performant web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${plusJakarta.variable} ${signature.variable} antialiased bg-[#09090b] text-[#fafafa] selection:bg-sky-500/20 cursor-none`}
      >
        <ParticleBackground />
        <CustomCursor />
        <Navigation />
        <div className="min-h-screen pt-32 pb-12 px-6 max-w-5xl mx-auto overflow-x-hidden">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
