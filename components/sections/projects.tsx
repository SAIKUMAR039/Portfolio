"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, Terminal, Code2, Globe, Github, Sparkles, AlertCircle } from "lucide-react";
import { usePortfolio } from "@/context/portfolio-context";

// Group projects by category
type ProjectCategory = "all" | "ai" | "web";

const extensionMap: Record<string, { filename: string; language: string; color: string }> = {
  "Nerdy AI Studio": { filename: "nerdy_ai.tsx", language: "typescript", color: "text-cyan" },
  "Imagine": { filename: "imagine.tsx", language: "typescript", color: "text-cyan" },
  "AI Resume Screening": { filename: "resume_screen.py", language: "python", color: "text-green" },
  "File Share": { filename: "file_share.tsx", language: "typescript", color: "text-cyan" },
  "Benege AI Chat": { filename: "benege_chat.tsx", language: "typescript", color: "text-cyan" },
  "Student Utils": { filename: "student_utils.ts", language: "typescript", color: "text-cyan" },
  "Smart Emergency Alert System Using Air Tags": { filename: "emergency_alert.tsx", language: "typescript", color: "text-cyan" },
  "ToDo List": { filename: "todo_list.tsx", language: "typescript", color: "text-cyan" },
  "Weather": { filename: "weather_app.tsx", language: "typescript", color: "text-cyan" },
  "Bitcoin Price Prediction": { filename: "bitcoin_pred.py", language: "python", color: "text-green" }
};

