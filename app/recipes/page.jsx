"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, Users, ChefHat, Star } from "lucide-react";
import { recipes } from "@/lib/recipes";
import ScrollReveal from "@/components/scroll-reveal";
import Footer from "@/components/footer";
import RecipeQuickView from "@/components/recipe-quick-view";

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

function RecipeCard({ recipe, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group relative flex flex-col glass rounded-3xl overflow-hidden cursor-pointer h-full"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
      onClick={() => onClick?.(recipe)}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden shrink-0">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

        {/* Badge */}
        {recipe.badge && (
          <span
            className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold text-white tracking-widest uppercase shadow-sm ${recipe.badgeColor ?? "bg-orange-500"}`}
          >
            {recipe.badge}
          </span>
        )}

        {/* Difficulty badge */}
        <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold text-white bg-black/40 backdrop-blur-md shadow-sm border border-white/10 uppercase tracking-widest">
          {recipe.difficulty}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        {/* Name */}
        <h3 className="font-bold text-xl leading-tight text-foreground line-clamp-2">
          {recipe.title}
        </h3>
        
        <p className="text-sm text-foreground/60 line-clamp-2 mt-1 grow">
          {recipe.description}
        </p>

        {/* Meta info layout */}
        <div className="flex items-center gap-3 mt-3 text-xs font-semibold text-foreground/70">
            <div className="flex items-center gap-1.5 bg-foreground/5 rounded-full px-3 py-1.5">
                <Clock size={14} className="text-[#E86A33] dark:text-[#FF7A3C]" />
                <span>{recipe.prepTime}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-foreground/5 rounded-full px-3 py-1.5">
                <Users size={14} className="text-[#E86A33] dark:text-[#FF7A3C]" />
                <span>{recipe.servings} serving{recipe.servings > 1 ? 's' : ''}</span>
            </div>
        </div>

        {/* Rating and Author */}
        <div className="flex items-center justify-between border-t border-border/50 pt-4 mt-3">
            <div className="flex items-center gap-1.5 text-[11px] md:text-xs text-foreground/60 font-bold uppercase tracking-wider">
                <ChefHat size={14} className="text-[#E86A33] dark:text-[#FF7A3C]" />
                <span>By {recipe.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <StarRating rating={recipe.rating} size={11} />
              <span className="text-[10px] text-foreground/40 font-bold ml-1">({recipe.reviewCount})</span>
            </div>
        </div>
      </div>
    </motion.div>
  );
}

// Full page component
export default function RecipesPage() {
  const [search, setSearch] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [quickViewRecipe, setQuickViewRecipe] = useState(null);

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      const matchSearch =
        !search ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase());
      const matchDifficulty =
        selectedDifficulty === "all" ||
        r.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
      
      return matchSearch && matchDifficulty;
    });
  }, [search, selectedDifficulty]);

  const difficulties = [
    { id: "all", name: "All Levels" },
    { id: "easy", name: "Easy" },
    { id: "medium", name: "Medium" },
    { id: "hard", name: "Hard" }
  ];

  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* Page Header */}
        <section className="pt-32 pb-12 px-4">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Master the <span className="gradient-text">Grill & Oven</span>
              </h1>
              <p className="text-foreground/50 text-lg max-w-xl">
                Explore our curated collection of beef recipes, from weeknight dinners to weekend centerpieces. Perfected by chefs and home cooks.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Filters & Recipes */}
        <section className="flex-1 pb-24 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Search */}
            <div className="flex gap-3 mb-8">
              <div className="flex-1 relative max-w-md">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search recipes, ingredients..."
                  className="w-full pl-10 pr-4 py-3 glass rounded-full border border-border focus:outline-none focus:border-[#E86A33] dark:focus:border-[#FF7A3C] text-sm transition"
                />
                <AnimatePresence>
                  {search && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => setSearch("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-foreground/10 text-foreground/60 hover:text-foreground hover:bg-foreground/20 transition-colors"
                    >
                      <X size={12} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Difficulty Tabs */}
            <div className="flex gap-2 flex-wrap mb-10">
              {difficulties.map((diff) => (
                <button
                  key={diff.id}
                  onClick={() => setSelectedDifficulty(diff.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all ${
                    selectedDifficulty === diff.id
                      ? "bg-[#E86A33] dark:bg-[#FF7A3C] text-white border-transparent shadow-md shadow-[#E86A33]/20"
                      : "glass border-border text-foreground/60 hover:border-[#E86A33] dark:hover:border-[#FF7A3C] hover:text-foreground"
                  }`}
                >
                  {diff.name}
                </button>
              ))}
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-24 glass rounded-3xl max-w-2xl mx-auto border border-border/50"
              >
                <div className="w-20 h-20 mx-auto bg-[#E86A33]/10 dark:bg-[#FF7A3C]/10 rounded-full flex items-center justify-center mb-6">
                  <ChefHat size={32} className="text-[#E86A33] dark:text-[#FF7A3C]" />
                </div>
                <h3 className="font-bold text-2xl mb-2">No recipes found</h3>
                <p className="text-foreground/50 text-base mb-8 max-w-sm mx-auto">
                  We couldn't find any recipes matching your current filters and search term.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedDifficulty("all");
                  }}
                  className="meato-btn px-8 py-3 rounded-full text-sm font-semibold inline-flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
                >
                  Clear All Filters
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                <AnimatePresence mode="popLayout">
                  {filtered.map((recipe, i) => (
                    <ScrollReveal key={recipe.id} delay={i * 0.05}>
                      <RecipeCard recipe={recipe} onClick={setQuickViewRecipe} />
                    </ScrollReveal>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </section>

        {quickViewRecipe && (
          <RecipeQuickView
            recipe={quickViewRecipe}
            onClose={() => setQuickViewRecipe(null)}
          />
        )}
        
        <Footer />
      </div>
    </>
  );
}
