import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { track } from "@/lib/analytics";

export const faqs = [
  {
    q: "What exactly does an AI Generalist do?",
    a: "I combine creative direction with AI tooling to solve business problems end-to-end — generating cinematic video, designing brand systems, writing performance copy and wiring the workflow so a small team ships like a big one.",
  },
  {
    q: "How are your AI films made?",
    a: "Every film starts with a concept, script and storyboard. I then prompt-engineer shots through generators like Runway, Kling and Sora-style models, and finish with a full post pass: edit, colour grade, sound design and motion polish.",
  },
  {
    q: "Can you manage social media for my brand?",
    a: "Yes. I currently run content for six brands across community, startup media and innovation councils — covering strategy, creative direction, publishing calendars and reporting.",
  },
  {
    q: "Do you run Meta Ads as well as create the creative?",
    a: "Both. Creative and media buying work best together, so I build the ad creative, set up the campaign structure in Business Meta Suite, and iterate on hooks against real ROAS data.",
  },
  {
    q: "What does a typical project cost and how long does it take?",
    a: "Scope drives both. A single AI film usually lands in 5–10 days, a brand creative system in 2–3 weeks, and social management runs as a monthly retainer. Message me with your brief and I will send a fixed quote.",
  },
  {
    q: "How do we start working together?",
    a: "Send a message via the contact form or WhatsApp with your goal, timeline and budget range. You will get a reply within one business day, usually with two or three routes to consider.",
  },
];

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="relative py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.3em] text-neon-cyan">
            <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" /> FAQ
          </span>
          <h2 id="faq-heading" className="section-title gradient-text mt-2">
            Questions, answered.
          </h2>
        </motion.div>

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i, 5) * 0.05 }}
                className="overflow-hidden rounded-xl glass-card"
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-button-${i}`}
                    onClick={() => {
                      setOpen(isOpen ? null : i);
                      if (!isOpen) track("faq_open", { question: f.q });
                    }}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-body text-base text-foreground transition-colors hover:text-neon-blue"
                  >
                    <span>{f.q}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-5 w-5 shrink-0 text-neon-purple transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-button-${i}`}
                  hidden={!isOpen}
                  className="px-5 pb-5 font-body text-sm leading-relaxed text-foreground/75"
                >
                  {f.a}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
