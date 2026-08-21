import anillo1 from "@/assets/anillo-1.jpg";
import anillo2 from "@/assets/anillo-2.jpg";
import anillo3 from "@/assets/anillo-3.jpg";
import cadena1 from "@/assets/cadena-1.jpg";
import cadena2 from "@/assets/cadena-2.jpg";
import cadena3 from "@/assets/cadena-3.jpg";
import brazalete1 from "@/assets/brazalete-1.jpg";
import brazalete2 from "@/assets/brazalete-2.jpg";
import zarcillo1 from "@/assets/zarcillo-1.jpg";
import zarcillo2 from "@/assets/zarcillo-2.jpg";
import zarcillo3 from "@/assets/zarcillo-3.jpg";
import dije1 from "@/assets/dije-1.jpg";
import dije2 from "@/assets/dije-2.jpg";
import reloj1 from "@/assets/reloj-1.jpg";
import reloj2 from "@/assets/reloj-2.jpg";

export type CategoryId =
  | "anillos"
  | "cadenas"
  | "brazaletes"
  | "zarcillos"
  | "dijes"
  | "relojes";

export type Material =
  | "Oro 18k"
  | "Oro 14k"
  | "Oro blanco 18k"
  | "Oro rosa 18k"
  | "Plata 925";

export type Product = {
  id: string;
  name: string;
  category: CategoryId;
  material: Material;
  /** Peso aproximado en gramos. */
  weight: number;
  detail: string;
  description: string;
  price: number;
  image: string;
  inStock: boolean;
  isNew?: boolean;
};

export const CATEGORIES: {
  id: CategoryId;
  label: string;
  blurb: string;
  image: string;
}[] = [
  {
    id: "anillos",
    label: "Anillos",
    blurb: "Solitarios, alianzas y piezas con gema",
    image: anillo1,
  },
  {
    id: "cadenas",
    label: "Cadenas",
    blurb: "Tejidos clásicos en oro y plata",
    image: cadena1,
  },
  {
    id: "brazaletes",
    label: "Brazaletes",
    blurb: "Rígidos, tennis y esclavas",
    image: brazalete1,
  },
  {
    id: "zarcillos",
    label: "Zarcillos",
    blurb: "Argollas, topos y colgantes",
    image: zarcillo1,
  },
  {
    id: "dijes",
    label: "Dijes",
    blurb: "Detalles para personalizar su cadena",
    image: dije1,
  },
  {
    id: "relojes",
    label: "Relojes",
    blurb: "Piezas de tiempo seleccionadas",
    image: reloj1,
  },
];

export const MATERIALS: Material[] = [
  "Oro 18k",
  "Oro 14k",
  "Oro blanco 18k",
  "Oro rosa 18k",
  "Plata 925",
];

