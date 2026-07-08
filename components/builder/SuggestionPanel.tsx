'use client';

import { getDomSuggestions } from '@/lib/wpx/dom/suggestions';
import type { WPXDomNode, WPXDomProject, WPXSuggestion } from '@/lib/wpx/dom/types';

type Props = { project: WPXDomProject; onApply: (suggestion: WPXSuggestion) => void };

export function SuggestionPanel({ project, onApply }: Props) {
  const suggestions = getDomSuggestions(project);
  return <section className="rounded-[18px] border border-[var(--border)] bg-black/35 p-4">
    <h2 className="text-xs font-black uppercase tracking-[.16em]">Structured Suggestions</h2>
    <div className="mt-3 space-y-2">
      {suggestions.map((suggestion) => <div key={suggestion.id} className="rounded-xl border border-[var(--border)] p-3">
        <h3 className="font-black">{suggestion.title}</h3>
        <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{suggestion.reason}</p>
        <pre className="mt-2 max-h-24 overflow-auto rounded-lg bg-black/40 p-2 text-[10px] text-[var(--muted)]">{JSON.stringify(suggestion.proposedPatch as Partial<WPXDomNode>, null, 2)}</pre>
        <button className="control mt-2" onClick={() => onApply(suggestion)}>Apply JSON Patch</button>
      </div>)}
    </div>
  </section>;
}
