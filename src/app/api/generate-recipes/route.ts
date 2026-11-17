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
