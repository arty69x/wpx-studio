# WHISPERX | STUDIO (WPX) - Technical Specification Manifest

**Document Version:** 2026.7.5  
**Execution State:** Production-Ready / Zero-Ambiguity Ultimate Master Blueprint  
**Target Audience:** AI Engineering Core / Autonomous Coders / Frontend Architects / Product Builders  
**Core Classification:** Client-Side Structural Web Scraper, Scoped Component Architecture & Extensible Lifecycle Engine

## 1. Client-Side Runtime Engine & Local Storage Architecture

WPX operates on an Offline Browser Engine Architecture. The entire pipeline—including data ingestion, structural parsing, DOM manipulation, style isolation, and persistence—executes inside the client-side browser runtime.

**Zero Server Computations for Code Processing:** all source code processing occurs strictly on the client side. A user-defined proxy is permitted only for raw network retrieval and must never perform parsing, storage, structural transformations, or code processing.

```text
DOMContentLoaded -> readAll() -> Hydrate Memory Cache -> Paint UI Workspace
URL Input / HTML File -> Concurrent Fetch Queue -> Link Rewriter
Component Isolation Engine -> Dependency Graph Generator -> IndexedDB Commit
```

## 2. IndexedDB Structural Schema

Database: `WPX_Studio_Vault`

### Stores

- `wpx_projects`
- `wpx_structures`
- `wpx_stylesheets`
- `wpx_assets`

```ts
interface Project {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  sourceUrls: string[];
}

interface Structure {
  id: string;
  projectId: string;
  version: number;
  type: 'Header' | 'Navigation' | 'Hero' | 'About' | 'Portfolio' | 'Services' | 'Process' | 'Testimonials' | 'Pricing' | 'FAQ' | 'Footer' | 'Utility';
  html: string;
  scopeId: string;
}

interface Stylesheet {
  id: string;
  projectId: string;
  structureId: string;
  scopeId: string;
  rawCss: string;
  scopedCss: string;
  version: number;
}

interface Asset {
  id: string;
  projectId: string;
  originalUrl: string;
  localPath: string;
  mimeType: string;
  blob: Blob;
  size: number;
}

interface DependencyEdge {
  from: string;
  to: string;
  type: 'uses-css' | 'uses-js' | 'uses-asset' | 'imports';
}
```

## 3. Core Libraries

- ZIP: `JSZip` v3+
- Download: `FileSaver.js`
- CSS AST: `csstree` / `css-tree`
- Sanitization: `DOMPurify`
- Local DB: `idb`

## 4. Fetch Queue

```ts
const FetchQueueConfig = {
  maxConcurrentDownloads: 5,
  retryAttempts: 3,
  timeoutMs: 30000
};
```

## 5. URL Validation & CORS Proxy Strategy

Rules:

1. Only `https://` is valid; `http://` should be upgraded to `https://`.
2. Reject `javascript:`, `data:`, and `file:` schemes.
3. Normalize trailing slash.
4. Deduplicate URL queue per project.

Proxy contract:

```http
GET /fetch?url={encodedUrl}
```

```json
{
  "url": "string",
  "status": 200,
  "contentType": "text/html",
  "body": "string"
}
```

Proxy can retrieve raw network data only. It must not parse, store, transform, or process user code.

## 6. Component Detection Rules

DOM Parser categorizes structural blocks using heuristic constraints:

- `<header>` or id/class containing `header`, `top-menu` -> Header
- `<nav>` or id/class containing `nav`, `navbar`, `navigation`, `menu-bar` -> Navigation
- First large top-level section or id/class containing `hero`, `jumbotron`, `main-banner`, `focal-point` -> Hero
- id/class containing `pricing`, `price`, `subscription`, `tier`, `package-table` -> Pricing
- id/class containing `faq`, `accordion`, `question`, `q-and-a`, `knowledge-base` -> FAQ
- `<footer>` or id/class containing `footer`, `bottom-site`, `copyright-zone` -> Footer
- fallback -> Utility

## 7. CSS Scoping Strategy

Use `csstree` AST transformation, not regex.

Examples:

- `.card` -> `.card[data-wpx-scope="wpx-id"]`
- `#hero` -> `#hero[data-wpx-scope="wpx-id"]`
- `p` -> `p[data-wpx-scope="wpx-id"]`
- `.btn::after` -> `.btn[data-wpx-scope="wpx-id"]::after`
- `*` -> `*[data-wpx-scope="wpx-id"]`
- `html, body` -> `[data-wpx-scope="wpx-id"]`
- `:root` -> `[data-wpx-scope="wpx-id"]`
- `@media` keeps its condition while nested selectors are scoped.
- `@keyframes bounce` -> `@keyframes bounce-wpx-id`; all references must be updated.

## 8. Script Policy

