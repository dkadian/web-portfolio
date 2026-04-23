"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "./components/Footer";
import ProfileImage from "./components/ProfileImage";
import { motion } from "framer-motion";

const HomePage = () => {
  const [roleText, setRoleText] = useState("");
  
  useEffect(() => {
    const roles = [
      "B.Tech CS Student",
      "Data Analyst",
      "ML Engineer",
      "Python Developer",
      "Tech Enthusiast",
    ];
    let currentRoleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const typeRole = () => {
      const currentRole = roles[currentRoleIndex];
      
      if (!isDeleting) {
        if (charIndex < currentRole.length) {
          setRoleText(currentRole.substring(0, charIndex + 1));
          charIndex++;
          timeoutId = setTimeout(typeRole, 80);
        } else {
          isDeleting = true;
          timeoutId = setTimeout(typeRole, 2000);
        }
      } else {
        if (charIndex > 0) {
          charIndex--;
          setRoleText(currentRole.substring(0, charIndex));
          timeoutId = setTimeout(typeRole, 40);
        } else {
          isDeleting = false;
          currentRoleIndex = (currentRoleIndex + 1) % roles.length;
          timeoutId = setTimeout(typeRole, 500);
        }
      }
    };

    timeoutId = setTimeout(typeRole, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-12 bg-grid">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Intro & Visual */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="relative mb-8 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-syntax-keyword via-syntax-function to-syntax-number rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <ProfileImage size={256} />
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-mono">
              <span className="text-syntax-keyword">class</span> <span className="text-syntax-function">Deepak</span> <span className="text-foreground">{"{"}</span>
            </h1>
            <p className="text-lg text-muted mb-8 max-w-md font-mono leading-relaxed">
              <span className="text-syntax-keyword">private</span> <span className="text-syntax-number">passion</span> = <span className="text-syntax-string">&quot;Building innovative tech solutions&quot;</span>;
              <br />
              <span className="text-syntax-keyword">public</span> <span className="text-syntax-number">goal</span> = <span className="text-syntax-string">&quot;Shaping the world through software&quot;</span>;
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/projects"
                  className="inline-block px-6 py-2.5 bg-accent hover:opacity-90 text-white rounded font-mono text-sm transition-all shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)]"
                >
                  ./view_projects.sh
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contact"
                  className="inline-block px-6 py-2.5 border border-border hover:bg-card text-foreground rounded font-mono text-sm transition-all"
                >
                  contact.send()
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Right Side: IDE / Terminal Window */}
          <div className="lg:col-span-7">
            <div className="terminal-window animate-terminal">
              <div className="terminal-header">
                <div className="flex gap-1.5">
                  <div className="terminal-dot bg-[#ff5f56]"></div>
                  <div className="terminal-dot bg-[#ffbd2e]"></div>
                  <div className="terminal-dot bg-[#27c93f]"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-xs text-muted font-mono italic">~/portfolio/about.py — 64x24</span>
                </div>
              </div>
              <div className="terminal-body text-sm sm:text-base leading-relaxed overflow-x-auto">
                <div className="flex gap-4">
                  <span className="text-muted select-none">1</span>
                  <p><span className="code-keyword">import</span> deepak_kadian <span className="code-keyword">as</span> me</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted select-none">2</span>
                  <p><span className="code-keyword">from</span> skills <span className="code-keyword">import</span> *</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted select-none">3</span>
                  <p>&nbsp;</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted select-none">4</span>
                  <p><span className="code-keyword">def</span> <span className="code-function">init_profile</span>():</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted select-none">5</span>
                  <p className="pl-4"><span className="code-variable">me</span>.name = <span className="code-string">&quot;Deepak&quot;</span></p>
                </div>
                <div className="flex gap-4 h-6 sm:h-7">
                  <span className="text-muted select-none">6</span>
                  <p className="pl-4">
                    <span className="code-variable">me</span>.role = <span className="code-string">&quot;{roleText}&quot;</span>
                    <span className="cursor-blink inline-block w-2 h-5 bg-syntax-number ml-1 align-middle"></span>
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted select-none">7</span>
                  <p className="pl-4"><span className="code-variable">me</span>.location = <span className="code-string">&quot;Earth, Solar System&quot;</span></p>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted select-none">8</span>
                  <p className="pl-4"><span className="code-variable">me</span>.status = <span className="code-string">&quot;Always Learning&quot;</span></p>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted select-none">9</span>
                  <p>&nbsp;</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted select-none">10</span>
                  <p><span className="code-keyword">if</span> __name__ == <span className="code-string">&quot;__main__&quot;</span>:</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted select-none">11</span>
                  <p className="pl-4"><span className="code-function">init_profile</span>()</p>
                </div>
                <div className="flex gap-4">
                  <span className="text-muted select-none">12</span>
                  <p className="pl-4"><span className="code-function">print</span>(<span className="code-string">&quot;Hello, World!&quot;</span>)</p>
                </div>
              </div>
            </div>
            
            {/* Tech Stack Pills */}
            <div className="mt-8 flex flex-wrap gap-2 justify-center lg:justify-start">
              {["Python", "React", "TypeScript", "Machine Learning", "Data Analysis"].map((skill) => (
                <span key={skill} className="px-3 py-1 bg-card border border-border rounded-full text-xs font-mono text-muted">
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
