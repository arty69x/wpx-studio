'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  activities,
  aiPrompts,
  allLibrary,
  assets,
  motionPresets,
  projects,
  wxCategories,
} from '@/data/whisperx';

type PageKind =
  | 'landing'
  | 'marketplace'
  | 'components'
  | 'builder'
  | 'motion'
  | 'ai'
  | 'assets'
  | 'tokens'
  | 'themes'
  | 'settings'
  | 'dashboard'
  | 'docs';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  eyebrow?: string;
  number?: string;
};

const nav = [
  ['/', 'Home'],
  ['/builder', 'Builder'],
  ['/marketplace', 'Marketplace'],
  ['/studio', 'AI Studio'],
  ['/dashboard', 'Dashboard'],
  ['/docs', 'Docs'],
];

const iconSystem = [
  ['⬡', 'Build'],
  ['✧', 'AI Magic'],
  ['▣', 'Templates'],
  ['✄', 'Components'],
  ['⌁', 'Publish'],
  ['▥', 'Analytics'],
  ['♡', 'Team'],
  ['✓', 'Success'],
  ['▷', 'Play'],
  ['⚙', 'Settings'],
  ['▤', 'Docs'],
  ['?', 'Help'],
  ['⌕', 'Search'],
  ['▢', 'Lock'],
  ['⌯', 'Share'],
  ['⇩', 'Download'],
];

const colors = [
  ['Lime Green', '#C6FF00'],
  ['Neon Pink', '#FF2ED1'],
  ['Pure White', '#FFFFFF'],
  ['Graphite', '#0E0F12'],
  ['Smoke 900', '#16181D'],
  ['Smoke 700', '#23242A'],
  ['Smoke 500', '#3A3A44'],
  ['Smoke 300', '#868C95'],
];

const workflow = ['Discover', 'Explore', 'Install', 'Build', 'Edit', 'Generate', 'Preview', 'Publish', 'Monitor', 'Improve'];
const cn = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

function ThemeScript() {
  useEffect(() => {
    document.documentElement.dataset.theme = localStorage.getItem('wx-theme') || 'dark';
  }, []);

  return null;
}

