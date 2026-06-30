"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Navbar(): React.ReactElement | null {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "--about", href: "#about" },
    { label: "--skills", href: "#skills" },
    { label: "--projects", href: "#projects" },
    { label: "--contact", href: "#contact" },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/40 shadow-lg"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Self-contained style block for terminal-like blinking cursor */}
      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .cursor-blink {
          animation: cursor-blink 1s step-end infinite;
        }
      `}</style>

      <div className="w-full max-w-6xl mx-auto flex h-16 items-center justify-between px-4">
        <Link 
          href="/" 
          className="font-mono text-base md:text-lg font-bold text-cyan flex items-center gap-1 select-none"
        >
          <span>sai@portfolio:~$</span>
          <span className="w-2 h-4 bg-cyan cursor-blink" />
        </Link>
        
        <nav className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6 font-mono">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-cyan transition-colors relative group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </div>
          
          <Button
            variant="ghost"
            className="md:hidden font-mono text-xl font-bold text-cyan hover:text-green hover:bg-transparent flex items-center gap-1 px-3"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span>&gt;</span>
            {mobileMenuOpen && <span className="w-2 h-4 bg-green cursor-blink" />}
          </Button>
        </nav>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border/40"
          >
            <div className="w-full max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4 font-mono">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-cyan transition-colors py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}