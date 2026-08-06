import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Portfolio3DCarousel from "./Portfolio3DCarousel";
import { track } from "@/lib/analytics";

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
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<Element | null>(null);

  const filtered = useMemo(
    () => (activeCategory === "All" ? portfolioItems : portfolioItems.filter((p) => p.category === activeCategory)),
    [activeCategory],
  );

  const navigate = useCallback(
    (dir: number) => {
      setSelectedIndex((cur) => {
        if (cur === null) return cur;
        const next = cur + dir;
        return next >= 0 && next < filtered.length ? next : cur;
      });
    },
    [filtered.length],
  );

  useEffect(() => {
    if (selectedIndex === null) return;
    restoreRef.current = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      (restoreRef.current as HTMLElement | null)?.focus?.();
    };
  }, [navigate, selectedIndex]);

  return (
    <section id="portfolio" aria-labelledby="portfolio-heading" className="relative py-24">
      <div className="section-container">
        <motion.h2
          id="portfolio-heading"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="section-title gradient-text mb-4"
        >
          Portfolio
        </motion.h2>
        <p className="mb-10 max-w-2xl font-body text-foreground/70">
          Posters, brand systems, social creatives and AI-generated art — drag the carousel or browse the full grid.
        </p>

        {/* 3D carousel */}
        <div className="mb-16">
          <Portfolio3DCarousel
            items={filtered.map(({ src, title, category }) => ({ src, title, category }))}
            onSelect={(i) => {
              setSelectedIndex(i);
              track("portfolio_open", { title: filtered[i]?.title, source: "carousel" });
            }}
          />
        </div>

        {/* Filter */}
        <div role="group" aria-label="Filter portfolio by category" className="mb-8 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={activeCategory === cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedIndex(null);
                track("portfolio_filter", { category: cat });
              }}
              className={`min-h-11 rounded-full px-4 font-body text-sm transition-all duration-300 ${
                activeCategory === cat ? "btn-neon text-primary-foreground" : "glass-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        <ul className="grid list-none auto-rows-[200px] grid-cols-2 gap-4 p-0 md:grid-cols-3">
          {filtered.map((item, i) => (
            <motion.li
              key={item.src}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i, 8) * 0.04 }}
              className={item.h}
            >
              <button
                type="button"
                onClick={() => {
                  setSelectedIndex(i);
                  track("portfolio_open", { title: item.title, source: "grid" });
                }}
                className="group relative block size-full overflow-hidden rounded-xl"
              >
                <img
                  src={item.src}
                  alt={`${item.title} — ${item.category}`}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 flex items-end bg-gradient-to-t from-background/90 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-left">
                    <span className="block font-heading text-xl text-foreground">{item.title}</span>
                    <span className="block font-body text-xs text-neon-blue">{item.category}</span>
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-xl border border-transparent transition-colors duration-300 group-hover:border-neon-blue/30"
                />
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && filtered[selectedIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${filtered[selectedIndex].title} — ${filtered[selectedIndex].category}`}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close image viewer"
              className="absolute right-6 top-6 flex min-h-11 min-w-11 items-center justify-center rounded-full text-foreground transition-colors hover:text-neon-pink"
            >
              <X className="h-7 w-7" />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              disabled={selectedIndex === 0}
              aria-label="Previous image"
              className="absolute left-4 flex min-h-11 min-w-11 items-center justify-center text-foreground transition-colors hover:text-neon-blue disabled:opacity-30 md:left-8"
            >
              <ChevronLeft className="h-9 w-9" />
            </button>
            <motion.img
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              src={filtered[selectedIndex].src}
              alt={`${filtered[selectedIndex].title} — ${filtered[selectedIndex].category}`}
              className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain neon-glow"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              disabled={selectedIndex === filtered.length - 1}
              aria-label="Next image"
              className="absolute right-4 flex min-h-11 min-w-11 items-center justify-center text-foreground transition-colors hover:text-neon-blue disabled:opacity-30 md:right-8"
            >
              <ChevronRight className="h-9 w-9" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;
