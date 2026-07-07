import { catalogStats, marketplaceItems } from '@/data/marketplace';

export function ExportFormats() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-[#CCFF00]">Export inventory</p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Preview-only export surfaces</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-zinc-400">All {marketplaceItems.length} catalog items expose this same UI-only export format set.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
        {catalogStats.exportFormats.map((format) => (
          <div className="rounded-2xl border border-white/10 bg-[#0D1320] p-4 text-center text-sm text-zinc-200" key={format}>
            {format}
          </div>
        ))}
      </div>
    </section>
  );
}
