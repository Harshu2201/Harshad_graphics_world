import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const resumeTimerRef = useRef<number | null>(null);

  const nudge = useCallback((dir: number, smooth = true) => {
    const el = trackRef.current;
    if (!el) return;
    const firstSlide = el.firstElementChild as HTMLElement | null;
    const amount = firstSlide ? firstSlide.offsetWidth + 24 : Math.max(260, el.clientWidth * 0.85);
    const max = el.scrollWidth - el.clientWidth;
    let target = el.scrollLeft + dir * amount;
    if (target < 0) target = max;
    if (target > max) target = 0;
    el.scrollTo({ left: target, behavior: smooth ? "smooth" : "auto" });
    if (smooth) {
      pausedRef.current = true;
      if (resumeTimerRef.current !== null) window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = window.setTimeout(() => {
        pausedRef.current = false;
        resumeTimerRef.current = null;
      }, 650);
    }
  }, []);

  // Snap to the next full card on a reliable cadence. Tiny continuous changes
  // are intentionally avoided because mandatory CSS snapping cancels them.
  useEffect(() => {
    if (!playing || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => {
      if (!pausedRef.current && !draggingRef.current) nudge(1, true);
    }, Math.max(2200, 4200 - speed * 20));
    return () => window.clearInterval(interval);
  }, [nudge, playing, speed]);

  useEffect(() => () => {
    if (resumeTimerRef.current !== null) window.clearTimeout(resumeTimerRef.current);
  }, []);

  // Drag / swipe to scroll
  const dragStart = useRef({ x: 0, scroll: 0 });
  const onPointerDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || e.pointerType === "mouse" && e.button !== 0) return;
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
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
        className="flex gap-4 overflow-x-auto pb-4 md:gap-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg cursor-grab active:cursor-grabbing touch-pan-y"
      >
        {children}
      </div>

      <div className="mt-2 flex items-center gap-3">
        <Button
          type="button"
          onClick={() => nudge(-1)}
          aria-label={`Previous in ${ariaLabel}`}
          variant="outline"
          size="icon"
          className="min-h-11 min-w-11 rounded-full glass-card text-foreground hover:text-neon-blue"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          type="button"
          onClick={() => nudge(1)}
          aria-label={`Next in ${ariaLabel}`}
          variant="outline"
          size="icon"
          className="min-h-11 min-w-11 rounded-full glass-card text-foreground hover:text-neon-blue"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
        <Button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? `Pause ${ariaLabel} auto-slide` : `Play ${ariaLabel} auto-slide`}
          variant="outline"
          className="min-h-11 rounded-full glass-card px-4 text-[10px] tracking-[0.25em] uppercase font-body text-foreground/80 hover:text-neon-pink"
        >
          {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          {playing ? "Auto" : "Paused"}
        </Button>
        <span className="text-[10px] tracking-[0.25em] uppercase font-body text-muted-foreground hidden sm:inline">
          Swipe or drag
        </span>
      </div>
    </div>
  );
};

export default AutoSlider;
