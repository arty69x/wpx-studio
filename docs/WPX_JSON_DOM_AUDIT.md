# WPX JSON DOM Kernel Audit and Phase 1-3 Plan

## 1. Repository audit summary

WPX Studio is a Next.js App Router application with a client-first runtime. The current builder route delegates to `components/ui/platform.tsx`, where the builder is a static visual workspace. The most important runtime engine is `lib/studio.ts`, which already owns HTML ingestion helpers, DOMPurify-compatible sanitization, css-tree CSS scoping, safe asset mode, IndexedDB persistence through `idb`, project ZIP import/export through `jszip`, dependency graphs, and project search/replace.

Relevant audited areas:

- Builder: `app/builder/page.tsx`, `components/ui/platform.tsx`.
- Studio runtime: `lib/studio.ts`.
- Platform data and registries: `data/platform.ts`, `data/whisperx.ts`, `data/marketplace.ts`, `data/global-tw4-master.json`.
- Marketplace/components: `app/marketplace`, `components/marketplace`, `app/components/page.tsx`.
- Tokens and motion: `data/platform.ts`, `components/motion/presets.ts`, `docs/DESIGN_TOKENS.md`, `docs/MOTION_SYSTEM.md`.
- Import/export/persistence: `lib/studio.ts`, `docs/EXPORT_SYSTEM.md`, `docs/WPX_TECHNICAL_SPEC.md`.
- Technical contracts: `docs/WPX_TECHNICAL_SPEC.md`, `docs/LOCKSPEC.md`, `docs/STRUCTURE_ENGINE.md`, `docs/COMPONENT_ENGINE.md`.

## 2. Current architecture map

```text
App Router pages
  -> app/*/page.tsx
  -> components/ui/platform.tsx static/visual screens

Studio engine
  -> lib/studio.ts
     -> WPXProject legacy component model
     -> IndexedDB stores: projects, structures, stylesheets, assets
     -> HTML detect/sanitize/rewrite
     -> CSS scope with css-tree
     -> safe asset mode
     -> ZIP import/export

Registries
  -> data/platform.ts synthetic platform item registry and tokens
  -> data/whisperx.ts UI library/prompts/activity data
  -> data/global-tw4-master.json Tailwind/workflow intelligence source
```

## 3. Target JSON DOM architecture

```text
JSON DOM Kernel
  -> lib/wpx/dom/types.ts       typed node and project contracts
  -> lib/wpx/dom/defaults.ts    default DOM tree/project factory and class AST adapter
  -> lib/wpx/dom/validation.ts  schema and project validation
  -> lib/wpx/dom/actions.ts     undoable DOM patch actions
  -> lib/wpx/dom/store.ts       IndexedDB persistence adapter wrapping lib/studio.ts
  -> lib/wpx/dom/search.ts      structured DOM + registry search
  -> lib/wpx/dom/filter.ts      DOM + registry filters
  -> lib/wpx/dom/random.ts      deterministic DOM generators
  -> lib/wpx/dom/importers      import into JSON DOM
  -> lib/wpx/dom/exporters      export from JSON DOM

Builder Runtime, later phases
  -> components/builder/*
  -> live preview renders JSON DOM
  -> inspector mutates selected node through actions
  -> command/search/suggestion/export panels read JSON DOM
```

## 4. Gap analysis

| Capability | Current state | Gap | Phase |
| --- | --- | --- | --- |
| DOM source of truth | Component HTML strings in `WPXProject` | Need central recursive JSON DOM node schema | 2 |
| Undoable builder actions | Legacy snapshots only component/assets/edges | Need DOM-tree command snapshots | 2-3 |
| IndexedDB | Existing legacy stores | Need DOM project adapter without deleting legacy data | 3 |
| Builder preview | Static JSX mock | Needs JSON DOM renderer and state shell | 4 |
| Inspector | Static controls | Needs selected DOM node editor | 4 |
| Search/filter | HTML component search | Need structured DOM + registry result contracts | 5, started in 3 |
| Import/export | Raw component-oriented | Need DOM conversion/export sources | 5, started in 3 |
| Production export | Basic static ZIP | Needs validated Next.js/frontend package | 6 |
| Tailwind v4 | v3 installed | Need compatibility adapter before upgrade | 5-6 |

## 5. Implementation plan

1. Create JSON DOM types, default project factory, validator, and actions.
2. Add a persistence adapter that stores DOM projects through the existing `lib/studio.ts` IndexedDB path and migrates legacy projects on load.
3. Add initial search/filter/random/import/export modules to prove engines read/write JSON DOM.
4. Add tests for schema fields, add-node action, search, HTML importer, and manifest exporter.
5. In the next phase, replace the builder mock with `components/builder/*` and route `/builder` to a JSON DOM store + preview.
6. Preserve legacy import/export and safe asset logic, then make JSON DOM export wrap existing ZIP production helpers.

