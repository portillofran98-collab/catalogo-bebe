import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Cómo pedir" };

const pasos = [
  {
    titulo: "Elige tus productos",
    texto: "Entra al catálogo, escoge la talla y agrégalos al carrito.",
  },
  {
    titulo: "Revisa tu carrito",
    texto: "Ajusta cantidades y confirma que todo esté como lo quieres.",
  },
  {
    titulo: "Pulsa “Pedir por Instagram”",
    texto:
      "Copiamos tu pedido y abrimos el chat de la tienda en Instagram.",
  },
  {
    titulo: "Pega el mensaje y envíalo",
    texto:
      "Te confirmaremos disponibilidad, forma de pago y entrega por mensaje.",
  },
];

export default function ComoPedirPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-rosa-fuerte">Cómo pedir</h1>
      <ol className="mt-6 flex flex-col gap-4">
        {pasos.map((p, i) => (
          <li
            key={p.titulo}
            className="flex gap-4 rounded-2xl border border-rosa/60 bg-white p-4"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rosa-fuerte font-semibold text-white">
              {i + 1}
            </span>
            <div>
              <h2 className="font-semibold">{p.titulo}</h2>
              <p>{p.texto}</p>
            </div>
          </li>
        ))}
      </ol>
      <Link
        href="/catalogo"
        className="mt-8 inline-block rounded-full bg-rosa-fuerte px-6 py-3 font-medium text-white hover:opacity-90"
      >
        Ir al catálogo
      </Link>
    </section>
  );
}
