import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Film as FilmIcon, Play, Sparkles } from "lucide-react";
import { FILM_CATEGORIES, featuredFilm, films, type Film } from "@/data/films";
import VideoLightbox from "./VideoLightbox";
import InstagramEmbed from "./InstagramEmbed";
import { track } from "@/lib/analytics";

const FILTERS = ["All", ...FILM_CATEGORIES] as const;

const AIVideoSection = () => {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? films : films.filter((f) => f.category === filter)),
    [filter],
  );

  const open = (i: number, film: Film) => {
    setOpenIndex(i);
    track("film_open", { title: film.title, category: film.category });
  };

  return (
    <section id="ai-videos" aria-labelledby="ai-videos-heading" className="relative py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.3em] text-neon-pink">
            <FilmIcon className="h-3.5 w-3.5" aria-hidden="true" /> AI Movie Creator Portfolio
          </span>
          <h2 id="ai-videos-heading" className="section-title gradient-text mt-2">
            Cinematic AI films, made with prompts.
          </h2>
          <p className="mt-4 font-body text-foreground/70">
            Original short films, commercials and reels generated with cutting-edge AI video pipelines —
            direction, prompt engineering, editing and sound design.
          </p>
        </motion.div>

        {/* Featured film */}
        <div className="mb-16 grid items-start gap-8 lg:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink opacity-60 blur-xl"
            />
            <div className="relative rounded-2xl glass-card p-4 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.3em] text-neon-blue">
                  <Sparkles className="h-3 w-3" aria-hidden="true" /> Featured Film
                </span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {featuredFilm.category}
                </span>
              </div>
              <div className="overflow-hidden rounded-xl">
                <video
                  src={featuredFilm.src}
                  poster={featuredFilm.poster}
                  controls
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-label={`${featuredFilm.title}, featured AI film`}
                  onPlay={() => track("video_play", { title: featuredFilm.title, placement: "featured" })}
                  className="aspect-video w-full rounded-xl bg-black object-cover"
                />
              </div>
              <p className="mt-4 font-body text-sm text-foreground/70">{featuredFilm.description}</p>
            </div>
          </motion.div>

          <div className="space-y-4">
            {[
              { k: "Direction", v: "Concept, script and storyboard led end-to-end." },
              { k: "AI Pipeline", v: "Runway, Kling and Sora-style generators with custom prompt systems." },
              { k: "Post", v: "Edit, colour grade, sound design and motion polish." },
              { k: "Distribution", v: "Optimised for Reels, Shorts and cinematic verticals." },
            ].map((r, i) => (
              <motion.div
                key={r.k}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl glass-card p-4"
              >
                <div className="mb-1 font-body text-[10px] uppercase tracking-[0.3em] text-neon-purple">{r.k}</div>
                <div className="font-body text-sm text-foreground/85">{r.v}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h3 className="font-heading text-2xl tracking-wider text-foreground md:text-3xl">The Full Reel</h3>
          <div role="group" aria-label="Filter films by category" className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => {
                  setFilter(f);
                  track("film_filter", { category: f });
                }}
                className={`min-h-11 rounded-full px-4 font-body text-sm transition-all duration-300 ${
                  filter === f
                    ? "btn-neon text-primary-foreground"
                    : "glass-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <ul className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((film, i) => (
            <motion.li
              key={film.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i, 6) * 0.05 }}
            >
              {film.src ? (
                <button
                  type="button"
                  onClick={() => open(i, film)}
                  className="group relative block w-full overflow-hidden rounded-2xl glass-card p-2 text-left transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
                    <img
                      src={film.poster}
                      alt={`${film.title} — ${film.category} still frame`}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      <span className="flex h-14 w-14 items-center justify-center rounded-full glass-card neon-glow">
                        <Play className="h-5 w-5 text-foreground" />
                      </span>
                    </span>
                  </div>
                  <div className="px-2 py-3">
                    <p className="font-heading text-lg tracking-wide text-foreground">{film.title}</p>
                    <p className="font-body text-[10px] uppercase tracking-[0.25em] text-neon-blue">{film.category}</p>
                  </div>
                </button>
              ) : (
                <div className="rounded-2xl glass-card p-3">
                  <InstagramEmbed url={film.instagramUrl!} />
                </div>
              )}
            </motion.li>
          ))}
        </ul>
      </div>

      <VideoLightbox
        film={openIndex !== null ? visible[openIndex] ?? null : null}
        onClose={() => setOpenIndex(null)}
        onPrev={() => setOpenIndex((i) => (i === null ? i : Math.max(0, i - 1)))}
        onNext={() => setOpenIndex((i) => (i === null ? i : Math.min(visible.length - 1, i + 1)))}
        hasPrev={openIndex !== null && openIndex > 0}
        hasNext={openIndex !== null && openIndex < visible.length - 1}
      />
    </section>
  );
};

export default AIVideoSection;
