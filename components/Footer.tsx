import { INSTAGRAM_USER, instagramPerfil } from "@/lib/instagram";

// Sin new Date(): con Cache Components activado, leer la hora en un
// Server Component durante el prerender provoca un error de Next.
export default function Footer() {
  return (
    <footer className="mt-12 border-t border-rosa/60 bg-celeste/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-6 text-center text-sm">
        <p>© My First Steps Baby Clothes</p>
        {INSTAGRAM_USER && (
          <a
            href={instagramPerfil}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-rosa-fuerte hover:underline"
          >
            @{INSTAGRAM_USER} en Instagram
          </a>
        )}
      </div>
    </footer>
  );
}
