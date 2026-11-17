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
        <label className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-orange-600" />
          <span>Max Cooking Time</span>
          <span className="text-xs font-normal text-stone-500">
            {value ? `(${value}m limit)` : "(Optional)"}
          </span>
        </label>
        {value !== null && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-xs text-stone-500 hover:text-stone-800 font-medium"
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
                  ? "bg-orange-50 border-orange-500 text-orange-950 font-bold ring-2 ring-orange-400/20 shadow-xs"
                  : "bg-white border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-50/60 font-medium"
              }`}
            >
              <span className="text-sm sm:text-base">{opt.label}</span>
              <span
                className={`text-[10px] uppercase font-bold tracking-wider mt-0.5 ${
                  isSelected ? "text-orange-700" : "text-stone-600"
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
