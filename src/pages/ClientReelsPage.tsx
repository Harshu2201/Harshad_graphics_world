import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  Loader2,
  MessageSquare,
  Quote,
  Send,
  Sparkles,
  Star,
  UserRound,
  Video,
  X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import FilmCard from "@/components/FilmCard";
import { clientReels } from "@/components/ClientReelsSection";
import type { Film } from "@/data/films";
import {
  trackFormSubmit,
  trackCtaConversion,
  trackWhatsAppClick,
  trackPageView,
} from "@/lib/analytics";

const WHATSAPP_NUMBER = "919067572205";

const deliverables = [
  {
    icon: UserRound,
    title: "UGC AI content, customised to you",
    text: "Reels built around a dedicated face character sheet — the same face, look and expressions in every video, so your brand gets a recognisable on-camera presence.",
  },
  {
    icon: Sparkles,
    title: "Scripted, generated, edited",
    text: "Hooks, script, AI generation, voice, captions, music and sound design — a finished, ready-to-post vertical reel every time.",
  },
  {
    icon: Video,
    title: "Made for Reels & Meta ads",
    text: "Delivered in 9:16, optimised for Instagram Reels, Stories and Meta ad placements with conversion-first pacing.",
  },
  {
    icon: BadgeCheck,
    title: "Brand-consistent output",
    text: "Your colours, product and messaging stay locked in across every reel, so campaigns look like one brand — not one-offs.",
  },
];

const testimonials = [
  {
    brand: "Amoha Herbals",
    role: "Herbal wellness brand",
    quote:
      "Harshad's AI UGC reels gave our brand a face and a voice. The consistency across every video is what impressed us most.",
  },
  {
    brand: "AI with Harshu",
    role: "AI content channel",
    quote:
      "Daily AI reels that actually look premium. The face character makes the content feel like a real creator, not a template.",
  },
  {
    brand: "Veripeers",
    role: "Growth & marketing team",
    quote:
      "Conversion-focused UGC reels delivered fast and ready for our ads. The hook-to-CTA structure lifted our engagement.",
  },
  {
    brand: "AI Okara",
    role: "Creative studio",
    quote:
      "Professional delivery, clear communication and reels that match our brand guidelines frame to frame.",
  },
];

const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100, "Name is too long"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid contact number")
    .max(20, "Contact number is too long")
    .regex(/^[+0-9 ()-]+$/, "Contact number can only contain numbers"),
  want_ugc: z.boolean(),
});

type LeadForm = z.infer<typeof leadSchema>;

const inputClass =
  "w-full bg-muted/40 border border-border rounded-lg px-4 py-3 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-neon-blue transition-colors";

