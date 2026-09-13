"use client";

import { Hero } from "./components/sections/Hero";
import { GitHubHub } from "./components/sections/GitHubHub";
import { Experience } from "./components/sections/Experience";
import { Projects } from "./components/sections/Projects";
import { Skills } from "./components/sections/Skills";
import { Certifications } from "./components/sections/Certifications";
import { Education } from "./components/sections/Education";
import { CV } from "./components/sections/CV";
import { Contact } from "./components/sections/Contact";

export default function HomePage() {
  return (
    <div className="space-y-0 selection:bg-sky-500/30">
      <Hero />
      <GitHubHub />
      <Experience />
      <Projects />
      <Skills />
      <Certifications />
      <Education />
      <CV />
      <Contact />
    </div>
  );
}
