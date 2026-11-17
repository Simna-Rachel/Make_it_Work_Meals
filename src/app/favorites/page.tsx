"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import { FavoritesView } from "@/components/favorites/FavoritesView";
import { useFavorites } from "@/hooks/useFavorites";

export default function FavoritesPage() {
  const router = useRouter();
  const { favorites, toggleFavorite, removeFavorite, clearAllFavorites } = useFavorites();

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F2]">
      <Navbar
        currentView="favorites"
        onNavigate={(view) => {
          if (view === "intro") router.push("/?view=intro");
          else router.push("/");
        }}
        favoritesCount={favorites.length}
      />

      <main className="flex-1">
        <FavoritesView
          favorites={favorites}
          onRemoveFavorite={removeFavorite}
          onToggleFavorite={toggleFavorite}
          onBackToApp={() => router.push("/")}
          onClearAll={clearAllFavorites}
        />
      </main>
    </div>
  );
}
