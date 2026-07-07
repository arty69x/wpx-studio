import { marketplaceItems } from '@/data/marketplace';
import { StructureTree } from '@/components/marketplace/StructureTree';

export function StructureEngine() {
  return (
    <section id="structure" className="mx-auto max-w-7xl px-4 py-20">
      <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-[#45D6FF]">Locked hierarchy</p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Structure engine with visible validation</h2>
          <p className="mt-4 leading-7 text-zinc-400">
            Website → Page → Section → Container → Grid → Row → Column → Stack → Component → Node → Element → Micro Div. Sections own rhythm, containers own max width, grids own two-dimensional placement, and components own reusable behavior.
          </p>
        </div>
        <div className="max-h-[560px] overflow-auto rounded-3xl border border-white/10 bg-[#111214] p-4">
          <StructureTree node={marketplaceItems[1].structure} />
        </div>
      </div>
    </section>
  );
}
