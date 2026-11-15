"use client";

import Link from "next/link";
import { useState } from "react";
import { useCarrito } from "@/lib/carrito";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/como-pedir", label: "Cómo pedir" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const items = useCarrito();
  const cantidad = items.reduce((s, it) => s + it.cantidad, 0);
  const etiquetaCarrito = cantidad > 0 ? `Carrito (${cantidad})` : "Carrito";

  return (
    <header className="sticky top-0 z-50 border-b border-rosa/60 bg-crema/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-semibold text-rosa-fuerte">
          My First Steps
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-rosa-fuerte">
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/carrito"
              className="rounded-full bg-rosa-fuerte px-4 py-1.5 text-white hover:opacity-90"
            >
              {etiquetaCarrito}
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="rounded-md border border-rosa px-3 py-1 md:hidden"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-rosa/60 px-4 py-2 md:hidden">
          {[...links, { href: "/carrito", label: etiquetaCarrito }].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block py-2"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
