"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from "react";
import { Recipe } from "@/types/recipe";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CookingSession {
  recipe: Recipe;
  timerSeconds: number;
  timerInitial: number;
  isTimerRunning: boolean;
  completedSteps: Record<number, boolean>;
  checkedIngredients: Record<number, boolean>;
  startedAt: number; // Date.now()
}

interface CookingContextValue {
  session: CookingSession | null;
  startCooking: (recipe: Recipe) => void;
  clearSession: () => void;
  setTimerRunning: (running: boolean) => void;
  resetTimer: () => void;
  toggleStep: (idx: number) => void;
  toggleIngredient: (idx: number) => void;
  adjustTimer: (deltaSeconds: number) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const CookingContext = createContext<CookingContextValue | null>(null);

const defaultCookingContextValue: CookingContextValue = {
  session: null,
  startCooking: () => {},
  clearSession: () => {},
  setTimerRunning: () => {},
  resetTimer: () => {},
  toggleStep: () => {},
  toggleIngredient: () => {},
  adjustTimer: () => {},
};

export function useCooking() {
  const ctx = useContext(CookingContext);
  if (!ctx) {
    if (typeof window !== "undefined") {
      console.warn("useCooking must be used inside CookingProvider");
    }
    return defaultCookingContextValue;
  }
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CookingProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<CookingSession | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Tick the timer every second when running
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (session?.isTimerRunning && session.timerSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setSession((prev) => {
          if (!prev) return prev;
          if (prev.timerSeconds <= 1) {
            playAlarm();
            return { ...prev, timerSeconds: 0, isTimerRunning: false };
          }
          return { ...prev, timerSeconds: prev.timerSeconds - 1 };
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  // Only re-run when isTimerRunning flips — the functional setSession handles per-second decrements
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.isTimerRunning]);

  const startCooking = useCallback((recipe: Recipe) => {
    const initial = (recipe.cookTime || 15) * 60;
    setSession({
      recipe,
      timerSeconds: initial,
      timerInitial: initial,
      isTimerRunning: false,
      completedSteps: {},
      checkedIngredients: {},
      startedAt: Date.now(),
    });
  }, []);

  const clearSession = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setSession(null);
  }, []);

  const setTimerRunning = useCallback((running: boolean) => {
    setSession((prev) => (prev ? { ...prev, isTimerRunning: running } : prev));
  }, []);

  const resetTimer = useCallback(() => {
    setSession((prev) =>
      prev ? { ...prev, timerSeconds: prev.timerInitial, isTimerRunning: false } : prev
    );
  }, []);

  const adjustTimer = useCallback((deltaSeconds: number) => {
    setSession((prev) =>
      prev
        ? { ...prev, timerSeconds: Math.max(0, Math.min(prev.timerInitial * 2, prev.timerSeconds + deltaSeconds)) }
        : prev
    );
  }, []);

  const toggleStep = useCallback((idx: number) => {
    setSession((prev) =>
      prev
        ? {
            ...prev,
            completedSteps: {
              ...prev.completedSteps,
              [idx]: !prev.completedSteps[idx],
            },
          }
        : prev
    );
  }, []);

  const toggleIngredient = useCallback((idx: number) => {
    setSession((prev) =>
      prev
        ? {
            ...prev,
            checkedIngredients: {
              ...prev.checkedIngredients,
              [idx]: !prev.checkedIngredients[idx],
            },
          }
        : prev
    );
  }, []);

  return (
    <CookingContext.Provider
      value={{
        session,
        startCooking,
        clearSession,
        setTimerRunning,
        resetTimer,
        toggleStep,
        toggleIngredient,
        adjustTimer,
      }}
    >
      {children}
    </CookingContext.Provider>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function playAlarm() {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    for (let i = 0; i < 3; i++) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + i * 0.25);
      gain.gain.setValueAtTime(0.25, audioCtx.currentTime + i * 0.25);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + i * 0.25 + 0.2);
      osc.start(audioCtx.currentTime + i * 0.25);
      osc.stop(audioCtx.currentTime + i * 0.25 + 0.22);
    }
  } catch {
    // Audio not permitted
  }
}

export function formatTimer(totalSec: number) {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}
