'use client';

import Link from 'next/link';
import { BrandMark } from '@/components/brand/BrandMark';
import { useMemo, useState } from 'react';
import { categories, marketplaceItems } from '@/data/marketplace';
import { CategoryTabs } from '@/components/marketplace/CategoryTabs';
import { MarketplaceCard } from '@/components/marketplace/MarketplaceCard';
import { MarketplaceFilters } from '@/components/marketplace/MarketplaceFilters';

export default function MarketplacePage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [subcategory, setSubcategory] = useState('All');
  const [sort, setSort] = useState('Featured');

  const filteredItems = useMemo(() => {
    return marketplaceItems
      .filter((item) => category === 'All' || item.category === category)
      .filter((item) => subcategory === 'All' || item.subCategory === subcategory)
      .filter((item) => `${item.name} ${item.category} ${item.subCategory} ${item.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => (sort === 'Name' ? a.name.localeCompare(b.name) : 0));
  }, [category, query, sort, subcategory]);

  return (
    <main className="min-h-screen bg-[#05070D] text-white">
      <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#05070D]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <BrandMark compact />
          <span className="text-sm text-zinc-400">{marketplaceItems.length} local components</span>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8 wpx-panel rounded-[32px] p-6">
          <p className="text-sm uppercase tracking-[0.25em] text-[#CCFF00]">Component marketplace</p>
          <div className="mt-3 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Browse production-ready UI components.</h1>
              <p className="mt-3 max-w-2xl text-zinc-400">Search the locked local catalog, preview motion states, save mock components, and inspect export surfaces.</p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
              {categories.slice(0, 4).map((item) => <span key={item} className="rounded-full border border-white/10 px-3 py-1">{item}</span>)}
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-3 md:flex-row">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ask WPX to find a carousel, reveal, nav, layout, or background..."
              className="min-h-12 flex-1 rounded-2xl border border-white/10 bg-black/30 px-4 text-white outline-none transition placeholder:text-zinc-600 focus:ring-2 focus:ring-[#CCFF00]"
            />
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-2xl border border-white/10 bg-black/30 px-4 text-white">
              <option>Featured</option>
              <option>Name</option>
            </select>
          </div>
        </div>

        <CategoryTabs category={category} setCategory={setCategory} subcategory={subcategory} setSubcategory={setSubcategory} />

        <div className="mt-8 grid gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
          <MarketplaceFilters />
          <MarketplaceFilters mobile />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => <MarketplaceCard key={item.id} item={item} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
