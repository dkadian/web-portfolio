"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { Magnetic, TiltCard, SectionHeader, Reveal } from "../ui/SharedUI";
import { projects, skillsData, experienceData, certificationsData, Project } from "../../data";

export const Contact = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (res.ok) {
        setStatus("success");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-48 scroll-mt-20">
      <SectionHeader title="Contact" description="Establish a connection for technical inquiries or collaborations." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <Reveal>
          <TiltCard className="h-full">
            <div className="glass-card p-8 md:p-16 h-full flex flex-col justify-center relative overflow-hidden group shadow-2xl">
              
              {/* Sending & Success Overlay Animation */}
              <AnimatePresence>
                {(status === "loading" || status === "success") && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950/90 backdrop-blur-md rounded-3xl"
                  >
                    <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
                      {status === "loading" && (
                        <motion.svg 
                          className="w-12 h-12 text-sky-500" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                          animate={{ 
                            x: [0, 10, -10, 0],
                            y: [0, -10, 10, 0],
                            scale: [1, 0.9, 1.1, 1]
                          }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 2, 
                            ease: "easeInOut" 
                          }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </motion.svg>
                      )}
                      
                      {status === "success" && (
                        <>
                          <motion.div
                            className="absolute inset-0 rounded-full bg-emerald-500/20"
                            initial={{ scale: 0.8, opacity: 1 }}
                            animate={{ scale: 1.8, opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                          />
                          <motion.svg className="relative z-10 w-full h-full text-emerald-500" viewBox="0 0 50 50">
                            <motion.circle cx="25" cy="25" r="22" fill="none" stroke="currentColor" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, ease: "easeOut" }} />
                            <motion.path fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M16 26l6 6 12-12" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }} />
                          </motion.svg>
                        </>
                      )}
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: status === "success" ? 0.7 : 0 }}
                      className="text-center"
                    >
                      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-2">
                        {status === "loading" ? "Transmitting..." : "Transmission Successful"}
                      </h3>
                      <p className="text-zinc-400 text-xs md:text-sm font-medium tracking-wide">
                        {status === "loading" ? "Establishing secure connection" : "Connection secured. I will review shortly."}
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none group-hover:bg-sky-500/10 transition-colors duration-700" />
              
              <div className="mb-8 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Available for work</span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">Initialize Contact</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      name="name" 
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all text-sm"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      name="email" 
                      required
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all text-sm"
                      placeholder="Your Email Address"
                    />
                  </div>
                  <div>
                    <textarea 
                      name="message" 
                      required
                      rows={4}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all resize-none text-sm"
                      placeholder="Transmission payload..."
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={status === "loading" || status === "success"}
                  className={`w-full py-4 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 flex justify-center items-center gap-2
                    ${status === "idle" ? "bg-white text-black hover:bg-zinc-200" : ""}
                    ${status === "error" ? "bg-red-500/10 border border-red-500/30 text-red-400" : ""}
                  `}
                >
                  {status === "idle" && "Transmit Payload"}
                  {status === "error" && "Transmission Failed ✗"}
                </button>
              </form>
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

