"use client";

import React, { useState, useEffect } from "react";
import { Recipe } from "@/types/recipe";
import {
  X,
  Heart,
  CheckCircle2,
  Copy,
  Printer,
  Sparkles,
  Users,
  AlertCircle,
  ChefHat,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useCooking } from "@/context/CookingContext";

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (recipe: Recipe) => void;
}

export function RecipeDetailModal({
  recipe,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
}: RecipeDetailModalProps) {
  const { session, startCooking } = useCooking();

  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);
  const [servings, setServings] = useState<number>(recipe?.servings || 2);
  const [startedCooking, setStartedCooking] = useState(false);

  useEffect(() => {
    if (recipe) {
      setServings(recipe.servings || 2);
      // If this recipe is already the active session, pull its progress
      if (session?.recipe.id === recipe.id) {
        setCheckedIngredients(session.checkedIngredients);
        setCompletedSteps(session.completedSteps);
        setStartedCooking(true);
      } else {
        setCheckedIngredients({});
        setCompletedSteps({});
        setStartedCooking(false);
      }
    }
  }, [recipe?.id]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !recipe) return null;

  const isActiveSession = session?.recipe.id === recipe.id;

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleStep = (idx: number) => {
    setCompletedSteps((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleFavorite = () => {
    if (!isFavorite) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#EA580C", "#F59E0B", "#10B981"],
      });
    }
    onToggleFavorite(recipe);
  };

  const handleCopy = () => {
    const text = `${recipe.title}\n\n${recipe.description}\n\nTime: Prep ${recipe.prepTime}m, Cook ${recipe.cookTime}m | Difficulty: ${recipe.difficulty} | Calories: ${recipe.approximateCalories} kcal | Protein: ${recipe.approximateProtein}\n\nINGREDIENTS:\n${recipe.ingredients
      .map((i) => `• ${i}`)
      .join("\n")}\n\nINSTRUCTIONS:\n${recipe.instructions
      .map((step, idx) => `${idx + 1}. ${step}`)
      .join("\n")}${
      recipe.missingIngredients?.length
        ? `\n\nSHOPPING LIST NEEDED:\n${recipe.missingIngredients.map((i) => `• ${i}`).join("\n")}`
        : ""
    }`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => window.print();

  const handleStartCooking = () => {
    startCooking(recipe);
    setStartedCooking(true);
    onClose(); // close modal; the CookingBar takes over
  };

  const scale = recipe.servings ? servings / recipe.servings : 1;
  const stepsCompleted = Object.values(completedSteps).filter(Boolean).length;

  return (
    <>
      {/* ======= PRINT-ONLY HIDDEN LAYOUT ======= */}
      <div className="print-only" style={{ display: "none" }}>
        <div style={{ fontFamily: "Georgia, serif", maxWidth: "700px", margin: "0 auto", padding: "20px 0" }}>
          <div style={{ borderBottom: "3px solid #EA580C", paddingBottom: "14px", marginBottom: "18px" }}>
            <h1 style={{ fontSize: "26pt", fontWeight: "800", color: "#1C1917", margin: "0 0 6px 0", lineHeight: 1.2 }}>
              {recipe.title}
            </h1>
            <p style={{ fontSize: "11pt", color: "#78716C", margin: "0", fontStyle: "italic" }}>
              {recipe.description}
            </p>
          </div>

          <div style={{ display: "flex", gap: "24px", marginBottom: "20px", flexWrap: "wrap" }}>
            {[
              { label: "Prep Time", value: `${recipe.prepTime} min` },
              { label: "Cook Time", value: `${recipe.cookTime} min` },
              { label: "Total Time", value: `${recipe.totalTime} min` },
              { label: "Difficulty", value: recipe.difficulty },
              { label: "Servings", value: String(recipe.servings || 2) },
              { label: "Calories", value: `${recipe.approximateCalories} kcal` },
              { label: "Protein", value: recipe.approximateProtein },
            ].map((m) => (
              <div key={m.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "8pt", fontWeight: "700", color: "#A16207", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  {m.label}
                </div>
                <div style={{ fontSize: "11pt", fontWeight: "700", color: "#1C1917" }}>{m.value}</div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: "24px" }}>
            <h2 style={{ fontSize: "15pt", fontWeight: "700", color: "#EA580C", borderBottom: "1px solid #FED7AA", paddingBottom: "6px", marginBottom: "12px" }}>
              Ingredients
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, columns: recipe.ingredients.length > 8 ? 2 : 1 }}>
              {recipe.ingredients.map((ing, idx) => (
                <li key={idx} style={{ fontSize: "10.5pt", color: "#292524", padding: "4px 0", display: "flex", alignItems: "flex-start", gap: "8px", breakInside: "avoid" }}>
                  <span style={{ color: "#EA580C", fontWeight: "700", flexShrink: 0 }}>•</span>
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>

          {recipe.missingIngredients && recipe.missingIngredients.length > 0 && (
            <div style={{ marginBottom: "20px", background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: "8px", padding: "12px 16px" }}>
              <strong style={{ fontSize: "10pt", color: "#92400E" }}>Extra Ingredients Needed:</strong>
              <span style={{ fontSize: "10pt", color: "#B45309" }}> {recipe.missingIngredients.join(", ")}</span>
            </div>
          )}

          <div>
            <h2 style={{ fontSize: "15pt", fontWeight: "700", color: "#EA580C", borderBottom: "1px solid #FED7AA", paddingBottom: "6px", marginBottom: "12px" }}>
              Step-by-Step Instructions
            </h2>
            <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {recipe.instructions.map((step, idx) => (
                <li key={idx} style={{ fontSize: "10.5pt", color: "#292524", padding: "9px 0", display: "flex", alignItems: "flex-start", gap: "12px", borderBottom: idx < recipe.instructions.length - 1 ? "1px solid #F5F5F4" : "none", breakInside: "avoid" }}>
                  <span style={{ background: "#EA580C", color: "#fff", borderRadius: "50%", width: "22px", height: "22px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "9pt", fontWeight: "800", flexShrink: 0 }}>
                    {idx + 1}
                  </span>
                  <span style={{ lineHeight: "1.6" }}>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div style={{ marginTop: "28px", paddingTop: "12px", borderTop: "1px solid #E7E5E4", textAlign: "center" }}>
            <p style={{ fontSize: "9pt", color: "#A8A29E", margin: 0 }}>
              Generated by Make It Work - Meals • Cooking Made Simple
            </p>
          </div>
        </div>
      </div>

      {/* ======= INTERACTIVE MODAL ======= */}
      <div className="recipe-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto backdrop-blur-md bg-stone-900/60 animate-in fade-in duration-200 print-hide">
        <div
          className="recipe-modal-container relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Header Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-sm border-b border-stone-100 print-hide">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800">
                {recipe.difficulty}
              </span>
              {recipe.cuisine && (
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600">
                  {recipe.cuisine}
                </span>
              )}
              {isActiveSession && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Cooking
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 print-hide">
              <button
                onClick={handleFavorite}
                className={`p-2 rounded-full border transition-colors cursor-pointer ${
                  isFavorite
                    ? "bg-rose-50 border-rose-200 text-rose-600"
                    : "bg-white border-stone-200 text-stone-500 hover:text-stone-800"
                }`}
                title={isFavorite ? "Remove favorite" : "Save to favorites"}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`} />
              </button>
              <button
                onClick={handleCopy}
                className="p-2 rounded-full bg-white border border-stone-200 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
                title="Copy recipe text"
              >
                <Copy className="w-5 h-5" />
              </button>
              <button
                onClick={handlePrint}
                className="p-2 rounded-full bg-white border border-stone-200 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
                title="Print recipe"
              >
                <Printer className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer ml-1"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="recipe-modal-scroll p-6 overflow-y-auto space-y-6">
            {/* Copied Banner */}
            {copied && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Recipe copied to clipboard!</span>
              </div>
            )}

            {/* Title & Description */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight leading-tight">
                {recipe.title}
              </h2>
              <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
                {recipe.description}
              </p>
            </div>

            {/* Metrics summary banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60">
              <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/80 shadow-2xs">
                <span className="text-[10px] text-stone-600 uppercase font-semibold">Prep</span>
                <span className="font-bold text-stone-800 text-sm">{recipe.prepTime} mins</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/80 shadow-2xs">
                <span className="text-[10px] text-stone-600 uppercase font-semibold">Cook</span>
                <span className="font-bold text-stone-800 text-sm">{recipe.cookTime} mins</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/80 shadow-2xs">
                <span className="text-[10px] text-stone-600 uppercase font-semibold">Calories</span>
                <span className="font-bold text-amber-700 text-sm">{recipe.approximateCalories} kcal</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/80 shadow-2xs">
                <span className="text-[10px] text-stone-600 uppercase font-semibold">Protein</span>
                <span className="font-bold text-emerald-700 text-sm">{recipe.approximateProtein}</span>
              </div>
            </div>

            {/* ── Start Cooking CTA ── */}
            {!isActiveSession ? (
              <button
                onClick={handleStartCooking}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-base flex items-center justify-center gap-3 shadow-lg shadow-orange-500/20 transition-all active:scale-[0.99] cursor-pointer"
              >
                <ChefHat className="w-5 h-5 text-orange-200" />
                Start Cooking — Timer Runs in Background
                <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
              </button>
            ) : (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <p className="text-xs font-bold text-emerald-800">
                  Cooking session active! Timer &amp; progress are saved in the bar below — even if you close this window.
                </p>
              </div>
            )}

            {/* Missing Ingredients Warning if any */}
            {recipe.missingIngredients && recipe.missingIngredients.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-amber-900">Additional Staples Suggested:</p>
                    <p className="text-xs text-amber-800 mt-0.5">
                      This recipe also uses: {recipe.missingIngredients.join(", ")}.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Ingredients Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <span>Ingredients</span>
                  <span className="text-xs font-normal text-stone-600">
                    ({Object.values(checkedIngredients).filter(Boolean).length}/{recipe.ingredients.length} ready)
                  </span>
                </h3>
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-600">
                  <Users className="w-3.5 h-3.5 text-stone-600" />
                  <button
                    onClick={() => setServings((s) => Math.max(1, s - 1))}
                    className="w-5 h-5 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span>{servings} servings</span>
                  <button
                    onClick={() => setServings((s) => Math.min(10, s + 1))}
                    className="w-5 h-5 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {recipe.ingredients.map((ing, idx) => {
                  const isChecked = checkedIngredients[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleIngredient(idx)}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                        isChecked
                          ? "bg-stone-50 border-stone-200 text-stone-600 line-through"
                          : "bg-white border-stone-200/90 text-stone-800 hover:border-orange-200 hover:bg-orange-50/30"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={!!isChecked}
                        onChange={() => toggleIngredient(idx)}
                        className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500 border-stone-300"
                      />
                      <span className="text-xs sm:text-sm font-medium">
                        {scale !== 1 ? `${ing} (scaled for ${servings})` : ing}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Instructions Section */}
            <div className="space-y-3">
              <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                Step-by-Step Instructions
                {stepsCompleted > 0 && (
                  <span className="text-xs font-normal text-stone-500">
                    ({stepsCompleted}/{recipe.instructions.length} done)
                  </span>
                )}
              </h3>

              <div className="space-y-3">
                {recipe.instructions.map((step, idx) => {
                  const isDone = completedSteps[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleStep(idx)}
                      className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                        isDone
                          ? "bg-emerald-50/50 border-emerald-200 text-stone-600"
                          : "bg-white border-stone-200/90 hover:border-stone-300"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                          isDone ? "bg-emerald-600 text-white" : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>
                      <p
                        className={`text-xs sm:text-sm leading-relaxed ${
                          isDone ? "line-through text-stone-600" : "text-stone-800 font-medium"
                        }`}
                      >
                        {step}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Modal Bottom Actions */}
          <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between print-hide">
            <button
              onClick={handleFavorite}
              className="flex items-center gap-2 text-xs sm:text-sm font-bold text-rose-600 hover:text-rose-700 cursor-pointer"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-rose-500" : ""}`} />
              <span>{isFavorite ? "Saved in Favorites" : "Save to Favorites"}</span>
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm cursor-pointer transition-colors shadow-xs"
            >
              {isActiveSession ? "Minimize — Keep Cooking" : "Close"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
