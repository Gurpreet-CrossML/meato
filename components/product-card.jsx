"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";

function StarRating({ rating, size = 12 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={
            i <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-stone-200 text-stone-200 dark:fill-stone-600 dark:text-stone-600"
          }
        />
      ))}
    </div>
  );
}

export { StarRating };

export default function ProductCard({ product, onQuickView }) {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setAdding(true);
    addItem(product, product.weight?.[0] ?? "");
    toast.success(`${product.name} added to cart`, {
      description: `${product.weight?.[0] ?? ""} · $${product.price}`,
    });
    setTimeout(() => setAdding(false), 600);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group relative flex flex-col glass rounded-3xl overflow-hidden cursor-pointer"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
      onClick={() => onQuickView?.(product)}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white tracking-wide ${product.badgeColor ?? "bg-orange-500"}`}
          >
            {product.badge}
          </span>
        )}

        {/* Original price badge */}
        {product.originalPrice && (
          <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-bold text-white bg-black/50 backdrop-blur-sm">
            SAVE ${(product.originalPrice - product.price).toFixed(0)}
          </span>
        )}

        {/* Quick View Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.05 }}
          className="absolute bottom-3 right-3 w-9 h-9 flex items-center justify-center glass rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 text-white hover:bg-white/30"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView?.(product);
          }}
        >
          <Eye size={16} />
        </motion.button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Category */}
        <p className="text-[10px] font-semibold tracking-widest text-[#E86A33] dark:text-[#FF7A3C] uppercase">
          {product.category}
        </p>

        {/* Name */}
        <h3 className="font-bold text-base leading-tight text-foreground line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-foreground/50">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price & Cart */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-foreground">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-foreground/40 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleAddToCart}
            disabled={adding}
            className="flex items-center gap-1.5 meato-btn px-4 py-2 rounded-full text-xs font-semibold disabled:opacity-70"
          >
            <ShoppingCart size={13} />
            {adding ? "Added!" : "Add"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
