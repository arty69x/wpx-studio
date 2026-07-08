'use client';

import type { WPXDomNode } from '@/lib/wpx/dom/types';

function Field({ label, value, onChange, textarea = false }: { label: string; value: string; onChange: (value: string) => void; textarea?: boolean }) {
  return <label className="block text-[10px] font-black uppercase tracking-[.14em] text-[var(--muted)]">{label}{textarea ? <textarea className="field mt-2 min-h-20" value={value} onChange={(event) => onChange(event.target.value)} /> : <input className="field mt-2" value={value} onChange={(event) => onChange(event.target.value)} />}</label>;
}

type Props = { node?: WPXDomNode; onUpdate: (patch: Partial<WPXDomNode>, label: string) => void };

export function Inspector({ node, onUpdate }: Props) {
  if (!node) return <aside className="rounded-[18px] border border-[var(--border)] bg-black/35 p-4 text-sm text-[var(--muted)]">Select a JSON DOM node.</aside>;
  return <aside className="space-y-4 rounded-[18px] border border-[var(--border)] bg-black/35 p-4">
    <div>
      <p className="text-[10px] font-black uppercase tracking-[.18em] text-[var(--lime)]">Inspector</p>
      <h2 className="mt-1 text-xl font-black">{node.name}</h2>
      <p className="font-mono text-[10px] text-[var(--muted)]">{node.type} · {node.id}</p>
    </div>
    <Field label="Name" value={node.name} onChange={(name) => onUpdate({ name }, 'Edit node name')} />
    <Field label="Content" textarea value={node.content ?? ''} onChange={(content) => onUpdate({ content }, 'Edit node content')} />
    <Field label="Class Name" textarea value={node.className ?? ''} onChange={(className) => onUpdate({ className }, 'Edit node className')} />
    <Field label="Inline style JSON" textarea value={JSON.stringify(node.style, null, 2)} onChange={(value) => { try { onUpdate({ style: JSON.parse(value) as WPXDomNode['style'] }, 'Edit node style'); } catch { /* keep DOM source unchanged for invalid JSON */ } }} />
    <Field label="Tokens JSON" textarea value={JSON.stringify(node.tokens, null, 2)} onChange={(value) => { try { onUpdate({ tokens: JSON.parse(value) as WPXDomNode['tokens'] }, 'Edit node tokens'); } catch { /* keep DOM source unchanged for invalid JSON */ } }} />
    <Field label="Layout JSON" textarea value={JSON.stringify(node.layout, null, 2)} onChange={(value) => { try { onUpdate({ layout: JSON.parse(value) as WPXDomNode['layout'] }, 'Edit node layout'); } catch { /* keep DOM source unchanged for invalid JSON */ } }} />
    <Field label="Motion Preset" value={node.motion?.preset ?? ''} onChange={(preset) => onUpdate({ motion: { ...node.motion, preset } }, 'Edit node motion')} />
    <Field label="Metadata JSON" textarea value={JSON.stringify(node.metadata, null, 2)} onChange={(value) => { try { onUpdate({ metadata: JSON.parse(value) as WPXDomNode['metadata'] }, 'Edit node metadata'); } catch { /* keep DOM source unchanged for invalid JSON */ } }} />
  </aside>;
}
