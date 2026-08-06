import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import profileImg from "@/assets/profile.jpg";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "AI Films", href: "#ai-videos" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#portfolio" },
  { label: "Social", href: "#social" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setCurrent(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${scrolled ? "glass-card" : ""}`}
    >
      <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#hero" className="flex items-center gap-2 rounded-lg" aria-label="Harshad Pakhale — back to top">
          <img
            src={profileImg}
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-full border-2 border-neon-blue/50 object-cover"
          />
          <span className="hidden font-heading text-xl gradient-text sm:inline">Harshad</span>
        </a>

        {/* Desktop */}
        <ul className="hidden list-none gap-8 p-0 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                aria-current={current === l.href ? "true" : undefined}
                className={`group relative font-body text-sm transition-colors ${
                  current === l.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1 left-0 h-px bg-neon-blue transition-all duration-300 ${
                    current === l.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex min-h-11 min-w-11 items-center justify-center text-foreground md:hidden"
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-border glass-card md:hidden"
        >
          <ul className="flex list-none flex-col gap-1 px-6 py-3">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={current === l.href ? "true" : undefined}
                  className="flex min-h-11 items-center font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
