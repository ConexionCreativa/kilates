import { createContext, useContext, useMemo, type ReactNode } from "react";
import {
  DEFAULT_SETTINGS,
  type CatalogData,
  type Category,
  type Product,
  type SiteSettings,
} from "./catalog.functions";
import { localImage } from "./local-images";

export type { CatalogData, Category, Product, SiteSettings };

const EMPTY: CatalogData = {
  products: [],
  categories: [],
  settings: DEFAULT_SETTINGS,
};

const CatalogContext = createContext<CatalogData>(EMPTY);

export function CatalogProvider({
  value,
  children,
}: {
  value: CatalogData;
  children: ReactNode;
}) {
  const normalized = useMemo<CatalogData>(
    () => ({
      ...value,
      products: value.products.map((p) => ({
        ...p,
        image: localImage(p.image, p.category, p.id),
      })),
      categories: value.categories.map((c) => ({
        ...c,
        image: localImage(c.image, c.id, c.id),
      })),
    }),
    [value],
  );

  return (
    <CatalogContext.Provider value={normalized}>{children}</CatalogContext.Provider>
  );
}


export function useCatalog() {
  return useContext(CatalogContext);
}

export function useProducts() {
  return useCatalog().products;
}

export function useCategories() {
  return useCatalog().categories;
}

export function useSettings() {
  return useCatalog().settings;
}

/** Enlace corto oficial de WhatsApp de Kilates Joyería. */
export const WHATSAPP_LINK = "https://wa.link/kilates-joyerias";

/** Número al que redirige el enlace corto (pedidos). */
export const WHATSAPP_PHONE = "584220476345";

/** Enlace de pedido: conserva el detalle de las piezas en el mensaje. */
export function whatsappOrderLink(message: string) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
