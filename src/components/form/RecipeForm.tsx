"use client";

import React, { useState } from "react";
import {
  GenerationFilters,
  DietaryPreference,
  CuisineType,
  CookingTimeOption,
} from "@/types/recipe";
import { IngredientInput } from "./IngredientInput";
import { DietaryChips } from "./DietaryChips";
import { CuisineSelect } from "./CuisineSelect";
import { CookingTimeSelect } from "./CookingTimeSelect";
import { ServingsCounter } from "./ServingsCounter";
import { StrictModeToggle } from "./StrictModeToggle";
import { Sparkles, UtensilsCrossed, ChefHat, AlertCircle, Dices, RotateCcw, FileText } from "lucide-react";

interface RecipeFormProps {
  onGenerate: (filters: GenerationFilters) => void;
  isGenerating?: boolean;
}

const SAMPLE_INGREDIENT_POOLS = [
  ["Eggs", "Tomatoes", "Garlic", "Olive Oil"],
  ["Rice", "Soy Sauce", "Green Onions", "Eggs", "Carrots"],
  ["Pasta", "Mushrooms", "Garlic", "Spinach", "Parmesan"],
  ["Chicken", "Bell Pepper", "Onions", "Cumin", "Lime"],
  ["Potatoes", "Onions", "Cheddar", "Butter"],
  ["Tofu", "Broccoli", "Ginger", "Sesame Oil", "Rice"],
  ["Chickpeas", "Tomatoes", "Coriander", "Cumin", "Garlic"],
  ["Bread", "Cheese", "Tomatoes", "Basil"],
];

const SAMPLE_CUISINES: CuisineType[] = [
  "Italian",
  "Indian",
  "Chinese",
  "Mexican",
  "Mediterranean",
  "Thai",
  "American",
  "Japanese",
  "French",
  "Middle Eastern",
];

const SAMPLE_TIMES: CookingTimeOption[] = [15, 30, 45, 60];

