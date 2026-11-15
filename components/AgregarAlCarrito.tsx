"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { agregarAlCarrito } from "@/lib/carrito";

export default function AgregarAlCarrito({
  id,
  tallas,
}: {
  id: string;
  tallas: string[];
}) {
  const [talla, setTalla] = useState(tallas[0]);
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    if (!agregado) return;
    const t = setTimeout(() => setAgregado(false), 2500);
    return () => clearTimeout(t);
  }, [agregado]);

  return (
    <div className="mt-2 flex flex-col gap-4">
      <div>
        <p className="mb-2 text-sm font-medium">Talla</p>
        <div className="flex flex-wrap gap-2">
          {tallas.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={talla === t}
              onClick={() => setTalla(t)}
              className={`rounded-full border px-4 py-1.5 text-sm ${
                talla === t
                  ? "border-rosa-fuerte bg-rosa-fuerte text-white"
                  : "border-rosa bg-white hover:bg-rosa/30"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          agregarAlCarrito(id, talla);
          setAgregado(true);
        }}
        className="rounded-full bg-rosa-fuerte px-6 py-3 font-medium text-white hover:opacity-90"
      >
        Agregar al carrito
      </button>

      <p aria-live="polite" className="min-h-6 text-sm">
        {agregado && (
          <>
            ¡Agregado!{" "}
            <Link href="/carrito" className="font-medium text-rosa-fuerte underline">
              Ver carrito
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
