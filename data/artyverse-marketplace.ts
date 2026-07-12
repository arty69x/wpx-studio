export type ArtyProduct = {
  slug: string;
  name: string;
  creator: string;
  category: 'Collectibles' | 'Digital' | 'Creator Tools' | 'Limited';
  price: number;
  edition: string;
  stock: number;
  accent: 'lime' | 'pink' | 'cyan' | 'violet';
  description: string;
  features: string[];
};

export const artyProducts: ArtyProduct[] = [
  {
    slug: 'orbit-zero',
    name: 'Orbit Zero',
    creator: 'ARTYVERSE Lab',
    category: 'Limited',
    price: 2490,
    edition: '01 / 300',
    stock: 74,
    accent: 'pink',
    description: 'The first Orbit collectible: playful, verified, and built to sit between your desk and your digital collection.',
    features: ['Physical collectible', 'Digital COA', 'Numbered edition', 'Creator access'],
  },
  {
    slug: 'neon-kaiju',
    name: 'Neon Kaiju',
    creator: 'Studio Luma',
    category: 'Collectibles',
    price: 1890,
    edition: 'Open edition',
    stock: 128,
    accent: 'lime',
    description: 'Soft-vinyl attitude with a glowing city-night palette and a tiny bit too much confidence.',
    features: ['Soft vinyl', 'Glow details', 'Collector card', 'Worldwide shipping'],
  },
  {
    slug: 'dream-orbit',
    name: 'Dream Orbit',
    creator: 'Cosmic Room',
    category: 'Collectibles',
    price: 3290,
    edition: 'Secret series',
    stock: 22,
    accent: 'violet',
    description: 'A dream-state series with twelve characters, hidden variants, and one very suspicious secret edition.',
    features: ['Blind box', 'Secret variant', 'QR verification', 'Series tracker'],
  },
  {
    slug: 'creator-motion-pack',
    name: 'Creator Motion Pack',
    creator: 'ARTYVERSE X',
    category: 'Creator Tools',
    price: 1290,
    edition: 'Commercial license',
    stock: 999,
    accent: 'cyan',
    description: 'Production-ready motion presets, hover systems, transitions, and micro-interactions for modern product teams.',
    features: ['React + HTML', 'Motion presets', 'Commercial use', 'Lifetime updates'],
  },
  {
    slug: 'signal-cube',
    name: 'Signal Cube',
    creator: 'Mono Future',
    category: 'Digital',
    price: 990,
    edition: '500 licenses',
    stock: 311,
    accent: 'pink',
    description: 'A modular 3D hero asset with layered neon materials, clean lighting, and flexible product staging.',
    features: ['GLB + PNG', '4K renders', 'Editable materials', 'Web optimized'],
  },
  {
    slug: 'mischief-icons',
    name: 'Mischief Icons',
    creator: 'Orbit Works',
    category: 'Creator Tools',
    price: 690,
    edition: 'Team license',
    stock: 999,
    accent: 'lime',
    description: 'A lively icon system for products that refuse to look like every other dashboard on the internet.',
    features: ['240 icons', 'SVG + React', 'Variable stroke', 'Figma library'],
  },
  {
    slug: 'portal-poster',
    name: 'Portal Poster 01',
    creator: 'Night Office',
    category: 'Limited',
    price: 1590,
    edition: '34 / 100',
    stock: 34,
    accent: 'cyan',
    description: 'Museum-grade print built around the ARTYVERSE portal language: quiet architecture, loud color.',
    features: ['A2 archival print', 'Signed edition', 'Embossed mark', 'Protective tube'],
  },
  {
    slug: 'collector-os',
    name: 'Collector OS',
    creator: 'ARTYVERSE Lab',
    category: 'Digital',
    price: 2190,
    edition: 'Founding release',
    stock: 500,
    accent: 'violet',
    description: 'A polished collection tracker, ownership vault, wishlist, and drop calendar made for serious collectors.',
    features: ['Responsive UI kit', 'Dashboard flows', 'Dark + light', 'Design tokens'],
  },
];

export const getArtyProduct = (slug: string) => artyProducts.find((product) => product.slug === slug);

export const formatTHB = (value: number) => new Intl.NumberFormat('th-TH', {
  style: 'currency',
  currency: 'THB',
  maximumFractionDigits: 0,
}).format(value);
