import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Film as FilmIcon, Sparkles, X } from "lucide-react";
import FilmCard from "./FilmCard";
import { films, filmCategories, type FilmCategory } from "@/data/films";
import { trackVideoPlay, trackButtonClick } from "@/lib/analytics";


const AIVideoSection = () => {
  const [active, setActive] = useState<"All" | FilmCategory>("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const visible = active === "All" ? films : films.filter((f) => f.category === active);
  const featured = films[0];
  const opened = films.find((f) => f.id === openId) ?? null;

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  return (
    <section id="ai-videos" className="relative py-24" aria-labelledby="ai-videos-title">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-neon-pink font-body">
            <FilmIcon className="w-3.5 h-3.5" aria-hidden /> AI Movie Creator Portfolio
          </span>
          <h2 id="ai-videos-title" className="section-title gradient-text mt-2">
            Cinematic AI films, made with prompts.
          </h2>
          <p className="text-foreground/70 font-body mt-4">
            Original short films and reels generated with AI video pipelines — direction, prompt
            engineering, editing and sound. Every clip below streams from my own library, so it plays
            instantly without third-party embeds.
          </p>
        </motion.div>

        {/* Featured film */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink rounded-2xl opacity-60 blur-xl" aria-hidden />
            <div className="relative glass-card rounded-2xl p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-neon-blue font-body">
                  <Sparkles className="w-3 h-3" aria-hidden /> Featured Film
                </span>
                <span className="text-[10px] tracking-widest uppercase text-muted-foreground">
                  {featured.category}
                </span>
              </div>
              <video
                src={featured.src}
                poster={featured.poster}
                controls
                playsInline
                preload="metadata"
                onPlay={() => trackVideoPlay(featured.title, "Featured")}
                className="w-full max-w-xs max-h-[70vh] rounded-xl bg-muted/40 object-contain mx-auto"
                aria-label={`${featured.title} — featured AI film`}
              />

            </div>
          </motion.div>

          <div className="space-y-4">
            {[
              { k: "Direction", v: "Concept, script and storyboard led end-to-end." },
              { k: "AI Pipeline", v: "Runway, Kling and Sora-style generators with custom prompts." },
              { k: "Post", v: "Edit, grade, sound design and motion polish." },
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

        {/* Category filter */}
        <div className="flex flex-wrap gap-3 mb-8" role="group" aria-label="Filter AI films by category">
          {filmCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActive(cat);
                trackButtonClick(`Film filter: ${cat}`, "ai_films");
              }}

              aria-pressed={active === cat}
              className={`px-4 min-h-11 rounded-full text-sm font-body transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                active === cat
                  ? "btn-neon text-primary-foreground"
                  : "glass-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((film) => (
              <FilmCard key={film.id} film={film} onOpen={() => setOpenId(film.id)} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${opened.title} full screen player`}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md p-4"
            onClick={() => setOpenId(null)}
          >
            <button
              type="button"
              onClick={() => setOpenId(null)}
              aria-label="Close player"
              className="absolute top-4 right-4 min-h-11 min-w-11 rounded-full glass-card flex items-center justify-center text-foreground hover:text-neon-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="w-5 h-5" />
            </button>
            <video
              key={opened.id}
              src={opened.src}
              poster={opened.poster}
              controls
              autoPlay
              playsInline
              onPlay={() => trackVideoPlay(opened.title, opened.category)}
              className="max-h-[88vh] max-w-full rounded-xl neon-glow"
              onClick={(e) => e.stopPropagation()}
            />

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AIVideoSection;
