"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  CHAT_API_ROUTE,
  CHAT_STORAGE_KEY,
  CHAT_WELCOME_MESSAGE,
  CHAT_ERROR_MESSAGE,
} from "@/constants";

const ChatbotContext = createContext(null);

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "assistant",
  content: CHAT_WELCOME_MESSAGE,
  isTicket: false,
};

export function ChatbotProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);

  // ── Persist: load from localStorage on mount ──────────────────────────────
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CHAT_STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved));
    } catch (e) {
      console.warn("Failed to load chat messages from localStorage", e);
    }
  }, []);

  // ── Persist: save whenever messages change ────────────────────────────────
  useEffect(() => {
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.warn("Failed to save chat messages to localStorage", e);
    }
  }, [messages]);

  const toggleChat = () => setIsOpen((prev) => !prev);
  const closeChat = () => setIsOpen(false);

  // ── Send a user message and fetch an AI response ──────────────────────────
  const addMessage = useCallback(async (content) => {
    if (!content?.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      isTicket: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const res = await fetch(CHAT_API_ROUTE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: content.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error ?? "API error");
      }

      const isTicket = Boolean(data.isTicketRequired);

      const botMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        // Show userNotification when a ticket is required, otherwise show the full answer
        content: isTicket ? data.userNotification : data.message,
        isTicket,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("[chatbot] error fetching response:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: "assistant",
          content: CHAT_ERROR_MESSAGE,
          isTicket: false,
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearChat = () => {
    setMessages([WELCOME_MESSAGE]);
  };

  return (
    <ChatbotContext.Provider
      value={{ isOpen, toggleChat, closeChat, messages, addMessage, clearChat, isLoading }}
    >
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatbot() {
  const ctx = useContext(ChatbotContext);
  if (!ctx) throw new Error("useChatbot must be used inside <ChatbotProvider>");
  return ctx;
}
