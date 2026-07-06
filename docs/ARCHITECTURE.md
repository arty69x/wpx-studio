# Architecture

WPX uses the Next.js App Router with a single client component for the MVP studio. All processing happens in the browser.

## Layers

- `app/`: application shell, metadata, and routing.
- `components/StudioApp.tsx`: client-side editor, preview, save, and export UI.
- `lib/studio.ts`: reusable browser utilities for project state, CSS validation, IndexedDB, and ZIP creation.

## Data Flow

1. User edits HTML and CSS in local React state.
2. HTML is sanitized with DOMPurify before preview or export.
3. CSS is parsed with css-tree for syntax feedback.
4. Saved project state is written to IndexedDB.
5. Export creates a ZIP in the browser with JSZip and downloads it with FileSaver.js.
