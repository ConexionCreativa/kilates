import { BadgeCheck, ShieldCheck, Truck } from "lucide-react";

const ITEMS = [
  {
    icon: BadgeCheck,
    title: "Certificación",
    text: "Cada pieza se entrega con certificado de material y quilataje.",
  },
  {
    icon: ShieldCheck,
    title: "Garantía de por vida",
    text: "Mantenimiento, pulido y ajuste de talla sin costo en nuestro taller.",
  },
  {
    icon: Truck,
    title: "Envío asegurado",
    text: "Despacho nacional con seguro incluido y entrega en 24 a 72 horas.",
  },
];

export function Trust() {
  return (
    <section className="border-y border-border bg-onyx">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map(({ icon: Icon, title, text }) => (
          <div key={title}>
            <Icon className="size-6 text-gold" />
            <h3 className="mt-4 font-display text-2xl leading-tight">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
