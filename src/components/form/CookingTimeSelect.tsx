"use client";

import React from "react";
import { CookingTimeOption } from "@/types/recipe";
import { Clock } from "lucide-react";

interface CookingTimeSelectProps {
  value: CookingTimeOption | null;
  onChange: (time: CookingTimeOption | null) => void;
}

const TIME_OPTIONS: { value: CookingTimeOption; label: string; badge?: string }[] = [
  { value: 15, label: "15 min", badge: "Super Fast" },
  { value: 30, label: "30 min", badge: "Balanced" },
  { value: 45, label: "45 min", badge: "Thorough" },
  { value: 60, label: "60+ min", badge: "Slow Simmer" },
];

export function CookingTimeSelect({ value, onChange }: CookingTimeSelectProps) {
  const handleClick = (optValue: CookingTimeOption) => {
    if (value === optValue) {
      onChange(null); // toggle off
    } else {
      onChange(optValue);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          <span>Max Cooking Time</span>
          <span className="text-xs font-normal text-stone-500 dark:text-stone-400">
            {value ? `(${value}m limit)` : "(Optional)"}
          </span>
        </label>
        {value !== null && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-xs text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 font-medium cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {TIME_OPTIONS.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleClick(opt.value)}
              className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border text-center transition-all cursor-pointer active:scale-95 ${
                isSelected
                  ? "bg-orange-50 dark:bg-orange-950/40 border-orange-500 text-orange-950 dark:text-orange-200 font-bold ring-2 ring-orange-400/20 shadow-xs"
                  : "bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700/80 text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-600 hover:bg-stone-50/60 dark:hover:bg-stone-800/60 font-medium"
              }`}
            >
              <span className="text-sm sm:text-base">{opt.label}</span>
              <span
                className={`text-[10px] uppercase font-bold tracking-wider mt-0.5 ${
                  isSelected ? "text-orange-700 dark:text-orange-400" : "text-stone-500 dark:text-stone-400"
                }`}
              >
                {opt.badge}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
