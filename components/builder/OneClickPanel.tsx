'use client';

import { createDefaultDomProject, createDomNode, createHeroNode, createLandingPageProject, createSectionNode } from '@/lib/wpx/dom/defaults';
import type { WPXDomProject } from '@/lib/wpx/dom/types';

function projectWith(name: string, children: ReturnType<typeof createDomNode>[]): WPXDomProject {
  const project = createDefaultDomProject();
  const root = { ...project.pages[0].root, children, updatedAt: Date.now() };
  return { ...project, name, selectedNodeId: children[0]?.id ?? root.id, pages: [{ ...project.pages[0], root }] };
}

export function OneClickPanel({ onBuild }: { onBuild: (project: WPXDomProject, label: string) => void }) {
  return <section className="rounded-[18px] border border-[var(--border)] bg-black/35 p-4">
    <h2 className="text-xs font-black uppercase tracking-[.16em]">One Click JSON Builders</h2>
    <div className="mt-3 grid gap-2 sm:grid-cols-2">
      <button className="control" onClick={() => onBuild(createLandingPageProject(), 'Build Landing Page')}>Build Landing Page</button>
      <button className="control" onClick={() => onBuild(projectWith('WPX Agency Page', [createHeroNode('template'), createSectionNode('Services', 'template'), createSectionNode('Case Studies', 'template'), createSectionNode('Agency CTA', 'template')]), 'Build Agency Page')}>Build Agency Page</button>
      <button className="control" onClick={() => onBuild(projectWith('WPX Dashboard', [createDomNode({ type: 'section', name: 'Dashboard Overview', content: 'Metrics, activity, and project health are JSON DOM nodes.', className: 'grid gap-3 rounded-2xl border border-white/10 p-6 md:grid-cols-3', sourceKind: 'template', children: ['Projects', 'Exports', 'Readiness'].map((name) => createDomNode({ type: 'card', name, content: `${name}: 100%`, className: 'rounded-xl bg-white/5 p-4', sourceKind: 'template' })) })]), 'Build Dashboard')}>Build Dashboard</button>
      <button className="control" onClick={() => onBuild(projectWith('WPX Random Build', [createHeroNode('random'), createSectionNode(`Random Section ${Math.floor(Math.random() * 100)}`, 'random')]), 'Build From Random')}>Build From Random</button>
    </div>
  </section>;
}
