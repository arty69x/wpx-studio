import type { StructureNode } from '@/lib/types';

const colors: Record<string, string> = {
  website: 'text-white',
  page: 'text-white',
  section: 'text-blue-300',
  container: 'text-purple-300',
  grid: 'text-pink-300',
  row: 'text-cyan-300',
  column: 'text-orange-300',
  stack: 'text-emerald-300',
  component: 'text-white',
  node: 'text-zinc-300',
  element: 'text-zinc-400',
  'micro-div': 'text-fuchsia-300',
};

export function StructureTree({ node, depth = 0 }: { node: StructureNode; depth?: number }) {
  return (
    <div className="font-mono text-xs">
      <div className="mb-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2" style={{ marginLeft: depth * 14 }}>
        <span className={colors[node.type]}>{node.type}</span>
        <span className="text-zinc-200"> — {node.label}</span>
        <p className="mt-1 text-[11px] leading-4 text-zinc-500">{node.role}</p>
      </div>
      {node.children?.map((child) => <StructureTree key={child.id} node={child} depth={depth + 1} />)}
    </div>
  );
}
