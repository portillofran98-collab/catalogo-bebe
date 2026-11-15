"use client";

import { useState } from "react";
import { INSTAGRAM_USER, instagramMensaje } from "@/lib/instagram";

export default function PedirPorInstagram({ mensaje }: { mensaje: string }) {
  const [copiado, setCopiado] = useState<"si" | "no" | null>(null);

  async function pedir() {
    // Instagram no permite pre-llenar el mensaje, así que lo copiamos
    // y la persona solo tiene que pegarlo en el chat.
    const copia = navigator.clipboard?.writeText(mensaje);
    window.open(instagramMensaje, "_blank", "noopener,noreferrer");
    try {
      await copia;
      setCopiado("si");
    } catch {
      setCopiado("no");
    }
  }

  if (!INSTAGRAM_USER) {
    return (
      <p className="rounded-lg bg-celeste/40 p-3 text-sm">
        Falta configurar NEXT_PUBLIC_INSTAGRAM_USER en .env.local.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={pedir}
        className="rounded-full bg-rosa-fuerte px-6 py-3 font-medium text-white hover:opacity-90"
      >
        Pedir por Instagram
      </button>
      <p aria-live="polite" className="min-h-5 text-sm">
        {copiado === "si" &&
          "Pedido copiado. Pégalo en el chat de Instagram y envíalo."}
        {copiado === "no" &&
          "No pudimos copiar el pedido. Escríbelo en el chat de Instagram."}
      </p>
    </div>
  );
}
