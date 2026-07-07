'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { ComponentItem } from '@/lib/types';
import { Badge } from './Badge';
import { ComponentPreview } from './ComponentPreview';

export function MarketplaceCard({ item }: { item: ComponentItem }) {
  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.012 }}
      transition={{ duration: 0.24, ease: [0.2, 0.8, 0.2, 1] }}
      className="group overflow-hidden rounded-[28px] border border-white/10 bg-[#0D1320]/85 shadow-2xl shadow-black/20 transition-colors hover:border-[#4F7CFF]/70"
    >
      <div className="relative h-56">
        <ComponentPreview item={item} state="Motion" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
          <Link className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black" href={`/marketplace/${item.slug}`}>
            Quick preview
          </Link>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-white">{item.name}</h3>
            <p className="mt-1 text-xs text-zinc-500">
              {item.category} / {item.subCategory}
            </p>
          </div>
          <Badge tone={item.priceType === 'Premium' ? 'purple' : 'cyan'}>{item.priceType}</Badge>
        </div>

        <p className="line-clamp-2 min-h-10 text-sm leading-5 text-zinc-400">{item.description}</p>

        <div className="flex flex-wrap gap-2">
          {item.tags.slice(0, 3).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-400">
          <span>Interaction: {item.interactionType.split(',')[1]?.trim() ?? 'hover'}</span>
          <span>Motion: {item.motionType.split(',')[0]}</span>
          <span>Creator: {item.creator}</span>
          <span>Responsive ready</span>
        </div>

        <div className="flex gap-2 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
          <Link href={`/marketplace/${item.slug}`} className="flex-1 rounded-xl bg-[#CCFF00] px-3 py-2 text-center text-xs font-semibold text-black">
            Preview
          </Link>
          <button className="rounded-xl border border-white/10 px-3 py-2 text-xs text-zinc-200 hover:border-cyan-300/50">Save</button>
          <button className="rounded-xl border border-white/10 px-3 py-2 text-xs text-zinc-200 hover:border-purple-300/50">Export</button>
        </div>
      </div>
    </motion.article>
  );
}
