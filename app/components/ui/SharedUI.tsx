"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";

export const Magnetic = ({ children, strength = 0.5 }: { children: React.ReactElement; strength?: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.1 });
  const y = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.1 });

  function handleMouseMove(e: React.MouseEvent) {
    // Skip heavy math on touch devices seamlessly
    if (typeof window !== "undefined" && window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;
    
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
      style={{ x, y }}
    >
      {children}
    </motion.div>
  );
};

export const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
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
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      <div style={{ transform: "translateZ(30px)", backfaceVisibility: "hidden" }}>
        {children}
      </div>
    </motion.div>
  );
};

export const SectionHeader = ({ title, description }: { title: string; description: string }) => {
  const words = title.split(" ");

  return (
    <motion.header
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-4 mb-16 md:mb-24 max-w-2xl"
    >
      <motion.h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase leading-none">
        {words.map((word, i) => (
          <span key={i} className="inline-block mr-2 md:mr-3">
            {word}
          </span>
        ))}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="text-zinc-500 text-sm md:text-lg font-light leading-relaxed"
      >
        {description}
      </motion.p>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        style={{ originX: 0 }}
        transition={{ duration: 1.2, delay: 1 }}
        className="h-[1px] bg-zinc-800 mt-6 md:mt-8 w-16 md:w-24"
      />
    </motion.header>
  );
};

export const Reveal = ({ children, delay = 0, y = 20, className = "" }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-20px" }}
    transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

