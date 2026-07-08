# Package Usage Matrix

| Package | Current role | Target role | Exact files/modules | Status | Risk if removed | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| next | App Router runtime and build | App Router shell, SEO routes, exported frontend scaffold | `app/*`, `next.config.ts`, future `lib/wpx/dom/exporters/next.ts` | Required | App cannot run/build | Keep; use in production scaffold phase |
| react | UI component runtime | JSON DOM renderer, live preview, inspector | `components/*`, future `lib/wpx/dom/renderer/renderNode.tsx` | Required | UI cannot render | Keep |
| react-dom | Next/React DOM integration | Preview mounting and hydration-safe rendering | `package.json`, Next runtime, future preview modules | Required | Browser rendering breaks | Keep |
| framer-motion | Motion package installed | Motion resolver, live preview animations, reduced-motion support | `components/motion/presets.ts`, future renderer | Required | Motion preview/export loses planned runtime | Wire in Phase 4 renderer |
| css-tree | CSS AST parser | CSS scoping, class analysis, conflict inspection | `lib/studio.ts`, future Tailwind adapter | Required | Safe CSS scoping regresses | Keep and extend |
| dompurify | HTML sanitization package | Sanitize imported HTML before DOM conversion | `lib/studio.ts`, future import UI before `lib/wpx/dom/importers/html.ts` | Required | Unsafe imported HTML risk | Keep |
| idb | IndexedDB wrapper | Project DOM snapshots/assets/history local vault | `lib/studio.ts`, `lib/wpx/dom/store.ts` | Required | Local persistence breaks | Keep |
| jszip | ZIP package | Project ZIP import/export and production ZIP | `lib/studio.ts`, future production exporter | Required | Import/export packages break | Keep |
| file-saver | Browser download trigger | Download exported ZIP/packages | Marketplace/export UI, future export panel | Required | Browser downloads need replacement | Keep and wire in Phase 4/6 panels |
| tailwindcss | Tailwind v3 build | Compatibility runtime and token-to-class compiler before v4 | `tailwind.config.ts`, `app/globals.css`, future class mapper | Required | Styling pipeline breaks | Keep v3 now; plan v4 adapter |
| postcss | CSS transform pipeline | Production CSS cleanup and Tailwind processing adapter | `postcss.config.mjs`, future exporter | Required | CSS build/export transforms break | Keep |
| autoprefixer | Browser prefix pass | Exported CSS compatibility | `postcss.config.mjs`, future export CSS pipeline | Required | Cross-browser CSS risk | Keep |
| eslint | Quality gate | Validation/test pipeline | `eslint.config.mjs`, `npm run lint` | Required | Static quality gate removed | Keep |
| eslint-config-next | Next lint rules | Next.js lint validation | `eslint.config.mjs` | Required | Next-specific issues missed | Keep |
| typescript | Type system | Strict DOM schema and engine contracts | `tsconfig.json`, `lib/wpx/dom/*` | Required | Kernel contracts become unsafe | Keep |
| @types/file-saver | FileSaver typings | Typed export panel/download helpers | `package.json`, future export panel | Required while FileSaver is used | TS coverage reduced | Keep |
| @types/node | Node typings | Tests/build scripts/types | `tests/smoke.test.mjs`, TS build env | Required | Test/build types degrade | Keep |
| @types/react | React typings | Typed UI/renderer components | `components/*`, future builder UI | Required | TS React authoring breaks | Keep |
| @types/react-dom | React DOM typings | Typed preview integration | future live preview modules | Required | TS DOM integration weakens | Keep |
