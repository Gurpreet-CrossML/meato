"use client";

import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import axios from "axios";
import { CHAT_API_LIKE_ROUTE } from "../../constants";
import { useState } from "react";

export default function ChatMessage({ message }) {
  const isUser = message.role === "human";
  const isTicket = Boolean(message.isTicket);
  const isError = Boolean(message.isError);

  // Like/Dislike state
  const [likedStatus, setLikedStatus] = useState(message.is_liked ?? null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleLike = async (liked) => {
    if (likedStatus !== null || isUpdating) return;
    setIsUpdating(true);
    try {
      await axios.patch(CHAT_API_LIKE_ROUTE, {
        id: message.id,
        is_liked: liked,
      });
      setLikedStatus(liked);
    } catch (err) {
      console.error("Failed to save like status", err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", damping: 25, stiffness: 400 }}
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`flex max-w-[98%] gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
      >
        <div
          className={`px-4 py-3 text-sm leading-relaxed shadow-sm max-w-[98%]
            ${
              isUser
                ? "bg-[#E86A33] dark:bg-[#FF7A3C] text-white rounded-2xl rounded-tr-sm"
                : isTicket
                  ? "bg-amber-50 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-600/50 text-amber-900 dark:text-amber-100 rounded-2xl rounded-tl-sm"
                  : isError
                    ? "glass bg-rose-50/70 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-700/30 text-rose-900 dark:text-rose-100 rounded-2xl rounded-tl-sm"
                    : "glass bg-amber-50 dark:bg-stone-800/80 border border-amber-100 dark:border-stone-700/50 text-stone-800 dark:text-stone-200 rounded-2xl rounded-tl-sm"
            }
          `}
        >
          {isTicket && (
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400 mb-1.5">
              Support Ticket Created
            </p>
          )}
          <MessageContent text={message.content} />

          {!isUser && message.id && message.id !== "welcome" && !isError && (
            <div className="flex gap-2 mt-2 pt-2 border-t border-amber-200/50 dark:border-stone-700/50">
              <button
                onClick={() => handleLike(true)}
                disabled={likedStatus !== null || isUpdating}
                className={`p-1 rounded transition-colors ${
                  likedStatus === true
                    ? "text-[#E86A33] dark:text-[#FF7A3C]"
                    : "text-stone-500 hover:text-[#E86A33] hover:bg-stone-200 dark:hover:bg-stone-800"
                } ${likedStatus !== null && likedStatus !== true ? "hidden" : ""}`}
                aria-label="Like response"
              >
                <ThumbsUp
                  size={16}
                  className={
                    likedStatus === true
                      ? "fill-current outline-none"
                      : "outline-none"
                  }
                />
              </button>
              <button
                onClick={() => handleLike(false)}
                disabled={likedStatus !== null || isUpdating}
                className={`p-1 rounded transition-colors ${
                  likedStatus === false
                    ? "text-[#E86A33] dark:text-[#FF7A3C]"
                    : "text-stone-500 hover:text-[#E86A33] hover:bg-stone-200 dark:hover:bg-stone-800"
                } ${likedStatus !== null && likedStatus !== false ? "hidden" : ""}`}
                aria-label="Dislike response"
              >
                <ThumbsDown
                  size={16}
                  className={
                    likedStatus === false
                      ? "fill-current outline-none"
                      : "outline-none"
                  }
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Inline content renderer
// Handles:  * bullet  /  - bullet  /  **bold**  /  *italic*  /  [text](url)
function MessageContent({ text }) {
  if (!text) return null;

  const lines = text.split("\n");
  const elements = [];
  let listItems = [];

  const flushList = () => {
    if (listItems.length === 0) return;
    elements.push(
      <ul
        key={`list-${elements.length}`}
        className="list-disc list-inside space-y-1 my-1"
      >
        {listItems.map((item, i) => (
          <li key={i}>
            <InlineText text={item} />
          </li>
        ))}
      </ul>,
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
        if (elements.length > 0) {
          elements.push(<div key={`sp-${idx}`} className="h-1" />);
        }
      } else {
        elements.push(
          <p key={idx}>
            <InlineText text={line} />
          </p>,
        );
      }
    }
  });
  flushList();

  return <div className="space-y-0.5">{elements}</div>;
}

// Renders **bold**, *italic*, and [text](url) inline
function InlineText({ text }) {
  // Match links first, then bold, then italic (order matters for nested cases)
  const parts = text.split(/(\[[^\]]+\]\([^\)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return (
    <>
      {parts.map((part, i) => {
        // Markdown link: [text](url)
        if (/^\[[^\]]+\]\([^\)]+\)$/.test(part)) {
          const innerText = part.match(/\[([^\]]+)\]/)[1];
          const url = part.match(/\(([^\)]+)\)/)[1];
          return (
            <a
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 dark:text-amber-600 underline hover:text-red-800 dark:hover:text-red-300"
            >
              <InlineText text={innerText} />
            </a>
          );
        }
        // Bold: **text**
        if (/^\*\*[^*]+\*\*$/.test(part)) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        // Italic: *text*
        if (/^\*[^*]+\*$/.test(part)) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        // Plain text
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
