import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal } from "lucide-react";
import {
  CATEGORIES,
  MATERIALS,
  PRODUCTS,
  type CategoryId,
  type Material,
  type Product,
} from "@/data/products";
import { useCurrency } from "@/lib/currency";
import { ProductCard } from "./ProductCard";
import { ProductDialog } from "./ProductDialog";

type Sort = "destacado" | "precio-asc" | "precio-desc";

export function Catalog({
  category,
  query,
  onCategoryChange,
  onQueryChange,
}: {
  category: CategoryId | "todos";
  query: string;
  onCategoryChange: (category: CategoryId | "todos") => void;
  onQueryChange: (query: string) => void;
}) {
  const { currency } = useCurrency();
  const [material, setMaterial] = useState<Material | "todos">("todos");
  const [sort, setSort] = useState<Sort>("destacado");
  const [detail, setDetail] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = PRODUCTS.filter((p) => {
      if (category !== "todos" && p.category !== category) return false;
      if (material !== "todos" && p.material !== material) return false;
      if (
        q &&
        !`${p.name} ${p.material} ${p.detail}`.toLowerCase().includes(q)
      )
        return false;
      return true;
    });

    if (sort === "precio-asc") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "precio-desc") return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, material, query, sort]);

  const groups = useMemo(
    () =>
      CATEGORIES.map((c) => ({
        ...c,
        items: filtered.filter((p) => p.category === c.id),
      })).filter((g) => g.items.length > 0),
    [filtered],
  );

  return (
    <section id="catalogo" className="mx-auto max-w-7xl px-4 py-20">
      <div className="text-center">
        <p className="eyebrow">El catálogo</p>
        <h2 className="mt-3 font-display text-4xl font-light md:text-5xl">
          Nuestra colección
        </h2>
        <div className="gold-rule mx-auto mt-5 w-40" />
      </div>

      {/* Filtros */}
      <div className="mt-10 space-y-5">
        <div className="flex flex-wrap justify-center gap-2">
          <FilterPill
            active={category === "todos"}
            onClick={() => onCategoryChange("todos")}
          >
            Todos
          </FilterPill>
          {CATEGORIES.map((c) => (
            <FilterPill
              key={c.id}
              active={category === c.id}
              onClick={() => onCategoryChange(c.id)}
            >
              {c.label}
            </FilterPill>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center">
          <label className="flex w-full max-w-sm items-center gap-2 border border-border px-3 py-2">
            <Search className="size-4 text-gold" />
            <input
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Buscar por nombre o material…"
              aria-label="Buscar en el catálogo"
              className="w-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
            />
          </label>

          <label className="flex items-center gap-2 border border-border px-3 py-2 text-sm">
            <SlidersHorizontal className="size-4 text-gold" />
            <span className="sr-only">Material</span>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value as Material | "todos")}
              className="bg-transparent text-sm focus:outline-none"
            >
              <option value="todos">Todos los materiales</option>
              {MATERIALS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2 border border-border px-3 py-2 text-sm">
            <span className="sr-only">Orden</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="bg-transparent text-sm focus:outline-none"
            >
              <option value="destacado">Orden sugerido</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
            </select>
          </label>
        </div>

        <p className="text-center text-xs tracking-[0.2em] text-muted-foreground uppercase">
          {filtered.length} piezas disponibles · precios en {currency === "USD" ? "USD" : "bolívares"}
        </p>
      </div>

      {/* Resultados */}
      {groups.length === 0 ? (
        <p className="py-20 text-center text-muted-foreground">
          No encontramos piezas con esos criterios. Pruebe otra búsqueda.
        </p>
      ) : (
        <div className="mt-14 space-y-16">
          {groups.map((group) => (
            <div key={group.id}>
              <div className="flex items-baseline gap-4">
                <h3 className="font-display text-3xl font-light">
                  {group.label}
                  <span className="ml-2 text-lg text-muted-foreground">
                    ({group.items.length})
                  </span>
                </h3>
                <div className="gold-rule flex-1" />
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.items.map((p) => (
                  <ProductCard key={p.id} product={p} onOpen={setDetail} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <ProductDialog
        product={detail}
        onOpenChange={(open) => !open && setDetail(null)}
      />
    </section>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-5 py-2 text-[11px] tracking-[0.2em] uppercase transition-colors ${
        active
          ? "border-gold bg-gold text-primary-foreground"
          : "border-border text-muted-foreground hover:border-gold hover:text-gold"
      }`}
    >
      {children}
    </button>
  );
}
