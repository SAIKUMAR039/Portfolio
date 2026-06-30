"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { usePortfolio } from "@/context/portfolio-context";

const navigation = {
  main: [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ],
};

const Footer = () => {
  const { portfolioData } = usePortfolio();
  const { profile, socials } = portfolioData;

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: socials.github,
      color: "hover:text-gray-900 dark:hover:text-white",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: socials.linkedin,
      color: "hover:text-blue-600",
    },
    {
      name: "Email",
      icon: Mail,
      href: `mailto:${profile.email}`,
      color: "hover:text-red-500",
    },
  ];

  return (
    <footer className="bg-background border-t border-cyan/10">
      <div className="max-w-6xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white font-mono">{profile.name}</h3>
            <p className="text-sm text-slate leading-relaxed">
              Full Stack Developer passionate about creating innovative, dynamic software systems.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Navigation</h3>
            <ul className="space-y-2">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-muted-foreground ${item.color} transition-colors`}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-cyan/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate select-none text-center sm:text-left">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <Link
            href="/admin"
            className="text-xs text-slate/30 hover:text-cyan/50 font-mono transition-colors duration-200"
          >
            --admin-console
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
