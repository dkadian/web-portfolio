"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";

// --- Components ---

const Magnetic = ({ children, strength = 0.5 }: { children: React.ReactElement; strength?: number }) => {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none) and (pointer: coarse)").matches);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.1 });
  const y = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.1 });

  function handleMouseMove(e: React.MouseEvent) {
    if (isTouch) return;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    mouseX.set((clientX - centerX) * strength);
    mouseY.set((clientY - centerY) * strength);
  }

  function handleMouseLeave() {
    if (isTouch) return;
    mouseX.set(0);
    mouseY.set(0);
  }

  if (isTouch) return children;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y, willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
};

const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionTemplate`${y}deg`, { stiffness: 60, damping: 20 });
  const rotateY = useSpring(useMotionTemplate`${x}deg`, { stiffness: 60, damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set(((clientX - centerX) / (width / 2)) * 8);
    y.set(((clientY - centerY) / (height / 2)) * -8);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", willChange: "transform" }}
      className={className}
    >
      <div style={{ transform: "translateZ(30px)", backfaceVisibility: "hidden" }}>
        {children}
      </div>
    </motion.div>
  );
};

const SectionHeader = ({ title, description }: { title: string; description: string }) => {
  const words = title.split(" ");
  
  return (
    <motion.header 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-4 mb-16 md:mb-24 max-w-2xl"
    >
      <motion.h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase leading-none">
        {words.map((word, i) => (
          <span key={i} className="inline-block mr-2 md:mr-3">
            {word}
          </span>
        ))}
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="text-zinc-500 text-sm md:text-lg font-light leading-relaxed"
      >
        {description}
      </motion.p>
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        style={{ originX: 0 }}
        transition={{ duration: 1.2, delay: 1 }}
        className="h-[1px] bg-zinc-800 mt-6 md:mt-8 w-16 md:w-24" 
      />
    </motion.header>
  );
};

const Reveal = ({ children, delay = 0, y = 20, className = "" }: { children: React.ReactNode; delay?: number; y?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-20px" }}
    transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const KNOWN_LOGOS = [
  "html", "css", "javascript", "react", "python", "mongodb", "mysql", "sql",
  "pandas", "numpy", "scikitlearn", "matplotlib", "opencv", "tensorflow",
  "langchain", "chromadb", "embeddings", "git", "jupyternotebook", "powerbi", "n8n",
  "neuralnetworks", "cnnrnn", "lstmgru", "faissdb"
];

const SkillItem = ({ skill, index }: { skill: { name: string; level: number }; index: number }) => {
  const slug = skill.name.toLowerCase().replace(/[.\/\s\-&]/g, "");
  let logoName = slug;
  if (slug === "htmlcss") logoName = "html";
  if (slug === "reactjs") logoName = "react";
  
  const logoPath = `/tech-logos/${logoName}.svg`;
  const hasLogo = KNOWN_LOGOS.includes(logoName);

  // Logos that need inversion/brightness for dark mode
  const invertLogos = ["n8n", "express", "nextjs", "langchain", "matplotlib", "mysql", "neuralnetworks", "cnnrnn", "lstmgru", "faissdb"];
  const brightenLogos = ["pandas", "sql"];
  
  const filterClass = invertLogos.includes(logoName) 
    ? "invert brightness-[2]" 
    : brightenLogos.includes(logoName) 
    ? "brightness-[3] contrast-[1.2]" 
    : "";

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group space-y-2 md:space-y-3"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 md:gap-3">
          {hasLogo ? (
            <div className={`w-4 h-4 md:w-5 md:h-5 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100 ${filterClass}`}>
              <Image 
                src={logoPath} 
                alt={`${skill.name} logo`} 
                fill 
                sizes="20px"
                className="object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.opacity = "0";
                }}
              />
            </div>
          ) : (
            <div className="w-4 h-4 md:w-5 md:h-5 flex items-center justify-center opacity-45 group-hover:opacity-100 group-hover:text-sky-400 transition-all duration-500">
              <span className="text-[10px] md:text-xs">✦</span>
            </div>
          )}
          <span className="text-[10px] md:text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">{skill.name}</span>
        </div>
        <span className="text-[8px] md:text-[10px] font-mono text-zinc-500">{skill.level}%</span>
      </div>
      <div className="h-0.5 md:h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut", delay: (index * 0.1) + 0.2 }}
          className="h-full bg-sky-500/50 group-hover:bg-sky-400 transition-colors"
        />
      </div>
    </motion.div>
  );
};

// --- Data ---

