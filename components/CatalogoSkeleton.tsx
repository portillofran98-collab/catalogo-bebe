export default function CatalogoSkeleton() {
  return (
    <div
      className="grid grid-cols-2 gap-4 md:grid-cols-4"
      aria-busy="true"
      aria-label="Cargando productos"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border border-rosa/40 bg-white"
        >
          <div className="aspect-square animate-pulse bg-rosa/30" />
          <div className="space-y-2 p-3">
            <div className="h-3 w-1/3 animate-pulse rounded bg-rosa/30" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-rosa/30" />
            <div className="h-4 w-1/4 animate-pulse rounded bg-rosa/30" />
          </div>
        </div>
      ))}
    </div>
  );
}
