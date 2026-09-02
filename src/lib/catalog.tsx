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

export function whatsappLink(phone: string, message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
