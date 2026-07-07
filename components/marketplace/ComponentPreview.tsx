'use client';

import { motion } from 'framer-motion';
import type { ComponentItem, PreviewPattern } from '@/lib/types';
import { cx } from '@/lib/utils';

type PreviewState = 'Default' | 'Hover' | 'Active' | 'Selected' | 'Motion';

export function ComponentPreview({ item, state = 'Default' }: { item: ComponentItem; state?: string }) {
  const previewState = state as PreviewState;

  return (
    <div className="relative h-full min-h-52 overflow-hidden rounded-[28px] border border-white/10 bg-[#111214] p-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(79,124,255,.26),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(224,82,255,.18),transparent_28%)]" />
      <motion.div
        animate={getFrameAnimation(previewState)}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={cx(
          'relative h-full rounded-3xl border border-white/10 bg-black/35 p-4 backdrop-blur-md',
          previewState === 'Selected' && 'ring-2 ring-cyan-300',
        )}
      >
        <PreviewChrome item={item} />
        <PatternPreview pattern={item.previewPattern} state={previewState} />
      </motion.div>
    </div>
  );
}

function PreviewChrome({ item }: { item: ComponentItem }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <div>
        <div className="h-2 w-24 rounded-full bg-white/20" />
        <p className="mt-2 text-xs text-zinc-400">{item.subCategory}</p>
      </div>
      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#4F7CFF] to-[#E052FF] shadow-lg shadow-blue-500/20" />
    </div>
  );
}

function PatternPreview({ pattern, state }: { pattern: PreviewPattern; state: PreviewState }) {
  const isMotion = state === 'Motion';
  const cellAnimation = isMotion ? { y: [0, -8, 0], opacity: [0.55, 1, 0.55] } : {};

  if (pattern === 'carousel') {
    return (
      <div className="flex h-32 items-center gap-3 overflow-hidden">
        {[0, 1, 2].map((item) => (
          <motion.div
            key={item}
            animate={cellAnimation}
            transition={{ delay: item * 0.08, duration: 1.3, repeat: isMotion ? Infinity : 0 }}
            className={cx(
              'h-28 shrink-0 rounded-2xl border border-white/10 bg-white/[0.07]',
              item === 1 ? 'w-28 scale-105 bg-gradient-to-br from-blue-400/30 to-purple-400/20' : 'w-20 opacity-70',
            )}
          />
        ))}
      </div>
    );
  }

  if (pattern === 'navigation') {
    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] p-3">
          <div className="h-7 w-20 rounded-full bg-white/20" />
          <div className="hidden gap-2 sm:flex">
            {[0, 1, 2].map((item) => (
              <motion.div key={item} animate={cellAnimation} className="h-3 w-12 rounded-full bg-white/15" />
            ))}
          </div>
          <div className="h-8 w-8 rounded-full bg-blue-400/40" />
        </div>
        <div className="h-16 rounded-2xl bg-gradient-to-r from-white/[0.04] to-white/[0.12]" />
      </div>
    );
  }

  if (pattern === 'typography') {
    return (
      <div className="space-y-3 py-3">
        {[0, 1, 2].map((item) => (
          <motion.div
            key={item}
            animate={isMotion ? { clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)', 'inset(0 0% 0 0)'] } : {}}
            transition={{ delay: item * 0.1, duration: 1.2, repeat: isMotion ? Infinity : 0 }}
            className={cx('h-5 rounded-full bg-white/20', item === 0 ? 'w-10/12' : item === 1 ? 'w-8/12' : 'w-6/12')}
          />
        ))}
      </div>
    );
  }

  if (pattern === 'background') {
    return (
      <div className="relative h-32 overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(79,124,255,.25),rgba(224,82,255,.18),rgba(69,214,255,.16))]">
        <motion.div animate={isMotion ? { x: ['-20%', '20%', '-20%'] } : {}} transition={{ duration: 4, repeat: isMotion ? Infinity : 0 }} className="absolute inset-y-0 left-1/3 w-24 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:16px_16px]" />
      </div>
    );
  }

  if (pattern === 'layout') {
    return (
      <div className="grid h-32 grid-cols-5 grid-rows-2 gap-3">
        <motion.div animate={cellAnimation} className="col-span-3 row-span-2 rounded-2xl bg-white/[0.1]" />
        <motion.div animate={cellAnimation} transition={{ delay: 0.08 }} className="col-span-2 rounded-2xl bg-blue-400/20" />
        <motion.div animate={cellAnimation} transition={{ delay: 0.16 }} className="col-span-2 rounded-2xl bg-purple-400/20" />
      </div>
    );
  }

  return (
    <div className="grid h-32 place-items-center rounded-2xl border border-white/10 bg-white/[0.05]">
      <motion.div
        animate={isMotion ? { scale: [1, 1.14, 1], boxShadow: ['0 0 0 rgba(79,124,255,0)', '0 0 40px rgba(79,124,255,.35)', '0 0 0 rgba(79,124,255,0)'] } : {}}
        transition={{ duration: 1.4, repeat: isMotion ? Infinity : 0 }}
        className="rounded-full border border-blue-300/40 bg-blue-400/20 px-6 py-3 text-sm text-blue-100"
      >
        Interaction target
      </motion.div>
    </div>
  );
}

function getFrameAnimation(state: PreviewState) {
  if (state === 'Hover') return { scale: 1.025, y: -3 };
  if (state === 'Active') return { scale: 0.975 };
  if (state === 'Motion') return { scale: [1, 0.99, 1], opacity: [0.92, 1, 1] };
  return { scale: 1, y: 0 };
}
