"use client";

import { ChatbotProvider } from "./chat-context";
import ChatButton from "./chat-button";
import ChatWindow from "./chat-window";

export default function Chatbot() {
  return (
    <ChatbotProvider>
      <ChatWindow />
      <ChatButton />
    </ChatbotProvider>
  );
}
