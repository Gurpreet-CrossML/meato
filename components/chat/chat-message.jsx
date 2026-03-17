"use client";

import { motion } from "framer-motion";

export default function ChatMessage({ message }) {
  const isUser = message.role === "human";
  const isTicket = Boolean(message.isTicket);
  const isError = Boolean(message.isError);

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
              className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
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
