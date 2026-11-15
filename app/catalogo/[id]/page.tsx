import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AgregarAlCarrito from "@/components/AgregarAlCarrito";
import ProductImage from "@/components/ProductImage";
import {
  formatearPrecio,
  obtenerProducto,
  obtenerProductos,
} from "@/lib/productos";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return obtenerProductos().map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const producto = obtenerProducto(id);
  return { title: producto?.nombre ?? "Producto" };
}

export default async function ProductoPage({ params }: Props) {
  const { id } = await params;
  const producto = obtenerProducto(id);
  if (!producto) notFound();

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <Link href="/catalogo" className="text-sm text-rosa-fuerte hover:underline">
        ← Volver al catálogo
      </Link>

      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-rosa/60 bg-celeste/30">
          <ProductImage src={producto.imagen} alt={producto.nombre} priority />
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs uppercase tracking-wide text-rosa-fuerte">
            {producto.categoria}
          </span>
          <h1 className="text-3xl font-bold">{producto.nombre}</h1>
          <p className="text-2xl font-semibold">
            {formatearPrecio(producto.precio)}
          </p>
          <p>{producto.descripcion}</p>
          <AgregarAlCarrito id={producto.id} tallas={producto.tallas} />
        </div>
      </div>
    </section>
  );
}
