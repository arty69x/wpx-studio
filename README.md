# WHISPERX | STUDIO (WPX)

WPX is a client-side-only Next.js workbench for importing HTML from URLs or local files, sanitizing and detecting reusable components, previewing them in a sandboxed iframe, storing workspaces in IndexedDB, and exporting clean ZIP packages.

## Architecture Rules

- All parsing, DOM processing, CSS scoping, link rewriting, dependency graph generation, IndexedDB persistence, ZIP import, and ZIP export run in the browser.
- The application does not define API routes, Server Actions, Node backends, Express/Nest services, or server-side source processing.
- A user-supplied proxy endpoint may be configured only for raw network retrieval with `GET /fetch?url={encodedUrl}`.

## Implemented Workbench Modules

- Dashboard and Project Manager with storage quota display and restore controls.
- URL Import Panel with HTTPS normalization, unsafe-scheme rejection, deduplication, max-20 URL batches, retry and timeout fetch queue, and optional raw proxy support.
- HTML paste/upload panel with DOMPurify sanitization and DOMParser component detection.
- Component checklist, append mode, basic merge mode, batch operations, search/replace, and undo/redo snapshots.
- Sandboxed desktop/tablet/mobile iframe preview with external scripts blocked by default and script-enable status surfaced per component.
- Inspector Panel, Asset Manager, Diff Viewer, Settings, Plugin Manager, preset/marketplace placeholder, and dependency graph screen.
- IndexedDB vault named `WPX_Studio_Vault` with `wpx_projects`, `wpx_structures`, `wpx_stylesheets`, and `wpx_assets` stores.
- css-tree-based CSS scoping, safe asset mode, link rewriting, JSZip export, FileSaver download, and WPX ZIP re-import from `project.json`.

## Verification

Run:

```bash
npm install
npm run lint
npm run build
npm test
```

`npm test` is currently expected to fail until a test script is added; this is documented in `docs/BUILD_NOTES.md`.
