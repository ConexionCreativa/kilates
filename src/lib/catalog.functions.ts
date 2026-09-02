import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type Product = {
  id: string;
  name: string;
  category: string;
  material: string;
  weight: number;
  detail: string;
  description: string;
  price: number;
  image: string;
  inStock: boolean;
  isNew?: boolean;
};

export type Category = {
  id: string;
  label: string;
  blurb: string;
  image: string;
};

export type SiteSettings = {
  name: string;
  tagline: string;
  whatsapp: string;
  whatsappDisplay: string;
  phone: string;
  address: string;
  hours: string;
  instagram: string;
  usdRate: number;
};

export type CatalogData = {
  products: Product[];
  categories: Category[];
  settings: SiteSettings;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  name: "Kilates Joyería",
  tagline: "Alta joyería",
  whatsapp: "584141711716",
  whatsappDisplay: "+58 414 171 1716",
  phone: "0412 603 7623",
  address: "Parque Caracas, La Candelaria — Caracas, Distrito Capital, Venezuela",
  hours: "Atención todos los días · horario completo",
  instagram: "https://instagram.com/kilates_oyerias",
  usdRate: 787.52,
};

export const getCatalog = createServerFn({ method: "GET" }).handler(
  async (): Promise<CatalogData> => {
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const supabase = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
            h.delete("Authorization");
          }
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const [productsRes, categoriesRes, settingsRes] = await Promise.all([
      supabase
        .from("products")
        .select(
          "id, name, category, material, weight, detail, description, price, image, in_stock, is_new",
        )
        .order("sort_order", { ascending: true })
        .limit(2000),
      supabase
        .from("categories")
        .select("id, label, blurb, image")
        .order("sort_order", { ascending: true }),
      supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(),
    ]);

    const products: Product[] = (productsRes.data ?? []).map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      material: p.material,
      weight: Number(p.weight),
      detail: p.detail,
      description: p.description,
      price: Number(p.price),
      image: p.image,
      inStock: p.in_stock,
      isNew: p.is_new,
    }));

    const s = settingsRes.data;
    const settings: SiteSettings = s
      ? {
          name: s.name,
          tagline: s.tagline,
          whatsapp: s.whatsapp,
          whatsappDisplay: s.whatsapp_display,
          phone: s.phone,
          address: s.address,
          hours: s.hours,
          instagram: s.instagram,
          usdRate: Number(s.usd_rate),
        }
      : DEFAULT_SETTINGS;

    return { products, categories: categoriesRes.data ?? [], settings };
  },
);
