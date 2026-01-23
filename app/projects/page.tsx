"use client";

import Footer from "../components/Footer";

const projects = [
  {
    title: "web-portfolio",
    description: "A modern, responsive portfolio website built with Next.js 15, React 19, and Tailwind CSS. This portfolio showcases my skills, projects, education, and provides a way to connect with me.",
    tech: ["TypeScript", "tailwind CSS", "Javascript"],
    link: "https://github.com/dkadian/web-portfolio",
  },
  {
    title: "Dogs_cats_recog",
    description: "This repository implements a Support Vector Machine (SVM) classifier in Python to classify images of cats and dogs from the popular Kaggle Cats vs Dogs dataset.",
    tech: ["Python", "Jupyter notebook", "SVM ML algorithm"],
    link: "https://github.com/dkadian/Dogs_cats_recog",
  },
  {
    title: "House_pricing",
    description: "The code aims to build and evaluate linear regression models to predict house prices (SalePrice) based on their square footage and number of bedrooms and bathrooms, using a dataset containing information about residential properties. ",
    tech: ["Python", "Linear Regression", "Jupyter Notebook"],
    link: "https://github.com/dkadian/House_pricing",
  },
  {
    title: "Hand_gesture_recog.",
    description: "Hand gesture recognition is a crucial component of human-computer interaction, providing a natural way for users to communicate with machines. This project aims to build a state-of-the-art deep learning model capable of recognizing different hand gestures in real-time, making it suitable for applications like sign language interpretation, virtual reality interfaces, gaming, and smart home controls.",
    tech: ["Python", "Juypter Notebook", "python Libraries"],
    link: "https://github.com/dkadian/Hand_gesture_recog.",
  },
];

const ProjectsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900/50 via-[#0a0a1e] to-[#0a0a1e] text-white pt-16">
      {/* Projects Section */}
      <section className="min-h-screen flex items-center py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8 lg:mb-12 text-center animate-fadeIn">
            Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-2 transition-all duration-500 animate-fadeIn"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex items-start justify-between mb-3 lg:mb-4">
                  <h3 className="text-xl lg:text-2xl font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="text-xl lg:text-2xl opacity-50 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300">
                    🚀
                  </span>
                </div>
                <p className="text-sm lg:text-base text-gray-400 mb-4 lg:mb-6 group-hover:text-gray-300 transition-colors duration-300">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4 lg:mb-6">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 lg:px-3 py-1 text-xs lg:text-sm bg-purple-500/20 text-purple-300 rounded-full group-hover:bg-purple-500/40 transition-all duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="inline-flex items-center text-sm lg:text-base text-white group-hover:text-purple-300 group-hover:translate-x-2 transition-all duration-300"
                >
                  <span>Source Code</span>
                  <span className="ml-1.5 lg:ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </a>
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

export default ProjectsPage;

