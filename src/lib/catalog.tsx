import { createContext, useContext, type ReactNode } from "react";
import {
  DEFAULT_SETTINGS,
  type CatalogData,
  type Category,
  type Product,
  type SiteSettings,
} from "./catalog.functions";

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
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
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
