import { motion } from "framer-motion";
import { useState } from "react";
import { z } from "zod";
import { Send, Mail, MessageSquare, Linkedin, Instagram } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  trackFormSubmit,
  trackCtaConversion,
  trackWhatsAppClick,
  trackButtonClick,
} from "@/lib/analytics";

const channels = [
  { icon: Mail, label: "Email", value: "harshup2205@gmail.com", href: "mailto:harshup2205@gmail.com" },
  { icon: Linkedin, label: "LinkedIn", value: "/in/harshad-pakhale-221hp", href: "https://www.linkedin.com/in/harshad-pakhale-221hp/" },
  { icon: Instagram, label: "Instagram", value: "@harshad.h.pakhale.01", href: "https://www.instagram.com/harshad.h.pakhale.01/" },
  { icon: MessageSquare, label: "WhatsApp", value: "+91 90675 72205", href: "https://wa.me/919067572205" },
];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email is too long"),
  message: z.string().trim().min(10, "Tell me a bit more (10+ characters)").max(1000, "Message is too long"),
});

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      trackFormSubmit("contact", "error", parsed.error.issues[0].message);
      toast({
        title: "Check your details",
        description: parsed.error.issues[0].message,
        variant: "destructive",
      });
      return;
    }
    const { name, email, message } = parsed.data;
    trackFormSubmit("contact", "success");
    trackWhatsAppClick("contact_form");
    trackCtaConversion("Contact Form Submit", "whatsapp");
    const text = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
    window.open(`https://wa.me/919067572205?text=${text}`, "_blank", "noopener,noreferrer");
    setForm({ name: "", email: "", message: "" });
  };



  return (
    <section id="contact" className="relative py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-3xl"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-neon-blue font-body">Contact</span>
          <h2 className="section-title gradient-text mt-2">Let's build something modern.</h2>
          <p className="text-foreground/70 font-body mt-3">
            Open to AI consulting, creative partnerships, and startup collaborations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start"
          >
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                onClick={() => {
                  if (c.label === "WhatsApp") trackWhatsAppClick("contact_channels");
                  trackButtonClick(`Contact: ${c.label}`, "contact");
                }}
                className="glass-card rounded-xl p-5 group hover:neon-glow transition-shadow duration-300"
              >

                <c.icon className="w-5 h-5 text-neon-blue group-hover:text-neon-pink transition-colors mb-3" />
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-body">{c.label}</p>
                <p className="text-sm text-foreground font-body mt-1 break-all">{c.value}</p>
              </a>
            ))}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-6 space-y-4"
          >
            <input
              type="text"
              placeholder="Your Name"
              aria-label="Your name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-muted/40 border border-border rounded-lg px-4 py-3 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-neon-blue transition-colors"
            />
            <input
              type="email"
              placeholder="Your Email"
              aria-label="Your email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-muted/40 border border-border rounded-lg px-4 py-3 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-neon-blue transition-colors"
            />
            <textarea
              placeholder="Tell me about your idea or business challenge…"
              aria-label="Your message"
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-muted/40 border border-border rounded-lg px-4 py-3 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-neon-blue transition-colors resize-none"
            />
            <button type="submit" className="btn-neon text-primary-foreground flex items-center gap-2 w-full justify-center">
              <Send className="w-4 h-4" /> Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
