export const SITE = {
  name: "Kilates",
  tagline: "Alta joyería",
  /** Número de WhatsApp en formato internacional, sin signos. */
  whatsapp: "584241234567",
  whatsappDisplay: "+58 424 123 4567",
  email: "contacto@kilates.com.ve",
  address: "C.C. Sambil, Nivel Feria, Local 12 — Caracas, Venezuela",
  hours: "Lunes a sábado · 10:00 a 19:00",
  instagram: "https://instagram.com",
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("es-VE", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
