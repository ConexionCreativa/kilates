import type { Product } from "@/lib/catalog.functions";

export type { Product };

/** Los identificadores de categoría ahora se administran desde el back office. */
export type CategoryId = string;
export type Material = string;

export const MATERIALS: Material[] = [
  "Oro 18k",
  "Oro 14k",
  "Oro blanco 18k",
  "Oro rosa 18k",
  "Plata 925",
];
