"use client";

import { useState, useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

// --- Icons (Refined SVGs) ---

const TechIcons = {
  React: () => (
    <svg viewBox="-11.5 -10.23177 23 20.46355" className="w-full h-full fill-current"><circle cx="0" cy="0" r="2.05" fill="currentColor"/><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>
  ),
  Nextjs: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full fill-current"><path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.4v33.3h-9.2V40.2h9.2l40.4 52.8c5.4-8.1 8.6-17.9 8.6-29 0-35.3-28.7-64-64-64zm31.4 40.2h9.2v23.1l-9.2-12v-11.1z"/></svg>
  ),
  TypeScript: () => (
    <svg viewBox="0 0 128 128" className="w-full h-full fill-current"><path d="M1.5 1.5h125v125H1.5V1.5zm81.4 69.4c0-11-9.4-15.1-18.4-18.4-11-4.1-13.4-6.4-13.4-11.3 0-4.6 4.3-7.5 10.1-7.5 7.1 0 12.3 3.1 15.1 8.2l12.4-8.5c-4.9-9.1-13.7-13.7-25-13.7-16.7 0-27.1 9.5-27.1 21.7 0 11.3 8.3 16.4 19.8 20.4 11.1 3.9 14.5 7.1 14.5 12.3 0 5.7-5.5 9-12.7 9-9 0-16-4.5-19.1-11.4l-12.7 7.2c5.4 12.4 17.5 18.2 31.8 18.2 19 0 32.6-10 32.6-24.5zM103.7 34h-42v12.4h14.7V105h12.6V46.4h14.7V34z"/></svg>
  ),
  Tailwind: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8 1.313.328 2.251 1.274 3.29 2.323C15.195 11.83 17.062 13.7 20.401 13.7c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-1.313-.328-2.251-1.274-3.29-2.323C17.207 6.67 15.34 4.8 12.001 4.8zm-6 8.9c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8 1.313.328 2.251 1.274 3.29 2.323C9.195 20.73 11.062 22.6 14.401 22.6c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-1.313-.328-2.251-1.274-3.29-2.323C11.207 15.57 9.34 13.7 6.001 13.7z"/></svg>
  ),
  Python: () => (
    <svg viewBox="0 0 448 512" className="w-full h-full fill-current"><path d="M439.8 200.5c-7.7-30.9-22.3-54.2-53.4-54.2h-40.1v47.4c0 36.8-31.2 67.8-66.8 67.8H172.7c-29.2 0-53.4 25-53.4 54.3v101.8c0 29 25.2 46 53.4 54.3 33.8 9.9 66.3 11.7 106.8 0 26.9-7.8 53.4-23.5 53.4-54.3v-40.7H226.2v-13.6h160.2c31.1 0 42.6-21.7 53.4-54.2 11.2-33.9 11-66.3 0-101.8zm-151 162c-13.6 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5 24.5 11 24.5 24.5-11 24.5-24.5 24.5zM160.3 288.5v-47.4c0-36.8 31.2-67.8 66.8-67.8h106.8c29.2 0 53.4-25 53.4-54.3V17.2c0-29-25.2-46-53.4-54.3-33.8-9.9-66.3-11.7-106.8 0C200.2-29.3 173.7-13.6 173.7 17.2v40.7h106.8v13.6H120.3c-31.1 0-42.6 21.7-53.4 54.2-11.2 33.9-11 66.3 0 101.8 7.7 30.9 22.3 54.2 53.4 54.2h40zm0-214.6c13.6 0 24.5 11 24.5 24.5s-11 24.5-24.5 24.5-24.5-11-24.5-24.5 11-24.5 24.5-24.5z"/></svg>
  ),
  Pandas: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12.44 2.89h1.16v18.22h-1.16zm-3.48 4.6h1.16v13.62H8.96zm-3.48 4.6h1.16v9.02H5.48zm10.44-4.6h1.16v13.62h-1.16zm3.48 4.6H20.56v9.02h-1.16z"/></svg>
  ),
  NumPy: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M11.23 6.9L4.47 10.8V13.1L11.23 9.2V6.9zM12.77 6.9V9.2L19.53 13.1V10.8L12.77 6.9zM3 11.6V18.1L11.23 22V15.5L3 11.6zM12.77 22L21 18.1V11.6L12.77 15.5V22zM12 2L3 6.6L11.23 10.8L20.2 6.3L12 2z"/></svg>
  ),
  Scikitlearn: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12 12m-10 0a10 10 0 1 0 20 0a10 10 0 1 0 -20 0M6 12h12M12 6v12"/></svg>
  ),
  Git: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M23.546 10.93L13.067.452a1.905 1.905 0 0 0-2.693 0L8.92 1.905l3.197 3.197a1.593 1.905 0 1 1 2.694 2.694l-3.197-3.197v5.274l3.197 3.197a1.593 1.905 0 1 1-2.69 2.69l-3.197-3.197V8.514L5.851 5.317a1.593 1.905 0 1 1 2.693-2.693L10.01 4.09 1.454 10.93a1.905 1.905 0 0 0 0 2.692l10.48 10.48a1.905 1.905 0 0 0 2.692 0l10.48-10.48a1.905 1.905 0 0 0 0-2.692z"/></svg>
  ),
  MongoDB: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M17.193 9.555c-1.353-4.364-4.576-7.838-5.193-8.482-.617.644-3.84 4.118-5.193 8.482-1.493 4.81.336 8.52 1.104 9.818l3.666 4.312.188.225.188-.225 3.666-4.312c.768-1.298 2.597-5.008 1.104-9.818zm-5.193 9.42c-2.456-4.225-.56-8.257-.56-8.257s.13 2.11 1.764 4.17c1.635 2.06 1.144 5.342 1.144 5.342-.98.375-1.558.077-2.348-1.255z"/></svg>
  ),
  GitHub: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
  ),
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
  ),
  Education: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.85 10.55l7.15 3.9 7.15-3.9L11 6.65l-7.15 3.9zM12 16.5c-2.3 0-4.4-.9-6-2.4V19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-4.9c-1.6 1.5-3.7 2.4-6 2.4z"/></svg>
  ),
  HTMLCSS: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/></svg>
  ),
  Express: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-1 3v6h6v2h-8V5h2z"/></svg>
  ),
  Java: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M6.1 19.1c-.1.1-.1.2-.1.3 0 .4.4.7 1.3 1.1 1 .5 2.7.9 4.4.9s3.4-.4 4.4-.9c.9-.4 1.3-.7 1.3-1.1s-.4-.7-1.3-1.1c-1-.5-2.7-.9-4.4-.9s-3.4.4-4.4.9c-.8.4-1.2.7-1.2 1.1zm-.4-2.5c0 .1 0 .1.1.2 1.3 1.2 4 1.9 6.2 1.9s4.9-.7 6.2-1.9c.1-.1.1-.1.1-.2V15c0-.6-.5-1.1-1.3-1.5-1-.5-2.7-.9-4.4-.9s-3.4.4-4.4.9c-.8.4-1.3.9-1.3 1.5v1.6zm.4-12.7C5.3 4.6 5 5.5 5 6.4c0 1.9 1.4 3.5 3.3 4.1-.1-.3-.1-.5-.1-.8 0-1.8 1.4-3.3 3.3-3.3.3 0 .5 0 .8.1-.6-1.9-2.2-3.3-4.2-3.3z"/></svg>
  ),
  Docker: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full fill-current"><path d="M13.962 6.075c.083-.03.16-.052.232-.07a.23.23 0 0 0 .15-.24c-.03-.23-.03-.46-.015-.69a.25.25 0 0 0-.21-.26 3.96 3.96 0 0 0-.585-.045 4.35 4.35 0 0 0-4.35 4.35 4.35 4.35 0 0 0 .105.945c.03.135.15.225.285.225h.465c.135 0 .24-.105.27-.24.06-.23.105-.465.135-.69a3.15 3.15 0 0 1 3.51-3.285zM2.13 10.32c-.135 0-.24.105-.24.24v2.73c0 .135.105.24.24.24h2.73c.135 0 .24-.105.24-.24v-2.73a.24.24 0 0 0-.24-.24zm3.36 0c-.135 0-.24.105-.24.24v2.73c0 .135.105.24.24.24h2.73c.135 0 .24-.105.24-.24v-2.73a.24.24 0 0 0-.24-.24zm3.36 0c-.135 0-.24.105-.24.24v2.73c0 .135.105.24.24.24h2.73c.135 0 .24-.105.24-.24v-2.73a.24.24 0 0 0-.24-.24zm3.36 0c-.135 0-.24.105-.24.24v2.73c0 .135.105.24.24.24h2.73c.135 0 .24-.105.24-.24v-2.73a.24.24 0 0 0-.24-.24zm0-3.36c-.135 0-.24.105-.24.24v2.73c0 .135.105.24.24.24h2.73c.135 0 .24-.105.24-.24v-2.73a.24.24 0 0 0-.24-.24zm3.36 0c-.135 0-.24.105-.24.24v2.73c0 .135.105.24.24.24h2.73c.135 0 .24-.105.24-.24v-2.73a.24.24 0 0 0-.24-.24zm3.36 0c-.135 0-.24.105-.24.24v2.73c0 .135.105.24.24.24h2.73c.135 0 .24-.105.24-.24v-2.73a.24.24 0 0 0-.24-.24zm-6.72-3.36c-.135 0-.24.105-.24.24v2.73c0 .135.105.24.24.24h2.73c.135 0 .24-.105.24-.24V3.84a.24.24 0 0 0-.24-.24z"/></svg>
  ),
  Frontend: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
  ),
  Backend: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6" y2="6"/><line x1="6" y1="18" x2="6" y2="18"/></svg>
  ),
  Data: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
  ),
  Tools: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
  )
};

