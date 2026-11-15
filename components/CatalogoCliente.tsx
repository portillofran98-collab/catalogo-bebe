"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import CatalogoSkeleton from "./CatalogoSkeleton";
import { categorias, type Categoria, type Producto } from "@/lib/productos";

type Estado = "cargando" | "listo" | "error";
type Filtro = Categoria | "Todos";

const filtros: Filtro[] = ["Todos", ...categorias];

export default function CatalogoCliente() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [estado, setEstado] = useState<Estado>("cargando");
  const [intento, setIntento] = useState(0);
  const [filtro, setFiltro] = useState<Filtro>("Todos");
  const [busqueda, setBusqueda] = useState("");

  // Consume el Route Handler interno: GET /api/productos
  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/productos", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<{ productos: Producto[] }>;
      })
      .then((data) => {
        setProductos(data.productos);
        setEstado("listo");
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setEstado("error");
      });

    return () => controller.abort();
  }, [intento]);

  function reintentar() {
    setEstado("cargando");
    setIntento((n) => n + 1);
  }

  const texto = busqueda.trim().toLowerCase();
  const visibles = productos.filter(
    (p) =>
      (filtro === "Todos" || p.categoria === filtro) &&
      (texto === "" || p.nombre.toLowerCase().includes(texto)),
  );

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {filtros.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filtro === f}
              onClick={() => setFiltro(f)}
              className={`rounded-full border px-4 py-1.5 text-sm ${
                filtro === f
                  ? "border-rosa-fuerte bg-rosa-fuerte text-white"
                  : "border-rosa bg-white hover:bg-rosa/30"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <input
          type="search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar producto…"
          aria-label="Buscar producto"
          className="w-full rounded-full border border-rosa bg-white px-4 py-2 md:w-64"
        />
      </div>

      {estado === "cargando" && <CatalogoSkeleton />}

      {estado === "error" && (
        <div className="rounded-2xl border border-rosa bg-white p-6 text-center">
          <p className="font-medium">No pudimos cargar los productos.</p>
          <button
            type="button"
            onClick={reintentar}
            className="mt-4 rounded-full bg-rosa-fuerte px-5 py-2 text-white hover:opacity-90"
          >
            Reintentar
          </button>
        </div>
      )}

      {estado === "listo" &&
        (visibles.length === 0 ? (
          <p className="py-10 text-center">
            No hay productos que coincidan con tu búsqueda.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {visibles.map((p) => (
              <ProductCard key={p.id} producto={p} />
            ))}
          </div>
        ))}
    </div>
  );
}
