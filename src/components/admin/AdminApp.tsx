import { useEffect, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useCatalog } from "@/lib/catalog";
import { AdminLogin } from "./AdminLogin";
import { ProductsPanel } from "./ProductsPanel";
import { CategoriesPanel } from "./CategoriesPanel";
import { SettingsPanel } from "./SettingsPanel";
import { GhostButton } from "./ui";
import logo from "@/assets/realgestion-logo.png.asset.json";

type Tab = "productos" | "colecciones" | "contacto";

const TABS: { id: Tab; label: string }[] = [
  { id: "productos", label: "Productos y precios" },
  { id: "colecciones", label: "Categorías / Colecciones" },
  { id: "contacto", label: "Datos de contacto" },
];

export function AdminApp() {
  const router = useRouter();
  const catalog = useCatalog();
  const [status, setStatus] = useState<"loading" | "out" | "denied" | "ok">(
    "loading",
  );
  const [tab, setTab] = useState<Tab>("productos");

  useEffect(() => {
    let active = true;

    async function check() {
      const { data } = await supabase.auth.getUser();
      if (!active) return;
      if (!data.user) {
        setStatus("out");
        return;
      }
      const { data: isAdmin } = await supabase.rpc("has_role", {
        _user_id: data.user.id,
        _role: "admin",
      });
      if (!active) return;
      setStatus(isAdmin ? "ok" : "denied");
    }

    void check();
    const { data: sub } = supabase.auth.onAuthStateChange(() => void check());
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const refresh = () => router.invalidate();

  if (status === "loading") {
    return (
      <div className="grid min-h-screen place-items-center bg-background text-sm text-muted-foreground">
        Cargando…
      </div>
    );
  }

  if (status === "out") return <AdminLogin />;

  if (status === "denied") {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-4 text-center">
        <div>
          <h1 className="font-display text-2xl">Sin permisos de administrador</h1>
          <div className="mt-4">
            <GhostButton onClick={() => void supabase.auth.signOut()}>
              Cerrar sesión
            </GhostButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-onyx">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
          <img
            src={logo.url}
            alt="Realgestión Ecommerce"
            width={779}
            height={239}
            className="h-9 w-auto"
          />
          <span className="hidden text-xs tracking-[0.22em] text-muted-foreground uppercase sm:block">
            Ecommerce · Back office
          </span>
          <div className="ml-auto flex gap-2">
            <GhostButton onClick={() => window.open("/", "_blank")}>
              Ver tienda
            </GhostButton>
            <GhostButton onClick={() => void supabase.auth.signOut()}>
              Salir
            </GhostButton>
          </div>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`border-b-2 py-3 text-[11px] tracking-[0.18em] whitespace-nowrap uppercase transition-colors ${
                tab === t.id
                  ? "border-gold text-gold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {tab === "productos" && (
          <ProductsPanel
            products={catalog.products}
            categories={catalog.categories}
            rate={catalog.settings.usdRate}
            onRefresh={refresh}
          />
        )}
        {tab === "colecciones" && (
          <CategoriesPanel categories={catalog.categories} onRefresh={refresh} />
        )}
        {tab === "contacto" && (
          <SettingsPanel
            key={JSON.stringify(catalog.settings)}
            settings={catalog.settings}
            onRefresh={refresh}
          />
        )}
      </main>
    </div>
  );
}
