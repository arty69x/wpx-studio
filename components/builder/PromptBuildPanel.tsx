'use client';

import { useMemo, useState } from 'react';
import { matchPromptToDom } from '@/lib/wpx/dom/match';
import type { WPXDomProject } from '@/lib/wpx/dom/types';

type Props = { onBuild: (project: WPXDomProject, label: string) => void };

export function PromptBuildPanel({ onBuild }: Props) {
  const [prompt, setPrompt] = useState('Premium SaaS landing page with cinematic hero, proof cards, pricing CTA, and subtle motion');
  const [style, setStyle] = useState('wpx neon editorial');
  const [target, setTarget] = useState<'landing' | 'portfolio' | 'agency' | 'saas' | 'dashboard' | 'mobile'>('landing');
  const result = useMemo(() => matchPromptToDom({ prompt, selectedStyle: style, targetPageType: target }), [prompt, style, target]);

  return <section className="rounded-[18px] border border-[var(--border)] bg-black/35 p-4">
    <h2 className="text-xs font-black uppercase tracking-[.16em]">Build From Prompt → JSON DOM</h2>
    <textarea className="field mt-3 min-h-28" value={prompt} onChange={(event) => setPrompt(event.target.value)} />
    <div className="mt-3 grid gap-2 sm:grid-cols-2">
      <input className="field" value={style} onChange={(event) => setStyle(event.target.value)} placeholder="style" />
      <select className="field" value={target} onChange={(event) => setTarget(event.target.value as typeof target)}>
        {['landing', 'portfolio', 'agency', 'saas', 'dashboard', 'mobile'].map((item) => <option key={item}>{item}</option>)}
      </select>
    </div>
    <div className="mt-3 rounded-xl border border-[var(--border)] bg-black/30 p-3 text-xs text-[var(--muted)]">
      <p><b className="text-white">Template:</b> {result.matchedTemplate}</p>
      <p><b className="text-white">Components:</b> {result.matchedComponents.join(', ')}</p>
      <p><b className="text-white">Confidence:</b> {Math.round(result.confidence * 100)}%</p>
      <ul className="mt-2 list-disc pl-5">{result.reasons.map((reason) => <li key={reason}>{reason}</li>)}</ul>
    </div>
    <button className="control mt-3" onClick={() => onBuild(result.generatedDomDraft, 'Build From Prompt Match')}>Apply JSON DOM Draft</button>
  </section>;
}
