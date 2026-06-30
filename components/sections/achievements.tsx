"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal, ShieldCheck, Award, Zap, Server } from "lucide-react";

interface AchievementLog {
  timestamp: string;
  service: string;
  status: "OK" | "INFO" | "WARN";
  message: string;
  subtext?: string;
}

import { usePortfolio } from "@/context/portfolio-context";

export const AchievementsSection: React.FC = () => {
  const { portfolioData } = usePortfolio();
  const logs = portfolioData.achievements;
  const [visibleCount, setVisibleCount] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView) return;

    const timer = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev < logs.length) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 400);

    return () => clearInterval(timer);
  }, [inView, logs.length]);

  return (
    <section id="achievements" className="py-24 px-6 bg-[#080B10]/90 relative">
      {/* Scroll target observer anchor */}
      <div 
        className="absolute top-1/3 left-0 w-full h-10 pointer-events-none" 
        ref={(el) => {
          if (!el) return;
          const observer = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                setInView(true);
                observer.disconnect();
              }
            },
            { threshold: 0.1 }
          );
          observer.observe(el);
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Title */}
        <div className="mb-12 font-mono">
          <div className="text-cyan text-sm mb-2 font-semibold tracking-wider flex items-center gap-2">
            <Server className="h-4 w-4" />
            <span>systemctl status achievements.service</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight animate-pulse">
            Achievements & Certs
          </h2>
          <p className="text-slate mt-2 text-sm md:text-base font-sans">
            // Sequential system diagnostic output loading certifications and national recognition milestones.
          </p>
        </div>

        {/* Console Box */}
        <div className="bg-[#0D1117] border border-cyan/15 rounded-lg overflow-hidden scanlines shadow-2xl">
          {/* Top terminal tab bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#161B22] border-b border-cyan/10 font-mono text-xs text-slate/60 select-none">
            <div className="flex space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-green/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate/50" />
            </div>
            <span>system_boot_diagnostics.sh</span>
            <span className="text-[10px] text-green/70">● ACTIVE</span>
          </div>

          {/* Terminal Console Log Output */}
          <div className="p-6 font-mono text-xs md:text-sm text-text min-h-[380px] bg-[#0D1117] space-y-4">
            {/* Linux boot style system summary */}
            <div className="text-slate/60 border-b border-cyan/5 pb-3">
              <div>[  OK  ] Reached target System Initialization.</div>
              <div>[  OK  ] Starting Achievements Diagnostics Service...</div>
              <div className="text-green mt-1">active (running) since Fri 2026-06-26; diagnostic_timer=active</div>
            </div>

            {/* Sequential logs */}
            <div className="space-y-4 select-text">
              {logs.map((log, index) => {
                const isVisible = index < visibleCount;
                
                return (
                  <div
                    key={log.service}
                    className={`transition-all duration-500 transform ${
                      isVisible 
                        ? "opacity-100 translate-x-0" 
                        : "opacity-0 -translate-x-4 pointer-events-none"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-slate/40">[{log.timestamp}]</span>
                      <span className="text-green font-bold">[  OK  ]</span>
                      <span className="text-cyan font-semibold">{log.service}</span>
                      <span className="text-white">: {log.message}</span>
                    </div>
                    {log.subtext && (
                      <div className="pl-8 md:pl-20 text-slate text-xs font-sans mt-1 max-w-2xl leading-relaxed">
                        &gt; {log.subtext}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Cursor block showing at the end */}
              {visibleCount >= logs.length ? (
                <div className="pt-2 text-green font-semibold animate-pulse flex items-center gap-2">
                  <span>[ SUCCESS ] System diagnostics completed. All systems nominal.</span>
                  <span className="inline-block w-2 h-4 bg-green" />
                </div>
              ) : inView ? (
                <div className="pt-2 text-cyan flex items-center gap-2">
                  <span>Loading services...</span>
                  <span className="inline-block w-2 h-4 bg-cyan animate-ping" />
                </div>
              ) : (
                <div className="text-slate/40 text-xs italic">
                  Scroll down to initialize achievements.service boot sequence...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;