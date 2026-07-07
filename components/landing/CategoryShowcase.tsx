import { categories } from '@/data/marketplace';

const accents = ['#CCFF00', '#FF2D78', '#0A4CFF', '#844FFF', '#45D6FF', '#FF9E44'];

export function CategoryShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-[#CCFF00]">Catalog taxonomy</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">Browse by production pattern</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-zinc-400">Every item keeps the locked metadata model while previews shift by component family.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <div className="wpx-panel group relative overflow-hidden rounded-3xl p-6 transition hover:-translate-y-1" key={category}>
            <div className="absolute right-5 top-5 h-12 w-12 rounded-2xl opacity-70 blur-xl transition group-hover:opacity-100" style={{ background: accents[index % accents.length] }} />
            <p className="relative text-xl font-semibold text-white">{category}</p>
            <p className="relative mt-2 text-sm leading-6 text-zinc-400">Search, filter, preview, save, and export local mock {category.toLowerCase()} components.</p>
          </div>
        ))}
      </div>
    </section>
  );
}
