"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const links = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#cv", label: "CV" },
  { href: "#contact", label: "Contact" },
];

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = links.map(link => link.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-4" : "py-8"}`}>
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-sky-500 origin-left z-50"
        style={{ scaleX }}
      />
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        {/* Typographic Logo */}
        <a href="#home" className="group flex items-center gap-3 hover:opacity-70 transition-opacity">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white group-hover:border-sky-500/50 transition-colors">D</div>
          <span className="text-sm font-bold tracking-tighter text-white">KADIAN<span className="text-sky-500">.</span></span>
        </a>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 p-1 bg-zinc-900/60 backdrop-blur-2xl border border-zinc-800/50 rounded-full shadow-2xl">
          {links.map((link) => {
            const sectionId = link.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-5 py-2 text-xs font-semibold transition-all duration-500 rounded-full ${
                  isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute inset-0 bg-white/[0.03] rounded-full border border-white/5"
                    transition={{ type: "spring", duration: 0.8, bounce: 0.1 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
