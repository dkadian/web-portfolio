"use client";

import React from "react";
import Footer from "../components/Footer";

const SkillsPage = () => {
  const skills = {
    Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
    Backend: ["Node.js", "Express", "Python", "Java"],
    Database: ["MongoDB", "PostgreSQL", "MySQL"],
    Tools: ["Git", "Docker", "AWS", "VS Code"],
  };

  return (
<div className="min-h-screen bg-gradient-to-b from-indigo-900/50 via-[#0a0a1e] to-[#0a0a1e] text-white pt-16">
      {/* Skills Section */}
      <section className="min-h-screen flex items-center py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12 text-center">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, skillList], index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-xl font-semibold text-purple-400 mb-6">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {skillList.map((skill, i) => (
                    <li
                      key={i}
                      className="text-gray-300 flex items-center gap-2"
                    >
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SkillsPage;

