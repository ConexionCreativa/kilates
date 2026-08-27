import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import atelier from "@/assets/atelier.jpg";
import { SITE, whatsappUrl } from "@/config/site";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto y showroom | Kilates joyería" },
      {
        name: "description",
        content:
          "Visítenos en Caracas o escríbanos por WhatsApp para asesoría, apartados y envíos a toda Venezuela.",
      },
      { property: "og:title", content: "Contacto y showroom | Kilates joyería" },
      {
        property: "og:description",
        content:
          "Atención personalizada por WhatsApp, showroom en Caracas y envío asegurado a todo el país.",
      },
    ],
  }),
  component: Contacto,
});

function Contacto() {
  return (
    <>
      <div className="border-b border-border bg-onyx py-14 text-center">
        <p className="eyebrow">Estamos para atenderle</p>
        <h1 className="mt-3 font-display text-5xl font-light">Contacto</h1>
      </div>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-light">Showroom Caracas</h2>
          <div className="gold-rule mt-5 w-28" />
          <ul className="mt-8 space-y-5 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-gold" />
              <span>{SITE.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-gold" />
              <span>{SITE.phone}</span>
            </li>
            <li className="flex gap-3">
              <MessageCircle className="mt-0.5 size-5 shrink-0 text-gold" />
              <span>WhatsApp pedidos: {SITE.whatsappDisplay}</span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-gold" />
              <span>{SITE.hours}</span>
            </li>
          </ul>

          <a
            href={whatsappUrl(
              "Hola Kilates, quisiera coordinar una visita al showroom.",
            )}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex items-center gap-2 border border-gold bg-gold px-8 py-3 text-[11px] tracking-[0.22em] text-primary-foreground uppercase transition-colors hover:bg-gold-light"
          >
            <MessageCircle className="size-4" /> Escribir por WhatsApp
          </a>

          <div className="mt-12 border-t border-border pt-8">
            <h3 className="font-display text-2xl">Envíos y apartados</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Despachamos a toda Venezuela con seguro incluido, entre 24 y 72
              horas. Para apartar una pieza solo necesita un 30% de inicial y
              puede completar el pago en 60 días.
            </p>
          </div>
        </div>

        <img
          src={atelier}
          alt="Salón de exhibición de Kilates con vitrinas iluminadas"
          loading="lazy"
          width={1200}
          height={900}
          className="w-full border border-border object-cover"
        />
      </section>
    </>
  );
}
