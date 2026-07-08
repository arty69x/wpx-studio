import type { MetadataRoute } from 'next';
import { productPages } from '@/data/platform';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wpx-studio.local';
  return productPages.map((page) => ({
    url: `${baseUrl}${page.href}`,
    lastModified: new Date('2026-07-08T00:00:00.000Z'),
    changeFrequency: 'weekly',
    priority: page.href === '/' ? 1 : 0.8,
  }));
}
