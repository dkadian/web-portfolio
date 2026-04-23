"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileImage from "./ProfileImage";
import ThemeToggle from "./ThemeToggle";

const Navigation = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: "Home", href: "/", code: "<Home />" },
    { name: "Projects", href: "/projects", code: "./projects" },
    { name: "Skills", href: "/skills", code: "skills.json" },
    { name: "Education", href: "/education", code: "education.edu" },
    { name: "CV", href: "/cv", code: "resume.pdf" },
    { name: "Contact", href: "/contact", code: "contact.send()" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-mono ${
        isScrolled 
          ? "bg-background/90 backdrop-blur-md py-2 border-b border-border" 
          : "bg-transparent py-4"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 text-lg font-bold group">
            <ProfileImage size={40} className="!rounded" />
            <span className="text-foreground hover:text-accent transition-colors">
              <span className="text-syntax-keyword">const</span> deepak = <span className="text-syntax-string">()</span> =&gt;
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm px-3 py-1.5 rounded transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-card text-accent border border-border"
                      : "text-muted hover:text-foreground hover:bg-card/50"
                  }`}
                >
                  {item.code}
                </Link>
              ))}
            </div>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button & Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-muted hover:text-foreground"
            >
              {isMobileMenuOpen ? "close()" : "menu()"}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute left-0 right-0 bg-background border-b border-border transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible top-full' : 'opacity-0 invisible -top-4'
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded text-sm ${
                isActive(item.href)
                  ? "bg-card text-accent"
                  : "text-muted hover:bg-card/50"
              }`}
            >
              {item.code}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
