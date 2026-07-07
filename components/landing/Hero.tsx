'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { marketplaceItems } from '@/data/marketplace';
import { ComponentPreview } from '@/components/marketplace/ComponentPreview';

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-[#4F7CFF]/20 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#45D6FF]">WPX Studio</p>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-white md:text-7xl">
            Build, preview, save, and export production-ready website components.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            A focused frontend prototype for browsing Framer-like components with local mock data, locked structure validation, and premium preview motion.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="rounded-full bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200" href="/marketplace">
              Explore Marketplace
            </Link>
            <a className="rounded-full border border-white/10 px-5 py-3 font-semibold text-white transition hover:border-white/30" href="#structure">
              View Structure System
            </a>
          </div>
        </motion.div>
        <div className="relative">
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }} className="rounded-[36px] border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-blue-950/30 backdrop-blur">
            <ComponentPreview item={marketplaceItems[0]} state="Motion" />
          </motion.div>
          <FloatingCard className="-left-6 top-10 hidden md:block" label="Structure Valid" />
          <FloatingCard className="-right-4 bottom-10 hidden md:block" label="Export UI Ready" />
        </div>
      </div>
    </section>
  );
}

function FloatingCard({ label, className }: { label: string; className: string }) {
  return (
    <div className={`absolute rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-zinc-200 shadow-2xl backdrop-blur ${className}`}>
      {label}
    </div>
  );
}
