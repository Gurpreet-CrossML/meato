"use client";

import { v4 as uuidv4 } from "uuid";

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
  CHAT_API_HISTORY_ROUTE,
} from "@/constants";

const ChatbotContext = createContext(null);

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "ai",
  content: CHAT_WELCOME_MESSAGE,
  isTicket: false,
};

// Permanent user ID
// Generated once on first visit and stored in localStorage forever.
// It only changes if the user manually clears their localStorage.
const USER_ID_KEY = "meato_chat_user_id";

function getUserId() {
  try {
    const stored = localStorage.getItem(USER_ID_KEY);
    if (stored) {
      return stored; // already exists — reuse it forever
    }
    // First visit — create a unique ID and persist it permanently
    const id = uuidv4();
    localStorage.setItem(USER_ID_KEY, id);
    return id;
  } catch {
    // Fallback (e.g. private-browsing storage denied)
    return uuidv4();
  }
}

export function ChatbotProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackSessionId, setFeedbackSessionId] = useState(null);

  // Fetch chat history from DB on mount
  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await fetch(
          `${CHAT_API_HISTORY_ROUTE}?session_id=${getUserId()}`,
        );
        if (!res.ok) return;

        const data = await res.json();
        if (data.success && data.history && data.history.length > 0) {
          const apiMessages = data.history.map((row) => ({
            id: row.id ? row.id.toString() : `${Date.now()}-${Math.random()}`,
            role: row.role === "ai" ? "ai" : "human",
            content: row.message,
            isTicket: false,
            is_liked: row.is_liked ?? null,
          }));

          setMessages([WELCOME_MESSAGE, ...apiMessages]);
        }
      } catch (e) {
        console.warn("Failed to load chat history from API", e);
      }
    }
    loadHistory();
  }, []);

  const toggleChat = () => setIsOpen((prev) => !prev);
  const closeChat = () => setIsOpen(false);

  // Send a user message and fetch an AI response
  const addMessage = useCallback(async (content) => {
    if (!content?.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "human",
      content: content.trim(),
      isTicket: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const res = await fetch(CHAT_API_ROUTE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: content.trim(), id: getUserId() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error ?? "API error");
      }

      const isTicket = Boolean(data.isTicketRequired);

      const botMessage = {
        id: data.id ? data.id.toString() : (Date.now() + 1).toString(),
        role: "ai",
        // Show userNotification when a ticket is required, otherwise show the full answer
        content: isTicket ? data.userNotification : data.message,
        isTicket,
        is_liked: null,
      };

      setMessages((prev) => [...prev, botMessage]);

      // Show feedback modal only when is_leaving is explicitly true
      if (data.is_leaving === true) {
        setFeedbackSessionId(data.session_id ?? null);
        setShowFeedback(true);
      }
    } catch (err) {
      console.error("[chatbot] error fetching response:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: "ai",
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
    try {
      localStorage.removeItem(USER_ID_KEY);
    } catch (e) {
      console.warn("Failed to remove user ID from localStorage", e);
    }
    setMessages([WELCOME_MESSAGE]);
    setShowFeedback(false);
    setFeedbackSessionId(null);
  };

  const dismissFeedback = () => {
    setShowFeedback(false);
    setFeedbackSessionId(null);
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
        showFeedback,
        feedbackSessionId,
        dismissFeedback,
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
