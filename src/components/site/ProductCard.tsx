import { Plus } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/data/products";
import { formatPrice } from "@/config/site";
import { useCart } from "@/lib/cart";

export function ProductCard({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: (product: Product) => void;
}) {
  const { add } = useCart();

  return (
    <article className="group flex flex-col border border-border/70 bg-card transition-colors hover:border-gold/60">
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="relative block aspect-square overflow-hidden bg-onyx"
        aria-label={`Ver detalle de ${product.name}`}
      >
        <img
          src={product.image}
          alt={`${product.name} en ${product.material}`}
          loading="lazy"
          width={800}
          height={800}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {!product.inStock && (
          <span className="absolute top-3 left-3 border border-border bg-background/80 px-2 py-1 text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            Agotado
          </span>
        )}
        {product.inStock && product.isNew && (
          <span className="absolute top-3 left-3 border border-gold/60 bg-background/80 px-2 py-1 text-[10px] tracking-[0.2em] text-gold uppercase">
            Nuevo
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col p-4">
        <p className="eyebrow">{product.material}</p>
        <h3 className="mt-1 font-display text-xl leading-tight">{product.name}</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {product.detail} · {product.weight} g
        </p>

        <div className="mt-4 flex items-end justify-between gap-2 pt-3">
          <span className="font-display text-2xl text-gold">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => {
              add(product);
              toast.success(`${product.name} agregado a su selección`);
            }}
            className="inline-flex items-center gap-1.5 border border-gold/60 px-3 py-2 text-[11px] tracking-[0.18em] text-gold uppercase transition-colors hover:bg-gold hover:text-primary-foreground disabled:cursor-not-allowed disabled:border-border disabled:text-muted-foreground disabled:hover:bg-transparent"
          >
            <Plus className="size-3.5" />
            {product.inStock ? "Agregar" : "Agotado"}
          </button>
        </div>
      </div>
    </article>
  );
}
