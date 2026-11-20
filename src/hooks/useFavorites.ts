"use client";

import { useState, useEffect, useCallback } from "react";
import { Recipe } from "@/types/recipe";

const FAVORITES_STORAGE_KEY = "make_it_work_meals_favorites";

// Helper: detect legacy index/position-based IDs that caused ID collision bugs
function isLegacyId(id?: string): boolean {
  if (!id) return true;
  return /^(recipe-[1-9]\d*|mock-[1-9]\d*|\d+)$/i.test(id.trim());
}

// Helper: normalize dish title for strict title comparison
function normalizeTitle(title?: string): string {
  if (!title) return "";
  return title.trim().toLowerCase().replace(/\s+/g, " ");
}

// Helper: convert title to URL/id-safe slug
function slugifyTitle(title?: string): string {
  if (!title) return "recipe";
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 25) || "recipe";
}

// Helper: check if a title is too generic to be used for matching
function isGenericTitle(title?: string): boolean {
  const norm = normalizeTitle(title);
  return (
    !norm ||
    norm.length < 3 ||
    norm === "recipe" ||
    norm === "dish" ||
    norm === "meal" ||
    norm.startsWith("recipe-") ||
    norm.startsWith("delicious meal #")
  );
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Helper to read latest favorites directly from localStorage, with automatic legacy migration
  const getStoredFavorites = useCallback((): Recipe[] => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          let migrated = false;
          // Clean up any legacy or duplicate IDs in localStorage from previous buggy versions
          const seenIds = new Set<string>();
          const cleaned: Recipe[] = parsed.map((item: Recipe, index: number) => {
            const hasBadId = isLegacyId(item.id) || seenIds.has(item.id);
            if (hasBadId) {
              migrated = true;
              const newId = `rec_${slugifyTitle(item.title)}_${Date.now()}_${index}_${Math.random().toString(36).substring(2, 7)}`;
              seenIds.add(newId);
              return { ...item, id: newId };
            }
            seenIds.add(item.id);
            return item;
          });

          // If legacy IDs were repaired, persist the clean version back immediately
          if (migrated) {
            localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(cleaned));
          }

          return cleaned;
        }
      }
    } catch (err) {
      console.error("Failed to read favorites from localStorage:", err);
    }
    return [];
  }, []);

  // Initial load and multi-tab/event sync
  useEffect(() => {
    const initial = getStoredFavorites();
    setFavorites(initial);
    setIsLoaded(true);

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === FAVORITES_STORAGE_KEY) {
        setFavorites(getStoredFavorites());
      }
    };

    const handleCustomUpdate = () => {
      setFavorites(getStoredFavorites());
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("favorites-updated", handleCustomUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("favorites-updated", handleCustomUpdate);
    };
  }, [getStoredFavorites]);

  // Check if a recipe is favorite by unique ID or distinct title (NOT by index or position)
  const isFavorite = useCallback(
    (target: string | Recipe | null | undefined): boolean => {
      if (!target || favorites.length === 0) return false;

      const targetId = typeof target === "string" ? target.trim() : target.id;
      const targetTitle =
        typeof target === "string"
          ? (isLegacyId(target) ? "" : target)
          : target.title;

      const normTargetTitle = normalizeTitle(targetTitle);
      const canMatchTitle = !isGenericTitle(targetTitle);

      return favorites.some((f) => {
        // 1. Direct ID match (only with non-legacy unique IDs)
        if (targetId && f.id && !isLegacyId(targetId) && !isLegacyId(f.id)) {
          if (f.id === targetId) return true;
        }

        // 2. Strict normalized title match (when title is specific)
        if (canMatchTitle && f.title) {
          if (normalizeTitle(f.title) === normTargetTitle) return true;
        }

        return false;
      });
    },
    [favorites]
  );

  // Toggle favorite: adds if not present, removes if present. No limit of 3!
  const toggleFavorite = useCallback((recipe: Recipe) => {
    if (typeof window === "undefined" || !recipe) return;

    try {
      const currentStored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      const currentFavorites: Recipe[] = currentStored ? JSON.parse(currentStored) : [];

      const recipeNormTitle = normalizeTitle(recipe.title);
      const canMatchTitle = !isGenericTitle(recipe.title);

      const existsIndex = currentFavorites.findIndex((f) => {
        // Match by unique ID
        if (f.id && recipe.id && !isLegacyId(f.id) && !isLegacyId(recipe.id)) {
          if (f.id === recipe.id) return true;
        }
        // Or match by exact normalized title
        if (canMatchTitle && f.title) {
          if (normalizeTitle(f.title) === recipeNormTitle) return true;
        }
        return false;
      });

      let updated: Recipe[];

      if (existsIndex >= 0) {
        // Remove the exact matching recipe
        updated = currentFavorites.filter((_, idx) => idx !== existsIndex);
      } else {
        // Add to favorites with guaranteed unique ID and timestamp (UNLIMITED count)
        const guaranteedId =
          recipe.id && !isLegacyId(recipe.id)
            ? recipe.id
            : `rec_${slugifyTitle(recipe.title)}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

        const itemToAdd: Recipe = {
          ...recipe,
          id: guaranteedId,
          createdAt: new Date().toISOString(),
        };

        updated = [itemToAdd, ...currentFavorites];
      }

      // Write to localStorage and update state
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
      setFavorites(updated);

      // Dispatch event to sync all views and components
      window.dispatchEvent(new Event("favorites-updated"));
    } catch (err) {
      console.error("Failed to toggle favorite in localStorage:", err);
    }
  }, []);

  // Remove by ID or Title
  const removeFavorite = useCallback((recipeIdOrTitle: string) => {
    if (typeof window === "undefined" || !recipeIdOrTitle) return;

    try {
      const currentStored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      const currentFavorites: Recipe[] = currentStored ? JSON.parse(currentStored) : [];

      const target = recipeIdOrTitle.trim();
      const normTarget = normalizeTitle(target);
      const canMatchTitle = !isGenericTitle(target);

      const updated = currentFavorites.filter((f) => {
        if (f.id === target) return false;
        if (canMatchTitle && normalizeTitle(f.title) === normTarget) return false;
        return true;
      });

      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
      setFavorites(updated);
      window.dispatchEvent(new Event("favorites-updated"));
    } catch (err) {
      console.error("Failed to remove favorite from localStorage:", err);
    }
  }, []);

  // Clear all favorites
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
