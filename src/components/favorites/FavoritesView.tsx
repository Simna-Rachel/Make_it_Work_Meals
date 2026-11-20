"use client";

import React, { useState } from "react";
import { Recipe } from "@/types/recipe";
import { RecipeCard } from "../recipe/RecipeCard";
import { RecipeDetailModal } from "../recipe/RecipeDetailModal";
import { Heart, Search, ArrowLeft, Trash2, Utensils } from "lucide-react";

interface FavoritesViewProps {
  favorites: Recipe[];
  isFavorite?: (target: string | Recipe) => boolean;
  onRemoveFavorite: (id: string) => void;
  onToggleFavorite: (recipe: Recipe) => void;
  onBackToApp: () => void;
  onClearAll: () => void;
}

export function FavoritesView({
  favorites,
  isFavorite,
  onRemoveFavorite,
  onToggleFavorite,
  onBackToApp,
  onClearAll,
}: FavoritesViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const filteredFavorites = favorites.filter((r) => {
    const query = searchQuery.toLowerCase();
    return (
      r.title.toLowerCase().includes(query) ||
      r.description.toLowerCase().includes(query) ||
      r.ingredients.some((i) => i.toLowerCase().includes(query)) ||
      (r.cuisine && r.cuisine.toLowerCase().includes(query))
    );
  });

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <button
            onClick={onBackToApp}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 mb-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Generator</span>
          </button>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 tracking-tight flex items-center gap-2.5">
              <span>Your Favorite Recipes</span>
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
            {favorites.length} saved {favorites.length === 1 ? "recipe" : "recipes"} stored locally on your device.
          </p>
        </div>

        {favorites.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to clear all your saved favorites?")) {
                  onClearAll();
                }
              }}
              className="px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-800/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>

      {/* Search Filter if there are favorites */}
      {favorites.length > 2 && (
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your saved recipes by ingredient or title..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-sm text-stone-800 dark:text-stone-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 dark:focus:ring-orange-950/40 outline-none"
          />
        </div>
      )}

      {/* Empty State */}
      {favorites.length === 0 ? (
        <div className="max-w-md mx-auto my-16 text-center space-y-4 p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 mx-auto flex items-center justify-center text-rose-500 dark:text-rose-400">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">No Saved Recipes Yet</h3>
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            Whenever you generate recipes, tap the heart icon on any card to save your favorite dishes here for quick cooking anytime.
          </p>
          <button
            onClick={onBackToApp}
            className="px-6 py-3 rounded-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
          >
            Generate Recipes Now
          </button>
        </div>
      ) : filteredFavorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-stone-500 dark:text-stone-400 text-sm">No recipes match &quot;{searchQuery}&quot;</p>
        </div>
      ) : (
        /* Favorites Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredFavorites.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onSelect={(rec) => setSelectedRecipe(rec)}
            />
          ))}
        </div>
      )}

      {/* Recipe Modal */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        isOpen={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        isFavorite={
          selectedRecipe
            ? favorites.some(
                (f) =>
                  (f.id && selectedRecipe.id && f.id === selectedRecipe.id) ||
                  (f.title &&
                    selectedRecipe.title &&
                    f.title.toLowerCase() === selectedRecipe.title.toLowerCase())
              )
            : false
        }
        onToggleFavorite={onToggleFavorite}
      />
    </div>
  );
}
