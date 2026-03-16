"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChefHat,
  Clock,
  Users,
  CheckCircle2,
  ListOrdered
} from "lucide-react";
import { StarRating } from "./product-card";

export default function RecipeQuickView({ recipe, onClose }) {
  if (!recipe) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-60 flex items-center justify-center p-4 md:p-8"
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
          className="relative z-10 w-full max-w-5xl max-h-[90vh] overflow-hidden glass rounded-3xl flex flex-col md:flex-row shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center glass rounded-full hover:bg-white/30 dark:hover:bg-white/10 transition"
          >
            <X size={18} className="text-white" />
          </button>

          {/* Left Side - Image & Meta */}
          <div className="w-full md:w-[45%] relative min-h-[350px] md:h-auto shrink-0">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

            <div className="absolute bottom-0 left-0 p-8 w-full text-white">
              {recipe.badge && (
                <span className={`inline-block px-3 py-1 rounded-full text-[10px] tracking-widest uppercase font-bold mb-4 ${recipe.badgeColor ?? "bg-orange-500"}`}>
                  {recipe.badge}
                </span>
              )}

              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-3 drop-shadow-md">
                {recipe.title}
              </h2>

              <div className="flex items-center gap-3 mb-2">
                <StarRating rating={recipe.rating} size={14} />
                <span className="text-sm opacity-90 font-medium">
                  {recipe.rating} ({recipe.reviewCount} reviews)
                </span>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <p className="text-sm font-bold text-[#FF7A3C] uppercase tracking-widest flex items-center gap-2">
                  <ChefHat size={16} />
                  Recipe by {recipe.author}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
                <div className="flex flex-col items-center text-center">
                  <Clock className="mb-2 opacity-80" size={20} />
                  <span className="text-[10px] uppercase tracking-wider opacity-70">Total Time</span>
                  <span className="text-sm font-semibold mt-0.5">{recipe.cookTime}</span>
                </div>
                <div className="flex flex-col items-center text-center border-l border-white/20">
                  <Users className="mb-2 opacity-80" size={20} />
                  <span className="text-[10px] uppercase tracking-wider opacity-70">Serves</span>
                  <span className="text-sm font-semibold mt-0.5">{recipe.servings}</span>
                </div>
                <div className="flex flex-col items-center text-center border-l border-white/20">
                  <svg className="mb-2 opacity-80 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 11-5.3 5.3a2 2 0 0 1-2.8 0l-5.3-5.3a2 2 0 0 1 0-2.8l2.1-2.1a2 2 0 0 1 2.8 0l1.4 1.4a2 2 0 0 0 2.8 0l1.4-1.4a2 2 0 0 1 2.8 0l2.1 2.1a2 2 0 0 1 0 2.8z" /><path d="M12 2v4" /></svg>
                  <span className="text-[10px] uppercase tracking-wider opacity-70">Difficulty</span>
                  <span className="text-sm font-semibold mt-0.5">{recipe.difficulty}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-8 md:p-10 custom-scrollbar bg-background glass text-foreground">
            <p className="text-lg leading-relaxed mb-10 pb-8 border-b border-border/50 text-foreground/80">
              {recipe.description}
            </p>

            <div className="flex flex-col xl:flex-row gap-12">
              {/* Ingredients */}
              <div className="xl:w-2/5 shrink-0">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <CheckCircle2 className="text-[#E86A33] dark:text-[#FF7A3C]" size={22} />
                  Ingredients
                </h3>
                <ul className="space-y-4">
                  {recipe.ingredients.map((ingredient, i) => (
                    <li key={i} className="flex items-start gap-3 text-[15px] font-medium text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E86A33] dark:bg-[#FF7A3C] mt-2 shrink-0" />
                      <span className="leading-relaxed">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <ListOrdered className="text-[#E86A33] dark:text-[#FF7A3C]" size={22} />
                  Instructions
                </h3>
                <div className="space-y-8">
                  {recipe.instructions.map((step, i) => (
                    <div key={i} className="flex gap-5">
                      <div className="shrink-0 w-8 h-8 rounded-full bg-[#E86A33]/10 dark:bg-[#FF7A3C]/10 text-[#E86A33] dark:text-[#FF7A3C] flex items-center justify-center text-sm font-bold mt-0.5 shadow-sm border border-[#E86A33]/20">
                        {i + 1}
                      </div>
                      <p className="text-[15px] text-foreground/80 leading-relaxed pt-1">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
