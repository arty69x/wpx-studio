import type { LibraryType, PlatformItem, ThemeToken } from '@/types/platform';

export const motionTokens = {
  instant: '80ms',
  fast: '120ms',
  base: '220ms',
  smooth: '420ms',
  slow: '800ms',
  cinematic: '1200ms',
  easeOut: 'cubic-bezier(.2,.8,.2,1)',
  easeInOut: 'cubic-bezier(.4,0,.2,1)',
  springSoft: { stiffness: 220, damping: 28 },
  springPop: { stiffness: 360, damping: 22 },
} as const;

export const productPages = [
  { href: '/', label: 'Landing', kicker: 'Opening sequence' },
  { href: '/marketplace', label: 'Marketplace', kicker: 'Component economy' },
  { href: '/components', label: 'Component Library', kicker: 'Reusable systems' },
  { href: '/builder', label: 'Builder Canvas', kicker: 'Visual operating system' },
  { href: '/motion-lab', label: 'Motion Lab', kicker: 'Cinematic tokens' },
  { href: '/ai-studio', label: 'AI Studio', kicker: 'Prompt operations' },
  { href: '/assets', label: 'Asset Manager', kicker: 'Media control' },
  { href: '/design-tokens', label: 'Design Tokens', kicker: 'Brand grammar' },
  { href: '/theme-lab', label: 'Theme Lab', kicker: 'Dark/light surfaces' },
  { href: '/settings', label: 'Settings', kicker: 'Local preferences' },
];

const componentCategories = ['Premium', 'Hover', 'VFX', 'Directors', 'Hero', 'Dashboard', 'Form', 'Card', 'Navigation', 'Modal', 'Table', 'Chart', 'AI', 'Asset', 'Motion', 'Layout', 'Gallery', 'Marketing', 'Government', 'Ecommerce'];
const titleRoots = ['Quiet Ledger', 'Cinematic Atlas', 'Holographic Brief', 'Signal Cabinet', 'A4 Intelligence', 'Glass Command', 'Editorial Stack', 'Invisible Console', 'Premium Switchboard', 'Motion Registry'];
const styles = ['acid-lime glass', 'cyan scanline', 'pink reflection', 'paper brutalist', 'black chrome', 'holographic grid'];
const presets = ['lift', 'tilt', 'glow', 'reflection', 'border shift', 'hard shadow', 'light sweep', 'svg draw'];

function item(index: number, type: LibraryType, category: string): PlatformItem {
  const created = new Date(Date.UTC(2026, 0, 1 + (index % 160))).toISOString();
  const updated = new Date(Date.UTC(2026, 5, 1 + (index % 30))).toISOString();
  const root = titleRoots[index % titleRoots.length];
  return {
    id: `${type}-${String(index + 1).padStart(3, '0')}`,
    title: `${root} ${category}`,
    type,
    category,
    tags: [category.toLowerCase(), type, presets[index % presets.length], index % 2 ? 'paper' : 'cinema'],
    description: `${category} ${type} system for WHISPERX editorial workflows, cinematic interactions, and production-ready AI builder surfaces.`,
    status: index % 7 === 0 ? 'experimental' : index % 5 === 0 ? 'beta' : index % 11 === 0 ? 'draft' : 'stable',
    premium: index % 3 === 0,
    featured: index % 4 === 0,
    thumbnailStyle: styles[index % styles.length],
    motionPreset: presets[index % presets.length],
    createdAt: created,
    updatedAt: updated,
  };
}

export const platformItems: PlatformItem[] = [
  ...Array.from({ length: 60 }, (_, index) => item(index, 'component', componentCategories[index % componentCategories.length])),
  ...Array.from({ length: 20 }, (_, index) => item(index, 'template', ['Landing', 'Portfolio', 'Commerce', 'Dashboard', 'Government'][index % 5])),
  ...Array.from({ length: 20 }, (_, index) => item(index, 'motion', ['Reveal', 'Carousel', 'Parallax', 'SVG Draw', 'Magnetic'][index % 5])),
  ...Array.from({ length: 20 }, (_, index) => item(index, 'asset', ['Texture', 'Icon', 'Gradient', 'Device', 'Mockup'][index % 5])),
  ...Array.from({ length: 10 }, (_, index) => item(index, 'theme', ['Cinema Black', 'Editorial Paper', 'Glass', 'High Contrast', 'Holographic'][index % 5])),
  ...Array.from({ length: 10 }, (_, index) => item(index, 'prompt', ['Builder', 'Accessibility', 'Motion', 'SEO', 'Export'][index % 5])),
];

export const themeTokens: ThemeToken[] = [
  { id: 'color-cinema', name: 'Cinema Black', value: '#050505', usage: 'Primary dark canvas' },
  { id: 'color-paper', name: 'Editorial Paper', value: '#f4efe4', usage: 'Light mode surface' },
  { id: 'color-lime', name: 'Acid Lime', value: '#d9ff3f', usage: 'Action and success accent' },
  { id: 'color-cyan', name: 'Cyan Signal', value: '#45d6ff', usage: 'Focus and system telemetry' },
  { id: 'color-pink', name: 'Pink Reflection', value: '#ff4fd8', usage: 'Holographic highlights' },
  { id: 'space-grid', name: 'A4 Baseline', value: '8px', usage: 'Editorial spacing rhythm' },
  { id: 'radius-glass', name: 'Glass Radius', value: '28px', usage: 'Panels and preview frames' },
  { id: 'shadow-hard', name: 'Hard Shadow', value: '12px 12px 0 #000', usage: 'Neobrutalist emphasis' },
];

export const marketplaceCategories = componentCategories;
