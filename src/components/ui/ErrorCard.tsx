"use client";

import React from "react";
import { AlertCircle, RefreshCw, Sparkles } from "lucide-react";

interface ErrorCardProps {
  message: string;
  onRetry: () => void;
  onUseFallback?: () => void;
}

export function ErrorCard({
  message,
  onRetry,
  onUseFallback,
}: ErrorCardProps) {
  return (
    <div className="w-full max-w-lg mx-auto my-8 px-4 p-6 rounded-3xl bg-rose-50/90 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 text-center space-y-4 shadow-sm">
      <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-900/40 mx-auto flex items-center justify-center text-rose-600 dark:text-rose-400">
        <AlertCircle className="w-6 h-6" />
      </div>

      <div>
        <h3 className="text-lg font-bold text-rose-950 dark:text-rose-200">
          Unable to Cook Up Recipes
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-rose-800 dark:text-rose-300 leading-relaxed">
          {message}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
        {onUseFallback && (
          <button
            onClick={onUseFallback}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Use Curated Chef Recipes</span>
          </button>
        )}

        <button
          onClick={onRetry}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white dark:bg-stone-850 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry</span>
        </button>
      </div>
    </div>
  );
}
