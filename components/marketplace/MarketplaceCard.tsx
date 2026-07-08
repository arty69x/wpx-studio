'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { ComponentItem } from '@/lib/types';
import { ComponentPreview } from './ComponentPreview';

export function MarketplaceCard({ item, index = 0 }: { item: ComponentItem; index?: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30, scale: 0.97, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -18, scale: 0.96, filter: 'blur(8px)' }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.025, 0.18), ease: [0.16, 1, 0.3, 1], layout: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } }}
      whileHover={{ y: -10, rotateX: 1.5, rotateY: -1.5 }}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#14120f]/85 shadow-2xl shadow-black/30 backdrop-blur-xl"
    >
      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c7b27a] to-transparent" />
        <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#c7b27a]/20 blur-3xl" />
      </div>
      <div className="relative h-72 overflow-hidden bg-black md:h-80">
        <ComponentPreview item={item} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080705] via-transparent to-transparent" />
        <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[10px] uppercase tracking-[.24em] text-stone-200 backdrop-blur">{item.priceType}</div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 backdrop-blur-sm transition duration-500 group-hover:opacity-100">
          <Link className="rounded-full bg-stone-100 px-5 py-3 text-xs font-semibold uppercase tracking-[.2em] text-black transition hover:bg-[#c7b27a]" href={`/marketplace/${item.slug}`}>View cut</Link>
        </div>
      </div>
      <div className="relative space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[.28em] text-[#c7b27a]">{item.category} / {item.subCategory}</p>
            <h3 className="mt-2 font-serif text-3xl leading-none tracking-[-.04em] text-stone-100">{item.name}</h3>
          </div>
          <span className="font-serif text-3xl text-white/20">{String(index + 1).padStart(2, '0')}</span>
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-stone-400">{item.description}</p>
        <div className="flex flex-wrap gap-2">
          {item.tags.slice(0, 3).map((tag) => <span className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-[11px] text-stone-300" key={tag}>{tag}</span>)}
        </div>
        <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-4 text-[11px] uppercase tracking-[.18em] text-stone-500">
          <span>{item.interactionType.split(' ')[0]} interaction</span>
          <span>{item.motionType.split(' ')[0]} motion</span>
          <span>{item.creator}</span>
          <span>Responsive</span>
        </div>
        <div className="flex gap-2 opacity-100 md:opacity-0 md:transition-opacity md:duration-500 md:group-hover:opacity-100">
          <Link href={`/marketplace/${item.slug}`} className="flex-1 rounded-full bg-stone-100 px-3 py-3 text-center text-xs font-semibold uppercase tracking-[.18em] text-black">Preview</Link>
          <button className="rounded-full border border-white/10 px-4 py-3 text-xs uppercase tracking-[.18em] text-stone-200 transition hover:border-[#c7b27a]">Save</button>
          <button className="rounded-full border border-white/10 px-4 py-3 text-xs uppercase tracking-[.18em] text-stone-200 transition hover:border-[#c7b27a]">Export</button>
        </div>
      </div>
    </motion.article>
  );
}
