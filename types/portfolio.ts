export interface Skill {
  name: string;
  fileName: string;
  category: string;
  themeColor: "cyan" | "green" | "blue" | "slate" | "magenta" | "yellow";
  proficiency: number;
  experience: string;
  description: string;
  keyConcepts: string[];
  code: string;
}

export interface FolderData {
  name: string;
  themeColor: "cyan" | "green" | "blue" | "slate" | "magenta" | "yellow";
  summaryCode: string;
  skills: Skill[];
}

export interface Commit {
  hash: string;
  branch: string;
  type: string;
  scope: string;
  subject: string;
  author: string;
  date: string;
  ref?: string;
  themeColor: string;
  details: string[];
}

export interface Project {
  id: string;
  name: string;
  gitURL: string;
  liveURL?: string;
  description: string;
  technologies: string[];
  year: string;
  features: string[];
}

export interface AchievementLog {
  timestamp: string;
  service: string;
  status: "OK" | "INFO" | "WARN";
  message: string;
  subtext?: string;
}

export interface ProfileInfo {
  name: string;
  role: string;
  exp: string;
  superpower: string;
  status: string;
  email: string;
  phone: string;
  location: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
}

export interface PortfolioData {
  profile: ProfileInfo;
  socials: SocialLinks;
  skills: FolderData[];
  experience: Commit[];
  projects: Project[];
  achievements: AchievementLog[];
}