const projects = [
  {
    title: "Lok Drishti : Sovereign Political Intelligence",
    description: "Built a React 19 interface with interactive SVG election mapping and a constitutional quiz engine. Created a JWT-secured admin console with a database staging pipeline to safely propose and review system updates. Integrated ChromaDB and embeddings to enable semantic search queries over national legislative directories.",
    tech : ["React 19", "SVG Mapping", "JWT Security", "ChromaDB", "Embeddings", "Semantic Search", "SQL/Staging"],
    link : "https://github.com/dkadian/lok-drishti",
    stats : "June 2026",
    images: [
      "/project-images/lok-drishti/1.png",
      "/project-images/lok-drishti/2.png",
      "/project-images/lok-drishti/3.png",
      "/project-images/lok-drishti/4.png",
      "/project-images/lok-drishti/5.png",
      "/project-images/lok-drishti/6.png"
    ]
  },
  {
    title: "PathFinder : GenAI Career Guidance Assistant",
    description: "A career counseling platform with a React frontend and FastAPI backend, utilizing aiosqlite for database operations to persist user profiles, sessions, and chat histories. Built a document-processing pipeline using pdfplumber, PyMuPDF, and Tesseract OCR to extract resume text, LLM extraction to automatically populate user profiles. Integrated cloud and local models—specifically Llama-3.1, LM Studio, and a local T5-Large model implementing real-time response streaming and strict content guardrails.",
    tech: ["React", "FastAPI", "Llama 3.1", "LM Studio", "T5-Large", "aiosqlite", "pdfplumber", "PyMuPDF", "Tesseract OCR"],
    link: "https://github.com/dkadian/career-assistant",
    stats: "May 2026",
    images: [
      "/project-images/pathfinder/1.png",
      "/project-images/pathfinder/2.png",
      "/project-images/pathfinder/3.png"
    ]
  },
  {
    title: "Hand Gesture Recognition",
    description: "Trained CNN model for gesture recognition with image augmentation to reduce overfitting. Optimized hyperparameters to achieve high accuracy for sign language applications. Experimented with the hyperparameters to improve the accuracy and model performance.",
    tech: ["Python", "Deep Learning", "TensorFlow", "OpenCV", "CNN"],
    link: "https://github.com/dkadian/Hand_gesture_recog.",
    stats: "January 2026",
    isModelOnly: true
  },
  {
    title: "Portfolio Website",
    description: "Built a modern React/TypeScript site with Tailwind CSS and App Router architecture. Implemented interactive transitions and clean layouts to showcase projects, skills, education, and contact channels.",
    tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion"],
    link: "https://github.com/dkadian/web-portfolio",
    stats: "November 2025",
    images: [
      "/project-images/web-portfolio/1.png",
      "/project-images/web-portfolio/2.png",
      "/project-images/web-portfolio/3.png"
    ]
  },
  {
    title: "SVM Based Dog and Cat Recognition",
    description: "Built an SVM image classifier for cat/dog distinction using Kaggle datasets. Developed an end-to-end Python pipeline including preprocessing and feature scaling. Designed end-to-end machine learning pipeline for image classification.",
    tech: ["Python", "SVM", "Scikit-Learn", "OpenCV", "Image Processing"],
    link: "https://github.com/dkadian/Dogs_cats_recog",
    stats: "June 2025",
    images: [
      "/project-images/dogs-cats/1.png",
      "/project-images/dogs-cats/2.png",
      "/project-images/dogs-cats/3.png"
    ]
  }
];

const skillsData = [
  { 
    category: "Web Development", 
    skills: [
      { name: "React.js", level: 85 }, 
      { name: "JavaScript", level: 85 },
      { name: "HTML/CSS", level: 90 }
    ] 
  },
  { 
    category: "Backend & Database", 
    skills: [
      { name: "Python", level: 90 },
      { name: "MongoDB", level: 75 },
      { name: "MySQL", level: 75 }
    ] 
  },
  { 
    category: "Data Science", 
    skills: [
      { name: "Pandas", level: 85 }, 
      { name: "NumPy", level: 85 }, 
      { name: "Scikit-learn", level: 80 },
      { name: "Matplotlib", level: 80 },
      { name: "OpenCV", level: 75 }
    ] 
  },
  { 
    category: "Deep Learning", 
    skills: [
      { name: "TensorFlow", level: 75 }, 
      { name: "Neural Networks", level: 80 },
      { name: "CNN & RNN", level: 80 },
      { name: "LSTM & GRU", level: 75 }
    ] 
  },
  { 
    category: "GenAI", 
    skills: [
      { name: "LangChain", level: 80 }, 
      { name: "ChromaDB", level: 80 }, 
      { name: "Embeddings", level: 80 },
      { name: "FAISSdb", level: 75 }
    ] 
  },
  { 
    category: "Tools", 
    skills: [
      { name: "Git", level: 85 }, 
      { name: "Jupyter Notebook", level: 80 },
      { name: "Power BI", level: 75 },
      { name: "n8n", level: 70 }
    ] 
  }
];
const completedSGPAs = [
  { semester: "Semester 01", sgpa: 8.286 },
  { semester: "Semester 02", sgpa: 7.500 },
  { semester: "Semester 03", sgpa: 8.900 },
  { semester: "Semester 04", sgpa: 8.526 },
  { semester: "Semester 05", sgpa: 8.391 },
  { semester: "Semester 06", sgpa: 7.957 },
  { semester: "Semester 07", sgpa: null },
  { semester: "Semester 08", sgpa: null }
];

