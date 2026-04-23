"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-10 h-10" />;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative w-14 h-7 rounded-full bg-border/20 border border-border flex items-center p-1 transition-all duration-500 overflow-hidden"
      aria-label="Toggle Theme"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#79c0ff]/20 to-[#d2a8ff]/20"
        animate={{ opacity: isDark ? 1 : 0 }}
      />
      
      <motion.div
        className="z-10 w-5 h-5 rounded-full flex items-center justify-center bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
        animate={{ x: isDark ? 28 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <span className="text-[10px] select-none">
          {isDark ? "🌙" : "☀️"}
        </span>
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-between px-2 font-mono text-[8px] pointer-events-none opacity-60">
        <span className={!isDark ? "text-accent font-bold" : "text-muted"}>light</span>
        <span className={isDark ? "text-accent font-bold" : "text-muted"}>dark</span>
      </div>
    </button>
  );
};

export default ThemeToggle;
