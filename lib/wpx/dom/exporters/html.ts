import type { WPXDomNode, WPXDomProject } from '../types';

const attrs = (node: WPXDomNode) => [`data-wpx-node="${node.id}"`, node.className ? `class="${node.className.replace(/"/g, '&quot;')}"` : ''].filter(Boolean).join(' ');
const activeRoot = (project: WPXDomProject) => project.pages.find((page) => page.id === project.activePageId)?.root ?? project.pages[0]?.root;

export function renderDomNodeToHtml(node: WPXDomNode): string {
  const tag = node.type === 'button' ? 'button' : node.type === 'image' ? 'img' : node.type === 'text' ? 'p' : node.type === 'heading' ? 'h1' : node.type === 'footer' ? 'footer' : node.type === 'root' ? 'main' : 'section';
  const content = node.content ?? '';
  if (tag === 'img') return `<img ${attrs(node)} alt="${node.name}" />`;
  return `<${tag} ${attrs(node)}>${content}${node.children.map(renderDomNodeToHtml).join('')}</${tag}>`;
}

export function exportDomProjectHtml(project: WPXDomProject) {
  const root = activeRoot(project);
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${project.name}</title></head><body>${root ? renderDomNodeToHtml(root) : ''}</body></html>`;
}

export function createDomExportManifest(project: WPXDomProject) {
  return { name: project.name, exportedAt: Date.now(), domNodes: JSON.stringify(project.pages).match(/"id"/g)?.length ?? 0, pages: project.pages.length, safeAssetMode: project.safeAssetMode, source: 'json-dom-kernel' };
}
