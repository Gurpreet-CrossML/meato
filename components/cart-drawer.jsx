"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, cartSubtotal } =
    useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-50 flex flex-col"
            style={{
              background: "var(--background)",
              borderLeft: "1px solid var(--border)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <ShoppingBag
                  size={22}
                  className="text-[#E86A33] dark:text-[#FF7A3C]"
                />
                <h2 className="text-lg font-bold tracking-tight">
                  Your Cart
                  {items.length > 0 && (
                    <span className="ml-2 text-sm font-normal text-foreground/50">
                      ({items.length} {items.length === 1 ? "item" : "items"})
                    </span>
                  )}
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="w-9 h-9 flex items-center justify-center rounded-full glass hover:bg-white/30 dark:hover:bg-white/10 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <div className="w-20 h-20 rounded-full glass-subtle flex items-center justify-center">
                    <ShoppingBag size={32} className="text-foreground/30" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground/70">
                      Your cart is empty
                    </p>
                    <p className="text-sm text-foreground/40 mt-1">
                      Add some premium cuts to get started
                    </p>
                  </div>
                  <button
                    onClick={closeCart}
                    className="meato-btn px-6 py-2.5 rounded-full text-sm font-semibold"
                  >
                    Shop Now
                  </button>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.weight}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex gap-4 p-4 glass rounded-2xl"
                    >
                      {/* Product Image */}
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-stone-100 dark:bg-stone-800">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">
                          {item.name}
                        </p>
                        {item.weight && (
                          <p className="text-xs text-foreground/50 mt-0.5">
                            {item.weight}
                          </p>
                        )}
                        <p className="text-sm font-bold text-[#E86A33] dark:text-[#FF7A3C] mt-1">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.weight,
                                item.quantity - 1,
                              )
                            }
                            className="w-7 h-7 flex items-center justify-center rounded-full glass-subtle hover:bg-white/40 dark:hover:bg-white/10 transition text-foreground/70"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-semibold w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.weight,
                                item.quantity + 1,
                              )
                            }
                            className="w-7 h-7 flex items-center justify-center rounded-full glass-subtle hover:bg-white/40 dark:hover:bg-white/10 transition text-foreground/70"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id, item.weight)}
                        className="self-start w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-500 transition text-foreground/40"
                      >
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-foreground/60">Subtotal</span>
                  <span className="text-xl font-bold">
                    ${cartSubtotal.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-foreground/40">
                  Shipping and taxes calculated at checkout
                </p>
                <button className="w-full meato-btn py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 text-sm">
                  Checkout
                  <ArrowRight size={16} />
                </button>
                <button
                  onClick={closeCart}
                  className="w-full py-3 rounded-full text-sm font-medium text-foreground/60 hover:text-foreground glass hover:bg-white/30 dark:hover:bg-white/10 transition"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
