import { motionTokens, themeTokens } from '@/data/platform';
import type { WPXDomNode, WPXDomPage, WPXDomProject } from './types';

export const wpxNow = () => Date.now();
export const wpxUid = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${globalThis.crypto?.randomUUID?.().slice(0, 8) ?? Math.random().toString(36).slice(2, 10)}`;
export const parseClassAst = (className: string) => className.split(/\s+/).filter(Boolean).map((token) => { const parts = token.replace(/^!/, '').split(':'); const utility = parts.pop() ?? token; return { token, variants: parts, utility, group: utility.split('-')[0] ?? utility, important: token.startsWith('!') }; });

export function createDomNode(input: Partial<WPXDomNode> & { type?: WPXDomNode['type']; name?: string } = {}): WPXDomNode {
  const timestamp = wpxNow();
  const className = input.className ?? '';
  return {
    id: input.id ?? wpxUid('node'), type: input.type ?? 'section', name: input.name ?? 'Untitled Node', role: input.role ?? 'content', props: input.props ?? {}, content: input.content ?? null,
    tokens: input.tokens ?? {}, layout: input.layout ?? {}, style: input.style ?? {}, className, classAst: input.classAst ?? parseClassAst(className), motion: input.motion ?? {}, events: input.events ?? [], states: input.states ?? [], responsive: input.responsive ?? [], children: input.children ?? [], source: input.source ?? { kind: 'system' }, metadata: input.metadata ?? {}, createdAt: input.createdAt ?? timestamp, updatedAt: input.updatedAt ?? timestamp,
  };
}

export function createHeroNode(source = 'manual'): WPXDomNode {
  return createDomNode({ type: 'section', name: 'Hero Section', role: 'hero', className: 'grid gap-6 rounded-3xl border border-white/10 bg-black/40 p-10', content: { eyebrow: 'ARTYVERSE X', headline: 'Build without limits', body: 'A production-ready JSON DOM hero section.' }, source: { kind: source === 'manual' ? 'system' : 'template', id: source }, motion: { preset: 'reveal', duration: motionTokens.smooth }, children: [createDomNode({ type: 'button', name: 'Primary CTA', role: 'cta', className: 'rounded-full bg-[var(--lime)] px-5 py-3 font-black text-black', content: 'Get started' })] });
}

export function createSectionNode(name = 'Section'): WPXDomNode {
  return createDomNode({ type: 'section', name, role: 'content', className: 'rounded-3xl border border-white/10 bg-black/30 p-8', content: { heading: name, body: 'Edit this section from the inspector.' }, children: [] });
}

export function createDefaultDomTree(): WPXDomNode {
  return createDomNode({ id: 'wpx-root', type: 'document', name: 'WPX DOM Kernel', role: 'root', className: 'min-h-screen bg-[var(--background)] text-[var(--foreground)]', children: [createHeroNode('default')] });
}

export function createDefaultPage(domTree = createDefaultDomTree()): WPXDomPage { const timestamp = wpxNow(); return { id: wpxUid('page'), name: 'Home', slug: '/', title: 'WPX Studio DOM Workspace', description: 'JSON-first builder workspace', rootNodeId: domTree.id, domTree, metadata: { status: 'draft', tags: ['home'] }, createdAt: timestamp, updatedAt: timestamp }; }
export function createDefaultDomProject(): WPXDomProject { const domTree = createDefaultDomTree(); const page = createDefaultPage(domTree); const timestamp = wpxNow(); return { id: wpxUid('project'), name: 'WPX OS Workspace', createdAt: timestamp, updatedAt: timestamp, metadata: { status: 'draft', source: 'default' }, pages: [page], domTree, components: [], assets: [], stylesheets: [], dependencyEdges: [], designTokens: Object.fromEntries(themeTokens.map((t) => [t.id, t.value])), motionTokens: { ...motionTokens }, commandHistory: [], redoStack: [], importSources: [], exportTargets: [], validationReports: [], productionReports: [], selectedNodeId: domTree.children[0]?.id, safeAssetMode: true, sourceUrls: [], themeMode: 'dark', motionEnabled: true, previewMode: 'desktop' }; }
export const createLandingPageProject = () => createDefaultDomProject();
