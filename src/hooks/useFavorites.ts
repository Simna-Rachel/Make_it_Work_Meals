"use client";

import { useState, useEffect, useCallback } from "react";
import { Recipe } from "@/types/recipe";

const FAVORITES_STORAGE_KEY = "make_it_work_meals_favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Helper to read latest favorites directly from localStorage
  const getStoredFavorites = useCallback((): Recipe[] => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (err) {
      console.error("Failed to read favorites from localStorage:", err);
    }
    return [];
  }, []);

  // Initial load
  useEffect(() => {
    const initial = getStoredFavorites();
    setFavorites(initial);
    setIsLoaded(true);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === FAVORITES_STORAGE_KEY) {
        const updated = getStoredFavorites();
        setFavorites(updated);
      }
    };

    const handleCustomUpdate = () => {
      const updated = getStoredFavorites();
      setFavorites(updated);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("favorites-updated", handleCustomUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("favorites-updated", handleCustomUpdate);
    };
  }, [getStoredFavorites]);

  // Check if a recipe is favorite by id or title
  const isFavorite = useCallback(
    (recipeIdOrRecipe: string | Recipe) => {
      if (!recipeIdOrRecipe) return false;
      const id = typeof recipeIdOrRecipe === "string" ? recipeIdOrRecipe : recipeIdOrRecipe.id;
      const title =
        typeof recipeIdOrRecipe === "string"
          ? recipeIdOrRecipe.toLowerCase()
          : recipeIdOrRecipe.title?.toLowerCase() || "";

      return favorites.some(
        (f) =>
          (id && f.id === id) ||
          (title && f.title && f.title.toLowerCase() === title)
      );
    },
    [favorites]
  );

  // Toggle favorite: adds if missing, removes if present
  const toggleFavorite = useCallback((recipe: Recipe) => {
    if (typeof window === "undefined" || !recipe) return;

    try {
      const currentStored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      const currentFavorites: Recipe[] = currentStored ? JSON.parse(currentStored) : [];

      const existsIndex = currentFavorites.findIndex(
        (f) =>
          (f.id && recipe.id && f.id === recipe.id) ||
          (f.title && recipe.title && f.title.toLowerCase() === recipe.title.toLowerCase())
      );

      let updated: Recipe[];

      if (existsIndex >= 0) {
        // Remove from favorites
        updated = currentFavorites.filter((_, idx) => idx !== existsIndex);
      } else {
        // Add to favorites with timestamp
        const itemToAdd: Recipe = {
          ...recipe,
          id: recipe.id || `fav-${Date.now()}`,
          createdAt: new Date().toISOString(),
        };
        updated = [itemToAdd, ...currentFavorites];
      }

      // Write to localStorage immediately
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
      setFavorites(updated);

      // Dispatch event to keep other tabs/components in sync
      window.dispatchEvent(new Event("favorites-updated"));
    } catch (err) {
      console.error("Failed to toggle favorite in localStorage:", err);
    }
  }, []);

  // Remove by ID or Title
  const removeFavorite = useCallback((recipeId: string) => {
    if (typeof window === "undefined") return;

    try {
      const currentStored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      const currentFavorites: Recipe[] = currentStored ? JSON.parse(currentStored) : [];

      const updated = currentFavorites.filter(
        (f) =>
          f.id !== recipeId &&
          f.title?.toLowerCase() !== recipeId.toLowerCase()
      );

      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
      setFavorites(updated);
      window.dispatchEvent(new Event("favorites-updated"));
    } catch (err) {
      console.error("Failed to remove favorite from localStorage:", err);
    }
  }, []);

  // Clear all
  const clearAllFavorites = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([]));
      setFavorites([]);
      window.dispatchEvent(new Event("favorites-updated"));
    } catch (err) {
      console.error("Failed to clear favorites from localStorage:", err);
    }
  }, []);

  return {
    favorites,
    isLoaded,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    clearAllFavorites,
  };
}
