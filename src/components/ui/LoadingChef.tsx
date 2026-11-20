"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProduceSvg, ProduceType } from "@/components/intro/ProduceSvg";
import { Flame, Sparkles } from "lucide-react";

const COOL_MESSAGES = [
  "🔥 Whipping up something delicious...",
  "👨‍🍳 Chef AI is in the kitchen...",
  "✨ Mixing the perfect recipe...",
  "🪄 Cooking magic in progress...",
  "🌿 Turning ingredients into gold...",
  "🍳 Sizzling something spectacular...",
  "🫕 Simmering creative flavors...",
  "⚖️ Balancing crunch and umami...",
  "🎨 Painting flavors on your plate...",
  "🌶️ Adding that secret kick...",
  "🧑‍🍳 Consulting the flavor oracle...",
  "🍋 Squeezing out brilliance...",
];

const CHEF_STEPS = [
  "🔍 Inspecting your pantry & fresh items...",
  "⚖️ Balancing acidity, richness, and crisp textures...",
  "📝 Incorporating your special notes & instructions...",
  "🌡️ Fine-tuning heat levels & cooking techniques...",
  "💡 Formulating 3 diverse, mouthwatering ideas...",
  "✍️ Writing clear, step-by-step instructions...",
  "🎭 Giving each dish a unique personality...",
  "🏁 Putting the finishing touches...",
];

const FLOATING_INGREDIENTS: {
  type: ProduceType;
  x: number;
  y: number;
  size: number;
  delay: number;
  floatY: [number, number, number];
  rotate: [number, number, number];
}[] = [
  {
    type: "tomato",
    x: -85,
    y: -30,
    size: 38,
    delay: 0,
    floatY: [0, -14, 0],
    rotate: [-8, 12, -8],
  },
  {
    type: "carrot",
    x: 82,
    y: -42,
    size: 40,
    delay: 0.3,
    floatY: [0, -18, 0],
    rotate: [15, -10, 15],
  },
  {
    type: "broccoli",
    x: -60,
    y: -80,
    size: 36,
    delay: 0.6,
    floatY: [0, -12, 0],
    rotate: [-12, 8, -12],
  },
  {
    type: "lemon",
    x: 70,
    y: 10,
    size: 34,
    delay: 0.9,
    floatY: [0, -15, 0],
    rotate: [10, -14, 10],
  },
  {
    type: "chili",
    x: -80,
    y: 24,
    size: 32,
    delay: 1.2,
    floatY: [0, -16, 0],
    rotate: [-15, 10, -15],
  },
];

