"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Search,
  User,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Cuts", href: "/shop?category=premium-steaks" },
  { label: "Recipes", href: "/recipes" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const { cartCount, toggleCart } = useCart();
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Floating Navbar */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-4 right-4 z-50"
      >
        <nav
          className={`glass rounded-full px-4 md:px-5 py-3 flex items-center justify-between transition-all duration-300 mx-auto w-full max-w-7xl lg:w-[calc(100%-36rem)] ${scrolled ? "shadow-2xl" : "shadow-lg"
            }`}
          style={{
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-bold text-lg tracking-tight text-foreground hidden sm:inline-block">
              Meato
              <span className="text-[#E86A33] dark:text-[#FF7A3C]">.</span>
            </span>
          </Link>

          {/* Center Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground rounded-full hover:bg-white/20 dark:hover:bg-white/5 transition-all duration-200 group"
              >
                {link.label}
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-[#E86A33] dark:bg-[#FF7A3C] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full" />
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/20 dark:hover:bg-white/5 transition text-foreground/70 hover:text-foreground">
              <Search size={18} />
            </button>
            <Link
              href="/account"
              className="w-9 h-9 hidden sm:flex items-center justify-center rounded-full hover:bg-white/20 dark:hover:bg-white/5 transition text-foreground/70 hover:text-foreground"
            >
              <User size={18} />
            </Link>

            {/* Cart */}
            <button
              onClick={toggleCart}
              className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/20 dark:hover:bg-white/5 transition text-foreground/70 hover:text-foreground"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#E86A33] dark:bg-[#FF7A3C] rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </motion.span>
              )}
            </button>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/20 dark:hover:bg-white/5 transition text-foreground/70 hover:text-foreground"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/20 dark:hover:bg-white/5 transition text-foreground/70 hover:text-foreground"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mt-2 glass rounded-3xl overflow-hidden md:hidden mx-auto w-full origin-top"
            >
              <div className="p-4 flex flex-col gap-1" style={{
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}>
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 text-sm font-medium text-foreground hover:bg-white/20 dark:hover:bg-white/5 rounded-xl transition"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
