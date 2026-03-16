"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingCart,
  ChefHat,
  Scale,
  Flame,
  Leaf,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { toast } from "sonner";
import { StarRating } from "./product-card";

export default function ProductQuickView({ product, onClose }) {
  const { addItem } = useCart();
  const [selectedWeight, setSelectedWeight] = useState(
    product?.weight?.[0] ?? "",
  );
  const [imgIndex, setImgIndex] = useState(0);

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, selectedWeight);
    toast.success(`${product.name} added to cart`, {
      description: `${selectedWeight} · $${product.price}`,
    });
    onClose();
  };

  const images = product.images ?? [product.image];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 30, stiffness: 350 }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto glass rounded-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center glass rounded-full hover:bg-white/30 dark:hover:bg-white/10 transition"
          >
            <X size={18} />
          </button>

          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Gallery */}
            <div className="relative h-72 md:h-full min-h-[320px] overflow-hidden rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
              <AnimatePresence mode="wait">
                <motion.img
                  key={imgIndex}
                  src={images[imgIndex]}
                  alt={product.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setImgIndex((i) => (i === 0 ? images.length - 1 : i - 1))
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center glass rounded-full text-white"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() =>
                      setImgIndex((i) => (i === images.length - 1 ? 0 : i + 1))
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center glass rounded-full text-white"
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}

              {/* Badge */}
              {product.badge && (
                <span
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-white ${product.badgeColor ?? "bg-orange-500"}`}
                >
                  {product.badge}
                </span>
              )}
            </div>

            {/* Product Details */}
            <div className="p-8 flex flex-col gap-5">
              <div>
                <p className="text-xs font-semibold tracking-widest text-[#E86A33] dark:text-[#FF7A3C] uppercase mb-2">
                  {product.category}
                </p>
                <h2 className="text-2xl font-bold leading-tight">
                  {product.name}
                </h2>
                <div className="flex items-center gap-3 mt-2">
                  <StarRating rating={product.rating} size={14} />
                  <span className="text-sm text-foreground/50">
                    {product.rating} · {product.reviewCount} reviews
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-foreground/40 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-foreground/70 leading-relaxed">
                {product.description}
              </p>

              {/* Weight Options */}
              {product.weight && product.weight.length > 0 && (
                <div>
                  <p className="text-xs font-semibold tracking-wider uppercase text-foreground/50 mb-2">
                    Select Weight
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {product.weight.map((w) => (
                      <button
                        key={w}
                        onClick={() => setSelectedWeight(w)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                          selectedWeight === w
                            ? "bg-[#E86A33] dark:bg-[#FF7A3C] text-white border-transparent"
                            : "glass border-border text-foreground/70 hover:border-[#E86A33] dark:hover:border-[#FF7A3C]"
                        }`}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="glass-subtle rounded-2xl p-3 flex items-start gap-2">
                  <Flame
                    size={14}
                    className="text-[#E86A33] dark:text-[#FF7A3C] mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground/40 mb-0.5">
                      Cooking Tips
                    </p>
                    <p className="text-xs text-foreground/70 leading-relaxed">
                      {product.cookingTips}
                    </p>
                  </div>
                </div>
                <div className="glass-subtle rounded-2xl p-3 flex items-start gap-2">
                  <Leaf
                    size={14}
                    className="text-emerald-500 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground/40 mb-0.5">
                      Sourcing
                    </p>
                    <p className="text-xs text-foreground/70 leading-relaxed">
                      {product.sourcing}
                    </p>
                  </div>
                </div>
              </div>

              {/* Add to Cart */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className="w-full meato-btn py-4 rounded-full font-bold flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                Add to Cart — ${product.price}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
