import { motion } from "framer-motion";
import { BookOpen, ExternalLink } from "lucide-react";

const projects = [
  { title: "Student Rebel", subtitle: "Xplorevo Pvt Ltd", link: "https://drive.google.com/file/d/1f4oZ_WWBa97gjxqLscawBQZDNd7Eg8b4/view" },
  { title: "Xplorevo Pvt Ltd", subtitle: "Company Magazine", link: "https://drive.google.com/file/d/1WAo6g4Q_RbVHC3EMO7Coe3K1ETGjbBZy/view" },
  { title: "Xplorevo Story", subtitle: "Brand Story", link: "https://drive.google.com/file/d/1s4a_pYFXVv4u3o96MtgA03_k0G2-_mac/view" },
  { title: "E-Cell MESWCOE", subtitle: "Annual Report", link: "https://drive.google.com/file/d/1SsJM1Z8GhnQ-Z40drFc2DrUP62bfY8Lv/view" },
  { title: "E-Cell Magazine", subtitle: "Entrepreneurship Edition", link: "https://drive.google.com/file/d/1ii0QOaXXlKyXFb68wWdUNll_NOYRXWFs/view" },
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
          Magazines & Projects
        </motion.h2>

        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10, rotateY: 5 }}
              className="glass-card rounded-2xl p-6 min-w-[280px] snap-center cursor-pointer group neon-glow block"
              style={{ perspective: "1000px" }}
            >
              <div className="w-full h-40 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center mb-5 relative">
                <BookOpen className="w-12 h-12 text-neon-blue group-hover:text-neon-pink transition-colors duration-300" />
                <ExternalLink className="w-5 h-5 text-muted-foreground absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="font-heading text-2xl text-foreground">{project.title}</h3>
              <p className="text-sm text-muted-foreground font-body">{project.subtitle}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
