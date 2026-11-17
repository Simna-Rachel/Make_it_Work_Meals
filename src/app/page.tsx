"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { IntroLanding } from "@/components/intro/IntroLanding";
import { Navbar } from "@/components/ui/Navbar";
import { RecipeForm } from "@/components/form/RecipeForm";
import { RecipeList } from "@/components/recipe/RecipeList";
import { FavoritesView } from "@/components/favorites/FavoritesView";
import { LoadingChef } from "@/components/ui/LoadingChef";
import { ErrorCard } from "@/components/ui/ErrorCard";
import { MealPlanModal } from "@/components/mealplan/MealPlanModal";
import { CookingProvider } from "@/context/CookingContext";
import { CookingBar } from "@/components/ui/CookingBar";
import { useFavorites } from "@/hooks/useFavorites";
import { Recipe, GenerationFilters } from "@/types/recipe";
import { generateMockRecipes } from "@/lib/mockRecipes";
import { Calendar } from "lucide-react";

type ViewMode = "intro" | "form" | "recipes" | "favorites";

function MainContent() {
  const searchParams = useSearchParams();
  const initialView = (searchParams.get("view") as ViewMode) || "intro";

  const [currentView, setCurrentView] = useState<ViewMode>(initialView);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [lastFilters, setLastFilters] = useState<GenerationFilters | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showMealPlan, setShowMealPlan] = useState(false);

  const {
    favorites,
    isFavorite,
    toggleFavorite,
    removeFavorite,
    clearAllFavorites,
  } = useFavorites();

  const handleGenerate = async (filters: GenerationFilters) => {
    setLastFilters(filters);
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/generate-recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filters }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || `Server responded with status ${response.status}.`);
      }

      if (data.recipes && Array.isArray(data.recipes) && data.recipes.length > 0) {
        setRecipes(data.recipes);
        setCurrentView("recipes");
      } else {
        throw new Error("No recipes were returned from the server. Please try again.");
      }
    } catch (err: any) {
      console.warn("Recipe generation failed:", err);
      setErrorMessage(
        err?.message ||
          "Failed to connect to the recipe server. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseMockRecipes = () => {
    const fallbackFilters: GenerationFilters = lastFilters || {
      ingredients: ["Tomatoes", "Garlic", "Pasta", "Olive Oil"],
      dietary: [],
      cuisine: "",
      maxCookingTime: 30,
      servings: 2,
      strictMode: false,
    };
    setLastFilters(fallbackFilters);
    const mocks = generateMockRecipes(fallbackFilters);
    setRecipes(mocks);
    setErrorMessage(null);
    setCurrentView("recipes");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F2]">
      {currentView === "intro" ? (
        <IntroLanding
          onGetStarted={() => setCurrentView("form")}
          savedFavoritesCount={favorites.length}
          onOpenFavorites={() => setCurrentView("favorites")}
        />
      ) : (
        <>
          <Navbar
            currentView={currentView}
            onNavigate={(view) => {
              setErrorMessage(null);
              setCurrentView(view);
            }}
            favoritesCount={favorites.length}
          />

          {/* Extra bottom padding so CookingBar never covers content */}
          <main className="flex-1 pb-20">
            {isLoading && <LoadingChef />}

            {!isLoading && errorMessage && (
              <ErrorCard
                message={errorMessage}
                onRetry={() => lastFilters && handleGenerate(lastFilters)}
                onUseFallback={handleUseMockRecipes}
              />
            )}

            {!isLoading && !errorMessage && currentView === "form" && (
              <div className="relative">
                <RecipeForm
                  onGenerate={handleGenerate}
                  isGenerating={isLoading}
                />
                {lastFilters && lastFilters.ingredients.length > 0 && (
                  <div className="max-w-3xl mx-auto px-4 pb-4 -mt-2">
                    <div className="flex items-center justify-center">
                      <button
                        onClick={() => setShowMealPlan(true)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm transition-all active:scale-95 shadow-lg shadow-stone-900/20 cursor-pointer"
                      >
                        <Calendar className="w-4 h-4 text-orange-400" />
                        <span>📅 Generate Weekly Meal Plan</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!isLoading && !errorMessage && currentView === "recipes" && (
              <div className="relative">
                <RecipeList
                  recipes={recipes}
                  onBackToForm={() => setCurrentView("form")}
                  onRegenerate={() => lastFilters && handleGenerate(lastFilters)}
                  isFavorite={isFavorite}
                  onToggleFavorite={toggleFavorite}
                  isGenerating={isLoading}
                />
                <div className="max-w-6xl mx-auto px-4 pb-6 -mt-2">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => setShowMealPlan(true)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm transition-all active:scale-95 shadow-lg shadow-stone-900/20 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-orange-400" />
                      <span>📅 Generate Weekly Meal Plan</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!isLoading && currentView === "favorites" && (
              <FavoritesView
                favorites={favorites}
                onRemoveFavorite={removeFavorite}
                onToggleFavorite={toggleFavorite}
                onBackToApp={() => setCurrentView(recipes.length > 0 ? "recipes" : "form")}
                onClearAll={clearAllFavorites}
              />
            )}
          </main>

          <MealPlanModal
            isOpen={showMealPlan}
            onClose={() => setShowMealPlan(false)}
            lastFormFilters={lastFilters}
          />

          {/* Persistent cooking bar — lives outside <main> so it survives all view changes */}
          <CookingBar />
        </>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FCF9F2] text-stone-500 font-semibold text-sm">
          Loading Make It Work - Meals...
        </div>
      }
    >
      {/* CookingProvider wraps everything so timer state survives navigation */}
      <CookingProvider>
        <MainContent />
      </CookingProvider>
    </Suspense>
  );
}
