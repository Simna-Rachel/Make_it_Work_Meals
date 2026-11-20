"use client";

import React from "react";
import { Recipe } from "@/types/recipe";
import { Clock, Flame, Dumbbell, Heart, ArrowUpRight, AlertTriangle } from "lucide-react";
import confetti from "canvas-confetti";

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (recipe: Recipe) => void;
  onSelect: (recipe: Recipe) => void;
}

export function RecipeCard({
  recipe,
  isFavorite,
  onToggleFavorite,
  onSelect,
}: RecipeCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isFavorite) {
      // Fire confetti burst!
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#EA580C", "#F59E0B", "#10B981", "#EC4899"],
      });
    }
    onToggleFavorite(recipe);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60";
      case "Medium":
        return "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/60";
      case "Hard":
        return "bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800/60";
      default:
        return "bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-300 border-stone-200 dark:border-stone-700";
    }
  };

  return (
    <div
      onClick={() => onSelect(recipe)}
      className="group relative flex flex-col justify-between rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-orange-300 dark:hover:border-orange-700/60 shadow-sm hover:shadow-xl hover:shadow-orange-500/10 dark:hover:shadow-orange-500/5 transition-all duration-300 p-5 sm:p-6 cursor-pointer overflow-hidden transform hover:-translate-y-1"
    >
      {/* Decorative top accent gradient */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-400 via-amber-500 to-emerald-400" />

      {/* Header section */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getDifficultyColor(
                recipe.difficulty
              )}`}            >
              {recipe.difficulty}
            </span>

            {recipe.cuisine && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                {recipe.cuisine}
              </span>
            )}
          </div>

          {/* Favorite Toggle Button */}
          <button
            type="button"
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? "Remove from favorites" : "Save to favorites"}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-90 ${
              isFavorite
                ? "bg-rose-50 dark:bg-rose-950/40 text-rose-600 shadow-xs border border-rose-200 dark:border-rose-800/60"
                : "bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
            }`}
            title={isFavorite ? "Remove from favorites" : "Save to favorites"}
          >
            <Heart
              className={`w-4 h-4 transition-transform duration-200 ${
                isFavorite ? "fill-rose-500 text-rose-500 scale-110" : ""
              }`}
            />
          </button>
        </div>

        {/* Recipe Title */}
        <h3 className="text-lg sm:text-xl font-black text-stone-900 dark:text-stone-100 tracking-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2 leading-snug">
          {recipe.title}
        </h3>

        {/* Short Description */}
        <p className="mt-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300 line-clamp-3 leading-relaxed">
          {recipe.description}
        </p>

        {/* Missing Ingredients alert badge if any */}
        {recipe.missingIngredients && recipe.missingIngredients.length > 0 && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-300 text-xs font-medium">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate">
              Needs staple: {recipe.missingIngredients.slice(0, 2).join(", ")}
            </span>
          </div>
        )}
      </div>

      {/* Footer Metrics */}
      <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 space-y-3">
        <div className="grid grid-cols-3 gap-2 text-stone-600 dark:text-stone-400 text-xs">
          {/* Total Time */}
          <div className="flex flex-col">
            <span className="text-[10px] text-stone-600 dark:text-stone-400 uppercase font-semibold">Total</span>
            <div className="flex items-center gap-1 font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm mt-0.5">
              <Clock className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span>{recipe.totalTime}m</span>
            </div>
          </div>

          {/* Calories */}
          <div className="flex flex-col">
            <span className="text-[10px] text-stone-600 dark:text-stone-400 uppercase font-semibold">Calories</span>
            <div className="flex items-center gap-1 font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm mt-0.5">
              <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{recipe.approximateCalories}</span>
            </div>
          </div>

          {/* Protein */}
          <div className="flex flex-col">
            <span className="text-[10px] text-stone-600 dark:text-stone-400 uppercase font-semibold">Protein</span>
            <div className="flex items-center gap-1 font-bold text-stone-900 dark:text-stone-100 text-xs sm:text-sm mt-0.5">
              <Dumbbell className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{recipe.approximateProtein}</span>
            </div>
          </div>
        </div>

        {/* View Details Action */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-bold text-orange-600 dark:text-orange-400 group-hover:underline flex items-center gap-1">
            <span>View Full Recipe</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
          <span className="text-[11px] font-medium text-stone-600 dark:text-stone-400">
            {recipe.ingredients.length} items &bull; {recipe.instructions.length} steps
          </span>
        </div>
      </div>
    </div>
  );
}
