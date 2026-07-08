'use client';

import { categories, subcategories } from '@/data/marketplace';

export function CategoryTabs({
  category,
  setCategory,
  subcategory,
  setSubcategory,
}: {
  category: string;
  setCategory: (value: string) => void;
  subcategory: string;
  setSubcategory: (value: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-1">
        <Tab active={category === 'All'} onClick={() => { setCategory('All'); setSubcategory('All'); }}>
          All
        </Tab>
        {categories.map((item) => (
          <Tab key={item} active={category === item} onClick={() => { setCategory(item); setSubcategory('All'); }}>
            {item}
          </Tab>
        ))}
      </div>

      {category !== 'All' && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          <Chip active={subcategory === 'All'} onClick={() => setSubcategory('All')}>All</Chip>
          {(subcategories[category] ?? []).map((item) => (
            <Chip key={item} active={subcategory === item} onClick={() => setSubcategory(item)}>
              {item}
            </Chip>
          ))}
        </div>
      )}
    </div>
  );
}

function Tab({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${active ? 'bg-white text-black' : 'border border-white/10 text-zinc-300 hover:border-white/30'}`}>
      {children}
    </button>
  );
}

function Chip({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`shrink-0 rounded-full px-3 py-1 text-xs transition ${active ? 'bg-[#4F7CFF] text-white' : 'bg-white/[0.05] text-zinc-400 hover:text-white'}`}>
      {children}
    </button>
  );
}
