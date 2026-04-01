import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

const MusicToggle = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const audio = new Audio("/music/bg-music.mp3");
    audio.loop = true;
    audio.volume = 0.12;
    audioRef.current = audio;

    const tryPlay = () => {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };

    tryPlay();

    const handleInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
      }
      document.removeEventListener("click", handleInteraction);
    };
    document.addEventListener("click", handleInteraction);

    return () => {
      audio.pause();
      document.removeEventListener("click", handleInteraction);
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      speechSynthesis.cancel();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2 }}
      onClick={toggle}
      className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full glass-card flex items-center justify-center text-foreground hover:text-neon-blue transition-colors duration-300 neon-glow"
      aria-label={playing ? "Mute" : "Unmute"}
    >
      {playing ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
    </motion.button>
  );
};

export default MusicToggle;
