"use client";

import { motion } from "framer-motion";
import { Bot, User, TicketCheck, AlertCircle } from "lucide-react";

/**
 * Renders a single chat bubble.
 * Supports:
 *  - isTicket  → amber "support ticket" styling
 *  - isError   → muted error styling
 *  - Markdown-style bullet lists (* or -) with basic bold (**text**)
 */
export default function ChatMessage({ message }) {
  const isUser = message.role === "user";
  const isTicket = Boolean(message.isTicket);
  const isError = Boolean(message.isError);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", damping: 25, stiffness: 400 }}
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div className={`flex max-w-[85%] gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        {/* ── Avatar ── */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
            ${
              isUser
                ? "bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300"
                : isTicket
                ? "bg-amber-500 text-white shadow-md"
                : isError
                ? "bg-rose-500/80 text-white shadow-md"
                : "bg-gradient-to-br from-[#E86A33] to-[#c85a28] shadow-md text-white"
            }
          `}
        >
          {isUser ? (
            <User size={14} />
          ) : isTicket ? (
            <TicketCheck size={16} />
          ) : isError ? (
            <AlertCircle size={16} />
          ) : (
            <Bot size={16} />
          )}
        </div>

        {/* ── Bubble ── */}
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
            ${
              isUser
                ? "bg-[#E86A33] dark:bg-[#FF7A3C] text-white rounded-tr-sm"
                : isTicket
                ? "bg-amber-50 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-600/50 text-amber-900 dark:text-amber-100 rounded-tl-sm"
                : isError
                ? "glass bg-rose-50/70 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-700/30 rounded-tl-sm text-foreground"
                : "glass bg-white/70 dark:bg-white/10 border border-white/20 dark:border-white/5 rounded-tl-sm text-foreground"
            }
          `}
        >
          {isTicket && (
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400 mb-1.5">
              Support Ticket Created
            </p>
          )}
          <MessageContent text={message.content} />
        </div>
      </div>
    </motion.div>
  );
}

// ── Inline content renderer ───────────────────────────────────────────────────
// Handles:  * bullet  /  - bullet  /  **bold**  /  *italic*  /  plain text
function MessageContent({ text }) {
  if (!text) return null;

  const lines = text.split("\n");
  const elements = [];
  let listItems = [];

  const flushList = () => {
    if (listItems.length === 0) return;
    elements.push(
      <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-1 my-1">
        {listItems.map((item, i) => (
          <li key={i}>
            <InlineText text={item} />
          </li>
        ))}
      </ul>
    );
    listItems = [];
  };

  lines.forEach((line, idx) => {
    const bulletMatch = line.match(/^[\*\-]\s+(.+)/);
    if (bulletMatch) {
      listItems.push(bulletMatch[1]);
    } else {
      flushList();
      if (line.trim() === "") {
        // blank line — add small spacer only if not the first element
        if (elements.length > 0) {
          elements.push(<div key={`sp-${idx}`} className="h-1" />);
        }
      } else {
        elements.push(
          <p key={idx}>
            <InlineText text={line} />
          </p>
        );
      }
    }
  });
  flushList();

  return <div className="space-y-0.5">{elements}</div>;
}

// Renders **bold** and *italic* inline
function InlineText({ text }) {
  // Split on **bold** and *italic* patterns
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (/^\*\*[^*]+\*\*$/.test(part)) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (/^\*[^*]+\*$/.test(part)) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
