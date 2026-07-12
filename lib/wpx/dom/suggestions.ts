import type { WPXDomProject, WPXSuggestion } from './types';
import { createDomNode } from './defaults';

export function suggestForDom(project: WPXDomProject): WPXSuggestion[] {
  const hasCta = JSON.stringify(project.domTree).toLowerCase().includes('cta');
  const suggestions: WPXSuggestion[] = [];
  if (!hasCta) suggestions.push({ id: 'suggest-cta', title: 'Add a primary CTA', reason: 'The current DOM does not expose a clear conversion action.', affectedNodeIds: [project.domTree.id], actionType: 'addNode', proposedPatch: createDomNode({ type: 'button', name: 'Primary CTA', role: 'cta', content: 'Get started' }) });
  suggestions.push({ id: 'suggest-export-readiness', title: 'Run DOM validation before export', reason: 'Production export should compile from validated JSON DOM.', affectedNodeIds: [project.domTree.id], actionType: 'validate', proposedPatch: {} });
  return suggestions;
}

export const getDomSuggestions = suggestForDom;