// --- Components ---

const Magnetic = ({ children, strength = 0.5 }: { children: React.ReactElement; strength?: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.1 });
  const y = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.1 });

  function handleMouseMove(e: React.MouseEvent) {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    mouseX.set((clientX - centerX) * strength);
    mouseY.set((clientY - centerY) * strength);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y, willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
};

const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionTemplate`${y}deg`, { stiffness: 60, damping: 20 });
  const rotateY = useSpring(useMotionTemplate`${x}deg`, { stiffness: 60, damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set(((clientX - centerX) / (width / 2)) * 8);
    y.set(((clientY - centerY) / (height / 2)) * -8);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", willChange: "transform" }}
      className={className}
    >
      <div style={{ transform: "translateZ(30px)", backfaceVisibility: "hidden" }}>
        {children}
      </div>
    </motion.div>
  );
};

const SectionHeader = ({ title, description }: { title: string; description: string }) => {
  const words = title.split(" ");
  
  return (
    <motion.header 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-4 mb-24 max-w-2xl"
    >
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white flex flex-wrap gap-x-4">
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        ))}
      </h2>
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="text-zinc-500 text-base md:text-lg font-light leading-relaxed"
      >
        {description}
      </motion.p>
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: 96 }}
        transition={{ duration: 1.2, delay: 1 }}
        className="h-[1px] bg-zinc-800 mt-8" 
      />
    </motion.header>
  );
};

