'use client';

import { motion } from 'framer-motion';
import { previewPatternGroups } from '@/data/marketplace';

const motions = ['Fade', 'Slide', 'Scale', 'Blur', 'Reveal', 'Scroll reveal', 'Stagger', 'Card lift', 'Glow hover', 'Preview transition'];

export function MotionShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-[#45D6FF]">Motion inventory</p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Locked interaction and motion system</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-zinc-400">Motion badges and preview families are generated from the same local catalog patterns.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-5">
        {motions.map((motionName) => (
          <motion.div
            whileHover={{ scale: 1.04, y: -4, boxShadow: '0 0 36px rgba(204,255,0,.2)' }}
            key={motionName}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-white"
          >
            {motionName}
            <div className="mt-4 h-1 rounded-full bg-gradient-to-r from-[#CCFF00] via-[#45D6FF] to-[#FF2D78]" />
          </motion.div>
        ))}
      </div>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {previewPatternGroups.map((group) => (
          <div key={group.pattern} className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="font-semibold capitalize text-white">{group.pattern}</p>
            <p className="mt-1 text-xs text-zinc-500">{group.items.map((item) => item.name).join(' · ')}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
