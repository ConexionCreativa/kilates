import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { CategoryStrip } from "@/components/site/CategoryStrip";
import { Catalog } from "@/components/site/Catalog";
import { Trust } from "@/components/site/Trust";
import { Story } from "@/components/site/Story";
import type { CategoryId } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kilates | Joyería fina en oro y plata — Catálogo con precios" },
      {
        name: "description",
        content:
          "Anillos, cadenas, brazaletes, zarcillos, dijes y relojes en oro 18k, 14k y plata 925. Precios visibles, envío asegurado y pedidos por WhatsApp.",
      },
      { property: "og:title", content: "Kilates | Joyería fina en oro y plata" },
      {
        property: "og:description",
        content:
          "Catálogo de alta joyería en Venezuela con precios claros y atención directa por WhatsApp.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [category, setCategory] = useState<CategoryId | "todos">("todos");
  const [query, setQuery] = useState("");

  function selectCategory(id: CategoryId) {
    setCategory(id);
    // Espera a que el catálogo filtrado se renderice y baja hasta los resultados
    setTimeout(() => {
      document
        .getElementById("catalogo-resultados")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  }

  return (
    <>
      <Hero />
      <CategoryStrip onSelect={selectCategory} />
      <Catalog
        category={category}
        query={query}
        onCategoryChange={setCategory}
        onQueryChange={setQuery}
      />
      <Trust />
      <Story />
    </>
  );
}
