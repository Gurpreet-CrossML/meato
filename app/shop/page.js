"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products, categories } from "@/lib/products";
import ProductCard from "@/components/product-card";
import ProductQuickView from "@/components/product-quick-view";
import ScrollReveal from "@/components/scroll-reveal";
import Footer from "@/components/footer";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under $30", min: 0, max: 30 },
  { label: "$30 – $60", min: 30, max: 60 },
  { label: "$60 – $90", min: 60, max: 90 },
  { label: "Over $90", min: 90, max: Infinity },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "all";

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedPrice, setSelectedPrice] = useState(0); // index of PRICE_RANGES
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    const priceRange = PRICE_RANGES[selectedPrice];
    return products.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        selectedCategory === "all" ||
        p.category.toLowerCase().replace(/ /g, "-") === selectedCategory;
      const matchPrice = p.price >= priceRange.min && p.price < priceRange.max;
      return matchSearch && matchCategory && matchPrice;
    });
  }, [search, selectedCategory, selectedPrice]);

  const allCategories = [
    { id: "all", name: "All Cuts" },
    ...categories.map((c) => ({ id: c.id, name: c.name })),
  ];

  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              The <span className="gradient-text">Butcher Shop</span>
            </h1>
            <p className="text-foreground/50 text-lg max-w-lg">
              Browse our full selection of premium, ethically sourced beef cuts.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Search + filter toggle */}
          <div className="flex gap-3 mb-8">
            <div className="flex-1 relative">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search cuts, categories..."
                className="w-full pl-10 pr-4 py-3 glass rounded-full border border-border focus:outline-none focus:border-[#E86A33] dark:focus:border-[#FF7A3C] text-sm transition"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-5 py-3 glass rounded-full border transition flex items-center gap-2 text-sm font-medium ${showFilters
                ? "border-[#E86A33] text-[#E86A33]"
                : "border-border"
                }`}
            >
              <SlidersHorizontal size={15} />
              Filters
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 flex-wrap mb-6">
            {allCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${selectedCategory === cat.id
                  ? "bg-[#E86A33] dark:bg-[#FF7A3C] text-white border-transparent"
                  : "glass border-border text-foreground/60 hover:border-[#E86A33]"
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="glass rounded-2xl p-6 mb-8"
            >
              <p className="text-xs font-semibold tracking-widest uppercase text-foreground/40 mb-3">
                Price Range
              </p>
              <div className="flex gap-2 flex-wrap">
                {PRICE_RANGES.map((range, i) => (
                  <button
                    key={range.label}
                    onClick={() => setSelectedPrice(i)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${selectedPrice === i
                      ? "bg-[#E86A33] dark:bg-[#FF7A3C] text-white border-transparent"
                      : "glass border-border text-foreground/60 hover:border-[#E86A33]"
                      }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Results count */}
          <p className="text-sm text-foreground/40 mb-8">
            {filtered.length} {filtered.length === 1 ? "cut" : "cuts"} found
          </p>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-4xl mb-3">🥩</p>
              <p className="font-bold text-lg">No cuts found</p>
              <p className="text-foreground/50 text-sm mt-1">
                Try adjusting your filters or search term.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("all");
                  setSelectedPrice(0);
                }}
                className="mt-6 meato-btn px-6 py-2.5 rounded-full text-sm font-semibold"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product, i) => (
                <ScrollReveal key={product.id} delay={i * 0.04}>
                  <ProductCard
                    product={product}
                    onQuickView={setQuickViewProduct}
                  />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
      <Footer />
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ShopContent />
    </Suspense>
  );
}
