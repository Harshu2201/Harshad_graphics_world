import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Instagram, ExternalLink, Play } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import InstagramEmbed from "@/components/InstagramEmbed";
import fallback1 from "@/assets/portfolio-1.jpg";
import fallback2 from "@/assets/portfolio-2.jpg";
import fallback3 from "@/assets/portfolio-3.jpg";
import fallback4 from "@/assets/portfolio-4.jpg";
import fallback5 from "@/assets/portfolio-5.jpg";
import fallback6 from "@/assets/portfolio-6.jpg";

const fallbacks = [fallback1, fallback2, fallback3, fallback4, fallback5, fallback6];

const PROFILE = "https://www.instagram.com/ai_with_harshuuu/";

type Reel = {
  id: string;
  permalink: string;
  thumbnail_url: string | null;
  caption: string | null;
  posted_at: string | null;
};

const ReelTile = ({ reel, index }: { reel: Reel; index: number }) => {
  const [src, setSrc] = useState(reel.thumbnail_url ?? fallbacks[index % fallbacks.length]);
  return (
    <motion.a
      href={reel.permalink}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.04, 0.3) }}
      whileHover={{ scale: 1.03 }}
      className="group relative block aspect-[9/16] overflow-hidden rounded-xl border border-border tilt-3d"
    >
      <img
        src={src}
        alt={reel.caption?.slice(0, 80) || "Instagram reel"}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setSrc(fallbacks[index % fallbacks.length])}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <Play className="absolute right-3 top-3 h-5 w-5 text-neon-pink drop-shadow" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="line-clamp-2 font-body text-xs text-foreground">
          {reel.caption || "New reel"}
        </p>
        {reel.posted_at && (
          <p className="mt-1 font-body text-[10px] text-neon-blue">
            {new Date(reel.posted_at).toLocaleDateString()}
          </p>
        )}
      </div>
    </motion.a>
  );
};

const InstagramFeedSection = () => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      const { data } = await supabase
        .from("instagram_reels")
        .select("id, permalink, thumbnail_url, caption, posted_at")
        .order("posted_at", { ascending: false, nullsFirst: false })
        .limit(12);
      if (cancelled) return;
      setReels((data as Reel[]) ?? []);
      setLoading(false);
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const latest = reels[0];

  return (
    <section id="instagram" className="relative py-16 md:py-24">
      <div className="section-container">
        <div className="mb-8 flex flex-wrap items-baseline gap-3 md:mb-12 md:gap-4">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="section-title gradient-text mb-0"
          >
            Daily Reels
          </motion.h2>
          <a
            href={PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Instagram className="h-4 w-4 text-neon-pink" aria-hidden />
            @ai_with_harshuuu
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,420px)_1fr]">
          {/* Latest reel, playable inline */}
          <div>
            <p className="mb-3 font-body text-xs uppercase tracking-widest text-neon-blue">
              Latest post
            </p>
            {latest ? (
              <InstagramEmbed url={latest.permalink} />
            ) : (
              <div className="aspect-[9/16] w-full max-w-[420px] animate-pulse rounded-xl bg-muted" />
            )}
          </div>

          {/* Recent grid */}
          <div>
            <p className="mb-3 font-body text-xs uppercase tracking-widest text-neon-purple">
              Recent uploads
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="aspect-[9/16] animate-pulse rounded-xl bg-muted" />
                  ))
                : reels.map((reel, i) => <ReelTile key={reel.id} reel={reel} index={i} />)}
            </div>
            {!loading && reels.length === 0 && (
              <p className="font-body text-sm text-muted-foreground">
                Reels will appear here as soon as the feed connects.{" "}
                <a href={PROFILE} target="_blank" rel="noopener noreferrer" className="text-neon-blue underline">
                  View on Instagram
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeedSection;
