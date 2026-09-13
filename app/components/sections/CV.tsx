"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { Magnetic, TiltCard, SectionHeader, Reveal } from "../ui/SharedUI";
import { projects, skillsData, experienceData, certificationsData, Project } from "../../data";

export const CV = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownload = () => {
    setIsDownloading(true); const link = document.createElement("a"); link.href = "/Resume.pdf"; link.download = "Deepak_Kadian_Resume.pdf";
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    setTimeout(() => setIsDownloading(false), 2000);
  };
  return (
    <section id="cv" className="py-24 md:py-32 scroll-mt-20">
      <Reveal>
        <TiltCard>
          <div className="glass-card p-8 md:p-20 flex flex-col items-center text-center relative group overflow-hidden shadow-2xl">
            <div className="relative z-10 space-y-8 md:space-y-10">
              <div className="font-mono text-zinc-500 text-[8px] md:text-[10px] tracking-[1em] uppercase opacity-50">Documentation</div>
              <h2 className="text-3xl md:text-6xl font-bold text-white tracking-tighter uppercase leading-tight">Curriculum <br /> Vitae</h2>
              <p className="text-zinc-500 text-xs md:text-base font-light max-w-lg mx-auto tracking-tight opacity-80">Access technical documentation of professional trajectory and academic mastery.</p>
              <Magnetic>
                <button onClick={handleDownload} disabled={isDownloading} className="px-8 py-4 md:px-12 md:py-5 border border-white/10 hover:bg-white hover:text-black transition-all duration-700 text-[8px] md:text-[10px] font-bold tracking-[0.4em] disabled:opacity-50 uppercase rounded-xl shadow-2xl">
                  {isDownloading ? "Downloading..." : "Download_Fetch"}
                </button>
              </Magnetic>
            </div>
          </div>
        </TiltCard>
      </Reveal>
    </section>
  );
};

