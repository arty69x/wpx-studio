import { createDomNode, createSectionNode } from './defaults';
import type { WPXDomNode, WPXDomProject, WPXSuggestion } from './types';

function flatten(node: WPXDomNode): WPXDomNode[] {
  return [node, ...node.children.flatMap(flatten)];
}

export function getDomSuggestions(project: WPXDomProject): WPXSuggestion[] {
  const root = project.pages.find((page) => page.id === project.activePageId)?.root;
  if (!root) return [];
  const nodes = flatten(root);
  const text = JSON.stringify(root).toLowerCase();
  const suggestions: WPXSuggestion[] = [];

  if (!text.includes('cta')) suggestions.push({
    id: 'add-cta',
    title: 'Add CTA',
    reason: 'This page does not expose a clear call to action in the JSON DOM.',
    affectedNodeIds: [root.id],
    actionType: 'addNode',
    proposedPatch: createDomNode({ type: 'button', name: 'Suggested CTA', role: 'cta', content: 'Start now', className: 'rounded-md bg-[var(--lime)] px-4 py-2 font-black text-black', sourceKind: 'manual' }),
  });

  if (!nodes.some((node) => node.type === 'footer' || node.role === 'footer')) suggestions.push({
    id: 'add-footer',
    title: 'Add footer',
    reason: 'Production pages should include a footer landmark for navigation and trust.',
    affectedNodeIds: [root.id],
    actionType: 'addNode',
    proposedPatch: createDomNode({ type: 'footer', name: 'Suggested Footer', role: 'footer', content: '© WPX Studio', className: 'rounded-2xl border border-white/10 p-5 text-sm text-[var(--muted)]', sourceKind: 'manual' }),
  });

  if (!nodes.some((node) => node.motion?.preset)) suggestions.push({
    id: 'add-motion',
    title: 'Add reveal motion',
    reason: 'Motion is enabled but no node declares a motion preset.',
    affectedNodeIds: [root.children[0]?.id ?? root.id],
    actionType: 'updateNode',
    proposedPatch: { motion: { preset: 'reveal', duration: 360, easing: 'easeOut' } },
  });

  suggestions.push({
    id: 'improve-responsive',
    title: 'Improve responsive layout',
    reason: 'Add an explicit mobile responsive rule to the selected layout node.',
    affectedNodeIds: [project.selectedNodeId ?? root.id],
    actionType: 'updateNode',
    proposedPatch: { responsive: { mobile: { className: 'p-4 text-sm' } } },
  });

  if (nodes.length < 5) suggestions.push({
    id: 'add-next-section',
    title: 'Add next section',
    reason: 'The page hierarchy is thin; add another structured content section.',
    affectedNodeIds: [root.id],
    actionType: 'addNode',
    proposedPatch: createSectionNode('Suggested Feature Section', 'manual'),
  });

  return suggestions;
}
