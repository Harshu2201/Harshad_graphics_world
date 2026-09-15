import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { ArrowLeft, CalendarCheck, Loader2, Mail, MessageSquare, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import Particles from "@/components/Particles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  trackFormSubmit,
  trackCtaConversion,
  trackWhatsAppClick,
  trackPageView,
} from "@/lib/analytics";

const WHATSAPP_NUMBER = "919067572205";

const services = [
  "AI Video Production",
  "Social Media Management",
  "Meta Ads Strategy",
  "Brand Content & Reels",
  "AI Consulting",
  "Other",
];

const budgets = ["Under ₹25k", "₹25k – ₹50k", "₹50k – ₹1L", "₹1L+", "Let's discuss"];

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email is too long"),
  phone: z
    .string()
    .trim()
    .max(20, "Phone number is too long")
    .regex(/^[+0-9 ()-]*$/, "Phone can only contain numbers")
    .optional()
    .or(z.literal("")),
  service: z.string().trim().min(2, "Please pick a service"),
  preferred_date: z.string().trim().optional().or(z.literal("")),
  budget: z.string().trim().optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Tell me a bit more (10+ characters)")
    .max(1000, "Message is too long"),
});

type BookingForm = z.infer<typeof bookingSchema>;

const emptyForm: BookingForm = {
  name: "",
  email: "",
  phone: "",
  service: services[0],
  preferred_date: "",
  budget: budgets[0],
  message: "",
};

const inputClass =
  "w-full bg-muted/40 border border-border rounded-lg px-4 py-3 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-neon-blue transition-colors";

const Contact = () => {
  const [form, setForm] = useState<BookingForm>(emptyForm);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = "Book a Call — Mr. Harshad Harishchandra Pakhale";
    trackPageView("/contact");
  }, []);

  const set = (key: keyof BookingForm) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const whatsappHref = (text?: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = bookingSchema.safeParse(form);
    if (!parsed.success) {
      trackFormSubmit("booking", "error", parsed.error.issues[0].message);
      toast({
        title: "Check your details",
        description: parsed.error.issues[0].message,
        variant: "destructive",
      });
      return;
    }

    const data = parsed.data;
    setSending(true);
    const { error } = await supabase.from("bookings").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      service: data.service,
      preferred_date: data.preferred_date ? data.preferred_date : null,
      budget: data.budget || null,
      message: data.message,
    });
    setSending(false);

    if (error) {
      trackFormSubmit("booking", "error", error.message);
      toast({
        title: "Could not send the request",
        description: "Please try again, or message me directly on WhatsApp.",
        variant: "destructive",
      });
      return;
    }

    trackFormSubmit("booking", "success");
    trackCtaConversion("Booking Request", "whatsapp");
    trackWhatsAppClick("booking_form");
    setSent(true);

    const summary = [
      "New booking request",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.phone ? `Phone: ${data.phone}` : null,
      `Service: ${data.service}`,
      data.preferred_date ? `Preferred date: ${data.preferred_date}` : null,
      data.budget ? `Budget: ${data.budget}` : null,
      `Details: ${data.message}`,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(whatsappHref(summary), "_blank", "noopener,noreferrer");
    setForm(emptyForm);
    toast({
      title: "Request received",
      description: "I'll get back to you shortly. WhatsApp is open for an instant reply.",
    });
  };

  return (
    <div className="relative min-h-dvh bg-background">
      <Particles />
      <Navbar />
      <main className="pt-28">
        <section className="section-container pt-0">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-body"
            >
              <ArrowLeft className="w-4 h-4" /> Back to home
            </Link>
            <span className="block text-xs tracking-[0.3em] uppercase text-neon-blue font-body mt-6">
              Contact
            </span>
            <h1 className="section-title gradient-text mt-2">Book a call with me.</h1>
            <p className="text-foreground/70 font-body mt-3">
              Tell me about your brand and pick a date that works. I reply within 24 hours — or
              message me on WhatsApp for an instant answer.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 mt-12 items-start">
            <motion.form
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-6 md:p-8 space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground font-body">
                    Name
                  </label>
                  <input
                    id="name"
                    className={`${inputClass} mt-2`}
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => set("name")(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground font-body">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`${inputClass} mt-2`}
                    placeholder="you@brand.com"
                    value={form.email}
                    onChange={(e) => set("email")(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="text-xs uppercase tracking-widest text-muted-foreground font-body">
                    Phone / WhatsApp
                  </label>
                  <input
                    id="phone"
                    inputMode="tel"
                    className={`${inputClass} mt-2`}
                    placeholder="+91 ..."
                    value={form.phone ?? ""}
                    onChange={(e) => set("phone")(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="date" className="text-xs uppercase tracking-widest text-muted-foreground font-body">
                    Preferred date
                  </label>
                  <input
                    id="date"
                    type="date"
                    className={`${inputClass} mt-2`}
                    value={form.preferred_date ?? ""}
                    onChange={(e) => set("preferred_date")(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="service" className="text-xs uppercase tracking-widest text-muted-foreground font-body">
                    Service
                  </label>
                  <select
                    id="service"
                    className={`${inputClass} mt-2`}
                    value={form.service}
                    onChange={(e) => set("service")(e.target.value)}
                  >
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="text-xs uppercase tracking-widest text-muted-foreground font-body">
                    Budget
                  </label>
                  <select
                    id="budget"
                    className={`${inputClass} mt-2`}
                    value={form.budget ?? ""}
                    onChange={(e) => set("budget")(e.target.value)}
                  >
                    {budgets.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="text-xs uppercase tracking-widest text-muted-foreground font-body">
                  Project details
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className={`${inputClass} mt-2 resize-none`}
                  placeholder="What are we building? Goals, timeline, references…"
                  value={form.message}
                  onChange={(e) => set("message")(e.target.value)}
                  required
                />
              </div>

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
                    <CalendarCheck className="w-4 h-4" /> Request booking
                  </>
                )}
              </button>

              {sent && (
                <p className="text-sm text-neon-blue font-body text-center">
                  Request saved. I'll confirm your slot soon.
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
                href={whatsappHref("Hi Mr. Harshad Harishchandra Pakhale! I'd like to book a call about a project.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackWhatsAppClick("contact_page_direct");
                  trackCtaConversion("WhatsApp Direct", "whatsapp");
                }}
                className="glass-card rounded-2xl p-6 block tilt-3d group"
              >
                <MessageSquare className="w-6 h-6 text-neon-blue group-hover:text-neon-pink transition-colors" />
                <p className="font-heading text-2xl gradient-text mt-3">Chat on WhatsApp</p>
                <p className="text-sm text-foreground/70 font-body mt-1">
                  +91 90675 72205 — fastest way to reach me.
                </p>
              </a>

              <a
                href="mailto:harshup2205@gmail.com"
                className="glass-card rounded-2xl p-6 block tilt-3d group"
              >
                <Mail className="w-6 h-6 text-neon-blue group-hover:text-neon-pink transition-colors" />
                <p className="font-heading text-2xl gradient-text mt-3">Email me</p>
                <p className="text-sm text-foreground/70 font-body mt-1 break-all">
                  harshup2205@gmail.com
                </p>
              </a>

              <div className="glass-card rounded-2xl p-6">
                <Send className="w-5 h-5 text-neon-blue" />
                <p className="text-sm text-foreground/80 font-body mt-3">
                  Every request lands in my inbox and on WhatsApp, so nothing gets missed. Calls run
                  30–45 minutes over Google Meet or a WhatsApp call.
                </p>
              </div>
            </motion.aside>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Contact;
