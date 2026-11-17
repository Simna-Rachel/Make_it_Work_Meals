import { Recipe, GenerationFilters } from "@/types/recipe";

export function generateMockRecipes(filters: GenerationFilters): Recipe[] {
  const { ingredients, dietary, cuisine, maxCookingTime, servings, strictMode, specialNotes } = filters;

  const baseIngredients =
    ingredients.length > 0 ? ingredients : ["Rice", "Eggs", "Garlic", "Olive Oil"];
  const mainIng1 = baseIngredients[0] || "Seasonal Veggie";
  const mainIng2 = baseIngredients[1] || "Pantry Protein";
  const mainIng3 = baseIngredients[2] || "Aromatic Herbs";

  const maxTime = maxCookingTime || 30;
  const targetServings = servings && servings > 0 ? servings : 1;

  const missingStaples = strictMode
    ? []
    : ["1 tbsp olive oil", "pinch of sea salt", "fresh cracked black pepper"];

  // Randomized culinary spins to vary each generation
  const styles = [
    {
      titlePrefix: "Crispy Sizzled",
      technique: "High-heat searing in a hot skillet for golden caramelized edges",
      cuisineTag: cuisine && cuisine !== "Any" ? cuisine : "Bistro Fusion",
      prep: 8,
      cook: Math.min(12, maxTime - 8),
    },
    {
      titlePrefix: "Aromatic Simmered",
      technique: "Gentle braising in a reduced broth with fragrant spices",
      cuisineTag: cuisine && cuisine !== "Any" ? cuisine : "Mediterranean",
      prep: 10,
      cook: Math.min(18, maxTime - 10),
    },
    {
      titlePrefix: "Rustic Oven-Roasted",
      technique: "Tossed with aromatics and roasted to tender perfection",
      cuisineTag: cuisine && cuisine !== "Any" ? cuisine : "Contemporary Kitchen",
      prep: 10,
      cook: Math.min(20, maxTime - 10),
    },
  ];

  // Shuffle styles slightly for randomness
  const randomizedStyles = [...styles].sort(() => Math.random() - 0.5);

  return [
    {
      id: `mock-1-${Date.now()}`,
      title: `${randomizedStyles[0].titlePrefix} ${capitalize(mainIng1)} Medley`,
      description: `A fragrant, crispy skillet dish showcasing ${mainIng1} and ${mainIng2}. ${randomizedStyles[0].technique}. Comforting, quick, and full of natural umami.`,
      ingredients: [
        `2 cups ${mainIng1}, freshly chopped`,
        `1 cup ${mainIng2}, sliced`,
        mainIng3 ? `1/2 cup ${mainIng3}` : "2 cloves garlic, finely minced",
        "1 tbsp olive oil or cooking fat",
        "1/2 tsp kosher salt",
        "1/4 tsp cracked black pepper",
        "1 tbsp chopped fresh herbs for garnish",
      ],
      instructions: [
        `Prepare and slice the ${mainIng1} and ${mainIng2} into uniform bite-sized pieces for even cooking.`,
        "Heat a wide skillet or pan over medium-high heat with a drizzle of oil until shimmering.",
        `Add ${mainIng1} to the pan in a single layer. Let sear undisturbed for 3-4 minutes until golden crust develops.`,
        `Toss in ${mainIng2} and aromatics. Sauté for another 4-5 minutes until tender-crisp.`,
        "Season with salt and freshly ground pepper, tossing to coat evenly.",
        "Remove from heat, rest for 1 minute, and garnish with fresh herbs before serving warm.",
      ],
      prepTime: randomizedStyles[0].prep,
      cookTime: Math.max(5, randomizedStyles[0].cook),
      totalTime: randomizedStyles[0].prep + Math.max(5, randomizedStyles[0].cook),
      difficulty: "Easy",
      approximateCalories: 340,
      approximateProtein: "16g",
      servings: targetServings,
      dietaryTags: dietary.filter((d) => d !== "None"),
      cuisine: randomizedStyles[0].cuisineTag,
      missingIngredients: missingStaples.slice(0, 1),
    },
    {
      id: `mock-2-${Date.now()}`,
      title: `${randomizedStyles[1].titlePrefix} ${capitalize(mainIng2 || mainIng1)} Broth Bowl`,
      description: `An energized, wholesome bowl built around ${mainIng1} and warm aromatic spices. ${randomizedStyles[1].technique}. Perfect for a cozy meal.`,
      ingredients: [
        `1.5 cups ${mainIng1}, diced`,
        `1 cup ${mainIng2}, cooked or sautéed`,
        "2 cups cooked grain or warm broth base",
        "1 tbsp lemon juice or vinegar for brightness",
        "1 tbsp sesame or olive oil",
        "1/2 tsp smoked paprika or warm spices",
        "Toasted seeds or fresh greens to finish",
      ],
      instructions: [
        "Warm your broth or base gently in a saucepan with a tiny pinch of salt.",
        `In a separate hot skillet, sauté ${mainIng1} with oil over medium heat for 5-6 minutes until fragrant and softened.`,
        `Stir in ${mainIng2} along with the warm spices, cooking for 3 minutes to bloom the aromatics.`,
        "Deglaze the pan with a squeeze of fresh lemon juice or splash of vinegar to lift browned bits.",
        "Assemble warm bowls and ladle sizzling ingredients over the top.",
        "Drizzle remaining pan juices and finish with a sprinkle of toasted seeds.",
      ],
      prepTime: randomizedStyles[1].prep,
      cookTime: Math.max(8, randomizedStyles[1].cook),
      totalTime: randomizedStyles[1].prep + Math.max(8, randomizedStyles[1].cook),
      difficulty: "Medium",
      approximateCalories: 450,
      approximateProtein: "21g",
      servings: targetServings,
      dietaryTags: dietary.filter((d) => d !== "None"),
      cuisine: randomizedStyles[1].cuisineTag,
      missingIngredients: missingStaples.slice(1, 2),
    },
    {
      id: `mock-3-${Date.now()}`,
      title: `${randomizedStyles[2].titlePrefix} ${capitalize(mainIng1)} Savory Hash`,
      description: `A fast, satisfying preparation designed to caramelize fridge ingredients. ${randomizedStyles[2].technique}. Minimal cleanup, maximum flavor.`,
      ingredients: [
        `2 cups ${mainIng1}, finely diced`,
        `1 cup ${mainIng2}, chopped`,
        "1 small onion or shallot, diced",
        "1 clove garlic, minced",
        "1 tbsp butter or olive oil",
        "Sea salt and crushed red pepper to taste",
      ],
      instructions: [
        "Melt butter or oil in a heavy-bottomed skillet over medium heat.",
        "Sauté onions and garlic until translucent and sweet, approximately 3 minutes.",
        `Add diced ${mainIng1} and press down gently with spatula to maximize pan contact and caramelization.`,
        `Stir in ${mainIng2} and cook for another 5 minutes until tender and edges are crisp.`,
        "Season with salt and a pinch of chili pepper flakes.",
        "Divide into plates and enjoy immediately while piping hot!",
      ],
      prepTime: randomizedStyles[2].prep,
      cookTime: Math.max(5, randomizedStyles[2].cook),
      totalTime: randomizedStyles[2].prep + Math.max(5, randomizedStyles[2].cook),
      difficulty: "Easy",
      approximateCalories: 310,
      approximateProtein: "12g",
      servings: targetServings,
      dietaryTags: dietary.filter((d) => d !== "None"),
      cuisine: randomizedStyles[2].cuisineTag,
      missingIngredients: [],
    },
  ];
}

function capitalize(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
