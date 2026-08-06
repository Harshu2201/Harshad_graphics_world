import { motion } from "framer-motion";
import { ArrowUpRight, Instagram } from "lucide-react";
import { track } from "@/lib/analytics";

const socials = [
  { name: "Campus Counsel", handle: "@campus_counsel_", role: "Ed-Tech Community", focus: "Student growth & campus storytelling", color: "from-neon-blue to-neon-purple", link: "https://www.instagram.com/campus_counsel_/" },
  { name: "XPLOREVO", handle: "@xplorevo_official", role: "Startup Media", focus: "Startup narratives & founder content", color: "from-neon-purple to-neon-blue", link: "https://www.instagram.com/xplorevo_official/" },
  { name: "XTN Network", handle: "@xplorevo_tech_network", role: "Tech Network", focus: "Deep-tech explainers & community", color: "from-neon-cyan to-neon-blue", link: "https://www.instagram.com/xplorevo_tech_network/" },
  { name: "MESWCOE E-Cell", handle: "@meswcoe_e_cell", role: "Entrepreneurship Cell", focus: "Event campaigns & recruitment reels", color: "from-neon-blue to-neon-cyan", link: "https://www.instagram.com/meswcoe_e_cell/" },
  { name: "MESWCOE EIC", handle: "@meswcoe_eic", role: "Innovation Council", focus: "Innovation showcases & design systems", color: "from-neon-pink to-neon-blue", link: "https://www.instagram.com/meswcoe_eic/" },
  { name: "Personal", handle: "@harshad.h.pakhale.01", role: "Creator", focus: "AI films, experiments & behind the scenes", color: "from-neon-pink to-neon-purple", link: "https://www.instagram.com/harshad.h.pakhale.01/" },
];

const SocialSection = () => {
  return (
    <section id="social" aria-labelledby="social-heading" className="relative py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-3xl"
        >
          <span className="font-body text-xs uppercase tracking-[0.3em] text-neon-blue">Social Media Management</span>
          <h2 id="social-heading" className="section-title gradient-text mt-2">
            Six brands. One content engine.
          </h2>
          <p className="mt-3 font-body text-foreground/70">
            Strategy, creative direction and day-to-day publishing across communities, startup media and
            innovation councils.
          </p>
        </motion.div>

        <ul className="grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {socials.map((social, i) => (
            <motion.li
              key={social.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i, 5) * 0.08 }}
            >
              <a
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("social_click", { account: social.handle })}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl glass-card p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${social.color} opacity-70`}
                />
                <span
                  aria-hidden="true"
                  className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${social.color} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25`}
                />

                <div className="mb-5 flex items-start justify-between gap-3">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${social.color}`}>
                    <Instagram className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neon-blue"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="font-heading text-2xl tracking-wider text-foreground">{social.name}</h3>
                <p className="font-body text-xs text-muted-foreground">{social.handle}</p>

                <p className="mt-4 font-body text-sm text-foreground/75">{social.focus}</p>

                <span className="mt-auto pt-5 font-body text-[10px] uppercase tracking-[0.25em] text-neon-purple">
                  {social.role}
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SocialSection;
