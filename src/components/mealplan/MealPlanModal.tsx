"use client";

import React, { useState } from "react";
import {
  X,
  Calendar,
  ChefHat,
  Clock,
  Utensils,
  Coffee,
  Sun,
  Moon,
  ShoppingCart,
  Copy,
  CheckCircle2,
  Loader2,
  AlertCircle,
  RefreshCw,
  Lightbulb,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { WeeklyMealPlan, MealPlanDay, MealPlanFilters } from "@/types/mealPlan";
import { GenerationFilters } from "@/types/recipe";

interface MealPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  lastFormFilters: GenerationFilters | null;
}

type DurationOption = 5 | 7;
type MealScopeOption = "main" | "full";

const MEAL_SCOPE_LABELS: Record<MealScopeOption, string> = {
  main: "Lunch & Dinner",
  full: "Breakfast, Lunch & Dinner",
};

export function MealPlanModal({ isOpen, onClose, lastFormFilters }: MealPlanModalProps) {
  const [durationDays, setDurationDays] = useState<DurationOption>(5);
  const [mealScope, setMealScope] = useState<MealScopeOption>("main");
  const [mealPlan, setMealPlan] = useState<WeeklyMealPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedDays, setExpandedDays] = useState<Set<number>>(new Set([1]));
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const hasPantryIngredients =
    lastFormFilters && lastFormFilters.ingredients.length > 0;

  const generateMealPlan = async () => {
    if (!lastFormFilters || lastFormFilters.ingredients.length === 0) {
      setError("Please enter at least 1 ingredient on the main form before generating a meal plan.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setMealPlan(null);

    const filters: MealPlanFilters = {
      ingredients: lastFormFilters.ingredients,
      dietary: lastFormFilters.dietary || [],
      cuisine: lastFormFilters.cuisine,
      durationDays,
      mealScope,
      servings: lastFormFilters.servings || 1,
      strictMode: lastFormFilters.strictMode || false,
      specialNotes: lastFormFilters.specialNotes,
    };

    try {
      const response = await fetch("/api/generate-mealplan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filters }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || `Server responded with status ${response.status}.`);
      }

      if (data.mealPlan) {
        setMealPlan(data.mealPlan);
        setExpandedDays(new Set([1]));
      } else {
        throw new Error("No meal plan was returned. Please try again.");
      }
    } catch (err: any) {
      setError(err?.message || "Failed to generate meal plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDay = (dayNumber: number) => {
    setExpandedDays((prev) => {
      const next = new Set(prev);
      if (next.has(dayNumber)) {
        next.delete(dayNumber);
      } else {
        next.add(dayNumber);
      }
      return next;
    });
  };

  const copyShoppingList = () => {
    if (!mealPlan) return;
    const list = mealPlan.weeklyShoppingList.map((i) => `• ${i}`).join("\n");
    const text = `Weekly Shopping List – ${mealPlan.title}\n\n${list}\n\n— Make It Work Meals`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 backdrop-blur-md bg-stone-900/60 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-white border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-lg font-black text-stone-900">Weekly Meal Plan</h2>
              <p className="text-xs text-stone-500">
                AI-powered • based on your kitchen ingredients
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Settings panel (shown when no plan yet) */}
          {!mealPlan && !isLoading && (
            <div className="p-6 space-y-6">
              {/* Pantry info */}
              {hasPantryIngredients ? (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-emerald-800">
                    <span className="font-bold">
                      Using {lastFormFilters!.ingredients.length} ingredient
                      {lastFormFilters!.ingredients.length !== 1 ? "s" : ""}
                    </span>{" "}
                    from your form:{" "}
                    <span className="italic">
                      {lastFormFilters!.ingredients.slice(0, 5).join(", ")}
                      {lastFormFilters!.ingredients.length > 5 ? "..." : ""}
                    </span>
                  </p>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-amber-800">
                    <span className="font-bold">No ingredients found.</span> Please go back to the form
                    and add at least 1 ingredient before generating a meal plan.
                  </p>
                </div>
              )}

              {/* Duration selector */}
              <div className="space-y-2.5">
                <label className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-orange-600" />
                  Plan Duration
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {([5, 7] as DurationOption[]).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDurationDays(d)}
                      className={`py-3 rounded-2xl border-2 font-bold text-sm transition-all cursor-pointer ${
                        durationDays === d
                          ? "border-orange-500 bg-orange-50 text-orange-800"
                          : "border-stone-200 text-stone-600 hover:border-stone-300"
                      }`}
                    >
                      {d}-Day Plan
                      <p className={`text-xs font-normal mt-0.5 ${durationDays === d ? "text-orange-600" : "text-stone-400"}`}>
                        {d === 5 ? "Weekdays (Mon–Fri)" : "Full week (Mon–Sun)"}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Meal scope selector */}
              <div className="space-y-2.5">
                <label className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
                  <Utensils className="w-4 h-4 text-orange-600" />
                  Meals to Include
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(["main", "full"] as MealScopeOption[]).map((scope) => (
                    <button
                      key={scope}
                      type="button"
                      onClick={() => setMealScope(scope)}
                      className={`py-3 rounded-2xl border-2 font-bold text-sm transition-all cursor-pointer ${
                        mealScope === scope
                          ? "border-orange-500 bg-orange-50 text-orange-800"
                          : "border-stone-200 text-stone-600 hover:border-stone-300"
                      }`}
                    >
                      {scope === "main" ? "Main Meals" : "All 3 Meals"}
                      <p className={`text-xs font-normal mt-0.5 ${mealScope === scope ? "text-orange-600" : "text-stone-400"}`}>
                        {MEAL_SCOPE_LABELS[scope]}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Error display */}
              {error && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-rose-800 font-medium">{error}</p>
                </div>
              )}

              {/* Generate button */}
              <button
                onClick={generateMealPlan}
                disabled={!hasPantryIngredients}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 disabled:opacity-50 text-white font-extrabold text-base flex items-center justify-center gap-3 shadow-lg shadow-orange-500/20 transition-all active:scale-[0.99] cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-orange-200" />
                Generate {durationDays}-Day Meal Plan
                <ChefHat className="w-5 h-5 text-orange-200" />
              </button>
            </div>
          )}

          {/* Loading state */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-orange-500 animate-pulse" />
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-t-orange-500 border-stone-200 animate-spin" />
              </div>
              <div>
                <p className="font-bold text-stone-900 text-base">Planning your week...</p>
                <p className="text-xs text-stone-500 mt-1">
                  AI is crafting {durationDays} days of balanced, delicious meals
                </p>
              </div>
            </div>
          )}

          {/* Meal plan display */}
          {mealPlan && !isLoading && (
            <div className="p-5 space-y-5">
              {/* Plan header */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-black text-stone-900 leading-tight">
                      {mealPlan.title}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1">{mealPlan.summary}</p>
                  </div>
                  <button
                    onClick={() => { setMealPlan(null); setError(null); }}
                    className="flex-shrink-0 flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 font-medium cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Redo
                  </button>
                </div>

                {/* Stats bar */}
                <div className="flex items-center gap-3 text-xs text-stone-500 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-orange-500" />
                    {mealPlan.durationDays} days
                  </span>
                  <span className="w-1 h-1 bg-stone-300 rounded-full" />
                  <span className="flex items-center gap-1">
                    <Utensils className="w-3.5 h-3.5 text-orange-500" />
                    {MEAL_SCOPE_LABELS[mealPlan.mealScope]}
                  </span>
                  <span className="w-1 h-1 bg-stone-300 rounded-full" />
                  <span>{mealPlan.servings} serving{mealPlan.servings !== 1 ? "s" : ""}</span>
                </div>
              </div>

              {/* Shopping list for the week */}
              {mealPlan.weeklyShoppingList && mealPlan.weeklyShoppingList.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4 text-amber-700" />
                      <span className="text-sm font-bold text-amber-900">Weekly Shopping List</span>
                    </div>
                    <button
                      onClick={copyShoppingList}
                      className="flex items-center gap-1 text-xs font-semibold text-amber-800 hover:text-amber-900 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy list
                        </>
                      )}
                    </button>
                  </div>
                  <ul className="space-y-1">
                    {mealPlan.weeklyShoppingList.map((item, idx) => (
                      <li key={idx} className="text-xs text-amber-800 flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Day-by-day accordion */}
              <div className="space-y-3">
                {mealPlan.days.map((day) => (
                  <DayAccordion
                    key={day.dayNumber}
                    day={day}
                    isExpanded={expandedDays.has(day.dayNumber)}
                    onToggle={() => toggleDay(day.dayNumber)}
                    mealScope={mealPlan.mealScope}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DayAccordion({
  day,
  isExpanded,
  onToggle,
  mealScope,
}: {
  day: MealPlanDay;
  isExpanded: boolean;
  onToggle: () => void;
  mealScope: "main" | "full";
}) {
  return (
    <div className="rounded-2xl border border-stone-200 overflow-hidden">
      {/* Day header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3.5 bg-stone-50 hover:bg-stone-100 transition-colors cursor-pointer text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center">
            <span className="text-xs font-black text-orange-700">{day.dayNumber}</span>
          </div>
          <div>
            <p className="text-sm font-bold text-stone-900">{day.dayName}</p>
            {day.focusTheme && (
              <p className="text-xs text-stone-500">{day.focusTheme}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 text-xs text-stone-400">
            {mealScope === "full" && day.meals.breakfast && (
              <span className="flex items-center gap-1">
                <Coffee className="w-3 h-3" />
                B
              </span>
            )}
            <span className="flex items-center gap-1">
              <Sun className="w-3 h-3" />
              L
            </span>
            <span className="flex items-center gap-1">
              <Moon className="w-3 h-3" />
              D
            </span>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-stone-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-stone-500" />
          )}
        </div>
      </button>

      {/* Day content */}
      {isExpanded && (
        <div className="p-4 space-y-3 bg-white">
          {/* Chef tip */}
          {day.chefTip && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-orange-50 border border-orange-100">
              <Lightbulb className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
              <p className="text-xs text-orange-800">
                <span className="font-bold">Chef Tip: </span>
                {day.chefTip}
              </p>
            </div>
          )}

          {/* Meals */}
          <div className="space-y-2.5">
            {mealScope === "full" && day.meals.breakfast && (
              <MealCard
                meal={day.meals.breakfast}
                icon={<Coffee className="w-3.5 h-3.5 text-amber-600" />}
                accent="amber"
              />
            )}
            {day.meals.lunch && (
              <MealCard
                meal={day.meals.lunch}
                icon={<Sun className="w-3.5 h-3.5 text-orange-600" />}
                accent="orange"
              />
            )}
            {day.meals.dinner && (
              <MealCard
                meal={day.meals.dinner}
                icon={<Moon className="w-3.5 h-3.5 text-indigo-600" />}
                accent="indigo"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const ACCENT_STYLES: Record<string, { label: string; badge: string; step: string }> = {
  amber: {
    label: "bg-amber-100 text-amber-800",
    badge: "bg-amber-50 border-amber-100",
    step: "bg-amber-500",
  },
  orange: {
    label: "bg-orange-100 text-orange-800",
    badge: "bg-orange-50 border-orange-100",
    step: "bg-orange-500",
  },
  indigo: {
    label: "bg-indigo-100 text-indigo-800",
    badge: "bg-indigo-50 border-indigo-100",
    step: "bg-indigo-500",
  },
};

function MealCard({
  meal,
  icon,
  accent,
}: {
  meal: any;
  icon: React.ReactNode;
  accent: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const styles = ACCENT_STYLES[accent] || ACCENT_STYLES.orange;

  return (
    <div className={`rounded-xl border p-3.5 space-y-2 ${styles.badge}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${styles.label}`}>
            <span className="inline-flex items-center gap-1">
              {icon}
              {meal.mealType}
            </span>
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-stone-400">
          <Clock className="w-3 h-3" />
          {meal.totalTime}m
        </div>
      </div>

      <div>
        <p className="text-sm font-bold text-stone-900">{meal.title}</p>
        <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">{meal.description}</p>
      </div>

      {/* Key ingredients */}
      {meal.keyIngredients && meal.keyIngredients.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {meal.keyIngredients.map((ing: string, idx: number) => (
            <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-stone-200 text-stone-600">
              {ing}
            </span>
          ))}
        </div>
      )}

      {/* Quick instructions (toggle) */}
      {meal.quickInstructions && meal.quickInstructions.length > 0 && (
        <div>
          <button
            onClick={() => setExpanded((e) => !e)}
            className="text-[11px] font-semibold text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer"
          >
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {expanded ? "Hide steps" : "Show quick steps"}
          </button>

          {expanded && (
            <ol className="mt-2 space-y-1.5">
              {meal.quickInstructions.map((step: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span
                    className={`${styles.step} text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center shrink-0 mt-0.5`}
                  >
                    {idx + 1}
                  </span>
                  <p className="text-[11px] text-stone-700 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  );
}
