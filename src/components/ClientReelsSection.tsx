import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import FilmCard from "@/components/FilmCard";
import type { Film } from "@/data/films";
import clientReel1Mp4 from "@/assets/client-reels/client-reel-1.mp4.asset.json";
import clientReel1Jpg from "@/assets/client-reels/client-reel-1.jpg.asset.json";
import clientReel2Mp4 from "@/assets/client-reels/client-reel-2.mp4.asset.json";
import clientReel2Jpg from "@/assets/client-reels/client-reel-2.jpg.asset.json";
import clientReel3Mp4 from "@/assets/client-reels/client-reel-3.mp4.asset.json";
import clientReel3Jpg from "@/assets/client-reels/client-reel-3.jpg.asset.json";
import clientReel4Mp4 from "@/assets/client-reels/client-reel-4.mp4.asset.json";
import clientReel4Jpg from "@/assets/client-reels/client-reel-4.jpg.asset.json";

/** Client work: AI reels delivered for brands. CDN-hosted, web-optimised H.264. */
export const clientReels: Film[] = [
  {
    id: "client-reel-1",
    title: "Client AI Reel 01",
    category: "Brand Reel",
    description: "AI-generated brand reel delivered for a client campaign, cut for Instagram Reels.",
    src: clientReel1Mp4.url,
    poster: clientReel1Jpg.url,
  },
  {
    id: "client-reel-2",
    title: "Client AI Reel 02",
    category: "Brand Reel",
    description: "Story-led AI reel with custom voice, motion and sound design for a client launch.",
    src: clientReel2Mp4.url,
    poster: clientReel2Jpg.url,
  },
  {
    id: "client-reel-3",
    title: "Client AI Reel 03",
    category: "Brand Reel",
    description: "AI-powered product launch reel with kinetic typography and brand-first visuals.",
    src: clientReel3Mp4.url,
    poster: clientReel3Jpg.url,
  },
  {
    id: "client-reel-4",
    title: "Client AI Reel 04",
    category: "Brand Reel",
    description: "Short-form conversion reel built for Meta ads and Instagram Stories engagement.",
    src: clientReel4Mp4.url,
    poster: clientReel4Jpg.url,
  },
];

const ClientReelsSection = () => {
  const [open, setOpen] = useState<Film | null>(null);

  return (
    <section id="client-reels" className="relative py-16 md:py-24">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="section-title gradient-text"
        >
          Client AI Reels
        </motion.h2>
        <p className="mb-8 max-w-2xl font-body text-sm text-muted-foreground md:mb-12 md:text-base">
          Real AI reels produced and delivered for client brands — scripted, generated, edited and
          optimised for Instagram and Meta ads.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {clientReels.map((reel) => (
            <FilmCard key={reel.id} film={reel} onOpen={() => setOpen(reel)} />
          ))}
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label="Close video"
            className="absolute right-4 top-4 flex min-h-11 min-w-11 items-center justify-center rounded-full glass-card text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
          <video
            src={open.src}
            poster={open.poster}
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] w-auto max-w-full rounded-2xl"
          />
        </div>
      )}
    </section>
  );
};

export default ClientReelsSection;
