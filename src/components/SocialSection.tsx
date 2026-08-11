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

const SocialSection = () => {
  // Brief skeleton for the engagement preview, then reveal the numbers.
  const [loading, setLoading] = useState(true);
  // Bumped on each refresh cycle so previews rotate and counts re-read.
  const [cycle, setCycle] = useState(0);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
      setUpdatedAt(new Date());
    }, SKELETON_MS);
    return () => clearTimeout(t);
  }, [cycle]);

  useEffect(() => {
    let skeletonTimer: ReturnType<typeof setTimeout>;
    const refresh = () => {
      if (document.hidden) return;
      setLoading(true);
      setCycle((c) => c + 1);
    };
    const interval = setInterval(refresh, REFRESH_MS);
    return () => {
      clearInterval(interval);
      clearTimeout(skeletonTimer);
    };
  }, []);


  return (
    <section id="social" className="relative py-24">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="section-title gradient-text mb-16"
        >
          Social Media
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {socials.map((social, i) => (
            <motion.a
              key={social.handle}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.05, 0.3) }}
              whileHover={{ scale: 1.03 }}
              className="glass-card rounded-2xl p-6 cursor-pointer group relative overflow-hidden block"
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

              {/* Engagement preview */}
              <div className="flex items-center gap-3 mb-4">
                <PostPreview index={i} />
                <div className="min-w-0 flex-1">
                  {loading ? (
                    <div className="space-y-2" aria-hidden>
                      <div className="h-3 w-20 rounded bg-muted animate-pulse" />
                      <div className="h-3 w-28 rounded bg-muted animate-pulse" />
                    </div>
                  ) : (
                    <>
                      <p className="font-heading text-base text-foreground">
                        {social.followers} <span className="text-xs font-body text-muted-foreground">followers</span>
                      </p>
                      <p className="text-xs text-muted-foreground font-body truncate">Recent: {social.recentPost}</p>
                    </>
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
