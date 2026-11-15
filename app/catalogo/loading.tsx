import CatalogoSkeleton from "@/components/CatalogoSkeleton";

export default function Loading() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 h-9 w-48 animate-pulse rounded bg-rosa/40" />
      <CatalogoSkeleton />
    </section>
  );
}
