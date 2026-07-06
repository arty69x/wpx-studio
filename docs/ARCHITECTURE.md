# WPX Architecture

## Runtime Model

WPX is a client-side-only browser application. All WPX parsing, preview, transformation, persistence, and export logic must run in the browser.

## Core Layers

1. UI Workbench
2. Ingestion Queue
3. DOM Parser
4. Component Detection Engine
5. Sandbox Preview
6. Export Pipeline
7. Local Persistence Layer
8. Future Plugin Runtime

## Data Flow

```text
URL / HTML Input
  -> Validation / Sanitization
  -> DOMParser
  -> Component Detection
  -> Component Checklist
  -> Sandbox Preview
  -> Append / Merge
  -> JSZip Export
```

## Prohibited Runtime Patterns

- API routes
- Server actions
- Backend processing
- Server-side HTML parsing
- Server-side CSS parsing

## Allowed Proxy Use

A user-defined proxy is allowed only for raw network retrieval when CORS blocks direct browser fetches.

The proxy must never parse, transform, process, store, or classify WPX project content.

## MVP Phase 1 Architecture

Phase 1 implements only:

- UI shell
- URL input
- Manual HTML upload / paste
- DOMPurify sanitization
- DOMParser component detection
- Sandbox preview
- Append / basic merge
- ZIP export

IndexedDB, advanced CSS scoping, Asset Manager, Dependency Graph, Diff Viewer, and Plugin System must remain TODO placeholders in Phase 1.
