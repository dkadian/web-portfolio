"use client";

import Footer from "../components/Footer";

const semesterSGPA = [
  { semester: "SEM_01", sgpa: 8.286 },
  { semester: "SEM_02", sgpa: 7.5 },
  { semester: "SEM_03", sgpa: 8.9 },
  { semester: "SEM_04", sgpa: 8.526 },
  { semester: "SEM_05", sgpa: 8.391 },
  { semester: "SEM_06", sgpa: 0, pending: true },
  { semester: "SEM_07", sgpa: 0, pending: true },
  { semester: "SEM_08", sgpa: 0, pending: true },
];

const declaredSemesters = semesterSGPA.filter(sem => sem.sgpa > 0);
const currentCGPA = (declaredSemesters.reduce((acc, sem) => acc + sem.sgpa, 0) / declaredSemesters.length).toFixed(2);

const EducationPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground pt-24 bg-grid">
      <section className="flex-grow py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12 text-center lg:text-left">
            <h2 className="text-3xl lg:text-5xl font-bold font-mono mb-4">
              <span className="text-syntax-keyword">grep</span> -r &quot;education&quot; ./life
            </h2>
            <p className="text-muted font-mono italic">{"// Academic performance and milestones"}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Degree Progress (Left) */}
            <div className="lg:col-span-7">
              <div className="bg-card border border-border rounded-lg overflow-hidden animate-fadeIn hover:shadow-glow-sm transition-all duration-300 hover:-translate-y-1">
                <div className="bg-background border-b border-border px-4 py-2 flex items-center justify-between">
                  <span className="text-xs font-mono text-muted">degree_audit.log</span>
                  <span className="text-xs font-mono text-accent">ACTIVE</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-xl font-bold font-mono text-foreground">B.Tech Computer Science</h3>
                      <p className="text-sm text-muted font-mono">Current CGPA: <span className="text-syntax-number">{currentCGPA}</span> / 10.0</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl">🎓</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {semesterSGPA.map((sem, index) => (
                      <div key={index} className="group">
                        <div className="flex justify-between items-center mb-1 font-mono text-xs">
                          <span className={sem.pending ? "text-muted" : "text-muted"}>{sem.semester}</span>
                          <span className={sem.pending ? "text-muted" : "text-syntax-number"}>
                            {sem.pending ? "PENDING..." : `SGPA: ${sem.sgpa}`}
                          </span>
                        </div>
                        <div className="w-full bg-background rounded-full h-1.5 border border-border">
                          {!sem.pending && (
                            <div
                              className="bg-accent h-full rounded-full transition-all duration-1000 group-hover:opacity-80"
                              style={{ width: `${(sem.sgpa / 10) * 100}%` }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Schooling (Right) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* 12th */}
              <div className="bg-card border border-border rounded-lg p-6 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
                <div className="flex justify-between items-start mb-4">
                  <span className="px-2 py-0.5 text-[10px] font-mono border border-border rounded text-muted">CLASS_12</span>
                  <span className="text-syntax-number font-mono font-bold text-xl">80%</span>
                </div>
                <h4 className="font-mono text-foreground mb-1">GBSSS, Dharampura</h4>
                <p className="text-xs text-muted font-mono">COMPLETED: 2022</p>
                <div className="mt-4 w-full bg-background h-1 rounded-full overflow-hidden">
                  <div className="bg-syntax-function h-full" style={{ width: "80%" }} />
                </div>
              </div>

              {/* 10th */}
              <div className="bg-card border border-border rounded-lg p-6 animate-fadeIn" style={{ animationDelay: "0.3s" }}>
                <div className="flex justify-between items-start mb-4">
                  <span className="px-2 py-0.5 text-[10px] font-mono border border-border rounded text-muted">CLASS_10</span>
                  <span className="text-syntax-number font-mono font-bold text-xl">84%</span>
                </div>
                <h4 className="font-mono text-foreground mb-1">Krishna Model Secondary School</h4>
                <p className="text-xs text-muted font-mono">COMPLETED: 2020</p>
                <div className="mt-4 w-full bg-background h-1 rounded-full overflow-hidden">
                  <div className="bg-syntax-keyword h-full" style={{ width: "84%" }} />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EducationPage;
