import { HeroSection } from "@/components/sections/hero";
import { ExperienceSection } from "@/components/sections/experience";
import { ProjectsSection } from "@/components/sections/projects";
import { AchievementsSection } from "@/components/sections/achievements";
import { SkillsSection } from "@/components/skills-section";
import ContactSection from "@/components/sections/contact";
import { Navbar } from "@/components/navbar";
import Footer from "../components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080B10]">
      <Navbar />
      <HeroSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <AchievementsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}