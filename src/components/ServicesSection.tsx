import { motion } from "framer-motion";
import {
  Brain, Palette, Briefcase, Bot, Rocket, Cog, TrendingUp, ArrowUpRight,
} from "lucide-react";

const services = [
  { icon: Brain, title: "AI Consultation", desc: "Identify the right AI tools and workflows for your business." },
  { icon: Palette, title: "Creative Branding", desc: "Visual identity, social design, and brand systems that convert." },
  { icon: Briefcase, title: "Business Strategy", desc: "Frameworks to position, prioritize, and scale your operations." },
  { icon: Bot, title: "AI Content Systems", desc: "Build repeatable content engines powered by modern AI stacks." },
  { icon: Rocket, title: "Startup Support", desc: "From zero-to-one execution help for early-stage founders." },
  { icon: Cog, title: "Automation Ideas", desc: "Streamline operations with smart, low-code automations." },
  { icon: TrendingUp, title: "Digital Growth Strategy", desc: "Performance, content, and AI-led growth blueprints." },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 max-w-3xl"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-neon-blue font-body">Services</span>
          <h2 className="section-title gradient-text mt-2">Premium, AI-first offerings.</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <motion.a
              key={s.title}
              href="#contact"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-2xl p-6 group relative overflow-hidden block"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(135deg, hsla(var(--neon-blue)/0.08), hsla(var(--neon-purple)/0.08))" }}
              />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-border flex items-center justify-center">
                    <s.icon className="w-6 h-6 text-neon-blue group-hover:text-neon-pink transition-colors" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-neon-blue group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-heading text-2xl text-foreground tracking-wider mb-2">{s.title}</h3>
                <p className="text-sm text-foreground/70 font-body leading-relaxed">{s.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
