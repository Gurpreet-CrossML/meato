"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { useChatbot } from "./chat-context";

export default function ChatInput() {
  const [input, setInput] = useState("");
  const { addMessage, isLoading } = useChatbot();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    addMessage(input.trim());
    setInput("");
  };

  const isDisabled = !input.trim() || isLoading;

  return (
    <div className="p-4 border-t border-border/50 bg-background/50 backdrop-blur-md rounded-b-2xl">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isLoading ? "Waiting for response…" : "Ask about cuts or recipes..."}
            disabled={isLoading}
            className="w-full pl-4 pr-10 py-3 rounded-full text-sm outline-none transition-all
                     glass border border-border focus:border-[#E86A33] dark:focus:border-[#FF7A3C]
                     disabled:opacity-60 disabled:cursor-not-allowed"
          />
          <Sparkles
            size={14}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#E86A33] dark:text-[#FF7A3C] opacity-50"
          />
        </div>

        <motion.button
          type="submit"
          disabled={isDisabled}
          whileHover={isDisabled ? {} : { scale: 1.05 }}
          whileTap={isDisabled ? {} : { scale: 0.95 }}
          className="w-11 h-11 rounded-full flex items-center justify-center shrink-0
                   disabled:opacity-50 disabled:cursor-not-allowed
                   bg-[#E86A33] hover:bg-[#c85a28] dark:bg-[#FF7A3C] dark:hover:bg-[#d95f2e]
                   text-white shadow-md transition-colors"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isLoading ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.15 }}
              >
                <Loader2 size={16} className="animate-spin" />
              </motion.span>
            ) : (
              <motion.span
                key="send"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.15 }}
              >
                <Send size={16} className="ml-0.5" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </form>

      {/* Typing indicator */}
      <AnimatePresence>
        {isLoading && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-muted-foreground mt-1.5 pl-2 flex items-center gap-1"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E86A33] animate-bounce [animation-delay:0ms]" />
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E86A33] animate-bounce [animation-delay:150ms]" />
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E86A33] animate-bounce [animation-delay:300ms]" />
            <span className="ml-1">Meato is thinking…</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
