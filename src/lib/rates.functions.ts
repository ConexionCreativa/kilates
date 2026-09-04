import { createServerFn } from "@tanstack/react-start";

export type BcvRates = {
  usd: number;
  eur: number;
  updatedAt: string;
};

/** Consulta las tasas oficiales del BCV (dólar y euro). */
export const getBcvRates = createServerFn({ method: "GET" }).handler(
  async (): Promise<BcvRates> => {
    const [usdRes, eurRes] = await Promise.all([
      fetch("https://ve.dolarapi.com/v1/dolares/oficial"),
      fetch("https://ve.dolarapi.com/v1/euros/oficial"),
    ]);

    if (!usdRes.ok || !eurRes.ok) {
      throw new Error("No se pudieron consultar las tasas del BCV");
    }

    const usd = (await usdRes.json()) as {
      promedio: number;
      fechaActualizacion: string;
    };
    const eur = (await eurRes.json()) as { promedio: number };

    return {
      usd: Number(usd.promedio) || 0,
      eur: Number(eur.promedio) || 0,
      updatedAt: usd.fechaActualizacion ?? new Date().toISOString(),
    };
  },
);
