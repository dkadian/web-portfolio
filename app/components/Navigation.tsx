"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";

const links = [
  { href: "#home", label: "Home", icon: (className: string) => <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { href: "#projects", label: "Projects", icon: (className: string) => <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5"/><path d="m5 12 7 7 7-7"/></svg> }, // Briefly using downward arrow for "scroll down" feel, but better as a folder/briefcase
  { href: "#expertise", label: "Expertise", icon: (className: string) => <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
  { href: "#education", label: "Education", icon: (className: string) => <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg> },
  { href: "#cv", label: "CV", icon: (className: string) => <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14.5 2 14.5 7.5 20 7.5"/></svg> },
  { href: "#contact", label: "Contact", icon: (className: string) => <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> },
];

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.substring(1);
    const element = document.getElementById(sectionId);
    if (element) {
      setIsMobileMenuOpen(false);
      
      // Perform scroll with a small delay to ensure menu closing transition doesn't interfere
      setTimeout(() => {
        const offset = 80; // Adjusted for fixed navbar
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }, 100);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const sections = links.map(link => link.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjust for fixed header height
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled || isMobileMenuOpen ? "py-2 bg-[#09090b] border-b border-white/5 shadow-2xl" : "py-4 md:py-6 bg-transparent"}`}>
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-sky-500/50 origin-left z-50"
        style={{ scaleX }}
      />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Typographic Logo / Mobile Toggle */}
        <div className="flex items-center gap-3 relative z-[60]">
          <button 
            onClick={() => {
              if (window.innerWidth < 768) {
                setIsMobileMenuOpen(!isMobileMenuOpen);
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="w-8 h-8 md:w-6 md:h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white hover:border-sky-500/50 transition-colors text-xs md:text-[10px]"
          >
            D
          </button>
          <span className="hidden md:inline text-xs font-bold tracking-tighter text-white uppercase">KADIAN<span className="text-sky-500">.</span></span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 p-1 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-full">
          {links.map((link) => {
            const sectionId = link.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`relative px-5 py-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-500 rounded-full ${isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 bg-white/[0.05] rounded-full border border-white/10"
                    transition={{ type: "spring", duration: 0.8, bounce: 0.1 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </div>

        {/* Social Links or Status - Desktop Only */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900/50 rounded-full border border-white/5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">Available_Now</span>
          </div>
        </div>
      </div>

      {/* Mobile Side Drawer & Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Dimmed Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/40 z-[90]"
            />

            {/* Side Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="md:hidden fixed top-0 left-0 bottom-0 w-[75%] max-w-[280px] bg-white/[0.08] backdrop-blur-3xl z-[100] shadow-[20px_0_50px_rgba(0,0,0,0.8)] border-r border-white/10 flex flex-col p-6 pt-16"
            >
              {/* Light-catching edge for glass effect */}
              <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.05] to-transparent pointer-events-none" />
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Profile Photo & Signature side-by-side */}
                <div className="mb-12 px-4 flex items-center gap-5">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/10 shadow-2xl flex-shrink-0">
                    <Image 
                      src="/profile.jpeg" 
                      alt="Profile" 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="relative flex-1 h-12 grayscale brightness-200 opacity-95">
                    <Image 
                      src="/signature.png" 
                      alt="Signature" 
                      fill 
                      className="object-contain object-left"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.5em] mb-6 px-5 opacity-50">System_Navigation</div>
                  {links.map((link, i) => {
                    const sectionId = link.href.substring(1);
                    const isActive = activeSection === sectionId;
                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={(e) => scrollToSection(e, link.href)}
                        className={`relative flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-500 group ${
                          isActive ? "bg-white/10 text-sky-400" : "text-zinc-500 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-4 relative z-10">
                          {link.icon(`w-5 h-5 ${isActive ? "stroke-sky-400" : "stroke-zinc-500 group-hover:stroke-zinc-300"}`)}
                          <span className="text-[11px] font-bold uppercase tracking-[0.25em]">{link.label}</span>
                        </div>

                        {isActive && (
                          <motion.div
                            layoutId="active-indicator"
                            className="w-1.5 h-1.5 rounded-full bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.8)] relative z-10"
                          />
                        )}
                      </motion.a>
                    );
                  })}                </div>

                {/* Drawer Footer Info */}
                <div className="mt-auto space-y-4">
                  <div className="h-[1px] w-full bg-white/5" />
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">System_Active_v1.2.0</span>
                  </div>
                  <div className="text-[8px] font-bold text-zinc-700 uppercase tracking-[0.4em]">Deepak_Kadian // 2026</div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
