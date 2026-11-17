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
        <label className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
          <Users className="w-4 h-4 text-orange-600" />
          <span>Number of Servings</span>
        </label>
        {value > 1 && (
          <button
            type="button"
            onClick={() => onChange(1)}
            className="text-xs text-stone-500 hover:text-stone-800 font-medium"
          >
            Reset (1)
          </button>
        )}
      </div>

      <div className="flex items-center justify-between px-3 py-2 rounded-2xl bg-white border border-stone-200 shadow-xs">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= 1}
          aria-label="Decrease servings"
          className="w-10 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 disabled:opacity-30 disabled:hover:bg-stone-100 flex items-center justify-center text-stone-700 font-bold transition-colors cursor-pointer disabled:cursor-not-allowed active:scale-95"
        >
          <Minus className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-2xl font-black text-stone-800 tracking-tight">
            {value}
          </span>
          <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wide">
            {value === 1 ? "1 Serving" : `${value} Servings`}
          </span>
        </div>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= 6}
          aria-label="Increase servings"
          className="w-10 h-10 rounded-xl bg-orange-100 hover:bg-orange-200 disabled:opacity-40 disabled:hover:bg-orange-100 flex items-center justify-center text-orange-800 font-bold transition-colors cursor-pointer disabled:cursor-not-allowed active:scale-95"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
