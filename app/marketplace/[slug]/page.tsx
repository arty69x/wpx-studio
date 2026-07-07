import { getItem, marketplaceItems } from '@/data/marketplace';import { ComponentDetail } from '@/components/marketplace/ComponentDetail';import { notFound } from 'next/navigation';
export function generateStaticParams(){return marketplaceItems.map(i=>({slug:i.slug}))}
export default async function Detail({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=getItem(slug);if(!item)notFound();return <ComponentDetail item={item}/>}
