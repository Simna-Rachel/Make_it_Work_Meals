"use client";

import React from "react";
import { CuisineType } from "@/types/recipe";
import { Globe, ChevronDown } from "lucide-react";

interface CuisineSelectProps {
  value: CuisineType | "";
  onChange: (cuisine: CuisineType | "") => void;
}

const CUISINES: { id: CuisineType; label: string; flag: string }[] = [
  { id: "Any", label: "Any Cuisine (Chef's Choice)", flag: "✨" },
  { id: "Italian", label: "Italian", flag: "🇮🇹" },
  { id: "Indian", label: "Indian", flag: "🇮🇳" },
  { id: "Chinese", label: "Chinese", flag: "🇨🇳" },
  { id: "Mexican", label: "Mexican", flag: "🇲🇽" },
  { id: "Mediterranean", label: "Mediterranean", flag: "🫒" },
  { id: "Thai", label: "Thai", flag: "🇹🇭" },
  { id: "American", label: "American Comfort", flag: "🇺🇸" },
  { id: "Japanese", label: "Japanese", flag: "🇯🇵" },
  { id: "French", label: "French Bistro", flag: "🇫🇷" },
  { id: "Middle Eastern", label: "Middle Eastern", flag: "🧆" },
];

export function CuisineSelect({ value, onChange }: CuisineSelectProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
          <Globe className="w-4 h-4 text-orange-600" />
          <span>Cuisine Style</span>
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs text-stone-500 hover:text-stone-800 font-medium"
          >
            Clear
          </button>
        )}
      </div>

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as CuisineType | "")}
          aria-label="Cuisine Style"
          className={`w-full appearance-none px-4 py-3 rounded-2xl bg-white border border-stone-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 font-medium text-sm sm:text-base outline-none cursor-pointer transition-all shadow-xs pr-10 ${
            value ? "text-stone-800" : "text-stone-400"
          }`}
        >
          <option value="">-- Choose cuisine style (optional) --</option>
          {CUISINES.map((c) => (
            <option key={c.id} value={c.id} className="text-stone-800">
              {c.flag} {c.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