const validSGPAs = completedSGPAs.filter(s => typeof s.sgpa === 'number' && s.sgpa !== null);
const cgpa = (validSGPAs.reduce((acc, curr) => acc + (curr.sgpa as number), 0) / validSGPAs.length).toFixed(2);

// --- Sections ---

const Hero = () => {
  const [roleText, setRoleText] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const roles = ["B.Tech CS (AIML) Student", "AI/ML Developer", "Data Analyst", "Python Developer", "Tech Enthusiast"];
    let currentRoleIndex = 0; let charIndex = 0; let isDeleting = false; let timeoutId: NodeJS.Timeout;
    const typeRole = () => {
      const currentRole = roles[currentRoleIndex];
      if (!isDeleting) {
        if (charIndex < currentRole.length) { setRoleText(currentRole.substring(0, charIndex + 1)); charIndex++; timeoutId = setTimeout(typeRole, 100); }
        else { isDeleting = true; timeoutId = setTimeout(typeRole, 2500); }
      } else {
        if (charIndex > 0) { charIndex--; setRoleText(currentRole.substring(0, charIndex)); timeoutId = setTimeout(typeRole, 50); }
        else { isDeleting = false; currentRoleIndex = (currentRoleIndex + 1) % roles.length; timeoutId = setTimeout(typeRole, 800); }
      }
    };
    timeoutId = setTimeout(typeRole, 500); return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section id="home" className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center py-20 md:py-32 text-center">
      {/* Theme Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-sky-500/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none -z-10" />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 space-y-12 md:space-y-20">
        <Reveal delay={0.2} y={10}>
          <div className="flex items-center justify-center gap-4 text-zinc-500 font-medium text-[10px] md:text-sm tracking-tight">
            <span className="w-4 md:w-8 h-[1px] bg-zinc-800" />
            BASED IN GURUGRAM, IN // 2026
            <span className="w-4 md:w-8 h-[1px] bg-zinc-800" />
          </div>
        </Reveal>

        <div className="flex flex-col items-center gap-8 md:gap-12">
          <Reveal delay={0.4}>
            <TiltCard>
              <div className="relative w-48 h-48 md:w-72 md:h-72 group perspective-1000">
                <motion.div 
                  className="relative w-full h-full"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front Side: Unknown.jpg */}
                  <motion.div 
                    className="absolute inset-0" 
                    style={{ backfaceVisibility: "hidden" }}
                    animate={{ opacity: isFlipped ? 0 : 1 }}
                    transition={{ duration: 0.4, delay: isFlipped ? 0 : 0.2 }}
                  >
                    <div className="relative w-full h-full grayscale transition-all duration-1000 ease-out overflow-hidden border border-zinc-800 rounded-2xl shadow-2xl bg-zinc-900/50 p-2">
                      <div className="relative w-full h-full overflow-hidden rounded-xl">
                        <Image 
                          src="/Unknown.jpg" 
                          alt="Unknown Identity" 
                          fill 
                          sizes="(max-width: 768px) 224px, 288px"
                          className="object-cover scale-110" 
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Back Side: profile.jpeg */}
                  <motion.div 
                    className="absolute inset-0" 
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                    animate={{ opacity: isFlipped ? 1 : 0 }}
                    transition={{ duration: 0.4, delay: isFlipped ? 0.2 : 0 }}
                  >
                    <div className="relative w-full h-full transition-all duration-1000 ease-out overflow-hidden border border-zinc-800 rounded-2xl shadow-2xl bg-zinc-900/50 p-2">
                      <div className="relative w-full h-full overflow-hidden rounded-xl">
                        <Image 
                          src="/profile.jpeg" 
                          alt="Deepak Kadian" 
                          fill 
                          sizes="(max-width: 768px) 224px, 288px"
                          className="object-cover" 
                        />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Reveal Toggle Button - Extremely Minimal */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-30 pointer-events-none">
                  <button 
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="pointer-events-auto px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold text-white uppercase tracking-[0.2em] hover:bg-sky-500 hover:border-sky-400 transition-all active:scale-95 shadow-2xl"
                  >
                    {isFlipped ? "Secure_Identity" : "Reveal_Identity"}
                  </button>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={0.6}>
              <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter uppercase leading-[0.85]">
                Deepak <br /> <span className="text-sky-500">Kadian</span>
              </h1>
            </Reveal>
            <Reveal delay={0.8}>
              <div className="flex flex-col items-center gap-4">
                <div className="h-8 flex items-center justify-center">
                  <span className="text-zinc-500 font-mono text-lg uppercase tracking-widest">{roleText}</span>
                  <span className="w-[2px] h-6 bg-sky-500 ml-2 animate-pulse" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={1.2}>
          <div className="flex justify-center">
            <Magnetic>
              <a href="#projects" className="group flex flex-col items-center gap-4 cursor-pointer">
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.4em] group-hover:text-sky-500 transition-colors">Scroll_To_Explore</span>
                <div className="w-[1px] h-20 bg-gradient-to-b from-sky-500 to-transparent relative overflow-hidden">
                  <motion.div animate={{ y: [0, 80] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 left-0 w-full h-1/2 bg-white" />
                </div>
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
};

const ImageSlider = ({ images, title, isFlipped }: { images: string[]; title: string; isFlipped: boolean }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!isFlipped) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length, isFlipped]);

  const paginate = (newDirection: number) => {
    setIndex((prev) => (prev + newDirection + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-full group/slider overflow-hidden rounded-xl md:rounded-2xl border border-white/10 bg-zinc-900/50">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 p-2 md:p-4"
        >
          <div className="relative w-full h-full overflow-hidden rounded-lg">
            <Image 
              src={images[index]} 
              alt={`${title} view ${index + 1}`} 
              fill 
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-contain"
              priority={index === 0}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Controls */}
      <div className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 md:gap-4 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-500 z-20">
        <button 
          onClick={(e) => { e.stopPropagation(); paginate(-1); }}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-sky-500 transition-colors text-sm md:text-base"
        >
          ↑
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); paginate(1); }}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-sky-500 transition-colors text-sm md:text-base"
        >
          ↓
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2 z-20">
        {images.map((_, i) => (
          <div 
            key={i} 
            className={`w-1 md:w-1.5 h-1 md:h-1.5 rounded-full transition-all duration-500 ${i === index ? "bg-sky-500 w-3 md:w-4" : "bg-white/20"}`} 
          />
        ))}
      </div>
    </div>
  );
};

