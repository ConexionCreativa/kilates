import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Field, PrimaryButton, inputClass } from "./ui";
import type { SiteSettings } from "@/lib/catalog";

export function SettingsPanel({
  settings,
  onRefresh,
}: {
  settings: SiteSettings;
  onRefresh: () => Promise<void> | void;
}) {
  const [form, setForm] = useState<SiteSettings>(settings);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    const { error } = await supabase.from("site_settings").upsert({
      id: 1,
      name: form.name,
      tagline: form.tagline,
      whatsapp: form.whatsapp.replace(/\D/g, ""),
      whatsapp_display: form.whatsappDisplay,
      phone: form.phone,
      address: form.address,
      hours: form.hours,
      instagram: form.instagram,
      usd_rate: form.usdRate,
    });
    setSaving(false);
    if (error) {
      toast.error("No se pudo guardar la configuración");
      return;
    }
    toast.success("Datos actualizados");
    await onRefresh();
  }

  const set = (patch: Partial<SiteSettings>) => setForm({ ...form, ...patch });

  return (
    <div className="max-w-2xl space-y-4">
      <Field label="Nombre de la tienda">
        <input
          value={form.name}
          onChange={(e) => set({ name: e.target.value })}
          className={inputClass}
        />
      </Field>
      <Field label="Lema">
        <input
          value={form.tagline}
          onChange={(e) => set({ tagline: e.target.value })}
          className={inputClass}
        />
      </Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="WhatsApp (internacional, solo números)">
          <input
            value={form.whatsapp}
            onChange={(e) => set({ whatsapp: e.target.value })}
            className={inputClass}
          />
        </Field>
        <Field label="WhatsApp visible">
          <input
            value={form.whatsappDisplay}
            onChange={(e) => set({ whatsappDisplay: e.target.value })}
            className={inputClass}
          />
        </Field>
        <Field label="Teléfono">
          <input
            value={form.phone}
            onChange={(e) => set({ phone: e.target.value })}
            className={inputClass}
          />
        </Field>
        <Field label="Instagram (URL)">
          <input
            value={form.instagram}
            onChange={(e) => set({ instagram: e.target.value })}
            className={inputClass}
          />
        </Field>
      </div>
      <Field label="Dirección">
        <input
          value={form.address}
          onChange={(e) => set({ address: e.target.value })}
          className={inputClass}
        />
      </Field>
      <Field label="Horario">
        <input
          value={form.hours}
          onChange={(e) => set({ hours: e.target.value })}
          className={inputClass}
        />
      </Field>
      <Field label="Tasa Bs por US$">
        <input
          type="number"
          step="0.01"
          value={form.usdRate}
          onChange={(e) => set({ usdRate: Number(e.target.value) })}
          className={inputClass}
        />
      </Field>

      <PrimaryButton disabled={saving} onClick={() => void save()}>
        {saving ? "Guardando…" : "Guardar cambios"}
      </PrimaryButton>
    </div>
  );
}
