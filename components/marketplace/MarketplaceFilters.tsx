'use client';

export type MarketplaceFilterKey =
  | 'Premium'
  | 'Free'
  | 'Hover'
  | 'VFX'
  | 'Directors'
  | 'Editorial'
  | 'Scroll reveal'
  | 'Responsive'
  | 'Tailwind';

const groups: { title: string; options: MarketplaceFilterKey[] }[] = [
  { title: 'Access', options: ['Premium', 'Free'] },
  { title: 'Capabilities', options: ['Hover', 'VFX', 'Directors', 'Editorial', 'Scroll reveal'] },
  { title: 'Delivery', options: ['Responsive', 'Tailwind'] },
];

export function MarketplaceFilters({
  mobile = false,
  activeFilters,
  onToggle,
  onClear,
}: {
  mobile?: boolean;
  activeFilters: MarketplaceFilterKey[];
  onToggle: (filter: MarketplaceFilterKey) => void;
  onClear: () => void;
}) {
  return (
    <aside className={`${mobile ? 'block lg:hidden' : 'hidden lg:block'} rounded-[2rem] border border-white/10 bg-[#11100e]/75 p-5 shadow-2xl shadow-black/40 backdrop-blur-2xl`}>
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[.4em] text-[#c7b27a]">Curate</p>
          <h3 className="mt-1 font-serif text-2xl text-stone-100">Filters</h3>
        </div>
        {activeFilters.length > 0 ? (
          <button onClick={onClear} className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[.18em] text-stone-300 transition hover:border-[#c7b27a] hover:text-white">
            Reset
          </button>
        ) : null}
      </div>
      <div className="space-y-6">
        {groups.map((group) => (
          <fieldset key={group.title} className="border-t border-white/10 pt-4">
            <legend className="mb-3 text-[11px] uppercase tracking-[.28em] text-stone-500">{group.title}</legend>
            {group.options.map((option) => {
              const checked = activeFilters.includes(option);
              return (
                <label key={option} className="group mb-3 flex cursor-pointer items-center justify-between gap-3 text-sm text-stone-300">
                  <span className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggle(option)}
                      className="peer sr-only"
                    />
                    <span className="grid h-5 w-5 place-items-center rounded-full border border-white/20 bg-black/40 transition group-hover:border-[#c7b27a] peer-checked:border-[#c7b27a] peer-checked:bg-[#c7b27a]">
                      <span className={`h-1.5 w-1.5 rounded-full bg-black transition ${checked ? 'opacity-100' : 'opacity-0'}`} />
                    </span>
                    {option}
                  </span>
                  <span className="h-px flex-1 bg-white/10 transition group-hover:bg-[#c7b27a]/50" />
                </label>
              );
            })}
          </fieldset>
        ))}
      </div>
    </aside>
  );
}
