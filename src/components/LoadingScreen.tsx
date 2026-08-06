import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const INTRO_TEXT = `Dear ladies and gentlemen…

Welcome to the world of creativity, innovation, and cinematic design.

This is the portfolio of Harshad Pakhale — a Graphic Designer, AI Content Creator, and Visual Storyteller.

With over 2 years of experience, blending art with technology, transforming ideas into powerful visual experiences.

Get ready to explore designs that speak, visuals that inspire, and creativity without limits.

Let's begin.`;

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const musicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 5-second loader: increment every 50ms → 100 steps
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Start voiceover + music after a short delay
  useEffect(() => {
    const startAudio = () => {
      // Background music (low volume, cinematic)
      try {
        const music = new Audio("/music/bg-music.mp3");
        music.loop = true;
        music.volume = 0.08;
        musicRef.current = music;
        music.play().catch(() => {});
      } catch {}

      // Voiceover using Web Speech API
      if ("speechSynthesis" in window) {
        const utter = new SpeechSynthesisUtterance(INTRO_TEXT);
        utter.rate = 0.85;
        utter.pitch = 0.9;
        utter.volume = 0.7;
        // Try to pick a deep male voice
        const voices = speechSynthesis.getVoices();
        const preferredVoice = voices.find(
          (v) =>
            v.lang.startsWith("en") &&
            (v.name.toLowerCase().includes("male") ||
              v.name.toLowerCase().includes("daniel") ||
              v.name.toLowerCase().includes("james") ||
              v.name.toLowerCase().includes("google uk english male"))
        );
        if (preferredVoice) utter.voice = preferredVoice;
        utteranceRef.current = utter;
        speechSynthesis.speak(utter);
      }
    };

    // Small delay so voices are loaded
    const voiceTimer = setTimeout(() => {
      if (speechSynthesis.getVoices().length > 0) {
        startAudio();
      } else {
        speechSynthesis.onvoiceschanged = () => startAudio();
      }
    }, 500);

    return () => {
      clearTimeout(voiceTimer);
      speechSynthesis.cancel();
    };
  }, []);

  // When progress hits 100, fade out then complete
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onComplete, 600);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15 blur-[120px]"
              style={{ background: "linear-gradient(135deg, hsl(var(--neon-blue)), hsl(var(--neon-purple)), hsl(var(--neon-pink)))" }}
              animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl md:text-5xl font-heading gradient-text mb-3 text-center px-4 relative z-10"
          >
            Welcome to My Portfolio
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-sm md:text-base font-body text-muted-foreground tracking-[0.2em] mb-10 relative z-10"
          >
            Loading Creativity…
          </motion.p>

          <div className="w-56 h-1 rounded-full bg-muted overflow-hidden relative z-10">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(var(--neon-blue)), hsl(var(--neon-purple)), hsl(var(--neon-pink)))" }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 1.2 }}
            className="mt-4 text-xs font-body text-muted-foreground tracking-widest relative z-10"
          >
            {progress}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
