import Link from 'next/link';
import { MarketplaceCard } from '@/components/marketplace/MarketplaceCard';
import { Badge } from '@/components/marketplace/Badge';
import { catalogStats, featuredCatalogItems, itemsByCategory, marketplaceItems } from '@/data/marketplace';

export function MarketplacePreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-[#FF2D78]">Marketplace</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">Every catalog item is installed into the UI system</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
            The landing, marketplace list, detail pages, previews, categories, export surfaces, and structure views all read from the same local catalog source.
          </p>
        </div>
        <Link href="/marketplace" className="text-sm font-semibold text-[#CCFF00] hover:text-white">View all {catalogStats.totalItems} components →</Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {featuredCatalogItems.slice(0, 3).map((item) => <MarketplaceCard item={item} key={item.id} />)}
      </div>

      <div className="mt-8 rounded-[32px] border border-white/10 bg-black/20 p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-white">Full catalog rail</p>
          <div className="flex flex-wrap gap-2">
            <Badge tone="cyan">{catalogStats.totalCategories} categories</Badge>
            <Badge tone="purple">{catalogStats.previewPatterns.length} preview systems</Badge>
            <Badge tone="orange">{catalogStats.exportFormats.length} export surfaces</Badge>
          </div>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {marketplaceItems.map((item) => (
            <Link key={item.id} href={`/marketplace/${item.slug}`} className="group min-w-56 rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-[#CCFF00]/50 hover:bg-white/[0.06]">
              <p className="text-sm font-semibold text-white group-hover:text-[#CCFF00]">{item.name}</p>
              <p className="mt-2 text-xs text-zinc-500">{item.category} · {item.subCategory}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {itemsByCategory.filter((group) => group.items.length > 0).slice(0, 6).map((group) => (
          <div key={group.category} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-white">{group.category}</p>
              <span className="text-xs text-[#CCFF00]">{group.items.length}</span>
            </div>
            <p className="mt-2 line-clamp-1 text-xs text-zinc-500">{group.items.map((item) => item.name).join(' · ')}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
