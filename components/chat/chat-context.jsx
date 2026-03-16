"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
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

// ── Daily session ID ─────────────────────────────────────────────────────
// Generates a stable ID that is tied to the current calendar day.
// A new ID is created automatically when the date changes.
const DAILY_ID_KEY = "meato_chat_daily_id";

function getDailyId() {
  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
  try {
    const stored = JSON.parse(localStorage.getItem(DAILY_ID_KEY) || "null");
    if (stored && stored.date === today) {
      return stored.id;
    }
    // New day (or first visit) — generate a fresh ID
    const id = Date.now().toString();
    localStorage.setItem(DAILY_ID_KEY, JSON.stringify({ date: today, id }));
    return id;
  } catch {
    return Date.now().toString();
  }
}

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
        body: JSON.stringify({ query: content.trim(), id: getDailyId() }),
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
      value={{
        isOpen,
        toggleChat,
        closeChat,
        messages,
        addMessage,
        clearChat,
        isLoading,
      }}
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
