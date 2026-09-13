"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { Magnetic, TiltCard, SectionHeader, Reveal } from "../ui/SharedUI";
import { projects, skillsData, experienceData, certificationsData, Project } from "../../data";

const ImageSlider = ({ images, title, isFlipped }: { images: string[]; title: string; isFlipped: boolean }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isFlipped) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length, isFlipped]);

  const paginate = (newDirection: number) => {
    setIndex((prev) => (prev + newDirection + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-full group/slider overflow-hidden rounded-xl md:rounded-2xl border border-white/10 bg-zinc-900/50">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 p-2 md:p-4"
        >
          <div className="relative w-full h-full overflow-hidden rounded-lg">
            <Image
              src={images[index]}
              alt={`${title} view ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-contain"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Controls */}
      <div className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 md:gap-4 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-500 z-20">
        <button
          onClick={(e) => { e.stopPropagation(); paginate(-1); }}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-sky-500 transition-colors text-sm md:text-base"
        >
          ↑
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); paginate(1); }}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-sky-500 transition-colors text-sm md:text-base"
        >
          ↓
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2 z-20">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-1 md:w-1.5 h-1 md:h-1.5 rounded-full transition-all duration-500 ${i === index ? "bg-sky-500 w-3 md:w-4" : "bg-white/20"}`}
          />
        ))}
      </div>
    </div>
  );
};


const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".source-link")) return;
    setIsFlipped(!isFlipped);
  };

  return (
    <Reveal delay={index * 0.1}>
      <div className="p-4 cursor-pointer" onClick={handleClick}>
        <div className="relative h-[550px] md:h-[600px] w-full perspective-1000">
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
              <div className="glass-card group h-full shadow-2xl relative overflow-hidden bg-zinc-950">
                <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-16">
                  <div className="space-y-4 md:space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-3 md:gap-8">
                      <div className="space-y-1 md:space-y-4">
                        <span className="text-[10px] font-bold text-sky-500/50 uppercase tracking-[0.2em]">Project_0{index + 1}</span>
                        <h3 className="text-xl md:text-4xl lg:text-5xl font-bold text-white group-hover:text-sky-400 transition-colors duration-500 uppercase tracking-tighter leading-[1.1] break-words">
                          {project.title.replace(/_/g, " ")}
                        </h3>
                      </div>
                      <span className="glass-pill px-3 py-1 md:px-4 md:py-2 text-[8px] md:text-[10px]">{project.stats}</span>
                    </div>
                    <p className="text-zinc-400 text-xs md:text-xl font-light leading-relaxed tracking-tight max-w-3xl group-hover:text-zinc-300 transition-colors line-clamp-4 md:line-clamp-none">{project.description}</p>
                  </div>
                  <div className="space-y-6 md:space-y-12 pt-4 md:pt-16 mt-auto">
                    <div className="flex flex-wrap gap-1.5 md:gap-3">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[8px] md:text-[11px] font-bold text-zinc-600 uppercase tracking-widest border border-white/5 px-2 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl bg-white/[0.02]">{t}</span>
                      ))}
                    </div>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="source-link group/link inline-flex items-center gap-3 md:gap-4 text-[10px] md:text-xs font-bold text-white hover:text-sky-400 transition-all uppercase tracking-[0.3em]">
                      Access_Source_Code
                      <span className="text-xl md:text-2xl group-hover/link:translate-x-2 transition-transform">→</span>
                    </a>
                  </div>
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
              <div className="glass-card h-full shadow-2xl relative overflow-hidden bg-zinc-950">
                <div className="relative z-10 h-full flex flex-col p-4 md:p-8">
                  <div className="flex justify-between items-center mb-4 md:mb-8">
                    <h3 className="text-sm md:text-xl font-bold text-white uppercase tracking-tighter">Project Visuals</h3>
                    <button
                      onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                      className="text-zinc-500 hover:text-white transition-colors p-2"
                    >
                      Close ×
                    </button>
                  </div>

                  <div className="flex-1 min-h-0">
                    {project.images && project.images.length > 0 ? (
                      <ImageSlider images={project.images} title={project.title} isFlipped={isFlipped} />
                    ) : project.backTitle ? (
                      <div className="h-full flex flex-col items-center justify-center text-center space-y-8 p-4">
                        <div className="w-20 h-20 rounded-full bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                          <span className="text-4xl">{project.backIcon || "⚙️"}</span>
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-2xl font-bold text-white uppercase tracking-tight">{project.backTitle}</h4>
                          <p className="text-zinc-500 max-w-sm mx-auto">{project.backDescription}</p>
                        </div>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="source-link px-8 py-4 bg-white text-black rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-sky-400 hover:text-white transition-all"
                        >
                          Access Repository
                        </a>
                      </div>
                    ) : project.isModelOnly ? (
                      <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                        <div className="w-20 h-20 rounded-full bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                          <span className="text-4xl">🤖</span>
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-2xl font-bold text-white uppercase tracking-tight">Model Analysis Only</h4>
                          <p className="text-zinc-500 max-w-xs mx-auto">This project focuses on the core machine learning model and architectural implementation rather than a visual frontend.</p>
                        </div>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="source-link px-8 py-4 bg-white text-black rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-sky-400 hover:text-white transition-all"
                        >
                          View Model Source
                        </a>
                      </div>
                    ) : null}
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

export const Projects = () => (
  <section id="projects" className="py-48 scroll-mt-20 overflow-visible">
    <SectionHeader title="Selected Work" description="A curated selection of technical implementations and software architecture." />

    <Reveal delay={0.6} y={10} className="-mt-12 mb-16">
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-sky-500/5 border border-sky-500/10 text-[10px] font-bold text-sky-500 tracking-[0.2em] uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
        Interactive: Click any card to reveal project visuals
      </div>
    </Reveal>

    <div className="space-y-16">
      {projects.map((project, index) => (
        <ProjectCard key={project.title} project={project} index={index} />
      ))}
    </div>
  </section>
);

