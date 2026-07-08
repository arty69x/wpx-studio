# WHISPERX | STUDIO (WPX)

WPX is a client-side-first Next.js design platform for premium AI interface systems. It includes a cinematic landing experience, marketplace, component library, builder canvas, motion lab, AI studio, asset manager, design tokens, theme lab, and settings.

## Architecture Rules

- Runtime surfaces are client-side first and avoid backend processing of user project content.
- Local preferences and API-key placeholders are stored only in `localStorage`.
- Marketplace, component, template, motion, asset, theme, and AI prompt records are rendered from central typed state in `data/platform.ts`.
- Existing import/export workbench code remains in `lib/studio.ts` and related modules for client-side parsing, sanitizing, IndexedDB persistence, and ZIP export.

## Implemented Platform Modules

- Landing with A4 editorial frame, cinematic background, report header, carousel, metadata, and product surface links.
- Marketplace with search, filter chips, result counter, FLIP-style reflow, empty state, and 60 component records.
- Component Library with reusable cards, preview frames, interaction states, tabs, skeleton, modal, drawer, toast, and command palette primitives.
- Builder Canvas with draggable node cards and inspector panel.
- Motion Lab with shared motion duration/easing/spring tokens.
- AI Studio with production prompt cards.
- Asset Manager, Design Tokens, Theme Lab, and Settings pages.

## Verification

```bash
npm install
npm run lint
npm run build
npm test
```

Some optional production package installation may be blocked by registry policy in restricted environments; record exact blockers in `docs/BUILD_NOTES.md`.
