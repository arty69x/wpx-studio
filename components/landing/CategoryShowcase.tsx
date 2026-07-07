import { itemsByCategory } from '@/data/marketplace';

const accents = ['#CCFF00', '#FF2D78', '#0A4CFF', '#844FFF', '#45D6FF', '#FF9E44'];

export function CategoryShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-[#CCFF00]">Catalog taxonomy</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">Browse by production pattern</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-zinc-400">Every category card is generated from the same marketplace catalog used by cards, detail pages, and related components.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {itemsByCategory.map((group, index) => (
          <div className="wpx-panel group relative overflow-hidden rounded-3xl p-6 transition hover:-translate-y-1" key={group.category}>
            <div className="absolute right-5 top-5 h-12 w-12 rounded-2xl opacity-70 blur-xl transition group-hover:opacity-100" style={{ background: accents[index % accents.length] }} />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-xl font-semibold text-white">{group.category}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{group.items.length > 0 ? group.items.slice(0, 3).map((item) => item.subCategory).join(' · ') : 'Ready for future local mock items'}</p>
              </div>
              <span className="rounded-full border border-[#CCFF00]/30 bg-[#CCFF00]/10 px-3 py-1 text-xs font-semibold text-[#CCFF00]">{group.items.length}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
