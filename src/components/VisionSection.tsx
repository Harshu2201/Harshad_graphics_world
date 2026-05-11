import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const VisionSection = () => {
  return (
    <section id="vision" className="relative py-32 overflow-hidden">
      {/* Animated glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full opacity-20 blur-[140px]"
        style={{ background: "linear-gradient(135deg, hsl(var(--neon-blue)), hsl(var(--neon-purple)), hsl(var(--neon-pink)))" }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="section-container relative text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-neon-blue" />
          <span className="text-xs tracking-[0.3em] uppercase font-body text-foreground/80">Vision</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl lg:text-7xl font-heading leading-tight tracking-wider"
        >
          <span className="text-foreground/90">I aim to become a </span>
          <span className="gradient-text neon-text">next-generation AI entrepreneur</span>
          <span className="text-foreground/90">
            {" "}who combines creativity, business intelligence, and AI systems to build scalable
            digital solutions.
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex justify-center gap-3 flex-wrap"
        >
          {["Build", "Automate", "Scale", "Repeat"].map((w) => (
            <span
              key={w}
              className="px-4 py-2 rounded-full text-xs tracking-[0.25em] uppercase font-body glass-card text-foreground/80"
            >
              {w}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;
