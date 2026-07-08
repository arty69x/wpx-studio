'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { marketplaceCategories, motionTokens, platformItems, productPages, themeTokens } from '@/data/platform';
import type { LibraryType, PlatformItem } from '@/types/platform';

const types: LibraryType[] = ['component', 'template', 'motion', 'asset', 'theme', 'prompt'];
const stateLabels = ['default', 'hover', 'active', 'focus-visible', 'selected', 'loading', 'disabled', 'success', 'error', 'empty'];

type PageKind = 'landing' | 'marketplace' | 'components' | 'builder' | 'motion' | 'ai' | 'assets' | 'tokens' | 'themes' | 'settings';

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function useLocalPreference(key: string, initial: string) {
  const [value, setValue] = useState(initial);

  useEffect(() => {
    const stored = window.localStorage.getItem(key);
    if (stored) setValue(stored);
  }, [key]);

  const update = (next: string) => {
    setValue(next);
    window.localStorage.setItem(key, next);
  };

  return [value, update] as const;
}

export function CinematicBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050505]">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(217,255,63,.18),transparent_28%),radial-gradient(circle_at_12%_74%,rgba(69,214,255,.16),transparent_30%),radial-gradient(circle_at_88%_72%,rgba(255,79,216,.13),transparent_32%)]" />
      <div className="absolute inset-0 opacity-[.18] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="absolute inset-0 opacity-[.08] [background-image:linear-gradient(transparent_50%,rgba(255,255,255,.55)_51%,transparent_52%)] [background-size:100%_8px]" />
    </div>
  );
}