const Reveal = ({ children, delay = 0, y = 20, className = "" }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const SkillItem = ({ skill, index }: { skill: { name: string; level: number }; index: number }) => {
  const IconName = skill.name.replace(".", "").replace("/", "").replace(" ", "");
  const Icon = TechIcons[IconName as keyof typeof TechIcons] || TechIcons.React;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group space-y-3"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 text-zinc-500 group-hover:text-sky-400 transition-colors">
            <Icon />
          </div>
          <span className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">{skill.name}</span>
        </div>
        <span className="text-[10px] font-mono text-zinc-500">{skill.level}%</span>
      </div>
      <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut", delay: (index * 0.1) + 0.2 }}
          className="h-full bg-sky-500/50 group-hover:bg-sky-500 transition-colors"
        />
      </div>
    </motion.div>
  );
};

// --- Data ---

const projects = [
  {
    title: "web-portfolio",
    description: "A modern, responsive portfolio website built with Next.js 15, React 19, and Tailwind CSS. This portfolio showcases my skills, projects, education, and provides a way to connect with me.",
    tech: ["TypeScript", "Tailwind CSS", "Next.js"],
    link: "https://github.com/dkadian/web-portfolio",
    stats: "v1.2.0"
  },
  {
    title: "Dogs_cats_recog",
    description: "This repository implements a Support Vector Machine (SVM) classifier in Python to classify images of cats and dogs from the popular Kaggle Cats vs Dogs dataset.",
    tech: ["Python", "SVM", "Scikit-Learn"],
    link: "https://github.com/dkadian/Dogs_cats_recog",
    stats: "94% Acc"
  },
  {
    title: "House_pricing",
    description: "The code aims to build and evaluate linear regression models to predict house prices (SalePrice) based on their square footage and number of bedrooms and bathrooms.",
    tech: ["Python", "Linear Regression", "Pandas"],
    link: "https://github.com/dkadian/House_pricing",
    stats: "ML Model"
  },
  {
    title: "Hand_gesture_recog.",
    description: "Hand gesture recognition is a crucial component of human-computer interaction. This project aims to build a deep learning model capable of recognizing different hand gestures in real-time.",
    tech: ["Python", "Deep Learning", "OpenCV"],
    link: "https://github.com/dkadian/Hand_gesture_recog.",
    stats: "Real-time"
  },
];

