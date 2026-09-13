"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { Magnetic, TiltCard, SectionHeader, Reveal } from "../ui/SharedUI";
import { projects, skillsData, experienceData, certificationsData, Project } from "../../data";

export const Hero = () => {
  const [roleText, setRoleText] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const roles = ["B.Tech CS (AIML) Student", "AI/ML Developer", "Data Analyst", "Python Developer", "Tech Enthusiast"];
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
    <section id="home" className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center py-20 md:py-32 text-center">
      {/* Theme Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-sky-500/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none -z-10" />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 space-y-12 md:space-y-20">
        <Reveal delay={0.2} y={10}>
          <div className="flex items-center justify-center gap-4 text-zinc-500 font-medium text-[10px] md:text-sm tracking-tight">
            <span className="w-4 md:w-8 h-[1px] bg-zinc-800" />
            BASED IN GURUGRAM, IN // 2026
            <span className="w-4 md:w-8 h-[1px] bg-zinc-800" />
          </div>
        </Reveal>

        <div className="flex flex-col items-center gap-8 md:gap-12">
          <Reveal delay={0.4}>
            <TiltCard>
              <div className="relative w-48 h-48 md:w-72 md:h-72 group perspective-1000">
                <motion.div
                  className="relative w-full h-full"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front Side: Unknown.jpg */}
                  <motion.div
                    className="absolute inset-0"
                    style={{ backfaceVisibility: "hidden" }}
                    animate={{ opacity: isFlipped ? 0 : 1 }}
                    transition={{ duration: 0.4, delay: isFlipped ? 0 : 0.2 }}
                  >
                    <div className="relative w-full h-full grayscale transition-all duration-1000 ease-out overflow-hidden border border-zinc-800 rounded-2xl shadow-2xl bg-zinc-900/50 p-2">
                      <div className="relative w-full h-full overflow-hidden rounded-xl">
                        <Image
                          src="/Unknown.jpg"
                          alt="Unknown Identity"
                          fill
                          priority
                          quality={60}
                          sizes="(max-width: 768px) 224px, 288px"
                          className="object-cover scale-110"
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Back Side: profile.jpeg */}
                  <motion.div
                    className="absolute inset-0"
                    style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    animate={{ opacity: isFlipped ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: isFlipped ? 0.2 : 0 }}
                  >
                    <div className="relative w-full h-full transition-all duration-1000 ease-out overflow-hidden border border-zinc-800 rounded-2xl shadow-2xl bg-zinc-900/50 p-2">
                      <div className="relative w-full h-full overflow-hidden rounded-xl">
                        <Image
                          src="/profile.jpeg"
                          alt="Deepak Kadian"
                          fill
                          priority
                          quality={60}
                          sizes="(max-width: 768px) 224px, 288px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Reveal Toggle Button - Extremely Minimal */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-30 pointer-events-none">
                  <button
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="pointer-events-auto px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-[0.2em] hover:bg-sky-500 hover:border-sky-400 transition-all active:scale-95 shadow-2xl"
                  >
                    {isFlipped ? "Secure_Identity" : "Reveal_Identity"}
                  </button>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={0.6}>
              <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter uppercase leading-[0.85]">
                Deepak <br /> <span className="text-sky-500">Kadian</span>
              </h1>
            </Reveal>
            <Reveal delay={0.8}>
              <div className="flex flex-col items-center gap-4">
                <div className="h-8 flex items-center justify-center">
                  <span className="text-zinc-500 font-mono text-lg uppercase tracking-widest">{roleText}</span>
                  <span className="w-[2px] h-6 bg-sky-500 ml-2 animate-pulse" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={1.2}>
          <div className="flex justify-center">
            <Magnetic>
              <a 
                href="#projects" 
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById("projects");
                  if (element) {
                    const offset = 80;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = element.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;
                    
                    const startPosition = window.scrollY;
                    const distance = offsetPosition - startPosition;
                    let startTime: number | null = null;
                    const duration = 900;

                    const easeInOutCubic = (t: number) => {
                      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                    };

                    const animation = (currentTime: number) => {
                      if (startTime === null) startTime = currentTime;
                      const timeElapsed = currentTime - startTime;
                      const progress = Math.min(timeElapsed / duration, 1);
                      const ease = easeInOutCubic(progress);
                      
                      window.scrollTo(0, startPosition + distance * ease);
                      
                      if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                      }
                    };

                    requestAnimationFrame(animation);
                  }
                }}
                className="group flex flex-col items-center gap-4 cursor-pointer"
              >
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em] group-hover:text-sky-500 transition-colors">Scroll_To_Explore</span>
                <div className="w-[1px] h-20 bg-gradient-to-b from-sky-500 to-transparent relative overflow-hidden">
                  <motion.div animate={{ y: [0, 80] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 left-0 w-full h-1/2 bg-white" />
                </div>
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
};

