'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { marketplaceItems } from '@/data/marketplace';
import type { ComponentItem } from '@/lib/types';
import { MarketplaceCard } from '@/components/marketplace/MarketplaceCard';
import { CategoryTabs } from '@/components/marketplace/CategoryTabs';
import { MarketplaceFilter, MarketplaceFilters } from '@/components/marketplace/MarketplaceFilters';

function matchesCatalogFilter(item: ComponentItem, filter: MarketplaceFilter) {
  const searchableText = `${item.name} ${item.description} ${item.category} ${item.subCategory} ${item.tags.join(' ')} ${item.interactionType} ${item.motionType} ${item.responsive} ${item.exportFormats.join(' ')}`.toLowerCase();

  switch (filter) {
    case 'Free':
    case 'Premium':
      return item.priceType === filter;
    case 'Responsive':
      return item.responsive.toLowerCase().includes('mobile') || item.responsive.toLowerCase().includes('responsive');
    case 'Hover':
      return searchableText.includes('hover');
    case 'Scroll reveal':
      return searchableText.includes('scroll reveal');
    case 'Card lift':
      return searchableText.includes('card lift');
    case 'Glow hover':
      return searchableText.includes('glow hover');
    case 'Tailwind':
      return item.exportFormats.some((format) => format.toLowerCase() === 'tailwind');
    default:
      return true;
  }
}

export default function MarketplacePage() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [sub, setSub] = useState('All');
  const [sort, setSort] = useState('Featured');
  const [activeFilters, setActiveFilters] = useState<MarketplaceFilter[]>([]);

  const toggleFilter = (filter: MarketplaceFilter, checked: boolean) => {
    setActiveFilters((current) => {
      if (!checked) {
        return current.filter((item) => item !== filter);
      }

      return current.includes(filter) ? current : [...current, filter];
    });
  };

  const filteredItems = useMemo(
    () =>
      marketplaceItems
        .filter((item) => {
          const matchesCategory = cat === 'All' || item.category === cat;
          const matchesSubcategory = sub === 'All' || item.subCategory === sub;
          const matchesQuery = `${item.name} ${item.category} ${item.subCategory} ${item.tags.join(' ')}`
            .toLowerCase()
            .includes(q.toLowerCase());
          const matchesActiveFilters = activeFilters.every((filter) => matchesCatalogFilter(item, filter));

          return matchesCategory && matchesSubcategory && matchesQuery && matchesActiveFilters;
        })
        .sort((a, b) => (sort === 'Name' ? a.name.localeCompare(b.name) : 0)),
    [q, cat, sub, sort, activeFilters],
  );

  return (
    <main className="min-h-screen bg-[#09090B] text-white">
      <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#09090B]/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link href="/" className="font-semibold">WPX Studio</Link>
          <Link href="/marketplace" className="text-sm text-zinc-400">Marketplace</Link>
        </div>
      </nav>
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8 rounded-[32px] border border-white/10 bg-[#111214] p-6">
          <p className="text-sm uppercase tracking-[.25em] text-[#45D6FF]">Component marketplace</p>
          <h1 className="mt-3 text-4xl font-semibold">Browse production-ready UI components.</h1>
          <div className="mt-6 flex flex-col gap-3 md:flex-row">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask WPX to find a carousel, reveal, nav, or background..." className="min-h-12 flex-1 rounded-2xl border border-white/10 bg-black/30 px-4 outline-none focus:ring-2 focus:ring-[#4F7CFF]" />
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-2xl border border-white/10 bg-black/30 px-4">
              <option>Featured</option>
              <option>Name</option>
            </select>
          </div>
        </div>
        <CategoryTabs category={cat} setCategory={setCat} sub={sub} setSub={setSub} />
        <div className="mt-8 grid gap-6 lg:grid-cols-[240px_1fr]">
          <MarketplaceFilters activeFilters={activeFilters} onFilterChange={toggleFilter} />
          <MarketplaceFilters activeFilters={activeFilters} onFilterChange={toggleFilter} mobile />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredItems.map((item) => <MarketplaceCard key={item.id} item={item} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
