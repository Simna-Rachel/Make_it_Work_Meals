import { NextRequest, NextResponse } from "next/server";
import { fetchMealPlanFromGemini } from "@/lib/geminiMealPlan";
import { MealPlanFilters } from "@/types/mealPlan";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { filters }: { filters: MealPlanFilters } = body;

    if (!filters || !Array.isArray(filters.ingredients) || filters.ingredients.length === 0) {
      return NextResponse.json(
        { error: "Invalid request. Please provide at least 1 ingredient for your meal plan." },
        { status: 400 }
      );
    }

    const serverSecretKey = process.env.GEMINI_API_KEY || "";
    if (!serverSecretKey) {
      return NextResponse.json(
        {
          error:
            "GEMINI_API_KEY is not configured on the server. Please set GEMINI_API_KEY in .env.local.",
        },
        { status: 500 }
      );
    }

    const result = await fetchMealPlanFromGemini(filters, serverSecretKey);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Server-side meal plan generation error:", error);
    return NextResponse.json(
      {
        error:
          error?.message ||
          "Failed to generate weekly meal plan with Gemini on the server. Please try again.",
      },
      { status: 500 }
    );
  }
}
