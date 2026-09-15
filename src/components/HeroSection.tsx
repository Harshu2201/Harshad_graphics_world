import { motion } from "framer-motion";
import { ChevronDown, Sparkles, Film, Target, Bot } from "lucide-react";
import Hero3D from "./Hero3D";
import { trackButtonClick, trackCtaConversion } from "@/lib/analytics";


const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* 3D scene overlay */}
      <Hero3D />


      <div className="relative z-10 text-center px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-blue opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-blue" />
          </span>
          <span className="text-xs tracking-[0.25em] uppercase font-body text-foreground/80">
            AI Movie Creator · Social Media Manager
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mx-auto max-w-5xl text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-heading leading-[1.02] mb-6 text-balance"
        >
          <span className="block text-base sm:text-lg md:text-xl font-body font-semibold uppercase text-muted-foreground mb-3">
            Mr.
          </span>
          <span className="text-foreground">Harshad Harishchandra</span>{" "}
          <span className="gradient-text neon-text">Pakhale</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-base md:text-xl text-foreground/70 font-body font-light max-w-2xl mx-auto mb-4"
        >
          Cinematic <span className="text-neon-blue">AI videos</span>, high-performance{" "}
          <span className="text-neon-purple">social content</span> &{" "}
          <span className="text-neon-pink">Meta Ads</span> that convert.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm text-muted-foreground font-body italic mb-10"
        >
          AI Movie Creator · Social Media Manager · Meta Ads Strategist
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <a
            href="#contact"
            onClick={() => trackCtaConversion("Let's Build with AI", "#contact")}
            className="btn-neon text-primary-foreground inline-flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Let's Build with AI
          </a>
          <a
            href="#services"
            onClick={() => trackButtonClick("Explore Services", "hero")}
            className="btn-outline-neon"
          >
            Explore Services
          </a>

        </motion.div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="grid grid-cols-3 gap-4 max-w-2xl mx-auto"
        >
          {[
            { icon: Film, label: "AI Films", value: "40+" },
            { icon: Bot, label: "Brands Managed", value: "6" },
            { icon: Target, label: "Meta Ads ROAS", value: "5x+" },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-xl p-4">
              <s.icon className="w-5 h-5 text-neon-blue mx-auto mb-1" />
              <div className="font-heading text-2xl gradient-text">{s.value}</div>
              <div className="text-[10px] tracking-widest uppercase text-muted-foreground font-body">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-[10px] tracking-widest text-muted-foreground font-body">SCROLL</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5 text-neon-blue" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
