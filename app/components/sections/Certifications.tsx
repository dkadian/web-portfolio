"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { Magnetic, TiltCard, SectionHeader, Reveal } from "../ui/SharedUI";
import { projects, skillsData, experienceData, certificationsData, Project } from "../../data";

const CertificationCard = ({ cert, index }: { cert: { title: string, issuer: string, date: string, image: string, url?: string }; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button") || (e.target as HTMLElement).closest("a")) return;
    setIsFlipped(!isFlipped);
  };

  return (
    <Reveal delay={index * 0.1}>
      <div className="h-[400px] w-full cursor-pointer group/cert p-2" onClick={handleClick}>
        <div className="relative w-full h-full perspective-1000">
          <motion.div
            className="relative w-full h-full"
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front Side */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
              animate={{ opacity: isFlipped ? 0 : 1 }}
              transition={{ duration: 0.4, delay: isFlipped ? 0 : 0.2 }}
            >
              <div className="glass-card p-6 md:p-8 h-full flex flex-col gap-6 shadow-2xl hover:border-sky-500/30 transition-colors bg-zinc-950">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                    <span className="text-lg md:text-xl">🏆</span>
                  </div>
                  <span className="text-[10px] font-bold text-sky-500/50 uppercase tracking-widest">{cert.date}</span>
                </div>
                <div className="space-y-4 flex-1 mt-4">
                  <h3 className="text-lg font-bold text-white leading-snug tracking-tight">{cert.title}</h3>
                  <div className="text-zinc-500 text-sm font-light uppercase tracking-widest">{cert.issuer}</div>
                </div>
                <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest border-t border-white/5 pt-4 mt-auto text-center group-hover/cert:text-sky-400 transition-colors">
                  Click to view certificate
                </div>
              </div>
            </motion.div>

            {/* Back Side */}
            <motion.div
              className="absolute inset-0 w-full h-full"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              animate={{ opacity: isFlipped ? 1 : 0 }}
              transition={{ duration: 0.4, delay: isFlipped ? 0.2 : 0 }}
            >
              <div className="glass-card h-full shadow-2xl relative overflow-hidden bg-zinc-950 border border-sky-500/20">
                <div className="relative z-10 h-full flex flex-col p-4 md:p-6">
                  <div className="flex justify-between items-center mb-4 gap-2">
                    <h3 className="text-xs font-bold text-white uppercase tracking-tighter truncate">{cert.issuer}</h3>
                    <div className="flex items-center gap-2">
                      {cert.url && (
                        <a 
                          href={cert.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[10px] font-bold text-sky-400 hover:text-sky-300 transition-colors py-1.5 px-3 bg-sky-500/10 rounded-full border border-sky-500/20"
                        >
                          Verify 🔗
                        </a>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                        className="text-zinc-500 hover:text-white transition-colors p-2 text-xs font-bold"
                      >
                        Close ×
                      </button>
                    </div>
                  </div>
                  <div className="relative flex-1 w-full h-full rounded-lg overflow-hidden bg-zinc-900/50">
                    <Image
                      src={cert.image}
                      alt={`${cert.title} Certificate`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Reveal>
  );
};


export const Certifications = () => (
  <section id="certifications" className="py-24 md:py-48 scroll-mt-20">
    <SectionHeader title="Certifications" description="Professional credentials and specialized training." />
    
    <Reveal delay={0.6} y={10} className="-mt-12 mb-16">
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-sky-500/5 border border-sky-500/10 text-[10px] font-bold text-sky-500 tracking-[0.2em] uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
        Interactive: Click any card to reveal certificate
      </div>
    </Reveal>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {certificationsData.map((cert, index) => (
        <CertificationCard key={index} cert={cert} index={index} />
      ))}
    </div>
  </section>
);

