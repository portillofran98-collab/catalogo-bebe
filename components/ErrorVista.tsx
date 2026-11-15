"use client";

import { useEffect } from "react";

export default function ErrorVista({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="text-5xl">😿</p>
      <h1 className="mt-4 text-2xl font-bold">Algo salió mal</h1>
      <p className="mt-2">
        No pudimos mostrar esta página. Intenta de nuevo en unos segundos.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-full bg-rosa-fuerte px-6 py-3 font-medium text-white hover:opacity-90"
      >
        Reintentar
      </button>
    </section>
  );
}
