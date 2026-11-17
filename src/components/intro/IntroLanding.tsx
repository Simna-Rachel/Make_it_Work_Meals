"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { PlateIllustration } from "./PlateIllustration";
import { FallingProduce } from "./FallingProduce";
import { ArrowRight, RotateCcw, Heart, UtensilsCrossed, Sparkles, Timer, Leaf } from "lucide-react";

interface IntroLandingProps {
  onGetStarted: () => void;
  savedFavoritesCount?: number;
  onOpenFavorites?: () => void;
}

export function IntroLanding({
  onGetStarted,
  savedFavoritesCount = 0,
  onOpenFavorites,
}: IntroLandingProps) {
  const [replaying, setReplaying] = useState(false);

  const handleReplay = () => {
    setReplaying(true);
    setTimeout(() => setReplaying(false), 2600);
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex flex-col bg-gradient-to-b from-[#FDFBF7] via-[#FFF9F2] to-[#F5EFE3]">
      {/* Background ambient warm decorative glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-200/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-amber-200/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-emerald-100/20 rounded-full blur-3xl pointer-events-none" />

      {/* ─── Top Navigation Bar ─── */}
      <header className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-2 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <BrandLogo />
        </motion.div>

        {onOpenFavorites && savedFavoritesCount > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenFavorites}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-stone-200/80 shadow-xs text-stone-700 hover:text-orange-600 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Favorites ({savedFavoritesCount})</span>
          </motion.button>
        )}
      </header>

      {/* ─── Main Content Area ─── */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto px-4 py-6 sm:py-10">
        {/* Two-column layout: Hero text left, Plate right — stacked on mobile */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14">

          {/* ─── Left Column: Title + Subtitle + Pills + CTA ─── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-lg"
          >
            {/* Hero Title — display font, no logo image */}
            <h1 className="leading-tight" style={{ fontFamily: "var(--font-display)" }}>
              <span className="block text-4xl sm:text-5xl md:text-6xl font-extrabold text-stone-900 tracking-tight">
                Make It Work
              </span>
              <span className="block text-4xl sm:text-5xl md:text-6xl font-black italic text-orange-600 tracking-tight -mt-1">
                Meals
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-4 sm:mt-5 text-stone-500 text-sm sm:text-base md:text-lg font-medium max-w-md leading-relaxed">
              Turn whatever&apos;s in your fridge into{" "}
              <span className="text-stone-700 font-semibold">delicious, chef-quality meals</span>{" "}
              — in minutes.
            </p>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-2"
            >
              {[
                { icon: Leaf, label: "Zero Food Waste", color: "text-green-600" },
                { icon: Timer, label: "15–30 Min Meals", color: "text-orange-600" },
                { icon: Sparkles, label: "Gemini AI", color: "text-amber-600" },
              ].map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-stone-200/80 shadow-xs text-xs sm:text-sm font-semibold text-stone-600"
                >
                  <Icon className={`w-3.5 h-3.5 ${color}`} />
                  <span>{label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-7 sm:mt-8"
            >
              <button
                onClick={onGetStarted}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white font-extrabold text-base sm:text-lg shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer overflow-hidden ring-4 ring-orange-200/40"
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform ease-out pointer-events-none" />

                <UtensilsCrossed className="w-5 h-5 text-orange-100 group-hover:rotate-12 transition-transform duration-300" />
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </motion.div>
          </motion.div>

          {/* ─── Right Column: Plate with Falling Produce ─── */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative flex flex-col items-center"
          >
            <PlateIllustration>
              <FallingProduce isReplaying={replaying} />
            </PlateIllustration>

            {/* Re-toss button */}
            <div className="mt-3 flex items-center gap-2 text-stone-400 text-xs">
              <button
                onClick={handleReplay}
                disabled={replaying}
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 hover:bg-white border border-stone-200/70 text-stone-500 hover:text-stone-800 transition-all shadow-xs text-xs font-semibold active:scale-95 disabled:opacity-50 cursor-pointer"
                title="Watch vegetables fall and bounce again"
              >
                <RotateCcw className={`w-3 h-3 ${replaying ? "animate-spin" : ""}`} />
                <span>{replaying ? "Tossing..." : "Re-toss ingredients"}</span>
              </button>
              <span className="hidden sm:inline text-stone-300">•</span>
              <span className="hidden sm:inline text-stone-400 italic text-[11px]">Tap any veggie to bounce it!</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Footer ─── */}
      <footer className="relative z-10 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="border-t border-stone-200/50" />
          <div className="py-6 flex flex-col items-center gap-2">
            <p className="text-sm font-semibold text-stone-500 tracking-wide">
              Made with{" "}
              <span className="inline-block animate-pulse text-rose-500">❤️</span>{" "}
              by <span className="text-stone-700 font-bold">SRJ</span>
            </p>
            <p className="text-[11px] sm:text-xs text-stone-400 font-medium">
              Powered by Google Gemini
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
