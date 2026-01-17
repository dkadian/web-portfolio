"use client";

import Footer from "../components/Footer";

const semesterSGPA = [
  { semester: "Semester 1", sgpa: 8.286 },
  { semester: "Semester 2", sgpa: 7.5 },
  { semester: "Semester 3", sgpa: 8.9 },
  { semester: "Semester 4", sgpa: 8.526 },
  { semester: "Semester 5", sgpa: 8.391 },
  { semester: "Semester 6", sgpa: 0, pending: true },
  { semester: "Semester 7", sgpa: 0, pending: true },
  { semester: "Semester 8", sgpa: 0, pending: true },
];

// Only include semesters with declared results (sgpa > 0)
const declaredSemesters = semesterSGPA.filter(sem => sem.sgpa > 0);

const educationData = {
  tenth: {
    percentage: 84,
    school: "Krishna Model Secondary School",
    year: "2019",
  },
  twelfth: {
    percentage: 80,
    school: "GBSSS, Dharampura",
    year: "2021",
  },
};

const EducationPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900/50 via-[#0a0a1e] to-[#0a0a1e] text-white pt-16">
      {/* Education Section */}
      <section className="min-h-screen flex items-center py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8 lg:mb-12 text-center animate-fadeIn">
            Education
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Semester-wise SGPA */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-500 animate-fadeIn">
              <div className="flex items-center gap-3 mb-4 lg:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center group-hover:from-purple-500/50 group-hover:to-pink-500/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <span className="text-xl sm:text-2xl">📚</span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-purple-400">
                  Semester-wise SGPA (out of 10)
                </h3>
              </div>
              
              <div className="space-y-2 lg:space-y-3">
                {semesterSGPA.map((sem, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 lg:gap-3 p-2 lg:p-3 rounded-xl transition-all duration-300 cursor-default ${
                      sem.pending 
                        ? "opacity-60" 
                        : "hover:bg-white/10 hover:scale-105 hover:translate-x-1"
                    }`}
                  >
                    <span className={`w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-lg text-xs lg:text-sm font-medium transition-all duration-300 ${
                      sem.pending 
                        ? "bg-white/5 text-gray-500" 
                        : "bg-white/10 group-hover:bg-white/20"
                    }`}>
                      {sem.semester.split(" ")[1]}
                    </span>
                    <div className="flex-grow">
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-xs lg:text-sm font-medium ${sem.pending ? "text-gray-500" : "text-gray-300"}`}>
                          {sem.semester}
                        </span>
                        <span className={`text-sm lg:text-base font-semibold ${sem.pending ? "text-gray-500" : "text-purple-400"}`}>
                          {sem.pending ? "Result Not Declared" : sem.sgpa}
                        </span>
                      </div>
                      {!sem.pending && (
                        <div className="w-full bg-white/10 rounded-full h-1.5 lg:h-2">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 lg:h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(sem.sgpa / 10) * 100}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* CGPA Display */}
              <div className="mt-4 lg:mt-6 p-3 lg:p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
                <div className="flex justify-between items-center">
                  <span className="text-sm lg:text-base text-gray-300 font-medium">Current CGPA</span>
                  <span className="text-xl lg:text-2xl font-bold text-white">
                    {(declaredSemesters.reduce((acc, sem) => acc + sem.sgpa, 0) / declaredSemesters.length).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* 10th and 12th Marks */}
            <div className="space-y-6">
              {/* 10th Class */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-500 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-center gap-3 mb-4 lg:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/30 flex items-center justify-center group-hover:from-blue-500/50 group-hover:to-cyan-500/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <span className="text-xl sm:text-2xl">🎓</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-blue-400">
                    10th Class
                  </h3>
                </div>
                
                <div className="flex items-center gap-3 lg:gap-4 mb-4">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <span className="text-2xl lg:text-3xl font-bold text-white">{educationData.tenth.percentage}</span>
                    <span className="text-xs lg:text-sm absolute -bottom-5 lg:-bottom-6 text-gray-400">%</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm lg:text-base text-gray-300 font-medium">{educationData.tenth.school}</p>
                    <p className="text-xs lg:text-sm text-gray-500">Year: {educationData.tenth.year}</p>
                  </div>
                </div>
                
                <div className="w-full bg-white/10 rounded-full h-2.5 lg:h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2.5 lg:h-3 rounded-full transition-all duration-500"
                    style={{ width: `${educationData.tenth.percentage}%` }}
                  />
                </div>
              </div>

              {/* 12th Class */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-500 animate-fadeIn" style={{ animationDelay: "0.3s" }}>
                <div className="flex items-center gap-3 mb-4 lg:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-green-500/30 to-teal-500/30 flex items-center justify-center group-hover:from-green-500/50 group-hover:to-teal-500/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <span className="text-xl sm:text-2xl">🏫</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-green-400">
                    12th Class
                  </h3>
                </div>
                
                <div className="flex items-center gap-3 lg:gap-4 mb-4">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
                    <span className="text-2xl lg:text-3xl font-bold text-white">{educationData.twelfth.percentage}</span>
                    <span className="text-xs lg:text-sm absolute -bottom-5 lg:-bottom-6 text-gray-400">%</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm lg:text-base text-gray-300 font-medium">{educationData.twelfth.school}</p>
                    <p className="text-xs lg:text-sm text-gray-500">Year: {educationData.twelfth.year}</p>
                  </div>
                </div>
                
                <div className="w-full bg-white/10 rounded-full h-2.5 lg:h-3">
                  <div
                    className="bg-gradient-to-r from-green-500 to-teal-500 h-2.5 lg:h-3 rounded-full transition-all duration-500"
                    style={{ width: `${educationData.twelfth.percentage}%` }}
                  />
                </div>
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

export default EducationPage;

