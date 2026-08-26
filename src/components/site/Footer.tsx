import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Clock, Phone } from "lucide-react";
import { SITE } from "@/config/site";
import logoAsset from "@/assets/kilates-logo.png.asset.json";

export function Footer() {
  return (
    <footer className="border-t border-border bg-onyx">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <img
            src={logoAsset.url}
            alt="Kilates"
            width={376}
            height={226}
            className="h-16 w-auto"
            loading="lazy"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Joyería fina en oro y plata. Piezas seleccionadas, certificadas y
            entregadas con la discreción que merece cada ocasión.
          </p>
        </div>

        <div>
          <h3 className="eyebrow">Navegación</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="transition-colors hover:text-gold">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/coleccion" className="transition-colors hover:text-gold">
                Colección
              </Link>
            </li>
            <li>
              <Link to="/contacto" className="transition-colors hover:text-gold">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">Contacto</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
              {SITE.whatsappDisplay}
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
              {SITE.email}
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
              {SITE.address}
            </li>
            <li className="flex gap-2">
              <Clock className="mt-0.5 size-4 shrink-0 text-gold" />
              {SITE.hours}
            </li>
            <li>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-gold"
              >
                <Instagram className="size-4 text-gold" /> Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-muted-foreground space-y-1">
          <p>© {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.</p>
          <a
            href="https://realgestion.lat/ecommerce"
            target="_blank"
            rel="noreferrer"
            className="inline-block transition-colors hover:text-gold"
          >
            Corriendo gracias a Realgestión Ecommerce
          </a>
        </div>
      </div>
    </footer>
  );
}
