// ─────────────────────────────────────────────────────────────
// Public constants — safe to import on both client and server.
// Secret values (API keys, webhook URLs) must live in .env only.
// ─────────────────────────────────────────────────────────────

/** Internal Next.js API route used by the chatbot to proxy n8n requests. */
export const CHAT_API_ROUTE = "/api/chat";

/** Key used to persist chat history in localStorage. */
export const CHAT_STORAGE_KEY = "meato-chat-messages";

/** Welcome message shown when the chat is first opened or cleared. */
export const CHAT_WELCOME_MESSAGE =
  "Hi there! I am the Meato Assistant. How can I help you find the perfect cut today?";

/** Fallback message shown when the n8n API is unreachable. */
export const CHAT_ERROR_MESSAGE =
  "Sorry, I couldn't reach the server right now. Please try again in a moment.";
