"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import SocialLinks from "./SocialLinks";
import profileImage from "../Pictures and Certificates/profileImage.jpg";

const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Projects", href: "/projects" },
    { name: "Skills", href: "/skills" },
    { name: "Education", href: "/education" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/home" && (pathname === "/" || pathname === "/home")) {
      return true;
    }
    return pathname === href;
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#0a0a1e]/90 backdrop-blur-sm z-50 border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 text-xl font-bold text-white group">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 group-hover:border-purple-500/50 transition-all duration-300">
              <Image
                src={profileImage}
                alt="Profile"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="gradient-text">D.K.</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-sm font-medium uppercase tracking-wide transition-all duration-300 ${
                  isActive(item.href)
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span className={`relative z-10 ${isActive(item.href) ? 'gradient-text' : ''}`}>
                  {item.name}
                </span>
                {/* Animated underline */}
                <span 
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transform origin-left transition-transform duration-300 ${
                    isActive(item.href) ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
                <span 
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 hover:opacity-100 transform origin-left transition-all duration-300 ${
                    isActive(item.href) ? 'scale-x-0' : 'scale-x-100'
                  }`}
                />
              </Link>
            ))}
          </div>
          <div className="hidden md:block">
            <SocialLinks />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;

