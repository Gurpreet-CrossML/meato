"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Check } from "lucide-react";
import ScrollReveal from "@/components/scroll-reveal";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <ScrollReveal>
          <div className="glass rounded-3xl p-10 md:p-14 text-center overflow-hidden relative">
            {/* Accent blob */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#E86A33]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#5C4033]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#E86A33]/10 dark:bg-[#FF7A3C]/10 flex items-center justify-center mx-auto mb-6">
                <Mail
                  size={24}
                  className="text-[#E86A33] dark:text-[#FF7A3C]"
                />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Join the <span className="gradient-text">Meato Club</span>
              </h2>
              <p className="text-foreground/60 text-sm md:text-base mb-8 leading-relaxed">
                Get exclusive cuts, recipes, and member-only offers delivered
                straight to your inbox. No spam, just great meat.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-3 py-4"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check size={20} className="text-emerald-500" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm">You're in!</p>
                    <p className="text-xs text-foreground/50">
                      Check your email for a welcome offer.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 px-5 py-3.5 rounded-full glass border border-border text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-[#E86A33] dark:focus:border-[#FF7A3C] transition"
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="meato-btn px-7 py-3.5 rounded-full font-bold text-sm flex items-center gap-2 whitespace-nowrap"
                  >
                    Subscribe
                    <ArrowRight size={15} />
                  </motion.button>
                </form>
              )}

              <p className="text-xs text-foreground/30 mt-4">
                Join 12,000+ meat lovers. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
