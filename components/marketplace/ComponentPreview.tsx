'use client';

import { motion } from 'framer-motion';
import type { ComponentItem } from '@/lib/types';

export function ComponentPreview({ item, state = 'Default' }: { item: ComponentItem; state?: string }) {
  const active = state === 'Active';
  const selected = state === 'Selected';
  const hover = state === 'Hover';
  const isMotion = state === 'Motion';
  const seed = item.id.split('-').at(-1) ?? '1';

  return (
    <div className="relative h-full min-h-48 overflow-hidden bg-[#0a0907] p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(199,178,122,.34),transparent_28%),radial-gradient(circle_at_82%_8%,rgba(96,70,255,.26),transparent_32%),linear-gradient(135deg,#11100e,#050505_70%)]" />
      <motion.div
        animate={isMotion ? { x: [0, 14, -8, 0], rotate: [0, 0.8, -0.8, 0] } : hover ? { scale: 1.035 } : active ? { scale: 0.97 } : selected ? { boxShadow: '0 0 0 2px #c7b27a' } : { scale: 1 }}
        transition={{ duration: 1.2, repeat: isMotion ? Infinity : 0, ease: 'easeInOut' }}
        className="relative h-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/25 p-4 shadow-2xl shadow-black/50 backdrop-blur"
      >
        <div className="absolute inset-0 opacity-40 mix-blend-screen" style={{ backgroundImage: `linear-gradient(${Number(seed) * 23}deg, transparent, rgba(255,255,255,.16), transparent)` }} />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[.3em] text-[#c7b27a]">{item.category}</p>
              <p className="mt-2 max-w-[12rem] font-serif text-3xl leading-[.86] tracking-[-.06em] text-white">{item.name}</p>
            </div>
            <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] text-white/70">{item.priceType}</span>
          </div>
          <div className="grid h-32 grid-cols-5 gap-2">
            {[0, 1, 2, 3, 4].map((n) => (
              <motion.div
                key={n}
                animate={isMotion || hover ? { y: [0, n % 2 ? 12 : -10, 0], opacity: [0.45, 1, 0.55] } : {}}
                transition={{ delay: n * 0.08, repeat: isMotion || hover ? Infinity : 0, duration: 1.8, ease: 'easeInOut' }}
                className="rounded-full border border-white/10 bg-gradient-to-b from-white/20 to-white/[.03]"
                style={{ height: `${46 + ((n * 17 + Number(seed)) % 54)}%`, alignSelf: n % 2 ? 'end' : 'center' }}
              />
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[10px] uppercase tracking-[.22em] text-white/50">
            <span>{item.subCategory}</span>
            <span>View more</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
