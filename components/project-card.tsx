"use client";

import { Github, ExternalLink, Calendar, Code2, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import type { Project } from "@/types/project";

export function ProjectCard({ name, description, technologies, gitURL, liveURL }: Project) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border/50 group">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {name}
            </h3>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              <span>2024</span>
            </div>
          </div>
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost" 
                    size="icon" 
                    asChild
                    className="hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <a href={gitURL} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Code</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {liveURL && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost" 
                      size="icon" 
                      asChild
                      className="hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      <a href={liveURL} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Live Demo</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <TooltipProvider key={tech}>
              <Tooltip>
                <TooltipTrigger>
                  <motion.span 
                    className="px-2 py-1 bg-secondary/50 rounded-full text-xs hover:bg-secondary transition-colors flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Code2 className="h-3 w-3" />
                    {tech}
                  </motion.span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Used in project</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        <motion.div 
          className="flex items-center text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          <span>View Project</span>
          <ArrowUpRight className="h-3 w-3 ml-1" />
        </motion.div>
      </Card>
    </motion.div>
  );
}