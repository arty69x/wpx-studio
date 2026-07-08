'use client';

import { useMemo, useState } from 'react';
import { filterDomNodes, filterRegistry } from '@/lib/wpx/dom/filter';
import type { WPXDomProject } from '@/lib/wpx/dom/types';

type Props = { project: WPXDomProject; onSelect: (nodeId: string) => void };

export function FilterPanel({ project, onSelect }: Props) {
  const [type, setType] = useState('section');
  const [tag, setTag] = useState('');
  const nodes = useMemo(() => filterDomNodes(project, { type: type || undefined, tag: tag || undefined }), [project, tag, type]);
  const registry = useMemo(() => filterRegistry({ type: type || undefined, tag: tag || undefined }), [tag, type]);

  return <section className="rounded-[18px] border border-[var(--border)] bg-black/35 p-4">
    <h2 className="text-xs font-black uppercase tracking-[.16em]">DOM Filters</h2>
    <div className="mt-3 grid gap-2 sm:grid-cols-2">
      <input className="field" value={type} onChange={(event) => setType(event.target.value)} placeholder="type e.g. section" />
      <input className="field" value={tag} onChange={(event) => setTag(event.target.value)} placeholder="tag e.g. hero" />
    </div>
    <div className="mt-3 grid gap-2 md:grid-cols-2">
      <div className="rounded-xl border border-[var(--border)] p-3">
        <h3 className="text-[10px] font-black uppercase tracking-[.16em]">DOM Nodes ({nodes.length})</h3>
        <div className="mt-2 max-h-44 overflow-auto">
          {nodes.map((node) => <button key={node.id} className="block w-full rounded-lg p-2 text-left text-xs hover:bg-white/5" onClick={() => onSelect(node.id)}>{node.name}<span className="block font-mono text-[10px] text-[var(--muted)]">{node.type} · {node.id}</span></button>)}
        </div>
      </div>
      <div className="rounded-xl border border-[var(--border)] p-3">
        <h3 className="text-[10px] font-black uppercase tracking-[.16em]">Registry ({registry.length})</h3>
        <div className="mt-2 max-h-44 overflow-auto text-xs text-[var(--muted)]">
          {registry.slice(0, 20).map((item) => <p key={item.id} className="rounded-lg p-2 hover:bg-white/5">{item.title}</p>)}
        </div>
      </div>
    </div>
  </section>;
}