export function LoadingChef() {
  const [messageIndex, setMessageIndex] = useState(() =>
    Math.floor(Math.random() * COOL_MESSAGES.length)
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [progressPct, setProgressPct] = useState(8);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % COOL_MESSAGES.length);
    }, 2600);

    const stepInterval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % CHEF_STEPS.length);
    }, 2200);

    // Smooth fake progress that fills to ~88% then waits
    const progressInterval = setInterval(() => {
      setProgressPct((prev) => {
        if (prev >= 88) return prev;
        const increment = prev < 40 ? 4 : prev < 70 ? 2.5 : 1;
        return Math.min(88, prev + increment);
      });
    }, 400);

    return () => {
      clearInterval(msgInterval);
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto my-10 px-4">
      <div className="relative p-6 sm:p-9 rounded-3xl bg-[var(--card-bg)] border border-[var(--card-border)] shadow-2xl shadow-orange-950/8 text-center flex flex-col items-center select-none overflow-hidden">
        {/* Background ambient glows */}
        <div className="absolute -top-14 -left-14 w-44 h-44 bg-orange-300/20 dark:bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-14 -right-14 w-48 h-48 bg-amber-300/15 dark:bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />
        {/* Extra dark-mode glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-40 bg-orange-500/5 dark:bg-orange-500/8 rounded-full blur-3xl pointer-events-none" />

        {/* Animated Cooking Scene */}
        <div className="relative w-64 h-52 flex items-center justify-center my-2">
          {/* Floating produce orbiting the pot */}
          {FLOATING_INGREDIENTS.map((item, idx) => (
            <motion.div
              key={idx}
              className="absolute z-20 pointer-events-none drop-shadow-md"
              style={{ x: item.x, y: item.y }}
              animate={{
                y: item.floatY.map((fy) => item.y + fy),
                rotate: item.rotate,
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay,
              }}
            >
              <ProduceSvg type={item.type} size={item.size} />
            </motion.div>
          ))}

          {/* Rising Steam Clouds */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 pointer-events-none flex gap-3">
            <motion.div
              animate={{ y: [-4, -28], opacity: [0.2, 0.7, 0], scale: [0.8, 1.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0 }}
              className="w-3 h-8 bg-gradient-to-t from-orange-200/60 dark:from-orange-400/30 to-transparent rounded-full blur-sm"
            />
            <motion.div
              animate={{ y: [-2, -34], opacity: [0.3, 0.8, 0], scale: [0.9, 1.4] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
              className="w-4 h-10 bg-gradient-to-t from-amber-200/70 dark:from-amber-400/30 to-transparent rounded-full blur-sm"
            />
            <motion.div
              animate={{ y: [-4, -28], opacity: [0.2, 0.7, 0], scale: [0.8, 1.2] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 1.1 }}
              className="w-3 h-8 bg-gradient-to-t from-orange-200/60 dark:from-orange-400/30 to-transparent rounded-full blur-sm"
            />
          </div>

          {/* Cooking Pot with Stirring Ladle */}
          <div className="relative z-10 mt-12 flex flex-col items-center">
            {/* Animated Wooden Spoon */}
            <motion.div
              className="absolute -top-10 left-1/2 z-20 origin-bottom pointer-events-none"
              animate={{
                rotate: [-18, 18, -18],
                x: [-12, 12, -12],
                y: [-2, 3, -2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <svg width="28" height="60" viewBox="0 0 28 60" fill="none" className="drop-shadow-sm">
                <rect x="11.5" y="14" width="5" height="42" rx="2.5" fill="#B45309" stroke="#78350F" strokeWidth="1" />
                <ellipse cx="14" cy="12" rx="10" ry="11" fill="#D97706" stroke="#92400E" strokeWidth="1.2" />
                <ellipse cx="14" cy="12" rx="7" ry="7.5" fill="#F59E0B" fillOpacity="0.8" />
              </svg>
            </motion.div>

            {/* Main Pot */}
            <div className="relative w-36 h-22 rounded-b-3xl bg-gradient-to-br from-stone-900 via-stone-800 to-stone-950 p-2 border-2 border-stone-700/80 shadow-xl flex items-center justify-center overflow-hidden">
              {/* Copper Rim */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 border-b border-amber-400/40" />

              {/* Simmering Liquid */}
              <div className="absolute top-2 left-2 right-2 bottom-2 rounded-b-2xl bg-gradient-to-b from-orange-600 via-amber-600 to-amber-800/90 flex items-center justify-center overflow-hidden">
                {/* Boiling Bubbles */}
                <motion.div
                  animate={{ scale: [0.6, 1.2, 0.6], opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-3 left-6 w-3 h-3 rounded-full bg-amber-200/70"
                />
                <motion.div
                  animate={{ scale: [0.7, 1.3, 0.7], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-4 right-8 w-2.5 h-2.5 rounded-full bg-amber-100/80"
                />
                <motion.div
                  animate={{ scale: [0.5, 1.1, 0.5], opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
                  className="absolute bottom-4 left-10 w-2 h-2 rounded-full bg-white/70"
                />
                <Sparkles className="w-6 h-6 text-amber-200/70 animate-pulse" />
              </div>

              {/* Pot Handles */}
              <div className="absolute -left-3.5 top-5 w-4 h-6 rounded-l-lg bg-stone-700 border-l border-stone-500 shadow-sm" />
              <div className="absolute -right-3.5 top-5 w-4 h-6 rounded-r-lg bg-stone-700 border-r border-stone-500 shadow-sm" />
            </div>

            {/* Stovetop Burner Glow */}
            <div className="mt-1 flex items-center justify-center gap-1">
              <div className="w-28 h-2 rounded-full bg-gradient-to-r from-transparent via-orange-500 to-transparent blur-xs animate-pulse" />
            </div>
          </div>
        </div>

        {/* Rotating Status Badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={messageIndex}
            initial={{ opacity: 0, y: 10, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.93 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-950 dark:text-orange-300 text-xs sm:text-sm font-bold mt-3 border border-orange-200 dark:border-orange-800/60 shadow-xs"
          >
            <Flame className="w-4 h-4 text-orange-600 dark:text-orange-400 animate-pulse shrink-0" />
            <span>{COOL_MESSAGES[messageIndex]}</span>
          </motion.div>
        </AnimatePresence>

        {/* Main Title */}
        <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 tracking-tight mt-3">
          Crafting 3 Custom Meals
        </h3>

        {/* Animated Dots */}
        <div className="flex items-center gap-1 mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 dot-bounce-1 inline-block" />
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 dot-bounce-2 inline-block" />
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 dot-bounce-3 inline-block" />
        </div>

        {/* Rotating Step */}
        <div className="h-7 mt-1.5 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={stepIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-xs sm:text-sm font-semibold text-stone-500 dark:text-stone-400 max-w-sm text-center"
            >
              {CHEF_STEPS[stepIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Smooth Progress Bar */}
        <div className="w-56 h-2.5 bg-stone-100 dark:bg-stone-800/80 rounded-full overflow-hidden mt-5 border border-stone-200/60 dark:border-stone-700/50">
          <motion.div
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-500 rounded-full relative overflow-hidden"
          >
            {/* Shimmer on the bar */}
            <div className="absolute inset-0 shimmer-slide bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </motion.div>
        </div>
        <p className="text-[10px] text-stone-400 dark:text-stone-500 mt-1.5 font-medium tabular-nums">
          {Math.round(progressPct)}% — hang tight, almost there...
        </p>
      </div>
    </div>
  );
}