export function Button({ children, variant = 'primary', disabled = false, onClick }: { children: React.ReactNode; variant?: 'primary' | 'ghost'; disabled?: boolean; onClick?: () => void }) {
  return (
    <motion.button
      whileHover={disabled ? undefined : { y: -3, boxShadow: '10px 10px 0 rgba(0,0,0,.75)' }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      disabled={disabled}
      onClick={onClick}
      className={cn('min-h-12 rounded-full border px-5 text-sm font-semibold uppercase tracking-[.18em] outline-none transition focus-visible:ring-4 focus-visible:ring-[#45d6ff]/40', variant === 'primary' ? 'border-[#d9ff3f] bg-[#d9ff3f] text-black' : 'border-white/15 bg-white/[.04] text-white hover:border-[#45d6ff]')}
    >
      {children}
    </motion.button>
  );
}

export function IconButton({ label, children, onClick }: { label: string; children: React.ReactNode; onClick?: () => void }) {
  return <button aria-label={label} onClick={onClick} className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/[.04] text-white outline-none transition hover:-translate-y-1 hover:border-[#d9ff3f] focus-visible:ring-4 focus-visible:ring-[#45d6ff]/40">{children}</button>;
}

export function GlassPanel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <section className={cn('rounded-[2rem] border border-white/12 bg-white/[.055] p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl', className)}>{children}</section>;
}

export function BrutalistCard({ item, selected = false, onClick }: { item: PlatformItem; selected?: boolean; onClick?: () => void }) {
  return (
    <motion.article layout whileHover={{ y: -8, rotate: -0.4 }} onClick={onClick} className={cn('group cursor-pointer rounded-[1.75rem] border-2 p-4 shadow-[10px_10px_0_rgba(0,0,0,.8)] transition', selected ? 'border-[#d9ff3f] bg-[#d9ff3f] text-black' : 'border-white/15 bg-[#101010] text-white hover:border-[#ff4fd8]')}>
      <div className="flex items-start justify-between gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[.24em] opacity-70">{item.id} / {item.status}</p>
        <span className="rounded-full border border-current px-2 py-1 font-mono text-[10px] uppercase">{item.type}</span>
      </div>
      <PreviewFrame item={item} compact />
      <h3 className="mt-4 font-serif text-2xl leading-none tracking-[-.05em]">{item.title}</h3>
      <p className="mt-3 line-clamp-2 text-sm opacity-70">{item.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">{item.tags.slice(0, 3).map((tag) => <MotionBadge key={tag}>{tag}</MotionBadge>)}</div>
    </motion.article>
  );
}

export function HolographicCard({ children }: { children: React.ReactNode }) {
  return <motion.div whileHover={{ rotateX: 2, rotateY: -2, y: -6 }} className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[linear-gradient(135deg,rgba(217,255,63,.16),rgba(69,214,255,.08),rgba(255,79,216,.16))] p-5 shadow-2xl shadow-black/40 before:absolute before:inset-0 before:bg-[linear-gradient(115deg,transparent,rgba(255,255,255,.18),transparent)] before:opacity-60"> <div className="relative">{children}</div></motion.div>;
}

export function TiltBlock({ children }: { children: React.ReactNode }) {
  return <motion.div whileHover={{ rotate: -1, scale: 1.015 }} transition={motionTokens.springSoft} className="rounded-[2rem] border border-white/10 bg-black/30 p-4">{children}</motion.div>;
}

export function MotionBadge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-white/15 bg-white/[.04] px-3 py-1 font-mono text-[10px] uppercase tracking-[.18em] text-white/70">{children}</span>;
}

export function SectionNumber({ n, label }: { n: string; label: string }) {
  return <div className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.3em] text-[#d9ff3f]"><span>{n}</span><span className="h-px flex-1 bg-[#d9ff3f]/35" /><span>{label}</span></div>;
}

export function MetadataBar({ items }: { items: string[] }) {
  return <div className="grid gap-2 border-y border-white/10 py-3 font-mono text-[10px] uppercase tracking-[.22em] text-white/55 sm:grid-cols-3">{items.map((item) => <span key={item}>{item}</span>)}</div>;
}

export function PreviewFrame({ item, compact = false }: { item: PlatformItem; compact?: boolean }) {
  const bars = [0, 1, 2, 3, 4];
  return (
    <div className={cn('relative mt-4 overflow-hidden rounded-[1.5rem] border border-white/10 bg-black p-4', compact ? 'h-40' : 'min-h-[22rem]')}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(217,255,63,.28),transparent_25%),radial-gradient(circle_at_78%_26%,rgba(69,214,255,.22),transparent_28%),radial-gradient(circle_at_52%_86%,rgba(255,79,216,.18),transparent_30%)]" />
      <motion.div animate={{ x: ['-20%', '120%'] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }} className="absolute inset-y-0 w-1/3 skew-x-[-18deg] bg-white/10 blur-xl" />
      <div className="relative flex h-full flex-col justify-between gap-5">
        <div className="flex justify-between gap-3"><MotionBadge>{item.category}</MotionBadge><MotionBadge>{item.motionPreset}</MotionBadge></div>
        <div className="grid flex-1 grid-cols-5 items-end gap-2">
          {bars.map((bar) => <motion.span key={bar} animate={{ height: [`${28 + bar * 9}%`, `${58 + bar * 7}%`, `${28 + bar * 9}%`] }} transition={{ duration: 1.6 + bar * 0.12, repeat: Infinity }} className="rounded-t-full border border-white/10 bg-white/15" />)}
        </div>
        <div><h4 className="font-serif text-3xl leading-none tracking-[-.06em] text-white">{item.title}</h4><p className="mt-2 text-xs text-white/55">{item.thumbnailStyle}</p></div>
      </div>
    </div>
  );
}

function SearchInput({ value, setValue }: { value: string; setValue: (value: string) => void }) {
  return <label className="block"><span className="sr-only">Search library</span><input value={value} onChange={(event) => setValue(event.target.value)} placeholder="Search WHISPERX systems..." className="min-h-14 w-full rounded-full border border-white/15 bg-black/35 px-5 text-white outline-none transition placeholder:text-white/35 focus:border-[#45d6ff] focus:ring-4 focus:ring-[#45d6ff]/20" /></label>;
}

function FilterBar({ active, setActive }: { active: string; setActive: (value: string) => void }) {
  return <div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Marketplace filters">{['All', ...marketplaceCategories].map((filter) => <button key={filter} role="tab" aria-selected={active === filter} onClick={() => setActive(filter)} className={cn('shrink-0 rounded-full border px-4 py-2 text-xs uppercase tracking-[.18em] transition focus-visible:ring-4 focus-visible:ring-[#45d6ff]/30', active === filter ? 'border-[#d9ff3f] bg-[#d9ff3f] text-black' : 'border-white/15 bg-white/[.04] text-white/70 hover:border-[#ff4fd8]')}>{filter}</button>)}</div>;
}

