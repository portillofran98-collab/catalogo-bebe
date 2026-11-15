"use client";

import Link from "next/link";
import {
  cambiarCantidad,
  quitarDelCarrito,
  useCarrito,
  vaciarCarrito,
} from "@/lib/carrito";
import { formatearPrecio, obtenerProducto } from "@/lib/productos";
import PedirPorInstagram from "./PedirPorInstagram";

export default function CarritoCliente() {
  const items = useCarrito();

  const lineas = items.flatMap((it) => {
    const producto = obtenerProducto(it.id);
    return producto ? [{ ...it, producto }] : [];
  });

  if (lineas.length === 0) {
    return (
      <div className="rounded-2xl border border-rosa/60 bg-white p-8 text-center">
        <p className="text-4xl">🛍️</p>
        <p className="mt-3">Tu carrito está vacío.</p>
        <Link
          href="/catalogo"
          className="mt-5 inline-block rounded-full bg-rosa-fuerte px-6 py-3 font-medium text-white hover:opacity-90"
        >
          Ver catálogo
        </Link>
      </div>
    );
  }

  const total = lineas.reduce(
    (suma, l) => suma + (l.producto.precio ?? 0) * l.cantidad,
    0,
  );
  const hayPorConsultar = lineas.some((l) => l.producto.precio === null);

  const mensaje = [
    "¡Hola! Quisiera hacer este pedido:",
    ...lineas.map(
      (l) => `- ${l.cantidad} x ${l.producto.nombre} (talla ${l.talla})`,
    ),
  ].join("\n");

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-3">
        {lineas.map((l) => (
          <li
            key={`${l.id}-${l.talla}`}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-rosa/60 bg-white p-4"
          >
            <div>
              <p className="font-medium">{l.producto.nombre}</p>
              <p className="text-sm">
                Talla {l.talla} · {formatearPrecio(l.producto.precio)}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Quitar una unidad"
                onClick={() => cambiarCantidad(l.id, l.talla, l.cantidad - 1)}
                className="h-8 w-8 rounded-full border border-rosa hover:bg-rosa/30"
              >
                −
              </button>
              <span className="w-6 text-center">{l.cantidad}</span>
              <button
                type="button"
                aria-label="Agregar una unidad"
                onClick={() => cambiarCantidad(l.id, l.talla, l.cantidad + 1)}
                className="h-8 w-8 rounded-full border border-rosa hover:bg-rosa/30"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => quitarDelCarrito(l.id, l.talla)}
                className="ml-2 text-sm text-rosa-fuerte underline"
              >
                Quitar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="rounded-2xl bg-celeste/40 p-4">
        <p className="text-lg font-semibold">
          Total: ${total.toFixed(2)}
          {hayPorConsultar && " + productos por consultar"}
        </p>
        {hayPorConsultar && (
          <p className="mt-1 text-sm">
            Algunos productos aún no tienen precio publicado; te lo confirmamos
            por Instagram.
          </p>
        )}
      </div>

      <PedirPorInstagram mensaje={mensaje} />

      <button
        type="button"
        onClick={vaciarCarrito}
        className="self-start text-sm underline"
      >
        Vaciar carrito
      </button>
    </div>
  );
}
