"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import axios from "axios";
import { CHAT_API_LEAVE_ROUTE } from "../../constants";

const RATINGS = [
  { value: "good", label: "Good", emoji: "👍" },
  { value: "very_good", label: "Very Good", emoji: "🌟" },
  { value: "unsatisfied", label: "Unsatisfied", emoji: "😞" },
];

/**
 * FeedbackModal
 *
 * Appears inside the chat window when the AI response has `is_leaving: true`.
 * Props:
 *   - sessionId  {string}    — the session_id from the last AI message
 *   - onDismiss  {function}  — called after the exit animation finishes
 */
export default function FeedbackModal({ sessionId, onDismiss }) {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(true);

  const handleRate = async (rating) => {
    if (isLoading || submitted) return;
    setIsLoading(true);
    try {
      await axios.post(CHAT_API_LEAVE_ROUTE, {
        session_id: sessionId,
        session_rating: rating,
      });
    } catch (err) {
      console.error("[FeedbackModal] failed to submit feedback:", err);
    } finally {
      setIsLoading(false);
      setSubmitted(true);
      // After showing the thank-you for 1.5 s, trigger exit animation
      setTimeout(() => {
        setVisible(false);
      }, 1500);
    }
  };

  return (
    <AnimatePresence onExitComplete={onDismiss}>
      {visible && (
        <motion.div
          key="feedback-modal"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: "spring", damping: 22, stiffness: 300 }}
          className="mx-3 mb-2 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl px-4 py-3 shadow-lg"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              /* ─── Rating buttons ─── */
              <motion.div
                key="rating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-2.5">
                  How was your experience?
                </p>
                <div className="flex gap-2">
                  {RATINGS.map(({ value, label, emoji }) => (
                    <button
                      key={value}
                      onClick={() => handleRate(value)}
                      disabled={isLoading}
                      className={`flex-1 flex flex-col items-center gap-1 rounded-xl border py-2.5 text-xs font-medium transition-all duration-200
                        border-white/10 text-white/70 bg-white/5
                        hover:border-[#E86A33]/60 hover:bg-[#E86A33]/10 hover:text-white
                        active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <span className="text-lg leading-none">{emoji}</span>
                      <span>{label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* ─── Thank-you message ─── */
              <motion.div
                key="thankyou"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="flex flex-col items-center gap-1.5 py-1"
              >
                <Heart size={22} className="text-[#E86A33] fill-[#E86A33]" />
                <p className="text-sm font-semibold text-white/90">
                  Thank you for your feedback!
                </p>
                <p className="text-xs text-white/40">
                  We appreciate your time.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
