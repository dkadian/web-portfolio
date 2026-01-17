"use client";

import Footer from "../components/Footer";

const ProjectsPage = () => {
  const projects = [
    {
      title: "Project 1",
      description: "Description of your first project",
      tech: ["React", "Next.js", "Tailwind"],
      link: "#",
    },
    {
      title: "Project 2",
      description: "Description of your second project",
      tech: ["Node.js", "MongoDB", "Express"],
      link: "#",
    },
    {
      title: "Project 3",
      description: "Description of your third project",
      tech: ["Python", "Django", "PostgreSQL"],
      link: "#",
    },
    {
      title: "Project 4",
      description: "Description of your fourth project",
      tech: ["JavaScript", "HTML", "CSS"],
      link: "#",
    },
  ];

  return (
<div className="min-h-screen bg-gradient-to-b from-indigo-900/50 via-[#0a0a1e] to-[#0a0a1e] text-white pt-16">
      {/* Projects Section */}
      <section className="min-h-screen flex items-center py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-12 text-center">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm bg-purple-500/20 text-purple-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="inline-flex items-center text-white hover:text-purple-300 transition-colors duration-200"
                >
                  View Project →
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

