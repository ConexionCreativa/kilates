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

/** Sustituye imágenes externas o vacías por una imagen local del proyecto. */
export function localImage(image: string | null | undefined, category: string, seed: string) {
  const src = (image ?? "").trim();
  const isLocalOrUploaded =
    src.startsWith("/api/public/img/") ||
    src.startsWith("/__l5e/") ||
    src.startsWith("/assets/") ||
    src.startsWith("data:");
  if (src && isLocalOrUploaded) return src;
  const pool = BY_CATEGORY[category] ?? FALLBACK;
  return pick(pool, seed || category);
}
