import { motion, useMotionValue, useTransform } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CarouselItem {
  src: string;
  title: string;
  category: string;
}

interface Props {
  items: CarouselItem[];
  onSelect?: (index: number) => void;
}

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
};

/**
 * GPU-accelerated 3D coverflow carousel. Only the five cards nearest the
 * active index are rendered, so it stays smooth on mobile regardless of
 * how many items are passed in.
 */
const Portfolio3DCarousel = ({ items, onSelect }: Props) => {
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();
  const dragX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const count = items.length;
  const go = useCallback(
    (dir: number) => setActive((i) => (i + dir + count) % count),
    [count],
  );

  // Auto-advance, paused on hover/focus and when the user prefers less motion.
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (reduced || paused || count < 2) return;
    const id = window.setInterval(() => go(1), 4500);
    return () => window.clearInterval(id);
  }, [count, go, paused, reduced]);

  const visible = useMemo(() => {
    const out: { item: CarouselItem; offset: number; index: number }[] = [];
    for (let o = -2; o <= 2; o++) {
      const index = (active + o + count) % count;
      out.push({ item: items[index], offset: o, index });
    }
    return out;
  }, [active, count, items]);

  const rotate = useTransform(dragX, [-200, 0, 200], [8, 0, -8]);

  return (
    <div
      ref={containerRef}
      role="group"
      aria-roledescription="carousel"
      aria-label="Featured work carousel"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
        if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative select-none rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      style={{ perspective: reduced ? undefined : "1400px" }}
    >
      <motion.div
        className="relative mx-auto flex h-[380px] items-center justify-center sm:h-[460px]"
        style={{ transformStyle: reduced ? undefined : "preserve-3d", rotateY: reduced ? 0 : rotate }}
        drag={reduced ? false : "x"}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        _dragX={dragX}
        onDragEnd={(_, info) => {
          if (info.offset.x < -60) go(1);
          else if (info.offset.x > 60) go(-1);
        }}
      >
        {visible.map(({ item, offset, index }) => {
          const isActive = offset === 0;
          const abs = Math.abs(offset);
          return (
            <motion.button
              key={`${item.src}-${offset}`}
              type="button"
              tabIndex={isActive ? 0 : -1}
              aria-hidden={!isActive}
              aria-label={`${item.title}, ${item.category}`}
              onClick={() => (isActive ? onSelect?.(index) : setActive(index))}
              animate={{
                x: offset * (reduced ? 0 : 190),
                z: reduced ? 0 : -abs * 220,
                rotateY: reduced ? 0 : offset * -22,
                scale: 1 - abs * 0.12,
                opacity: abs > 2 ? 0 : 1 - abs * 0.28,
                filter: `blur(${abs * 1.5}px)`,
              }}
              transition={{ type: "spring", stiffness: 130, damping: 20 }}
              style={{ zIndex: 10 - abs, transformStyle: reduced ? undefined : "preserve-3d" }}
              className="absolute h-full w-[260px] cursor-pointer overflow-hidden rounded-2xl glass-card p-2 sm:w-[320px]"
            >
              <img
                src={item.src}
                alt={isActive ? `${item.title} — ${item.category}` : ""}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="size-full rounded-xl object-cover"
              />
              {isActive && (
                <div className="absolute inset-x-2 bottom-2 rounded-xl bg-gradient-to-t from-background/95 to-transparent p-4 text-left">
                  <p className="font-heading text-xl tracking-wide text-foreground">{item.title}</p>
                  <p className="font-body text-[10px] uppercase tracking-[0.25em] text-neon-blue">{item.category}</p>
                </div>
              )}
            </motion.button>
          );
        })}
      </motion.div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous item"
          className="flex min-h-11 min-w-11 items-center justify-center rounded-full glass-card transition hover:text-neon-blue"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <p aria-live="polite" className="font-body text-xs tracking-[0.2em] text-muted-foreground">
          {active + 1} / {count}
        </p>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next item"
          className="flex min-h-11 min-w-11 items-center justify-center rounded-full glass-card transition hover:text-neon-blue"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Portfolio3DCarousel;
