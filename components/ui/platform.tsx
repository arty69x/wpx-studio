'use client';

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motionTokens, platformItems, themeTokens } from '@/data/platform';
import type { PlatformItem } from '@/types/platform';

type PageKind = 'landing' | 'marketplace' | 'components' | 'builder' | 'motion' | 'ai' | 'assets' | 'tokens' | 'themes' | 'settings';
type SceneState = 'discover' | 'build' | 'animate' | 'create' | 'deploy';

const publicNavigation = ['Opening', 'Story', 'Workspace', 'Gallery', 'Language', 'Trust'];
const storyChapters: Array<{ state: SceneState; title: string; copy: string }> = [
  { state: 'discover', title: 'Discover the hidden shape of an interface.', copy: 'The system begins as atmosphere: a quiet frame, a field of signals, and a living archive of visual systems ready to be composed.' },
  { state: 'build', title: 'Build inside an editorial canvas.', copy: 'Layouts feel like pages. Components arrive as precise materials. The workspace stays cinematic without becoming decorative.' },
  { state: 'animate', title: 'Animate with restraint and force.', copy: 'Motion is treated as product grammar: reveal, lift, reflection, connection, timeline, and exit all move from the same rhythm.' },
  { state: 'create', title: 'Create with intelligence in the loop.', copy: 'Creative intelligence appears inside the scene as a prompt layer, not a chatbot bolted onto the edge of the product.' },
  { state: 'deploy', title: 'Deploy a visual operating system.', copy: 'Every artifact is structured, responsive, accessible, and ready to move from concept to production without losing its aura.' },
];

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
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(217,255,63,.20),transparent_30%),radial-gradient(circle_at_18%_78%,rgba(69,214,255,.18),transparent_32%),radial-gradient(circle_at_88%_70%,rgba(255,79,216,.16),transparent_34%)]" />
      <div className="absolute inset-0 opacity-[.14] [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="absolute inset-0 opacity-[.08] [background-image:linear-gradient(transparent_50%,rgba(255,255,255,.55)_51%,transparent_52%)] [background-size:100%_9px]" />
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

export function MotionBadge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-white/15 bg-white/[.04] px-3 py-1 font-mono text-[10px] uppercase tracking-[.18em] text-white/70">{children}</span>;
}

export function SectionNumber({ n, label }: { n: string; label: string }) {
  return <div className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.3em] text-[#d9ff3f]"><span>{n}</span><span className="h-px flex-1 bg-[#d9ff3f]/35" /><span>{label}</span></div>;
}

export function MetadataBar({ items }: { items: string[] }) {
  return <div className="grid gap-2 border-y border-white/10 py-3 font-mono text-[10px] uppercase tracking-[.22em] text-white/55 sm:grid-cols-3">{items.map((item) => <span key={item}>{item}</span>)}</div>;
}

function ConnectorLine({ active = false }: { active?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 620 120" className="absolute inset-x-8 top-1/2 hidden -translate-y-1/2 text-[#d9ff3f]/50 lg:block">
      <motion.path d="M4 92 C180 10 280 10 360 58 S512 128 616 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 10" initial={{ pathLength: 0 }} animate={{ pathLength: active ? 1 : 0.62 }} transition={{ duration: 1.2, ease: 'easeInOut' }} />
    </svg>
  );
}

function PreviewFrame({ item, compact = false }: { item: PlatformItem; compact?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className={cn('relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black p-4', compact ? 'h-40' : 'min-h-[22rem]')}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(217,255,63,.26),transparent_25%),radial-gradient(circle_at_78%_26%,rgba(69,214,255,.20),transparent_28%),radial-gradient(circle_at_52%_86%,rgba(255,79,216,.18),transparent_30%)]" />
      <motion.div animate={reduce ? undefined : { x: ['-20%', '120%'] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }} className="absolute inset-y-0 w-1/3 skew-x-[-18deg] bg-white/10 blur-xl" />
      <div className="relative flex h-full flex-col justify-between gap-5">
        <div className="flex justify-between gap-3"><MotionBadge>{item.category}</MotionBadge><MotionBadge>{item.motionPreset}</MotionBadge></div>
        <div className="grid flex-1 grid-cols-5 items-end gap-2">
          {[0, 1, 2, 3, 4].map((bar) => <motion.span key={bar} animate={reduce ? undefined : { height: [`${28 + bar * 9}%`, `${58 + bar * 7}%`, `${28 + bar * 9}%`] }} transition={{ duration: 1.6 + bar * 0.12, repeat: Infinity }} className="rounded-t-full border border-white/10 bg-white/15" />)}
        </div>
        <div><h4 className="font-serif text-3xl leading-none tracking-[-.06em] text-white">{item.title}</h4><p className="mt-2 text-xs text-white/55">{item.thumbnailStyle}</p></div>
      </div>
    </div>
  );
}

