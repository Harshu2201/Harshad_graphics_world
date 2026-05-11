import { motion } from "framer-motion";
import { Layers, Brain, Bot, Zap, Rocket } from "lucide-react";

const points = [
  { icon: Layers, title: "Multi-domain adaptability", desc: "Design, AI, business, and execution under one roof." },
  { icon: Brain, title: "Strategic thinking", desc: "Solutions framed around outcomes, not tasks." },
  { icon: Bot, title: "AI-first mindset", desc: "Modern AI tools embedded into every workflow." },
  { icon: Zap, title: "Fast execution", desc: "Founder-grade speed with shipping discipline." },
  { icon: Rocket, title: "Startup understanding", desc: "Built for ambiguity, growth, and zero-to-one work." },
];

const WhyMeSection = () => {
  return (
    <section id="why-me" className="relative py-24">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-neon-blue font-body">Why Work With Me</span>
            <h2 className="section-title gradient-text mt-2 mb-6">Strategy. Creativity. AI.</h2>
            <p className="text-lg md:text-xl text-foreground/80 font-body leading-relaxed">
              "I don't just design. I understand business problems and use{" "}
              <span className="text-neon-blue">AI</span>,{" "}
              <span className="text-neon-purple">creativity</span>, and{" "}
              <span className="text-neon-pink">strategy</span> to solve them quickly."
            </p>
          </motion.div>

          <div className="space-y-3">
            {points.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ x: 4 }}
                className="glass-card rounded-xl p-5 flex items-start gap-4 group"
              >
                <div className="w-10 h-10 shrink-0 rounded-lg bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-border flex items-center justify-center">
                  <p.icon className="w-5 h-5 text-neon-blue group-hover:text-neon-pink transition-colors" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-foreground tracking-wider">{p.title}</h3>
                  <p className="text-sm text-foreground/70 font-body">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyMeSection;
