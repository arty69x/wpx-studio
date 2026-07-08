'use client';

import { motion } from 'framer-motion';
import type { ComponentItem } from '@/lib/types';

const viewportCopy: Record<string, string> = {
  Interactions: 'Stateful controls with hover, focus, selected, loading, and disabled behavior.',
  Carousels: 'Sequenced media tracks with depth, pagination, and continuous motion.',
  Layout: 'Responsive composition systems built from grids, bento cells, and split sections.',
  Navigation: 'Adaptive wayfinding with desktop links, mobile controls, and active state cues.',
  Typography: 'Editorial type treatments with reveal timing, split text, and kinetic emphasis.',
  Backgrounds: 'Ambient visual systems for gradients, grain, particles, and cinematic surfaces.',
  Sections: 'Reusable marketing sections with scroll-aware storytelling and device frames.',
  Forms: 'Accessible input groups with labels, validation states, and action affordances.',
  Utilities: 'Small interaction primitives that can be dropped into larger WPX compositions.',
};

function interactionPreview(item: ComponentItem, isMotion: boolean, hover: boolean) {
  const isLoader = /loader|preloader/i.test(`${item.name} ${item.subCategory}`);
  const isReveal = /reveal|scroll/i.test(`${item.name} ${item.subCategory}`);

  if (isLoader) {
    return (
      <div className="grid h-full place-items-center">
        <div className="relative h-32 w-32">
          {[0, 1, 2].map((ring) => (
            <motion.span
              key={ring}
              className="absolute inset-0 rounded-full border border-[#c7b27a]/70"
              animate={{ scale: [0.55, 1.15, 0.55], opacity: [0.95, 0.1, 0.95], rotate: [0, 180, 360] }}
              transition={{ duration: 2 + ring * 0.35, repeat: Infinity, delay: ring * 0.18, ease: 'easeInOut' }}
              style={{ inset: `${ring * 14}px` }}
            />
          ))}
          <div className="absolute inset-10 rounded-full bg-[#c7b27a] shadow-[0_0_44px_rgba(199,178,122,.65)]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-center gap-5">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[.05] p-4">
        <motion.p
          className="font-serif text-4xl leading-none tracking-[-.07em] text-white"
          animate={isReveal || isMotion ? { y: [28, 0, 0], opacity: [0, 1, 1] } : hover ? { x: 8 } : {}}
          transition={{ duration: 1.35, repeat: isMotion ? Infinity : 0, repeatDelay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {item.name}
        </motion.p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {['Idle', 'Hover', 'Selected'].map((label, index) => (
          <motion.div
            key={label}
            animate={hover || isMotion ? { y: [0, -8, 0] } : {}}
            transition={{ delay: index * 0.1, duration: 1.5, repeat: isMotion ? Infinity : 0 }}
            className="rounded-2xl border border-white/10 bg-black/35 p-3 text-center text-[10px] uppercase tracking-[.2em] text-white/65"
          >
            {label}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function carouselPreview(item: ComponentItem, isMotion: boolean, hover: boolean) {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden">
      {[0, 1, 2, 3, 4].map((slide) => {
        const offset = slide - 2;
        return (
          <motion.div
            key={slide}
            className="absolute h-40 w-28 rounded-[1.35rem] border border-white/15 bg-gradient-to-br from-white/20 via-white/[.06] to-[#6046ff]/30 shadow-2xl shadow-black/50"
            animate={{
              x: isMotion ? [offset * 58, offset * 58 + 10, offset * 58] : offset * 58,
              y: Math.abs(offset) * 12,
              rotate: offset * 9,
              scale: 1 - Math.abs(offset) * 0.12 + (hover && offset === 0 ? 0.08 : 0),
              opacity: 1 - Math.abs(offset) * 0.14,
            }}
            transition={{ duration: 1.5, repeat: isMotion ? Infinity : 0, ease: 'easeInOut' }}
          >
            <div className="absolute inset-x-4 top-4 h-16 rounded-2xl bg-[#c7b27a]/30" />
            <div className="absolute inset-x-4 bottom-5 space-y-2">
              <div className="h-2 rounded-full bg-white/50" />
              <div className="h-2 w-2/3 rounded-full bg-white/20" />
            </div>
          </motion.div>
        );
      })}
      <div className="absolute bottom-2 flex gap-2">
        {[0, 1, 2].map((dot) => <span key={dot} className={`h-1.5 rounded-full ${dot === 1 ? 'w-8 bg-[#c7b27a]' : 'w-1.5 bg-white/35'}`} />)}
      </div>
    </div>
  );
}

function layoutPreview(item: ComponentItem, isMotion: boolean, hover: boolean) {
  const cells = /bento/i.test(item.subCategory) ? ['col-span-2 row-span-2', '', '', 'col-span-2', ''] : ['', 'col-span-2', 'row-span-2', '', ''];
  return (
    <div className="grid h-full grid-cols-3 grid-rows-3 gap-3">
      {cells.map((span, index) => (
        <motion.div
          key={`${span}-${index}`}
          animate={hover || isMotion ? { scale: [1, index % 2 ? 1.04 : 0.97, 1] } : {}}
          transition={{ duration: 1.6, repeat: isMotion ? Infinity : 0, delay: index * 0.08 }}
          className={`${span} rounded-2xl border border-white/10 bg-gradient-to-br from-white/20 to-white/[.035] p-3`}
        >
          <div className="h-full rounded-xl bg-black/25" />
        </motion.div>
      ))}
    </div>
  );
}

function navigationPreview(item: ComponentItem, isMotion: boolean, active: boolean) {
  return (
    <div className="flex h-full flex-col justify-center gap-5">
      <div className="rounded-full border border-white/10 bg-black/35 p-2">
        <div className="flex items-center justify-between gap-3 rounded-full bg-white/[.06] px-4 py-3">
          <span className="font-serif text-xl text-white">WPX</span>
          <div className="hidden gap-2 sm:flex">
            {['Work', 'Studio', 'Motion'].map((link, index) => (
              <motion.span
                key={link}
                animate={isMotion || active ? { y: [0, -3, 0] } : {}}
                transition={{ delay: index * 0.08, repeat: isMotion ? Infinity : 0 }}
                className={`rounded-full px-3 py-1 text-xs ${index === 1 ? 'bg-[#c7b27a] text-black' : 'text-white/60'}`}
              >
                {link}
              </motion.span>
            ))}
          </div>
          <div className="space-y-1.5">
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-4 bg-[#c7b27a]" />
          </div>
        </div>
      </div>
      <p className="text-center text-xs uppercase tracking-[.24em] text-white/45">{item.subCategory}</p>
    </div>
  );
}

function typographyPreview(item: ComponentItem, isMotion: boolean) {
  const words = item.name.split(' ');
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="font-serif text-[clamp(2.4rem,8vw,5.6rem)] leading-[.78] tracking-[-.08em] text-white">
        {words.map((word, index) => (
          <motion.span
            key={word}
            className="mr-3 inline-block"
            animate={isMotion ? { y: [32, 0, 0], opacity: [0, 1, 1], filter: ['blur(8px)', 'blur(0px)', 'blur(0px)'] } : {}}
            transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1, delay: index * 0.12 }}
          >
            {word}
          </motion.span>
        ))}
      </div>
      <div className="mt-5 h-px w-full bg-gradient-to-r from-[#c7b27a] via-white/20 to-transparent" />
    </div>
  );
}

function backgroundPreview(item: ComponentItem, isMotion: boolean) {
  return (
    <div className="relative h-full overflow-hidden rounded-[1.25rem]">
      <motion.div
        className="absolute inset-[-20%] bg-[radial-gradient(circle_at_20%_30%,rgba(199,178,122,.75),transparent_28%),radial-gradient(circle_at_75%_45%,rgba(96,70,255,.7),transparent_32%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,.22),transparent_24%)] blur-xl"
        animate={isMotion ? { rotate: [0, 18, -12, 0], scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(circle,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:10px_10px]" />
      <div className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[10px] uppercase tracking-[.22em] text-white/70">{item.subCategory}</div>
    </div>
  );
}

function sectionPreview(item: ComponentItem, isMotion: boolean) {
  return (
    <div className="grid h-full grid-cols-[.72fr_1fr] gap-4">
      <motion.div animate={isMotion ? { y: [12, -12, 12] } : {}} transition={{ duration: 2.2, repeat: Infinity }} className="mx-auto h-full max-h-64 w-28 rounded-[2rem] border border-white/15 bg-black/45 p-2">
        <div className="h-full rounded-[1.5rem] bg-gradient-to-b from-[#c7b27a]/30 via-white/[.07] to-[#6046ff]/30" />
      </motion.div>
      <div className="flex flex-col justify-center gap-3">
        <div className="h-4 w-24 rounded-full bg-[#c7b27a]/70" />
        <div className="h-10 rounded-2xl bg-white/20" />
        <div className="h-10 w-3/4 rounded-2xl bg-white/10" />
        <div className="mt-3 h-9 w-28 rounded-full bg-white text-black" />
      </div>
    </div>
  );
}

function formPreview(isMotion: boolean) {
  return (
    <div className="flex h-full flex-col justify-center gap-4">
      {['Name', 'Email', 'Message'].map((label, index) => (
        <motion.div key={label} animate={isMotion && index === 1 ? { boxShadow: ['0 0 0 0 rgba(199,178,122,0)', '0 0 0 4px rgba(199,178,122,.22)', '0 0 0 0 rgba(199,178,122,0)'] } : {}} transition={{ duration: 1.5, repeat: Infinity }} className="rounded-2xl border border-white/10 bg-black/35 p-3">
          <p className="text-[10px] uppercase tracking-[.22em] text-white/40">{label}</p>
          <div className="mt-2 h-3 rounded-full bg-white/20" />
        </motion.div>
      ))}
      <div className="h-11 rounded-full bg-[#c7b27a] text-center text-xs font-semibold uppercase tracking-[.18em] leading-[2.75rem] text-black">Submit</div>
    </div>
  );
}

function renderPreview(item: ComponentItem, state: string) {
  const active = state === 'Active';
  const hover = state === 'Hover';
  const isMotion = state === 'Motion';

  if (item.category === 'Carousels') return carouselPreview(item, isMotion, hover);
  if (item.category === 'Layout') return layoutPreview(item, isMotion, hover);
  if (item.category === 'Navigation') return navigationPreview(item, isMotion, active);
  if (item.category === 'Typography') return typographyPreview(item, isMotion);
  if (item.category === 'Backgrounds') return backgroundPreview(item, isMotion);
  if (item.category === 'Sections') return sectionPreview(item, isMotion);
  if (item.category === 'Forms') return formPreview(isMotion);
  return interactionPreview(item, isMotion, hover);
}

export function ComponentPreview({ item, state = 'Default' }: { item: ComponentItem; state?: string }) {
  const selected = state === 'Selected';
  const active = state === 'Active';
  const hover = state === 'Hover';
  const isMotion = state === 'Motion';

  return (
    <div className="relative h-full min-h-48 overflow-hidden bg-[#0a0907] p-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(199,178,122,.34),transparent_28%),radial-gradient(circle_at_82%_8%,rgba(96,70,255,.26),transparent_32%),linear-gradient(135deg,#11100e,#050505_70%)]" />
      <motion.div
        animate={isMotion ? { x: [0, 10, -6, 0], rotate: [0, 0.5, -0.5, 0] } : hover ? { scale: 1.02 } : active ? { scale: 0.98 } : selected ? { boxShadow: '0 0 0 2px #c7b27a' } : { scale: 1 }}
        transition={{ duration: 1.2, repeat: isMotion ? Infinity : 0, ease: 'easeInOut' }}
        className="relative h-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/25 p-4 shadow-2xl shadow-black/50 backdrop-blur"
      >
        <div className="absolute inset-0 opacity-30 mix-blend-screen [background-image:linear-gradient(115deg,transparent,rgba(255,255,255,.14),transparent)]" />
        <div className="relative flex h-full flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[.3em] text-[#c7b27a]">{item.category}</p>
              <p className="mt-1 max-w-[16rem] text-xs leading-relaxed text-white/52">{viewportCopy[item.category] ?? item.description}</p>
            </div>
            <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] text-white/70">{item.subCategory}</span>
          </div>
          <div className="min-h-0 flex-1">{renderPreview(item, state)}</div>
          <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[10px] uppercase tracking-[.22em] text-white/50">
            <span>{state}</span>
            <span>{item.name}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
