import { CATEGORIES, type CategoryId } from "@/data/products";

export function CategoryStrip({
  onSelect,
}: {
  onSelect: (category: CategoryId) => void;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="text-center">
        <p className="eyebrow">Por categoría</p>
        <h2 className="mt-3 font-display text-4xl font-light">Qué está buscando</h2>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onSelect(c.id)}
            className="group border border-border/70 bg-card text-left transition-colors hover:border-gold/60"
          >
            <div className="aspect-square overflow-hidden bg-onyx">
              <img
                src={c.image}
                alt={c.label}
                loading="lazy"
                width={800}
                height={800}
                className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="p-3">
              <p className="font-display text-lg leading-tight group-hover:text-gold">
                {c.label}
              </p>
              <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
                {c.blurb}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
