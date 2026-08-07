import { lazy, Suspense, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Particles from "@/components/Particles";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import MusicToggle from "@/components/MusicToggle";

// Below-the-fold sections are code-split so the first paint stays light.
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const AIVideoSection = lazy(() => import("@/components/AIVideoSection"));
const PortfolioSection = lazy(() => import("@/components/PortfolioSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const WhyMeSection = lazy(() => import("@/components/WhyMeSection"));
const VisionSection = lazy(() => import("@/components/VisionSection"));
const SocialSection = lazy(() => import("@/components/SocialSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const Footer = lazy(() => import("@/components/Footer"));

const Index = () => {
  const [loading, setLoading] = useState(true);

  if (loading) return <LoadingScreen onComplete={() => setLoading(false)} />;

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
        <Suspense fallback={<div className="py-24 text-center text-muted-foreground font-body text-sm">Loading…</div>}>
          <ServicesSection />
          <AIVideoSection />
          <PortfolioSection />
          <ProjectsSection />
          <ExperienceSection />
          <WhyMeSection />
          <VisionSection />
          <SocialSection />
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <WhatsAppButton />
      <MusicToggle />
    </div>
  );
};

export default Index;
