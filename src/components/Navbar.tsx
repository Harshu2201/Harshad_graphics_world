import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import profileImg from "@/assets/profile.jpg";
import { Menu, X, CalendarCheck } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { label: "About", hash: "#about" },
  { label: "AI Films", hash: "#ai-videos" },
  { label: "Client Reels", hash: "#client-reels" },
  { label: "Services", hash: "#services" },
  { label: "Work", hash: "#portfolio" },
  { label: "Social", hash: "#social" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Section links stay usable from other pages by routing back home first.
  const hrefFor = (hash: string) => (onHome ? hash : `/${hash}`);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "glass-card" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={profileImg}
            alt="Mr. Harshad Harishchandra Pakhale"
            className="w-9 h-9 rounded-full object-cover border-2 border-neon-blue/50"
          />
          <span className="font-heading text-base gradient-text hidden sm:inline">Mr. Harshad Pakhale</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.label}
              href={hrefFor(l.hash)}
              className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-neon-blue group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <Link
            to="/contact"
            className="text-sm font-body inline-flex items-center gap-2 px-4 py-2 rounded-lg text-primary-foreground"
            style={{ background: "linear-gradient(135deg, hsl(var(--neon-blue)), hsl(var(--neon-purple)))" }}
          >
            <CalendarCheck className="w-4 h-4" /> Book a Call
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden text-foreground p-2"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-card border-t border-border"
        >
          <div className="flex flex-col px-6 py-4 gap-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={hrefFor(l.hash)}
                onClick={() => setOpen(false)}
                className="text-sm font-body text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="text-sm font-body inline-flex items-center gap-2 text-neon-blue"
            >
              <CalendarCheck className="w-4 h-4" /> Book a Call
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
