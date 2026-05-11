import { motion } from "framer-motion";
import { Building2, Rocket, Palette, Bot } from "lucide-react";

const experiences = [
  {
    icon: Building2,
    role: "Design & Strategy Lead",
    org: "Xplorevo Pvt Ltd",
    period: "2024 — Present",
    desc: "Driving brand visuals, content systems, and AI-assisted execution for Xplorevo and XTN.",
    tags: ["Branding", "AI Content", "Strategy"],
  },
  {
    icon: Rocket,
    role: "Startup Collaborations",
    org: "Multiple Early-Stage Ventures",
    period: "2023 — Present",
    desc: "Partnering with founders on positioning, creative, and AI-driven go-to-market execution.",
    tags: ["GTM", "Positioning", "Growth"],
  },
  {
    icon: Palette,
    role: "Freelance Creative Projects",
    org: "Independent",
    period: "2023 — Present",
    desc: "End-to-end visual identity, social design, and presentation systems for brands and creators.",
    tags: ["Canva", "Identity", "Social"],
  },
  {
    icon: Bot,
    role: "AI-driven Execution Work",
    org: "AI Generalist Practice",
    period: "2024 — Present",
    desc: "Designing AI workflows, content engines, and automation systems using modern AI tools.",
    tags: ["ChatGPT", "Automation", "Workflows"],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="relative py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 max-w-3xl"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-neon-blue font-body">Experience</span>
          <h2 className="section-title gradient-text mt-2">Selected work & roles.</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {experiences.map((e, i) => (
            <motion.div
              key={e.role}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-2xl p-6 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 border border-border flex items-center justify-center">
                  <e.icon className="w-5 h-5 text-neon-blue group-hover:text-neon-pink transition-colors" />
                </div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground font-body">
                  {e.period}
                </span>
              </div>
              <h3 className="font-heading text-2xl text-foreground tracking-wider">{e.role}</h3>
              <p className="text-sm text-neon-purple font-body font-medium mb-3">{e.org}</p>
              <p className="text-sm text-foreground/70 font-body mb-4">{e.desc}</p>
              <div className="flex flex-wrap gap-2">
                {e.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-body bg-muted/40 border border-border text-foreground/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
