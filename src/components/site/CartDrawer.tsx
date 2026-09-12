import { Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useSettings, whatsappLink } from "@/lib/catalog";
import { useCurrency } from "@/lib/currency";

export function CartDrawer() {
  const { lines, total, isOpen, setOpen, setQty, remove, clear } = useCart();
  const { format } = useCurrency();
  const SITE = useSettings();
  const whatsappUrl = (m: string) => whatsappLink(SITE.whatsapp, m);

  const message = [
    `Hola ${SITE.name}, quiero solicitar estas piezas:`,
    "",
    ...lines.map(
      (l) =>
        `• ${l.product.name} (${l.product.material}) x${l.qty} — ${format(
          l.product.price * l.qty,
        )}`,
    ),
    "",
    `Total estimado: ${format(total)}`,
    "",
    "✨ Me interesa también conocer la oferta con descuento para pago en Efectivo, Zelle o USDT. ¿Me ayudan a formalizar la compra?",
  ].join("\n");

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col border-border bg-background sm:max-w-md">
        <SheetHeader className="border-b border-border">
          <SheetTitle className="font-display text-2xl font-light tracking-wide">
            Su selección
          </SheetTitle>
          <SheetDescription>
            Envíe el pedido por WhatsApp y le confirmamos disponibilidad y envío.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4">
          {lines.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted-foreground">
              Aún no ha agregado piezas.
            </p>
          ) : (
            <ul className="divide-y divide-border/60">
              {lines.map(({ product, qty }) => (
                <li key={product.id} className="flex gap-4 py-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    width={800}
                    height={800}
                    className="size-20 shrink-0 rounded-sm border border-border object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg leading-tight">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {product.material} · {product.detail}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center border border-border">
                        <button
                          type="button"
                          aria-label="Quitar una unidad"
                          onClick={() => setQty(product.id, qty - 1)}
                          className="px-2 py-1 text-muted-foreground hover:text-gold"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="min-w-8 text-center text-sm">{qty}</span>
                        <button
                          type="button"
                          aria-label="Agregar una unidad"
                          onClick={() => setQty(product.id, qty + 1)}
                          className="px-2 py-1 text-muted-foreground hover:text-gold"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        aria-label={`Eliminar ${product.name}`}
                        onClick={() => remove(product.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </button>
                      <span className="ml-auto text-sm text-gold">
                        {format(product.price * qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-3 border-t border-border p-4">
          <div className="flex items-baseline justify-between">
            <span className="eyebrow">Total estimado</span>
            <span className="font-display text-2xl text-gold">
              {format(total)}
            </span>
          </div>
          <Button
            asChild
            disabled={lines.length === 0}
            className="w-full rounded-none bg-gold text-primary-foreground hover:bg-gold-light"
          >
            <a
              href={lines.length ? whatsappUrl(message) : undefined}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="size-4" /> Enviar pedido por WhatsApp
            </a>
          </Button>
          {lines.length > 0 && (
            <button
              type="button"
              onClick={clear}
              className="w-full text-xs text-muted-foreground underline-offset-4 hover:text-gold hover:underline"
            >
              Vaciar selección
            </button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
