import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import profileImg from "@/assets/profile.jpg";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "AI Films", href: "#ai-videos" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#portfolio" },
  { label: "Social", href: "#social" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "glass-card" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2">
          <img src={profileImg} alt="Harshad Pakhale" className="w-9 h-9 rounded-full object-cover border-2 border-neon-blue/50" />
          <span className="font-heading text-xl gradient-text hidden sm:inline">Harshad</span>
        </a>
        
        {/* Desktop */}
        <div className="hidden md:flex gap-8">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors relative group">
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon-blue group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden glass-card border-t border-border">
          <div className="flex flex-col px-6 py-4 gap-4">
            {links.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
