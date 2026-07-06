# WHISPERX | STUDIO (WPX)

WHISPERX | STUDIO (WPX) is a client-side structural HTML collector, parser, previewer, component isolation workspace, and ZIP export tool.

The application is designed as an **Offline Browser Engine**. All HTML parsing, DOM processing, component detection, preview rendering, CSS scoping, asset management, and ZIP export must run inside the browser.

No backend code processing is allowed.

## Tech Stack

- Next.js 15
- TypeScript
- TailwindCSS
- Framer Motion
- DOMPurify
- JSZip
- FileSaver.js
- csstree / css-tree
- idb

## Core Rule

WPX must remain client-side only.

Do not use:

- API Routes
- Server Actions
- Backend HTML parsing
- Server-side CSS processing
- Cloud code processing

A proxy may only be used for raw network fetching and must not process, parse, store, or transform user code.

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

## Lint

```bash
npm run lint
```

## Build

```bash
npm run build
```

## Folder Structure

```text
src/
  app/
  components/
  core/
  hooks/
  lib/
  storage/
  styles/
  types/
  utils/
  assets/

docs/
  WPX_TECHNICAL_SPEC.md
  ARCHITECTURE.md
  MVP_PHASE_1.md
  BUILD_NOTES.md
  CHANGELOG.md
```

## MVP Phase 1 Scope

Implement only:

- Dark Tech Studio UI layout
- Multiple URL input
- HTML paste input
- HTML file upload
- DOMPurify sanitization
- DOMParser component detection
- Component checklist
- Sandbox iframe preview
- Append mode
- Basic merge mode
- Export ZIP using JSZip and FileSaver.js
- TODO placeholders for IndexedDB, CSS scoping, plugin system, asset manager, and dependency graph

## Prohibited in MVP Phase 1

- No API routes
- No Server Actions
- No backend processing
- No IndexedDB implementation yet
- No plugin system implementation yet
- No advanced CSS scoping yet
- No marketplace implementation yet

## Vercel Deployment Workflow

- Every push to GitHub can trigger Vercel deployment automatically.
- Feature branches should create Preview Deployments.
- `main` should deploy to Production.
- Always run lint and build before opening a Pull Request when the environment allows it.

## Next Phases

Phase 2:

- IndexedDB persistence
- Project Manager
- Asset Manager
- Save/load project state
- Storage quota monitor

Phase 3:

- csstree CSS scoping
- Link Rewriter
- Script Handling Policy
- Safe Asset Mode
- Dependency Graph basics

Phase 4:

- Diff Viewer
- Undo/Redo Command Pattern
- Project-wide Search & Replace
- Batch Operations

Phase 5:

- Plugin System
- Template Marketplace
- Presets
- Custom Parser/Exporter interfaces

## License

TBD
