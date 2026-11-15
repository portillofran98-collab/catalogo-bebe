import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { obtenerProductos } from "@/lib/productos";

export default function Home() {
  const destacados = obtenerProductos().slice(0, 4);

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-rosa-fuerte md:text-5xl">
          Ropita para sus primeros pasos
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg">
          Conjuntos, bodys y accesorios para bebé. Elige lo que te guste y haz
          tu pedido por Instagram.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/catalogo"
            className="rounded-full bg-rosa-fuerte px-6 py-3 font-medium text-white hover:opacity-90"
          >
            Ver catálogo
          </Link>
          <Link
            href="/como-pedir"
            className="rounded-full border border-rosa-fuerte px-6 py-3 font-medium text-rosa-fuerte hover:bg-rosa/30"
          >
            Cómo pedir
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <h2 className="mb-4 text-2xl font-semibold">Destacados</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {destacados.map((p) => (
            <ProductCard key={p.id} producto={p} />
          ))}
        </div>
      </section>
    </>
  );
}
