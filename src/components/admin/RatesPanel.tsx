import { useState } from "react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { getBcvRates } from "@/lib/rates.functions";
import { Field, GhostButton, PrimaryButton, inputClass } from "./ui";
import type { SiteSettings } from "@/lib/catalog";

export function RatesPanel({
  settings,
  onRefresh,
}: {
  settings: SiteSettings;
  onRefresh: () => Promise<void> | void;
}) {
  const fetchBcv = useServerFn(getBcvRates);
  const [gold, setGold] = useState(settings.goldRate);
  const [silver, setSilver] = useState(settings.silverRate);
  const [usd, setUsd] = useState(settings.usdRate);
  const [eur, setEur] = useState(settings.eurRate);
  const [saving, setSaving] = useState(false);
  const [loadingBcv, setLoadingBcv] = useState(false);

  async function consultarBcv() {
    setLoadingBcv(true);
    try {
      const rates = await fetchBcv();
      setUsd(rates.usd);
      setEur(rates.eur);
      toast.success("Tasas del BCV actualizadas. Recuerde guardar.");
    } catch {
      toast.error("No se pudo consultar el BCV");
    }
    setLoadingBcv(false);
  }

  async function save() {
    setSaving(true);
    const { error } = await supabase
      .from("site_settings")
      .update({
        gold_rate: gold,
        silver_rate: silver,
        usd_rate: usd,
        eur_rate: eur,
        rates_updated_at: new Date().toISOString(),
      })
      .eq("id", 1);
    setSaving(false);
    if (error) {
      toast.error("No se pudieron guardar las tasas");
      return;
    }
    toast.success("Tasas actualizadas");
    await onRefresh();
  }

  return (
    <div className="max-w-3xl space-y-8">
      <section>
        <h2 className="font-display text-2xl font-light">Tasas de metales</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Precio por gramo en dólares. El precio de cada producto se calcula
          multiplicando su peso por la tasa del metal.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Field label="Tasa de oro (US$ por gramo)">
            <input
              type="number"
              step="0.01"
              value={gold}
              onChange={(e) => setGold(Number(e.target.value))}
              className={inputClass}
            />
          </Field>
          <Field label="Tasa de plata (US$ por gramo)">
            <input
              type="number"
              step="0.01"
              value={silver}
              onChange={(e) => setSilver(Number(e.target.value))}
              className={inputClass}
            />
          </Field>
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-light">Tasa de cambio</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Consulte la tasa oficial del BCV o escríbala manualmente. La tasa del
          dólar es la que convierte los precios a bolívares en la tienda.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Field label="Dólar BCV (Bs por US$)">
            <input
              type="number"
              step="0.0001"
              value={usd}
              onChange={(e) => setUsd(Number(e.target.value))}
              className={inputClass}
            />
          </Field>
          <Field label="Euro BCV (Bs por €)">
            <input
              type="number"
              step="0.0001"
              value={eur}
              onChange={(e) => setEur(Number(e.target.value))}
              className={inputClass}
            />
          </Field>
        </div>
        <div className="mt-4">
          <GhostButton disabled={loadingBcv} onClick={() => void consultarBcv()}>
            {loadingBcv ? "Consultando…" : "Consultar tasas del BCV"}
          </GhostButton>
        </div>
      </section>

      <PrimaryButton disabled={saving} onClick={() => void save()}>
        {saving ? "Guardando…" : "Guardar tasas"}
      </PrimaryButton>
    </div>
  );
}
