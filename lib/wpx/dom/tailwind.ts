import * as csstree from 'css-tree';
import type { WPXDomNode, WPXDomProject } from './types';

export type WPXClassToken = {
  raw: string;
  variants: string[];
  utility: string;
  group: string;
  important: boolean;
};

export type WPXClassResolution = {
  tokens: WPXClassToken[];
  conflicts: Array<{ group: string; winner: string; removed: string[] }>;
  className: string;
};

const classGroups = [
  /^p[trblxy]?-/,
  /^m[trblxy]?-/,
  /^text-/,
  /^bg-/,
  /^border/,
  /^rounded/,
  /^shadow/,
  /^grid/,
  /^flex/,
  /^items-/,
  /^justify-/,
  /^gap-/,
  /^w-/,
  /^h-/,
  /^max-w-/,
  /^min-h-/,
];

export function parseClassToken(raw: string): WPXClassToken {
  const important = raw.startsWith('!');
  const parts = raw.replace(/^!/, '').split(':');
  const utility = parts.pop() ?? raw;
  const variants = parts;
  const matched = classGroups.find((group) => group.test(utility));
  return { raw, variants, utility, group: `${variants.join(':')}|${matched?.source ?? utility.split('-')[0]}`, important };
}

export function resolveClassName(className = ''): WPXClassResolution {
  const tokens = className.split(/\s+/).filter(Boolean).map(parseClassToken);
  const winners = new Map<string, WPXClassToken>();
  const removed = new Map<string, string[]>();
  for (const token of tokens) {
    const previous = winners.get(token.group);
    if (previous) removed.set(token.group, [...(removed.get(token.group) ?? []), previous.raw]);
    winners.set(token.group, token);
  }
  const resolved = Array.from(winners.values());
  return {
    tokens,
    conflicts: Array.from(removed.entries()).map(([group, values]) => ({ group, winner: winners.get(group)?.raw ?? '', removed: values })),
    className: resolved.map((token) => token.raw).join(' '),
  };
}

export function tokenToClass(tokenName: string, tokenValue: string) {
  if (tokenName.includes('color') || /^#|rgb|hsl|var\(/.test(tokenValue)) return `text-[${tokenValue}]`;
  if (tokenName.includes('space')) return `p-[${tokenValue}]`;
  if (tokenName.includes('radius')) return `rounded-[${tokenValue}]`;
  if (tokenName.includes('shadow')) return `shadow-[${tokenValue}]`;
  return `[--${tokenName}:${tokenValue}]`;
}

export function collectDomClassMap(project: WPXDomProject) {
  const map: Record<string, WPXClassResolution> = {};
  const visit = (node: WPXDomNode) => {
    map[node.id] = resolveClassName(node.className ?? '');
    node.children.forEach(visit);
  };
  project.pages.forEach((page) => visit(page.root));
  return map;
}

export function analyzeCssWithCssTree(css: string) {
  try {
    const ast = csstree.parse(css, { context: 'stylesheet' });
    let rules = 0;
    csstree.walk(ast, (node) => { if (node.type === 'Rule') rules += 1; });
    return { ok: true, rules, message: 'CSS parsed with css-tree.' };
  } catch (error) {
    return { ok: false, rules: 0, message: error instanceof Error ? error.message : 'CSS parse failed.' };
  }
}
