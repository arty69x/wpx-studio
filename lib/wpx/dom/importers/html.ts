import { createDomNode } from '../defaults';
import type { WPXDomNode } from '../types';

const textOf = (el: Element) => (el.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 240);

function elementType(tag: string) {
  if (tag === 'img') return 'image';
  if (tag === 'button' || tag === 'a') return 'button';
  if (/^h[1-6]$/.test(tag)) return 'heading';
  if (tag === 'p' || tag === 'span') return 'text';
  if (tag === 'footer') return 'footer';
  if (['section', 'article', 'header', 'nav', 'main'].includes(tag)) return 'section';
  return 'component';
}

function elementToNode(el: Element, sourceLabel: string): WPXDomNode {
  const tag = el.tagName.toLowerCase();
  const role = tag === 'nav' ? 'navigation' : tag === 'footer' ? 'footer' : /hero/i.test(String(el.className)) ? 'hero' : tag === 'img' ? 'asset' : 'content';
  return createDomNode({
    type: elementType(tag),
    name: el.getAttribute('aria-label') || el.id || String(el.className).split(' ')[0] || tag,
    role,
    props: Object.fromEntries(Array.from(el.attributes).map((attribute) => [attribute.name, attribute.value])),
    content: textOf(el),
    className: el.getAttribute('class') ?? '',
    children: Array.from(el.children).slice(0, 50).map((child) => elementToNode(child, sourceLabel)),
    source: { kind: 'import', ref: sourceLabel },
    metadata: { sourceTag: tag, raw: el.outerHTML, accessibilityStatus: el.hasAttribute('aria-label') || ['section', 'main', 'nav', 'footer', 'header'].includes(tag) ? 'pass' : 'unknown' },
  });
}

export function htmlToDomNodes(html: string, sourceLabel = 'html-import'): WPXDomNode[] {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const roots = Array.from(doc.body.children.length ? doc.body.children : doc.children);
  return roots.map((el) => elementToNode(el, sourceLabel));
}
