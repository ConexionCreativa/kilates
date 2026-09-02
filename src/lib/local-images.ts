import anillo1 from "@/assets/anillo-1.jpg";
import anillo2 from "@/assets/anillo-2.jpg";
import anillo3 from "@/assets/anillo-3.jpg";
import brazalete1 from "@/assets/brazalete-1.jpg";
import brazalete2 from "@/assets/brazalete-2.jpg";
import cadena1 from "@/assets/cadena-1.jpg";
import cadena2 from "@/assets/cadena-2.jpg";
import cadena3 from "@/assets/cadena-3.jpg";
import dije1 from "@/assets/dije-1.jpg";
import dije2 from "@/assets/dije-2.jpg";
import reloj1 from "@/assets/reloj-1.jpg";
import reloj2 from "@/assets/reloj-2.jpg";
import zarcillo1 from "@/assets/zarcillo-1.jpg";
import zarcillo2 from "@/assets/zarcillo-2.jpg";
import zarcillo3 from "@/assets/zarcillo-3.jpg";

/** Imágenes locales por categoría (no se usan imágenes externas del sitio antiguo). */
const BY_CATEGORY: Record<string, string[]> = {
  anillos: [anillo1, anillo2, anillo3],
  brazaletes: [brazalete1, brazalete2],
  cadenas: [cadena1, cadena2, cadena3],
  dijes: [dije1, dije2],
  relojes: [reloj1, reloj2],
  zarcillos: [zarcillo1, zarcillo2, zarcillo3],
};

const FALLBACK = [anillo1, cadena1, dije1, zarcillo1, brazalete1];

function pick(pool: string[], seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return pool[h % pool.length]!;
}

/** Mapeo automático de todas las imágenes reales de productos en assets/product_images. */
const PRODUCT_IMAGE_MODULES = import.meta.glob<string>(
  "@/assets/product_images/*",
  { eager: true, import: "default" },
);

const PRODUCT_IMAGE_MAP: Record<string, string> = {};
for (const [path, url] of Object.entries(PRODUCT_IMAGE_MODULES)) {
  const filename = path.split("/").pop();
  if (filename) {
    PRODUCT_IMAGE_MAP[filename] = url;
    PRODUCT_IMAGE_MAP[`assets/product_images/${filename}`] = url;
    PRODUCT_IMAGE_MAP[`/assets/product_images/${filename}`] = url;
    PRODUCT_IMAGE_MAP[`product_images/${filename}`] = url;
  }
}

/** Sustituye imágenes externas o vacías por una imagen local del proyecto. */
export function localImage(image: string | null | undefined, category: string, seed: string) {
  const src = (image ?? "").trim();
  if (!src) {
    const pool = BY_CATEGORY[category] ?? FALLBACK;
    return pick(pool, seed || category);
  }

  // 1. Coincidencia directa por ruta registrada en el mapa
  if (PRODUCT_IMAGE_MAP[src]) {
    return PRODUCT_IMAGE_MAP[src];
  }

  // 2. Extraer nombre de archivo si viene de una URL externa o ruta completa
  const filename = src.split("/").pop()?.split("?")[0];
  if (filename && PRODUCT_IMAGE_MAP[filename]) {
    return PRODUCT_IMAGE_MAP[filename];
  }

  // 3. URLs locales directas o subidas
  const isLocalOrUploaded =
    src.startsWith("/api/public/img/") ||
    src.startsWith("/__l5e/") ||
    src.startsWith("/assets/") ||
    src.startsWith("assets/") ||
    src.startsWith("data:");
  if (isLocalOrUploaded) return src;

  // 4. Fallback por categoría
  const pool = BY_CATEGORY[category] ?? FALLBACK;
  return pick(pool, seed || category);
}
