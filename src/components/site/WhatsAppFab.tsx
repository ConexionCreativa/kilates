import { MessageCircle } from "lucide-react";
import { useSettings, whatsappLink } from "@/lib/catalog";

export function WhatsAppFab() {
  const SITE = useSettings();
  const whatsappUrl = (m: string) => whatsappLink(SITE.whatsapp, m);
  return (
    <a
      href={whatsappUrl("Hola Kilates, me gustaría recibir asesoría sobre sus piezas.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed right-5 bottom-5 z-50 inline-flex size-14 items-center justify-center rounded-full border border-gold/50 bg-onyx text-gold shadow-[0_0_30px_-8px_var(--gold)] transition-transform hover:scale-105"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
