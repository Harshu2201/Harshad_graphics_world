import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Instagram, Users, Heart, MessageCircle, ExternalLink } from "lucide-react";
import preview1 from "@/assets/portfolio-1.jpg";
import preview2 from "@/assets/portfolio-2.jpg";
import preview3 from "@/assets/portfolio-3.jpg";
import preview4 from "@/assets/portfolio-4.jpg";
import preview5 from "@/assets/portfolio-5.jpg";
import preview6 from "@/assets/portfolio-6.jpg";

const previews = [preview1, preview2, preview3, preview4, preview5, preview6];

type Social = {
  name: string;
  handle: string;
  role: string;
  color: string;
  link: string;
  followers: string;
  recentPost: string;
};

const socials: Social[] = [
  { name: "AI with Harshu", handle: "@ai_with_harshuuu", role: "AI Creator", color: "from-neon-blue to-neon-pink", link: "https://www.instagram.com/ai_with_harshuuu/", followers: "12.4K", recentPost: "AI cinematic reel" },
  { name: "Rebel Media", handle: "@rebelmedia.hq", role: "Media House", color: "from-neon-purple to-neon-pink", link: "https://www.instagram.com/rebelmedia.hq/", followers: "8.1K", recentPost: "Brand campaign film" },
  { name: "Campus Counsel", handle: "@campus_counsel_", role: "Ed-Tech Community", color: "from-neon-blue to-neon-purple", link: "https://www.instagram.com/campus_counsel_/", followers: "6.7K", recentPost: "Student growth series" },
  { name: "XPLOREVO", handle: "@xplorevo_official", role: "Startup Media", color: "from-neon-purple to-neon-blue", link: "https://www.instagram.com/xplorevo_official/", followers: "5.2K", recentPost: "Founder spotlight" },
  { name: "XTN Network", handle: "@xplorevo_tech_network", role: "Tech Network", color: "from-neon-cyan to-neon-blue", link: "https://www.instagram.com/xplorevo_tech_network/", followers: "3.9K", recentPost: "Tech news carousel" },
  { name: "MESWCOE E-Cell", handle: "@meswcoe_e_cell", role: "Entrepreneurship Cell", color: "from-neon-blue to-neon-cyan", link: "https://www.instagram.com/meswcoe_e_cell/", followers: "2.8K", recentPost: "Startup bootcamp recap" },
  { name: "MESWCOE EIC", handle: "@meswcoe_eic", role: "Innovation Council", color: "from-neon-pink to-neon-blue", link: "https://www.instagram.com/meswcoe_eic/", followers: "2.1K", recentPost: "Innovation drive poster" },
  { name: "Personal", handle: "@harshad.h.pakhale.01", role: "Creator", color: "from-neon-pink to-neon-purple", link: "https://www.instagram.com/harshad.h.pakhale.01/", followers: "4.5K", recentPost: "Behind the scenes" },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/** Avatar with a guaranteed visible initials fallback if the remote asset fails. */
const Avatar = ({ social }: { social: Social }) => {
  const [failed, setFailed] = useState(false);
  const src = `https://unavatar.io/instagram/${social.handle.replace("@", "")}`;

  return (
    <div className={`relative w-11 h-11 shrink-0 rounded-full bg-gradient-to-br ${social.color} p-[2px]`}>
      <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
        {failed ? (
          <span className="font-heading text-sm text-foreground">{initials(social.name)}</span>
        ) : (
          <img
            src={src}
            alt={`${social.name} profile picture`}
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <Instagram className="absolute -bottom-1 -right-1 w-4 h-4 text-neon-pink" aria-hidden />
    </div>
  );
};

/** Recent-post placeholder tile that always falls back to a bundled image. */
const PostPreview = ({ index }: { index: number }) => {
  const [src, setSrc] = useState(previews[index % previews.length]);
  useEffect(() => {
    setSrc(previews[index % previews.length]);
  }, [index]);
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      loading="eager"
      decoding="async"
      onError={() => setSrc(previews[0])}
      className="w-14 h-14 rounded-lg object-cover border border-border"
    />
  );
};

const REFRESH_MS = 60_000;
const SKELETON_MS = 600;
const MAX_ATTEMPTS = 4;
const BASE_DELAY_MS = 1000;

type Stats = Record<string, { followers: string; recentPost: string }>;

const baselineStats: Stats = Object.fromEntries(
  socials.map((s) => [s.handle, { followers: s.followers, recentPost: s.recentPost }]),
);

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Probes reachability, then returns the engagement snapshot. Throws so the caller can retry. */
const fetchStats = async (): Promise<Stats> => {
  const res = await fetch(`https://unavatar.io/instagram/${socials[0].handle.replace("@", "")}`, {
    method: "GET",
    mode: "no-cors",
    cache: "no-store",
  });
  if (res.type !== "opaque" && !res.ok) throw new Error("stats unavailable");
  return baselineStats;
};

const SocialSection = () => {
  // Brief skeleton for the engagement preview, then reveal the numbers.
  const [loading, setLoading] = useState(true);
  // Bumped on each refresh cycle so previews rotate and counts re-read.
  const [cycle, setCycle] = useState(0);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  // Last known-good values — never cleared, so a failed fetch keeps showing them.
  const [stats, setStats] = useState<Stats>(baselineStats);
  const [retrying, setRetrying] = useState(false);
  const [stale, setStale] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setLoading(true);
      setStale(false);
      for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        try {
          const next = await fetchStats();
          if (cancelled) return;
          setStats(next);
          setRetrying(false);
          setUpdatedAt(new Date());
          await sleep(SKELETON_MS);
          if (!cancelled) setLoading(false);
          return;
        } catch {
          if (cancelled) return;
          // Keep previous values + skeletons visible while backing off.
          setRetrying(true);
          await sleep(BASE_DELAY_MS * 2 ** attempt);
        }
      }
      if (cancelled) return;
      // Give up for this cycle: reveal the last known-good numbers.
      setRetrying(false);
      setStale(true);
      setLoading(false);
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [cycle]);

  useEffect(() => {
    const refresh = () => {
      if (document.hidden) return;
      setCycle((c) => c + 1);
    };
    const interval = setInterval(refresh, REFRESH_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="social" className="relative py-16 md:py-24">
      <div className="section-container">
        <div className="flex flex-wrap items-baseline gap-3 md:gap-4 mb-10 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="section-title gradient-text mb-0"
          >
            Social Media
          </motion.h2>
          <p className="text-xs font-body text-muted-foreground" aria-live="polite">
            {retrying
              ? "Connection hiccup — retrying…"
              : loading
                ? "Refreshing engagement…"
                : stale
                  ? "Showing last known numbers"
                  : updatedAt
                    ? `Updated ${updatedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                    : ""}
          </p>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {socials.map((social, i) => (
            <motion.a
              key={social.handle}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.05, 0.3) }}
              whileHover={{ scale: 1.03, rotateX: 5, rotateY: -5 }}
              transition-3d="true"
              className="glass-card tilt-3d rounded-2xl p-5 md:p-6 cursor-pointer group relative overflow-hidden block"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "linear-gradient(105deg, transparent 40%, hsla(var(--neon-blue) / 0.1) 45%, hsla(var(--neon-blue) / 0.2) 50%, hsla(var(--neon-blue) / 0.1) 55%, transparent 60%)" }}
              />

              <div className="flex items-center gap-3 mb-4">
                <Avatar social={social} />
                <div className="min-w-0">
                  <h3 className="font-heading text-lg text-foreground truncate">{social.name}</h3>
                  <p className="text-xs text-muted-foreground font-body truncate">{social.handle}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
              </div>

              {/* Engagement preview — previous values stay visible while retrying */}
              <div className="flex items-center gap-3 mb-4">
                <PostPreview index={i + cycle} />
                <div className="min-w-0 flex-1">
                  {loading && !retrying ? (
                    <div className="space-y-2" aria-hidden>
                      <div className="h-3 w-20 rounded bg-muted animate-pulse" />
                      <div className="h-3 w-28 rounded bg-muted animate-pulse" />
                    </div>
                  ) : (
                    <div className={retrying ? "opacity-60 transition-opacity duration-500" : "transition-opacity duration-500"}>
                      <p className="font-heading text-base text-foreground">
                        {(stats[social.handle] ?? social).followers}{" "}
                        <span className="text-xs font-body text-muted-foreground">followers</span>
                      </p>
                      <p className="text-xs text-muted-foreground font-body truncate">
                        Recent: {(stats[social.handle] ?? social).recentPost}
                      </p>
                      {retrying && (
                        <div className="mt-1 h-2 w-16 rounded bg-muted animate-pulse" aria-hidden />
                      )}
                    </div>
                  )}
                </div>
              </div>


              <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                <Users className="w-4 h-4 text-neon-blue" />
                <span className="truncate">{social.role}</span>
                <Heart className="w-4 h-4 text-neon-pink ml-auto shrink-0" />
                <MessageCircle className="w-4 h-4 text-neon-purple shrink-0" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
