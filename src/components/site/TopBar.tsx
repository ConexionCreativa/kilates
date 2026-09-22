import { useEffect, useState } from "react";

const MESSAGES = [
  "Envíos asegurados a toda Venezuela",
  "Certificado de autenticidad en cada pieza",
  "Asesoría personalizada por WhatsApp",
];

export function TopBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % MESSAGES.length),
      4000,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="border-b border-border/60 bg-onyx">
      <p
        key={index}
        className="animate-in fade-in mx-auto max-w-7xl px-4 py-2 text-center text-[11px] tracking-[0.22em] text-muted-foreground uppercase duration-700"
      >
        {MESSAGES[index]}
      </p>
    </div>
  );
}
