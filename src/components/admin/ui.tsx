import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
      {label}
      <div className="mt-2 tracking-normal normal-case">{children}</div>
    </label>
  );
}

export const inputClass =
  "w-full border border-border bg-transparent px-3 py-2 text-sm text-foreground focus:border-gold focus:outline-none";

export function PrimaryButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`border border-gold bg-gold px-5 py-2 text-[11px] tracking-[0.18em] text-primary-foreground uppercase transition-colors hover:bg-gold-light disabled:opacity-50 ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`border border-border px-5 py-2 text-[11px] tracking-[0.18em] uppercase transition-colors hover:border-gold hover:text-gold disabled:opacity-50 ${props.className ?? ""}`}
    >
      {children}
    </button>
  );
}

/** Sube una imagen al almacenamiento y devuelve la URL pública servida por la app. */
export function ImageInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    setUploading(true);
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage
      .from("product-images")
      .upload(path, file, { contentType: file.type, upsert: false });
    setUploading(false);
    if (error) {
      toast.error("No se pudo subir la imagen");
      return;
    }
    onChange(`/api/public/img/${path}`);
    toast.success("Imagen cargada");
  }

  return (
    <div className="flex gap-3">
      {value ? (
        <img
          src={value}
          alt="Vista previa"
          className="size-20 shrink-0 border border-border object-cover"
        />
      ) : (
        <div className="grid size-20 shrink-0 place-items-center border border-dashed border-border text-[10px] text-muted-foreground">
          sin foto
        </div>
      )}
      <div className="flex-1 space-y-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="URL de la imagen"
          className={inputClass}
        />
        <input
          type="file"
          accept="image/*"
          disabled={uploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void upload(file);
          }}
          className="block w-full text-xs text-muted-foreground file:mr-3 file:border file:border-border file:bg-transparent file:px-3 file:py-1.5 file:text-[10px] file:tracking-[0.18em] file:text-foreground file:uppercase"
        />
        {uploading && <p className="text-xs text-gold">Subiendo…</p>}
      </div>
    </div>
  );
}
