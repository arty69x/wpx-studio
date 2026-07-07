'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { CategoryTabs } from '@/components/marketplace/CategoryTabs';
import { MarketplaceCard } from '@/components/marketplace/MarketplaceCard';
import { MarketplaceFilters, type MarketplaceFilterKey } from '@/components/marketplace/MarketplaceFilters';
import { marketplaceItems } from '@/data/marketplace';
import type { ComponentItem } from '@/lib/types';

const filterPredicate: Record<MarketplaceFilterKey, (item: ComponentItem) => boolean> = {
  Premium: (item) => item.priceType === 'Premium',
  Free: (item) => item.priceType === 'Free',
  Hover: (item) => `${item.subCategory} ${item.tags.join(' ')} ${item.interactionType}`.toLowerCase().includes('hover'),
  VFX: (item) => ['Backgrounds', 'Carousels'].includes(item.category) || /cinema|fx|particle|liquid|grain|webgl/i.test(`${item.name} ${item.subCategory}`),
  Directors: (item) => ['Sections', 'Typography', 'Navigation'].includes(item.category) || /editorial|reveal|scroll/i.test(`${item.name} ${item.subCategory}`),
  Editorial: (item) => /editorial|bento|asymmetric|cinema|gallery|video/i.test(`${item.name} ${item.subCategory} ${item.tags.join(' ')}`),
  'Scroll reveal': (item) => /scroll|reveal/i.test(`${item.name} ${item.subCategory} ${item.motionType} ${item.tags.join(' ')}`),
  Responsive: (item) => item.responsive.toLowerCase().includes('mobile') && item.responsive.toLowerCase().includes('desktop'),
  Tailwind: (item) => item.exportFormats.includes('Tailwind'),
};

export default function MarketplacePage() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [sub, setSub] = useState('All');
  const [sort, setSort] = useState('Featured');
  const [activeFilters, setActiveFilters] = useState<MarketplaceFilterKey[]>([]);

  const toggleFilter = (filter: MarketplaceFilterKey) => {
    setActiveFilters((current) => (current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter]));
  };

  const filteredItems = useMemo(() => {
    const query = q.trim().toLowerCase();
    return marketplaceItems
      .filter((item) => (cat === 'All' || item.category === cat) && (sub === 'All' || item.subCategory === sub))
      .filter((item) => !query || `${item.name} ${item.category} ${item.subCategory} ${item.tags.join(' ')}`.toLowerCase().includes(query))
      .filter((item) => activeFilters.every((filter) => filterPredicate[filter](item)))
      .sort((a, b) => (sort === 'Name' ? a.name.localeCompare(b.name) : a.priceType === 'Premium' ? -1 : 0));
  }, [activeFilters, cat, q, sort, sub]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080705] text-stone-100">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-[36rem] w-[36rem] animate-[wpxFloat_18s_ease-in-out_infinite] rounded-full bg-[#6046ff]/25 blur-[130px]" />
        <div className="absolute bottom-[-16%] right-[-10%] h-[42rem] w-[42rem] animate-[wpxFloat_24s_ease-in-out_infinite_reverse] rounded-full bg-[#d6a33a]/20 blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:64px_64px] opacity-25" />
      </div>

      <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#080705]/75 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[92rem] items-center justify-between px-4 py-4 md:px-8">
          <Link href="/" className="font-serif text-2xl tracking-tight">WPX Studio</Link>
          <div className="hidden items-center gap-6 text-[11px] uppercase tracking-[.32em] text-stone-400 md:flex"><span>01 Marketplace</span><span>02 Talents</span><span>03 Motion</span></div>
          <Link href="/marketplace" className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[.22em] text-stone-200">Browse</Link>
        </div>
      </nav>

      <section className="mx-auto max-w-[92rem] px-4 pb-16 pt-10 md:px-8 md:pt-16">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
          <div>
            <p className="text-[11px] uppercase tracking-[.42em] text-[#c7b27a]">New landscapes are unfolding</p>
            <h1 className="mt-5 max-w-5xl font-serif text-[clamp(4.2rem,12vw,12rem)] leading-[.78] tracking-[-.09em] text-stone-100">Production-grade UI for cinematic brands.</h1>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/[.04] p-4 shadow-2xl shadow-black/50 backdrop-blur-xl md:p-6">
            <p className="max-w-xl text-lg leading-relaxed text-stone-300">A curated component ecosystem for hover systems, VFX surfaces, directors&apos; cuts, editorial video, and export-ready interface craft.</p>
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5 text-center">
              {['37 components', '9 filters', `${filteredItems.length} visible`].map((stat) => <span key={stat} className="rounded-2xl bg-black/30 px-3 py-4 font-serif text-xl">{stat}</span>)}
            </div>
          </div>
        </motion.div>

        <div className="mt-10 rounded-[2rem] border border-white/10 bg-[#11100e]/80 p-4 backdrop-blur-2xl md:p-5">
          <div className="flex flex-col gap-3 md:flex-row">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search motion, VFX, directors, hover, editorial..." className="min-h-14 flex-1 rounded-full border border-white/10 bg-black/40 px-5 text-stone-100 outline-none transition placeholder:text-stone-600 focus:border-[#c7b27a] focus:ring-4 focus:ring-[#c7b27a]/10" />
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="min-h-14 rounded-full border border-white/10 bg-black/40 px-5 text-stone-100 outline-none focus:border-[#c7b27a]"><option>Featured</option><option>Name</option></select>
          </div>
        </div>

        <div className="mt-8"><CategoryTabs category={cat} setCategory={setCat} sub={sub} setSub={setSub} /></div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[18rem_1fr]">
          <MarketplaceFilters activeFilters={activeFilters} onToggle={toggleFilter} onClear={() => setActiveFilters([])} />
          <MarketplaceFilters mobile activeFilters={activeFilters} onToggle={toggleFilter} onClear={() => setActiveFilters([])} />
          <motion.div layout className="grid auto-rows-fr gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <MarketplaceCard key={item.id} item={item} index={index} />
              ))}
            </AnimatePresence>
            {filteredItems.length === 0 ? <div className="col-span-full rounded-[2rem] border border-white/10 bg-white/[.03] p-12 text-center font-serif text-3xl text-stone-300">No matching landscape. Reset a filter to widen the cut.</div> : null}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
