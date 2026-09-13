"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { Magnetic, TiltCard, SectionHeader, Reveal } from "../ui/SharedUI";
import { projects, skillsData, experienceData, certificationsData, Project } from "../../data";

export const Experience = () => (
  <section id="experience" className="py-24 md:py-48 scroll-mt-20">
    <SectionHeader title="Experience" description="Professional internships and industry engagements." />
    <div className="space-y-8 md:space-y-12">
      {experienceData.map((exp, index) => (
        <Reveal key={index} delay={index * 0.1}>
          <TiltCard>
            <div className="glass-card p-6 md:p-12 shadow-2xl flex flex-col md:flex-row gap-6 md:gap-12 hover:border-sky-500/30 transition-colors duration-700">
              <div className="md:w-1/3 flex flex-col gap-2 border-b md:border-b-0 md:border-r border-white/5 pb-6 md:pb-0 md:pr-6">
                <div className="text-[8px] md:text-[10px] font-bold text-sky-500/80 uppercase tracking-widest">{exp.duration}</div>
                <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight">{exp.company}</h3>
                <div className="text-zinc-500 text-xs md:text-sm font-light uppercase tracking-wide">{exp.location}</div>
              </div>
              <div className="md:w-2/3 flex flex-col gap-4">
                <h4 className="text-lg md:text-xl font-bold text-white tracking-tight">{exp.role}</h4>
                <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">{exp.description}</p>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  </section>
);

