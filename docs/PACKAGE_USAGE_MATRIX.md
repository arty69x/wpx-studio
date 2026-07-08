# Package Usage Matrix

| Package | Current role | Target role | Exact files/modules where used | Required / optional / removable | Risk if removed | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| next | App Router runtime and production build | `/builder` Live Builder route and future production frontend shell | `app/builder/page.tsx`, `app/*`, `next.config.ts` | Required | App routes and builds fail | Keep; use for Phase 6 scaffold export |
| react | UI component runtime | Builder UI, inspector, state-driven JSON DOM renderer | `components/builder/*`, `lib/wpx/dom/store.ts`, `lib/wpx/dom/renderer.tsx` | Required | Live Builder cannot render or manage state | Keep |
| react-dom | Browser DOM integration | Hydration-safe preview selection integration | `components/builder/LivePreview.tsx` uses `flushSync` | Required | Preview click/selection sync can tear under concurrent rendering | Keep |
| framer-motion | Installed motion runtime | Live preview reveal/hover/parallax motion wrappers with motion toggle | `lib/wpx/dom/renderer.tsx` | Required | Motion preview support is lost | Keep and expand presets in Phase 5 |
| css-tree | CSS AST parser | Existing CSS scoping and future class/CSS analysis hooks | `lib/studio.ts`; future Tailwind/class conflict adapter | Required | Imported CSS scoping and safe rewrite quality regresses | Keep |
| dompurify | HTML sanitizer | Sanitize imported HTML before JSON DOM conversion | `lib/studio.ts`; future UI import flow before `lib/wpx/dom/importers/html.ts` | Required | Imported HTML safety risk | Keep and wire into Phase 5 import panel |
| idb | IndexedDB wrapper | Persist DOM projects, local vault, snapshots, undo/redo history | `lib/studio.ts`, `lib/wpx/dom/store.ts` | Required | Local builder persistence breaks | Keep |
| jszip | ZIP package | Existing ZIP import/export and future DOM package export | `lib/studio.ts`; future `lib/wpx/dom/exporters/next.ts` | Required | Project import/export path breaks | Keep |
| file-saver | Browser download trigger | Download JSON DOM export preview and future ZIP packages | `components/builder/ExportPanel.tsx` | Required | Client-side exports need replacement | Keep |
| tailwindcss | Tailwind v3 build pipeline | Compatibility class runtime and token-to-class mapping layer | `tailwind.config.ts`, `app/globals.css`, `lib/wpx/dom/defaults.ts` class strings | Required | Styling/build pipeline breaks | Keep v3; add v4 adapter later |
| postcss | CSS transform pipeline | Production CSS cleanup and Tailwind processing adapter | `postcss.config.mjs`; future export CSS pipeline | Required | CSS transforms/export cleanup unavailable | Keep |
| autoprefixer | Browser prefix pass | Exported CSS compatibility pass | `postcss.config.mjs`; future production exporter | Required | Cross-browser CSS export risk | Keep |
| eslint | Quality gate | Static validation for Phase 4 builder/runtime | `eslint.config.mjs`, `npm run lint` | Required | Quality gate removed | Keep |
| eslint-config-next | Next lint rules | App Router/React lint validation | `eslint.config.mjs` | Required | Next-specific quality checks are lost | Keep |
| typescript | Type system | Strict DOM schema, builder contracts, renderer contracts | `tsconfig.json`, `lib/wpx/dom/*`, `components/builder/*` | Required | JSON DOM contracts become unsafe | Keep |
| @types/file-saver | FileSaver typings | Typed browser export download | `components/builder/ExportPanel.tsx` | Required while FileSaver remains | Export panel loses type coverage | Keep |
| @types/node | Node typings | Test/build script typing support | `tests/smoke.test.mjs`, build environment | Required | Test/build authoring degrades | Keep |
| @types/react | React typings | Typed builder UI and renderer | `components/builder/*`, `lib/wpx/dom/renderer.tsx` | Required | React components lose TS coverage | Keep |
| @types/react-dom | React DOM typings | Typed `flushSync` preview integration | `components/builder/LivePreview.tsx` | Required | React DOM integration loses TS coverage | Keep |
