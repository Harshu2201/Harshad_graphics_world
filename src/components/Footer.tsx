import { Linkedin, Instagram, Mail, MessageSquare } from "lucide-react";

const socials = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/harshad-pakhale-221hp/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/harshad.h.pakhale.01/", label: "Instagram" },
  { icon: Mail, href: "mailto:harshup2205@gmail.com", label: "Email" },
  { icon: MessageSquare, href: "https://wa.me/919067572205", label: "WhatsApp" },
];

const Footer = () => {
  return (
    <footer className="relative border-t border-border mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-heading text-2xl gradient-text tracking-wider">Harshad Pakhale</p>
          <p className="text-xs text-muted-foreground font-body tracking-widest uppercase mt-1">
            AI Generalist · Creative Strategist
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-foreground/70 hover:text-neon-blue hover:neon-glow transition-all"
            >
              <s.icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        <p className="text-xs text-muted-foreground font-body">
          © {new Date().getFullYear()} Harshad Pakhale. Built with AI + execution.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
