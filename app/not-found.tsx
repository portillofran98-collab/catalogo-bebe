import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="text-5xl">🧸</p>
      <h1 className="mt-4 text-2xl font-bold">No encontramos esa página</h1>
      <p className="mt-2">Puede que el producto ya no esté disponible.</p>
      <Link
        href="/catalogo"
        className="mt-6 inline-block rounded-full bg-rosa-fuerte px-6 py-3 font-medium text-white hover:opacity-90"
      >
        Volver al catálogo
      </Link>
    </section>
  );
}
