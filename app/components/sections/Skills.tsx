"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { Magnetic, TiltCard, SectionHeader, Reveal } from "../ui/SharedUI";
import { projects, skillsData, experienceData, certificationsData, Project } from "../../data";

const SkillItem = ({ skill, index }: { skill: { name: string; level: number }; index: number }) => {
  const [imageError, setImageError] = useState(false);
  const slug = skill.name.toLowerCase().replace(/[.\/\s\-&]/g, "");
  let logoName = slug;
  if (slug === "htmlcss") logoName = "html";
  if (slug === "reactjs") logoName = "react";
  if (slug === "faiss") logoName = "faissdb";
  if (slug === "sqlite") logoName = "sql";
  if (slug === "github") logoName = "git";

  const logoPath = `/tech-logos/${logoName}.svg`;

  // Logos that need inversion/brightness for dark mode
  const invertLogos = ["n8n", "express", "nextjs", "langchain", "matplotlib", "mysql"];
  const brightenLogos = ["pandas", "sql"];

  const filterClass = invertLogos.includes(logoName)
    ? "invert brightness-[2]"
    : brightenLogos.includes(logoName)
      ? "brightness-[3] contrast-[1.2]"
      : "";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group space-y-2 md:space-y-3"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 md:gap-3">
          <div className={`w-4 h-4 md:w-5 md:h-5 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100 ${filterClass}`}>
            {!imageError ? (
              <Image
                src={logoPath}
                alt={`${skill.name} logo`}
                fill
                sizes="20px"
                className="object-contain"
                onError={() => setImageError(true)}
              />
            ) : (
              (() => {
                const lowerName = skill.name.toLowerCase();
                if (["mongodb", "mysql", "sqlite", "database", "sql"].some(k => lowerName.includes(k))) {
                  return (
                    <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-zinc-400 group-hover:stroke-sky-400 transition-colors" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <ellipse cx="12" cy="5" rx="9" ry="3" />
                      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
                      <path d="M3 12A9 3 0 0 0 21 12" />
                    </svg>
                  );
                }
                if (["ai", "chatgpt", "claude", "gemini", "groq", "ollama", "huggingface", "neural", "cnn", "rnn", "lstm", "gru", "langchain", "embeddings", "chroma", "antigravity"].some(k => lowerName.includes(k))) {
                  return (
                    <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-zinc-400 group-hover:stroke-sky-400 transition-colors" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    </svg>
                  );
                }
                return (
                  <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-zinc-400 group-hover:stroke-sky-400 transition-colors" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                );
              })()
            )}
          </div>
          <span className="text-[10px] md:text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">{skill.name}</span>
        </div>
        <span className="text-[8px] md:text-[10px] font-mono text-zinc-500">{skill.level}%</span>
      </div>
      <div className="h-0.5 md:h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut", delay: (index * 0.1) + 0.2 }}
          className="h-full bg-sky-500/50 group-hover:bg-sky-400 transition-colors"
        />
      </div>
    </motion.div>
  );
};

// --- Data ---


export const Skills = () => {
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(isPaused);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef(0);
  const velocityRef = useRef(0.5);
  const targetVelocityRef = useRef(0.5);
  const lastTimeRef = useRef<number>(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const categoryIcons = {
    "Web Development": () => (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
    ),
    "Backend & Databases": () => (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6" y2="6" /><line x1="6" y1="18" x2="6" y2="18" /></svg>
    ),
    "Data Science": () => (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" /></svg>
    ),
    "Deep Learning": () => (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><circle cx="12" cy="12" r="3" /></svg>
    ),
    "Generative AI": () => (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5 5 3Z" /><path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5Z" /></svg>
    ),
    "AI Models & APIs": () => (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
    ),
    "AI Development Tools": () => (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
    ),
    "Tools": () => (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
    )
  };

  // Duplicate for infinite loop
  const duplicatedSkills = [...skillsData, ...skillsData];

  useEffect(() => {
    isPausedRef.current = isPaused;
    targetVelocityRef.current = isPaused ? 0 : 0.6;
  }, [isPaused]);

  useEffect(() => {
    let animationId: number;

    const scroll = (time: number) => {
      if (lastTimeRef.current && scrollRef.current) {
        const dt = (time - lastTimeRef.current) / 16.67; // Normalize to 60fps

        // Smoothly interpolate velocity
        velocityRef.current += (targetVelocityRef.current - velocityRef.current) * 0.08 * dt;

        if (!isPausedRef.current && Math.abs(velocityRef.current) > 0.01) {
          scrollPosRef.current += velocityRef.current * dt;
          scrollRef.current.scrollLeft = scrollPosRef.current;
        }

        // Infinite loop jump
        const halfWidth = scrollRef.current.scrollWidth / 2;
        if (scrollPosRef.current >= halfWidth) {
          scrollPosRef.current -= halfWidth;
          if (!isPausedRef.current) {
            scrollRef.current.scrollLeft = scrollPosRef.current;
          }
        } else if (scrollPosRef.current <= 0 && velocityRef.current < 0) {
          scrollPosRef.current += halfWidth;
          if (!isPausedRef.current) {
            scrollRef.current.scrollLeft = scrollPosRef.current;
          }
        }
      }

      lastTimeRef.current = time;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => {
      cancelAnimationFrame(animationId);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Update precision tracker during manual scroll and pause auto-scrolling
  const handleManualScroll = () => {
    if (scrollRef.current) {
      scrollPosRef.current = scrollRef.current.scrollLeft;
      
      // Pause automatic scroll during manual swipes
      setIsPaused(true);
      
      // Resume auto-scroll after 2 seconds of inactivity
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsPaused(false);
      }, 2000);
    }
  };

  return (
    <section id="expertise" className="py-48 scroll-mt-20 overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-6">
        <SectionHeader title="Expertise" description="Technical analysis of core competencies and engineering toolsets." />
      </div>

      <div
        ref={scrollRef}
        onScroll={handleManualScroll}
        className="relative mt-10 flex overflow-x-auto no-scrollbar select-none"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >        <div className="flex gap-4 md:gap-8 w-max px-8 py-4">
          {duplicatedSkills.map((group, groupIndex) => {
            const CategoryIcon = categoryIcons[group.category as keyof typeof categoryIcons] || (() => null);
            return (
              <div key={`${group.category}-${groupIndex}`} className="w-[240px] md:w-[320px] flex-shrink-0">
                <TiltCard className="h-full">
                  <div className="glass-card p-6 md:p-8 h-full shadow-2xl bg-zinc-900/40 border border-white/5 hover:border-sky-500/20 transition-colors">
                    <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-5">
                      <div className="w-4 h-4 text-sky-500">
                        <CategoryIcon />
                      </div>
                      <h3 className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">{group.category}</h3>
                    </div>
                    <div className="space-y-7">
                      {group.skills.map((skill, skillIndex) => (
                        <SkillItem key={skill.name} skill={skill} index={skillIndex} />
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