## 6. File-by-file change plan

- `lib/wpx/dom/types.ts`: canonical JSON DOM and project contracts.
- `lib/wpx/dom/defaults.ts`: default nodes/pages/projects and Tailwind class AST parsing.
- `lib/wpx/dom/validation.ts`: DOM schema validator.
- `lib/wpx/dom/actions.ts`: add/update/remove/duplicate/move/wrap/unwrap/replace/select/undo/redo/snapshot.
- `lib/wpx/dom/store.ts`: IndexedDB adapter over `lib/studio.ts`.
- `lib/wpx/dom/search.ts`: structured search across DOM and registries.
- `lib/wpx/dom/filter.ts`: structured filters across DOM and registries.
- `lib/wpx/dom/importers/html.ts`: sanitized/imported HTML to DOM nodes after DOMPurify stage.
- `lib/wpx/dom/exporters/html.ts`: HTML and manifest export from JSON DOM.
- `docs/PACKAGE_USAGE_MATRIX.md`: package role matrix.
- `tests/smoke.test.mjs`: static acceptance coverage for the new kernel.

## 7. Risks and build blockers

- `DOMParser` is browser-native; Node tests should either use static tests or later add a test DOM implementation if package policy allows it.
- Persisting the full `domProject` on the legacy project object is intentionally additive, but IndexedDB schema versioning will need a later migration if separate DOM stores are required.
- Immediate Tailwind v4 upgrade is risky because the app is already configured for Tailwind v3; the safe path is a class AST/token mapping adapter first.
- The full one-click production pipeline is intentionally deferred until the JSON DOM kernel is stable.

## Phase 4 re-audit update

The follow-up audit confirmed that Phase 1-3 files existed on the current branch, but `/app/builder/page.tsx` still rendered the legacy static `PlatformPage kind="builder"`, and `components/builder/*` did not exist. Phase 4 therefore keeps the JSON DOM kernel, upgrades the required store/action contracts, and replaces the builder route with a Live Builder that renders and mutates JSON DOM only.

Phase 4 implementation scope:

- `/app/builder/page.tsx` now renders `BuilderShell`.
- `components/builder/*` provides LayerTree, LivePreview, Inspector, CommandBar, SearchPanel, SuggestionPanel, ExportPanel, and OneClickPanel.
- `lib/wpx/dom/renderer.tsx` recursively renders JSON DOM nodes with selected-node highlighting and `framer-motion` support.
- `lib/wpx/dom/store.ts` provides a client-side React store with `idb` persistence.
- Every visible builder edit routes through JSON DOM actions and command patches.

## Production polish update

The Live Builder was hardened after review so it is safer to use as a real editing surface:

- DOM duplication now rekeys every node in a duplicated subtree to avoid duplicate IDs.
- Node moves are blocked when they would move a node into its own descendant.
- The renderer forwards only safe primitive props and explicitly excludes `dangerouslySetInnerHTML`, `ref`, `style`, `className`, and child overrides from JSON props.
- The IndexedDB store now writes command snapshots into `wpx_dom_snapshots` in addition to persisting the active DOM project.
- Validation tracks node IDs across the whole project, not just one page at a time.
- One-click random build uses deterministic JSON DOM generation instead of UI-only randomness.


## Phase 5 engine wiring update

The builder now has the first usable Phase 5 import/export wiring while still keeping production frontend generation out of scope:

- `ImportPanel` sanitizes pasted HTML with DOMPurify, converts it to JSON DOM with `htmlToDomNodes`, and adds imported nodes through DOM actions.
- `ExportPanel` can download both DOM JSON and a JSZip static package generated from JSON DOM.
- `lib/wpx/dom/exporters/package.ts` emits `index.html`, `dom.json`, `project.json`, `manifest.json`, `production-report.json`, `README.md`, and an assets placeholder.
- These import/export paths read and write JSON DOM only; they do not treat preview UI state as the source of truth.


## Tailwind compatibility adapter update

A Tailwind v3-compatible class adapter now exists before any Tailwind v4 upgrade:

- `lib/wpx/dom/tailwind.ts` parses class strings into class tokens and groups.
- It resolves class conflicts deterministically and exports a per-node `tailwind-class-map.json` in the DOM ZIP package.
- It exposes token-to-class mapping hooks for future design-token compilation.
- It keeps css-tree in the analysis path for CSS parsing without changing the existing Tailwind v3 runtime.
