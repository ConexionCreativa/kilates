export const SITE = {
  name: "Kilates Joyería",
  tagline: "Alta joyería",
  /** WhatsApp de pedidos en formato internacional, sin signos. */
  whatsapp: "584141711716",
  whatsappDisplay: "+58 414 171 1716",
  phone: "0412 603 7623",
  
  address: "Parque Caracas, La Candelaria — Caracas, Distrito Capital, Venezuela",
  hours: "Atención todos los días · horario completo",
  instagram: "https://instagram.com/kilates_oyerias",
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
