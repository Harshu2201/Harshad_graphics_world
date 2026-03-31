import { motion } from "framer-motion";
import { Instagram, Users, Heart, MessageCircle } from "lucide-react";

const socials = [
  { name: "Instagram Personal", handle: "@harshad", followers: "2.5K", posts: "120", color: "from-neon-pink to-neon-purple", link: "https://www.instagram.com/harshad.h.pakhale.01" },
  { name: "MESWCOE E-Cell", handle: "@meswcoe_e_cell", followers: "5.2K", posts: "340", color: "from-neon-blue to-neon-cyan", link: "https://www.instagram.com/meswcoe_e_cell" },
  { name: "Xplorevo Pvt Ltd", handle: "@xplorevo_official", followers: "8.1K", posts: "450", color: "from-neon-purple to-neon-blue", link: "https://www.instagram.com/xplorevo_official" },
  { name: "XTN Network", handle: "@xplorevo_tech_network", followers: "3.7K", posts: "210", color: "from-neon-cyan to-neon-blue", link: "https://www.instagram.com/xplorevo_tech_network" },
  { name: "MESWCOE EIC", handle: "@meswcoe_eic", followers: "1.8K", posts: "95", color: "from-neon-pink to-neon-blue", link: "https://www.instagram.com/meswcoe_eic" },
];

const SocialSection = () => {
  return (
    <section id="social" className="relative py-24">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="section-title gradient-text mb-16"
        >
          Social Media
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {socials.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass-card rounded-2xl p-6 cursor-pointer group relative overflow-hidden block"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "linear-gradient(105deg, transparent 40%, hsla(var(--neon-blue) / 0.1) 45%, hsla(var(--neon-blue) / 0.2) 50%, hsla(var(--neon-blue) / 0.1) 55%, transparent 60%)" }} />

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${social.color} flex items-center justify-center`}>
                  <Instagram className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-heading text-lg text-foreground">{social.name}</h3>
                  <p className="text-xs text-muted-foreground font-body">{social.handle}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-body">
                  <Users className="w-4 h-4 text-neon-blue" />
                  <span>{social.followers}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-body">
                  <Heart className="w-4 h-4 text-neon-pink" />
                  <span>{social.posts}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground font-body">
                  <MessageCircle className="w-4 h-4 text-neon-purple" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
