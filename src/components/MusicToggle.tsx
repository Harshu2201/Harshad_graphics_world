import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { track } from "@/lib/analytics";

/**
 * Ambient music is opt-in: audio that starts on its own is both an
 * accessibility failure and an instant bounce. Nothing is downloaded until
 * the visitor asks for it.
 */
const MusicToggle = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => () => audioRef.current?.pause(), []);

  const toggle = () => {
    if (!audioRef.current) {
      const audio = new Audio("/music/bg-music.mp3");
      audio.loop = true;
      audio.volume = 0.12;
      audio.preload = "none";
      audioRef.current = audio;
    }
    const audio = audioRef.current;
    if (playing) {
      audio.pause();
      setPlaying(false);
      track("music_toggle", { state: "off" });
      return;
    }
    audio
      .play()
      .then(() => {
        setPlaying(true);
        track("music_toggle", { state: "on" });
      })
      .catch(() => setPlaying(false));
  };

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2 }}
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Turn off ambient music" : "Turn on ambient music"}
      className="fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full glass-card text-foreground transition-colors duration-300 neon-glow hover:text-neon-blue"
    >
      {playing ? <Volume2 className="h-5 w-5" aria-hidden="true" /> : <VolumeX className="h-5 w-5" aria-hidden="true" />}
    </motion.button>
  );
};

export default MusicToggle;
