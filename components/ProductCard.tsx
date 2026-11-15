import Link from "next/link";
import ProductImage from "./ProductImage";
import { formatearPrecio, type Producto } from "@/lib/productos";

export default function ProductCard({ producto }: { producto: Producto }) {
  return (
    <Link
      href={`/catalogo/${producto.id}`}
      className="flex flex-col overflow-hidden rounded-2xl border border-rosa/60 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-square bg-celeste/30">
        <ProductImage src={producto.imagen} alt={producto.nombre} />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <span className="text-xs uppercase tracking-wide text-rosa-fuerte">
          {producto.categoria}
        </span>
        <h3 className="font-medium leading-snug">{producto.nombre}</h3>
        <p className="mt-auto pt-2 font-semibold">
          {formatearPrecio(producto.precio)}
        </p>
      </div>
    </Link>
  );
}
