import type { Metadata } from "next";
import { INSTAGRAM_USER, instagramMensaje } from "@/lib/instagram";

export const metadata: Metadata = { title: "Contacto" };

export default function ContactoPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-rosa-fuerte">Contacto</h1>
      <p className="mt-4">
        Escríbenos por Instagram para pedidos, tallas y disponibilidad.
      </p>
      {INSTAGRAM_USER ? (
        <a
          href={instagramMensaje}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-full bg-rosa-fuerte px-6 py-3 font-medium text-white hover:opacity-90"
        >
          Escribir a @{INSTAGRAM_USER}
        </a>
      ) : (
        <p className="mt-6 rounded-lg bg-celeste/40 p-3 text-sm">
          Falta configurar NEXT_PUBLIC_INSTAGRAM_USER en .env.local.
        </p>
      )}
    </section>
  );
}
