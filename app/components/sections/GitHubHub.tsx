"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { Magnetic, TiltCard, SectionHeader, Reveal } from "../ui/SharedUI";
import { projects, skillsData, experienceData, certificationsData, Project } from "../../data";

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

export const GitHubHub = () => {
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

