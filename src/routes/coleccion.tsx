import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Catalog } from "@/components/site/Catalog";
import { Trust } from "@/components/site/Trust";
import type { CategoryId } from "@/data/products";

type ColeccionSearch = {
  q?: string | undefined;
  cat?: CategoryId | "todos" | undefined;
};

export const Route = createFileRoute("/coleccion")({
  validateSearch: (search: Record<string, unknown>): ColeccionSearch => ({
    q: typeof search["q"] === "string" && search["q"] ? search["q"] : undefined,
    cat:
      typeof search["cat"] === "string"
        ? (search["cat"] as CategoryId)
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Colección completa | Kilates joyería" },
      {
        name: "description",
        content:
          "Explore todas las piezas de Kilates: filtre por categoría, material y precio, y arme su pedido para enviarlo por WhatsApp.",
      },
      { property: "og:title", content: "Colección completa | Kilates joyería" },
      {
        property: "og:description",
        content:
          "Anillos, cadenas, brazaletes, zarcillos, dijes y relojes en oro y plata con precios en USD.",
      },
    ],
  }),
  component: Coleccion,
});

function Coleccion() {
  const { q, cat } = Route.useSearch();
  const navigate = useNavigate({ from: "/coleccion" });

  return (
    <>
      <div className="border-b border-border bg-onyx py-14 text-center">
        <p className="eyebrow">Catálogo completo</p>
        <h1 className="mt-3 font-display text-5xl font-light">La colección</h1>
        <p className="mx-auto mt-4 max-w-xl px-4 text-sm text-muted-foreground">
          Todas nuestras piezas disponibles, con material, peso y precio a la
          vista. Agregue lo que le interese y envíenos el pedido.
        </p>
      </div>

      <Catalog
        category={cat ?? "todos"}
        query={q ?? ""}
        onCategoryChange={(next) =>
          navigate({
            search: (prev) => ({ ...prev, cat: next === "todos" ? undefined : next }),
            replace: true,
          })
        }
        onQueryChange={(next) =>
          navigate({
            search: (prev) => ({ ...prev, q: next || undefined }),
            replace: true,
          })
        }
      />

      <Trust />
    </>
  );
}
