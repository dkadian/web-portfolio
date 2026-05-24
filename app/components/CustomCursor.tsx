"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Main dot position
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  
  // Ring position with more delay (damping/stiffness)
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  const dotSpringConfig = { damping: 25, stiffness: 700 };
  const ringSpringConfig = { damping: 30, stiffness: 200 }; // Softer for trailing effect

  const dotXSpring = useSpring(dotX, dotSpringConfig);
  const dotYSpring = useSpring(dotY, dotSpringConfig);
  const ringXSpring = useSpring(ringX, ringSpringConfig);
  const ringYSpring = useSpring(ringY, ringSpringConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') || 
        target.closest('button');
      
      setIsHovered(!!isClickable);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [dotX, dotY, ringX, ringY]);

  return (
    <>
      {/* Background Ambient Glow */}
      <motion.div
        className="fixed top-0 left-0 w-[400px] h-[400px] bg-white/[0.03] rounded-full pointer-events-none z-[9997] blur-[120px]"
        style={{
          translateX: ringXSpring,
          translateY: ringYSpring,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.1 : 1,
          opacity: isHovered ? 0.8 : 0.4,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 40 } as const}
      />
      
      {/* Main Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[9999]"
        style={{
          translateX: dotXSpring,
          translateY: dotYSpring,
          x: "-50%",
          y: "-50%",
        }}
      />
      
      {/* Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 border border-white/5 rounded-full pointer-events-none z-[9998]"
        style={{
          translateX: ringXSpring,
          translateY: ringYSpring,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          borderColor: isHovered ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.05)",
          backgroundColor: isHovered ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0)",
        }}
        transition={{ type: "spring", stiffness: 150, damping: 35 } as const}
      />
    </>
  );
};

export default CustomCursor;
