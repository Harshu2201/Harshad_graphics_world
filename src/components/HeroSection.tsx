import { motion } from "framer-motion";
import { ChevronDown, Sparkles, Film, Target, Bot } from "lucide-react";
import Hero3D from "./Hero3D";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsla(var(--neon-purple)/0.15),transparent_60%)]" />
        <motion.div
          className="absolute top-1/4 -left-32 w-[28rem] h-[28rem] rounded-full opacity-25 blur-[120px]"
          style={{ background: "hsl(var(--neon-blue))" }}
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 -right-32 w-[28rem] h-[28rem] rounded-full opacity-25 blur-[120px]"
          style={{ background: "hsl(var(--neon-purple))" }}
          animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--neon-blue)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--neon-blue)) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          }}
        />
      </div>

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
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-heading leading-[0.95] mb-6"
        >
          <span className="text-foreground">Harshad</span>{" "}
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
          <a href="#contact" className="btn-neon text-primary-foreground inline-flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" /> Let's Build with AI
          </a>
          <a href="#services" className="btn-outline-neon">Explore Services</a>
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
