"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Footer from "./components/Footer";
import profileImage from "./Pictures and Certificates/profileImage.jpg";

const HomePage = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "Hello, I'm Deepak";
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseTime = 2000;

  // Second typing effect for roles
  const [roleText, setRoleText] = useState("");
  const roles = [
    "B.Tech Computer Science Student",
    "Data Analyst",
    "Machine Learning Engineer",
    "Python Developer",
    "Tech Enthusiast",
  ];
  const roleTypingSpeed = 80;
  const roleDeletingSpeed = 40;
  const rolePauseTime = 2500;

  useEffect(() => {
    let currentIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      if (!isDeleting) {
        if (currentIndex < fullText.length) {
          setTypedText(fullText.substring(0, currentIndex + 1));
          currentIndex++;
          timeoutId = setTimeout(type, typingSpeed);
        } else {
          isDeleting = true;
          timeoutId = setTimeout(type, pauseTime);
        }
      } else {
        if (currentIndex > 0) {
          currentIndex--;
          setTypedText(fullText.substring(0, currentIndex));
          timeoutId = setTimeout(type, deletingSpeed);
        } else {
          isDeleting = false;
          timeoutId = setTimeout(type, typingSpeed);
        }
      }
    };

    timeoutId = setTimeout(type, typingSpeed);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
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
          timeoutId = setTimeout(typeRole, roleTypingSpeed);
        } else {
          isDeleting = true;
          timeoutId = setTimeout(typeRole, rolePauseTime);
        }
      } else {
        if (charIndex > 0) {
          charIndex--;
          setRoleText(currentRole.substring(0, charIndex));
          timeoutId = setTimeout(typeRole, roleDeletingSpeed);
        } else {
          isDeleting = false;
          currentRoleIndex = (currentRoleIndex + 1) % roles.length;
          timeoutId = setTimeout(typeRole, roleTypingSpeed);
        }
      }
    };

    timeoutId = setTimeout(typeRole, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900/50 via-[#0a0a1e] to-[#0a0a1e] text-white pt-16">

      {/* Home Section */}
      <section className="min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Profile Photo with floating animation */}
            <div className="flex-shrink-0 animate-float">
              <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl hover:border-purple-500/50 transition-all duration-500">
                <div className="relative w-48 h-48 lg:w-60 lg:h-60 rounded-full overflow-hidden shadow-lg animate-scaleIn">
                  <Image
                    src={profileImage}
                    alt="Deepak - Profile Photo"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Name & About with staggered animations */}
            <div className="flex-1 text-center lg:text-left">
              <h1 
                className="text-5xl lg:text-7xl font-bold mb-6 animate-slideInLeft"
                style={{ minHeight: "1.2em" }}
              >
                <span className="gradient-text">{typedText}</span>
                <span className="cursor-blink inline-block w-1 h-10 bg-purple-500 ml-1 align-middle"></span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-400 mb-8 max-w-2xl animate-fadeIn stagger-2">
                I am a <span className="text-purple-400 font-semibold">{roleText}</span>
                <span className="cursor-blink inline-block w-1 h-6 bg-purple-500 ml-1 align-middle"></span>
                <br /><br />
                With a strong passion for technology and innovation, I am driven by how software and emerging technologies shape the world.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fadeIn stagger-3">
                <Link
                  href="/projects"
                  className="px-8 py-3 bg-white text-[#0a0a1e] font-semibold rounded-lg hover:bg-gray-200 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  View Projects
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-3 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-purple-500/50 hover:scale-105 transition-all duration-300"
                >
                  Contact Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;

