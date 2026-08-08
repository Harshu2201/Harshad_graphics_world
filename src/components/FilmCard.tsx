import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import type { Film } from "@/data/films";
import { trackVideoPlay, trackButtonClick } from "@/lib/analytics";


interface FilmCardProps {
  film: Film;
  onOpen: () => void;
}

/**
 * Lightweight film card: poster-first, video source attached only once the card
 * is near the viewport so the page never downloads video it doesn't need.
 */
const FilmCard = ({ film, onOpen }: FilmCardProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <motion.article
      ref={wrapRef}
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      className="group relative glass-card rounded-2xl overflow-hidden"
    >
      <div className="relative aspect-[9/16] bg-muted/40">
        {inView ? (
          <video
            ref={videoRef}
            src={film.src}
            poster={film.poster}
            muted={muted}
            loop
            playsInline
            preload="none"
            className="size-full object-cover"
            onPlay={() => {
              setPlaying(true);
              trackVideoPlay(film.title, film.category);
            }}
            onPause={() => setPlaying(false)}
          />

        ) : (
          <img
            src={film.poster}
            alt={`${film.title} — AI film still`}
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
        )}

        {/* Controls */}
        <div className="absolute inset-x-0 bottom-0 p-3 flex items-center gap-2 bg-gradient-to-t from-background/90 to-transparent">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? `Pause ${film.title}` : `Play ${film.title}`}
            className="min-h-11 min-w-11 rounded-full glass-card flex items-center justify-center text-foreground hover:text-neon-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
          >
            {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? `Unmute ${film.title}` : `Mute ${film.title}`}
            className="min-h-11 min-w-11 rounded-full glass-card flex items-center justify-center text-foreground hover:text-neon-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={onOpen}
            className="ml-auto text-[10px] tracking-[0.25em] uppercase font-body text-foreground/80 hover:text-neon-pink px-3 min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg transition-colors"
            aria-label={`Open ${film.title} full screen`}
          >
            Expand
          </button>
        </div>
      </div>

      <div className="p-4">
        <p className="text-[10px] tracking-[0.3em] uppercase text-neon-purple font-body">{film.category}</p>
        <h3 className="font-heading text-xl text-foreground tracking-wider mt-1">{film.title}</h3>
        <p className="text-sm text-foreground/70 font-body mt-1">{film.description}</p>
      </div>
    </motion.article>
  );
};

export default FilmCard;
