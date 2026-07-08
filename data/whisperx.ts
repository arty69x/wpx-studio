export type WXStatus = 'stable' | 'beta' | 'draft' | 'experimental';
export type WXItemType = 'component' | 'template';

const categories = ['Hero', 'Navigation', 'Canvas', 'Inspector', 'AI', 'Commerce', 'Editorial', 'Dashboard', 'Forms', 'Motion'];
const titles = ['Emerald Command', 'Editorial Prism', 'Signal Layer', 'Spatial Ledger', 'Glass Archive', 'Creation Dock', 'Cinematic Grid', 'Publish Flow', 'Inspector Rail', 'Ambient Console'];
const motions = ['mask-reveal', 'hover-lift', 'ai-thinking', 'drawer-motion', 'canvas-zoom', 'toast-success', 'scroll-reveal', 'shared-element'];

export const components = Array.from({ length: 60 }, (_, index) => ({
  id: `component-${String(index + 1).padStart(3, '0')}`,
  title: `${titles[index % titles.length]} ${categories[index % categories.length]}`,
  type: 'component' as const,
  category: categories[index % categories.length],
  tags: [categories[index % categories.length].toLowerCase(), motions[index % motions.length], index % 2 ? 'editorial' : 'workspace'],
  description: `Production ${categories[index % categories.length].toLowerCase()} component tuned for WHISPERX builder flows, keyboard access, responsive composition, and cinematic feedback.`,
  status: (index % 11 === 0 ? 'experimental' : index % 7 === 0 ? 'beta' : index % 13 === 0 ? 'draft' : 'stable') as WXStatus,
  premium: index % 3 === 0,
  featured: index % 5 === 0,
  thumbnailStyle: ['emerald glass', 'amber editorial', 'nocturne grid', 'mint glow', 'paper surface'][index % 5],
  motionPreset: motions[index % motions.length],
  createdAt: `2026-01-${String((index % 28) + 1).padStart(2, '0')}T09:00:00.000Z`,
  updatedAt: `2026-06-${String((index % 28) + 1).padStart(2, '0')}T18:00:00.000Z`,
}));

export const templates = Array.from({ length: 20 }, (_, index) => ({
  id: `template-${String(index + 1).padStart(3, '0')}`,
  title: `${['Founder Launch', 'Portfolio OS', 'Product Theatre', 'Agency Index', 'Commerce Ritual'][index % 5]} ${index + 1}`,
  type: 'template' as const,
  category: ['Landing', 'Portfolio', 'SaaS', 'Studio', 'Commerce'][index % 5],
  tags: ['responsive', motions[index % motions.length], index % 2 ? 'amber' : 'emerald'],
  description: 'A complete production-ready screen system with narrative sections, accessible controls, realistic states, and export-safe composition.',
  status: (index % 6 === 0 ? 'beta' : 'stable') as WXStatus,
  premium: index % 2 === 0,
  featured: index % 4 === 0,
  thumbnailStyle: ['cinematic browser', 'editorial poster', 'builder workspace', 'marketplace wall'][index % 4],
  motionPreset: motions[index % motions.length],
  createdAt: `2026-02-${String((index % 28) + 1).padStart(2, '0')}T09:00:00.000Z`,
  updatedAt: `2026-06-${String((index % 28) + 1).padStart(2, '0')}T18:00:00.000Z`,
}));

export const motionPresets = Array.from({ length: 20 }, (_, index) => ({
  id: `motion-${String(index + 1).padStart(3, '0')}`,
  title: ['Fade Field', 'Mask Reveal', 'Hover Lift', 'Canvas Zoom', 'AI Thinking', 'Streaming Type', 'Drawer Slide', 'Toast Bloom', 'Parallax Drift', 'Inspector Expand'][index % 10],
  icon: ['◐', '▰', '↗', '⌘', '✦'][index % 5],
  token: motions[index % motions.length],
  duration: [120, 180, 240, 320, 420, 480, 700][index % 7],
  easing: ['cubic-bezier(0.22, 1, 0.36, 1)', 'cubic-bezier(0.16, 1, 0.3, 1)', 'cubic-bezier(0.19, 1, 0.22, 1)'][index % 3],
  description: 'Motion preset that clarifies hierarchy while respecting reduced-motion preferences and GPU-safe transforms.',
}));

export const assets = Array.from({ length: 20 }, (_, index) => ({ id: `asset-${index + 1}`, title: `WHISPERX texture ${index + 1}`, type: ['texture', 'icon', 'gradient', 'device'][index % 4], url: `/assets/mock-${index + 1}.webp`, thumbnail: ['emerald mesh', 'amber grain', 'glass bloom'][index % 3], size: `${(index + 2) * 84}KB` }));
export const projects = Array.from({ length: 8 }, (_, index) => ({ id: `project-${index + 1}`, title: ['Northstar Launch', 'Atelier Commerce', 'Signal Portfolio', 'Civic Interface'][index % 4], description: 'Live creative workspace with responsive pages, motion presets, and publish checks.', status: ['Draft', 'Review', 'Published', 'QA'][index % 4], thumbnail: ['nocturne', 'dawn', 'glass'][index % 3], updatedAt: `2026-07-0${(index % 8) + 1}` }));
export const aiPrompts = Array.from({ length: 10 }, (_, index) => ({ id: `prompt-${index + 1}`, title: ['Refine hero', 'Create pricing', 'Improve accessibility', 'Add motion', 'Write launch copy'][index % 5], prompt: 'Generate a premium interface section with clear hierarchy, accessible labels, responsive spacing, and restrained cinematic motion.', category: ['Layout', 'Copy', 'A11y', 'Motion', 'Publishing'][index % 5], tags: ['builder', 'production', index % 2 ? 'amber' : 'emerald'] }));
export const activities = Array.from({ length: 12 }, (_, index) => ({ id: `activity-${index + 1}`, type: ['publish', 'install', 'generate', 'review'][index % 4], message: ['Published preview to review channel', 'Installed cinematic hero template', 'Generated inspector variants', 'Resolved keyboard navigation audit'][index % 4], timestamp: `2026-07-08 ${String(9 + index).padStart(2, '0')}:20 UTC`, user: ['Mira', 'Kai', 'Noor', 'Ari'][index % 4] }));
export const allLibrary = [...components, ...templates];
export const wxCategories = ['All', ...Array.from(new Set([...components, ...templates].map((item) => item.category)))];
