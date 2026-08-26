import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Currency = "USD" | "VES";

/** Tasa de referencia BCV. Actualícela aquí cuando cambie. */
export const RATE_VES_PER_USD = 787.52;
export const RATE_DATE = "26/08/2026";

const STORAGE_KEY = "kilates.currency";

type CurrencyContextValue = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  toggle: () => void;
  rate: number;
  rateDate: string;
  format: (usd: number) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function formatUsd(value: number) {
  return new Intl.NumberFormat("es-VE", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatVes(value: number) {
  return `Bs ${new Intl.NumberFormat("es-VE", {
    maximumFractionDigits: 0,
  }).format(Math.round(value * RATE_VES_PER_USD))}`;
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");

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
      rate: RATE_VES_PER_USD,
      rateDate: RATE_DATE,
      format: (usd: number) => (currency === "USD" ? formatUsd(usd) : formatVes(usd)),
    }),
    [currency],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency debe usarse dentro de CurrencyProvider");
  return ctx;
}
