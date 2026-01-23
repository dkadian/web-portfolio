"use client";

import Footer from "../components/Footer";

interface Skill {
  name: string;
  icon: string;
  color: string;
}

const skillsData: Record<string, Skill[]> = {
  Frontend: [
    { name: "React", icon: "⚛️", color: "hover:bg-cyan-500/20" },
    { name: "Tailwind CSS", icon: "🎨", color: "hover:bg-cyan-400/20" },
    { name: "HTML/CSS", icon: "🌐", color: "hover:bg-orange-500/20" },
  ],
  Backend: [
    { name: "Express", icon: "🚂", color: "hover:bg-gray-400/20" },
    { name: "Python", icon: "🐍", color: "hover:bg-yellow-500/20" },
    { name: "Java", icon: "☕", color: "hover:bg-orange-600/20" },
  ],
  "Python Libraries": [
    { name: "Pandas", icon: "🐼", color: "hover:bg-blue-500/20" },
    { name: "NumPy", icon: "🔢", color: "hover:bg-blue-600/20" },
    { name: "Matplotlib", icon: "📊", color: "hover:bg-orange-500/20" },
    { name: "Seaborn", icon: "📈", color: "hover:bg-teal-500/20" },
    { name: "Flask", icon: "🌡️", color: "hover:bg-gray-400/20" },
    { name: "Scikit-learn", icon: "⚙️", color: "hover:bg-orange-500/20" },
    { name: "Streamlit", icon: "🚀", color: "hover:bg-red-500/20" },
  ],
  Database: [
    { name: "MongoDB", icon: "🍃", color: "hover:bg-green-600/20" },
    { name: "PostgreSQL", icon: "🐘", color: "hover:bg-blue-600/20" },
    { name: "MySQL", icon: "🗄️", color: "hover:bg-orange-400/20" },
  ],
  Tools: [
    { name: "Git", icon: "🔀", color: "hover:bg-orange-500/20" },
    { name: "Docker", icon: "🐳", color: "hover:bg-blue-500/20" },
    { name: "VS Code", icon: "⌨️", color: "hover:bg-blue-500/20" },
  ],
  "Visualisation Tools": [
    {name: "Excel", icon: "📊",color: "hover:bg-orange-500/20"},
    {name: "Power Bi", icon: "📶",color: "hover:bg-orange-500/20"},
  ]

};


const SkillsPage = () => {
  const categories = Object.entries(skillsData);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900/50 via-[#0a0a1e] to-[#0a0a1e] text-white pt-16">
      {/* Skills Section */}
      <section className="min-h-screen flex items-center py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8 lg:mb-12 text-center animate-fadeIn">
            Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {categories.map(([category, skillList], index) => (
              <div
                key={index}
                className="group bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-2 transition-all duration-500 animate-fadeIn h-full flex flex-col"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4 lg:mb-6 flex-shrink-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center group-hover:from-purple-500/50 group-hover:to-pink-500/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <span className="text-xl sm:text-2xl">
                    {index === 0 ? '🎨' : 
                     index === 1 ? '⚙️' : 
                     index === 2 ? '🐍' : 
                     index === 3 ? '🗄️' :
                     index === 4 ?  '🔧' : '📈'}
                  </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                    {category}
                  </h3>
                </div>
                
                {/* Skills List */}
                <ul className="space-y-2 lg:space-y-3 flex-grow">
                  {skillList.map((skill, i) => (
                    <li key={i}>
                      <div
                        className={`flex items-center gap-2 lg:gap-3 p-2 lg:p-3 rounded-xl ${skill.color} hover:scale-105 hover:translate-x-1 transition-all duration-300 cursor-default`}
                        style={{ animationDelay: `${index * 0.1 + i * 0.05}s` }}
                      >
                        {/* Skill Icon */}
                        <span className="w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center bg-white/10 rounded-lg text-lg lg:text-xl group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                          {skill.icon}
                        </span>
                        {/* Skill Name */}
                        <span className="text-sm lg:text-base text-gray-300 font-medium group-hover:text-white transition-colors duration-300">
                          {skill.name}
                        </span>
                        {/* Arrow Indicator */}
                        <span className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-purple-400">
                          →
                        </span>
                      </div>
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

