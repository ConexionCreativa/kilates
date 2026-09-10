import { useMemo, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Field, GhostButton, ImageInput, PrimaryButton, inputClass } from "./ui";
import type { Category, Product, SiteSettings } from "@/lib/catalog";

const PAGE_SIZE = 20;

type Draft = Product & { sortOrder?: number };

export type Metal = "Oro" | "Plata";

/** Los productos guardan el material como texto libre; aquí se reduce a Oro o Plata. */
function metalOf(material: string): Metal {
  return material.toLowerCase().includes("plata") ? "Plata" : "Oro";
}

function ratePerGram(metal: Metal, settings: SiteSettings) {
  return metal === "Plata" ? settings.silverRate : settings.goldRate;
}

function emptyDraft(categoryId: string): Draft {
  return {
    id: crypto.randomUUID(),
    name: "",
    category: categoryId,
    material: "Oro",
    weight: 0,
    detail: "",
    description: "",
    price: 0,
    image: "",
    inStock: true,
    isNew: false,
    priceManual: false,
  };
}

export function ProductsPanel({
  products,
  categories,
  settings,
  onRefresh,
}: {
  products: Product[];
  categories: Category[];
  settings: SiteSettings;
  onRefresh: () => Promise<void> | void;
}) {
  const rate = settings.usdRate;
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("todos");
  const [page, setPage] = useState(1);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [manualPrice, setManualPrice] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) =>
        (cat === "todos" || p.category === cat) &&
        (!q || p.name.toLowerCase().includes(q)),
    );
  }, [products, query, cat]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pageCount);
  const items = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  async function save() {
    if (!draft) return;
    if (!draft.name.trim()) {
      toast.error("El nombre es obligatorio");
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("products").upsert({
      id: draft.id,
      name: draft.name.trim(),
      category: draft.category,
      material: metalOf(draft.material),
      weight: draft.weight,
      detail: draft.detail,
      description: draft.description,
      price: draft.price,
      image: draft.image,
      in_stock: draft.inStock,
      is_new: draft.isNew ?? false,
      price_manual: manualPrice,
    });
    setSaving(false);
    if (error) {
      toast.error("No se pudo guardar el producto");
      return;
    }
    toast.success("Producto guardado");
    setDraft(null);
    await onRefresh();
  }

  async function remove(id: string) {
    if (!window.confirm("¿Eliminar este producto?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      toast.error("No se pudo eliminar");
      return;
    }
    toast.success("Producto eliminado");
    await onRefresh();
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          placeholder="Buscar producto…"
          className={`${inputClass} max-w-xs`}
        />
        <select
          value={cat}
          onChange={(e) => {
            setCat(e.target.value);
            setPage(1);
          }}
          className={`${inputClass} max-w-[200px]`}
        >
          <option value="todos">Todas las categorías</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
        <span className="text-xs text-muted-foreground">
          {filtered.length} productos
        </span>
        <PrimaryButton
          className="ml-auto"
          onClick={() => {
            setManualPrice(false);
            setDraft(emptyDraft(categories[0]?.id ?? "anillos"));
          }}
        >
          Nuevo producto
        </PrimaryButton>
      </div>

      <div className="mt-6 divide-y divide-border border border-border">
        {items.map((p) => {
          const expanded = expandedId === p.id;
          const metal = metalOf(p.material);
          return (
            <div key={p.id} className="divide-y divide-border">
              <div
                onClick={() => setExpandedId(expanded ? null : p.id)}
                className="flex cursor-pointer items-center gap-4 p-3 transition-colors hover:bg-muted/30"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="size-14 shrink-0 border border-border object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">{p.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.category} · US$ {p.price.toFixed(2)} · Bs{" "}
                    {Math.round(p.price * rate).toLocaleString("es-VE")}
                    {!p.inStock && " · agotado"}
                  </p>
                </div>
                <GhostButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setManualPrice(p.priceManual ?? false);
                    setDraft({
                      ...p,
                      price: (p.priceManual ?? false)
                        ? p.price
                        : p.weight * ratePerGram(metal, settings),
                    });
                  }}
                >
                  Editar
                </GhostButton>
                <GhostButton
                  onClick={(e) => {
                    e.stopPropagation();
                    void remove(p.id);
                  }}
                >
                  Eliminar
                </GhostButton>
              </div>

              {expanded && (
                <div className="grid gap-4 bg-muted/10 p-4 sm:grid-cols-[160px_1fr]">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="aspect-square w-full border border-border object-cover"
                  />
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-muted-foreground">Material:</span>{" "}
                      {metal}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Peso:</span>{" "}
                      {p.weight} g
                    </p>
                    <p>
                      <span className="text-muted-foreground">Precio USD:</span>{" "}
                      US$ {p.price.toFixed(2)}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Precio Bs:</span>{" "}
                      Bs {Math.round(p.price * rate).toLocaleString("es-VE")}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Disponible:</span>{" "}
                      {p.inStock ? "Sí" : "No"}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Novedad:</span>{" "}
                      {p.isNew ? "Sí" : "No"}
                    </p>
                    {p.detail && (
                      <p>
                        <span className="text-muted-foreground">Detalle:</span>{" "}
                        {p.detail}
                      </p>
                    )}
                    {p.description && (
                      <p className="text-muted-foreground">{p.description}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {items.length === 0 && (
          <p className="p-6 text-center text-sm text-muted-foreground">
            Sin resultados.
          </p>
        )}
      </div>

      {pageCount > 1 && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <GhostButton
            disabled={current === 1}
            onClick={() => setPage(current - 1)}
          >
            Anterior
          </GhostButton>
          <span className="text-xs text-muted-foreground">
            {current} / {pageCount}
          </span>
          <GhostButton
            disabled={current === pageCount}
            onClick={() => setPage(current + 1)}
          >
            Siguiente
          </GhostButton>
        </div>
      )}

      {draft && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-border bg-card p-6">
            <h2 className="font-display text-2xl font-light">Producto</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Field label="Nombre">
                <input
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="Categoría">
                <select
                  value={draft.category}
                  onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                  className={inputClass}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Material">
                <select
                  value={metalOf(draft.material)}
                  onChange={(e) => {
                    const metal = e.target.value as Metal;
                    setDraft({
                      ...draft,
                      material: metal,
                      price: manualPrice
                        ? draft.price
                        : draft.weight * ratePerGram(metal, settings),
                    });
                  }}
                  className={inputClass}
                >
                  <option value="Oro">Oro</option>
                  <option value="Plata">Plata</option>
                </select>
              </Field>
              <Field label="Peso (g)">
                <input
                  type="number"
                  step="0.01"
                  value={draft.weight}
                  onChange={(e) => {
                    const weight = Number(e.target.value);
                    setDraft({
                      ...draft,
                      weight,
                      price: manualPrice
                        ? draft.price
                        : weight * ratePerGram(metalOf(draft.material), settings),
                    });
                  }}
                  className={inputClass}
                />
              </Field>
              <Field label="Precio USD">
                <input
                  type="number"
                  step="0.01"
                  readOnly={!manualPrice}
                  value={Number(draft.price.toFixed(2))}
                  onChange={(e) =>
                    setDraft({ ...draft, price: Number(e.target.value) })
                  }
                  className={`${inputClass} ${manualPrice ? "" : "opacity-70"}`}
                />
              </Field>
              <Field label="Precio en bolívares">
                <input
                  type="number"
                  step="1"
                  readOnly
                  value={Math.round(draft.price * rate)}
                  className={`${inputClass} opacity-70`}
                />
              </Field>
              <div className="md:col-span-2 -mt-2 text-xs text-muted-foreground">
                {metalOf(draft.material)} · {draft.weight || 0} g ×{" "}
                US$ {ratePerGram(metalOf(draft.material), settings).toFixed(2)} por
                gramo · tasa Bs {rate.toLocaleString("es-VE")} por US$
                <label className="mt-2 flex items-center gap-2 uppercase">
                  <input
                    type="checkbox"
                    checked={manualPrice}
                    onChange={(e) => {
                      setManualPrice(e.target.checked);
                      if (!e.target.checked) {
                        setDraft({
                          ...draft,
                          price:
                            draft.weight *
                            ratePerGram(metalOf(draft.material), settings),
                        });
                      }
                    }}
                  />
                  Fijar precio manualmente
                </label>
              </div>
              <Field label="Detalle corto">
                <input
                  value={draft.detail}
                  onChange={(e) => setDraft({ ...draft, detail: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <div className="flex items-end gap-6">
                <label className="flex items-center gap-2 text-xs text-muted-foreground uppercase">
                  <input
                    type="checkbox"
                    checked={draft.inStock}
                    onChange={(e) =>
                      setDraft({ ...draft, inStock: e.target.checked })
                    }
                  />
                  Disponible
                </label>
                <label className="flex items-center gap-2 text-xs text-muted-foreground uppercase">
                  <input
                    type="checkbox"
                    checked={draft.isNew ?? false}
                    onChange={(e) => setDraft({ ...draft, isNew: e.target.checked })}
                  />
                  Novedad
                </label>
              </div>
              <div className="md:col-span-2">
                <Field label="Descripción">
                  <textarea
                    rows={3}
                    value={draft.description}
                    onChange={(e) =>
                      setDraft({ ...draft, description: e.target.value })
                    }
                    className={inputClass}
                  />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field label="Imagen">
                  <ImageInput
                    value={draft.image}
                    onChange={(url) => setDraft({ ...draft, image: url })}
                  />
                </Field>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <GhostButton onClick={() => setDraft(null)}>Cancelar</GhostButton>
              <PrimaryButton disabled={saving} onClick={() => void save()}>
                {saving ? "Guardando…" : "Guardar"}
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
