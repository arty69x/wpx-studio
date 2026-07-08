'use client';

import type { WPXDomNode } from '@/lib/wpx/dom/types';
import { createSectionNode } from '@/lib/wpx/dom/defaults';

const cn = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(' ');

type Props = {
  root: WPXDomNode;
  selectedNodeId?: string;
  onSelect: (nodeId: string) => void;
  onAdd: (parentId: string) => void;
  onDuplicate: (nodeId: string) => void;
  onRemove: (nodeId: string) => void;
};

function LayerNode({ root, node, depth, selectedNodeId, onSelect, onAdd, onDuplicate, onRemove }: Props & { node: WPXDomNode; depth: number }) {
  const selected = selectedNodeId === node.id;
  return <div className="space-y-1">
    <div className={cn('group rounded-xl border border-transparent p-2 text-left text-xs transition hover:border-white/10 hover:bg-white/5', selected && 'border-[var(--lime)] bg-[var(--lime)]/10 text-white')} style={{ marginLeft: depth * 10 }}>
      <button className="block w-full text-left" onClick={() => onSelect(node.id)}>
        <span className="font-black uppercase tracking-[.1em]">{node.name}</span>
        <span className="mt-1 block font-mono text-[10px] text-[var(--muted)]">{node.type} · {node.id.slice(0, 18)}</span>
      </button>
      <div className="mt-2 hidden gap-1 group-hover:flex">
        <button className="control px-2 py-1 text-[10px]" onClick={() => onAdd(node.id)}>Add</button>
        <button className="control px-2 py-1 text-[10px]" onClick={() => onDuplicate(node.id)}>Copy</button>
        <button className="control px-2 py-1 text-[10px]" onClick={() => onRemove(node.id)} disabled={depth === 0}>Del</button>
      </div>
    </div>
    {node.children.map((child) => <LayerNode key={child.id} root={root} node={child} depth={depth + 1} selectedNodeId={selectedNodeId} onSelect={onSelect} onAdd={onAdd} onDuplicate={onDuplicate} onRemove={onRemove} />)}
  </div>;
}

export function LayerTree(props: Props) {
  return <aside className="rounded-[18px] border border-[var(--border)] bg-black/35 p-3">
    <div className="mb-3 flex items-center justify-between border-b border-[var(--border)] pb-2">
      <h2 className="text-xs font-black uppercase tracking-[.16em]">JSON Layers</h2>
      <button className="control px-2 py-1 text-[10px]" onClick={() => props.onAdd(props.root.id)}>+ Section</button>
    </div>
    <LayerNode {...props} node={props.root} depth={0} />
    <button className="mt-3 w-full rounded-xl border border-dashed border-[var(--borderStrong)] p-3 text-xs text-[var(--muted)] hover:text-white" onClick={() => props.onAdd(props.root.id)}>
      Add JSON DOM Section: {createSectionNode().type}
    </button>
  </aside>;
}
