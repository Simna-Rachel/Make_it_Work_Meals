"use client";

import React, { useState } from "react";
import {
  ChefHat,
  Play,
  Pause,
  RotateCcw,
  X,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  Clock,
  Minus,
  Plus,
} from "lucide-react";
import { useCooking, formatTimer } from "@/context/CookingContext";

export function CookingBar() {
  const {
    session,
    clearSession,
    setTimerRunning,
    resetTimer,
    toggleStep,
    toggleIngredient,
    adjustTimer,
  } = useCooking();

  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"steps" | "ingredients">("steps");

  if (!session) return null;

  const { recipe, timerSeconds, timerInitial, isTimerRunning, completedSteps, checkedIngredients } = session;

  const stepsCompleted = Object.values(completedSteps).filter(Boolean).length;
  const totalSteps = recipe.instructions.length;
  const progressPct = totalSteps > 0 ? Math.round((stepsCompleted / totalSteps) * 100) : 0;

  const timerPct = timerInitial > 0 ? Math.round(((timerInitial - timerSeconds) / timerInitial) * 100) : 0;
  const isFinished = timerSeconds === 0;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex flex-col shadow-2xl print-hide"
      style={{ filter: "drop-shadow(0 -4px 24px rgba(0,0,0,0.18))" }}
    >
      {/* ─── Expanded Panel ───────────────────────────────────────── */}
      {expanded && (
        <div className="bg-stone-950 text-white border-t border-stone-800 max-h-[55vh] overflow-y-auto">
          {/* Tab bar */}
          <div className="flex items-center border-b border-stone-800 px-4 pt-3 gap-1">
            {(["steps", "ingredients"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-t-lg text-xs font-bold transition-colors cursor-pointer capitalize ${
                  activeTab === tab
                    ? "bg-orange-500/20 text-orange-400 border-b-2 border-orange-500"
                    : "text-stone-500 hover:text-stone-300"
                }`}
              >
                {tab === "steps"
                  ? `Steps (${stepsCompleted}/${totalSteps})`
                  : `Ingredients (${Object.values(checkedIngredients).filter(Boolean).length}/${recipe.ingredients.length})`}
              </button>
            ))}
          </div>

          <div className="p-4 space-y-2">
            {activeTab === "steps" &&
              recipe.instructions.map((step, idx) => {
                const done = !!completedSteps[idx];
                return (
                  <button
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      done
                        ? "bg-emerald-900/30 border-emerald-800/50"
                        : "bg-stone-900 border-stone-800 hover:border-orange-700/50"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5 ${
                        done ? "bg-emerald-600" : "bg-orange-900 text-orange-400"
                      }`}
                    >
                      {done ? <CheckCircle2 className="w-3.5 h-3.5 text-white" /> : idx + 1}
                    </div>
                    <p
                      className={`text-xs leading-relaxed ${
                        done ? "line-through text-stone-500" : "text-stone-200"
                      }`}
                    >
                      {step}
                    </p>
                  </button>
                );
              })}

            {activeTab === "ingredients" &&
              recipe.ingredients.map((ing, idx) => {
                const checked = !!checkedIngredients[idx];
                return (
                  <button
                    key={idx}
                    onClick={() => toggleIngredient(idx)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      checked
                        ? "bg-stone-900 border-stone-800"
                        : "bg-stone-900 border-stone-700 hover:border-orange-700/50"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                        checked
                          ? "bg-emerald-600 border-emerald-600"
                          : "border-stone-600"
                      }`}
                    >
                      {checked && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        checked ? "line-through text-stone-500" : "text-stone-300"
                      }`}
                    >
                      {ing}
                    </span>
                  </button>
                );
              })}
          </div>
        </div>
      )}

      {/* ─── Compact Bar (always visible) ──────────────────────────── */}
      <div
        className={`bg-stone-950 border-t flex items-center gap-3 px-4 py-2.5 ${
          isFinished ? "border-emerald-700" : "border-stone-800"
        }`}
      >
        {/* Recipe name + progress */}
        <button
          onClick={() => setExpanded((e) => !e)}
          className="flex items-center gap-2.5 flex-1 min-w-0 text-left cursor-pointer group"
          title={expanded ? "Collapse cooking panel" : "Expand cooking panel"}
        >
          <div className="relative w-8 h-8 shrink-0">
            {/* Circular progress ring */}
            <svg viewBox="0 0 36 36" className="w-8 h-8 -rotate-90">
              <circle cx="18" cy="18" r="15" fill="none" stroke="#292524" strokeWidth="3" />
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke={isFinished ? "#10b981" : "#f97316"}
                strokeWidth="3"
                strokeDasharray={`${progressPct * 0.942} 100`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <ChefHat className="w-3.5 h-3.5 text-orange-400" />
            </div>
          </div>

          <div className="min-w-0">
            <p className="text-xs font-bold text-white truncate max-w-[140px] sm:max-w-xs">
              {recipe.title}
            </p>
            <p className="text-[10px] text-stone-500">
              {stepsCompleted}/{totalSteps} steps • {progressPct}% done
            </p>
          </div>

          {expanded ? (
            <ChevronDown className="w-4 h-4 text-stone-500 group-hover:text-stone-300 transition-colors shrink-0" />
          ) : (
            <ChevronUp className="w-4 h-4 text-stone-500 group-hover:text-stone-300 transition-colors shrink-0" />
          )}
        </button>

        {/* Timer + controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Adjust –5m */}
          <button
            onClick={() => adjustTimer(-300)}
            className="hidden sm:flex w-6 h-6 rounded-lg bg-stone-800 hover:bg-stone-700 items-center justify-center text-stone-400 hover:text-white transition-colors cursor-pointer"
            title="-5 min"
          >
            <Minus className="w-3 h-3" />
          </button>

          {/* Timer display */}
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-orange-400" />
            <span
              className={`font-mono font-bold text-base tabular-nums ${
                isFinished
                  ? "text-emerald-400"
                  : timerSeconds < 60
                  ? "text-red-400 animate-pulse"
                  : "text-orange-400"
              }`}
            >
              {isFinished ? "Done!" : formatTimer(timerSeconds)}
            </span>
          </div>

          {/* Adjust +5m */}
          <button
            onClick={() => adjustTimer(300)}
            className="hidden sm:flex w-6 h-6 rounded-lg bg-stone-800 hover:bg-stone-700 items-center justify-center text-stone-400 hover:text-white transition-colors cursor-pointer"
            title="+5 min"
          >
            <Plus className="w-3 h-3" />
          </button>

          {/* Play / Pause */}
          <button
            onClick={() => setTimerRunning(!isTimerRunning)}
            disabled={isFinished}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer disabled:opacity-40 ${
              isTimerRunning
                ? "bg-amber-500 hover:bg-amber-600 text-stone-950"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
          >
            {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isTimerRunning ? "Pause" : "Start"}</span>
          </button>

          {/* Reset timer */}
          <button
            onClick={resetTimer}
            className="w-7 h-7 rounded-lg bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-400 hover:text-white transition-colors cursor-pointer"
            title="Reset timer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Stop / Exit cooking */}
          <button
            onClick={clearSession}
            className="w-7 h-7 rounded-lg bg-stone-800 hover:bg-rose-900 flex items-center justify-center text-stone-500 hover:text-rose-400 transition-colors cursor-pointer"
            title="Stop cooking session"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
