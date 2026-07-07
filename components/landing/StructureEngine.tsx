import { previewPatternGroups } from '@/data/marketplace';
import { StructureTree } from '@/components/marketplace/StructureTree';

export function StructureEngine() {
  const representativeStructures = previewPatternGroups
    .map((group) => group.items[0])
    .filter(Boolean);

  return (
    <section id="structure" className="mx-auto max-w-7xl px-4 py-20">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-[#45D6FF]">Locked hierarchy</p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Structure engine powered by every preview family</h2>
          <p className="mt-4 leading-7 text-zinc-400">
            Website → Page → Section → Container → Grid → Row → Column → Stack → Component → Node → Element → Micro Div. Each catalog family uses a distinct internal preview anatomy while preserving the locked hierarchy.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {previewPatternGroups.map((group) => (
              <div key={group.pattern} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <p className="font-semibold capitalize text-white">{group.pattern}</p>
                <p className="mt-1 text-xs text-zinc-500">{group.items.length} components installed</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid max-h-[640px] gap-4 overflow-auto rounded-3xl border border-white/10 bg-[#090D16] p-4">
          {representativeStructures.map((item) => (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-black/20 p-3">
              <p className="mb-3 text-sm font-semibold text-[#CCFF00]">{item.name}</p>
              <StructureTree node={item.structure} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
