import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/919067572205"
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 2 }}
    whileHover={{ scale: 1.1 }}
    className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center neon-glow cursor-pointer"
    style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}
    aria-label="Chat on WhatsApp"
  >
    <MessageSquare className="w-6 h-6 text-foreground" />
  </motion.a>
);

export default WhatsAppButton;
