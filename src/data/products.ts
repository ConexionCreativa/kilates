import anillo1 from "@/assets/anillo-1.jpg";
import cadena1 from "@/assets/cadena-1.jpg";
import brazalete1 from "@/assets/brazalete-1.jpg";
import zarcillo1 from "@/assets/zarcillo-1.jpg";
import dije1 from "@/assets/dije-1.jpg";
import reloj1 from "@/assets/reloj-1.jpg";
import { REAL_PRODUCTS } from "./real-products";

export type CategoryId =
  | "anillos"
  | "cadenas"
  | "brazaletes"
  | "zarcillos"
  | "dijes"
  | "relojes";

export type Material =
  | "Oro 18k"
  | "Oro 14k"
  | "Oro blanco 18k"
  | "Oro rosa 18k"
  | "Plata 925";

export type Product = {
  id: string;
  name: string;
  category: CategoryId;
  material: Material;
  /** Peso aproximado en gramos. */
  weight: number;
  detail: string;
  description: string;
  /** Precio de referencia en USD; la UI lo convierte a bolívares. */
  price: number;
  image: string;
  inStock: boolean;
  isNew?: boolean;
};

export const CATEGORIES: {
  id: CategoryId;
  label: string;
  blurb: string;
  image: string;
}[] = [
  {
    id: "anillos",
    label: "Anillos",
    blurb: "Solitarios, alianzas y piezas con gema",
    image: anillo1,
  },
  {
    id: "cadenas",
    label: "Cadenas",
    blurb: "Tejidos clásicos en oro y plata",
    image: cadena1,
  },
  {
    id: "brazaletes",
    label: "Brazaletes",
    blurb: "Rígidos, tennis y esclavas",
    image: brazalete1,
  },
  {
    id: "zarcillos",
    label: "Zarcillos",
    blurb: "Argollas, topos y colgantes",
    image: zarcillo1,
  },
  {
    id: "dijes",
    label: "Dijes",
    blurb: "Detalles para personalizar su cadena",
    image: dije1,
  },
  {
    id: "relojes",
    label: "Relojes",
    blurb: "Piezas de tiempo seleccionadas",
    image: reloj1,
  },
];

export const MATERIALS: Material[] = [
  "Oro 18k",
  "Oro blanco 18k",
  "Oro rosa 18k",
  "Plata 925",
];

/** Catálogo completo: piezas reales importadas de kilates.com.ve. */
export const PRODUCTS: Product[] = REAL_PRODUCTS;
