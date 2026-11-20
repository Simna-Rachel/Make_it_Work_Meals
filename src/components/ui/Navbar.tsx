"use client";

import React from "react";
import { BrandLogo } from "./BrandLogo";
import { Heart, Utensils, Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

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
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-40 w-full bg-[var(--navbar-bg)] backdrop-blur-md border-b border-[var(--navbar-border)] shadow-xs transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate("intro")}
          className="group cursor-pointer text-left focus:outline-none"
          title="Return to Home"
        >
          <BrandLogo />
        </button>

        {/* Right Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Recipe Form button */}
          {currentView !== "form" && currentView !== "intro" && (
            <button
              onClick={() => onNavigate("form")}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-stone-700 dark:text-stone-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/40 transition-colors cursor-pointer flex items-center gap-1.5"
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
                ? "bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-400 shadow-2xs"
                : "bg-[var(--card-bg)] border-[var(--card-border)] hover:border-stone-300 dark:hover:border-stone-600 text-stone-700 dark:text-stone-300"
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
              className={`text-xs px-1.5 py-0.5 rounded-full font-extrabold ${
                favoritesCount > 0
                  ? "bg-rose-500 text-white"
                  : "bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400"
              }`}
            >
              {favoritesCount}
            </span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            suppressHydrationWarning
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--card-border)] bg-[var(--card-bg)] hover:border-orange-300 dark:hover:border-orange-700 hover:bg-orange-50 dark:hover:bg-orange-950/40 text-stone-600 dark:text-stone-300 transition-all cursor-pointer active:scale-95 shadow-xs"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-stone-500" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
