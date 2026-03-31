import { motion } from "framer-motion";

const experiences = [
  { role: "Graphics Designer", org: "2+ Years Experience", period: "2023 - Present", desc: "Creating cinematic visuals, branding, and social media content." },
  { role: "AI Content Creator", org: "Freelance & Projects", period: "2024 - Present", desc: "Leveraging Midjourney, Veo 3, and prompt engineering for AI-generated art." },
  { role: "Social Media Manager", org: "E-Cell MESWCOE", period: "2024 - 2025", desc: "Managing content strategy and visual identity for E-Cell." },
  { role: "Design Lead", org: "Xplorevo Pvt Ltd & XTN", period: "2024 - Present", desc: "Leading visual design for Xplorevo and Xplorevo Tech Network." },
  { role: "EIC Member", org: "EIC 2024-25", period: "2024 - 2025", desc: "Contributing to the Entrepreneurship and Innovation Cell." },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="relative py-24">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="section-title gradient-text mb-16"
        >
          Experience
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.role}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative flex ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"} mb-12 pl-12 md:pl-0`}
            >
              {/* Dot */}
              <div className="absolute left-2.5 md:left-1/2 md:-translate-x-1/2 top-6 w-3 h-3 rounded-full bg-neon-blue neon-glow z-10" />

              <div className={`glass-card rounded-xl p-6 md:w-[45%] group hover:neon-glow transition-shadow duration-300`}>
                <span className="text-xs text-neon-blue font-body tracking-wider">{exp.period}</span>
                <h3 className="font-heading text-2xl text-foreground mt-1">{exp.role}</h3>
                <p className="text-sm text-neon-purple font-body font-medium">{exp.org}</p>
                <p className="text-sm text-muted-foreground font-body mt-2">{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
