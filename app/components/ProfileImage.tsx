"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProfileImageProps {
  size: number;
  className?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ size, className = "" }) => {
  // Path to your image in public folder
  const imagePath = "/profile.jpeg";

  // FOCUSING ON UPPER BODY:
  // object-top: starts the crop from the top.
  // scale-125: zooms in so the lower body is pushed out of frame.
  const objectPosition = "object-top"; 

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 30 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: [0, -8, 0], 
      }}
      transition={{ 
        opacity: { duration: 1, ease: "easeOut" },
        scale: { type: "spring", stiffness: 100, damping: 12 },
        y: { 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }
      }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 25px 50px rgba(121, 192, 255, 0.2)",
      }}
      className={`relative overflow-hidden rounded-[2rem] border-2 border-border bg-background group ${className}`}
      style={{ 
        width: size, 
        height: size, // Perfect square for a modern, professional look
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-syntax-number/10 to-transparent z-10 pointer-events-none" />
      
      <Image
        src={imagePath}
        alt="Deepak"
        fill
        className={`object-cover ${objectPosition} scale-[1.35] transition-transform duration-1000 group-hover:scale-[1.40]`}
        sizes={`${size}px`}
        priority
      />

      {/* Modern cyber frame accents */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-accent/60 rounded-tl-lg z-30" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-syntax-keyword/60 rounded-br-lg z-30" />
      
      {/* Animated scanline */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent h-2 w-full animate-scanline z-20 pointer-events-none" />
    </motion.div>
  );
};

export default ProfileImage;
