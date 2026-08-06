import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Film } from "@/data/films";
import InstagramEmbed from "./InstagramEmbed";
import { track } from "@/lib/analytics";

interface VideoLightboxProps {
  film: Film | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

const VideoLightbox = ({ film, onClose, onPrev, onNext, hasPrev, hasNext }: VideoLightboxProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<Element | null>(null);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowLeft" && hasPrev) onPrev?.();
      if (e.key === "ArrowRight" && hasNext) onNext?.();
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], video, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [hasNext, hasPrev, onClose, onNext, onPrev],
  );

  useEffect(() => {
    if (!film) return;
    restoreRef.current = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", handleKey);
      (restoreRef.current as HTMLElement | null)?.focus?.();
    };
  }, [film, handleKey]);

  return (
    <AnimatePresence>
      {film && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${film.title} — ${film.category}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <div ref={panelRef} className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <p className="font-heading text-2xl tracking-wider text-foreground">{film.title}</p>
                <p className="font-body text-xs uppercase tracking-[0.25em] text-neon-blue">{film.category}</p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close video"
                className="flex min-h-11 min-w-11 items-center justify-center rounded-full glass-card text-foreground transition-colors hover:text-neon-pink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl glass-card p-2">
              {film.src ? (
                <video
                  key={film.id}
                  src={film.src}
                  poster={film.poster}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  onPlay={() => track("video_play", { title: film.title, category: film.category })}
                  className="mx-auto max-h-[72vh] w-full rounded-xl bg-black object-contain"
                />
              ) : film.instagramUrl ? (
                <div className="mx-auto max-w-[540px]">
                  <InstagramEmbed url={film.instagramUrl} />
                </div>
              ) : null}
            </div>

            <p className="mt-3 max-w-2xl font-body text-sm text-foreground/70">{film.description}</p>

            {(hasPrev || hasNext) && (
              <div className="mt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={onPrev}
                  disabled={!hasPrev}
                  aria-label="Previous film"
                  className="flex min-h-11 min-w-11 items-center justify-center rounded-full glass-card transition hover:text-neon-blue disabled:opacity-30"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  disabled={!hasNext}
                  aria-label="Next film"
                  className="flex min-h-11 min-w-11 items-center justify-center rounded-full glass-card transition hover:text-neon-blue disabled:opacity-30"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoLightbox;
