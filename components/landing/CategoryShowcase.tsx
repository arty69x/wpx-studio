import { categories } from '@/data/marketplace';

export function CategoryShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <h2 className="mb-8 text-3xl font-semibold text-white md:text-4xl">Browse by production pattern</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/25 hover:bg-white/[0.05]" key={category}>
            <p className="text-xl font-semibold text-white">{category}</p>
            <p className="mt-2 text-sm leading-6 text-zinc-400">Search, filter, preview, save, and export local mock {category.toLowerCase()} components.</p>
          </div>
        ))}
      </div>
    </section>
  );
}