function Shell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleTheme = () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('wx-theme', next);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <ThemeScript />
      <Ambient />
      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-black/65 backdrop-blur-2xl">
        <nav className="mx-auto flex max-w-[1800px] items-center justify-between px-4 py-3 lg:px-6">
          <Link href="/" className="flex items-center gap-3 text-sm font-black uppercase tracking-[.22em]">
            <BrandMark size="sm" />
            <span>Whisper<span className="text-[var(--pink)]">X</span></span>
            <span className="hidden text-[10px] text-[var(--muted)] md:inline">| Studio</span>
          </Link>
          <div className="hidden items-center rounded-2xl border border-[var(--border)] bg-white/[.035] p-1 lg:flex">
            {nav.map(([href, label]) => (
              <Link
                className="rounded-xl px-3 py-2 text-[11px] font-bold uppercase tracking-[.14em] text-[var(--muted)] transition hover:bg-white/10 hover:text-white"
                href={href}
                key={href}
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button className="control" onClick={toggleTheme} type="button">Mode</button>
            <button className="control lg:hidden" onClick={() => setMobileOpen((value) => !value)} type="button">Menu</button>
          </div>
        </nav>
        {mobileOpen ? (
          <div className="grid gap-2 border-t border-[var(--border)] p-4 lg:hidden">
            {nav.map(([href, label]) => (
              <Link className="panel-link" href={href} key={href} onClick={() => setMobileOpen(false)}>
                {label}
              </Link>
            ))}
          </div>
        ) : null}
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function Ambient() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(198,255,0,.18),transparent_30%),radial-gradient(circle_at_85%_10%,rgba(255,46,209,.16),transparent_26%),radial-gradient(circle_at_55%_95%,rgba(134,92,255,.12),transparent_30%),linear-gradient(180deg,#020304,#06080d_55%,#030406)]" />
      <div className="absolute inset-0 opacity-[.09] [background-image:linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(255,255,255,.07),transparent)]" />
    </div>
  );
}

function Card({ children, className = '', eyebrow, number }: CardProps) {
  return (
    <section className={cn('wpx-card relative overflow-hidden rounded-[22px] border border-[var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,.055),rgba(255,255,255,.018))] p-4 shadow-2xl shadow-black/25 backdrop-blur-xl', className)}>
      {eyebrow ? (
        <p className="relative z-10 mb-4 flex items-center gap-2 border-b border-[var(--border)] pb-3 text-[11px] font-black uppercase tracking-[.14em]">
          <span className="text-[var(--lime)]">{number}</span>
          <span>{eyebrow}</span>
        </p>
      ) : null}
      <div className="relative z-10">{children}</div>
    </section>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-black uppercase tracking-[.18em] text-[var(--lime)]">{children}</p>;
}

function BrandMark({ size = 'lg' }: { size?: 'sm' | 'md' | 'lg' }) {
  return <span aria-hidden="true" className={cn('brand-mark', size === 'sm' && 'brand-mark-sm', size === 'md' && 'brand-mark-md')}><span /><b /><i /></span>;
}

function Ghost({ size = 'lg', mood = 'default' }: { size?: 'sm' | 'md' | 'lg'; mood?: 'default' | 'happy' | 'focused' }) {
  return (
    <span aria-hidden="true" className={cn('ghostx', size === 'sm' && 'ghostx-sm', size === 'md' && 'ghostx-md', mood === 'focused' && 'ghostx-focused')}>
      <span className="eye left" />
      <span className="eye right" />
      <span className={cn('mouth', mood === 'happy' && 'mouth-happy')} />
      <span className="badge"><BrandMark size="sm" /></span>
    </span>
  );
}

function Button({ children, ghost = false, onClick }: { children: React.ReactNode; ghost?: boolean; onClick?: () => void }) {
  return (
    <button
      className={cn(
        'min-h-11 rounded-xl px-4 text-[11px] font-black uppercase tracking-[.12em] transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--lime)]',
        ghost ? 'border border-[var(--borderStrong)] bg-white/[.025] text-white hover:bg-white/10' : 'bg-[var(--lime)] text-black shadow-[0_0_30px_rgba(198,255,0,.28)] hover:bg-[var(--primaryHover)]',
      )}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function TemplateLayout({ children, intro, title }: { children: React.ReactNode; intro: string; title: string }) {
  return (
    <Shell>
      <section className="mx-auto max-w-[1800px] px-3 py-3 lg:px-5">
        <Card className="mb-3" eyebrow="Production Surface" number="00">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Kicker>WhisperX Studio</Kicker>
              <h1 className="mt-3 max-w-5xl text-[clamp(40px,6vw,104px)] font-black leading-[.88] tracking-[-.06em]">{title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--muted)] md:text-lg">{intro}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button>Get Started</Button>
              <Button ghost>Watch Demo</Button>
            </div>
          </div>
        </Card>
        {children}
      </section>
    </Shell>
  );
}

function LogoSystem() {
  return (
    <Card className="min-h-[420px]" eyebrow="Logo System" number="01">
      <div className="grid place-items-center rounded-[24px] border border-[var(--border)] bg-[radial-gradient(circle,rgba(255,255,255,.11),transparent_58%)] px-6 py-10 text-center">
        <BrandMark />
        <h2 className="mt-7 text-[clamp(34px,4vw,72px)] font-black tracking-[.23em]">WHISPER<span className="text-[var(--pink)]">X</span></h2>
        <p className="mt-3 text-sm font-black uppercase tracking-[.45em] text-[var(--lime)]">Build Without Limits</p>
        <p className="mt-6 max-w-md text-sm leading-6 text-[var(--muted)]">The creative operating system for building, refining, and publishing digital experiences without limits.</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {['Primary', 'Icon', 'Wordmark', 'Mono'].map((label) => (
          <div className="rounded-2xl border border-[var(--border)] bg-black/30 p-4 text-center text-[10px] uppercase tracking-[.14em]" key={label}>
            <BrandMark size="md" />
            <p className="mt-3">{label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function MascotSystem() {
  return (
    <Card eyebrow="Mascot — GhostX" number="02">
      <div className="grid items-center gap-8 xl:grid-cols-[.72fr_1fr]">
        <div>
          <h2 className="text-[clamp(32px,4vw,64px)] font-black leading-[.95] tracking-[-.04em]">Your <span className="text-[var(--pink)]">creative</span><br /><span className="text-[var(--lime)]">sidekick.</span></h2>
          <p className="mt-5 max-w-sm text-sm leading-7 text-[var(--muted)]">GhostX brings clarity, curiosity, and a spark of mischief to every step of creation.</p>
          <div className="mt-6 grid gap-2 text-sm">
            {['☺ Friendly', '✧ Clever', '?? Curious', '∞ Limitless'].map((trait) => <p key={trait}>{trait}</p>)}
          </div>
        </div>
        <Ghost />
      </div>
      <div className="mt-5 grid grid-cols-3 gap-3 md:grid-cols-6">
        {['Wave', 'Point', 'Think', 'Create', 'Focused', 'Sleepy'].map((pose, index) => (
          <div className="rounded-2xl border border-[var(--border)] bg-black/25 p-3 text-center text-[10px] uppercase tracking-[.12em]" key={pose}>
            <Ghost mood={index % 2 ? 'happy' : 'default'} size="sm" />
            <p>{pose}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ColorSystem() {
  return (
    <Card eyebrow="Color System" number="03">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {colors.map(([name, color]) => (
          <div className="rounded-2xl border border-[var(--border)] bg-black/25 p-3" key={name}>
            <div className="h-16 rounded-xl border border-[var(--borderStrong)]" style={{ background: color }} />
            <p className="mt-3 text-[10px] font-black uppercase tracking-[.12em]">{name}</p>
            <p className="font-mono text-[10px] text-[var(--muted)]">{color}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {['linear-gradient(90deg,#C6FF00,#0E0F12)', 'linear-gradient(90deg,#FF2ED1,#865CFF)', 'linear-gradient(90deg,#C6FF00,#FF2ED1,#FFB6E8)'].map((gradient) => (
          <div className="h-12 rounded-xl border border-[var(--borderStrong)]" key={gradient} style={{ background: gradient }} />
        ))}
      </div>
    </Card>
  );
}

function TypographySystem() {
  return (
    <Card eyebrow="Typography System" number="04">
      <div className="grid gap-5 md:grid-cols-3">
        <div>
          <p className="text-7xl font-black tracking-[-.06em]">Aa</p>
          <h3 className="mt-2 font-black">Clash Display</h3>
          <p className="mt-2 font-mono text-[10px] text-[var(--muted)]">ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />0123456789 !@#$%^&*</p>
        </div>
        <div>
          <p className="text-7xl tracking-[-.05em]">Aa</p>
          <h3 className="mt-2 font-black">Inter</h3>
          <p className="mt-2 font-mono text-[10px] text-[var(--muted)]">Headings, body, labels, UI copy, and command text.</p>
        </div>
        <div className="grid gap-2 text-sm text-[var(--muted)]">
          {['Light / Editorial captions', 'Regular / Body copy', 'Semibold / Labels', 'Bold / Product moments', 'Black / Display headlines'].map((usage) => <p className="rounded-xl border border-[var(--border)] p-3" key={usage}>{usage}</p>)}
        </div>
      </div>
    </Card>
  );
}

function IconSystem() {
  return (
    <Card eyebrow="Icon System" number="05">
      <div className="grid grid-cols-4 gap-3 md:grid-cols-8">
        {iconSystem.map(([icon, label], index) => (
          <div className="rounded-2xl border border-[var(--border)] bg-black/25 p-3 text-center" key={label}>
            <p className={cn('text-3xl', index % 2 ? 'text-[var(--pink)]' : 'text-[var(--lime)]')}>{icon}</p>
            <p className="mt-2 text-[10px] font-bold">{label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ComponentsShowcase() {
  return (
    <Card eyebrow="Components" number="09">
      <div className="grid gap-4 xl:grid-cols-[.7fr_1fr_1fr]">
        <div className="grid content-start gap-3">
          <Button>Publish Now</Button>
          <Button ghost>Explore</Button>
          <Button ghost>Learn More</Button>
        </div>
        <div className="grid gap-3">
          <input className="field" placeholder="Search components..." />
          <select className="field" defaultValue="">
            <option value="" disabled>Choose a category</option>
            <option>Hero</option>
            <option>Section</option>
          </select>
          <label className="flex items-center gap-2 text-sm text-[var(--muted)]"><input defaultChecked type="checkbox" /> Enable advanced mode</label>
        </div>
        <div className="rounded-2xl border border-[var(--lime)] bg-black/35 p-4 shadow-[0_0_36px_rgba(198,255,0,.24)]">
          <Kicker>Hover Card</Kicker>
          <h3 className="mt-3 text-2xl font-black">AI Hero Section</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Premium component with production states, tags, and installation actions.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Premium', 'AI', 'Responsive'].map((tag) => <span className="rounded-full border border-[var(--borderStrong)] px-3 py-1 text-[10px]" key={tag}>{tag}</span>)}
          </div>
        </div>
      </div>
    </Card>
  );
}

function BuilderWorkspace({ compact = false }: { compact?: boolean }) {
  return (
    <Card className={compact ? '' : 'xl:col-span-2'} eyebrow="Builder Workspace Preview" number="14">
      <div className="grid min-h-[360px] gap-3 lg:grid-cols-[190px_1fr_240px]">
        <aside className="rounded-2xl border border-[var(--border)] bg-black/25 p-3 text-xs text-[var(--muted)]">
          {['Hero Section', 'Character', 'Heading', 'Text', 'Button', 'Image', 'Background'].map((item, index) => (
            <p className={cn('rounded-xl p-2', index === 0 && 'bg-white/10 text-white')} key={item}>▸ {item}</p>
          ))}
        </aside>
        <div className="relative overflow-hidden rounded-2xl border border-[var(--borderStrong)] bg-[radial-gradient(circle_at_75%_42%,rgba(198,255,0,.22),transparent_24%),radial-gradient(circle_at_85%_20%,rgba(255,46,209,.16),transparent_26%),#07090f] p-8">
          <div className="max-w-sm">
            <Kicker>Canvas / Home Page</Kicker>
            <h2 className="mt-8 text-[clamp(44px,6vw,86px)] font-black leading-[.86] tracking-[-.06em]">Design<br />Without<br /><span className="text-[var(--pink)]">Limits.</span></h2>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">The creative OS for AI-powered builders.</p>
          </div>
          <div className="absolute right-8 top-10 hidden md:block"><Ghost size="md" /></div>
          <div className="absolute bottom-5 left-5 flex flex-wrap gap-2"><Button>Start Building</Button><Button ghost>Preview</Button></div>
        </div>
        <aside className="rounded-2xl border border-[var(--border)] bg-black/25 p-3 text-xs">
          <Kicker>Inspector</Kicker>
          {['X 240', 'Y 140', 'W 480', 'H 120', 'Opacity 100', 'Radius 24'].map((metric) => <p className="mt-3 rounded-xl bg-white/5 p-2" key={metric}>{metric}</p>)}
        </aside>
      </div>
    </Card>
  );
}

function DashboardCard() {
  return (
    <Card eyebrow="Dashboard" number="13">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          ['Projects', '1,248'],
          ['Components', '2,845'],
          ['Templates', '428'],
          ['Publish Rate', '98%'],
        ].map(([label, value]) => (
          <div className="rounded-2xl border border-[var(--border)] bg-black/25 p-4" key={label}>
            <p className="text-[10px] uppercase tracking-[.16em] text-[var(--muted)]">{label}</p>
            <b className="mt-2 block text-3xl">{value}</b>
            <p className="mt-1 text-[10px] text-[var(--lime)]">+18.2%</p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[220px_1fr]">
        <div className="grid aspect-square place-items-center rounded-full border-[24px] border-[var(--pink)] border-r-[var(--lime)] text-3xl font-black">78%</div>
        <div className="grid content-start gap-2">
          {activities.slice(0, 5).map((activity) => <p className="rounded-xl bg-white/5 p-3 text-sm" key={activity.id}>{activity.message}</p>)}
        </div>
      </div>
    </Card>
  );
}

function WorkflowMap() {
  return (
    <Card className="xl:col-span-2" eyebrow="User Workflow" number="06">
      <div className="grid gap-3 md:grid-cols-5 xl:grid-cols-10">
        {workflow.map((step, index) => (
          <div className="rounded-2xl border border-[var(--border)] bg-black/25 p-3 text-center" key={step}>
            <span className={cn('mx-auto grid h-10 w-10 place-items-center rounded-full border text-sm font-black', index === 0 || index === 8 ? 'border-[var(--lime)] text-[var(--lime)] shadow-[0_0_20px_rgba(198,255,0,.25)]' : 'border-[var(--pink)] text-[var(--pink)]')}>{index + 1}</span>
            <p className="mt-3 text-[10px] font-black uppercase tracking-[.12em]">{step}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Landing() {
  return (
    <Shell>
      <section className="mx-auto grid max-w-[1800px] gap-3 p-3 lg:grid-cols-[1fr_1.15fr_1fr_.7fr] lg:p-5">
        <LogoSystem />
        <MascotSystem />
        <div className="grid gap-3"><ColorSystem /><TypographySystem /></div>
        <IconSystem />
        <ComponentsShowcase />
        <DashboardCard />
        <Card eyebrow="Mobile Preview" number="15">
          <div className="mx-auto max-w-[230px] rounded-[34px] border border-[var(--borderStrong)] bg-black p-5 text-center shadow-2xl">
            <Ghost size="sm" />
            <h2 className="mt-5 text-3xl font-black leading-none">Build Without <span className="text-[var(--lime)]">Limits.</span></h2>
            <p className="mt-3 text-xs leading-5 text-[var(--muted)]">The creative OS for AI-powered builders.</p>
            <div className="mt-4"><Button>Get Started</Button></div>
          </div>
        </Card>
        <BuilderWorkspace />
        <WorkflowMap />
        <Card className="xl:col-span-2" eyebrow="Promotional Banners" number="16">
          <div className="grid gap-3 md:grid-cols-4">
            {['AI That Designs With You.', '100+ Production Components', 'Publish Anywhere. One Click.', 'Create Faster. Ship Sooner.'].map((copy) => (
              <div className="min-h-32 rounded-2xl border border-[var(--border)] bg-black/25 p-5" key={copy}>
                <h3 className="text-2xl font-black leading-tight">{copy}</h3>
              </div>
            ))}
          </div>
        </Card>
        <Card className="xl:col-span-2" eyebrow="Visual Style Guide" number="17">
          <div className="grid gap-3 md:grid-cols-5">
            {['Neon Glow', 'Smoke Effect', 'Glass Morphism', 'Grid Pattern', 'Gradient Mesh'].map((label, index) => (
              <div className="h-28 rounded-2xl border border-[var(--border)] p-3 text-xs font-bold" key={label} style={{ background: index === 0 ? 'linear-gradient(135deg,#ff2ed1,#111,#c6ff00)' : undefined }}>
                {label}
              </div>
            ))}
          </div>
        </Card>
      </section>
    </Shell>
  );
}

function Builder() {
  const [selectedLayer, setSelectedLayer] = useState('Hero / 01');
  const [toast, setToast] = useState('');

  return (
    <TemplateLayout intro="A production builder workspace with live layers, canvas, inspector, lockspec spacing, and publish-ready interaction states." title="Build stunning websites faster.">
      <div className="grid gap-3 xl:grid-cols-[280px_1fr_320px]">
        <Card eyebrow="Layers" number="01">
          {['Hero / 01', 'Navigation', 'CTA Button', 'GhostX', 'Feature Grid', 'Footer'].map((layer) => (
            <button className={cn('panel-link', selectedLayer === layer && 'bg-[var(--lime)]/15 text-white ring-1 ring-[var(--lime)]')} key={layer} onClick={() => setSelectedLayer(layer)} type="button">{layer}</button>
          ))}
        </Card>
        <BuilderWorkspace compact />
        <Card eyebrow="Inspector" number="02">
          <Kicker>{selectedLayer}</Kicker>
          {['Position', 'Size', 'Auto Layout', 'Constraints', 'Effects'].map((control) => (
            <label className="mt-3 block rounded-2xl border border-[var(--border)] p-3 text-sm" key={control}>
              {control}
              <input className="mt-3 w-full accent-[var(--pink)]" type="range" />
            </label>
          ))}
          <div className="mt-4"><Button onClick={() => setToast(`${selectedLayer} polished and locked.`)}>Apply to Canvas</Button></div>
        </Card>
      </div>
      {toast ? <div className="fixed bottom-6 right-6 z-50 rounded-2xl border border-[var(--lime)] bg-black p-4 text-sm font-bold text-[var(--lime)] shadow-2xl">{toast}</div> : null}
    </TemplateLayout>
  );
}

function Marketplace() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const filtered = allLibrary.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category;
    const matchesQuery = `${item.title} ${item.description} ${item.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <TemplateLayout intro="Curated templates, components, motion presets, and UI kits arranged as production marketplace cards with filtering and install-ready detail density." title="Discover systems that ship.">
      <Card eyebrow="Marketplace Preview" number="01">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
          <input className="field" onChange={(event) => setQuery(event.target.value)} placeholder="Search components, templates, motion..." value={query} />
          <p className="self-center text-sm text-[var(--muted)]">{filtered.length} results</p>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {wxCategories.map((item) => <button className={cn('chip', category === item && 'chip-active')} key={item} onClick={() => setCategory(item)} type="button">{item}</button>)}
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {filtered.slice(0, 15).map((item) => (
            <article className="rounded-2xl border border-[var(--border)] bg-black/25 p-4" key={item.id}>
              <Ghost size="sm" />
              <Kicker>{item.category}</Kicker>
              <h2 className="mt-3 text-xl font-black">{item.title}</h2>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.slice(0, 2).map((tag) => <span className="rounded-full border border-[var(--border)] px-2 py-1 text-[10px]" key={tag}>{tag}</span>)}
              </div>
            </article>
          ))}
        </div>
      </Card>
    </TemplateLayout>
  );
}

function Studio() {
  const [result, setResult] = useState('');
  const generated = useMemo(() => 'Created a modern hero section with gradient mesh, GhostX mascot, accessible CTA group, responsive lockspec grid, reusable tokens, and publish-safe content hierarchy.', []);

  return (
    <TemplateLayout intro="A focused AI production surface for prompt presets, generated sections, apply-to-canvas flows, and clear output states." title="Generate with creative context.">
      <div className="grid gap-3 lg:grid-cols-[.85fr_1.15fr]">
        <Card eyebrow="Prompt" number="01">
          <textarea className="field min-h-48" defaultValue={aiPrompts[0]?.prompt} />
          <div className="mt-4 flex flex-wrap gap-2">
            {aiPrompts.slice(0, 5).map((prompt) => <button className="chip" key={prompt.id} type="button">{prompt.title}</button>)}
          </div>
          <div className="mt-4"><Button onClick={() => setResult(generated)}>Generate Section</Button></div>
        </Card>
        <Card eyebrow="Generated Result" number="02">
          <div className="min-h-64 rounded-2xl border border-[var(--border)] bg-black/30 p-5 font-mono text-sm leading-7 text-[var(--muted)]">{result || 'GhostX is thinking through layout, copy, contrast, spacing, and production states...'}</div>
          <div className="mt-4"><Button>Apply to Canvas</Button></div>
        </Card>
      </div>
    </TemplateLayout>
  );
}

function Dashboard() {
  return (
    <TemplateLayout intro="Operational clarity for projects, publishing, activity, usage, and team velocity in the same product language as the builder." title="Monitor every launch signal.">
      <div className="grid gap-3 xl:grid-cols-[1fr_.85fr]">
        <DashboardCard />
        <Card eyebrow="Projects" number="02">
          <div className="grid gap-3">
            {projects.map((project) => (
              <article className="rounded-2xl border border-[var(--border)] bg-black/25 p-4" key={project.id}>
                <h2 className="text-2xl font-black">{project.title}</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">{project.status} · {project.updatedAt}</p>
              </article>
            ))}
          </div>
        </Card>
      </div>
    </TemplateLayout>
  );
}

function Docs() {
  return (
    <TemplateLayout intro="The studio bible captures the product foundation, architecture, module map, workflow, and lockspec tokens for teams building against WPX." title="Studio design bible.">
      <div className="grid gap-3 lg:grid-cols-2">
        {['Product Foundation', 'Product Architecture', 'Module Overview', 'User Workflow', 'Lockspec Tokens', 'Release QA'].map((section, index) => (
          <Card eyebrow={section} key={section} number={String(index + 1).padStart(2, '0')}>
            <h2 className="text-3xl font-black">{section}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">Production rules, visual constraints, route ownership, interaction states, accessibility checks, and deployment readiness for pixel-perfect WHISPERX surfaces.</p>
          </Card>
        ))}
      </div>
      <div className="mt-3"><WorkflowMap /></div>
    </TemplateLayout>
  );
}

function TokensPage() {
  return (
    <TemplateLayout intro="A system reference for color, type, iconography, motion, assets, and spacing/radius guidance across the full app." title="Design tokens and assets.">
      <div className="grid gap-3 xl:grid-cols-2">
        <ColorSystem />
        <TypographySystem />
        <IconSystem />
        <Card eyebrow="Motion and Assets" number="06">
          <div className="grid gap-3 md:grid-cols-2">
            {motionPresets.slice(0, 6).map((preset) => <div className="rounded-2xl border border-[var(--border)] bg-black/25 p-4" key={preset.id}><h3 className="font-black">{preset.title}</h3><p className="text-sm text-[var(--muted)]">{preset.duration}ms · {preset.token}</p></div>)}
            {assets.slice(0, 4).map((asset) => <div className="rounded-2xl border border-[var(--border)] bg-black/25 p-4" key={asset.id}><h3 className="font-black">{asset.title}</h3><p className="text-sm text-[var(--muted)]">{asset.type} · {asset.size}</p></div>)}
          </div>
        </Card>
      </div>
    </TemplateLayout>
  );
}

function Footer() {
  return (
    <footer className="mx-auto flex max-w-[1800px] flex-col gap-3 border-t border-[var(--border)] px-5 py-6 text-[10px] uppercase tracking-[.34em] text-[var(--muted)] md:flex-row md:items-center md:justify-between">
      <span>WPX Studio</span>
      <span>Minimal · Precise · Engineered · Modern · Powerful</span>
    </footer>
  );
}

export function PlatformPage({ kind }: { kind: PageKind }) {
  if (kind === 'builder') return <Builder />;
  if (kind === 'marketplace' || kind === 'components' || kind === 'motion') return <Marketplace />;
  if (kind === 'ai') return <Studio />;
  if (kind === 'dashboard') return <Dashboard />;
  if (kind === 'docs') return <Docs />;
  if (kind === 'assets' || kind === 'tokens' || kind === 'themes' || kind === 'settings') return <TokensPage />;
  return <Landing />;
}
