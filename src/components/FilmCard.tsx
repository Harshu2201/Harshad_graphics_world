import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import type { Film } from "@/data/films";
import { trackVideoPlay, trackButtonClick } from "@/lib/analytics";
import { Button } from "@/components/ui/button";


interface FilmCardProps {
  film: Film;
  onOpen: () => void;
  autoPlayWhenVisible?: boolean;
}

/**
 * Poster-first film card. The source is present from the first render so browser
 * metadata and the first frame can be prepared before the slider enters view.
 */
const FilmCard = ({ film, onOpen, autoPlayWhenVisible = false }: FilmCardProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    const card = wrapRef.current;
    if (!autoPlayWhenVisible || !video || !card) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5) {
          void video.play().catch(() => setPlaying(false));
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.5, 1] },
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, [autoPlayWhenVisible]);


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
      className="group relative glass-card rounded-lg overflow-hidden h-full"
    >
      <div className="relative aspect-[9/16] bg-muted/40">
        <video
          ref={videoRef}
          src={film.src}
          poster={film.poster}
          muted={muted}
          autoPlay={autoPlayWhenVisible}
          loop
          playsInline
          preload="metadata"
          className="size-full object-cover"
          onPlay={() => {
            setPlaying(true);
            trackVideoPlay(film.title, film.category);
          }}
          onPause={() => setPlaying(false)}
        />

        {/* Controls */}
        <div className="absolute inset-x-0 bottom-0 p-3 flex items-center gap-2 bg-gradient-to-t from-background/90 to-transparent">
          <Button
            type="button"
            onClick={toggle}
            aria-label={playing ? `Pause ${film.title}` : `Play ${film.title}`}
            variant="outline"
            size="icon"
            className="min-h-11 min-w-11 rounded-full glass-card text-foreground hover:text-neon-blue"
          >
            {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            type="button"
            onClick={() => setMuted((m) => !m)}
            aria-label={muted ? `Unmute ${film.title}` : `Mute ${film.title}`}
            variant="outline"
            size="icon"
            className="min-h-11 min-w-11 rounded-full glass-card text-foreground hover:text-neon-purple"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <Button
            type="button"
            onClick={() => {
              trackButtonClick(`Expand film: ${film.title}`, "ai_films");
              onOpen();
            }}
            variant="ghost"
            className="ml-auto text-xs uppercase font-body text-foreground/80 hover:text-neon-pink"
            aria-label={`Open ${film.title} full screen`}
          >
            Expand
          </Button>
        </div>
      </div>

      <div className="p-4">
        <p className="text-[10px] tracking-[0.3em] uppercase text-neon-purple font-body">{film.category}</p>
        <h3 className="font-heading text-xl text-foreground mt-1">{film.title}</h3>
        <p className="text-sm text-foreground/70 font-body mt-1">{film.description}</p>
      </div>
    </motion.article>
  );
};

export default FilmCard;
