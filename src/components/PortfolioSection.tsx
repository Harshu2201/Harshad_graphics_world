import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const portfolioItems = [
  { src: "https://lh3.googleusercontent.com/d/1-UGPuAl_Ej_BYqeh9LzFS6Hw5JZsGiDk", title: "Cinematic Poster", category: "Posters", h: "row-span-2" },
  { src: "https://lh3.googleusercontent.com/d/1lBxkVTENVoulOJMWSB4MBZR-acVTn9wv", title: "Brand Identity", category: "Branding", h: "" },
  { src: "https://lh3.googleusercontent.com/d/1tKAjFcUlXetvjWMlVO9C7d5BoUXVtWKa", title: "Social Creative", category: "Social Media Creatives", h: "" },
  { src: "https://lh3.googleusercontent.com/d/1-da91ToQBEjqiH36lclmZTV7qq9RwjOL", title: "AI Art", category: "AI Generated", h: "row-span-2" },
  { src: "https://lh3.googleusercontent.com/d/1ORn-4pxNVJJ-SNgJwsUMAnYqTtO2e9kA", title: "Creative Poster", category: "Posters", h: "row-span-2" },
  { src: "https://lh3.googleusercontent.com/d/1KgoIx0koGu0g2IT76IQvdk3C206tK1hg", title: "Event Design", category: "Social Media Creatives", h: "" },
  { src: "https://lh3.googleusercontent.com/d/1yLbECGP8R7khLlAhw5q8BZcr8FLpy5To", title: "Visual Story", category: "Branding", h: "" },
  { src: "https://lh3.googleusercontent.com/d/1jRigCPXgCcif5qnQsmPAr1GiDHFsLJWt", title: "AI Cyberpunk", category: "AI Generated", h: "row-span-2" },
  { src: "https://lh3.googleusercontent.com/d/1uYEY1HiyoyLAvN25OyjOqYO6DHdth4yT", title: "Magazine Cover", category: "Posters", h: "" },
  { src: "https://lh3.googleusercontent.com/d/1xpu9EfyIGdY2g6752MQ-sNsDDveKuR3i", title: "Brand Collateral", category: "Branding", h: "" },
  { src: "https://lh3.googleusercontent.com/d/1zmCRpCYcaVXdl0K4rrPMsSbaPlCW_l6s", title: "Social Post", category: "Social Media Creatives", h: "row-span-2" },
  { src: "https://lh3.googleusercontent.com/d/1lwbT06lEoByn-PI2o94-JnaMWXXZV5Wg", title: "AI Render", category: "AI Generated", h: "" },
  { src: "https://lh3.googleusercontent.com/d/1--_NuECbvnjFkUs-bW1R4tTHW5hXbGSE", title: "Film Poster", category: "Posters", h: "" },
  { src: "https://lh3.googleusercontent.com/d/1wO10B9gguq115ri9Q753ihAIKpoHGv8N", title: "Creative Campaign", category: "Social Media Creatives", h: "row-span-2" },
  { src: "https://lh3.googleusercontent.com/d/1f-VLpubg72IzJhZErv6CLmsuwq0x8tsH", title: "Brand Concept", category: "Branding", h: "" },
  { src: "https://lh3.googleusercontent.com/d/1kNw8zJ5DDUOg4XqBt_arl-RCs2NWojNS", title: "AI Vision", category: "AI Generated", h: "" },
  { src: "https://lh3.googleusercontent.com/d/1f4oZ_WWBa97gjxqLsc90awBQZDNd7Eg8b4", title: "Visual Design", category: "Posters", h: "" },
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
              key={item.src}
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
