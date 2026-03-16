"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Bot } from "lucide-react";
import { useChatbot } from "./chat-context";
import ChatMessage from "./chat-message";
import ChatInput from "./chat-input";

export default function ChatWindow() {
  const { isOpen, closeChat, messages, clearChat } = useChatbot();
  const bottomRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (isOpen && bottomRef.current) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-24 right-6 z-50 w-[90vw] sm:w-[420px] h-[70vh] sm:h-[740px] max-h-[calc(100vh-120px)]
                     glass-dark backdrop-blur-3xl rounded-3xl overflow-hidden shadow-2xl flex flex-col font-sans border border-white/10"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-black/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E86A33] to-[#c85a28] flex items-center justify-center text-white shadow-md">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-white tracking-wide">
                  Meato Assistant
                </h3>
                <p className="text-xs text-white/50 tracking-wider">
                  Ask about cuts or orders
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={clearChat}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Clear chat"
                title="Clear chat"
              >
                <Trash2 size={16} />
              </button>
              <button
                onClick={closeChat}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area - force light mode text styling where applicable so bubbles are readable */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1 items-start bg-background/5">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            <div ref={bottomRef} className="h-1" />
          </div>

          {/* Input Area */}
          <ChatInput />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
