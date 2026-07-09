import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Film, Sparkles } from "lucide-react";
import InstagramEmbed from "./InstagramEmbed";

const FEATURED = "https://www.instagram.com/p/DaAyuGRoqFb/";

const GALLERY = [
  "https://www.instagram.com/p/DaSf25HIYcc/",
  "https://www.instagram.com/p/C8tl7cWoH4e/",
  "https://www.instagram.com/p/DaSlrNtlJF8/",
  "https://www.instagram.com/p/DaXvvBJCvo9/",
  "https://www.instagram.com/p/DaNbvIgj-s_/",
  "https://www.instagram.com/p/DaIR0sBim57/",
  "https://www.instagram.com/p/DZryk3NtKYV/",
  "https://www.instagram.com/p/DaFqao-E-Ui/",
  "https://www.instagram.com/p/DZ7VzNLAAba/",
  "https://www.instagram.com/p/DZubIZIjj60/",
];

const AIVideoSection = () => {
  const [index, setIndex] = useState(0);
  const perView = 1;
  const max = GALLERY.length - perView;
  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(max, i + 1));

  return (
    <section id="ai-videos" className="relative py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-neon-pink font-body">
            <Film className="w-3.5 h-3.5" /> AI Movie Creator Portfolio
          </span>
          <h2 className="section-title gradient-text mt-2">Cinematic AI films, made with prompts.</h2>
          <p className="text-foreground/70 font-body mt-4">
            Original short films and reels generated with cutting-edge AI video pipelines — direction, prompt engineering, editing & sound.
          </p>
        </motion.div>

        {/* Featured */}
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink rounded-2xl opacity-60 blur-xl" />
            <div className="relative glass-card rounded-2xl p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-neon-blue font-body">
                  <Sparkles className="w-3 h-3" /> Featured Film
                </span>
                <span className="text-[10px] tracking-widest uppercase text-muted-foreground">Now Playing</span>
              </div>
              <div className="rounded-xl overflow-hidden">
                <InstagramEmbed url={FEATURED} />
              </div>
            </div>
          </motion.div>

          <div className="space-y-4">
            {[
              { k: "Direction", v: "Concept, script & storyboard led end-to-end." },
              { k: "AI Pipeline", v: "Runway, Kling, Sora-style generators + custom prompts." },
              { k: "Post", v: "Edit, grade, sound design & motion polish." },
              { k: "Distribution", v: "Optimised for Reels, Shorts and cinematic verticals." },
            ].map((r, i) => (
              <motion.div
                key={r.k}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-xl p-4"
              >
                <div className="text-[10px] tracking-[0.3em] uppercase text-neon-purple font-body mb-1">{r.k}</div>
                <div className="text-sm text-foreground/85 font-body">{r.v}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gallery slider */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading text-2xl md:text-3xl text-foreground tracking-wider">More AI Films</h3>
          <div className="flex gap-2">
            <button
              onClick={prev}
              disabled={index === 0}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:text-neon-blue disabled:opacity-30 transition"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              disabled={index === max}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:text-neon-blue disabled:opacity-30 transition"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: `calc(${-index * 100}% - ${index * 24}px)` }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          >
            {GALLERY.map((url) => (
              <div key={url} className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)]">
                <div className="glass-card rounded-2xl p-3">
                  <InstagramEmbed url={url} />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center gap-1.5 mt-6">
          {GALLERY.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(Math.min(i, max))}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-neon-blue" : "w-1.5 bg-muted"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIVideoSection;