- External scripts are disabled by default.
- Engineers can manually enable selected scripts in the Inspector.
- Enabled scripts must run only in sandboxed iframe context.
- Export scripts as isolated ES Modules under `/assets/js/components/*.js`.

## 9. Safe Asset Mode

When enabled before export:

- Replace external `img/src` with local placeholders.
- Replace `video/src` with placeholder canvas and compliance notice.
- Flatten `source/srcset` to a single local placeholder.
- Rewrite CSS `background-image` URLs through csstree.
- Remove external font routes and fallback to system stacks.

## 10. Application State

```ts
interface Command {
  id: string;
  label: string;
  timestamp: number;
  affectedIds: string[];
  undo(): void;
  redo(): void;
}

interface AppState {
  activeProjectId: string | null;
  selectedComponentIds: string[];
  previewMode: 'desktop' | 'tablet' | 'mobile' | 'diff';
  fetchQueueStatus: 'idle' | 'processing' | 'paused' | 'error';
  safeAssetMode: boolean;
  undoStack: Command[];
  redoStack: Command[];
}
```

## 11. User Flow

```text
Create Project -> Paste URL / Upload HTML -> Fetch / Import -> Parse & Detect Rules -> Select Components -> Preview in Sandbox -> Export ZIP Package
```

## 12. Security Model

- DOMPurify ingestion scrubbing.
- Sandboxed preview iframe.
- CSP reinforcement.
- Strict scheme blocking.
- Network request warnings for external tracking or pixel calls.

## 13. Plugin Interfaces

```ts
export interface WPXStructure {
  type: string;
  html: string;
  css: string;
  metadata: Record<string, unknown>;
}

export interface WPXProject {
  meta: { name: string; sourceUrls: string[] };
  components: WPXStructure[];
  assets: { localPath: string; binaryData: Blob; mimeType: string }[];
}

export interface WPXParserPlugin {
  id: string;
  name: string;
  version: string;
  parse(input: string): WPXStructure[];
}

export interface WPXExporterPlugin {
  id: string;
  name: string;
  version: string;
  export(project: WPXProject): Blob;
}
```

## 14. Error Handling Matrix

| Error | Context | Recovery |
|---|---|---|
| `FETCH_FAILED` | Network workers | Log, alert UI, allow retry |
| `CORS_BLOCKED` | Direct fetch | Fallback to proxy or manual paste |
| `ASSET_MISSING` | Asset downloader | Skip, log, inject placeholder |
| `CSS_PARSE_FAILED` | csstree parsing | Abort that file, keep app running, log details |
| `STORAGE_QUOTA_EXCEEDED` | IndexedDB commit | Halt writes, show quota warning, invoke pruning |
| `ZIP_BUILD_FAILED` | JSZip | Abort packaging and identify corrupted asset |
| `PROJECT_IMPORT_FAILED` | ZIP/project import | Rollback transaction and diagnose project.json |

## 15. Performance Limits

- Max URL batch: 20 URLs
- Max components/project: 500
- Max asset/file: 15 MB
- Max project size: 150 MB
- Max concurrent downloads: 5

## 16. Screen List

1. Dashboard
2. Project Manager
3. URL Import Panel
4. HTML Upload Panel
5. Sandbox Preview Canvas
6. Inspector Panel
7. Asset Manager UI
8. Diff Viewer Screen
9. Export Modal
10. Settings
11. Plugin Manager

## 17. Design Tokens

| Token | Hex |
|---|---|
| Canvas Background | `#0D1117` |
| Panel Surface | `#21262D` |
| Primary Accent | `#8B5CF6` |
| Secondary Accent | `#10B981` |
| Alert Accent | `#EF4444` |
| Main Typography | `#C9D1D9` |
| Sub Typography | `#8B949E` |

## 18. Export Directory

```text
wpx_blueprint_export_[project_name]_YYYY-MM-DD_HHmm.zip/
├── index.html
├── manifest.json
├── project.json
└── assets/
    ├── css/
    │   ├── main.css
    │   └── components/
    ├── js/
    │   ├── main.js
    │   └── components/
    └── img/
        ├── system/
        └── placeholders/
```

## 19. MVP Phases

Phase 1: Core parsing, basic ingestion, preview, append/merge, ZIP export.  
Phase 2: IndexedDB persistence, Project Manager, Asset Manager.  
Phase 3: csstree CSS scoping, Link Rewriter, Script Policy, Safe Asset Mode.  
Phase 4: Diff Viewer, Undo/Redo, Search & Replace, Batch Operations.  
Phase 5: Plugin System, Template Marketplace, Presets.

## 20. Acceptance Criteria

1. Zero server computations for code processing.
2. 100% style isolation fidelity for exported components.
3. Strict security sanitization loops.
4. Transaction data integrity with undo/redo.
5. Clean asset directory packages that run locally without broken resource errors.
