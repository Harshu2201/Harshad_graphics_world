import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  const finish = useCallback(() => {
    setVisible(false);
    window.setTimeout(onComplete, 400);
  }, [onComplete]);

  useEffect(() => {
    // Anyone who prefers reduced motion skips the intro entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return;
    }
    // 1.8s intro — long enough to feel intentional, short enough not to hurt LCP.
    const interval = window.setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 4));
    }, 60);
    return () => window.clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (progress < 100) return;
    const timer = window.setTimeout(finish, 200);
    return () => window.clearTimeout(timer);
  }, [finish, progress]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.4 }}
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-[120px]"
              style={{ background: "linear-gradient(135deg, hsl(var(--neon-blue)), hsl(var(--neon-purple)), hsl(var(--neon-pink)))" }}
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <p className="relative z-10 mb-3 px-4 text-center font-heading text-3xl gradient-text md:text-5xl">
            Harshad Pakhale
          </p>
          <p className="relative z-10 mb-8 font-body text-sm tracking-[0.2em] text-muted-foreground">
            Loading creativity… {progress}%
          </p>

          <div className="relative z-10 h-1 w-56 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(var(--neon-blue)), hsl(var(--neon-purple)), hsl(var(--neon-pink)))" }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          <button
            type="button"
            onClick={finish}
            className="relative z-10 mt-8 min-h-11 rounded-full px-5 font-body text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-neon-blue"
          >
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
