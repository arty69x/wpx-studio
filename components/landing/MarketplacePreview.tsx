import Link from 'next/link';
import { MarketplaceCard } from '@/components/marketplace/MarketplaceCard';
import { marketplaceItems } from '@/data/marketplace';

export function MarketplacePreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-[#FF2D78]">Marketplace</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">Studio-grade component shelves</h2>
        </div>
        <Link href="/marketplace" className="text-sm font-semibold text-[#CCFF00] hover:text-white">View all components →</Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {marketplaceItems.slice(0, 3).map((item) => <MarketplaceCard item={item} key={item.id} />)}
      </div>
    </section>
  );
}