function ProductScene({ state }: { state: SceneState }) {
  const item = platformItems.find((entry) => entry.featured) ?? platformItems[0];
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    setPaletteOpen(state === 'create');
  }, [state]);

  return (
    <div className="relative min-h-[42rem] overflow-hidden rounded-[2.5rem] border border-white/12 bg-white/[.045] p-4 shadow-2xl shadow-black/50 backdrop-blur-2xl md:p-6">
      <ConnectorLine active={state === 'animate' || state === 'deploy'} />
      <motion.div layout className="relative mx-auto max-w-5xl rounded-[2rem] border border-white/15 bg-[#090909]/90 p-4 shadow-[0_40px_120px_rgba(0,0,0,.65)]">
        <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex gap-2"><span className="h-3 w-3 rounded-full bg-[#ff4fd8]" /><span className="h-3 w-3 rounded-full bg-[#d9ff3f]" /><span className="h-3 w-3 rounded-full bg-[#45d6ff]" /></div>
          <p className="font-mono text-[10px] uppercase tracking-[.28em] text-white/45">WHISPERX workspace / live scene</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-[1fr_19rem]">
          <motion.div layout className="rounded-[1.5rem] border border-white/10 bg-[#f4efe4] p-4 text-black shadow-[12px_12px_0_#000]">
            <p className="font-mono text-[10px] uppercase tracking-[.28em]">creative operating surface</p>
            <motion.h3 key={state} initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-5 font-serif text-[clamp(3rem,8vw,7rem)] leading-[.78] tracking-[-.08em]">{state}</motion.h3>
            <motion.div drag className="mt-8 rounded-2xl border-2 border-black bg-white p-4 shadow-[8px_8px_0_#000]">
              <p className="font-mono text-xs uppercase">live component layer</p>
              <p className="mt-2 max-w-md text-sm">A real reusable scene object with hover, focus, selected, loading, reveal, exit, motion, responsive, accessibility, and variant states.</p>
            </motion.div>
          </motion.div>
          <div className="space-y-4">
            <PreviewFrame item={item} compact />
            <GlassPanel className="p-4"><p className="font-mono text-[10px] uppercase tracking-[.24em] text-[#45d6ff]">creative intelligence</p><motion.p key={state} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-sm text-white/70">Compose a {state} sequence with editorial rhythm, glass depth, and production-ready interaction states.</motion.p></GlassPanel>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {paletteOpen ? <motion.div initial={{ opacity: 0, y: 24, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: .96 }} className="absolute bottom-6 left-1/2 w-[min(92%,34rem)] -translate-x-1/2 rounded-[1.5rem] border border-white/15 bg-black/85 p-4 backdrop-blur-2xl"><p className="font-mono text-[10px] uppercase tracking-[.24em] text-white/40">command palette</p><p className="mt-2 text-sm text-white/75">Generate visual system → inspect structure → animate transitions → prepare deployment.</p></motion.div> : null}
      </AnimatePresence>
    </div>
  );
}

