import { marketplaceItems } from '@/data/marketplace';
import { MarketplaceCard } from './MarketplaceCard';

export function RelatedComponents({ category, slug }: { category: string; slug: string }) {
  const related = marketplaceItems.filter((item) => item.category === category && item.slug !== slug).slice(0, 3);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {related.map((item) => <MarketplaceCard key={item.id} item={item} />)}
    </div>
  );
}
