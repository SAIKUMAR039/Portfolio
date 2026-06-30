"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { SocialLink } from "@/components/social-link";
import  ContactSection  from "./contact";

const socialLinks = [
  { 
    icon: Github, 
    href: "https://github.com/SAIKUMAR039", 
    label: "GitHub" 
  },
  { 
    icon: Linkedin, 
    href: "https://www.linkedin.com/in/sai-kumar-thota-101764252/", 
    label: "LinkedIn" 
  },
  { 
    icon: Mail, 
    href: "mailto:contact@saikumarthota.live", 
    label: "Email" 
  }
];

export function Footer() {
  return (
    <footer className="py-10  text-white">
      <div className="max-w-4xl mx-auto text-center">
       
        <ContactSection />
        <div className="flex justify-center gap-4 mb-8">
          {socialLinks.map((link) => (
            <SocialLink key={link.label} {...link} />
          ))}
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} Sai Kumar Thota. All rights reserved.</p>
      </div>
    </footer>
  );
}
