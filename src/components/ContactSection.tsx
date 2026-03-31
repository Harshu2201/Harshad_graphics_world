import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Mail, MessageSquare } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Name: ${form.name}%0AEmail: ${form.email}%0AMessage: ${form.message}`;
    window.open(`https://wa.me/919067572205?text=${text}`, "_blank");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="section-title gradient-text mb-4"
        >
          Get In Touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-lg text-neon-purple font-body italic mb-12"
        >
          "Let's Create Something Cinematic Together"
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <a href="mailto:harshup2205@gmail.com" className="glass-card rounded-xl p-5 flex items-center gap-4 group hover:neon-glow transition-shadow duration-300">
              <Mail className="w-6 h-6 text-neon-blue group-hover:text-neon-pink transition-colors" />
              <div>
                <p className="text-xs text-muted-foreground font-body">Email</p>
                <p className="text-foreground font-body">harshup2205@gmail.com</p>
              </div>
            </a>
            <a href="https://wa.me/919067572205" target="_blank" rel="noopener noreferrer" className="glass-card rounded-xl p-5 flex items-center gap-4 group hover:neon-glow transition-shadow duration-300">
              <MessageSquare className="w-6 h-6 text-neon-blue group-hover:text-neon-pink transition-colors" />
              <div>
                <p className="text-xs text-muted-foreground font-body">WhatsApp</p>
                <p className="text-foreground font-body">+91 9067572205</p>
              </div>
            </a>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass-card rounded-xl p-6 space-y-4"
          >
            <input
              type="text"
              placeholder="Your Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-neon-blue transition-colors"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-neon-blue transition-colors"
            />
            <textarea
              placeholder="Your Message"
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-muted/50 border border-border rounded-lg px-4 py-3 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-neon-blue transition-colors resize-none"
            />
            <button type="submit" className="btn-neon text-primary-foreground flex items-center gap-2 w-full justify-center">
              <Send className="w-4 h-4" /> Send to WhatsApp
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
