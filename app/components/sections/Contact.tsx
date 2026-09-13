"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { Magnetic, TiltCard, SectionHeader, Reveal } from "../ui/SharedUI";
import { projects, skillsData, experienceData, certificationsData, Project } from "../../data";

export const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-48 scroll-mt-20">
      <SectionHeader title="Contact" description="Establish a connection for technical inquiries or collaborations." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <Reveal>
          <TiltCard className="h-full">
            <div className="glass-card p-8 md:p-16 h-full flex flex-col justify-center space-y-8 md:space-y-12 shadow-2xl">
              <div className="space-y-4">
                <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight uppercase leading-tight">Module currently <br /> undergoing <br /> optimization.</h3>
                <p className="text-zinc-500 text-base md:text-lg font-light tracking-tight max-w-md">Our direct communication gateway is temporarily offline for architectural enhancements.</p>
              </div>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-sky-500/5 border border-sky-500/10 text-[8px] md:text-[9px] font-bold text-sky-500 tracking-widest uppercase w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                Establishing Link
              </div>
            </div>
          </TiltCard>
        </Reveal>
        <div className="space-y-6 md:space-y-8">
          <div className="grid gap-4 md:gap-6">
            {[
              { label: "Email_Primary", value: "deepakkadian581@gmail.com", href: "mailto:deepakkadian581@gmail.com" },
              { label: "Github_Source", value: "dkadian", href: "https://github.com/dkadian" },
              { label: "Linkedin_Network", value: "Deepak Kadian", href: "https://linkedin.com/in/deepak-5a1749238/" }
            ].map((node) => (
              <Reveal key={node.label}>
                <Magnetic strength={0.1}>
                  <a href={node.href} target="_blank" className="glass-card group p-6 md:p-8 flex justify-between items-center hover:translate-x-1 transition-all duration-500 shadow-2xl">
                    <div className="space-y-1">
                      <div className="text-[8px] md:text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{node.label}</div>
                      <div className="text-base md:text-lg font-bold text-zinc-300 group-hover:text-white transition-colors">{node.value}</div>
                    </div>
                    <span className="text-xl md:text-2xl text-zinc-800 group-hover:text-sky-500 transition-all duration-700">→</span>
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

