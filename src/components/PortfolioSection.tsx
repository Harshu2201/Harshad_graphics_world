import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";
import p5 from "@/assets/portfolio-5.jpg";
import p6 from "@/assets/portfolio-6.jpg";

const portfolioItems = [
  { src: p1, title: "Cinematic Poster", category: "Posters", h: "row-span-2" },
  { src: p2, title: "Brand Identity", category: "Branding", h: "" },
  { src: p3, title: "Social Media Creatives", category: "Social Media Creatives", h: "" },
  { src: p4, title: "AI Cyberpunk Art", category: "AI Generated", h: "row-span-2" },
  { src: p5, title: "Magazine Cover", category: "Posters", h: "row-span-2" },
  { src: p6, title: "Event Poster", category: "Social Media Creatives", h: "" },
];

const categories = ["All", "Posters", "Branding", "Social Media Creatives", "AI Generated"];

const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filtered = activeCategory === "All" ? portfolioItems : portfolioItems.filter((p) => p.category === activeCategory);

  const navigate = (dir: number) => {
    if (selectedIndex === null) return;
    const next = selectedIndex + dir;
    if (next >= 0 && next < filtered.length) setSelectedIndex(next);
  };

  return (
    <section id="portfolio" className="relative py-24">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="section-title gradient-text mb-6"
        >
          Portfolio
        </motion.h2>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-body transition-all duration-300 ${
                activeCategory === cat ? "btn-neon text-primary-foreground" : "glass-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
          {filtered.map((item, i) => (
            <motion.div
              key={item.title}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: i * 0.05 }}
              className={`relative rounded-xl overflow-hidden cursor-pointer group ${item.h}`}
              onClick={() => setSelectedIndex(i)}
            >
              <img src={item.src} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <p className="font-heading text-xl text-foreground">{item.title}</p>
                  <p className="text-xs text-neon-blue font-body">{item.category}</p>
                </div>
              </div>
              <div className="absolute inset-0 border border-transparent group-hover:border-neon-blue/30 rounded-xl transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md"
            onClick={() => setSelectedIndex(null)}
          >
            <button onClick={() => setSelectedIndex(null)} className="absolute top-6 right-6 text-foreground hover:text-neon-pink transition-colors">
              <X className="w-8 h-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-4 md:left-8 text-foreground hover:text-neon-blue transition-colors"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <motion.img
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={filtered[selectedIndex].src}
              alt={filtered[selectedIndex].title}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl neon-glow"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-4 md:right-8 text-foreground hover:text-neon-blue transition-colors"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;
