"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/scroll-reveal";
import { categories } from "@/lib/products";

export default function ShopByCategory() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block text-[10px] font-bold tracking-[0.3em] text-[#E86A33] dark:text-[#FF7A3C] uppercase mb-4">
            Browse
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            Shop by <span className="gradient-text">Category</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.id} delay={i * 0.08}>
              <Link href={`/shop?category=${cat.id}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative h-52 rounded-3xl overflow-hidden group cursor-pointer"
                >
                  {/* Background Image */}
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${cat.color} transition-opacity duration-300 group-hover:opacity-90`}
                  />

                  {/* Glass label */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="glass rounded-2xl px-4 py-3">
                      <h3 className="font-bold text-foreground text-sm">
                        {cat.name}
                      </h3>
                      <p className="text-foreground/60 text-xs mt-0.5">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  {/* Arrow on hover */}
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full text-white"
                  >
                    →
                  </motion.div>
                </motion.div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
