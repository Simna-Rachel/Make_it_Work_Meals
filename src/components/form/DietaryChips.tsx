"use client";

import React from "react";
import { DietaryPreference } from "@/types/recipe";
import { Check } from "lucide-react";

interface DietaryChipsProps {
  selected: DietaryPreference[];
  onChange: (selected: DietaryPreference[]) => void;
}

const DIETARY_OPTIONS: { id: DietaryPreference; label: string; icon: string }[] = [
  { id: "None", label: "No Restrictions", icon: "🍽️" },
  { id: "Vegetarian", label: "Vegetarian", icon: "🌱" },
  { id: "Vegan", label: "Vegan", icon: "🥑" },
  { id: "Gluten-free", label: "Gluten-free", icon: "🌾" },
  { id: "Dairy-free", label: "Dairy-free", icon: "🥛" },
  { id: "Keto", label: "Keto / Low-Carb", icon: "🥩" },
];

export function DietaryChips({ selected, onChange }: DietaryChipsProps) {
  const handleToggle = (option: DietaryPreference) => {
    if (option === "None") {
      if (selected.includes("None")) {
        onChange([]);
      } else {
        onChange(["None"]);
      }
      return;
    }

    const withoutNone = selected.filter((item) => item !== "None");

    if (withoutNone.includes(option)) {
      const remaining = withoutNone.filter((item) => item !== option);
      onChange(remaining);
    } else {
      onChange([...withoutNone, option]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
          <span>🥗 Dietary Preferences</span>
          <span className="text-xs font-normal text-stone-500 dark:text-stone-400">
            {selected.length === 0 ? "(None selected)" : `(${selected.length} selected)`}
          </span>
        </label>
        {selected.length > 0 && (
          <button
            type="button"
            onClick={() => onChange([])}
            className="text-xs text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 font-medium cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {DIETARY_OPTIONS.map((opt) => {
          const isSelected = selected.includes(opt.id);

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleToggle(opt.id)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all text-left cursor-pointer active:scale-95 ${
                isSelected
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-600 text-emerald-950 dark:text-emerald-200 font-semibold ring-2 ring-emerald-400/20 shadow-xs"
                  : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700/80 text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-600 hover:bg-stone-50/60 dark:hover:bg-stone-800/60"
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-base">{opt.icon}</span>
                <span className="truncate">{opt.label}</span>
              </div>
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ml-1.5 transition-colors ${
                  isSelected ? "bg-emerald-600 text-white" : "border border-stone-300 dark:border-stone-600"
                }`}
              >
                {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
