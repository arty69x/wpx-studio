import { Badge } from './Badge';

const filterGroups = [
  ['Free', 'Premium', 'Responsive'],
  ['Hover', 'Scroll reveal', 'Card lift'],
  ['Glow hover', 'Tailwind', 'Preview transition'],
];

export function MarketplaceFilters({ mobile = false }: { mobile?: boolean }) {
  return (
    <aside className={`${mobile ? 'block lg:hidden' : 'hidden lg:block'} rounded-3xl border border-white/10 bg-white/[0.03] p-5`}>
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-semibold text-white">Filters</h3>
        <Badge tone="blue">Local mock</Badge>
      </div>
      <div className="space-y-5">
        {filterGroups.map((group, index) => (
          <div key={index} className="space-y-3">
            {group.map((filter) => (
              <label key={filter} className="flex items-center gap-3 text-sm text-zinc-300">
                <input type="checkbox" className="accent-[#4F7CFF]" />
                {filter}
              </label>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
}
