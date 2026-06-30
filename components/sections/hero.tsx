"use client";

import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Terminal as TerminalIcon } from "lucide-react";
import { usePortfolio } from "@/context/portfolio-context";

interface CharToken {
  char: string;
  colorClass: string;
}

interface HistoryItem {
  text: string;
  colorClass: string;
}

export const HeroSection: React.FC = () => {
  const { portfolioData, loading } = usePortfolio();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [introFinished, setIntroFinished] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [matrixActive, setMatrixActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const cyan = "text-cyan";
  const green = "text-green";
  const slate = "text-slate";
  const white = "text-white";

  const { profile } = portfolioData;

  // Pre-tokenize the character array to maintain syntax styling during typing
  const parts = useMemo(() => {
    if (!profile) return [];
    return [
      // Line 1: $ whoami
      { text: "$ ", color: cyan },
      { text: "whoami\n", color: white },
      
      // Line 2: > Sai Kumar Thota
      { text: "> ", color: cyan },
      { text: `${profile.name}\n\n`, color: green },
      
      // Line 3: $ cat profile.json
      { text: "$ ", color: cyan },
      { text: "cat profile.json\n", color: white },
      
      // Line 4: > {
      { text: "> ", color: cyan },
      { text: "{\n", color: white },
      
      // Line 5: >   "role": "Full Stack Engineer",
      { text: "> ", color: cyan },
      { text: "  ", color: white },
      { text: `"role"`, color: slate },
      { text: ": ", color: white },
      { text: `"${profile.role}"`, color: green },
      { text: ",\n", color: white },
      
      // Line 6: >   "exp": "9 months production internship",
      { text: "> ", color: cyan },
      { text: "  ", color: white },
      { text: `"exp"`, color: slate },
      { text: ": ", color: white },
      { text: `"${profile.exp}"`, color: green },
      { text: ",\n", color: white },
      
      // Line 8: >   "superpower": "AI-assisted development",
      { text: "> ", color: cyan },
      { text: "  ", color: white },
      { text: `"superpower"`, color: slate },
      { text: ": ", color: white },
      { text: `"${profile.superpower}"`, color: green },
      { text: ",\n", color: white },
      
      // Line 9: >   "status": "Open to work 🟢"
      { text: "> ", color: cyan },
      { text: "  ", color: white },
      { text: `"status"`, color: slate },
      { text: ": ", color: white },
      { text: `"${profile.status}"`, color: green },
      { text: "\n", color: white },
      
      // Line 10: > }
      { text: "> ", color: cyan },
      { text: "}\n\n", color: white },
      
      // Line 11: $ 
      { text: "$ ", color: cyan }
    ];
  }, [profile, cyan, green, slate, white]);

  // Flatten parts into characters for typing
  const allTokens = useMemo(() => 
    parts.flatMap((part) =>
      part.text.split("").map((char) => ({
        char,
        colorClass: part.color,
      }))
    ),
    [parts]
  );

  // Autotyped sequence handling
  useEffect(() => {
    if (loading || allTokens.length === 0 || introFinished) return;
    
    let timerId: NodeJS.Timeout;
    setCurrentIndex(0);

    const type = () => {
      setCurrentIndex((prev) => {
        if (prev < allTokens.length) {
          const nextChar = allTokens[prev]?.char;
          const delay = nextChar === "\n" ? 120 : 40;
          timerId = setTimeout(type, delay);
          return prev + 1;
        } else {
          setIntroFinished(true);
          return prev;
        }
      });
    };

    timerId = setTimeout(type, 500);

    return () => clearTimeout(timerId);
  }, [allTokens, loading, introFinished]);

  // Append welcome log when typing finishes
  useEffect(() => {
    if (introFinished) {
      setHistory([
        { text: "System initialized. Type 'help' for available commands.", colorClass: "text-slate" }
      ]);
    }
  }, [introFinished]);

  // Dynamic outputs for CLI commands based on context data
  const profileJson = useMemo(() => {
    if (!profile) return "{}";
    return JSON.stringify({
      name: profile.name,
      role: profile.role,
      exp: profile.exp,
      superpower: profile.superpower,
      status: profile.status,
      email: profile.email,
      phone: profile.phone,
      location: profile.location
    }, null, 2);
  }, [profile]);

  const skillsOutput = useMemo(() => {
    if (!portfolioData.skills) return "";
    return portfolioData.skills
      .map(category => {
        const list = category.skills.map(s => s.name).join(", ");
        return `${category.name.padEnd(14)}: ${list}`;
      })
      .join("\n");
  }, [portfolioData.skills]);

  const projectsOutput = useMemo(() => {
    if (!portfolioData.projects) return "";
    return portfolioData.projects
      .map(p => `• [${p.name}] - ${p.description}\n  URL: ${p.liveURL || 'N/A'} | Git: ${p.gitURL || 'N/A'}`)
      .join("\n\n");
  }, [portfolioData.projects]);

  const expOutput = useMemo(() => {
    if (!portfolioData.experience) return "";
    return portfolioData.experience
      .map(c => `[commit ${c.hash.substring(0, 7)}] - ${c.type}(${c.scope}): ${c.subject} (${c.date})\n  Author: ${c.author}\n  Details: ${c.details.join(", ")}`)
      .join("\n\n");
  }, [portfolioData.experience]);

  // Execute terminal CLI command
  const executeCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (trimmed === "") {
      setHistory(prev => [...prev, { text: "guest@sai-portfolio:~$ ", colorClass: "text-cyan" }]);
      return;
    }

    const parts = trimmed.split(" ");
    const command = parts[0].toLowerCase();
    
    // Add command to history
    setHistory(prev => [...prev, { text: `guest@sai-portfolio:~$ ${trimmed}`, colorClass: "text-cyan" }]);

    let outputLines: HistoryItem[] = [];

    switch (command) {
      case "help":
        outputLines = [
          { text: "Available commands:", colorClass: "text-slate" },
          { text: "  whoami      - Display profile owner name and role", colorClass: "text-cyan" },
          { text: "  skills      - List key programming and design skills", colorClass: "text-cyan" },
          { text: "  projects    - View highlight projects", colorClass: "text-cyan" },
          { text: "  exp         - Print work and education experience", colorClass: "text-cyan" },
          { text: "  contact     - Display contact information & socials", colorClass: "text-cyan" },
          { text: "  matrix      - Start the matrix code rain animation", colorClass: "text-cyan" },
          { text: "  clear       - Clear the terminal screen", colorClass: "text-cyan" },
          { text: "  reset       - Restart the typing terminal introduction", colorClass: "text-cyan" },
          { text: "  sudo        - Run command as administrator", colorClass: "text-cyan" }
        ];
        break;
      case "clear":
        setHistory([]);
        return;
      case "reset":
        setHistory([]);
        setIntroFinished(false);
        setCurrentIndex(0);
        return;
      case "whoami":
        outputLines = [
          { text: `${profile?.name || "Sai Kumar Thota"} - ${profile?.role || "Full Stack Engineer"}`, colorClass: "text-green" },
          { text: `Status: ${profile?.status || "Open to work 🟢"}`, colorClass: "text-white" }
        ];
        break;
      case "cat":
        if (parts[1] === "profile.json") {
          outputLines = [{ text: profileJson, colorClass: "text-green" }];
        } else {
          outputLines = [{ text: "usage: cat [filename]\nFiles in this directory: profile.json", colorClass: "text-red-400" }];
        }
        break;
      case "skills":
        outputLines = [
          { text: "=== SKILLS INVENTORY ===", colorClass: "text-slate" },
          { text: skillsOutput, colorClass: "text-green" }
        ];
        break;
      case "projects":
        outputLines = [
          { text: "=== FEATURED PROJECTS ===", colorClass: "text-slate" },
          { text: projectsOutput, colorClass: "text-green" }
        ];
        break;
      case "exp":
      case "experience":
        outputLines = [
          { text: "=== GIT COMMIT EXPERIENCE TIMELINE ===", colorClass: "text-slate" },
          { text: expOutput, colorClass: "text-green" }
        ];
        break;
      case "contact":
        outputLines = [
          { text: "=== CONTACT INFORMATION ===", colorClass: "text-slate" },
          { text: `Email:     ${profile?.email || "saikumarthota2004@gmail.com"}`, colorClass: "text-white" },
          { text: `Phone:     ${profile?.phone || "+91 90590 81173"}`, colorClass: "text-white" },
          { text: `Location:  ${profile?.location || "Hyderabad, India"}`, colorClass: "text-white" },
          { text: `GitHub:    ${portfolioData.socials?.github || "https://github.com/SAIKUMAR039"}`, colorClass: "text-cyan" },
          { text: `LinkedIn:  ${portfolioData.socials?.linkedin || "https://www.linkedin.com/in/sai-kumar-thota-101764252/"}`, colorClass: "text-cyan" }
        ];
        break;
      case "matrix":
        setMatrixActive(true);
        return;
      case "sudo":
        outputLines = [{ text: "Permission denied: guest is not in the sudoers file. This incident will be reported.", colorClass: "text-red-400" }];
        break;
      default:
        outputLines = [{ text: `Command not found: ${command}. Type 'help' for available commands.`, colorClass: "text-red-400" }];
    }

    setHistory(prev => [...prev, ...outputLines]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputValue);
      setInputValue("");
    }
  };

  // Skip autotyping or focus hidden input on terminal click
  const handleTerminalClick = () => {
    if (!introFinished) {
      setCurrentIndex(allTokens.length);
      setIntroFinished(true);
    }
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  // Scroll terminal body container to bottom
  const scrollToBottom = () => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (introFinished || history.length > 0) {
      scrollToBottom();
    }
  }, [history, introFinished, inputValue]);

  // Matrix Code Rain Animation Canvas logic
  useEffect(() => {
    if (!matrixActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let resizeId: number;
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$#@&%*+-/<>[]{}";
    const charArr = chars.split("");
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(8, 11, 16, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00FF88"; // neon green
      ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = charArr[Math.floor(Math.random() * charArr.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const intervalId = setInterval(draw, 33);

    const exitMatrix = () => {
      setMatrixActive(false);
      setHistory(prev => [...prev, { text: "Exited matrix code rain mode.", colorClass: "text-slate" }]);
    };

    canvas.addEventListener("click", exitMatrix);
    const handleWindowKeyDown = () => {
      exitMatrix();
    };
    window.addEventListener("keydown", handleWindowKeyDown);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("keydown", handleWindowKeyDown);
    };
  }, [matrixActive]);

  const scrollToSkills = (): void => {
    document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
  };

  const visibleTokens = allTokens.slice(0, currentIndex);

  const gridStyle: React.CSSProperties = {
    backgroundImage: `
      radial-gradient(circle at center, transparent 30%, var(--bg) 95%),
      linear-gradient(to right, rgba(0, 212, 255, 0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0, 212, 255, 0.04) 1px, transparent 1px)
    `,
    backgroundSize: "100% 100%, 32px 32px, 32px 32px",
  };

  if (loading) {
    return (
      <section
        className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-bg"
        style={gridStyle}
      >
        <div className="font-mono text-cyan text-xs sm:text-sm animate-pulse">
          $ loading_portfolio_configuration...
        </div>
      </section>
    );
  }

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-bg"
      style={gridStyle}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-cyan/10 rounded-full blur-[90px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] bg-green/5 rounded-full blur-[70px] pointer-events-none" />

      {/* Terminal window cursor blink styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes terminal-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .terminal-cursor {
          animation: terminal-blink 1s step-end infinite;
          background-color: var(--cyan);
          display: inline-block;
          width: 8px;
          height: 15px;
          vertical-align: middle;
        }
      `}} />

      {/* Terminal Window Container */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-2xl px-4 sm:px-6 md:px-0 z-10"
      >
        <div 
          onClick={handleTerminalClick}
          className="w-full bg-[#0D1117] border border-cyan/15 rounded-lg shadow-2xl overflow-hidden scanlines relative cursor-text group"
        >
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#161B22] border-b border-cyan/10 select-none">
            {/* Left: Window controls */}
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
            </div>
            {/* Center: Title */}
            <div className="text-xs font-mono text-slate/70 flex items-center gap-1.5">
              <TerminalIcon className="h-3.5 w-3.5 text-cyan/70" />
              <span>sai@portfolio: ~ (zsh)</span>
            </div>
            {/* Right: Hint Badge */}
            <div className="text-[10px] font-mono text-slate/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {introFinished ? "click to type" : "click to skip"}
            </div>
          </div>

          {/* Terminal Body */}
          <div 
            ref={terminalBodyRef}
            className="p-5 font-mono text-xs sm:text-sm md:text-base text-text h-[380px] md:h-[440px] overflow-y-auto bg-[#0D1117] text-left leading-relaxed relative"
          >
            {/* Matrix Code Rain Canvas */}
            {matrixActive && (
              <div className="absolute inset-0 z-20 bg-[#080B10]">
                <div className="absolute top-3 right-3 text-[10px] font-mono text-green/60 bg-[#080B10]/80 px-2 py-1 rounded border border-green/20 z-30 select-none pointer-events-none">
                  [ Click or press key to exit ]
                </div>
                <canvas ref={canvasRef} className="w-full h-full block" />
              </div>
            )}

            {/* Content Output */}
            {!introFinished ? (
              <pre className="whitespace-pre-wrap break-all">
                {visibleTokens.map((token, index) => (
                  <span key={index} className={token.colorClass}>
                    {token.char}
                  </span>
                ))}
                <span className="terminal-cursor" />
              </pre>
            ) : (
              <div className="flex flex-col space-y-1.5">
                {/* Intro Reconstructed */}
                <div className="whitespace-pre-wrap break-all select-none">
                  {allTokens.map((token, index) => (
                    <span key={index} className={token.colorClass}>
                      {token.char}
                    </span>
                  ))}
                </div>

                {/* History Commands and Outputs */}
                {history.map((line, index) => (
                  <div key={index} className={`${line.colorClass} whitespace-pre-wrap break-all`}>
                    {line.text}
                  </div>
                ))}

                {/* Current Active Input Prompt */}
                <div className="flex items-center text-cyan pt-1">
                  <span className="mr-2 select-none">guest@sai-portfolio:~$</span>
                  <span className="text-white whitespace-pre-wrap break-all">{inputValue}</span>
                  <span className="terminal-cursor ml-1" />
                </div>
              </div>
            )}

            {/* Hidden Input field */}
            {introFinished && (
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="absolute opacity-0 pointer-events-none w-0 h-0"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            )}
          </div>
        </div>
      </motion.div>

      {/* Explore Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 z-10"
      >
        <button
          onClick={scrollToSkills}
          className="flex flex-col items-center gap-2 group font-mono text-sm text-cyan/70 hover:text-cyan transition-colors duration-300"
        >
          <span className="relative">
            --explore
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-cyan group-hover:w-full transition-all duration-300" />
          </span>
          <ChevronDown className="h-4 w-4 animate-bounce group-hover:translate-y-0.5 transition-transform" />
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSection;