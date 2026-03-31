import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Particles from "@/components/Particles";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PortfolioSection from "@/components/PortfolioSection";
import ProjectsSection from "@/components/ProjectsSection";
import SocialSection from "@/components/SocialSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import MusicToggle from "@/components/MusicToggle";

const Index = () => {
  const [loading, setLoading] = useState(true);

  if (loading) return <LoadingScreen onComplete={() => setLoading(false)} />;

  return (
    <div className="relative min-h-screen bg-background">
      <Particles />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <ProjectsSection />
      <SocialSection />
      <ExperienceSection />
      <ContactSection />
      <WhatsAppButton />

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center">
        <p className="text-sm text-muted-foreground font-body">
          © 2025 Harshad Pakhale. Crafted with passion.
        </p>
      </footer>
    </div>
  );
};

export default Index;
