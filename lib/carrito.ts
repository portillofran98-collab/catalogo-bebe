import { useSyncExternalStore } from "react";

export interface ItemCarrito {
  id: string;
  talla: string;
  cantidad: number;
}

// Carrito guardado en localStorage y expuesto con useSyncExternalStore:
// evita errores de hidratación (el servidor siempre ve el carrito vacío).
const KEY = "mfs-carrito";
const VACIO: ItemCarrito[] = [];
const listeners = new Set<() => void>();
let cache: { raw: string | null; items: ItemCarrito[] } = {
  raw: null,
  items: VACIO,
};

function leerAlmacen(): ItemCarrito[] {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    return cache.items;
  }
  if (raw === cache.raw) return cache.items;

  let items: ItemCarrito[] = VACIO;
  if (raw) {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) items = parsed as ItemCarrito[];
    } catch {
      items = VACIO;
    }
  }
  cache = { raw, items };
  return items;
}

function guardar(items: ItemCarrito[]) {
  const raw = JSON.stringify(items);
  try {
    window.localStorage.setItem(KEY, raw);
  } catch {
    // Modo privado o almacenamiento bloqueado: el carrito vive solo en memoria.
  }
  cache = { raw, items };
  listeners.forEach((l) => l());
}

function suscribir(callback: () => void) {
  listeners.add(callback);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) callback();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

export function agregarAlCarrito(id: string, talla: string) {
  const items = leerAlmacen();
  const i = items.findIndex((it) => it.id === id && it.talla === talla);
  if (i >= 0) {
    guardar(
      items.map((it, idx) =>
        idx === i ? { ...it, cantidad: it.cantidad + 1 } : it,
      ),
    );
  } else {
    guardar([...items, { id, talla, cantidad: 1 }]);
  }
}

export function cambiarCantidad(id: string, talla: string, cantidad: number) {
  const items = leerAlmacen();
  if (cantidad <= 0) {
    guardar(items.filter((it) => !(it.id === id && it.talla === talla)));
    return;
  }
  guardar(
    items.map((it) =>
      it.id === id && it.talla === talla ? { ...it, cantidad } : it,
    ),
  );
}

export function quitarDelCarrito(id: string, talla: string) {
  cambiarCantidad(id, talla, 0);
}

export function vaciarCarrito() {
  guardar([]);
}

export function useCarrito(): ItemCarrito[] {
  return useSyncExternalStore(suscribir, leerAlmacen, () => VACIO);
}
