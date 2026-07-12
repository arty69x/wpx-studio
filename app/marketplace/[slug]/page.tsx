import { notFound } from 'next/navigation';
import { ProductDetailExperience } from '@/components/artyverse/ProductDetailExperience';
import { artyProducts, getArtyProduct } from '@/data/artyverse-marketplace';
import './product-detail.css';

export function generateStaticParams() {
  return artyProducts.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getArtyProduct(slug);

  if (!product) notFound();

  return <ProductDetailExperience product={product} />;
}