export const ProjectsSection: React.FC = () => {
  const { portfolioData } = usePortfolio();
  const projects = portfolioData.projects;
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") return projects;
    if (activeCategory === "ai") {
      return projects.filter(
        (p) =>
          p.name.toLowerCase().includes("ai") ||
          p.name.toLowerCase().includes("prediction") ||
          p.name.toLowerCase().includes("imagine") ||
          p.name.toLowerCase().includes("benege")
      );
    }
    if (activeCategory === "web") {
      return projects.filter(
        (p) =>
          !p.name.toLowerCase().includes("ai") &&
          !p.name.toLowerCase().includes("prediction") &&
          !p.name.toLowerCase().includes("imagine") &&
          !p.name.toLowerCase().includes("benege")
      );
    }
    return projects;
  }, [activeCategory, projects]);

  const categories = [
    { id: "all" as ProjectCategory, label: "main", cmd: "git checkout main" },
    { id: "ai" as ProjectCategory, label: "feat/ai-ml", cmd: "git checkout feat/ai-ml" },
    { id: "web" as ProjectCategory, label: "feat/web-apps", cmd: "git checkout feat/web-apps" }
  ];

  return (
    <section id="projects" className="py-24 px-6 bg-bg relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00d4ff03_1px,transparent_1px),linear-gradient(to_bottom,#00d4ff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-12 font-mono text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="text-cyan text-sm mb-2 font-semibold tracking-wider flex items-center justify-center md:justify-start gap-2">
              <FolderGit2 className="h-4 w-4" />
              <span>ls -la ~/projects</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Featured Workspaces
            </h2>
            <p className="text-slate mt-2 text-sm md:text-base font-sans">
              // Open files inside the local directory. Hover files to inspect imports and run scripts.
            </p>
          </div>

          {/* Git Branch Filters */}
          <div className="flex flex-wrap justify-center gap-3 bg-[#0d1117]/60 border border-cyan/10 p-2 rounded-lg backdrop-blur-sm self-center md:self-end">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded text-xs transition-all duration-300 font-mono relative ${
                  activeCategory === cat.id
                    ? "text-green border border-green/30 bg-green/5 shadow-[0_0_10px_rgba(0,255,136,0.15)]"
                    : "text-slate hover:text-white border border-transparent"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span className="text-cyan">$</span>
                  {cat.label}
                </span>
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="activeTabOutline"
                    className="absolute inset-0 border border-green rounded pointer-events-none"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.length === 0 ? (
              <div className="col-span-full py-12 px-6 bg-[#0D1117] border border-dashed border-cyan/15 rounded-lg text-center font-mono text-xs sm:text-sm text-slate select-none">
                <AlertCircle className="h-6 w-6 text-cyan mx-auto mb-3 animate-pulse" />
                <p className="text-cyan">$ find ~/projects -type f</p>
                <p className="text-slate/60 mt-1">find: no files found in workspace.</p>
                <p className="text-slate/40 mt-2">Open the admin console to add and deploy your custom projects.</p>
              </div>
            ) : (
              filteredProjects.map((project, idx) => {
              const fileMeta = extensionMap[project.name] || {
                filename: `${project.name.toLowerCase().replace(/[^a-z0-9]/g, "_")}.tsx`,
                language: "typescript",
                color: "text-cyan"
              };

              const isPython = fileMeta.language === "python";
              const glowColor = isPython
                ? "hover:border-green/30 hover:shadow-[0_0_20px_rgba(0,255,136,0.1)]"
                : "hover:border-cyan/30 hover:shadow-[0_0_20px_rgba(0,212,255,0.1)]";
              const fileColor = fileMeta.color;

              // Generate custom imports dynamic text based on tech stack
              const half = Math.ceil(project.technologies.length / 2);
              const imports1 = project.technologies.slice(0, half).join(", ");
              const imports2 = project.technologies.slice(half).join(", ");

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="h-full flex flex-col"
                >
                  {/* IDE File Window Wrapper */}
                  <div className={`flex flex-col h-full bg-[#0D1117] border border-cyan/10 rounded-lg overflow-hidden transition-all duration-300 ${glowColor} group`}>
                    
                    {/* Tab Header bar */}
                    <div className="flex items-center justify-between px-3 py-2 bg-[#161B22] border-b border-cyan/5 select-none font-mono">
                      {/* Active file tab */}
                      <div className="flex items-center gap-2 bg-[#0D1117] px-3 py-1.5 rounded-t border-t border-x border-cyan/10 text-xs">
                        <Code2 className={`h-3.5 w-3.5 ${fileColor}`} />
                        <span className="text-white font-medium">{fileMeta.filename}</span>
                        <span className="text-slate/50 hover:text-cyan cursor-pointer text-[10px] ml-1">×</span>
                      </div>
                      <div className="flex items-center gap-1.5 pr-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate/30" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate/30" />
                        <span className="text-[10px] text-slate/50">{project.year}</span>
                      </div>
                    </div>

                    {/* Editor Content Area */}
                    <div className="p-4 font-mono text-xs text-text leading-relaxed flex-grow bg-[#0D1117] select-text">
                      <div className="flex">
                        {/* Line Numbers */}
                        <div className="text-slate/30 text-right pr-3 select-none border-r border-cyan/5 w-8 flex-shrink-0">
                          {Array.from({ length: 11 }).map((_, i) => (
                            <div key={i}>{i + 1}</div>
                          ))}
                        </div>

                        {/* Code Content */}
                        <div className="pl-3 overflow-x-auto w-full">
                          {/* Imports */}
                          <div className="text-purple-400">
                            import <span className="text-text">{`{ ${project.technologies.slice(0, 3).join(", ")} }`}</span> from <span className="text-green">{"'stack'"}`</span>;
                          </div>
                          {project.technologies.length > 3 && (
                            <div className="text-purple-400">
                              import <span className="text-text">{`{ ${project.technologies.slice(3, 6).join(", ")} }`}</span> from <span className="text-green">{"'integrations'"}`</span>;
                            </div>
                          )}
                          <div className="h-2" />

                          {/* Code Comment description */}
                          <div className="text-slate select-text">
                            // {project.description.slice(0, 90)}
                            {project.description.length > 90 && "..."}
                          </div>
                          <div className="h-2" />

                          {/* Variable definitions */}
                          <div className="text-blue-400">
                            const <span className="text-yellow-400">details</span> = <span className="text-text">{"{"}</span>
                          </div>
                          <div className="pl-4">
                            <div>
                              <span className="text-slate">id:</span> <span className="text-green">"{project.id}"</span>,
                            </div>
                            <div>
                              <span className="text-slate">features:</span> <span className="text-text">[</span>
                            </div>
                            {project.features.slice(0, 2).map((feat, fIdx) => (
                              <div key={fIdx} className="pl-4 text-green">
                                "{feat.toLowerCase().replace(/ /g, "_")}",
                              </div>
                            ))}
                            <div className="pl-2 text-text">]</div>
                          </div>
                          <div className="text-text">{"};"}</div>
                        </div>
                      </div>
                    </div>

                    {/* Editor Footer / CLI Commands buttons */}
                    <div className="p-3 bg-[#0f141c] border-t border-cyan/5 flex items-center justify-between gap-2 font-mono mt-auto">
                      <div className="text-[10px] text-slate/50 truncate max-w-[40%] flex items-center gap-1">
                        <Terminal className="h-3 w-3 text-cyan" />
                        <span>bash</span>
                      </div>
                      
                      <div className="flex gap-2 flex-shrink-0">
                        {project.liveURL && (
                          <a
                            href={project.liveURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 py-1 rounded bg-cyan/5 border border-cyan/20 text-cyan text-[11px] hover:bg-cyan hover:text-[#080B10] shadow-[0_0_8px_rgba(0,212,255,0.05)] transition-all duration-300 flex items-center gap-1"
                          >
                            <Globe className="h-3.5 w-3.5" />
                            <span>run start</span>
                          </a>
                        )}
                        <a
                          href={project.gitURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-1 rounded bg-slate/5 border border-slate/20 text-slate text-[11px] hover:bg-slate/10 hover:text-white transition-all duration-300 flex items-center gap-1"
                        >
                          <Github className="h-3.5 w-3.5" />
                          <span>git clone</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Feature highlight details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono"
        >
          <div className="bg-[#0D1117] p-5 rounded-lg border border-cyan/5 hover:border-cyan/15 hover:shadow-[0_0_15px_rgba(0,212,255,0.05)] transition-all duration-300">
            <div className="text-cyan text-sm mb-3 font-semibold flex items-center gap-2">
              <Code2 className="h-4 w-4" />
              <span>1. Clean Architecture</span>
            </div>
            <p className="text-slate text-xs md:text-sm font-sans leading-relaxed">
              Writing maintainable, modular, and performant code adhering to SOLID design principles and best industry practices.
            </p>
          </div>
          
          <div className="bg-[#0D1117] p-5 rounded-lg border border-cyan/5 hover:border-green/15 hover:shadow-[0_0_15px_rgba(0,255,136,0.05)] transition-all duration-300">
            <div className="text-green text-sm mb-3 font-semibold flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>2. AI Integrations</span>
            </div>
            <p className="text-slate text-xs md:text-sm font-sans leading-relaxed">
              Integrating advanced LLM API models (Gemini, OpenAI) for autonomous content generation, search, and coding tasks.
            </p>
          </div>

          <div className="bg-[#0D1117] p-5 rounded-lg border border-cyan/5 hover:border-cyan/15 hover:shadow-[0_0_15px_rgba(0,212,255,0.05)] transition-all duration-300">
            <div className="text-cyan text-sm mb-3 font-semibold flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>3. Product Mindset</span>
            </div>
            <p className="text-slate text-xs md:text-sm font-sans leading-relaxed">
              Designing user-first workflows, seamless responsive interfaces, secure database models, and stripe billing logic.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;