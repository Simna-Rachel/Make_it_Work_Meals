"use client";

import React from "react";
import { Minus, Plus, Users } from "lucide-react";

interface ServingsCounterProps {
  value: number;
  onChange: (servings: number) => void;
}

export function ServingsCounter({ value, onChange }: ServingsCounterProps) {
  const handleDecrement = () => {
    if (value > 1) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (value < 6) onChange(value + 1);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
          <Users className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          <span>Number of Servings</span>
        </label>
        {value > 1 && (
          <button
            type="button"
            onClick={() => onChange(1)}
            className="text-xs text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 font-medium cursor-pointer"
          >
            Reset (1)
          </button>
        )}
      </div>

      <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700/80 shadow-xs">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= 1}
          aria-label="Decrease servings"
          className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 disabled:opacity-30 disabled:hover:bg-stone-100 dark:disabled:hover:bg-stone-800 flex items-center justify-center text-stone-700 dark:text-stone-300 font-bold transition-colors cursor-pointer disabled:cursor-not-allowed active:scale-95"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-2xl font-black text-stone-800 dark:text-stone-100 tracking-tight">
            {value}
          </span>
          <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wide">
            {value === 1 ? "1 Serving" : `${value} Servings`}
          </span>
        </div>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= 6}
          aria-label="Increase servings"
          className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/60 hover:bg-orange-200 dark:hover:bg-orange-900/60 disabled:opacity-40 disabled:hover:bg-orange-100 dark:disabled:hover:bg-orange-950/60 flex items-center justify-center text-orange-800 dark:text-orange-200 font-bold transition-colors cursor-pointer disabled:cursor-not-allowed active:scale-95"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
