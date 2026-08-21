import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/coleccion", label: "Colección" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Header() {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    setMenu(false);
    navigate({ to: "/coleccion", search: { q: query || undefined, cat: undefined } });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
        <Link to="/" className="shrink-0">
          <span className="font-display text-2xl tracking-[0.35em] text-gold-gradient">
            KILATES
          </span>
        </Link>

        <nav className="ml-8 hidden gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-xs tracking-[0.22em] text-muted-foreground uppercase transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <form onSubmit={submitSearch} className="ml-auto hidden w-56 lg:block">
          <div className="flex items-center gap-2 border-b border-border pb-1">
            <Search className="size-4 text-gold" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar pieza…"
              aria-label="Buscar pieza"
              className="w-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        </form>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir selección"
          className="relative ml-auto inline-flex size-10 items-center justify-center border border-border text-champagne transition-colors hover:border-gold hover:text-gold lg:ml-4"
        >
          <ShoppingBag className="size-4" />
          {count > 0 && (
            <span className="absolute -top-2 -right-2 inline-flex size-5 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-primary-foreground">
              {count}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setMenu((m) => !m)}
          aria-label="Abrir menú"
          className="inline-flex size-10 items-center justify-center border border-border text-champagne md:hidden"
        >
          {menu ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {menu && (
        <div className="border-t border-border md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMenu(false)}
                className="border-b border-border/50 py-3 text-xs tracking-[0.22em] text-muted-foreground uppercase last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <form onSubmit={submitSearch} className="flex items-center gap-2 py-3">
              <Search className="size-4 text-gold" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar pieza…"
                aria-label="Buscar pieza"
                className="w-full bg-transparent text-sm focus:outline-none"
              />
            </form>
          </nav>
        </div>
      )}
    </header>
  );
}
