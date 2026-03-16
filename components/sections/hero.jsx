"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient - simulates premium meat photography */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            linear-gradient(135deg,
              #1a0e0a 0%,
              #2d1810 25%,
              #3d2415 50%,
              #1a0e0a 75%,
              #0a0604 100%
            )
          `,
        }}
      />

      {/* Warm light overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(ellipse at 30% 40%, rgba(232, 106, 51, 0.25) 0%, transparent 65%),
                       radial-gradient(ellipse at 70% 70%, rgba(92, 64, 51, 0.3) 0%, transparent 60%)`,
        }}
      />

      {/* Texture overlay */}
      <div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-6"
        >
          <div className="h-px w-8 bg-[#E86A33]" />
          <span className="text-[10px] font-bold tracking-[0.3em] text-[#E86A33] uppercase">
            Premium Butcher Selection
          </span>
          <div className="h-px w-8 bg-[#E86A33]" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] tracking-tight mb-6"
        >
          Exceptional <span className="text-[#E86A33]">Meat.</span>
          <br />
          Delivered{" "}
          <span className="relative inline-block">
            Fresh.
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
              className="absolute -bottom-2 left-0 right-0 h-0.5 bg-white/30 origin-left"
            />
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="text-base sm:text-lg text-white/60 max-w-xl mx-auto leading-relaxed mb-10"
        >
          Ethically sourced premium beef cuts prepared by expert butchers.
          Experience restaurant quality meat at home.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/shop">
            <motion.button
              whileHover={{
                scale: 1.03,
                boxShadow: "0 12px 40px rgba(232,106,51,0.5)",
              }}
              whileTap={{ scale: 0.97 }}
              className="meato-btn px-8 py-4 rounded-full font-bold text-base flex items-center gap-2"
            >
              Shop Premium Cuts
              <ArrowRight size={18} />
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 rounded-full font-bold text-base text-white/80 border border-white/20 backdrop-blur-sm hover:bg-white/10 transition flex items-center gap-2"
          >
            Explore Cuts
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex items-center justify-center gap-8 sm:gap-16 mt-16 pt-8 border-t border-white/10"
        >
          {[
            { value: "15+", label: "Premium Cuts" },
            { value: "4.9★", label: "Avg. Rating" },
            { value: "2-Day", label: "Delivery" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/40 mt-1 tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-widest text-white/30 uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
