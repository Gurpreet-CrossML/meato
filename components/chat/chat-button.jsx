"use client";

import { motion } from "framer-motion";
import { Bot, MessageSquare, X } from "lucide-react";
import { useChatbot } from "./chat-context";

export default function ChatButton() {
  const { isOpen, toggleChat } = useChatbot();

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        initial: { delay: 1 },
      }}
      onClick={toggleChat}
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] ${
        isOpen
          ? "bg-stone-800"
          : "bg-gradient-to-br from-[#E86A33] to-[#c85a28] dark:from-[#FF7A3C] dark:to-[#d95f2e]"
      }`}
      aria-label="Toggle AI Assistant"
    >
      <motion.div
        initial={false}
        animate={{ rotate: isOpen ? 90 : 0, scale: isOpen ? 0.8 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? <X size={24} /> : <Bot size={28} />}
      </motion.div>
    </motion.button>
  );
}