export function RecipeForm({ onGenerate, isGenerating = false }: RecipeFormProps) {
  // Initial state: servings defaults to 1 as requested
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [dietary, setDietary] = useState<DietaryPreference[]>([]);
  const [cuisine, setCuisine] = useState<CuisineType | "">("");
  const [maxCookingTime, setMaxCookingTime] = useState<CookingTimeOption | null>(null);
  const [servings, setServings] = useState<number>(1);
  const [strictMode, setStrictMode] = useState<boolean>(false);
  const [specialNotes, setSpecialNotes] = useState<string>("");
  const [validationError, setValidationError] = useState<string | null>(null);

  // Quick action: randomize options for instant spontaneous ideas
  const handleRandomizeOptions = () => {
    // Pick random ingredient combo
    const randomPool =
      SAMPLE_INGREDIENT_POOLS[Math.floor(Math.random() * SAMPLE_INGREDIENT_POOLS.length)];
    setIngredients([...randomPool]);

    // Pick random cuisine or leave open
    const randomCuisine =
      Math.random() > 0.3
        ? SAMPLE_CUISINES[Math.floor(Math.random() * SAMPLE_CUISINES.length)]
        : "";
    setCuisine(randomCuisine);

    // Pick random time
    const randomTime = SAMPLE_TIMES[Math.floor(Math.random() * 3)]; // 15, 30, or 45
    setMaxCookingTime(randomTime);

    // Random servings between 1 and 4
    setServings(Math.floor(Math.random() * 4) + 1);

    // Keep strict mode off or 20% chance on
    setStrictMode(false);
    setSpecialNotes("");
    setValidationError(null);
  };

  const handleResetAll = () => {
    setIngredients([]);
    setDietary([]);
    setCuisine("");
    setMaxCookingTime(null);
    setServings(1);
    setStrictMode(false);
    setSpecialNotes("");
    setValidationError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (ingredients.length === 0) {
      setValidationError("Please enter at least 1 ingredient before generating recipes!");
      setTimeout(() => setValidationError(null), 3500);
      return;
    }

    setValidationError(null);
    onGenerate({
      ingredients,
      dietary,
      cuisine: cuisine || "Any",
      maxCookingTime: maxCookingTime,
      servings: servings > 0 ? servings : 1,
      strictMode,
      specialNotes: specialNotes.trim(),
    });
  };

  const hasAnySelected =
    ingredients.length > 0 ||
    dietary.length > 0 ||
    cuisine !== "" ||
    maxCookingTime !== null ||
    servings > 1 ||
    strictMode ||
    specialNotes.trim() !== "";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto px-4 py-6 sm:py-8 space-y-6"
    >
      {/* Intro Header */}
      <div className="text-center space-y-2 mb-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-900 dark:text-orange-300 text-xs font-bold border border-orange-200 dark:border-orange-800/60">
          <ChefHat className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
          <span>Step 1: Your Kitchen & Preferences</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-stone-900 dark:text-stone-100 tracking-tight">
          What&apos;s in your kitchen today?
        </h2>
        <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm max-w-lg mx-auto">
          Everything starts blank. Add your available ingredients and select optional preferences, or tap <span className="font-semibold text-orange-700 dark:text-orange-400">Randomize</span> for a surprise setup.
        </p>

        {/* Quick Toolbar: Surprise Me / Reset */}
        <div className="pt-2 flex items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={handleRandomizeOptions}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/40 hover:bg-orange-100 dark:hover:bg-orange-900/60 border border-orange-200 dark:border-orange-800/60 text-orange-800 dark:text-orange-200 text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer"
            title="Populate random ingredients and settings for inspiration"
          >
            <Dices className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span>🎲 Randomize Options</span>
          </button>

          <button
            type="button"
            onClick={handleResetAll}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all active:scale-95 cursor-pointer ${
              hasAnySelected
                ? "bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 border-rose-200 dark:border-rose-800/60 text-rose-700 dark:text-rose-300 shadow-2xs"
                : "bg-stone-50 dark:bg-stone-800/60 hover:bg-stone-100 dark:hover:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-400 dark:text-stone-500"
            }`}
            title="Reset all fields to blank"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="p-5 sm:p-8 rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] shadow-xl shadow-orange-950/5 space-y-7 transition-colors duration-200">
        {/* 1. Ingredient Tags Input */}
        <IngredientInput
          ingredients={ingredients}
          onChange={(newItems) => {
            setIngredients(newItems);
            if (validationError) setValidationError(null);
          }}
        />

        <hr className="border-stone-100 dark:border-stone-800" />

        {/* 2. Dietary Preferences Chips */}
        <DietaryChips selected={dietary} onChange={setDietary} />

        <hr className="border-stone-100 dark:border-stone-800" />

        {/* 3. Cuisine & Time Preferences (2-column on tablet/desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <CuisineSelect value={cuisine} onChange={setCuisine} />
          <CookingTimeSelect value={maxCookingTime} onChange={setMaxCookingTime} />
        </div>

        <hr className="border-stone-100 dark:border-stone-800" />

        {/* 4. Servings & Strict Mode */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
          <ServingsCounter value={servings} onChange={setServings} />
          <StrictModeToggle strictMode={strictMode} onChange={setStrictMode} />
        </div>

        <hr className="border-stone-100 dark:border-stone-800" />

        {/* 5. Additional Notes or Special Instructions */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span>Additional Notes or Special Instructions</span>
              <span className="text-xs font-normal text-stone-500 dark:text-stone-400">(Optional)</span>
            </label>
            {specialNotes.length > 0 && (
              <button
                type="button"
                onClick={() => setSpecialNotes("")}
                className="text-xs text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 font-medium cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
          <textarea
            value={specialNotes}
            onChange={(e) => setSpecialNotes(e.target.value)}
            rows={3}
            placeholder="e.g. I only have a little milk, make it less spicy, use less oil, kid-friendly, etc."
            className="w-full px-4 py-3 rounded-2xl bg-[var(--input-bg)] border border-[var(--input-border)] focus:border-orange-500 focus:ring-4 focus:ring-orange-100 dark:focus:ring-orange-950/40 text-stone-800 dark:text-stone-200 placeholder-stone-400 dark:placeholder-stone-500 text-sm outline-none resize-none transition-all shadow-xs"
          />
        </div>

        {/* Validation Error Banner */}
        {validationError && (
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-rose-800 dark:text-rose-200 text-xs sm:text-sm font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Submit CTA */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isGenerating}
            className="w-full group relative py-4 sm:py-4.5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 disabled:opacity-60 text-white font-extrabold text-base sm:text-lg flex items-center justify-center gap-3 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/35 transition-all active:scale-[0.99] cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-amber-200 animate-pulse" />
            <span>{isGenerating ? "Cooking magic in progress..." : "Generate 3 Recipes"}</span>
            <UtensilsCrossed className="w-5 h-5 text-orange-200 group-hover:rotate-12 transition-transform duration-300" />
          </button>

          <p className="text-center text-[11px] text-stone-500 dark:text-stone-400 mt-2.5">
            Varied cooking methods, textures & flavor profiles every generation.
          </p>
        </div>
      </div>
    </form>
  );
}
