"use client";

import Footer from "../components/Footer";

const projects = [
  {
    title: "web-portfolio",
    description: "A modern, responsive portfolio website built with Next.js 15, React 19, and Tailwind CSS. This portfolio showcases my skills, projects, education, and provides a way to connect with me.",
    tech: ["TypeScript", "Tailwind CSS", "Next.js"],
    link: "https://github.com/dkadian/web-portfolio",
    stats: "v1.2.0",
  },
  {
    title: "Dogs_cats_recog",
    description: "This repository implements a Support Vector Machine (SVM) classifier in Python to classify images of cats and dogs from the popular Kaggle Cats vs Dogs dataset.",
    tech: ["Python", "SVM", "Scikit-Learn"],
    link: "https://github.com/dkadian/Dogs_cats_recog",
    stats: "94% Acc",
  },
  {
    title: "House_pricing",
    description: "The code aims to build and evaluate linear regression models to predict house prices (SalePrice) based on their square footage and number of bedrooms and bathrooms.",
    tech: ["Python", "Linear Regression", "Pandas"],
    link: "https://github.com/dkadian/House_pricing",
    stats: "ML Model",
  },
  {
    title: "Hand_gesture_recog.",
    description: "Hand gesture recognition is a crucial component of human-computer interaction. This project aims to build a deep learning model capable of recognizing different hand gestures in real-time.",
    tech: ["Python", "Deep Learning", "OpenCV"],
    link: "https://github.com/dkadian/Hand_gesture_recog.",
    stats: "Real-time",
  },
];

const ProjectsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground pt-24 bg-grid">
      <section className="flex-grow py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center lg:text-left">
            <h2 className="text-3xl lg:text-5xl font-bold font-mono mb-4">
              <span className="text-syntax-keyword">ls</span> ./projects
            </h2>
            <p className="text-muted font-mono">Total {projects.length} repositories found.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-card border border-border rounded-lg p-6 hover:border-syntax-number/50 transition-all duration-300 flex flex-col animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl text-syntax-number">📁</span>
                    <h3 className="text-xl font-bold font-mono group-hover:text-syntax-number transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-muted border border-border px-2 py-0.5 rounded">
                    {project.stats}
                  </span>
                </div>
                
                <p className="text-muted text-sm mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-xs font-mono bg-background text-syntax-string border border-border rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <a
                  href={project.link}
                  className="inline-flex items-center gap-2 text-sm font-mono text-syntax-number hover:text-syntax-function transition-colors"
                >
                  <span className="text-muted">$</span> git remote show origin
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
