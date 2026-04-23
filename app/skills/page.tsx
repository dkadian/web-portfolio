"use client";

import Footer from "../components/Footer";

interface Skill {
  name: string;
  icon: string;
}

const skillsData: Record<string, Skill[]> = {
  Frontend: [
    { name: "React", icon: "⚛️" },
    { name: "Tailwind CSS", icon: "🎨" },
    { name: "HTML/CSS", icon: "🌐" },
  ],
  Backend: [
    { name: "Express", icon: "🚂" },
    { name: "Python", icon: "🐍" },
    { name: "Java", icon: "☕" },
  ],
  "Data Science": [
    { name: "Pandas", icon: "🐼" },
    { name: "NumPy", icon: "🔢" },
    { name: "Matplotlib", icon: "📊" },
    { name: "Scikit-learn", icon: "⚙️" },
  ],
  Database: [
    { name: "MongoDB", icon: "🍃" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "MySQL", icon: "🗄️" },
  ],
  Tools: [
    { name: "Git", icon: "🔀" },
    { name: "Docker", icon: "🐳" },
    { name: "VS Code", icon: "⌨️" },
  ],
};


const SkillsPage = () => {
  const categories = Object.entries(skillsData);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground pt-24 bg-dots">
      <section className="flex-grow py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center lg:text-left">
            <h2 className="text-3xl lg:text-5xl font-bold font-mono mb-4">
              <span className="text-syntax-keyword">cat</span> skills.json
            </h2>
            <p className="text-muted font-mono italic">{"// My technical stack and expertise"}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map(([category, skillList], index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 hover:border-syntax-function/30 transition-all animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-syntax-function font-mono text-lg mb-6 flex items-center gap-2">
                  <span className="text-muted">&quot;</span>{category}<span className="text-muted">&quot;: [</span>
                </h3>
                
                <div className="grid grid-cols-1 gap-3 pl-4">
                  {skillList.map((skill, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-2 rounded hover:bg-background transition-colors group"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">{skill.icon}</span>
                      <span className="text-sm font-mono text-muted group-hover:text-syntax-number">
                        <span className="text-muted">&quot;</span>{skill.name}<span className="text-muted">&quot;</span>,
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-syntax-function font-mono text-lg">
                  <span className="text-muted">]</span>,
                </div>
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
