import type { Metadata } from "next";
import CarritoCliente from "@/components/CarritoCliente";

export const metadata: Metadata = { title: "Carrito" };

export default function CarritoPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-rosa-fuerte">Tu carrito</h1>
      <CarritoCliente />
    </section>
  );
}