function ImmersiveCarousel({ items }: { items: PlatformItem[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const next = useCallback(() => setIndex((current) => (current + 1) % items.length), [items.length]);
  const previous = useCallback(() => setIndex((current) => (current - 1 + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (paused || reduce) return undefined;
    const timer = window.setInterval(next, 4200);
    return () => window.clearInterval(timer);
  }, [next, paused, reduce]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onKeyDown={(event) => { if (event.key === 'ArrowRight') next(); if (event.key === 'ArrowLeft') previous(); }} tabIndex={0} aria-label="Immersive gallery carousel" className="rounded-[2.5rem] border border-white/10 bg-white/[.035] p-4 outline-none focus-visible:ring-4 focus-visible:ring-[#45d6ff]/30">
      <div className="mb-4 flex items-center justify-between gap-3"><Button variant="ghost" onClick={previous}>Previous</Button><p className="font-mono text-xs text-white/55">{String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</p><Button variant="ghost" onClick={next}>Next</Button></div>
      <div className="grid gap-4 md:grid-cols-3">
        {[-1, 0, 1].map((offset) => {
          const item = items[(index + offset + items.length) % items.length];
          return <motion.div key={`${item.id}-${offset}`} drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={(_, info) => { if (info.offset.x < -40) next(); if (info.offset.x > 40) previous(); }} animate={{ opacity: offset === 0 ? 1 : 0.42, scale: offset === 0 ? 1 : 0.92 }} transition={reduce ? { duration: 0 } : motionTokens.springSoft}><PreviewFrame item={item} compact /></motion.div>;
        })}
      </div>
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10"><motion.div animate={{ width: `${((index + 1) / items.length) * 100}%` }} className="h-full bg-[#d9ff3f]" /></div>
    </div>
  );
}

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const commands = ['Discover visual systems', 'Compose editorial canvas', 'Animate interaction grammar', 'Create intelligent prompt', 'Deploy production artifact'];
  const matches = commands.filter((command) => command.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  return <AnimatePresence>{open ? <motion.div className="fixed inset-0 z-50 bg-black/75 p-4 pt-24" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Command palette"><div className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-[#0b0b0b] p-4"><label className="block"><span className="sr-only">Search commands</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search creative commands..." className="min-h-14 w-full rounded-full border border-white/15 bg-black/35 px-5 text-white outline-none transition placeholder:text-white/35 focus:border-[#45d6ff] focus:ring-4 focus:ring-[#45d6ff]/20" /></label>{matches.length === 0 ? <p className="p-4 text-sm text-white/50">No command matches that signal.</p> : matches.map((command) => <button onClick={onClose} key={command} className="mt-2 block w-full rounded-2xl p-4 text-left hover:bg-white/10 focus-visible:ring-4 focus-visible:ring-[#45d6ff]/30">{command}<span className="block text-xs text-white/45">Reusable production command</span></button>)}</div></motion.div> : null}</AnimatePresence>;
}

function AppShell({ children }: { children: React.ReactNode }) {
  const [command, setCommand] = useState(false);
  return <div className="min-h-screen text-white"><CinematicBackground /><nav className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-black/45 backdrop-blur-2xl"><div className="mx-auto flex max-w-[96rem] items-center justify-between px-4 py-4"><Link href="/" className="font-serif text-2xl tracking-[-.05em]">WHISPERX | STUDIO</Link><div className="hidden gap-2 lg:flex">{publicNavigation.map((item) => <a className="rounded-full px-3 py-2 text-xs uppercase tracking-[.16em] text-white/55 hover:bg-white/10 hover:text-white" href={`#${item.toLowerCase()}`} key={item}>{item}</a>)}</div><IconButton label="Open command palette" onClick={() => setCommand(true)}>⌘</IconButton></div></nav><CommandPalette open={command} onClose={() => setCommand(false)} /><main>{children}</main></div>;
}

function Opening() {
  return <section id="opening" className="grid min-h-screen place-items-center px-4 pt-24"><motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="w-full max-w-[92rem] rounded-[2.5rem] border border-white/10 bg-white/[.035] p-5 shadow-2xl shadow-black/50 backdrop-blur-2xl md:p-8"><MetadataBar items={['quiet technology', 'editorial precision', 'cinematic interface']} /><div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-end"><div><p className="font-mono text-xs uppercase tracking-[.35em] text-[#d9ff3f]">official public experience</p><h1 className="mt-5 font-serif text-[clamp(4.8rem,13vw,14rem)] leading-[.75] tracking-[-.1em]">A visual operating system for creative technology.</h1></div><p className="max-w-xl text-xl leading-relaxed text-white/68">The homepage is the product: an immersive field of reusable components, motion grammar, intelligent workflows, and editorial structure.</p></div></motion.div></section>;
}

function Hero() {
  const [state, setState] = useState<SceneState>('discover');
  return <section id="hero" className="mx-auto grid max-w-[96rem] gap-8 px-4 py-20 md:px-8 lg:grid-cols-[.55fr_1fr]"><div className="space-y-6 lg:sticky lg:top-28 lg:self-start"><SectionNumber n="01" label="Hero" /><h2 className="font-serif text-[clamp(3.6rem,8vw,8rem)] leading-[.78] tracking-[-.08em]">The entire system inside one cinematic scene.</h2><p className="text-lg leading-relaxed text-white/62">No cards. No lists. The product appears as a living workspace where discovery, composition, intelligence, motion, and deployment happen together.</p><div className="flex flex-wrap gap-2">{storyChapters.map((chapter) => <button key={chapter.state} onClick={() => setState(chapter.state)} className={cn('rounded-full border px-4 py-2 text-xs uppercase tracking-[.18em] transition focus-visible:ring-4 focus-visible:ring-[#45d6ff]/30', state === chapter.state ? 'border-[#d9ff3f] bg-[#d9ff3f] text-black' : 'border-white/15 bg-white/[.04] text-white/70 hover:border-[#ff4fd8]')}>{chapter.state}</button>)}</div></div><ProductScene state={state} /></section>;
}

function EditorialStory() {
  return <section id="story" className="mx-auto max-w-[86rem] px-4 py-24 md:px-8"><SectionNumber n="02" label="Editorial Story" /><div className="space-y-20">{storyChapters.map((chapter, index) => <motion.article key={chapter.state} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20%' }} transition={{ duration: .8 }} className={cn('grid gap-8 lg:grid-cols-[.7fr_1fr] lg:items-center', index % 2 ? 'lg:[&>*:first-child]:order-2' : '')}><p className="font-mono text-xs uppercase tracking-[.3em] text-[#45d6ff]">{String(index + 1).padStart(2, '0')} / {chapter.state}</p><div><h3 className="font-serif text-[clamp(3rem,7vw,7rem)] leading-[.82] tracking-[-.07em]">{chapter.title}</h3><p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/62">{chapter.copy}</p></div></motion.article>)}</div></section>;
}

function VisualExperience() {
  const visualItems = platformItems.filter((item) => item.featured).slice(0, 6);
  return <section id="workspace" className="mx-auto max-w-[96rem] px-4 py-24 md:px-8"><SectionNumber n="03" label="Interactive Product Moment" /><div className="grid gap-8 lg:grid-cols-[1fr_.55fr]"><ProductScene state="animate" /><GlassPanel><h2 className="font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[.8] tracking-[-.07em]">Interaction replaces explanation.</h2><p className="mt-6 text-lg leading-relaxed text-white/62">The system demonstrates capability through working product moments: a canvas, an intelligent prompt layer, a preview surface, an inspector, and a command interface.</p><div className="mt-8"><ImmersiveCarousel items={visualItems} /></div></GlassPanel></div></section>;
}

function CreativeWorkflow() {
  return <section id="gallery" className="mx-auto max-w-[96rem] px-4 py-24 md:px-8"><SectionNumber n="04" label="Creative Workflow" /><div className="rounded-[2.5rem] border border-white/10 bg-[#f4efe4] p-6 text-black shadow-[18px_18px_0_#000]"><div className="grid gap-10 lg:grid-cols-[.8fr_1fr]"><h2 className="font-serif text-[clamp(4rem,10vw,10rem)] leading-[.75] tracking-[-.09em]">Discover Build Animate Create Deploy</h2><div className="grid content-between gap-6"><p className="text-xl leading-relaxed text-black/70">A continuous workflow, not a set of isolated tools. Every layer is composed from the same production components and motion language used by the public experience.</p><div className="grid gap-3">{storyChapters.map((chapter) => <div key={chapter.state} className="rounded-2xl border-2 border-black bg-white p-4 shadow-[6px_6px_0_#000]"><p className="font-mono text-xs uppercase">{chapter.state}</p><p className="mt-1 text-sm text-black/70">{chapter.copy}</p></div>)}</div></div></div></div></section>;
}

function DesignLanguage() {
  return <section id="language" className="mx-auto max-w-[96rem] px-4 py-24 md:px-8"><SectionNumber n="05" label="Design Language" /><div className="grid gap-5 lg:grid-cols-[1fr_1fr]"><h2 className="font-serif text-[clamp(4rem,10vw,10rem)] leading-[.76] tracking-[-.09em]">Luxury is a system of constraints.</h2><div className="space-y-4">{themeTokens.slice(0, 5).map((token) => <motion.div key={token.id} whileHover={{ x: 8 }} className="flex items-center gap-4 rounded-[1.5rem] border border-white/10 bg-white/[.04] p-4"><span className="h-16 w-16 rounded-2xl border border-white/10" style={{ background: token.value.startsWith('#') ? token.value : '#111' }} /><span><strong className="block font-serif text-2xl">{token.name}</strong><span className="text-sm text-white/55">{token.usage}</span></span></motion.div>)}</div></div></section>;
}

function TrustTechnology() {
  return <section id="trust" className="mx-auto max-w-[86rem] px-4 py-24 text-center md:px-8"><SectionNumber n="06" label="Trust & Technology" /><h2 className="font-serif text-[clamp(4rem,10vw,11rem)] leading-[.75] tracking-[-.1em]">Built as the product. Not a facade.</h2><p className="mx-auto mt-8 max-w-3xl text-xl leading-relaxed text-white/62">The public website uses the same reusable components, central dataset, motion tokens, local preference layer, accessibility rules, and responsive layout logic that support the product surfaces behind it.</p><div className="mt-10"><Button>Request private preview</Button></div></section>;
}

function Footer() {
  return <footer className="border-t border-white/10 px-4 py-10 md:px-8"><div className="mx-auto flex max-w-[96rem] flex-col justify-between gap-6 md:flex-row md:items-center"><p className="font-serif text-3xl">WHISPERX | STUDIO</p><p className="font-mono text-xs uppercase tracking-[.22em] text-white/45">Quiet Technology / Editorial Precision / Invisible Complexity</p></div></footer>;
}

function PublicWebsite() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return <AppShell><motion.div style={{ scaleX }} className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-[#d9ff3f]" /><Opening /><Hero /><EditorialStory /><VisualExperience /><CreativeWorkflow /><DesignLanguage /><TrustTechnology /><Footer /></AppShell>;
}

export function PlatformPage({ kind }: { kind: PageKind }) {
  void kind;
  return <PublicWebsite />;
}
