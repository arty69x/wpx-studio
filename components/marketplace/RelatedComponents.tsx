import { marketplaceItems } from '@/data/marketplace';import { MarketplaceCard } from './MarketplaceCard';
export function RelatedComponents({category,slug}:{category:string;slug:string}){const rel=marketplaceItems.filter(i=>i.category===category&&i.slug!==slug).slice(0,3);return <div className="grid gap-6 md:grid-cols-3">{rel.map(i=><MarketplaceCard key={i.id} item={i}/>)}</div>}
