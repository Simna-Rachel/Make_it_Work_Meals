"use client";

import React, { useState } from "react";
import { Recipe } from "@/types/recipe";
import { RecipeCard } from "./RecipeCard";
import { RecipeDetailModal } from "./RecipeDetailModal";
import { ShoppingListModal } from "./ShoppingListModal";
import { ArrowLeft, Sparkles, RefreshCw, ShoppingCart, AlertCircle } from "lucide-react";

interface RecipeListProps {
  recipes: Recipe[];
  onBackToForm: () => void;
  onRegenerate: () => void;
  isFavorite: (target: string | Recipe) => boolean;
  onToggleFavorite: (recipe: Recipe) => void;
  isGenerating?: boolean;
}

export function RecipeList({
  recipes,
  onBackToForm,
  onRegenerate,
  isFavorite,
  onToggleFavorite,
  isGenerating = false,
}: RecipeListProps) {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showShoppingList, setShowShoppingList] = useState(false);

  // Total missing ingredients count (deduplicated)
  const allMissingSet = new Set<string>();
  for (const recipe of recipes) {
    for (const ing of recipe.missingIngredients || []) {
      if (ing.trim()) allMissingSet.add(ing.trim().toLowerCase());
    }
  }
  const missingCount = allMissingSet.size;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <button
            onClick={onBackToForm}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 mb-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Edit Ingredients &amp; Preferences</span>
          </button>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
              3 Chef-Created Meals
            </h2>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 text-xs font-bold border border-orange-200 dark:border-orange-800/60">
              <Sparkles className="w-3 h-3 text-orange-600 dark:text-orange-400" />
              <span>Tailored for you</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
            Pick your favorite dish to view full step-by-step instructions and start cooking!
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {/* Shopping List Button */}
          <button
            onClick={() => setShowShoppingList(true)}
            className="relative px-4 py-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 hover:border-amber-400 dark:hover:border-amber-600 text-amber-800 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-200 font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
            title="View shopping list of missing ingredients"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Shopping List</span>
            {missingCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center leading-none px-1">
                {missingCount}
              </span>
            )}
          </button>

          <button
            onClick={onRegenerate}
            disabled={isGenerating}
            className="px-4 py-2.5 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-orange-300 dark:hover:border-orange-600 text-stone-700 dark:text-stone-200 hover:text-orange-600 dark:hover:text-orange-400 font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
            <span>Generate 3 New Ideas</span>
          </button>
        </div>
      </div>

      {/* Missing ingredients banner (if any) */}
      {missingCount > 0 && (
        <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-200">
            <span className="font-bold">{missingCount} ingredient{missingCount !== 1 ? "s" : ""}</span> across your recipes need to be picked up.{" "}
            <button
              onClick={() => setShowShoppingList(true)}
              className="underline font-bold hover:text-amber-900 dark:hover:text-amber-100 cursor-pointer"
            >
              View Shopping List →
            </button>
          </p>
        </div>
      )}

      {/* The 3 Modern Recipe Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isFavorite={isFavorite(recipe)}
            onToggleFavorite={onToggleFavorite}
            onSelect={(rec) => setSelectedRecipe(rec)}
          />
        ))}
      </div>

      {/* Detailed Recipe Modal */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        isOpen={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        isFavorite={selectedRecipe ? isFavorite(selectedRecipe) : false}
        onToggleFavorite={onToggleFavorite}
      />

      {/* Shopping List Modal */}
      <ShoppingListModal
        recipes={recipes}
        isOpen={showShoppingList}
        onClose={() => setShowShoppingList(false)}
      />
    </div>
  );
}
