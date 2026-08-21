# Kilates — Landing page tipo catálogo de joyería de lujo

Una sola página (con rutas secundarias) que funciona como catálogo navegable de piezas de joyería, con la mecánica de Distribuidora Gran Feria (filtros por categoría, grid de productos, carrito y pedido por WhatsApp) pero con estética de alta joyería: negro profundo, oro, tipografía serif fina.

## Estilo visual

- Paleta: negro #0d0d0d / #1a1a1a, oro #c9a84c, oro claro #f0d78c, textos champán.
- Tipografía: Cormorant Garamond para títulos, Karla para el cuerpo.
- Detalles de lujo: bordes finos dorados, degradado dorado en acentos, mucho aire, imágenes grandes con hover suave, sin sombras pesadas ni esquinas muy redondeadas.

## Estructura de la página

1. **Barra superior fina** — mensaje rotativo: envíos nacionales, garantía de autenticidad, atención por WhatsApp.
2. **Header fijo** — logo tipográfico "Kilates", navegación (Colección, Categorías, Nosotros, Contacto), buscador e ícono de carrito con contador.
3. **Hero** — imagen editorial de joyería sobre fondo negro, titular serif grande, subtítulo y dos accesos: "Ver colección" y "Asesoría por WhatsApp".
4. **Tira de categorías** — Anillos, Cadenas, Brazaletes, Zarcillos, Dijes, Relojes, con imagen y filtro al hacer clic.
5. **Catálogo (núcleo)** —
   - Filtros por categoría en píldoras doradas, buscador por nombre, orden por precio y filtro por material (oro 18k, oro 14k, plata 925).
   - Grid responsive de tarjetas: foto, categoría, nombre, material/quilates, peso en gramos, precio, badge "Agotado" o "Nuevo", botón "Agregar".
   - Contador de piezas disponibles, agrupado por categoría como en Gran Feria.
6. **Ficha de pieza** — modal con galería, descripción, especificaciones y selector de cantidad.
7. **Sección de confianza** — certificación, garantía, envío asegurado, apartado/reserva.
8. **Nosotros / historia breve** + testimonios cortos.
9. **Footer** — datos de contacto, ubicación, redes, horarios.
10. **Botón flotante de WhatsApp**.

## Carrito y pedido

- Carrito lateral (drawer) con lista de piezas, cantidades, subtotal y total.
- Persistencia en el navegador (localStorage) para no perder la selección.
- Botón "Enviar pedido por WhatsApp": arma un mensaje con las piezas, cantidades y total, y abre wa.me con el número de la joyería.

## Contenido

Se carga un catálogo demo de ~30 piezas con imágenes generadas (anillos, cadenas, brazaletes, zarcillos, dijes, relojes), precios y especificaciones realistas, en un archivo de datos fácil de editar o reemplazar después por tu lista real.

## Detalles técnicos

- Ruta principal en `src/routes/index.tsx` (reemplaza el placeholder); rutas `/coleccion` (catálogo completo con filtros por URL) y `/contacto`, cada una con su propio `head()` SEO en español.
- Tokens de color y radios en `src/styles.css` (`@theme inline`, oklch); fuentes Cormorant Garamond + Karla vía `<link>` en `__root.tsx`.
- Datos en `src/data/products.ts` tipados; catálogo, filtros y orden con estado en cliente (`useMemo`).
- Carrito con contexto React + localStorage; número de WhatsApp en una constante de configuración.
- Componentes shadcn existentes (sheet, dialog, badge, input, select) restilizados con las variantes doradas; imágenes generadas a `src/assets`, con `loading="lazy"` y `alt` descriptivo.
- Sin backend: todo estático y rápido. Si más adelante quieres administrar productos desde la web, se puede añadir Lovable Cloud.
