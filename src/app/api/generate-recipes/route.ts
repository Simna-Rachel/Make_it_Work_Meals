import { NextRequest, NextResponse } from "next/server";
import { fetchRecipesFromGemini } from "@/lib/gemini";
import { GenerationFilters } from "@/types/recipe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { filters }: { filters: GenerationFilters } = body;

    if (!filters || !Array.isArray(filters.ingredients) || filters.ingredients.length === 0) {
      return NextResponse.json(
        { error: "Invalid request. Please provide at least 1 ingredient in the filters." },
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

    // Call Gemini exclusively from the server
    const result = await fetchRecipesFromGemini(filters, serverSecretKey);

    // Guarantee each returned recipe has a strictly unique, non-index ID
    if (result && Array.isArray(result.recipes)) {
      result.recipes = result.recipes.map((r, i) => {
        const titleSlug = (r.title || `dish-${i + 1}`)
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
          .slice(0, 25);
        // If the ID is a legacy index-based ID or missing, generate a unique one
        const isLegacy = !r.id || /^(recipe-[1-9]\d*|mock-[1-9]\d*|\d+)$/i.test(r.id);
        return {
          ...r,
          id: isLegacy
            ? `rec_${titleSlug}_${Date.now()}_${i}_${Math.random().toString(36).substring(2, 7)}`
            : r.id,
        };
      });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Server-side recipe generation error:", error);
    return NextResponse.json(
      {
        error:
          error?.message ||
          "Failed to generate recipes with Gemini on the server. Please try again.",
      },
      { status: 500 }
    );
  }
}
