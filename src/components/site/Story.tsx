import atelier from "@/assets/atelier.jpg";

const TESTIMONIOS = [
  {
    quote:
      "Compré el solitario para mi compromiso y la asesoría fue impecable. Llegó en dos días y con certificado.",
    author: "María F., Valencia",
  },
  {
    quote:
      "La cadena cubana es exactamente como en las fotos. Peso real, oro real. Ya es mi tercera compra.",
    author: "Jesús R., Caracas",
  },
  {
    quote:
      "Aparté los zarcillos de perla y pude pagarlos en dos meses. Trato serio y muy discreto.",
    author: "Andreína L., Maracaibo",
  },
];

export function Story() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <img
          src={atelier}
          alt="Interior del taller y salón de exhibición de Kilates"
          loading="lazy"
          width={1200}
          height={900}
          className="w-full border border-border object-cover"
        />
        <div>
          <p className="eyebrow">La casa</p>
          <h2 className="mt-3 font-display text-4xl font-light md:text-5xl">
            Diez años construyendo confianza y elegancia
          </h2>
          <div className="gold-rule mt-5 w-32" />
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Nacimos con el objetivo de responder a las necesidades de los
            venezolanos en un espacio seguro y transparente. Con el paso del
            tiempo, hemos ampliado nuestros servicios para acompañarte en cada
            etapa: compra, venta, restauración y fabricación de joyas finas en
            oro y plata ley 925.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Nos reinventamos y adaptamos día a día a lo que buscas, garantizando
            que cada pieza sea rigurosamente verificada antes de llegar a tus
            manos.
          </p>

          <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-8">
            {[
              ["20+", "Años de oficio"],
              ["4.000+", "Clientes atendidos"],
              ["100%", "Piezas certificadas"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-display text-3xl text-gold">{value}</dt>
                <dd className="mt-1 text-xs tracking-[0.15em] text-muted-foreground uppercase">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-20 grid gap-6 md:grid-cols-3">
        {TESTIMONIOS.map((t) => (
          <figure key={t.author} className="border border-border/70 bg-card p-6">
            <blockquote className="font-display text-xl leading-snug font-light">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-4 text-[11px] tracking-[0.2em] text-gold uppercase">
              {t.author}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
