import { motion } from "framer-motion";
import { Sparkles, Palette, Brain, Share2 } from "lucide-react";
import profileImg from "@/assets/profile.jpg";

const skills = [
  { icon: Palette, title: "Graphics Designer", desc: "2+ Years of Experience" },
  { icon: Brain, title: "AI Tools Expert", desc: "Veo 3, Midjourney & More" },
  { icon: Sparkles, title: "Prompt Engineering", desc: "Specialist in AI Prompts" },
  { icon: Share2, title: "Social Media Manager", desc: "Strategy & Growth" },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="section-title gradient-text mb-16"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mx-auto"
          >
            <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-2xl overflow-hidden gradient-border">
              <img src={profileImg} alt="Harshad Pakhale" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
            <div className="absolute -inset-4 rounded-2xl opacity-30 blur-2xl -z-10"
              style={{ background: "linear-gradient(135deg, hsl(var(--neon-blue)), hsl(var(--neon-purple)))" }} />
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass-card rounded-xl p-5 cursor-default group"
              >
                <skill.icon className="w-8 h-8 text-neon-blue mb-3 group-hover:text-neon-pink transition-colors duration-300" />
                <h3 className="font-heading text-xl text-foreground">{skill.title}</h3>
                <p className="text-sm text-muted-foreground font-body">{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