const skillsData = [
  { category: "Frontend", skills: [{ name: "React", level: 90 }, { name: "Tailwind", level: 95 }, { name: "HTML/CSS", level: 90 }] },
  { category: "Backend", skills: [{ name: "Express", level: 75 }, { name: "Python", level: 85 }, { name: "Java", level: 70 }] },
  { category: "Data", skills: [{ name: "Pandas", level: 85 }, { name: "NumPy", level: 80 }, { name: "Scikit-learn", level: 80 }] },
  { category: "Tools", skills: [{ name: "MongoDB", level: 70 }, { name: "Git", level: 85 }, { name: "Docker", level: 60 }] },
];

const completedSGPAs = [
  { semester: "Semester 01", sgpa: 8.286 },
  { semester: "Semester 02", sgpa: 7.500 },
  { semester: "Semester 03", sgpa: 8.900 },
  { semester: "Semester 04", sgpa: 8.526 },
  { semester: "Semester 05", sgpa: 8.391 },
];

const cgpa = (completedSGPAs.reduce((acc, curr) => acc + curr.sgpa, 0) / completedSGPAs.length).toFixed(2);

// --- Sections ---

const Hero = () => {
  const [roleText, setRoleText] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const roles = ["B.Tech CS Student", "Data Analyst", "ML Engineer", "Python Developer", "Tech Enthusiast"];
    let currentRoleIndex = 0; let charIndex = 0; let isDeleting = false; let timeoutId: NodeJS.Timeout;
    const typeRole = () => {
      const currentRole = roles[currentRoleIndex];
      if (!isDeleting) {
        if (charIndex < currentRole.length) { setRoleText(currentRole.substring(0, charIndex + 1)); charIndex++; timeoutId = setTimeout(typeRole, 100); }
        else { isDeleting = true; timeoutId = setTimeout(typeRole, 2500); }
      } else {
        if (charIndex > 0) { charIndex--; setRoleText(currentRole.substring(0, charIndex)); timeoutId = setTimeout(typeRole, 50); }
        else { isDeleting = false; currentRoleIndex = (currentRoleIndex + 1) % roles.length; timeoutId = setTimeout(typeRole, 800); }
      }
    };
    timeoutId = setTimeout(typeRole, 500); return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center py-32 max-w-7xl mx-auto px-6 text-center">
      {/* Theme Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 space-y-20">
        <Reveal delay={0.2} y={10}>
          <div className="flex items-center justify-center gap-4 text-zinc-500 font-medium text-sm tracking-tight">
            <span className="w-8 h-[1px] bg-zinc-800" />
            BASED IN GURUGRAM, IN // 2026
            <span className="w-8 h-[1px] bg-zinc-800" />
          </div>
        </Reveal>

        <div className="flex flex-col items-center gap-16">
          <Reveal delay={0.4} y={30}>
            <TiltCard>
              <div className="relative w-56 h-56 md:w-72 md:h-72 group perspective-1000">
                <motion.div 
                  className="relative w-full h-full"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front Side: Unknown.jpg */}
                  <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
                    <div className="relative w-full h-full grayscale transition-all duration-1000 ease-out overflow-hidden border border-zinc-800 rounded-2xl shadow-2xl bg-zinc-900/50 p-2">
                      <div className="relative w-full h-full overflow-hidden rounded-xl">
                        <Image 
                          src="/Unknown.jpg" 
                          alt="Unknown Identity" 
                          fill 
                          sizes="(max-width: 768px) 224px, 288px"
                          className="object-cover scale-110" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Back Side: profile.jpeg */}
                  <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                    <div className="relative w-full h-full transition-all duration-1000 ease-out overflow-hidden border border-zinc-800 rounded-2xl shadow-2xl bg-zinc-900/50 p-2">
                      <div className="relative w-full h-full overflow-hidden rounded-xl">
                        <Image 
                          src="/profile.jpeg" 
                          alt="Deepak Kadian" 
                          fill 
                          sizes="(max-width: 768px) 224px, 288px"
                          className="object-cover" 
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Reveal Toggle Button - Extremely Minimal */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-30 pointer-events-none">
                  <button 
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="pointer-events-auto group/btn flex flex-col items-center gap-3 transition-all duration-1000"
                  >
                    <div className="w-8 h-8 rounded-full border border-white/[0.05] flex items-center justify-center group-hover/btn:border-sky-500/20 transition-colors duration-1000">
                      <div className="w-1 h-1 rounded-full bg-white/10 group-hover/btn:bg-sky-500/50 transition-colors duration-1000" />
                    </div>
                    <span className="text-[7px] font-mono text-white/5 tracking-[0.5em] uppercase group-hover/btn:text-white/20 transition-colors duration-1000">
                      {isFlipped ? "Secure" : "Reveal"}
                    </span>
                  </button>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <div className="space-y-12">
            <Reveal delay={0.6} y={20}>
              <h1 className="text-6xl md:text-[10rem] font-bold tracking-tighter leading-[0.8] select-none">
                <span className="text-white">Deepak</span> <br />
                <span className="text-sky-500">Kadian.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.8} y={20}>
              <div className="flex flex-col items-center gap-8">
                <p className="text-lg md:text-xl text-zinc-400 max-w-2xl font-light leading-relaxed tracking-tight text-balance">
                  Building innovative technical systems with a focus on data analysis, machine learning, and high-performance software architecture.
                </p>
                <div className="h-px w-24 bg-sky-500/20" />
                <p className="text-sky-400 font-mono text-lg font-bold tracking-tight">
                  {roleText}<span className="inline-block w-[1px] h-5 bg-sky-500/50 ml-2 animate-pulse align-middle"></span>
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={1} y={20}>
          <div className="flex flex-wrap justify-center gap-12 pt-8">
            <Magnetic strength={0.3}>
              <a href="#projects" className="group flex items-center gap-3 text-xs font-bold text-white uppercase tracking-widest hover:opacity-50 transition-all">
                See My Work
                <span className="text-xl group-hover:translate-x-2 transition-transform duration-500">→</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.3}>
              <a href="#contact" className="group flex items-center gap-3 text-xs font-bold text-zinc-500 uppercase tracking-widest hover:text-white transition-all">
                Get in Touch
                <span className="text-xl group-hover:translate-x-2 transition-transform duration-500">→</span>
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
};

