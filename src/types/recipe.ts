export type DietaryPreference =
  | "Vegetarian"
  | "Vegan"
  | "Gluten-free"
  | "Dairy-free"
  | "Keto"
  | "None";

export type CuisineType =
  | "Any"
  | "Italian"
  | "Indian"
  | "Chinese"
  | "Mexican"
  | "Mediterranean"
  | "Thai"
  | "American"
  | "Japanese"
  | "French"
  | "Middle Eastern";

export type CookingTimeOption = 15 | 30 | 45 | 60;

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[]; // with quantities (e.g. "2 cloves garlic, minced")
  instructions: string[]; // numbered steps
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  totalTime: number; // in minutes
  difficulty: "Easy" | "Medium" | "Hard";
  approximateCalories: number; // per serving
  approximateProtein: string; // e.g. "24g"
  servings: number;
  dietaryTags?: string[];
  cuisine?: string;
  missingIngredients: string[]; // empty if strict or none
  createdAt?: string;
}

export interface GenerationFilters {
  ingredients: string[];
  dietary: DietaryPreference[];
  cuisine?: CuisineType | "" | "Any";
  maxCookingTime?: CookingTimeOption | null;
  servings?: number;
  strictMode: boolean; // true: only use listed; false: allow 1-2 common staples
  specialNotes?: string; // Optional user notes / instructions (e.g. kid-friendly, less oil, etc.)
}
