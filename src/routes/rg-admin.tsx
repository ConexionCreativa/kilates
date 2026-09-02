import { createFileRoute } from "@tanstack/react-router";
import { AdminApp } from "@/components/admin/AdminApp";

export const Route = createFileRoute("/rg-admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Realgestión Ecommerce | Back office" },
      {
        name: "description",
        content:
          "Panel de administración Realgestión Ecommerce: productos, precios, imágenes, categorías y datos de contacto.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Realgestión Ecommerce | Back office" },
      {
        property: "og:description",
        content: "Administre el catálogo y la información de la tienda.",
      },
    ],
  }),
  component: AdminApp,
});
