import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const MotionButton = motion(Button);

/**
 * Background music starts immediately where browser policy allows it. If the
 * first attempt is blocked, the visitor's first interaction starts playback.
 */
const MusicToggle = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/music/bg-music.mp3");
    audio.loop = true;
    audio.volume = 0.12;
    audio.preload = "auto";
    audioRef.current = audio;

    const start = () => {
      void audio.play().catch(() => setPlaying(false));
    };
    const startAfterInteraction = () => {
      start();
      window.removeEventListener("pointerdown", startAfterInteraction);
      window.removeEventListener("keydown", startAfterInteraction);
      window.removeEventListener("touchstart", startAfterInteraction);
    };

    start();
    window.addEventListener("pointerdown", startAfterInteraction, { once: true });
    window.addEventListener("keydown", startAfterInteraction, { once: true });
    window.addEventListener("touchstart", startAfterInteraction, { once: true });

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      window.removeEventListener("pointerdown", startAfterInteraction);
      window.removeEventListener("keydown", startAfterInteraction);
      window.removeEventListener("touchstart", startAfterInteraction);
      audio.pause();
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  };

  return (
    <MotionButton
      type="button"
      variant="outline"
      size="icon"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6 }}
      onClick={toggle}
      className="fixed bottom-4 left-4 z-50 h-11 w-11 rounded-full glass-card text-foreground hover:text-neon-blue sm:bottom-6 sm:left-6 sm:h-12 sm:w-12"
      aria-label={playing ? "Mute background music" : "Play background music"}
      aria-pressed={playing}
    >
      {playing ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
    </MotionButton>
  );
};

export default MusicToggle;
