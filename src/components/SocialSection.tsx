import { motion } from "framer-motion";
import { Instagram, Users, Heart, MessageCircle } from "lucide-react";

const socials = [
  { name: "Campus Counsel", handle: "@campus_counsel_", role: "Ed-Tech Community", color: "from-neon-blue to-neon-purple", link: "https://www.instagram.com/campus_counsel_/" },
  { name: "XPLOREVO", handle: "@xplorevo_official", role: "Startup Media", color: "from-neon-purple to-neon-blue", link: "https://www.instagram.com/xplorevo_official/" },
  { name: "XTN Network", handle: "@xplorevo_tech_network", role: "Tech Network", color: "from-neon-cyan to-neon-blue", link: "https://www.instagram.com/xplorevo_tech_network/" },
  { name: "MESWCOE E-Cell", handle: "@meswcoe_e_cell", role: "Entrepreneurship Cell", color: "from-neon-blue to-neon-cyan", link: "https://www.instagram.com/meswcoe_e_cell/" },
  { name: "MESWCOE EIC", handle: "@meswcoe_eic", role: "Innovation Council", color: "from-neon-pink to-neon-blue", link: "https://www.instagram.com/meswcoe_eic/" },
  { name: "Personal", handle: "@harshad.h.pakhale.01", role: "Creator", color: "from-neon-pink to-neon-purple", link: "https://www.instagram.com/harshad.h.pakhale.01/" },
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

              <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                <Users className="w-4 h-4 text-neon-blue" />
                <span>{social.role}</span>
                <Heart className="w-4 h-4 text-neon-pink ml-auto" />
                <MessageCircle className="w-4 h-4 text-neon-purple" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
