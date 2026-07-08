'use client';

import { useMemo, useState } from 'react';
import { searchDomProject } from '@/lib/wpx/dom/search';
import type { WPXDomProject } from '@/lib/wpx/dom/types';

type Props = { project: WPXDomProject; onSelect: (nodeId: string) => void };

export function SearchPanel({ project, onSelect }: Props) {
  const [query, setQuery] = useState('hero');
  const results = useMemo(() => searchDomProject(project, query), [project, query]);
  return <section className="rounded-[18px] border border-[var(--border)] bg-black/35 p-4">
    <h2 className="text-xs font-black uppercase tracking-[.16em]">DOM Search</h2>
    <input className="field mt-3" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, type, content, className, metadata" />
    <div className="mt-3 max-h-80 space-y-2 overflow-auto">
      {results.map((result) => <button key={result.id} className="block w-full rounded-xl border border-[var(--border)] p-3 text-left hover:border-[var(--lime)]" onClick={() => onSelect(result.id)}>
        <span className="text-sm font-black">{result.label}</span>
        <span className="block font-mono text-[10px] text-[var(--muted)]">{result.path} · score {result.score}</span>
        <span className="mt-1 block text-xs text-[var(--muted)]">{result.excerpt}</span>
      </button>)}
      {!results.length && <p className="text-sm text-[var(--muted)]">No JSON DOM results.</p>}
    </div>
  </section>;
}