function ResultCounter({ count }: { count: number }) {
  return <p aria-live="polite" className="font-mono text-xs uppercase tracking-[.22em] text-white/55">{count} results rendered from central state</p>;
}

function EmptyState() {
  return <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2rem] border border-dashed border-white/20 p-12 text-center"><h3 className="font-serif text-4xl">No signal found.</h3><p className="mt-3 text-white/60">Clear filters or search for another cinematic system.</p></motion.div>;
}

function SkeletonCard() {
  return <div className="animate-pulse rounded-[1.75rem] border border-white/10 bg-white/[.04] p-4"><div className="h-40 rounded-3xl bg-white/10" /><div className="mt-4 h-5 w-2/3 rounded bg-white/10" /><div className="mt-3 h-3 rounded bg-white/10" /></div>;
}

function Carousel({ items }: { items: PlatformItem[] }) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const next = () => setIndex((current) => (current + 1) % items.length);
  const previous = () => setIndex((current) => (current - 1 + items.length) % items.length);

  return (
    <div onMouseEnter={() => undefined} className="rounded-[2rem] border border-white/10 bg-white/[.04] p-4" onKeyDown={(event) => { if (event.key === 'ArrowRight') next(); if (event.key === 'ArrowLeft') previous(); }} tabIndex={0} aria-label="Featured carousel">
      <div className="flex items-center justify-between gap-3"><Button variant="ghost" onClick={previous}>Previous</Button><p className="font-mono text-xs text-white/60">{String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</p><Button variant="ghost" onClick={next}>Next</Button></div>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {[-1, 0, 1].map((offset) => {
          const item = items[(index + offset + items.length) % items.length];
          return <motion.div key={`${item.id}-${offset}`} drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={(_, info) => { if (info.offset.x < -40) next(); if (info.offset.x > 40) previous(); }} animate={{ opacity: offset === 0 ? 1 : 0.45, scale: offset === 0 ? 1 : 0.92 }} transition={reduce ? { duration: 0 } : motionTokens.springSoft}><BrutalistCard item={item} selected={offset === 0} /></motion.div>;
        })}
      </div>
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10"><motion.div animate={{ width: `${((index + 1) / items.length) * 100}%` }} className="h-full bg-[#d9ff3f]" /></div>
    </div>
  );
}

function Tabs({ active, setActive }: { active: LibraryType; setActive: (type: LibraryType) => void }) {
  return <div className="flex flex-wrap gap-2">{types.map((type) => <button key={type} onClick={() => setActive(type)} className={cn('rounded-full border px-4 py-2 text-xs uppercase tracking-[.2em]', active === type ? 'border-[#45d6ff] bg-[#45d6ff] text-black' : 'border-white/15 text-white/60')}>{type}</button>)}</div>;
}

function Modal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [onClose]);

  return <AnimatePresence>{open ? <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="System modal"><GlassPanel className="max-w-xl"><h2 className="font-serif text-4xl">Command confirmed.</h2><p className="mt-3 text-white/65">This modal supports Escape close, focus-visible controls, and production state language.</p><div className="mt-6"><Button onClick={onClose}>Close</Button></div></GlassPanel></motion.div> : null}</AnimatePresence>;
}

function Drawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <AnimatePresence>{open ? <motion.aside initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} className="fixed inset-y-0 left-0 z-50 w-[min(24rem,90vw)] border-r border-white/10 bg-black/90 p-5 backdrop-blur-2xl"><div className="flex items-center justify-between"><strong>WPX Navigation</strong><IconButton label="Close drawer" onClick={onClose}>×</IconButton></div><div className="mt-8 grid gap-2">{productPages.map((page) => <Link key={page.href} href={page.href} className="rounded-2xl border border-white/10 p-4 hover:border-[#d9ff3f]">{page.label}<span className="block text-xs text-white/45">{page.kicker}</span></Link>)}</div></motion.aside> : null}</AnimatePresence>;
}

