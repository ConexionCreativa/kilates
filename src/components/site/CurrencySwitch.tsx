import { useCurrency } from "@/lib/currency";

export function CurrencySwitch({ className = "" }: { className?: string }) {
  const { currency, setCurrency, rate, rateDate } = useCurrency();

  return (
    <div
      role="group"
      aria-label="Cambiar moneda"
      title={`Tasa de referencia BCV ${rateDate}: Bs ${rate} por US$1`}
      className={`inline-flex items-center border border-border ${className}`}
    >
      {(["USD", "VES"] as const).map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => setCurrency(c)}
          aria-pressed={currency === c}
          className={`px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase transition-colors ${
            currency === c
              ? "bg-gold text-primary-foreground"
              : "text-muted-foreground hover:text-gold"
          }`}
        >
          {c === "USD" ? "$" : "Bs"}
        </button>
      ))}
    </div>
  );
}