interface Project {
  title: string;
  description: string;
  tech: string[];
  link: string;
  stats: string;
  images?: string[];
  isModelOnly?: boolean;
  backTitle?: string;
  backDescription?: string;
  backIcon?: string;
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".source-link")) return;
    setIsFlipped(!isFlipped);
  };

  return (
    <Reveal delay={index * 0.1}>
      <div className="p-4 cursor-pointer" onClick={handleClick}>
        <div className="relative h-[550px] md:h-[600px] w-full perspective-1000">
          <motion.div
            className="relative w-full h-full"
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front Side */}
            <motion.div 
              className="absolute inset-0 w-full h-full" 
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
              animate={{ opacity: isFlipped ? 0 : 1 }}
              transition={{ duration: 0.4, delay: isFlipped ? 0 : 0.2 }}
            >
              <div className="glass-card group h-full shadow-2xl relative overflow-hidden bg-zinc-950">
                <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-16">
                  <div className="space-y-4 md:space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-3 md:gap-8">
                      <div className="space-y-1 md:space-y-4">
                        <span className="text-[10px] font-bold text-sky-500/50 uppercase tracking-[0.2em]">Project_0{index + 1}</span>
                        <h3 className="text-xl md:text-4xl lg:text-5xl font-bold text-white group-hover:text-sky-400 transition-colors duration-500 uppercase tracking-tighter leading-[1.1] break-words">
                          {project.title.replace(/_/g, " ")}
                        </h3>
                      </div>
                      <span className="glass-pill px-3 py-1 md:px-4 md:py-2 text-[8px] md:text-[10px]">{project.stats}</span>
                    </div>
                    <p className="text-zinc-400 text-xs md:text-xl font-light leading-relaxed tracking-tight max-w-3xl group-hover:text-zinc-300 transition-colors line-clamp-4 md:line-clamp-none">{project.description}</p>
                  </div>
                  <div className="space-y-6 md:space-y-12 pt-4 md:pt-16 mt-auto">
                    <div className="flex flex-wrap gap-1.5 md:gap-3">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[8px] md:text-[11px] font-bold text-zinc-600 uppercase tracking-widest border border-white/5 px-2 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl bg-white/[0.02]">{t}</span>
                      ))}
                    </div>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="source-link group/link inline-flex items-center gap-3 md:gap-4 text-[10px] md:text-xs font-bold text-white hover:text-sky-400 transition-all uppercase tracking-[0.3em]">
                      Access_Source_Code
                      <span className="text-xl md:text-2xl group-hover/link:translate-x-2 transition-transform">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Back Side */}
            <motion.div 
              className="absolute inset-0 w-full h-full" 
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              animate={{ opacity: isFlipped ? 1 : 0 }}
              transition={{ duration: 0.4, delay: isFlipped ? 0.2 : 0 }}
            >
              <div className="glass-card h-full shadow-2xl relative overflow-hidden bg-zinc-950">
                <div className="relative z-10 h-full flex flex-col p-4 md:p-8">
                  <div className="flex justify-between items-center mb-4 md:mb-8">
                    <h3 className="text-sm md:text-xl font-bold text-white uppercase tracking-tighter">Project Visuals</h3>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                      className="text-zinc-500 hover:text-white transition-colors p-2"
                    >
                      Close ×
                    </button>
                  </div>
                  
                  <div className="flex-1 min-h-0">
                    {project.images && project.images.length > 0 ? (
                      <ImageSlider images={project.images} title={project.title} isFlipped={isFlipped} />
                    ) : project.backTitle ? (
                      <div className="h-full flex flex-col items-center justify-center text-center space-y-8 p-4">
                        <div className="w-20 h-20 rounded-full bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                          <span className="text-4xl">{project.backIcon || "⚙️"}</span>
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-2xl font-bold text-white uppercase tracking-tight">{project.backTitle}</h4>
                          <p className="text-zinc-500 max-w-sm mx-auto">{project.backDescription}</p>
                        </div>
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="source-link px-8 py-4 bg-white text-black rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-sky-400 hover:text-white transition-all"
                        >
                          Access Repository
                        </a>
                      </div>
                    ) : project.isModelOnly ? (
                      <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                        <div className="w-20 h-20 rounded-full bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                          <span className="text-4xl">🤖</span>
                        </div>
                        <div className="space-y-4">
                          <h4 className="text-2xl font-bold text-white uppercase tracking-tight">Model Analysis Only</h4>
                          <p className="text-zinc-500 max-w-xs mx-auto">This project focuses on the core machine learning model and architectural implementation rather than a visual frontend.</p>
                        </div>
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="source-link px-8 py-4 bg-white text-black rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-sky-400 hover:text-white transition-all"
                        >
                          View Model Source
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Reveal>
  );
};

