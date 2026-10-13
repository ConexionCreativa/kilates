import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSettings } from "@/lib/catalog";

export type Currency = "USD" | "VES";

/** Tasa de respaldo si el back office no tiene un valor cargado. */
export const RATE_VES_PER_USD = 787.52;

const STORAGE_KEY = "kilates.currency";

type CurrencyContextValue = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  toggle: () => void;
  rate: number;
  rateDate: string;
  format: (usd: number) => string;
  /** Formatea el precio de un producto respetando un precio en Bs fijado a mano. */
  formatItem: (p: PricedItem, qty?: number) => string;
  formatLines: (lines: { product: PricedItem; qty: number }[]) => string;
};

type PricedItem = { price: number; priceBs?: number; bothManual?: boolean };

export function itemBs(p: PricedItem, rate: number) {
  return p.bothManual && (p.priceBs ?? 0) > 0 ? (p.priceBs as number) : Math.round(p.price * rate);
}

function fmtBs(bs: number) {
  return `Bs ${new Intl.NumberFormat("es-VE", { maximumFractionDigits: 0 }).format(Math.round(bs))}`;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function formatUsd(value: number) {
  return new Intl.NumberFormat("es-VE", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatVes(value: number, rate: number = RATE_VES_PER_USD) {
  return `Bs ${new Intl.NumberFormat("es-VE", {
    maximumFractionDigits: 0,
  }).format(Math.round(value * rate))}`;
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("VES");
  const settings = useSettings();
  const rate = settings.usdRate || RATE_VES_PER_USD;

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "USD" || stored === "VES") setCurrency(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currency);
  }, [currency]);

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      setCurrency,
      toggle: () => setCurrency((c) => (c === "USD" ? "VES" : "USD")),
      rate,
      rateDate: new Date().toLocaleDateString("es-VE"),
      format: (usd: number) =>
        currency === "USD" ? formatUsd(usd) : formatVes(usd, rate),
      formatItem: (p, qty = 1) =>
        currency === "USD" ? formatUsd(p.price * qty) : fmtBs(itemBs(p, rate) * qty),
      formatLines: (lines) =>
        currency === "USD"
          ? formatUsd(lines.reduce((s, l) => s + l.product.price * l.qty, 0))
          : fmtBs(lines.reduce((s, l) => s + itemBs(l.product, rate) * l.qty, 0)),
    }),
    [currency, rate],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency debe usarse dentro de CurrencyProvider");
  return ctx;
}
