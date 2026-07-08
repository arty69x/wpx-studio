import { createDefaultDomProject, createDomNode, createHeroNode, createSectionNode } from './defaults';
import type { WPXDomNode, WPXDomProject } from './types';

export type WPXMatchInput = {
  prompt: string;
  selectedStyle?: string;
  targetPageType?: 'landing' | 'portfolio' | 'agency' | 'saas' | 'dashboard' | 'mobile';
  importedSourceSummary?: string;
  imageMetadata?: Record<string, unknown>;
};

export type WPXMatchResult = {
  matchedTemplate: string;
  matchedComponents: string[];
  matchedTokens: Record<string, string>;
  matchedMotion: Record<string, unknown>;
  confidence: number;
  generatedDomDraft: WPXDomProject;
  reasons: string[];
};

const includes = (value: string, words: string[]) => words.some((word) => value.includes(word));

function cardStack(names: string[], source = 'prompt'): WPXDomNode {
  return createDomNode({
    type: 'grid',
    name: 'Matched Component Stack',
    className: 'grid gap-3 md:grid-cols-3',
    source: { kind: 'prompt', ref: source },
    children: names.map((name) => createDomNode({ type: 'card', name, content: `${name} generated from prompt match.`, className: 'rounded-2xl border border-white/10 bg-white/[.04] p-5', source: { kind: 'prompt', ref: source } })),
  });
}

export function matchPromptToDom(input: WPXMatchInput): WPXMatchResult {
  const prompt = input.prompt.toLowerCase();
  const project = createDefaultDomProject();
  const target = input.targetPageType ?? (includes(prompt, ['dashboard', 'admin', 'analytics']) ? 'dashboard' : includes(prompt, ['agency', 'studio', 'services']) ? 'agency' : includes(prompt, ['portfolio', 'case study']) ? 'portfolio' : includes(prompt, ['app', 'mobile']) ? 'mobile' : includes(prompt, ['saas', 'software']) ? 'saas' : 'landing');
  const style = input.selectedStyle || (includes(prompt, ['luxury', 'premium']) ? 'premium glass' : includes(prompt, ['minimal', 'clean']) ? 'minimal editorial' : 'wpx neon editorial');
  const components = target === 'dashboard' ? ['Metric Cards', 'Activity Feed', 'System Health'] : target === 'agency' ? ['Services', 'Case Studies', 'CTA'] : target === 'portfolio' ? ['Selected Work', 'Process', 'Contact'] : target === 'mobile' ? ['App Hero', 'Feature Tiles', 'Install CTA'] : ['Hero', 'Proof', 'CTA'];
  const tokens: Record<string, string> = style.includes('minimal') ? { accent: 'color-paper', surface: 'color-cinema' } : { accent: 'color-lime', secondary: 'color-pink' };
  const motion = { preset: includes(prompt, ['motion', 'animated', 'cinematic']) ? 'reveal' : 'hover', duration: 360, easing: 'easeOut' };
  const hero = createHeroNode('prompt');
  const headline = prompt.trim() ? `Matched ${target} page: ${input.prompt.slice(0, 80)}` : `Matched ${target} page`;
  const root = {
    ...project.pages[0].root,
    children: [
      { ...hero, name: `${target.toUpperCase()} Hero`, content: headline, tokens, motion },
      cardStack(components, input.prompt),
      createSectionNode(`${target.toUpperCase()} CTA`, 'prompt'),
    ],
  };
  const generatedDomDraft = { ...project, name: `WPX ${target} draft`, selectedNodeId: root.children[0]?.id, pages: [{ ...project.pages[0], root, seo: { title: headline, description: `Generated from ${style} prompt match` } }] };
  const confidence = Math.min(0.96, 0.58 + (input.prompt.length > 20 ? 0.18 : 0) + (input.selectedStyle ? 0.08 : 0) + (input.importedSourceSummary ? 0.06 : 0) + (input.imageMetadata ? 0.04 : 0));

  return {
    matchedTemplate: `${target}-${style.replace(/\s+/g, '-')}`,
    matchedComponents: components,
    matchedTokens: tokens,
    matchedMotion: motion,
    confidence,
    generatedDomDraft,
    reasons: [`Detected target page type: ${target}`, `Selected visual style: ${style}`, `Generated ${components.length} component groups as JSON DOM`],
  };
}
