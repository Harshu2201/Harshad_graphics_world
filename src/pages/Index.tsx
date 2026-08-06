import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Particles from "@/components/Particles";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ServicesSection from "@/components/ServicesSection";
import AIVideoSection from "@/components/AIVideoSection";
import PortfolioSection from "@/components/PortfolioSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import WhyMeSection from "@/components/WhyMeSection";
import VisionSection from "@/components/VisionSection";
import SocialSection from "@/components/SocialSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
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
      <SkillsSection />
      <ServicesSection />
      <AIVideoSection />
      <PortfolioSection />
      <ProjectsSection />
      <ExperienceSection />
      <WhyMeSection />
      <VisionSection />
      <SocialSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
      <MusicToggle />
    </div>
  );
};

export default Index;
