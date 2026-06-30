"use client";

import React from "react";
import { motion } from "framer-motion";
import { GitCommit, Terminal, Calendar, ShieldCheck, Award, GraduationCap, Briefcase } from "lucide-react";

interface Commit {
  hash: string;
  branch: string;
  type: "feat" | "chore" | "docs" | "fix";
  subject: string;
  author: string;
  date: string;
  scope: string;
  details: string[];
  ref?: string;
  themeColor: string; // "cyan" or "green"
}

import { usePortfolio } from "@/context/portfolio-context";

export const ExperienceSection: React.FC = () => {
  const { portfolioData } = usePortfolio();
  const commits = portfolioData.experience;

  return (
    <section id="about" className="py-24 px-6 bg-bg relative">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00d4ff05_1px,transparent_1px),linear-gradient(to_bottom,#00d4ff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="mb-12 font-mono">
          <div className="text-cyan text-sm mb-2 font-semibold tracking-wider animate-pulse flex items-center gap-2">
            <Terminal className="h-4 w-4" />
            <span>git log --graph --all --decorate</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Work & Education
          </h2>
          <p className="text-slate mt-2 text-sm md:text-base font-sans">
            // A chronological git branch log mapping professional experience and academic background.
          </p>
        </div>

        {/* Git Log Terminal Window */}
        <div className="bg-[#0D1117] border border-cyan/15 rounded-lg shadow-2xl overflow-hidden scanlines">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#161B22] border-b border-cyan/10 select-none font-mono">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
            </div>
            <span className="text-xs text-slate/70">saikumarthota@git-tree:~/experience</span>
            <span className="text-xs text-slate/30">v1.2.0</span>
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono text-xs md:text-sm text-text leading-relaxed select-text min-h-[500px]">
            {/* Git Graph Legend / Header */}
            <div className="text-slate mb-6 border-b border-cyan/5 pb-4">
              <div>$ git log --graph --abbrev-commit --decorate --format=fuller</div>
              <div className="text-green mt-1">* Showing active tree branches: main, feat/internship, feat/education</div>
            </div>

            {/* Commits Container */}
            <div className="space-y-12 relative">
              {commits.map((commit, cIdx) => {
                const accentColor = commit.themeColor === "cyan" ? "text-cyan" : "text-green";
                const accentBorder = commit.themeColor === "cyan" ? "border-cyan/30" : "border-green/30";
                const accentBg = commit.themeColor === "cyan" ? "bg-cyan/5" : "bg-green/5";
                const accentGlow = commit.themeColor === "cyan" ? "hover:shadow-[0_0_15px_rgba(0,212,255,0.15)]" : "hover:shadow-[0_0_15px_rgba(0,255,136,0.15)]";

                return (
                  <motion.div
                    key={commit.hash}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: cIdx * 0.15 }}
                    className="flex flex-col md:flex-row gap-6 relative"
                  >
                    {/* Visual Git Graph Column (Desktop) */}
                    <div className="hidden md:flex flex-col items-center w-12 flex-shrink-0 relative">
                      {/* Commit Node */}
                      <div className={`w-8 h-8 rounded-full border ${accentBorder} ${accentBg} flex items-center justify-center relative z-20`}>
                        <GitCommit className={`h-4 w-4 ${accentColor}`} />
                      </div>
                      
                      {/* Vertical Connecting Line (If not last commit) */}
                      {cIdx < commits.length - 1 && (
                        <div className="absolute top-8 bottom-[-48px] w-[2px] bg-gradient-to-b from-cyan/30 to-green/30 z-10" />
                      )}

                      {/* Mock branch line branching out/in */}
                      <svg className="absolute top-4 left-6 w-12 h-24 pointer-events-none z-0 overflow-visible" fill="none">
                        {cIdx === 0 ? (
                          // Forking/main line
                          <path
                            d="M -12 24 C 0 24, 12 36, 12 64"
                            stroke="rgba(0, 212, 255, 0.2)"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                          />
                        ) : (
                          // Merging line
                          <path
                            d="M 12 -24 C 12 12, 0 24, -12 24"
                            stroke="rgba(0, 255, 136, 0.2)"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                          />
                        )}
                      </svg>
                    </div>

                    {/* Commit Box details */}
                    <div className={`flex-grow bg-[#0f141c] border ${accentBorder} rounded-lg p-5 transition-all duration-300 ${accentGlow} relative`}>
                      {/* Corner branch tag */}
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-0.5 rounded border border-cyan/10 bg-bg text-[10px] text-slate font-mono select-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                        {commit.branch}
                      </div>

                      {/* Header line: commit hash & decorators */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`${accentColor} font-bold`}>commit {commit.hash}</span>
                        {commit.ref && (
                          <span className="text-green font-semibold">
                            ({commit.ref})
                          </span>
                        )}
                      </div>

                      {/* Commit author and date details */}
                      <div className="space-y-1 text-slate mb-4 pb-3 border-b border-cyan/5">
                        <div className="flex items-center gap-2">
                          <span className="w-16 text-slate/50">Author:</span>
                          <span className="text-text font-sans text-xs md:text-sm">{commit.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-16 text-slate/50">Date:</span>
                          <span className="text-text flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-cyan" />
                            <span className="font-sans text-xs md:text-sm">{commit.date}</span>
                          </span>
                        </div>
                      </div>

                      {/* Subject Line (Git Message style) */}
                      <div className="mb-4">
                        <div className="text-white font-bold text-sm md:text-base mb-1.5">
                          {commit.type}({commit.scope}): {commit.subject}
                        </div>
                        <div className="text-slate/60 text-[11px] font-sans">
                          // Commit message body: listing core duties and contributions
                        </div>
                      </div>

                      {/* Bullet details */}
                      <ul className="space-y-2.5 pl-2 border-l border-cyan/10">
                        {commit.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2.5">
                            <span className={`${accentColor} select-none mt-1`}>&gt;</span>
                            <span className="text-slate font-sans leading-relaxed text-xs md:text-sm">
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* End of Log */}
            <div className="mt-12 pt-6 border-t border-cyan/5 flex justify-between items-center text-slate/50 select-none">
              <span>(END)</span>
              <span className="animate-pulse">Press Q to exit or scroll down</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;