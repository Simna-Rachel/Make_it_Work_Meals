import { DietaryPreference, CuisineType } from "./recipe";

export interface MealPlanItem {
  mealType: "Breakfast" | "Lunch" | "Dinner";
  title: string;
  prepTime: number; // minutes
  cookTime: number; // minutes
  totalTime: number; // minutes
  description: string;
  keyIngredients: string[];
  quickInstructions: string[];
}

export interface MealPlanDay {
  dayNumber: number; // 1 to 5 or 7
  dayName: string; // e.g. "Day 1 (Monday)"
  focusTheme?: string; // e.g. "High-Heat Sizzle & Crisp"
  chefTip?: string; // e.g. "Batch cook extra grains for tomorrow's dinner"
  meals: {
    breakfast?: MealPlanItem;
    lunch: MealPlanItem;
    dinner: MealPlanItem;
  };
}

export interface WeeklyMealPlan {
  id: string;
  title: string;
  summary: string;
  durationDays: 5 | 7;
  mealScope: "main" | "full"; // "main" = Lunch & Dinner, "full" = Breakfast, Lunch, Dinner
  servings: number;
  days: MealPlanDay[];
  weeklyShoppingList: string[]; // Missing staples and groceries needed for the week
  pantryItemsUsed: string[];
  createdAt: string;
}

export interface MealPlanFilters {
  ingredients: string[];
  dietary: DietaryPreference[];
  cuisine?: CuisineType | "" | "Any";
  durationDays: 5 | 7;
  mealScope: "main" | "full";
  servings: number;
  strictMode: boolean;
  specialNotes?: string;
}
