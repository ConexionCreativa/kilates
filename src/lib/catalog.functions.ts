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
  /** true = precio escrito a mano; false = peso × tasa del metal */
  priceManual?: boolean;
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
  eurRate: number;
  goldRate: number;
  silverRate: number;
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
  eurRate: 0,
  goldRate: 85,
  silverRate: 1.5,
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
          "id, name, category, material, weight, detail, description, price, image, in_stock, is_new, price_manual",
        )
        .order("sort_order", { ascending: true })
        .limit(2000),
      supabase
        .from("categories")
        .select("id, label, blurb, image")
        .order("sort_order", { ascending: true }),
      supabase.from("site_settings").select("*").eq("id", 1).maybeSingle(),
    ]);

    const s = settingsRes.data;
    let settings: SiteSettings = s
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
          eurRate: Number(s.eur_rate ?? 0),
          goldRate: Number(s.gold_rate ?? 0),
          silverRate: Number(s.silver_rate ?? 0),
        }
      : DEFAULT_SETTINGS;


    const products: Product[] = (productsRes.data ?? []).map((p) => {
      const weight = Number(p.weight);
      const manual = p.price_manual ?? false;
      const metalRate = p.material.toLowerCase().includes("plata")
        ? settings.silverRate
        : settings.goldRate;
      const auto = weight > 0 && metalRate > 0 ? weight * metalRate : Number(p.price);
      return {
        id: p.id,
        name: p.name,
        category: p.category,
        material: p.material,
        weight,
        detail: p.detail,
        description: p.description,
        price: manual ? Number(p.price) : auto,
        image: p.image,
        inStock: p.in_stock,
        isNew: p.is_new,
        priceManual: manual,
      };
    });

    return { products, categories: categoriesRes.data ?? [], settings };
  },
);
