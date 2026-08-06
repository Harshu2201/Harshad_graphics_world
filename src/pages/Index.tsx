import { Suspense, lazy, useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MusicToggle from "@/components/MusicToggle";
import { initAnalytics } from "@/lib/analytics";

// Everything below the fold is split out of the initial bundle.
const Particles = lazy(() => import("@/components/Particles"));
const AIVideoSection = lazy(() => import("@/components/AIVideoSection"));
const PortfolioSection = lazy(() => import("@/components/PortfolioSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const WhyMeSection = lazy(() => import("@/components/WhyMeSection"));
const VisionSection = lazy(() => import("@/components/VisionSection"));
const SocialSection = lazy(() => import("@/components/SocialSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

const SectionFallback = () => <div aria-hidden="true" className="min-h-[40vh]" />;

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initAnalytics();
  }, []);

  if (loading) return <LoadingScreen onComplete={() => setLoading(false)} />;

  return (
    <div className="relative min-h-dvh bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:font-body focus:text-sm focus:text-primary-foreground"
      >
        Skip to main content
      </a>

      <Suspense fallback={null}>
        <Particles />
      </Suspense>

      <Navbar />

      <main id="main">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ServicesSection />
        <Suspense fallback={<SectionFallback />}>
          <AIVideoSection />
          <PortfolioSection />
          <ProjectsSection />
          <ExperienceSection />
          <WhyMeSection />
          <VisionSection />
          <SocialSection />
          <FAQSection />
          <ContactSection />
        </Suspense>
      </main>

      <Footer />
      <WhatsAppButton />
      <MusicToggle />
    </div>
  );
};

export default Index;