function Toast({ show }: { show: boolean }) {
  return <AnimatePresence>{show ? <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} className="fixed bottom-5 right-5 z-50 rounded-full border border-[#d9ff3f] bg-black px-5 py-3 text-sm text-white shadow-2xl">WPX preference saved locally.</motion.div> : null}</AnimatePresence>;
}

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <AnimatePresence>{open ? <motion.div className="fixed inset-0 z-50 bg-black/75 p-4 pt-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Command palette"><div className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-[#0b0b0b] p-4"><SearchInput value="" setValue={() => undefined} />{productPages.map((page) => <Link onClick={onClose} href={page.href} key={page.href} className="mt-2 block rounded-2xl p-4 hover:bg-white/10">{page.label}<span className="block text-xs text-white/45">{page.kicker}</span></Link>)}</div></motion.div> : null}</AnimatePresence>;
}

function CodeBlock({ code }: { code: string }) {
  return <pre className="overflow-x-auto rounded-[1.5rem] border border-white/10 bg-black/60 p-4 font-mono text-xs text-[#d9ff3f]"><code>{code}</code></pre>;
}

function TokenSwatch({ name, value, usage }: { name: string; value: string; usage: string }) {
  return <div className="rounded-[1.5rem] border border-white/10 bg-white/[.04] p-4"><div className="h-20 rounded-2xl border border-white/10" style={{ background: value.startsWith('#') ? value : '#111' }} /><h3 className="mt-4 font-serif text-2xl">{name}</h3><p className="font-mono text-xs text-white/45">{value}</p><p className="mt-2 text-sm text-white/60">{usage}</p></div>;
}

function BuilderCanvas() {
  const nodes = platformItems.filter((item) => item.type === 'component').slice(0, 6);
  return <div className="grid gap-4 lg:grid-cols-[1fr_18rem]"><div className="min-h-[30rem] rounded-[2rem] border-2 border-white/15 bg-[#f4efe4] p-5 text-black shadow-[16px_16px_0_#000]"><MetadataBar items={['12 column grid', 'A4 canvas', 'GPU transforms']} />{nodes.map((node, index) => <motion.div key={node.id} drag className="mt-4 rounded-2xl border-2 border-black bg-white p-4 shadow-[8px_8px_0_#000]"><p className="font-mono text-xs">Node {index + 1}</p><h3 className="font-serif text-3xl">{node.title}</h3></motion.div>)}</div><InspectorPanel item={nodes[0]} /></div>;
}

function InspectorPanel({ item }: { item: PlatformItem }) {
  return <GlassPanel><h3 className="font-serif text-3xl">Inspector</h3><p className="mt-3 text-white/60">Selected node: {item.title}</p>{stateLabels.map((state) => <div key={state} className="mt-2 flex items-center justify-between rounded-xl border border-white/10 p-2 text-xs"><span>{state}</span><span className="h-2 w-2 rounded-full bg-[#d9ff3f]" /></div>)}</GlassPanel>;
}

function AssetCard({ item }: { item: PlatformItem }) {
  return <HolographicCard><p className="font-mono text-xs uppercase text-white/50">{item.category}</p><h3 className="mt-2 font-serif text-3xl">{item.title}</h3><p className="mt-3 text-white/65">{item.description}</p></HolographicCard>;
}

function PromptCard({ item }: { item: PlatformItem }) {
  return <GlassPanel><p className="font-mono text-xs uppercase text-[#45d6ff]">AI Prompt</p><h3 className="mt-2 font-serif text-3xl">{item.title}</h3><CodeBlock code={`Generate ${item.category} with ${item.motionPreset}, AA accessibility, responsive A4 grid, and no console errors.`} /></GlassPanel>;
}

function ThemeCard({ item }: { item: PlatformItem }) {
  return <BrutalistCard item={item} />;
}

function ReportHeader({ title, eyebrow, description }: { title: string; eyebrow: string; description: string }) {
  return <header className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]"><div><p className="font-mono text-xs uppercase tracking-[.35em] text-[#d9ff3f]">{eyebrow}</p><h1 className="mt-5 font-serif text-[clamp(4rem,12vw,11rem)] leading-[.78] tracking-[-.09em]">{title}</h1></div><GlassPanel><p className="text-xl leading-relaxed text-white/72">{description}</p><MetadataBar items={['Quiet Technology', 'Editorial Precision', 'Visual OS']} /></GlassPanel></header>;
}

function AppShell({ children }: { children: React.ReactNode }) {
  const [drawer, setDrawer] = useState(false);
  const [command, setCommand] = useState(false);
  return <div className="min-h-screen text-white"><CinematicBackground /><nav className="sticky top-0 z-40 border-b border-white/10 bg-black/55 backdrop-blur-2xl"><div className="mx-auto flex max-w-[96rem] items-center justify-between px-4 py-4"><Link href="/" className="font-serif text-2xl tracking-[-.05em]">WHISPERX | STUDIO</Link><div className="hidden gap-2 lg:flex">{productPages.slice(0, 6).map((page) => <Link className="rounded-full px-3 py-2 text-xs uppercase tracking-[.16em] text-white/55 hover:bg-white/10 hover:text-white" href={page.href} key={page.href}>{page.label}</Link>)}</div><div className="flex gap-2"><IconButton label="Open command palette" onClick={() => setCommand(true)}>⌘</IconButton><IconButton label="Open navigation drawer" onClick={() => setDrawer(true)}>☰</IconButton></div></div></nav><Drawer open={drawer} onClose={() => setDrawer(false)} /><CommandPalette open={command} onClose={() => setCommand(false)} /><main className="mx-auto max-w-[96rem] px-4 py-8 md:px-8">{children}</main></div>;
}

function LibraryGrid({ type = 'component' as LibraryType, marketplace = false }: { type?: LibraryType; marketplace?: boolean }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [activeType, setActiveType] = useState(type);
  const [selected, setSelected] = useState<string | null>(null);
  const items = useMemo(() => platformItems.filter((item) => (marketplace ? item.type === 'component' : item.type === activeType)).filter((item) => filter === 'All' || item.category === filter).filter((item) => !query || `${item.title} ${item.category} ${item.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())), [activeType, filter, marketplace, query]);
  return <div className="space-y-6"><div className="grid gap-3 lg:grid-cols-[1fr_auto]"><SearchInput value={query} setValue={setQuery} />{marketplace ? null : <Tabs active={activeType} setActive={setActiveType} />}</div><FilterBar active={filter} setActive={setFilter} /><ResultCounter count={items.length} />{items.length === 0 ? <EmptyState /> : <motion.div layout className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{items.map((item) => <BrutalistCard key={item.id} item={item} selected={selected === item.id} onClick={() => setSelected(item.id)} />)}</motion.div>}</div>;
}

function Landing() {
  const featured = platformItems.filter((item) => item.featured).slice(0, 7);
  return <><ReportHeader eyebrow="WPX Visual Operating System" title="Quiet interfaces for impossible complexity." description="WHISPERX | STUDIO combines an editorial architecture book, cinematic product stage, premium component marketplace, AI builder, and design system laboratory into one client-side-first platform." /><section className="mt-10 grid gap-6 lg:grid-cols-[1fr_.72fr]"><A4PageFrame /><div className="space-y-6"><GlassPanel><SectionNumber n="01" label="Opening sequence" /><p className="text-white/70">Black screen, radial glow, scanlines, SVG connector draw, A4 frame scale, grid reveal, metadata stagger, logo reveal, headline mask, preview zoom, floating cards, spring CTAs.</p><div className="mt-5 flex flex-wrap gap-3"><Button>Enter Studio</Button><Button variant="ghost">View Systems</Button></div></GlassPanel><Carousel items={featured} /></div></section><PlatformSections /></>;
}

function A4PageFrame() {
  return <motion.section initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.2 }} className="relative min-h-[42rem] rounded-[2rem] border-2 border-black bg-[#f4efe4] p-6 text-black shadow-[18px_18px_0_#000]"><div className="absolute inset-6 border border-black/20" /><div className="relative grid h-full grid-cols-4 gap-4 md:grid-cols-12"><div className="col-span-full md:col-span-7"><p className="font-mono text-xs uppercase tracking-[.3em]">WHISPERX REPORT / 2026</p><h2 className="mt-8 font-serif text-[clamp(4rem,12vw,10rem)] leading-[.76] tracking-[-.09em]">Invisible Complexity</h2></div><div className="col-span-full md:col-span-5"><PreviewFrame item={platformItems[0]} /></div><div className="col-span-full self-end"><MetadataBar items={['A4 editorial grid', 'Two-column storytelling', 'Holographic glass']} /></div></div></motion.section>;
}

function PlatformSections() {
  return <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">{productPages.slice(2).map((page, index) => <Link key={page.href} href={page.href}><HolographicCard><SectionNumber n={String(index + 2).padStart(2, '0')} label={page.kicker} /><h3 className="font-serif text-4xl leading-none">{page.label}</h3><p className="mt-4 text-white/60">Open a production-grade WPX system surface with shared design tokens, motion language, and responsive behavior.</p></HolographicCard></Link>)}</section>;
}

function PageContent({ kind }: { kind: PageKind }) {
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState(false);
  const [theme, setTheme] = useLocalPreference('wpx-theme', 'cinema');
  const copy = {
    landing: ['Landing', 'Editorial launch surface for the WHISPERX visual operating system.'],
    marketplace: ['Marketplace', 'Search, filter, count, and FLIP-reflow 60 production component systems.'],
    components: ['Component Library', 'Atomic reusable UI with every interaction state represented.'],
    builder: ['Builder Canvas', 'Floating A4 canvas, node cards, inspector, and responsive composition.'],
    motion: ['Motion Lab', 'Tokens for instant, fast, base, smooth, slow, cinematic motion and spring presets.'],
    ai: ['AI Studio', 'Prompt cards and local-only API key preference storage for builder workflows.'],
    assets: ['Asset Manager', 'Twenty production mock assets with cinematic thumbnails and metadata.'],
    tokens: ['Design Tokens', 'Color, spacing, radius, shadow, blur, glass, and motion grammar.'],
    themes: ['Theme Lab', 'Dark, light, glass, paper, high contrast, and holographic theme previews.'],
    settings: ['Settings', 'Local preferences, API key placeholder, command palette, modal, drawer, toast.'],
  } satisfies Record<PageKind, [string, string]>;

  if (kind === 'landing') return <Landing />;

  return <><ReportHeader eyebrow="WHISPERX | STUDIO" title={copy[kind][0]} description={copy[kind][1]} /><div className="mt-8"><MetadataBar items={[`Theme ${theme}`, 'Client-side first', 'No server processing']} /></div><section className="mt-8 space-y-8">{kind === 'marketplace' ? <LibraryGrid marketplace /> : null}{kind === 'components' ? <LibraryGrid type="component" /> : null}{kind === 'builder' ? <BuilderCanvas /> : null}{kind === 'motion' ? <div className="grid gap-4 md:grid-cols-3">{Object.entries(motionTokens).map(([key, value]) => <GlassPanel key={key}><h3 className="font-serif text-3xl">{key}</h3><p className="font-mono text-xs text-[#d9ff3f]">{typeof value === 'string' ? value : JSON.stringify(value)}</p></GlassPanel>)}</div> : null}{kind === 'ai' ? <div className="grid gap-5 md:grid-cols-2">{platformItems.filter((item) => item.type === 'prompt').map((item) => <PromptCard key={item.id} item={item} />)}</div> : null}{kind === 'assets' ? <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">{platformItems.filter((item) => item.type === 'asset').map((item) => <AssetCard key={item.id} item={item} />)}</div> : null}{kind === 'tokens' ? <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">{themeTokens.map((token) => <TokenSwatch key={token.id} {...token} />)}</div> : null}{kind === 'themes' ? <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{platformItems.filter((item) => item.type === 'theme').map((item) => <ThemeCard key={item.id} item={item} />)}</div> : null}{kind === 'settings' ? <GlassPanel><SectionNumber n="10" label="Local preferences" /><div className="grid gap-4 md:grid-cols-3">{['cinema', 'paper', 'glass', 'high-contrast'].map((option) => <Button key={option} variant={theme === option ? 'primary' : 'ghost'} onClick={() => { setTheme(option); setToast(true); window.setTimeout(() => setToast(false), 1800); }}>{option}</Button>)}</div><div className="mt-6 flex flex-wrap gap-3"><Button onClick={() => setModal(true)}>Open Modal</Button><Button variant="ghost">Disabled Demo</Button></div></GlassPanel> : null}</section><Modal open={modal} onClose={() => setModal(false)} /><Toast show={toast} /></>;
}

export function PlatformPage({ kind }: { kind: PageKind }) {
  return <AppShell><PageContent kind={kind} /></AppShell>;
}
