import { MessageCircle } from "lucide-react";
import heroImg from "@/assets/hero-joyeria.jpg";
import { useSettings, whatsappLink } from "@/lib/catalog";

export function Hero() {
  const SITE = useSettings();
  const whatsappUrl = (m: string) => whatsappLink(SITE.whatsapp, m);
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={heroImg}
        alt="Collar y anillos de oro con diamantes sobre seda negra"
        width={1600}
        height={1008}
        className="absolute inset-0 -z-10 size-full object-cover opacity-70"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/85 to-background/20" />

      <div className="mx-auto flex max-w-7xl flex-col justify-center px-4 py-28 md:py-40">
        <p className="eyebrow">Alta joyería · Caracas</p>
        <h1 className="mt-5 max-w-2xl font-display text-5xl leading-[1.05] font-light md:text-7xl">
          Piezas que se heredan,
          <span className="block text-gold-gradient">no que se reemplazan</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
          Oro 18k, 14k y plata 925 seleccionados pieza por pieza. Catálogo con
          precios claros, disponibilidad real y atención directa por WhatsApp.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="#catalogo"
            className="inline-flex items-center border border-gold bg-gold px-8 py-3 text-[11px] tracking-[0.22em] text-primary-foreground uppercase transition-colors hover:bg-gold-light"
          >
            Ver colección
          </a>
          <a
            href={whatsappUrl("Hola Kilates, quisiera asesoría para elegir una pieza.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border border-gold/50 px-8 py-3 text-[11px] tracking-[0.22em] text-gold uppercase transition-colors hover:bg-gold hover:text-primary-foreground"
          >
            <MessageCircle className="size-4" /> Asesoría
          </a>
        </div>
      </div>
    </section>
  );
}
