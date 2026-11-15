"use client";

import Image from "next/image";
import { useState } from "react";

// El contenedor padre debe ser "relative" y tener tamaño (ej. aspect-square).
export default function ProductImage({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const [fallo, setFallo] = useState(false);

  if (fallo) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="flex h-full w-full items-center justify-center text-5xl"
      >
        🧸
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="(min-width: 768px) 25vw, 50vw"
      className="object-cover"
      onError={() => setFallo(true)}
    />
  );
}
