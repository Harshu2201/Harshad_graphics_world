import { motion } from "framer-motion";
import {
  Brain, Briefcase, Lightbulb, Users, Puzzle, Zap, Cog, Rocket,
} from "lucide-react";
import profileImg from "@/assets/profile.jpg";

const traits = [
  { icon: Brain, label: "AI Generalist" },
  { icon: Briefcase, label: "Business Strategy" },
  { icon: Lightbulb, label: "Creative Thinking" },
  { icon: Users, label: "Team Leadership" },
  { icon: Puzzle, label: "Problem Solving" },
  { icon: Zap, label: "Fast Execution" },
  { icon: Cog, label: "Automation Thinking" },
  { icon: Rocket, label: "Startup Mindset" },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative py-24 overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 max-w-3xl"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-neon-blue font-body">About</span>
          <h2 className="section-title gradient-text mt-2">Where AI meets execution.</h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Profile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 relative mx-auto"
          >
            <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden gradient-border">
              <img src={profileImg} alt="Harshad Pakhale" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="glass-card rounded-lg px-3 py-2">
                  <p className="text-xs text-muted-foreground font-body">Based in India · Available Worldwide</p>
                </div>
              </div>
            </div>
            <div
              className="absolute -inset-6 rounded-2xl opacity-30 blur-3xl -z-10"
              style={{ background: "linear-gradient(135deg, hsl(var(--neon-blue)), hsl(var(--neon-purple)))" }}
            />
          </motion.div>

          {/* Bio + traits */}
          <div className="lg:col-span-3 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4 text-base md:text-lg text-foreground/80 font-body leading-relaxed"
            >
              <p>
                I'm an <span className="text-neon-blue">AI Generalist</span> and{" "}
                <span className="text-neon-purple">Creative Strategist</span> passionate about
                building modern digital solutions using AI tools, business thinking, and
                creative execution.
              </p>
              <p>
                My expertise goes beyond graphic design — I help brands with AI-powered content,
                automation, business strategy, digital growth, and rapid execution. From
                impactful visuals in Canva to solving operational and marketing challenges with
                AI, I work at the intersection of creativity, technology, and business.
              </p>
              <p className="text-foreground">
                The future belongs to people who can combine{" "}
                <span className="gradient-text font-semibold">AI with execution</span> — and
                that's exactly what I do.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {traits.map((t, i) => (
                <motion.div
                  key={t.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="glass-card rounded-xl p-3 text-center group"
                >
                  <t.icon className="w-5 h-5 text-neon-blue mx-auto mb-2 group-hover:text-neon-pink transition-colors" />
                  <p className="text-xs font-body text-foreground/80">{t.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
