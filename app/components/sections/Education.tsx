"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { Magnetic, TiltCard, SectionHeader, Reveal } from "../ui/SharedUI";
import { projects, skillsData, experienceData, certificationsData, Project, cgpa, completedSGPAs } from "../../data";

export const Education = () => (
  <section id="education" className="py-24 md:py-48 scroll-mt-20">
    <SectionHeader title="Education" description="Academic development and performance metrics during my engineering degree." />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
      <Reveal>
        <TiltCard className="h-full">
          <div className="glass-card p-6 md:p-12 space-y-12 md:space-y-16 h-full shadow-2xl">
            <div className="space-y-6 md:space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-8 border-b border-white/5 pb-6 md:pb-8 hover:border-sky-500/30 transition-colors duration-700">
                <div className="space-y-2">
                  <span className="text-[8px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest">2023 — Present</span>
                  <h3 className="text-xl md:text-3xl font-bold text-white uppercase tracking-tight text-balance">B.Tech in Computer Science (AIML)</h3>
                  <p className="text-zinc-500 text-xs md:text-sm font-light italic">Sushant University, Gurugram</p>
                </div>
                <div className="text-left">
                  <span className="text-[8px] md:text-[9px] font-bold text-zinc-600 uppercase tracking-widest">CGPA_Index</span>
                  <div className="text-3xl md:text-4xl font-bold text-white">{cgpa}</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8">
              {completedSGPAs.map((sem) => (
                <div key={sem.semester} className="space-y-1">
                  <div className="text-[8px] md:text-[9px] font-bold text-zinc-600 uppercase tracking-tighter">{sem.semester}</div>
                  <div className="text-lg md:text-xl font-bold text-white/80 hover:text-sky-400 transition-colors cursor-default">
                    {typeof sem.sgpa === 'number' ? sem.sgpa.toFixed(3) : "TBD"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TiltCard>
      </Reveal>
      <div className="space-y-6 md:space-y-8">
        {[
          { title: "Class 12", school: "GBSSS, Dharampura", result: "80%", year: "2022", delay: 0.15 },
          { title: "Class 10", school: "Krishna Model School", result: "84%", year: "2020", delay: 0.25 }
        ].map((item) => (
          <Reveal key={item.title} delay={item.delay}>
            <TiltCard>
              <div className="glass-card p-6 md:p-10 space-y-4 md:space-y-6 hover:translate-x-1 transition-all duration-700 shadow-2xl">
                <div className="flex justify-between items-center">
                  <span className="text-[8px] md:text-[10px] font-bold text-sky-500/50 uppercase tracking-widest">{`${item.year} // ${item.title}`}</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white leading-tight uppercase tracking-tight mb-2 md:mb-4">{item.school}</h3>
                <div className="flex justify-between items-end border-t border-white/5 pt-4 md:pt-6 mt-4 md:mt-6">
                  <span className="text-[8px] md:text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Result_Index</span>
                  <span className="text-white font-bold text-xl md:text-2xl font-mono">{item.result}</span>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

