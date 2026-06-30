import { Github, Linkedin, Mail } from "lucide-react";
import {
  FaDiagramProject,
  FaEnvelope,
  FaFacebookF,
  FaGithub,
  FaHouse,
  FaLinkedinIn,
  FaRenren,
  FaUser,
  FaInstagram,
  FaPython,
  FaHtml5,
  FaCss3,
  FaJs,
  FaNodeJs,
  FaDatabase,
  FaLinkedin,
  FaTwitter,

} from "react-icons/fa6";

export const SKILLS = [
  {

    name: "Python",
    Icon: FaPython,
    percentage: 95,
    color: "#4B8BBE",
  },
  {
    name: "HTML 5",
    Icon: FaHtml5,
    percentage: 95,
    color: "#E34F26",
  },
  {
    name: "CSS 3",
    Icon: FaCss3,
    percentage: 80,
    color: "#1572B6",
  },
  {
    name: "JavaScript",
    Icon: FaJs,
    percentage: 80,
    color: "#F7DF1E",
  },
  {
    name: "React & Next.js",
    Icon: FaNodeJs,
    percentage: 80,
    color: "#61DAFB",
  },
  {
    name: "Supabase & Firebase",
    Icon: FaDatabase,
    percentage: 90,
    color: "#8B5CF6",
  },
] as const;
export const SOCIALS = [
  {
    id: 'github',
    Icon: FaGithub,
    uri: 'https://github.com/yourusername',
    color: '#333'
  },
  {
    id: 'linkedin',
    Icon: FaLinkedin,
    uri: 'https://linkedin.com/in/yourusername',
    color: '#0077b5'
  },
 
];