const Projects = () => (
  <section id="projects" className="py-48 scroll-mt-20 px-6 max-w-7xl mx-auto overflow-visible">
    <SectionHeader title="Selected Work" description="A curated selection of technical implementations and software architecture." />
    <div className="space-y-16">
      {projects.map((project, index) => (
        <Reveal key={project.title} delay={index * 0.1}>
          <div className="p-4"> {/* Breathing room for 3D Tilt */}
            <TiltCard className="h-full">
              <div className="glass-card group h-full shadow-2xl relative overflow-visible">
                {/* Internal container to enforce rounded corners without breaking 3D context of the TiltCard */}
                <div className="relative z-10 h-full overflow-hidden rounded-[inherit] flex flex-col justify-between p-10 md:p-16">
                  <div className="space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                      <div className="space-y-4">
                        <span className="text-[10px] font-bold text-sky-500/50 uppercase tracking-[0.2em]">Project_0{index + 1}</span>
                        <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white group-hover:text-sky-400 transition-colors duration-500 uppercase tracking-tighter leading-[1.1] break-words">
                          {project.title.replace(/_/g, " ")}
                        </h3>
                      </div>
                      <span className="glass-pill px-4 py-2 text-[10px]">{project.stats}</span>
                    </div>
                    <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed tracking-tight max-w-3xl group-hover:text-zinc-300 transition-colors">{project.description}</p>
                  </div>
                  <div className="space-y-12 pt-16 mt-auto">
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[11px] font-bold text-zinc-600 uppercase tracking-widest border border-white/5 px-4 py-2 rounded-xl bg-white/[0.02]">{t}</span>
                      ))}
                    </div>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="group/link inline-flex items-center gap-4 text-xs font-bold text-white hover:text-sky-400 transition-all uppercase tracking-[0.3em]">
                      Access_Source_Code
                      <span className="text-2xl group-hover/link:translate-x-2 transition-transform">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

interface GitHubContributionDay {
  contributionCount: number;
  date: string;
}

interface GitHubContributionWeek {
  contributionDays: GitHubContributionDay[];
}

interface GitHubContributionCalendar {
  weeks: GitHubContributionWeek[];
  totalContributions: number;
}

const GitHubHub = () => {
  const [calendar, setCalendar] = useState<GitHubContributionCalendar | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const response = await fetch("/api/github");
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setCalendar(data);
        }
      } catch (err) {
        setError("Network connection error");
        console.error("Error fetching GitHub data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGitHubData();
  }, []);

  const stats = [
    { label: "Total Contributions", value: calendar?.totalContributions ?? (loading ? "..." : "0"), icon: "🔥" },
    { label: "Active Weeks", value: calendar?.weeks?.length ?? (loading ? "..." : "0"), icon: "🗓️" },
    { label: "System_User", value: "dkadian", icon: "👨‍💻" },
  ];

  return (
    <section id="activity" className="py-48 scroll-mt-20 px-6 max-w-7xl mx-auto">
      <SectionHeader title="Contribution Graph" description="Real-time pulse of my technical development cycles and architectural consistency." />
      
      <div className="space-y-12">
        <Reveal>
          <TiltCard>
            <div className="glass-card p-10 md:p-14 space-y-12 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-white/5 pb-10">
                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-white tracking-tighter uppercase">Activity_Index</h3>
                  <p className="text-zinc-500 text-sm font-light">
                    {error ? <span className="text-red-400/80">ERROR: {error}</span> : "Direct synchronization with GitHub Technical Systems."}
                  </p>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${error ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-emerald-500/5 border-emerald-500/10 text-emerald-500"} text-[9px] font-bold tracking-widest uppercase`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${error ? "bg-red-500" : "bg-emerald-500 animate-pulse"}`} />
                  {error ? "Sync_Failed" : "Live_Sync_Enabled"}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 pb-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="space-y-2">
                    <div className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">{stat.label}</div>
                    <div className="text-3xl font-bold text-white flex items-center gap-3">
                      <span className="text-lg opacity-30">{stat.icon}</span>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Real GitHub Contribution Graph (Squares) */}
              <div className="space-y-6 pt-10 border-t border-white/5">
                <div className="flex justify-between items-center px-2">
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Commit_Matrix // Last_12_Months</div>
                  <div className="flex items-center gap-2 text-[9px] font-bold text-zinc-600 uppercase">
                    <span>Less</span>
                    <div className="flex gap-1">
                      {[0.2, 0.4, 0.6, 0.8, 1].map((op) => (
                        <div key={op} className="w-2.5 h-2.5 rounded-[2px] bg-sky-500" style={{ opacity: op }} />
                      ))}
                    </div>
                    <span>More</span>
                  </div>
                </div>

                <div className="overflow-x-auto pb-6 custom-scrollbar">
                  <div className="inline-flex flex-col gap-2 min-w-full p-2">
                    {loading ? (
                      <div className="h-32 w-full bg-white/[0.02] animate-pulse rounded-2xl flex items-center justify-center text-[10px] font-bold text-zinc-700 tracking-[0.5em] uppercase">Initialising_Data_Link...</div>
                    ) : error ? (
                      <div className="h-32 w-full border border-dashed border-red-500/20 rounded-2xl flex items-center justify-center text-[10px] font-bold text-red-500/50 tracking-[0.5em] uppercase">Connection_Interrupted</div>
                    ) : (
                      <>
                        {/* Month Labels Row */}
                        <div className="flex gap-[3px]">
                          {calendar?.weeks?.map((week: GitHubContributionWeek, i: number) => {
                            const firstDay = new Date(week.contributionDays[0].date);
                            const isFirstWeekOfMonth = firstDay.getDate() <= 7;
                            return (
                              <div key={i} className="w-[12px] h-3 flex-shrink-0">
                                {isFirstWeekOfMonth && (
                                  <span className="text-[8px] font-bold text-zinc-600 uppercase whitespace-nowrap">
                                    {firstDay.toLocaleString('default', { month: 'short' })}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Squares Grid */}
                        <div className="flex gap-[3px]">
                          {calendar?.weeks?.map((week: GitHubContributionWeek, i: number) => (
                            <div key={i} className="flex flex-col gap-[3px] flex-shrink-0">
                              {week.contributionDays.map((day: GitHubContributionDay, j: number) => {
                                const count = day.contributionCount;
                                let color = "#18181b"; // Empty
                                
                                if (count > 0) {
                                  if (count <= 2) color = "#075985"; // Darkest blue (Few commits)
                                  else if (count <= 5) color = "#0284c7";
                                  else if (count <= 8) color = "#0ea5e9";
                                  else color = "#7dd3fc"; // Brightest blue (Most commits)
                                }

                                return (
                                  <div
                                    key={j}
                                    className="w-[12px] h-[12px] rounded-[2px] opacity-0 animate-matrix transition-colors duration-500 hover:ring-1 hover:ring-white/20"
                                    style={{ 
                                      backgroundColor: color,
                                      animationDelay: `${(i + j) * 0.005}s`
                                    }}
                                    title={`${count} commits on ${new Date(day.date).toLocaleDateString()}`}
                                  />
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 border border-white/5 p-10 md:p-12 rounded-[2.5rem] bg-zinc-900/20 shadow-xl">
            <div className="max-w-xl text-center md:text-left space-y-4">
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">Open Source Documentation</h3>
              <p className="text-zinc-500 text-sm font-light leading-relaxed">
                My architectural journey is documented in real-time. Access the source code of my projects, research notes, and development experiments directly on GitHub.
              </p>
            </div>
            <Magnetic>
              <a href="https://github.com/dkadian" target="_blank" className="px-12 py-5 bg-white text-black rounded-2xl font-bold hover:bg-sky-400 hover:text-white transition-all duration-700 active:scale-95 text-[10px] uppercase tracking-[0.2em] whitespace-nowrap shadow-2xl">
                Access_Systems
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Skills = () => (
  <section id="skills" className="py-48 scroll-mt-20 px-6 max-w-7xl mx-auto">
    <SectionHeader title="Expertise" description="Technical analysis of core competencies and engineering toolsets." />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {skillsData.map((group, groupIndex) => (
        <Reveal key={group.category} delay={groupIndex * 0.1}>
          <TiltCard className="h-full">
            <div className="glass-card p-10 h-full shadow-2xl">
              <h3 className="text-[10px] font-bold text-sky-500/50 uppercase tracking-[0.3em] mb-10 border-b border-white/5 pb-6">{group.category}</h3>
              <div className="space-y-8">
                {group.skills.map((skill, skillIndex) => (
                  <SkillItem key={skill.name} skill={skill} index={skillIndex} />
                ))}
              </div>
            </div>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  </section>
);

const Education = () => (
  <section id="education" className="py-48 scroll-mt-20 px-6 max-w-7xl mx-auto">
    <SectionHeader title="Education" description="Academic development and performance metrics during my engineering degree." />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Reveal>
        <TiltCard className="h-full">
          <div className="glass-card p-10 md:p-12 space-y-16 h-full shadow-2xl">
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8 border-b border-white/5 pb-8 hover:border-sky-500/30 transition-colors duration-700">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">2023 — 2027</span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight text-balance">B.Tech in Computer Science</h3>
                  <p className="text-zinc-500 text-sm font-light italic">Sushant University • School of Engineering</p>
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">CGPA_Index</span>
                  <div className="text-4xl font-bold text-white">{cgpa}</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {completedSGPAs.map((sem) => (
                <div key={sem.semester} className="space-y-1">
                  <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-tighter">{sem.semester}</div>
                  <div className="text-xl font-bold text-white/80 hover:text-sky-400 transition-colors cursor-default">{sem.sgpa.toFixed(3)}</div>
                </div>
              ))}
            </div>
          </div>
        </TiltCard>
      </Reveal>
      <div className="space-y-8">
        {[
          { title: "Class 12", school: "GBSSS, Dharampura", result: "80%", year: "2022", delay: 0.15 },
          { title: "Class 10", school: "Krishna Model School", result: "84%", year: "2020", delay: 0.25 }
        ].map((item) => (
          <Reveal key={item.title} delay={item.delay}>
            <TiltCard>
              <div className="glass-card p-10 space-y-6 hover:translate-x-1 transition-all duration-700 shadow-2xl">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-sky-500/50 uppercase tracking-widest">{`${item.year} // ${item.title}`}</span>
                </div>
                <h3 className="text-xl font-bold text-white leading-tight uppercase tracking-tight mb-4">{item.school}</h3>
                <div className="flex justify-between items-end border-t border-white/5 pt-6 mt-6">
                  <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Result_Index</span>
                  <span className="text-white font-bold text-2xl font-mono">{item.result}</span>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const CV = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownload = () => {
    setIsDownloading(true); const link = document.createElement("a"); link.href = "/Resume.pdf"; link.download = "Deepak_Kadian_Resume.pdf";
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    setTimeout(() => setIsDownloading(false), 2000);
  };
  return (
    <section id="cv" className="py-32 scroll-mt-20 px-6 max-w-5xl mx-auto">
      <Reveal>
        <TiltCard>
          <div className="glass-card p-10 md:p-20 flex flex-col items-center text-center relative group overflow-hidden shadow-2xl">
            <div className="relative z-10 space-y-10">
              <div className="font-mono text-zinc-500 text-[10px] tracking-[1em] uppercase opacity-50">Documentation</div>
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase leading-tight">Curriculum <br /> Vitae</h2>
              <p className="text-zinc-500 text-sm md:text-base font-light max-w-lg mx-auto tracking-tight opacity-80">Access technical documentation of professional trajectory and academic mastery.</p>
              <Magnetic>
                <button onClick={handleDownload} disabled={isDownloading} className="px-12 py-5 border border-white/10 hover:bg-white hover:text-black transition-all duration-700 text-[10px] font-bold tracking-[0.4em] disabled:opacity-50 uppercase rounded-xl shadow-2xl">
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

const Contact = () => {
  return (
    <section id="contact" className="py-48 scroll-mt-20 px-6 max-w-7xl mx-auto">
      <SectionHeader title="Contact" description="Establish a connection for technical inquiries or collaborations." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <Reveal>
          <TiltCard className="h-full">
            <div className="glass-card p-12 md:p-16 h-full flex flex-col justify-center space-y-12 shadow-2xl">
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight uppercase leading-tight">Module currently <br /> undergoing <br /> optimization.</h3>
                <p className="text-zinc-500 text-lg font-light tracking-tight max-w-md">Our direct communication gateway is temporarily offline for architectural enhancements.</p>
              </div>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-sky-500/5 border border-sky-500/10 text-[9px] font-bold text-sky-500 tracking-widest uppercase w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                Establishing Link
              </div>
            </div>
          </TiltCard>
        </Reveal>
        <div className="space-y-8">
          <div className="grid gap-6">
            {[
              { label: "Email_Primary", value: "deepakkadian581@gmail.com", href: "mailto:deepakkadian581@gmail.com" },
              { label: "Github_Source", value: "dkadian", href: "https://github.com/dkadian" },
              { label: "Linkedin_Network", value: "Deepak Kadian", href: "https://linkedin.com/in/deepak-5a1749238/" }
            ].map((node) => (
              <Reveal key={node.label}>
                <Magnetic strength={0.1}>
                  <a href={node.href} target="_blank" className="glass-card group p-8 flex justify-between items-center hover:translate-x-1 transition-all duration-500 shadow-2xl">
                    <div className="space-y-1">
                      <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{node.label}</div>
                      <div className="text-lg font-bold text-zinc-300 group-hover:text-white transition-colors">{node.value}</div>
                    </div>
                    <span className="text-2xl text-zinc-800 group-hover:text-sky-500 transition-all duration-700">→</span>
                  </a>
                </Magnetic>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function HomePage() {
  return (
    <div className="space-y-0 selection:bg-sky-500/30">
      <Hero />
      <GitHubHub />
      <Projects />
      <Skills />
      <Education />
      <CV />
      <Contact />
    </div>
  );
}