const ClientReelsPage = () => {
  const [open, setOpen] = useState<Film | null>(null);
  const [form, setForm] = useState<LeadForm>({ name: "", phone: "", want_ugc: true });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = "Client AI Reels — UGC AI Content | Mr. Harshad Harishchandra Pakhale";
    trackPageView("/client-reels");
  }, []);

  const whatsappHref = (text?: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = leadSchema.safeParse(form);
    if (!parsed.success) {
      trackFormSubmit("client-reel-lead", "error", parsed.error.issues[0].message);
      toast({
        title: "Check your details",
        description: parsed.error.issues[0].message,
        variant: "destructive",
      });
      return;
    }

    const data = parsed.data;
    setSending(true);
    const { error } = await supabase.from("client_leads").insert({
      name: data.name,
      phone: data.phone,
      want_ugc: data.want_ugc,
      source: "client-reels-page",
    });
    setSending(false);

    if (error) {
      trackFormSubmit("client-reel-lead", "error", error.message);
      toast({
        title: "Could not send the request",
        description: "Please try again, or message me directly on WhatsApp.",
        variant: "destructive",
      });
      return;
    }

    trackFormSubmit("client-reel-lead", "success");
    trackCtaConversion("Client Reel Lead", "whatsapp");
    trackWhatsAppClick("client_reels_form");
    setSent(true);

    const summary = [
      "New client reel enquiry",
      `Name: ${data.name}`,
      `Contact number: ${data.phone}`,
      data.want_ugc ? "Interested in: UGC AI content (with face character)" : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(whatsappHref(summary), "_blank", "noopener,noreferrer");
    setForm({ name: "", phone: "", want_ugc: true });
    toast({
      title: "Request received",
      description: "I'll get back to you shortly. WhatsApp is open for an instant reply.",
    });
  };

  return (
    <div className="relative min-h-dvh bg-background">
      <Navbar />
      <main className="pt-24">
        {/* Hero */}
        <section className="section-container pt-6 pb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-body"
            >
              <ArrowLeft className="w-4 h-4" /> Back to home
            </Link>
            <span className="block text-xs tracking-[0.3em] uppercase text-neon-blue font-body mt-6">
              Client Work
            </span>
            <h1 className="section-title gradient-text mt-2">Client AI Reels</h1>
            <p className="text-foreground/70 font-body mt-4">
              Real AI reels delivered for brands — scripted, generated, edited and optimised for
              Instagram and Meta ads. Every reel below was produced end-to-end by me.
            </p>
          </motion.div>
        </section>

        {/* All reels grid — everything visible at once */}
        <section className="section-container pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {clientReels.map((reel, i) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.05, 0.3) }}
                className="w-full max-w-[320px]"
              >
                <FilmCard film={reel} onOpen={() => setOpen(reel)} autoPlayWhenVisible />
              </motion.div>
            ))}
          </div>
        </section>

        {/* UGC / face character pitch */}
        <section className="section-container py-16">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="section-title gradient-text"
          >
            Customised UGC AI Content
          </motion.h2>
          <p className="mb-10 max-w-2xl font-body text-sm text-muted-foreground md:text-base">
            Want reels like these for your brand? I build UGC-style AI content on a dedicated face
            character sheet — a consistent on-camera presence your audience recognises.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {deliverables.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.06, 0.24) }}
                className="glass-card rounded-2xl p-6 tilt-3d"
              >
                <d.icon className="w-6 h-6 text-neon-blue" />
                <h3 className="font-heading text-xl mt-3 gradient-text">{d.title}</h3>
                <p className="text-sm text-foreground/70 font-body mt-2 leading-relaxed">{d.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-container py-16">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="section-title gradient-text"
          >
            What Clients Say
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-5 mt-8">
            {testimonials.map((t, i) => (
              <motion.figure
                key={t.brand}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.06, 0.24) }}
                className="glass-card rounded-2xl p-6 tilt-3d"
              >
                <Quote className="w-5 h-5 text-neon-blue" />
                <blockquote className="text-sm text-foreground/80 font-body mt-3 leading-relaxed">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4">
                  <div className="flex items-center gap-1" aria-label="Rated 5 out of 5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-current text-neon-blue" />
                    ))}
                  </div>
                  <p className="font-heading text-lg gradient-text mt-1">{t.brand}</p>
                  <p className="text-xs text-muted-foreground font-body">{t.role}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </section>

        {/* Contact / pricing */}
        <section id="reel-contact" className="section-container py-16">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="section-title gradient-text"
          >
            Want a Video Like This?
          </motion.h2>
          <p className="mb-10 max-w-2xl font-body text-sm text-muted-foreground md:text-base">
            Pricing depends on the reel length, voiceover and usage — we discuss it directly on
            WhatsApp. Send your details and the chat opens instantly.
          </p>

          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            <motion.form
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-6 md:p-8 space-y-4"
            >
              <div>
                <label htmlFor="lead-name" className="text-xs uppercase tracking-widest text-muted-foreground font-body">
                  Name
                </label>
                <input
                  id="lead-name"
                  className={`${inputClass} mt-2`}
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label htmlFor="lead-phone" className="text-xs uppercase tracking-widest text-muted-foreground font-body">
                  Contact number
                </label>
                <input
                  id="lead-phone"
                  inputMode="tel"
                  className={`${inputClass} mt-2`}
                  placeholder="+91 ..."
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  required
                />
              </div>
              <label className="flex items-start gap-3 text-sm text-foreground/80 font-body cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.want_ugc}
                  onChange={(e) => setForm((p) => ({ ...p, want_ugc: e.target.checked }))}
                  className="mt-1 accent-[hsl(var(--neon-blue))] w-4 h-4"
                />
                <span>
                  I want <strong>UGC AI content</strong> with the face character sheet — reels like
                  the ones on this page.
                </span>
              </label>

              <button
                type="submit"
                disabled={sending}
                className="btn-neon text-primary-foreground flex items-center gap-2 w-full justify-center disabled:opacity-60"
              >
                {sending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <CalendarCheck className="w-4 h-4" /> Contact us on WhatsApp
                  </>
                )}
              </button>

              {sent && (
                <p className="text-sm text-neon-blue font-body text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Request sent. We'll talk price and timeline on
                  WhatsApp.
                </p>
              )}
            </motion.form>

            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <a
                href={whatsappHref("Hi! I saw your Client AI Reels page and want a quote for UGC AI content.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackWhatsAppClick("client_reels_direct");
                  trackCtaConversion("Client Reels WhatsApp Direct", "whatsapp");
                }}
                className="glass-card rounded-2xl p-6 block tilt-3d group"
              >
                <MessageSquare className="w-6 h-6 text-neon-blue group-hover:text-neon-pink transition-colors" />
                <p className="font-heading text-2xl gradient-text mt-3">Chat on WhatsApp</p>
                <p className="text-sm text-foreground/70 font-body mt-1">
                  +91 90675 72205 — price and package discussed directly, no forms in between.
                </p>
              </a>
              <div className="glass-card rounded-2xl p-6">
                <Send className="w-5 h-5 text-neon-blue" />
                <p className="text-sm text-foreground/80 font-body mt-3 leading-relaxed">
                  Every enquiry reaches me on WhatsApp instantly with your name and number —
                  typically answered within a few hours during the day.
                </p>
              </div>
            </motion.aside>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label="Close video"
            className="absolute right-4 top-4 flex min-h-11 min-w-11 items-center justify-center rounded-full glass-card text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
          <video
            src={open.src}
            poster={open.poster}
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] w-auto max-w-full rounded-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default ClientReelsPage;
