"use client";

import React from "react";
import { BrandLogo } from "./BrandLogo";
import { Heart, Utensils } from "lucide-react";

interface NavbarProps {
  currentView: "intro" | "form" | "recipes" | "favorites";
  onNavigate: (view: "intro" | "form" | "recipes" | "favorites") => void;
  favoritesCount: number;
}

export function Navbar({
  currentView,
  onNavigate,
  favoritesCount,
}: NavbarProps) {
  return (
    <nav className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand Logo with Frying Pan, Timer, Steam & Tagline */}
        <button
          onClick={() => onNavigate("intro")}
          className="group cursor-pointer text-left focus:outline-none"
          title="Return to Home"
        >
          <BrandLogo />
        </button>

        {/* Right Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Recipe Form Action if not already on it */}
          {currentView !== "form" && currentView !== "intro" && (
            <button
              onClick={() => onNavigate("form")}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-stone-700 hover:text-orange-600 hover:bg-orange-50 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Utensils className="w-3.5 h-3.5 text-orange-600" />
              <span>Recipe Form</span>
            </button>
          )}

          {/* Favorites Button */}
          <button
            onClick={() => onNavigate("favorites")}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
              currentView === "favorites"
                ? "bg-rose-50 border-rose-300 text-rose-700 shadow-2xs"
                : "bg-white border-stone-200 hover:border-stone-300 text-stone-700"
            }`}
            title="Favorite Recipes"
          >
            <Heart
              className={`w-4 h-4 transition-transform ${
                favoritesCount > 0 ? "fill-rose-500 text-rose-500 scale-110" : "text-stone-400"
              }`}
            />
            <span className="hidden sm:inline">Favorites</span>
            <span
              className={`text-xs px-1.5 py-0.2 rounded-full font-extrabold ${
                favoritesCount > 0
                  ? "bg-rose-500 text-white"
                  : "bg-stone-100 text-stone-500"
              }`}
            >
              {favoritesCount}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
