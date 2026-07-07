import { notFound } from 'next/navigation';
import { ComponentDetail } from '@/components/marketplace/ComponentDetail';
import { getItem, marketplaceItems } from '@/data/marketplace';

export function generateStaticParams() {
  return marketplaceItems.map((item) => ({ slug: item.slug }));
}

export default async function Detail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getItem(slug);

  if (!item) {
    notFound();
  }

  return <ComponentDetail item={item} />;
}
