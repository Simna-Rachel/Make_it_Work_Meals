"use client";

import React, { useState, KeyboardEvent } from "react";
import { Plus, X, Sparkles, AlertCircle } from "lucide-react";

interface IngredientInputProps {
  ingredients: string[];
  onChange: (ingredients: string[]) => void;
}

const COMMON_PANTRY_ITEMS = [
  "Garlic",
  "Onions",
  "Eggs",
  "Rice",
  "Pasta",
  "Tomatoes",
  "Olive Oil",
  "Cheese",
  "Spinach",
  "Potatoes",
  "Chicken",
  "Bell Pepper",
  "Mushrooms",
  "Carrots",
  "Soy Sauce",
];

const PRESETS = [
  {
    name: "🍝 Quick Pasta Night",
    items: ["Pasta", "Garlic", "Olive Oil", "Tomatoes", "Cheese"],
  },
  {
    name: "🍳 Breakfast Scramble",
    items: ["Eggs", "Onions", "Spinach", "Cheese", "Butter"],
  },
  {
    name: "🍚 Cozy Veggie Fried Rice",
    items: ["Rice", "Carrots", "Soy Sauce", "Eggs", "Garlic", "Green Onions"],
  },
];

export function IngredientInput({ ingredients, onChange }: IngredientInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAdd = (rawItem: string) => {
    const trimmed = rawItem.trim().toLowerCase();
    if (!trimmed) return;

    if (ingredients.some((i) => i.toLowerCase() === trimmed)) {
      setError(`"${trimmed}" is already added!`);
      setTimeout(() => setError(null), 2500);
      return;
    }

    onChange([...ingredients, rawItem.trim()]);
    setInputValue("");
    setError(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd(inputValue);
    } else if (e.key === "," || e.key === ";") {
      e.preventDefault();
      handleAdd(inputValue);
    }
  };

  const handleRemove = (indexToRemove: number) => {
    onChange(ingredients.filter((_, idx) => idx !== indexToRemove));
  };

  const handleClearAll = () => {
    onChange([]);
  };

  const applyPreset = (items: string[]) => {
    const combined = Array.from(new Set([...ingredients, ...items]));
    onChange(combined);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
          <span>🥕 Your Ingredients</span>
          <span className="text-xs font-normal text-stone-500 dark:text-stone-400">
            ({ingredients.length} added)
          </span>
        </label>
        {ingredients.length > 0 && (
          <button
            type="button"
            onClick={handleClearAll}
            className="text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 font-medium transition-colors cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Input Box */}
      <div className="relative flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (error) setError(null);
          }}
          onKeyDown={handleKeyDown}
          placeholder="e.g. 2 eggs, leftover chicken, bell pepper, rice..."
          className="w-full px-4 py-3 sm:py-3.5 pr-24 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700/80 focus:border-orange-500 dark:focus:border-orange-500 focus:ring-4 focus:ring-orange-100 dark:focus:ring-orange-950/40 text-stone-800 dark:text-stone-200 placeholder-stone-400 dark:placeholder-stone-500 text-sm sm:text-base outline-none transition-all shadow-xs"
        />
        <button
          type="button"
          onClick={() => handleAdd(inputValue)}
          disabled={!inputValue.trim()}
          className="absolute right-2 px-3.5 py-1.5 sm:py-2 rounded-xl bg-orange-600 hover:bg-orange-700 disabled:bg-stone-200 dark:disabled:bg-stone-800 disabled:text-stone-400 dark:disabled:text-stone-600 text-white font-semibold text-xs sm:text-sm flex items-center gap-1 shadow-xs transition-all active:scale-95 cursor-pointer disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1 font-medium">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{error}</span>
        </p>
      )}

      {/* Added Ingredient Tags */}
      {ingredients.length > 0 ? (
        <div className="flex flex-wrap gap-2 pt-1">
          {ingredients.map((item, idx) => (
            <span
              key={`${item}-${idx}`}
              className="group inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 text-orange-900 dark:text-orange-200 text-xs sm:text-sm font-semibold shadow-2xs animate-in fade-in zoom-in-95 duration-200"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="w-4 h-4 rounded-full flex items-center justify-center text-orange-500 hover:text-rose-600 hover:bg-orange-200/60 dark:hover:bg-orange-900/60 transition-colors cursor-pointer"
                title={`Remove ${item}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <p className="text-xs text-stone-600 dark:text-stone-400 italic">
          Tip: Add whatever is sitting in your fridge, pantry, or counter. Even odd leftovers work!
        </p>
      )}

      {/* Quick Add Suggestions */}
      <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
        <p className="text-xs font-semibold text-stone-600 dark:text-stone-400 mb-2">
          Tap to quickly add common staples:
        </p>
        <div className="flex flex-wrap gap-1.5">
          {COMMON_PANTRY_ITEMS.map((item) => {
            const isAdded = ingredients.some(
              (i) => i.toLowerCase() === item.toLowerCase()
            );
            return (
              <button
                key={item}
                type="button"
                onClick={() => !isAdded && handleAdd(item)}
                disabled={isAdded}
                className={`text-xs px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                  isAdded
                    ? "bg-stone-100 dark:bg-stone-800/60 text-stone-400 dark:text-stone-500 border-stone-200 dark:border-stone-700/60 cursor-not-allowed line-through"
                    : "bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-orange-300 dark:hover:border-orange-700 hover:bg-orange-50/60 dark:hover:bg-orange-950/40 hover:text-orange-900 dark:hover:text-orange-200 active:scale-95"
                }`}
              >
                + {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* Preset Ideas */}
      <div className="pt-2">
        <p className="text-xs font-semibold text-stone-600 dark:text-stone-400 mb-1.5 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Or try a quick combo:</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => applyPreset(preset.items)}
              className="text-xs px-3 py-1.5 rounded-xl bg-stone-100/90 dark:bg-stone-800 hover:bg-stone-200/80 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-medium transition-colors active:scale-95 cursor-pointer"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
