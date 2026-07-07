export const marketplaceFilterOptions = [
  'Free',
  'Premium',
  'Responsive',
  'Hover',
  'Scroll reveal',
  'Card lift',
  'Glow hover',
  'Tailwind',
] as const;

export type MarketplaceFilter = (typeof marketplaceFilterOptions)[number];

type MarketplaceFiltersProps = {
  activeFilters: MarketplaceFilter[];
  onFilterChange: (filter: MarketplaceFilter, checked: boolean) => void;
  mobile?: boolean;
};

export function MarketplaceFilters({ activeFilters, onFilterChange, mobile = false }: MarketplaceFiltersProps) {
  return (
    <aside className={`${mobile ? 'block lg:hidden' : 'hidden lg:block'} rounded-3xl border border-white/10 bg-white/[.03] p-5`}>
      <h3 className="mb-4 font-semibold">Filters</h3>
      {marketplaceFilterOptions.map((filter) => (
        <label key={filter} className="mb-3 flex items-center gap-3 text-sm text-zinc-300">
          <input
            type="checkbox"
            checked={activeFilters.includes(filter)}
            onChange={(event) => onFilterChange(filter, event.target.checked)}
            className="accent-[#4F7CFF]"
          />
          {filter}
        </label>
      ))}
    </aside>
  );
}
