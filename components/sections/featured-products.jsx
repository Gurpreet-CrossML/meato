"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/product-card";
import ProductQuickView from "@/components/product-quick-view";
import ScrollReveal from "@/components/scroll-reveal";
import { products } from "@/lib/products";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FeaturedProducts() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const featured = products.filter((p) => p.featured).slice(0, 8);

  return (
    <section className="py-24 px-4" id="featured">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block text-[10px] font-bold tracking-[0.3em] text-[#E86A33] dark:text-[#FF7A3C] uppercase mb-4">
            Best Sellers
          </span>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Premium Cuts,
            <br />
            <span className="gradient-text">Chef Approved</span>
          </h2>
          <p className="text-foreground/50 mt-4 max-w-md mx-auto">
            Handpicked by our expert butchers for exceptional quality and
            unmatched flavor.
          </p>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.07}>
              <ProductCard
                product={product}
                onQuickView={setQuickViewProduct}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* View All Button */}
        <ScrollReveal className="text-center mt-14" delay={0.3}>
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="meato-btn px-10 py-4 rounded-full font-bold flex items-center gap-2 mx-auto"
            >
              View All Cuts
              <ArrowRight size={18} />
            </motion.button>
          </Link>
        </ScrollReveal>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </section>
  );
}
