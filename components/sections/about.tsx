"use client";
import { SkillsList } from "@/components/skills-list";
import ExperienceCard from "@/components/experience-card";
import GitHubInfo from "@/components/github-info";
import BlogList from "@/components/blog-list";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Mail, Github, Linkedin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const skills = ["React", "Next.js", "Node.js", "TypeScript", "MongoDB", "AWS"];

const experiences = [
  {
    title: "WEB DEVELOPER",
    company: "CODIT TECH SOLUTIONS",
    period: "2024-2024"
  },
  {
    title: "Undergraduate in Computer Science",
    company: "SR University , Warangal",
    period: "2022 - 2026 "
  }
];

const blogs = [
  {
    title: "React.js: The Powerhouse of Modern Web Development",
    link: "https://medium.com/@saikumarthota2004/react-js-the-powerhouse-of-modern-web-development-15f7bd5a03e6",
    date: "2024-12-15"
  },
  {
    title:"The Journey of Learning: How I Balance Building Projects and Pursuing My B-Tech in Computer Science",
    link:"https://medium.com/@saikumarthota2004/the-journey-of-learning-how-i-balance-building-projects-and-pursuing-my-b-tech-in-computer-science-f8751c590062",
    date:"2024-12-16"
  }
  
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A passionate full-stack developer with expertise in building modern web applications
            and machine learning solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div variants={fadeInUp}>
              <h3 className="text-xl font-semibold mb-4">Background</h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm a Computer Science graduate with a strong foundation in software development
                and machine learning. My journey in tech started with a passion for creating
                innovative solutions that solve real-world problems.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="text-xl font-semibold mb-4">Experience</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <h4 className="font-medium">Full Stack Developer</h4>
                    <p className="text-sm text-muted-foreground">CODIT TECH SOLUTIONS</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Led development of multiple web applications using React, Node.js, and cloud technologies.
                    </p>
                  </div>
                </div>
                
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h3 className="text-xl font-semibold mb-4">Education</h3>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <h4 className="font-medium">B.Tech. in Computer Science</h4>
                  <p className="text-sm text-muted-foreground">SR University• 2022 - 2026</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full" asChild>
                  <a href="/assets/Resume.pdf" target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4 mr-2" />
                    Resume
                  </a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href="mailto:saikumarthota2004@gmail.com">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact
                  </a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://github.com/SAIKUMAR039" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://www.linkedin.com/in/sai-kumar-thota-101764252/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Core Competencies</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Full Stack Development</Badge>
                <Badge variant="secondary">Machine Learning</Badge>
                <Badge variant="secondary">Cloud Computing</Badge>
                <Badge variant="secondary">UI/UX Design</Badge>
                <Badge variant="secondary">Agile Methodologies</Badge>
                <Badge variant="secondary">Problem Solving</Badge>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}