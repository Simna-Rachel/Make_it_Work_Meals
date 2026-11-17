"use client";

import React from "react";
import { Lock, Sparkles } from "lucide-react";

interface StrictModeToggleProps {
  strictMode: boolean;
  onChange: (strictMode: boolean) => void;
}

export function StrictModeToggle({ strictMode, onChange }: StrictModeToggleProps) {
  return (
    <div
      onClick={() => onChange(!strictMode)}
      className={`relative p-4 rounded-2xl border transition-all cursor-pointer select-none active:scale-[0.99] ${
        strictMode
          ? "bg-amber-50/80 border-amber-300 ring-2 ring-amber-300/30"
          : "bg-white border-stone-200 hover:border-stone-300"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
              strictMode ? "bg-amber-500 text-white" : "bg-stone-100 text-stone-500"
            }`}
          >
            {strictMode ? <Lock className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-stone-900">
                Strict Mode (Only Listed Ingredients)
              </span>
              <span
                className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full transition-colors ${
                  strictMode
                    ? "bg-amber-200 text-amber-900"
                    : "bg-stone-100 text-stone-500"
                }`}
              >
                {strictMode ? "ON" : "OFF"}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1 leading-relaxed">
              {strictMode
                ? "Active: The AI will strictly use only your listed items (+ water). No extra staples."
                : "Off by default: The AI may suggest 1-2 common staples (e.g. olive oil, salt, garlic) if needed."}
            </p>
          </div>
        </div>

        {/* Toggle Switch */}
        <div
          role="switch"
          aria-checked={strictMode}
          className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 shrink-0 cursor-pointer transition-colors ${
            strictMode ? "bg-amber-500" : "bg-stone-300"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
              strictMode ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
