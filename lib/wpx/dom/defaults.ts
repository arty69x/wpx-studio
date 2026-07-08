import { motionTokens, themeTokens } from '@/data/platform';
import type { WPXDomNode, WPXDomProject, WPXDomSourceKind } from './types';

export const wpxNow = () => Date.now();
export const wpxUid = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${globalThis.crypto?.randomUUID?.().slice(0, 8) ?? Math.random().toString(36).slice(2, 10)}`;

export function parseClassAst(className = '') {
  return className.split(/\s+/).filter(Boolean).map((token) => {
    const important = token.startsWith('!');
    const parts = token.replace(/^!/, '').split(':');
    const utility = parts.pop() ?? token;
    return { token, important, variants: parts, utility, group: utility.split('-')[0] ?? utility };
  });
}

export function createDomNode(input: Partial<WPXDomNode> & { type?: string; name?: string; sourceKind?: WPXDomSourceKind } = {}): WPXDomNode {
  const timestamp = wpxNow();
  const className = input.className ?? '';
  return {
    id: input.id ?? wpxUid('node'),
    type: input.type ?? 'section',
    name: input.name ?? 'Untitled Node',
    role: input.role,
    props: input.props ?? {},
    content: input.content,
    tokens: input.tokens ?? {},
    layout: input.layout ?? {},
    style: input.style ?? {},
    className,
    classAst: input.classAst ?? parseClassAst(className),
    motion: input.motion ?? {},
    events: input.events ?? {},
    states: input.states ?? {},
    responsive: input.responsive ?? {},
    children: input.children ?? [],
    source: input.source ?? { kind: input.sourceKind ?? 'manual' },
    metadata: input.metadata ?? {},
    createdAt: input.createdAt ?? timestamp,
    updatedAt: input.updatedAt ?? timestamp,
  };
}

export const createHeroNode = (sourceKind: WPXDomSourceKind = 'default') => createDomNode({
  type: 'section',
  name: 'JSON Kernel Hero',
  role: 'hero',
  sourceKind,
  className: 'mx-auto grid max-w-5xl gap-5 rounded-[28px] border border-white/10 bg-black/50 p-8 shadow-2xl',
  content: 'JSON is the DOM Kernel. Preview is only a render target.',
  tokens: { accent: 'color-lime', surface: 'color-cinema' },
  motion: { preset: 'reveal', duration: 420, easing: 'easeOut' },
  metadata: { category: 'Hero', tags: ['json-dom', 'builder'], accessibilityStatus: 'pass', performanceStatus: 'pass' },
  children: [
    createDomNode({ type: 'heading', name: 'Hero Heading', role: 'heading', content: 'Build from JSON. Ship from JSON.', className: 'text-4xl font-black leading-tight md:text-6xl', sourceKind }),
    createDomNode({ type: 'text', name: 'Hero Body', content: 'Every layer, preview click, inspector edit, and one-click builder mutates the DOM project first.', className: 'max-w-2xl text-sm leading-7 text-[var(--muted)]', sourceKind }),
    createDomNode({ type: 'button', name: 'Primary CTA', role: 'cta', content: 'Add Section', className: 'w-fit rounded-md bg-[var(--lime)] px-4 py-2 text-xs font-black uppercase tracking-[.12em] text-black', sourceKind }),
  ],
});

export const createSectionNode = (name = 'New Section', sourceKind: WPXDomSourceKind = 'manual') => createDomNode({
  type: 'section',
  name,
  role: 'content',
  sourceKind,
  className: 'rounded-2xl border border-white/10 bg-white/[.03] p-6',
  content: 'New JSON DOM section',
  metadata: { category: 'Section', tags: ['manual'] },
  children: [createDomNode({ type: 'heading', name: `${name} Heading`, content: name, className: 'text-2xl font-black', sourceKind })],
});

export function createDefaultDomProject(): WPXDomProject {
  const timestamp = wpxNow();
  const root = createDomNode({
    id: 'wpx-root',
    type: 'root',
    name: 'Home Root',
    role: 'root',
    sourceKind: 'default',
    className: 'min-h-[680px] space-y-6 bg-[var(--background)] p-6 text-[var(--foreground)]',
    children: [createHeroNode('default'), createSectionNode('Feature Stack', 'default')],
  });
  const page = { id: 'page-home', name: 'Home', path: '/', root, seo: { title: 'WPX JSON DOM Builder' } };
  return {
    id: wpxUid('dom-project'),
    name: 'WPX Live Builder',
    activePageId: page.id,
    pages: [page],
    selectedNodeId: root.children[0]?.id ?? root.id,
    previewMode: 'desktop',
    themeMode: 'dark',
    motionEnabled: true,
    safeAssetMode: true,
    assets: [],
    designTokens: Object.fromEntries(themeTokens.map((token) => [token.id, token.value])),
    motionTokens: { ...motionTokens },
    commandHistory: [],
    redoStack: [],
    validationReports: [],
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function createLandingPageProject() {
  const project = createDefaultDomProject();
  const root = project.pages[0].root;
  return { ...project, name: 'WPX Landing Page', pages: [{ ...project.pages[0], root: { ...root, children: [createHeroNode('template'), createSectionNode('Proof Section', 'template'), createSectionNode('CTA Section', 'template')] } }] };
}
