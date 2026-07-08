import type { WPXDomNode, WPXDomProject, WPXSearchResult } from './types';

function visit(node: WPXDomNode, path: string, query: string, results: WPXSearchResult[]) {
  const payload = [node.id, node.type, node.name, node.role, node.content, node.className, JSON.stringify(node.metadata)].filter(Boolean).join(' ').toLowerCase();
  const index = payload.indexOf(query);
  if (index >= 0) {
    results.push({
      id: node.id,
      type: node.type,
      path,
      label: node.name,
      excerpt: payload.slice(Math.max(0, index - 32), index + query.length + 72),
      score: Math.max(1, 100 - path.length + (node.name.toLowerCase().includes(query) ? 25 : 0)),
      actionSuggestions: ['select-node', 'open-inspector'],
    });
  }
  node.children.forEach((child, childIndex) => visit(child, `${path}/${child.type}[${childIndex}]`, query, results));
}

export function searchDomProject(project: WPXDomProject, query: string): WPXSearchResult[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  const results: WPXSearchResult[] = [];
  for (const page of project.pages) visit(page.root, `${page.path || '/'}:${page.root.id}`, normalized, results);
  return results.sort((a, b) => b.score - a.score);
}
