import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/realgestion-logo.png.asset.json";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) toast.error("Credenciales inválidas");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm border border-border bg-card p-8"
      >
        <img
          src={logo.url}
          alt="Realgestión Ecommerce"
          width={779}
          height={239}
          className="h-10 w-auto"
        />
        <h1 className="mt-6 font-display text-2xl font-light">Back office</h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Acceso restringido a administradores.
        </p>

        <label className="mt-6 block text-xs tracking-[0.18em] text-muted-foreground uppercase">
          Correo
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            className="mt-2 w-full border border-border bg-transparent px-3 py-2 text-sm normal-case tracking-normal text-foreground focus:border-gold focus:outline-none"
          />
        </label>

        <label className="mt-4 block text-xs tracking-[0.18em] text-muted-foreground uppercase">
          Contraseña
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="mt-2 w-full border border-border bg-transparent px-3 py-2 text-sm normal-case tracking-normal text-foreground focus:border-gold focus:outline-none"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full border border-gold bg-gold px-6 py-3 text-[11px] tracking-[0.22em] text-primary-foreground uppercase transition-colors hover:bg-gold-light disabled:opacity-50"
        >
          {loading ? "Ingresando…" : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
