import { motion } from "framer-motion";
import { Bot, Palette, TrendingUp, Code2 } from "lucide-react";

const groups = [
  {
    title: "AI & Productivity",
    icon: Bot,
    color: "from-neon-blue to-neon-cyan",
    items: ["ChatGPT", "Gemini", "Claude", "Canva AI", "Lovable", "Perplexity", "Notion AI"],
  },
  {
    title: "Creative",
    icon: Palette,
    color: "from-neon-purple to-neon-pink",
    items: ["Canva", "Branding", "Social Media Design", "Presentation Design"],
  },
  {
    title: "Business & Marketing",
    icon: TrendingUp,
    color: "from-neon-pink to-neon-purple",
    items: [
      "Business Development",
      "Startup Strategy",
      "Marketing Thinking",
      "Client Handling",
      "Team Coordination",
    ],
  },
  {
    title: "Tech & Execution",
    icon: Code2,
    color: "from-neon-cyan to-neon-blue",
    items: [
      "AI-assisted Coding",
      "GitHub",
      "Vercel",
      "Workflow Systems",
      "Automation Thinking",
    ],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="relative py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 max-w-3xl"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-neon-blue font-body">Skills</span>
          <h2 className="section-title gradient-text mt-2">A modern multi-stack toolkit.</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-2xl p-6 group relative overflow-hidden"
            >
              <div
                className={`absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-20 blur-3xl bg-gradient-to-br ${g.color}`}
              />
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${g.color} flex items-center justify-center`}>
                  <g.icon className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="font-heading text-2xl text-foreground tracking-wider">{g.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-full text-xs font-body bg-muted/40 border border-border text-foreground/80 hover:border-neon-purple hover:text-foreground transition-colors"
                  >
                    {item}
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

export default SkillsSection;