const Projects = () => (
  <section id="projects" className="py-48 scroll-mt-20 overflow-visible">
    <SectionHeader title="Selected Work" description="A curated selection of technical implementations and software architecture." />
    
    <Reveal delay={0.6} y={10} className="-mt-12 mb-16">
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-sky-500/5 border border-sky-500/10 text-[10px] font-bold text-sky-500 tracking-[0.2em] uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
        Interactive: Click any card to reveal project visuals
      </div>
    </Reveal>

    <div className="space-y-16">
      {projects.map((project, index) => (
        <ProjectCard key={project.title} project={project} index={index} />
      ))}
    </div>
  </section>
);

interface GitHubContributionDay {
  contributionCount: number;
  date: string;
}

interface GitHubContributionWeek {
  contributionDays: GitHubContributionDay[];
}

interface GitHubContributionCalendar {
  weeks: GitHubContributionWeek[];
  totalContributions: number;
}

const GitHubHub = () => {
  const [calendar, setCalendar] = useState<GitHubContributionCalendar | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const response = await fetch("/api/github");
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setCalendar(data);
        }
      } catch (err) {
        setError("Network connection error");
        console.error("Error fetching GitHub data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGitHubData();
  }, []);

  const stats = [
    { label: "Total Contributions", value: calendar?.totalContributions ?? (loading ? "..." : "0"), icon: "🔥" },
    { label: "Active Weeks", value: calendar?.weeks?.length ?? (loading ? "..." : "0"), icon: "🗓️" },
    { label: "System_User", value: "dkadian", icon: "👨‍💻" },
  ];

  return (
    <section id="activity" className="py-24 md:py-48 scroll-mt-20">
      <SectionHeader title="Contribution Graph" description="Real-time pulse of my technical development cycles and architectural consistency." />
      
      <div className="space-y-8 md:space-y-12">
        <Reveal>
          <TiltCard>
            <div className="glass-card p-6 md:p-14 space-y-8 md:space-y-12 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8 border-b border-white/5 pb-8 md:pb-10">
                <div className="space-y-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white tracking-tighter uppercase">Activity_Index</h3>
                  <p className="text-zinc-500 text-xs md:text-sm font-light">
                    {error ? <span className="text-red-400/80">ERROR: {error}</span> : "Direct synchronization with GitHub Technical Systems."}
                  </p>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${error ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-emerald-500/5 border-emerald-500/10 text-emerald-500"} text-[8px] md:text-[9px] font-bold tracking-widest uppercase w-fit`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${error ? "bg-red-500" : "bg-emerald-500 animate-pulse"}`} />
                  {error ? "Sync_Failed" : "Live_Sync_Enabled"}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 pb-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="space-y-1 md:space-y-2">
                    <div className="text-zinc-600 text-[8px] md:text-[10px] font-bold uppercase tracking-widest">{stat.label}</div>
                    <div className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                      <span className="text-base md:text-lg opacity-30">{stat.icon}</span>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Real GitHub Contribution Graph (Squares) */}
              <div className="space-y-6 pt-10 border-t border-white/5">
                <div className="flex justify-between items-center px-2">
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Commit_Matrix // Last_12_Months</div>
                  <div className="flex items-center gap-2 text-[9px] font-bold text-zinc-600 uppercase">
                    <span>Less</span>
                    <div className="flex gap-1">
                      {[0.2, 0.4, 0.6, 0.8, 1].map((op) => (
                        <div key={op} className="w-2.5 h-2.5 rounded-[2px] bg-sky-500" style={{ opacity: op }} />
                      ))}
                    </div>
                    <span>More</span>
                  </div>
                </div>

                <div className="overflow-x-auto pb-6 custom-scrollbar -mx-2 px-2">
                  <div className="inline-flex flex-col gap-3 min-w-max">
                    {loading ? (
                      <div className="h-32 w-[800px] bg-white/[0.02] animate-pulse rounded-2xl flex items-center justify-center text-[10px] font-bold text-zinc-700 tracking-[0.5em] uppercase">Initialising_Data_Link...</div>
                    ) : error ? (
                      <div className="h-32 w-full border border-dashed border-red-500/20 rounded-2xl flex items-center justify-center text-[10px] font-bold text-red-500/50 tracking-[0.5em] uppercase">Connection_Interrupted</div>
                    ) : (
                      <>
                        {/* Month Labels Row */}
                        <div className="flex gap-[3px] h-4">
                          {calendar?.weeks?.map((week: GitHubContributionWeek, i: number) => {
                            const firstDay = new Date(week.contributionDays[0].date);
                            // Month labels usually appear if it's the first week of the month
                            const isFirstWeekOfMonth = firstDay.getDate() <= 7;
                            return (
                              <div key={i} className="w-[12px] flex-shrink-0 relative">
                                {isFirstWeekOfMonth && (
                                  <span className="absolute left-0 top-0 text-[8px] font-bold text-zinc-600 uppercase whitespace-nowrap">
                                    {firstDay.toLocaleString('default', { month: 'short' })}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Squares Grid */}
                        <div className="flex gap-[3px]">
                          {calendar?.weeks?.map((week: GitHubContributionWeek, i: number) => (
                            <div key={i} className="flex flex-col gap-[3px] flex-shrink-0">
                              {week.contributionDays.map((day: GitHubContributionDay, j: number) => {
                                const count = day.contributionCount;
                                let color = "#18181b"; // Empty
                                
                                if (count > 0) {
                                  if (count <= 2) color = "#075985"; // Darkest blue (Few commits)
                                  else if (count <= 5) color = "#0284c7";
                                  else if (count <= 8) color = "#0ea5e9";
                                  else color = "#7dd3fc"; // Brightest blue (Most commits)
                                }

                                return (
                                  <div
                                    key={j}
                                    className="w-[12px] h-[12px] rounded-[2px] opacity-0 animate-matrix transition-colors duration-500 hover:ring-1 hover:ring-white/20"
                                    style={{ 
                                      backgroundColor: color,
                                      animationDelay: `${(i + j) * 0.005}s`
                                    }}
                                    title={`${count} commits on ${new Date(day.date).toLocaleDateString()}`}
                                  />
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 border border-white/5 p-10 md:p-12 rounded-[2.5rem] bg-zinc-900/20 shadow-xl">
            <div className="max-w-xl text-center md:text-left space-y-4">
              <h3 className="text-xl font-bold text-white uppercase tracking-tight">Open Source Documentation</h3>
              <p className="text-zinc-500 text-sm font-light leading-relaxed">
                My architectural journey is documented in real-time. Access the source code of my projects, research notes, and development experiments directly on GitHub.
              </p>
            </div>
            <Magnetic>
              <a href="https://github.com/dkadian" target="_blank" className="px-12 py-5 bg-white text-black rounded-2xl font-bold hover:bg-sky-400 hover:text-white transition-all duration-700 active:scale-95 text-[10px] uppercase tracking-[0.2em] whitespace-nowrap shadow-2xl">
                Access_Systems
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Skills = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef(0);
  const velocityRef = useRef(0.5);
  const targetVelocityRef = useRef(0.5);
  const lastTimeRef = useRef<number>(0);

  const categoryIcons = {
    "Web Development": () => (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
    ),
    "Backend & Database": () => (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6" y2="6"/><line x1="6" y1="18" x2="6" y2="18"/></svg>
    ),
    "Data Science": () => (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
    ),
    "Deep Learning": () => (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><circle cx="12" cy="12" r="3"/></svg>
    ),
    "GenAI": () => (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5 5 3Z"/><path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5Z"/></svg>
    ),
    Tools: () => (
      <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
    )
  };

  // Duplicate for infinite loop
  const duplicatedSkills = [...skillsData, ...skillsData];

  useEffect(() => {
    targetVelocityRef.current = isPaused ? 0 : 0.6;
  }, [isPaused]);

  useEffect(() => {
    let animationId: number;

    const scroll = (time: number) => {
      if (lastTimeRef.current && scrollRef.current) {
        const dt = (time - lastTimeRef.current) / 16.67; // Normalize to 60fps

        // Smoothly interpolate velocity
        velocityRef.current += (targetVelocityRef.current - velocityRef.current) * 0.08 * dt;

        if (Math.abs(velocityRef.current) > 0.01) {
          scrollPosRef.current += velocityRef.current * dt;
          scrollRef.current.scrollLeft = scrollPosRef.current;
        }

        // Infinite loop jump
        const halfWidth = scrollRef.current.scrollWidth / 2;
        if (scrollPosRef.current >= halfWidth) {
          scrollPosRef.current -= halfWidth;
          scrollRef.current.scrollLeft = scrollPosRef.current;
        } else if (scrollPosRef.current <= 0 && velocityRef.current < 0) {
          scrollPosRef.current += halfWidth;
          scrollRef.current.scrollLeft = scrollPosRef.current;
        }
      }

      lastTimeRef.current = time;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Update precision tracker during manual scroll
  const handleManualScroll = () => {
    if (isPaused && scrollRef.current) {
      scrollPosRef.current = scrollRef.current.scrollLeft;
    }
  };

  return (
    <section id="expertise" className="py-48 scroll-mt-20 overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-6">
        <SectionHeader title="Expertise" description="Technical analysis of core competencies and engineering toolsets." />
      </div>

      <div 
        ref={scrollRef}
        onScroll={handleManualScroll}
        className="relative mt-10 flex overflow-x-auto no-scrollbar select-none"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >        <div className="flex gap-4 md:gap-8 w-max px-8 py-4">
          {[...duplicatedSkills, ...duplicatedSkills].map((group, groupIndex) => {
            const CategoryIcon = categoryIcons[group.category as keyof typeof categoryIcons] || (() => null);
            return (
              <div key={`${group.category}-${groupIndex}`} className="w-[240px] md:w-[320px] flex-shrink-0">
                <TiltCard className="h-full">
                  <div className="glass-card p-6 md:p-8 h-full shadow-2xl bg-zinc-900/40 border border-white/5 hover:border-sky-500/20 transition-colors">
                    <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-5">
                      <div className="w-4 h-4 text-sky-500">
                        <CategoryIcon />
                      </div>
                      <h3 className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">{group.category}</h3>
                    </div>
                    <div className="space-y-7">
                      {group.skills.map((skill, skillIndex) => (
                        <SkillItem key={skill.name} skill={skill} index={skillIndex} />
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Education = () => (
  <section id="education" className="py-24 md:py-48 scroll-mt-20">
    <SectionHeader title="Education" description="Academic development and performance metrics during my engineering degree." />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
      <Reveal>
        <TiltCard className="h-full">
          <div className="glass-card p-6 md:p-12 space-y-12 md:space-y-16 h-full shadow-2xl">
            <div className="space-y-6 md:space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-8 border-b border-white/5 pb-6 md:pb-8 hover:border-sky-500/30 transition-colors duration-700">
                <div className="space-y-2">
                  <span className="text-[8px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-widest">2023 — Present</span>
                  <h3 className="text-xl md:text-3xl font-bold text-white uppercase tracking-tight text-balance">B.Tech in Computer Science (AIML)</h3>
                  <p className="text-zinc-500 text-xs md:text-sm font-light italic">Sushant University, Gurugram</p>
                </div>
                <div className="text-left">
                  <span className="text-[8px] md:text-[9px] font-bold text-zinc-600 uppercase tracking-widest">CGPA_Index</span>
                  <div className="text-3xl md:text-4xl font-bold text-white">{cgpa}</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8">
              {completedSGPAs.map((sem) => (
                <div key={sem.semester} className="space-y-1">
                  <div className="text-[8px] md:text-[9px] font-bold text-zinc-600 uppercase tracking-tighter">{sem.semester}</div>
                  <div className="text-lg md:text-xl font-bold text-white/80 hover:text-sky-400 transition-colors cursor-default">
                    {typeof sem.sgpa === 'number' ? sem.sgpa.toFixed(3) : "TBD"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TiltCard>
      </Reveal>
      <div className="space-y-6 md:space-y-8">
        {[
          { title: "Class 12", school: "GBSSS, Dharampura", result: "80%", year: "2022", delay: 0.15 },
          { title: "Class 10", school: "Krishna Model School", result: "84%", year: "2020", delay: 0.25 }
        ].map((item) => (
          <Reveal key={item.title} delay={item.delay}>
            <TiltCard>
              <div className="glass-card p-6 md:p-10 space-y-4 md:space-y-6 hover:translate-x-1 transition-all duration-700 shadow-2xl">
                <div className="flex justify-between items-center">
                  <span className="text-[8px] md:text-[10px] font-bold text-sky-500/50 uppercase tracking-widest">{`${item.year} // ${item.title}`}</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white leading-tight uppercase tracking-tight mb-2 md:mb-4">{item.school}</h3>
                <div className="flex justify-between items-end border-t border-white/5 pt-4 md:pt-6 mt-4 md:mt-6">
                  <span className="text-[8px] md:text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Result_Index</span>
                  <span className="text-white font-bold text-xl md:text-2xl font-mono">{item.result}</span>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const CV = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownload = () => {
    setIsDownloading(true); const link = document.createElement("a"); link.href = "/Resume.pdf"; link.download = "Deepak_Kadian_Resume.pdf";
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    setTimeout(() => setIsDownloading(false), 2000);
  };
  return (
    <section id="cv" className="py-24 md:py-32 scroll-mt-20">
      <Reveal>
        <TiltCard>
          <div className="glass-card p-8 md:p-20 flex flex-col items-center text-center relative group overflow-hidden shadow-2xl">
            <div className="relative z-10 space-y-8 md:space-y-10">
              <div className="font-mono text-zinc-500 text-[8px] md:text-[10px] tracking-[1em] uppercase opacity-50">Documentation</div>
              <h2 className="text-3xl md:text-6xl font-bold text-white tracking-tighter uppercase leading-tight">Curriculum <br /> Vitae</h2>
              <p className="text-zinc-500 text-xs md:text-base font-light max-w-lg mx-auto tracking-tight opacity-80">Access technical documentation of professional trajectory and academic mastery.</p>
              <Magnetic>
                <button onClick={handleDownload} disabled={isDownloading} className="px-8 py-4 md:px-12 md:py-5 border border-white/10 hover:bg-white hover:text-black transition-all duration-700 text-[8px] md:text-[10px] font-bold tracking-[0.4em] disabled:opacity-50 uppercase rounded-xl shadow-2xl">
                  {isDownloading ? "Downloading..." : "Download_Fetch"}
                </button>
              </Magnetic>
            </div>
          </div>
        </TiltCard>
      </Reveal>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-48 scroll-mt-20">
      <SectionHeader title="Contact" description="Establish a connection for technical inquiries or collaborations." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <Reveal>
          <TiltCard className="h-full">
            <div className="glass-card p-8 md:p-16 h-full flex flex-col justify-center space-y-8 md:space-y-12 shadow-2xl">
              <div className="space-y-4">
                <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight uppercase leading-tight">Module currently <br /> undergoing <br /> optimization.</h3>
                <p className="text-zinc-500 text-base md:text-lg font-light tracking-tight max-w-md">Our direct communication gateway is temporarily offline for architectural enhancements.</p>
              </div>
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-sky-500/5 border border-sky-500/10 text-[8px] md:text-[9px] font-bold text-sky-500 tracking-widest uppercase w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                Establishing Link
              </div>
            </div>
          </TiltCard>
        </Reveal>
        <div className="space-y-6 md:space-y-8">
          <div className="grid gap-4 md:gap-6">
            {[
              { label: "Email_Primary", value: "deepakkadian581@gmail.com", href: "mailto:deepakkadian581@gmail.com" },
              { label: "Github_Source", value: "dkadian", href: "https://github.com/dkadian" },
              { label: "Linkedin_Network", value: "Deepak Kadian", href: "https://linkedin.com/in/deepak-5a1749238/" }
            ].map((node) => (
              <Reveal key={node.label}>
                <Magnetic strength={0.1}>
                  <a href={node.href} target="_blank" className="glass-card group p-6 md:p-8 flex justify-between items-center hover:translate-x-1 transition-all duration-500 shadow-2xl">
                    <div className="space-y-1">
                      <div className="text-[8px] md:text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{node.label}</div>
                      <div className="text-base md:text-lg font-bold text-zinc-300 group-hover:text-white transition-colors">{node.value}</div>
                    </div>
                    <span className="text-xl md:text-2xl text-zinc-800 group-hover:text-sky-500 transition-all duration-700">→</span>
                  </a>
                </Magnetic>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function HomePage() {
  return (
    <div className="space-y-0 selection:bg-sky-500/30">
      <Hero />
      <GitHubHub />
      <Projects />
      <Skills />
      <Education />
      <CV />
      <Contact />
    </div>
  );
}
