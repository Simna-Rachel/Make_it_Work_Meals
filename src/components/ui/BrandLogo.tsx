"use client";

import React from "react";
import Image from "next/image";

interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({ className = "" }: BrandLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {/* Logo image */}
      <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-xl overflow-hidden shadow-md shadow-orange-950/15 ring-1 ring-stone-200/80">
        <Image
          src="/logo.jpg"
          alt="Make It Work Meals logo"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Text Section */}
      <div className="flex flex-col text-left">
        <div className="flex items-baseline gap-1.5">
          <span className="text-base sm:text-lg font-extrabold text-stone-900 dark:text-stone-100 tracking-tight leading-none" style={{ fontFamily: "var(--font-display)" }}>
            Make It Work
          </span>
          <span className="text-[10px] font-extrabold tracking-widest text-orange-600 bg-gradient-to-r from-orange-50 dark:from-orange-950/60 to-amber-50 dark:to-amber-950/60 border border-orange-200/70 dark:border-orange-800/50 px-1.5 py-0.5 rounded-md uppercase leading-none">
            Meals
          </span>
        </div>
        <span className="text-[9px] sm:text-[10px] font-semibold tracking-wider text-stone-400 dark:text-stone-500 uppercase mt-0.5">
          Cooking Made Simple
        </span>
      </div>
    </div>
  );
}
