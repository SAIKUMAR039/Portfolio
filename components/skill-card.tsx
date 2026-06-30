"use client";

import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { Card } from "@/components/ui/card";

interface SkillCardProps {
  name: string;
  Icon: IconType;
  percentage: number;
  color: string;
}

export function SkillCard({ name, Icon, percentage, color }: SkillCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-all">
      <div className="flex items-center gap-4 mb-4">
        <div 
          className="p-3 rounded-lg"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="h-6 w-6" style={{ color }} />
        </div>
        <h3 className="font-semibold">{name}</h3>
      </div>
      
      <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      
      <div className="mt-2 text-right text-sm text-muted-foreground">
        {percentage}%
      </div>
    </Card>
  );
}