export const PRODUCTS: Product[] = [
  // Anillos
  {
    id: "an-01",
    name: "Solitario Aurora",
    category: "anillos",
    material: "Oro 18k",
    weight: 3.4,
    detail: "Diamante central 1.0 ct",
    description:
      "Solitario de seis garras en oro amarillo 18 quilates con diamante talla brillante certificado. Una pieza pensada para el compromiso.",
    price: 4850,
    image: anillo1,
    inStock: true,
    isNew: true,
  },
  {
    id: "an-02",
    name: "Alianza Eterna",
    category: "anillos",
    material: "Oro 18k",
    weight: 2.6,
    detail: "Pavé completo de circonias",
    description:
      "Alianza de banda continua con engaste pavé alrededor de todo el aro. Brillo uniforme desde cualquier ángulo.",
    price: 1290,
    image: anillo2,
    inStock: true,
  },
  {
    id: "an-03",
    name: "Anillo Esmeralda Real",
    category: "anillos",
    material: "Oro rosa 18k",
    weight: 4.1,
    detail: "Esmeralda talla octagonal",
    description:
      "Oro rosa 18k con esmeralda central talla octagonal y dos diamantes laterales. Montura baja, cómoda para uso diario.",
    price: 3600,
    image: anillo3,
    inStock: true,
  },
  {
    id: "an-04",
    name: "Solitario Clásico 14k",
    category: "anillos",
    material: "Oro 14k",
    weight: 2.9,
    detail: "Diamante 0.5 ct",
    description:
      "Versión en oro 14 quilates del solitario clásico, con diamante de media quilate y acabado pulido espejo.",
    price: 2150,
    image: anillo1,
    inStock: true,
  },
  {
    id: "an-05",
    name: "Media Alianza Plata",
    category: "anillos",
    material: "Plata 925",
    weight: 2.2,
    detail: "Pavé frontal",
    description:
      "Plata 925 con baño de rodio y pavé en la mitad frontal del aro. Ideal para combinar en anillos apilados.",
    price: 180,
    image: anillo2,
    inStock: true,
  },
  {
    id: "an-06",
    name: "Anillo Gema Verde 14k",
    category: "anillos",
    material: "Oro 14k",
    weight: 3.2,
    detail: "Piedra sintética verde",
    description:
      "Diseño vintage con gema verde central y hombros trabajados a mano. Edición limitada del taller.",
    price: 940,
    image: anillo3,
    inStock: false,
  },

  // Cadenas
  {
    id: "ca-01",
    name: "Cadena Cubana Maestra",
    category: "cadenas",
    material: "Oro 18k",
    weight: 42,
    detail: "60 cm · 8 mm",
    description:
      "Tejido cubano macizo en oro 18k con broche de seguridad reforzado. Pieza de presencia, acabado espejo.",
    price: 6900,
    image: cadena1,
    inStock: true,
    isNew: true,
  },
  {
    id: "ca-02",
    name: "Cadena Cubana 14k",
    category: "cadenas",
    material: "Oro 14k",
    weight: 28,
    detail: "55 cm · 6 mm",
    description:
      "Versión más ligera del tejido cubano en oro 14k, equilibrada entre volumen y uso diario.",
    price: 3400,
    image: cadena1,
    inStock: true,
  },
  {
    id: "ca-03",
    name: "Cadena Veneciana Fina",
    category: "cadenas",
    material: "Oro 18k",
    weight: 4.8,
    detail: "45 cm · 1.2 mm",
    description:
      "Cadena fina para llevar sola o con dije. Tejido veneciano flexible y resistente.",
    price: 780,
    image: cadena2,
    inStock: true,
  },
  {
    id: "ca-04",
    name: "Cadena Cordón 14k",
    category: "cadenas",
    material: "Oro 14k",
    weight: 6.5,
    detail: "50 cm · 2 mm",
    description:
      "Tejido cordón torsionado que refleja la luz en todo su recorrido. Broche de mosquetón.",
    price: 620,
    image: cadena2,
    inStock: true,
  },
  {
    id: "ca-05",
    name: "Gargantilla Círculo",
    category: "cadenas",
    material: "Plata 925",
    weight: 5.1,
    detail: "42 cm con pendiente fijo",
    description:
      "Gargantilla minimalista en plata 925 rodiada con círculo central soldado a la cadena.",
    price: 145,
    image: cadena3,
    inStock: true,
  },
  {
    id: "ca-06",
    name: "Cadena Rolo Plata",
    category: "cadenas",
    material: "Plata 925",
    weight: 7.2,
    detail: "60 cm · 2.5 mm",
    description:
      "Cadena rolo en plata 925, base perfecta para dijes de mayor tamaño.",
    price: 110,
    image: cadena3,
    inStock: false,
  },

  // Brazaletes
  {
    id: "br-01",
    name: "Tennis Luminaire",
    category: "brazaletes",
    material: "Oro 18k",
    weight: 14.5,
    detail: "18 cm · 36 piedras",
    description:
      "Brazalete tennis con línea continua de piedras engastadas en garras de oro 18k y cierre doble de seguridad.",
    price: 5250,
    image: brazalete1,
    inStock: true,
    isNew: true,
  },
  {
    id: "br-02",
    name: "Tennis 14k",
    category: "brazaletes",
    material: "Oro 14k",
    weight: 11.8,
    detail: "17 cm · 32 piedras",
    description:
      "El mismo diseño tennis en oro 14 quilates, más accesible y con idéntico brillo.",
    price: 2980,
    image: brazalete1,
    inStock: true,
  },
  {
    id: "br-03",
    name: "Brazalete Rígido Pulido",
    category: "brazaletes",
    material: "Oro 18k",
    weight: 12.2,
    detail: "Diámetro 6.2 cm",
    description:
      "Brazalete rígido de sección redonda con acabado espejo. Silueta limpia, se lleva solo o apilado.",
    price: 2400,
    image: brazalete2,
    inStock: true,
  },
  {
    id: "br-04",
    name: "Esclava Rosa",
    category: "brazaletes",
    material: "Oro rosa 18k",
    weight: 9.4,
    detail: "Diámetro 6 cm",
    description:
      "Esclava en oro rosa 18k, tono cálido que favorece todos los tonos de piel.",
    price: 1980,
    image: brazalete2,
    inStock: true,
  },
  {
    id: "br-05",
    name: "Brazalete Plata Espejo",
    category: "brazaletes",
    material: "Plata 925",
    weight: 10.1,
    detail: "Diámetro 6 cm",
    description:
      "Plata 925 pulida a espejo, ligera y resistente. Incluye estuche de la casa.",
    price: 165,
    image: brazalete2,
    inStock: true,
  },

  // Zarcillos
  {
    id: "za-01",
    name: "Argollas Imperiales",
    category: "zarcillos",
    material: "Oro 18k",
    weight: 6.8,
    detail: "Diámetro 4 cm",
    description:
      "Argollas trabajadas con relieve tallado a mano. Cierre de bisagra oculto.",
    price: 1450,
    image: zarcillo1,
    inStock: true,
  },
  {
    id: "za-02",
    name: "Argollas 14k",
    category: "zarcillos",
    material: "Oro 14k",
    weight: 4.2,
    detail: "Diámetro 3 cm",
    description:
      "Argollas medianas en oro 14k, livianas para uso continuo.",
    price: 690,
    image: zarcillo1,
    inStock: true,
  },
  {
    id: "za-03",
    name: "Perlas Colgantes",
    category: "zarcillos",
    material: "Oro 18k",
    weight: 5.6,
    detail: "Perla cultivada 12 mm",
    description:
      "Zarcillos colgantes con perla cultivada y casquillo pavé en oro 18k. Pieza de gala.",
    price: 2100,
    image: zarcillo2,
    inStock: true,
    isNew: true,
  },
  {
    id: "za-04",
    name: "Perlas Clásicas 14k",
    category: "zarcillos",
    material: "Oro 14k",
    weight: 3.9,
    detail: "Perla 9 mm",
    description:
      "Versión sobria de nuestros colgantes de perla, con montura en oro 14k.",
    price: 880,
    image: zarcillo2,
    inStock: false,
  },
  {
    id: "za-05",
    name: "Topos Solitarios",
    category: "zarcillos",
    material: "Oro blanco 18k",
    weight: 2.1,
    detail: "0.30 ct por pieza",
    description:
      "Topos de diamante en oro blanco 18k con cierre de rosca. El regalo clásico atemporal.",
    price: 2650,
    image: zarcillo3,
    inStock: true,
  },
  {
    id: "za-06",
    name: "Topos Plata Brillante",
    category: "zarcillos",
    material: "Plata 925",
    weight: 1.6,
    detail: "Circonia 6 mm",
    description:
      "Topos en plata 925 rodiada con circonia de alta talla. Primera joya ideal.",
    price: 95,
    image: zarcillo3,
    inStock: true,
  },

  // Dijes
  {
    id: "di-01",
    name: "Dije Corazón Pulido",
    category: "dijes",
    material: "Oro 18k",
    weight: 3.8,
    detail: "2.2 cm · con diamante",
    description:
      "Corazón volumétrico en oro 18k con diamante en el vértice. Se entrega sin cadena.",
    price: 1150,
    image: dije1,
    inStock: true,
  },
  {
    id: "di-02",
    name: "Corazón 14k",
    category: "dijes",
    material: "Oro 14k",
    weight: 2.7,
    detail: "1.8 cm",
    description:
      "Corazón liso en oro 14k, superficie apta para grabado personalizado sin costo.",
    price: 540,
    image: dije1,
    inStock: true,
  },
  {
    id: "di-03",
    name: "Cruz Onyx",
    category: "dijes",
    material: "Oro 18k",
    weight: 5.2,
    detail: "3 cm · centro negro",
    description:
      "Cruz en oro 18k con centro en acabado negro y piedras engastadas. Con reasa reforzada.",
    price: 1680,
    image: dije2,
    inStock: true,
    isNew: true,
  },
  {
    id: "di-04",
    name: "Cruz Plata 925",
    category: "dijes",
    material: "Plata 925",
    weight: 4.1,
    detail: "2.6 cm",
    description:
      "Cruz en plata 925 con contraste oxidado. Se puede combinar con cualquiera de nuestras cadenas.",
    price: 120,
    image: dije2,
    inStock: true,
  },

  // Relojes
  {
    id: "re-01",
    name: "Reloj Dorado Heritage",
    category: "relojes",
    material: "Oro 18k",
    weight: 96,
    detail: "38 mm · esfera blanca",
    description:
      "Caja de 38 mm con baño de oro, esfera blanca lacada, fecha a las tres y movimiento suizo de cuarzo.",
    price: 2480,
    image: reloj1,
    inStock: true,
  },
  {
    id: "re-02",
    name: "Heritage Dama 32 mm",
    category: "relojes",
    material: "Oro 14k",
    weight: 74,
    detail: "32 mm · esfera blanca",
    description:
      "La versión de 32 mm del Heritage, con brazalete ajustable y cristal de zafiro.",
    price: 1890,
    image: reloj1,
    inStock: false,
  },
  {
    id: "re-03",
    name: "Reloj Onyx Acero",
    category: "relojes",
    material: "Plata 925",
    weight: 102,
    detail: "40 mm · esfera negra",
    description:
      "Esfera negra mate, índices aplicados y segundero rojo. Resistencia al agua 5 ATM.",
    price: 620,
    image: reloj2,
    inStock: true,
  },
  {
    id: "re-04",
    name: "Onyx Slim",
    category: "relojes",
    material: "Plata 925",
    weight: 88,
    detail: "36 mm · perfil delgado",
    description:
      "Perfil ultradelgado de 6.8 mm, pensado para llevar bajo el puño de la camisa.",
    price: 540,
    image: reloj2,
    inStock: true,
  },
];
