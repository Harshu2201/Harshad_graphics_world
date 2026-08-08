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
  return (
    <div className="relative min-h-dvh bg-background">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:glass-card focus:rounded-lg focus:px-4 focus:py-2 focus:text-foreground"
      >
        Skip to content
      </a>
      <Particles />
      <Navbar />
      <main>
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
      </main>
      <Footer />
      <WhatsAppButton />
      <MusicToggle />
    </div>
  );
};

export default Index;
