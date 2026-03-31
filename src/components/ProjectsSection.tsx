import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const projects = [
  { title: "Student Rebel", subtitle: "Xplorevo Pvt Ltd" },
  { title: "Magazine", subtitle: "Xplorevo Story" },
  { title: "E-Cell MESWCOE", subtitle: "Annual Report" },
  { title: "E-Cell Magazine", subtitle: "Entrepreneurship Edition" },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="section-title gradient-text mb-16"
        >
          Projects
        </motion.h2>

        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10, rotateY: 5 }}
              className="glass-card rounded-2xl p-6 min-w-[280px] snap-center cursor-pointer group neon-glow"
              style={{ perspective: "1000px" }}
            >
              <div className="w-full h-40 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center mb-5">
                <BookOpen className="w-12 h-12 text-neon-blue group-hover:text-neon-pink transition-colors duration-300" />
              </div>
              <h3 className="font-heading text-2xl text-foreground">{project.title}</h3>
              <p className="text-sm text-muted-foreground font-body">{project.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
