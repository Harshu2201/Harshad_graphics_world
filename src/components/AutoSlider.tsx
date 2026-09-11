import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

interface AutoSliderProps {
  children: ReactNode;
  /** Pixels per second for the automatic right-to-left drift. */
  speed?: number;
  ariaLabel: string;
  className?: string;
}

/**
 * Horizontal slider that drifts content right-to-left automatically and also
 * supports manual arrows, drag/swipe, and native scroll. Auto-motion pauses on
 * hover, focus, drag, and when the user prefers reduced motion.
 */
const AutoSlider = ({ children, speed = 45, ariaLabel, className = "" }: AutoSliderProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);

  // Automatic drift
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (!playing) return;

    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!pausedRef.current && !draggingRef.current) {
        const max = el.scrollWidth - el.clientWidth;
        if (max > 4) {
          const next = el.scrollLeft + speed * dt;
          el.scrollLeft = next >= max - 1 ? 0 : next;
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [playing, speed]);

  const nudge = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.max(240, el.clientWidth * 0.8);
    const max = el.scrollWidth - el.clientWidth;
    let target = el.scrollLeft + dir * amount;
    if (target < 0) target = max;
    if (target > max) target = 0;
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  // Drag / swipe to scroll
  const dragStart = useRef({ x: 0, scroll: 0 });
  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || e.pointerType === "mouse" && e.button !== 0) return;
    draggingRef.current = true;
    dragStart.current = { x: e.clientX, scroll: el.scrollLeft };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !draggingRef.current) return;
    el.scrollLeft = dragStart.current.scroll - (e.clientX - dragStart.current.x);
  };
  const endDrag = () => {
    draggingRef.current = false;
  };

  return (
    <div className={`relative ${className}`}>
      <div
        ref={trackRef}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
        onFocus={() => (pausedRef.current = true)}
        onBlur={() => (pausedRef.current = false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-2xl"
      >
        {children}
      </div>

      <div className="mt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label={`Previous in ${ariaLabel}`}
          className="min-h-11 min-w-11 rounded-full glass-card flex items-center justify-center text-foreground hover:text-neon-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label={`Next in ${ariaLabel}`}
          className="min-h-11 min-w-11 rounded-full glass-card flex items-center justify-center text-foreground hover:text-neon-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? `Pause ${ariaLabel} auto-slide` : `Play ${ariaLabel} auto-slide`}
          className="min-h-11 rounded-full glass-card px-4 flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-body text-foreground/80 hover:text-neon-pink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
        >
          {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          {playing ? "Auto" : "Paused"}
        </button>
        <span className="text-[10px] tracking-[0.25em] uppercase font-body text-muted-foreground hidden sm:inline">
          Swipe or drag
        </span>
      </div>
    </div>
  );
};

export default AutoSlider;
