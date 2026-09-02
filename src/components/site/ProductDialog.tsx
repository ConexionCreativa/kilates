import { useEffect, useState } from "react";
import { Minus, Plus, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/products";
import { useSettings, whatsappLink } from "@/lib/catalog";
import { useCurrency } from "@/lib/currency";
import { useCart } from "@/lib/cart";

export function ProductDialog({
  product,
  onOpenChange,
}: {
  product: Product | null;
  onOpenChange: (open: boolean) => void;
}) {
  const { add } = useCart();
  const SITE = useSettings();
  const whatsappUrl = (m: string) => whatsappLink(SITE.whatsapp, m);
  const { format } = useCurrency();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setQty(1);
  }, [product?.id]);

  return (
    <Dialog open={product !== null} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl border-border bg-card p-0 sm:rounded-none">
        {product && (
          <div className="grid gap-0 md:grid-cols-2">
            <img
              src={product.image}
              alt={`${product.name} en ${product.material}`}
              loading="lazy"
              width={800}
              height={800}
              className="aspect-square w-full bg-onyx object-cover"
            />

            <div className="flex flex-col p-6">
              <DialogHeader className="space-y-1 text-left">
                <p className="eyebrow">{product.material}</p>
                <DialogTitle className="font-display text-3xl font-light">
                  {product.name}
                </DialogTitle>
                <DialogDescription className="text-sm leading-relaxed">
                  {product.description}
                </DialogDescription>
              </DialogHeader>

              <dl className="mt-5 space-y-2 border-t border-border pt-5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Material</dt>
                  <dd>{product.material}</dd>
                </div>
                {product.detail && (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Detalle</dt>
                    <dd>{product.detail}</dd>
                  </div>
                )}
                {product.weight > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Peso aprox.</dt>
                    <dd>{product.weight} g</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Disponibilidad</dt>
                  <dd className={product.inStock ? "text-gold" : "text-muted-foreground"}>
                    {product.inStock ? "En stock" : "Agotado"}
                  </dd>
                </div>
              </dl>

              <p className="mt-6 font-display text-4xl text-gold">
                {format(product.price * qty)}
              </p>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex items-center border border-border">
                  <button
                    type="button"
                    aria-label="Quitar una unidad"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-muted-foreground hover:text-gold"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="min-w-10 text-center">{qty}</span>
                  <button
                    type="button"
                    aria-label="Agregar una unidad"
                    onClick={() => setQty((q) => q + 1)}
                    className="px-3 py-2 text-muted-foreground hover:text-gold"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
                <Button
                  disabled={!product.inStock}
                  onClick={() => {
                    add(product, qty);
                    toast.success(`${product.name} agregado a su selección`);
                    onOpenChange(false);
                  }}
                  className="flex-1 rounded-none bg-gold text-primary-foreground hover:bg-gold-light"
                >
                  Agregar a la selección
                </Button>
              </div>

              <a
                href={whatsappUrl(
                  `Hola Kilates, me interesa la pieza "${product.name}" (${product.material}). ¿Podrían darme más información?`,
                )}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center justify-center gap-2 border border-gold/50 px-4 py-2 text-[11px] tracking-[0.18em] text-gold uppercase transition-colors hover:bg-gold hover:text-primary-foreground"
              >
                <MessageCircle className="size-4" /> Consultar por WhatsApp
              </a>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
