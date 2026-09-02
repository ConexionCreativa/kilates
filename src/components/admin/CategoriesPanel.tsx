import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Field, GhostButton, ImageInput, PrimaryButton, inputClass } from "./ui";
import type { Category } from "@/lib/catalog";

export function CategoriesPanel({
  categories,
  onRefresh,
}: {
  categories: Category[];
  onRefresh: () => Promise<void> | void;
}) {
  const [draft, setDraft] = useState<(Category & { isNew: boolean }) | null>(null);
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!draft) return;
    const id = draft.id.trim().toLowerCase().replace(/\s+/g, "-");
    if (!id || !draft.label.trim()) {
      toast.error("Identificador y nombre son obligatorios");
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("categories").upsert({
      id,
      label: draft.label.trim(),
      blurb: draft.blurb,
      image: draft.image,
    });
    setSaving(false);
    if (error) {
      toast.error("No se pudo guardar la colección");
      return;
    }
    toast.success("Colección guardada");
    setDraft(null);
    await onRefresh();
  }

  async function remove(id: string) {
    if (!window.confirm("¿Eliminar esta colección?")) return;
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) {
      toast.error("No se pudo eliminar (puede tener productos asociados)");
      return;
    }
    await onRefresh();
  }

  return (
    <div>
      <div className="flex justify-end">
        <PrimaryButton
          onClick={() =>
            setDraft({ id: "", label: "", blurb: "", image: "", isNew: true })
          }
        >
          Nueva colección
        </PrimaryButton>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div key={c.id} className="border border-border p-3">
            <img
              src={c.image}
              alt={c.label}
              className="aspect-square w-full border border-border object-cover"
            />
            <p className="mt-3 font-display text-lg">{c.label}</p>
            <p className="text-xs text-muted-foreground">{c.blurb}</p>
            <p className="mt-1 text-[10px] text-muted-foreground">/{c.id}</p>
            <div className="mt-3 flex gap-2">
              <GhostButton onClick={() => setDraft({ ...c, isNew: false })}>
                Editar
              </GhostButton>
              <GhostButton onClick={() => void remove(c.id)}>Eliminar</GhostButton>
            </div>
          </div>
        ))}
      </div>

      {draft && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4">
          <div className="w-full max-w-lg border border-border bg-card p-6">
            <h2 className="font-display text-2xl font-light">Colección</h2>
            <div className="mt-6 space-y-4">
              <Field label="Identificador (URL)">
                <input
                  value={draft.id}
                  disabled={!draft.isNew}
                  onChange={(e) => setDraft({ ...draft, id: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="Nombre">
                <input
                  value={draft.label}
                  onChange={(e) => setDraft({ ...draft, label: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="Descripción corta">
                <input
                  value={draft.blurb}
                  onChange={(e) => setDraft({ ...draft, blurb: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="Imagen">
                <ImageInput
                  value={draft.image}
                  onChange={(url) => setDraft({ ...draft, image: url })}
                />
              </Field>
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
