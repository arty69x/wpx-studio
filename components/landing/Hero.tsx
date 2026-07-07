'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { NeonMascot } from '@/components/brand/NeonMascot';
import { Column } from '@/components/layout/Column';
import { Container } from '@/components/layout/Container';
import { Grid } from '@/components/layout/Grid';
import { ComponentPreview } from '@/components/marketplace/ComponentPreview';
import { catalogStats, marketplaceItems } from '@/data/marketplace';

const productWords = ['Extract.', 'Compose.', 'Ship.'];

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 wpx-grid-bg opacity-80" />
      <div className="absolute left-1/2 top-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#0A4CFF]/18 blur-3xl" />
      <Container>
        <Grid className="lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <Column>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="wpx-panel h-full rounded-[36px] p-6 md:p-8"
            >
              <p className="mb-4 text-sm uppercase tracking-[0.34em] text-[#CCFF00]">Visual Engineering Studio</p>
              <div className="mb-8 text-6xl font-black tracking-[-0.12em] text-white md:text-8xl">
                WP<span className="text-[#CCFF00]">X</span>
              </div>
              <div className="space-y-1 text-4xl font-black uppercase leading-none tracking-[-0.04em] md:text-5xl">
                {productWords.map((word, index) => (
                  <p key={word} className={index === 0 ? 'text-[#CCFF00]' : index === 1 ? 'text-[#FF2D78]' : 'text-[#45D6FF]'}>
                    {word}
                  </p>
                ))}
              </div>
              <h1 className="mt-8 max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
                Build, preview, save, and export production-ready website components.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300">
                A focused frontend marketplace prototype with reconstructed component previews, locked structure validation, and premium studio-grade motion.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link className="rounded-full bg-[#CCFF00] px-5 py-3 font-bold text-black shadow-[0_0_28px_rgba(204,255,0,.28)] transition hover:bg-white" href="/marketplace">
                  Explore Marketplace
                </Link>
                <a className="rounded-full border border-white/10 px-5 py-3 font-semibold text-white transition hover:border-[#45D6FF]/50 hover:text-[#45D6FF]" href="#structure">
                  View Structure System
                </a>
              </div>
            </motion.div>
          </Column>

          <Column className="relative grid gap-4">
            <div className="wpx-panel relative overflow-hidden rounded-[36px] p-4">
              <div className="absolute right-8 top-8 z-10 hidden md:block">
                <NeonMascot />
              </div>
              <div className="rounded-[28px] border border-[#0A4CFF]/40 bg-black/30 p-3 shadow-[0_0_48px_rgba(10,76,255,.18)]">
                <ComponentPreview item={marketplaceItems[2]} state="Motion" />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <Metric label="Catalog Items" value={String(catalogStats.totalItems)} />
              <Metric label="Patterns" value={String(catalogStats.previewPatterns.length)} />
              <Metric label="Structure" value="Valid" tone="lime" />
            </div>
          </Column>
        </Grid>
      </Container>
    </section>
  );
}

function Metric({ label, value, tone = 'default' }: { label: string; value: string; tone?: 'default' | 'lime' }) {
  return (
    <div className="wpx-panel rounded-3xl p-5">
      <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">{label}</p>
      <p className={`mt-3 text-2xl font-black ${tone === 'lime' ? 'text-[#CCFF00]' : 'text-white'}`}>{value}</p>
    </div>
  );
}
