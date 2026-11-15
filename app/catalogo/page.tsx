import type { Metadata } from "next";
import CatalogoCliente from "@/components/CatalogoCliente";

export const metadata: Metadata = { title: "Catálogo" };

export default function CatalogoPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-rosa-fuerte">Catálogo</h1>
      <p className="mt-2 mb-6">
        Elige tu producto y talla, agrégalo al carrito y pídelo por Instagram.
      </p>
      <CatalogoCliente />
    </section>
  );
}
