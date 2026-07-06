# WPX Architecture

## Runtime Model

WPX is a client-side-only browser application. All parsing, preview, transformation, persistence, dependency graph generation, CSS scoping, ZIP import, and ZIP export logic runs in the browser.

## Core Layers

1. UI Workbench: dashboard, project manager, URL import, HTML upload, sandbox preview, inspector, asset manager, diff viewer, settings, and plugin manager.
2. Ingestion Queue: HTTPS validation, unsafe-scheme rejection, deduplication, max-20 URL batches, 5 concurrent downloads, 3 retries, 30-second timeout, and optional raw proxy retrieval.
3. DOM Parser: DOMPurify sanitization followed by browser DOMParser component detection.
4. Component Detection Engine: header, navigation, hero, pricing, FAQ, footer, and utility heuristics.
5. Isolation Pipeline: css-tree selector scoping, keyframe suffixing, safe asset mode, link rewriting, and script blockade by default.
6. Sandbox Preview: iframe preview with desktop/tablet/mobile widths and sandboxed script execution only when manually enabled in future controls.
7. Local Persistence Layer: IndexedDB database `WPX_Studio_Vault` with `wpx_projects`, `wpx_structures`, `wpx_stylesheets`, and `wpx_assets` stores.
8. Export Pipeline: JSZip/FileSaver client-side export with `index.html`, `manifest.json`, `project.json`, `assets/css`, `assets/js`, and `assets/img` directories.
9. Plugin Runtime Surface: parser/exporter TypeScript interfaces plus local plugin and preset manager placeholders; no untrusted remote code is loaded.

## Prohibited Runtime Patterns

- API routes
- Server actions
- Backend processing
- Server-side HTML parsing
- Server-side CSS parsing
- Server-side ZIP generation

## Allowed Proxy Use

A user-defined proxy is allowed only for raw network retrieval through `GET /fetch?url={encodedUrl}`. The proxy must never parse, transform, process, store, or classify WPX project content.
