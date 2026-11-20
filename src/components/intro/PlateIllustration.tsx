"use client";

import React from "react";

export function PlateIllustration({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative mx-auto flex items-center justify-center select-none">
      {/* Soft ambient table shadow */}
      <div className="absolute w-[310px] h-[310px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] rounded-full bg-stone-300/40 dark:bg-black/60 blur-2xl transform translate-y-8" />

      {/* Outer Ceramic Plate */}
      <div className="relative w-[290px] h-[290px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] rounded-full bg-gradient-to-b from-[#FFFFFF] via-[#FAF7F2] to-[#EFEAE1] dark:from-[#2a221b] dark:via-[#201a14] dark:to-[#17130f] p-3 sm:p-4 md:p-5 shadow-[0_20px_45px_-12px_rgba(80,50,20,0.18),0_4px_16px_rgba(0,0,0,0.06)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7),0_0_20px_rgba(249,115,22,0.08)] border border-[#E8E2D6]/80 dark:border-stone-700/60 flex items-center justify-center transition-all duration-300">
        
        {/* Subtle decorative plate rim groove */}
        <div className="w-full h-full rounded-full border border-stone-200/70 dark:border-stone-700/50 p-2 sm:p-3 flex items-center justify-center bg-gradient-to-tr from-[#F8F4EC] via-white to-[#FCFBF8] dark:from-[#221c16] dark:via-[#1c1712] dark:to-[#18130f] shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.04),inset_0_-2px_6px_rgba(0,0,0,0.5)]">
          
          {/* Inner Plate Basin (Depression where food rests) */}
          <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#F7F3EB] via-[#FDFBF7] to-[#F1EBE0] dark:from-[#1d1712] dark:via-[#17120e] dark:to-[#120e0b] shadow-[inset_0_6px_14px_rgba(80,60,40,0.08),inset_0_-4px_8px_rgba(255,255,255,0.9)] dark:shadow-[inset_0_6px_16px_rgba(0,0,0,0.6),inset_0_-4px_8px_rgba(255,255,255,0.03)] border border-stone-200/50 dark:border-stone-800/80 flex items-center justify-center overflow-hidden">
            
            {/* Subtle light reflection on ceramic */}
            <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-white/50 dark:bg-white/5 blur-xl pointer-events-none" />
            <div className="absolute bottom-2 right-4 w-32 h-16 rounded-full bg-amber-500/5 dark:bg-orange-500/10 blur-xl pointer-events-none" />

            {/* Food Landing Zone / Children */}
            <div className="relative w-full h-full flex items-center justify-center">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
