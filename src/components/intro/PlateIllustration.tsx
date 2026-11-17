"use client";

import React from "react";

export function PlateIllustration({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative mx-auto flex items-center justify-center select-none">
      {/* Soft ambient table shadow */}
      <div className="absolute w-[310px] h-[310px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] rounded-full bg-stone-300/40 blur-2xl transform translate-y-8" />

      {/* Outer Ceramic Plate */}
      <div className="relative w-[290px] h-[290px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] rounded-full bg-gradient-to-b from-[#FFFFFF] via-[#FAF7F2] to-[#EFEAE1] p-3 sm:p-4 md:p-5 shadow-[0_20px_45px_-12px_rgba(80,50,20,0.18),0_4px_16px_rgba(0,0,0,0.06)] border border-[#E8E2D6]/80 flex items-center justify-center transition-all duration-300">
        
        {/* Subtle decorative plate rim groove */}
        <div className="w-full h-full rounded-full border border-stone-200/70 p-2 sm:p-3 flex items-center justify-center bg-gradient-to-tr from-[#F8F4EC] via-white to-[#FCFBF8] shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.03)]">
          
          {/* Inner Plate Basin (Depression where food rests) */}
          <div className="relative w-full h-full rounded-full bg-gradient-to-b from-[#F7F3EB] via-[#FDFBF7] to-[#F1EBE0] shadow-[inset_0_6px_14px_rgba(80,60,40,0.08),inset_0_-4px_8px_rgba(255,255,255,0.9)] border border-stone-200/50 flex items-center justify-center overflow-hidden">
            
            {/* Subtle light reflection on ceramic */}
            <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-white/50 blur-xl pointer-events-none" />
            <div className="absolute bottom-2 right-4 w-32 h-16 rounded-full bg-amber-500/5 blur-xl pointer-events-none" />

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
