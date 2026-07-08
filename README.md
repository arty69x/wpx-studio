# WPX Studio

WPX is the official public website for WHISPERX | STUDIO: a premium creative technology platform expressed as a cinematic, interactive product experience.

## Current Scope

- Runtime surfaces are client-side first and avoid backend processing of user project content.
- Local preferences and API-key placeholders are stored only in `localStorage`.
- Visual system, template, motion, asset, theme, and creative prompt records are rendered from central typed state in `data/platform.ts`.
- Existing import/export workbench code remains in `lib/studio.ts` and related modules for client-side parsing, sanitizing, IndexedDB persistence, and ZIP export.

## Implemented Platform Modules

- Landing with A4 editorial frame, cinematic background, report header, carousel, metadata, and product surface links.
- Hero-led product visualization where the workspace, carousel, intelligent prompt layer, inspector, command palette, and animated preview exist inside one cinematic scene.
- Editorial story flow: Discover, Build, Animate, Create, and Deploy.
- Immersive gallery, design language, trust/technology, final CTA, and footer sections built from the same reusable production components.
- SEO support through Metadata API, generated sitemap, and robots routes.
- Local-only settings controls for theme preference and API-key placeholder storage.

## Verification

```bash
npm install
npm run lint
npm run build
npm test
```

Some optional production package installation may be blocked by registry policy in restricted environments; record exact blockers in `docs/BUILD_NOTES.md`.
