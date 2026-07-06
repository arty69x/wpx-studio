# WHISPERX | STUDIO (WPX) - TECHNICAL SPECIFICATION MANIFEST

### SYSTEM IDENTIFICATION: WHISPERX | STUDIO (WPX)

**Document Version:** 2026.7.5

**Execution State:** Production-Ready / Zero-Ambiguity Ultimate Master Blueprint

**Target Audience:** AI Engineering Core / Autonomous Coders / Frontend Architects / Product Builders

**Core Classification:** Client-Side Structural Web Scraper, Scoped Component Architecture & Extensible Lifecycle Engine

---

## 1. Client-Side Runtime Engine & Local Storage Architecture

The WhisperX | Studio (WPX) platform operates on a decentralized **Offline Browser Engine Architecture**. The entire pipeline—including data ingestion, structural parsing, DOM manipulation, style isolation, and persistence—executes 100% within the client-side browser runtime environment.

> **Zero Server Computations for Code Processing:** All source code processing occurs strictly on the client side without server dependencies. A user-defined network proxy is permitted exclusively for raw data retrieval (network fetching) and must never perform parsing, storage, structural transformations, or code processing.

```text
[Client-Side Runtime Lifecycle Environment]
DOMContentLoaded ──> readAll() ──> Hydrate Memory Cache ──> Paint UI Workspace
       │
[Asset Ingestion Queue]
URL Input/HTML File ──> Concurrent Fetch Queue (Workers) ──> Link Rewriter
       │
[Isolation & Storage]
Component Isolation Engine ──> Dependency Graph Generator ──> IndexedDB Commit

```

### 🗄️ IndexedDB Structural Schema

Database Instance Name: `WPX_Studio_Vault`

The persistence layer is partitioned into 4 primary object stores:

#### Project Store (`wpx_projects`)

```typescript
interface Project {
  id: string;              // Primary Key (Unix Timestamp + Cryptographically Secure Random String)
  name: string;            // User-defined project name
  createdAt: number;       // Epoch timestamp (milliseconds)
  updatedAt: number;       // Epoch timestamp (milliseconds)
  sourceUrls: string[];    // Array of targeted origin URLs ingested into this project
}

```

#### Structure Store (`wpx_structures`)

```typescript
interface Structure {
  id: string;              // Unique Component ID
  projectId: string;       // Foreign Key linking to wpx_projects.id
  version: number;         // Component structural version (Incremental Tree Architecture)
  type: 'Header' | 'Navigation' | 'Hero' | 'About' | 'Portfolio' | 'Services' | 'Process' | 'Testimonials' | 'Pricing' | 'FAQ' | 'Footer' | 'Utility'; 
  html: string;            // Cleaned and purified HTML markup of the component
  scopeId: string;         // Unique token string reserved for CSS Encapsulation (e.g., wpx-scope-xxxx)
}

```

#### Stylesheet Store (`wpx_stylesheets`)

```typescript
interface Stylesheet {
  id: string;              // Primary Key for the stylesheet entity
  projectId: string;       // Foreign Key linking to wpx_projects.id
  structureId: string;     // Foreign Key linking to wpx_structures.id
  scopeId: string;         // Unique encapsulation token mapping to the parent component
  rawCss: string;          // Original CSS payload fetched from source prior to scoping
  scopedCss: string;       // Mutated CSS output injected with attribute scope selectors via csstree
  version: number;         // Stylesheet model version, matching the component structure version
}

```

#### Asset Store (`wpx_assets`)

```typescript
interface Asset {
  id: string;              // Unique asset identification token
  projectId: string;       // Foreign Key linking to wpx_projects.id
  originalUrl: string;     // Original external absolute source URL
  localPath: string;       // Transformed internal project path (e.g., assets/img/hero.jpg)
  mimeType: string;        // Valid file MIME type (e.g., image/png, font/woff2, text/css)
  blob: Blob;              // Binary Large Object data payload stored locally in the browser
  size: number;            // Size of asset file in bytes
}

```

### 📊 Dependency Graph Subsystem

The engine computes and maps architectural relationships within each project, storing explicit structural edges to manage link re-writing and encapsulation cascades:

```typescript
interface DependencyEdge {
  from: string;            // Source Object ID (e.g., structureId or assetId)
  to: string;              // Target Object ID being referenced or consumed
  type: 'uses-css' | 'uses-js' | 'uses-asset' | 'imports'; // Architectural relationship classification
}

```

### 📥 Concurrent Async Fetch Queue

Resource acquisition (CSS, JS, fonts, images) is strictly throttled via a worker queue to prevent layout blocking and manage memory usage gracefully under maximum threshold boundaries:

```typescript
const FetchQueueConfig = {
  maxConcurrentDownloads: 5,   // Maximum concurrent network workers operating simultaneously
  retryAttempts: 3,            // Network connection retry policy threshold limit
  timeoutMs: 30000             // Absolute execution timeout boundary per asset file (30 seconds)
};

```

### 🧰 Core Libraries Selection

* **ZIP Compression & Packaging Engine:** `JSZip` (v3.x or higher) is locked for compiling and nesting the memory buffers into a valid directory tree structure.
* **File Downloader Trigger:** `FileSaver.js` is locked to invoke native browser File System APIs, exporting the internal ZIP blob directly to local user environments.
* **CSS AST Parser Engine:** `csstree` is locked to parse stylesheets into a clean Abstract Syntax Tree (AST), ensuring precise manipulation of complex media queries, keyframes, and selectors while rejecting unreliable regex-based find-and-replace mechanics.

---

## 2. URL Validation & CORS Proxy Strategy

### 🛡️ URL Validation Rules

All targeted inputs entered into the Ingestion Queue must clear the following security filters prior to processing:

1. **Protocol Enforcement:** Only `https://` schemes are valid. If a user inputs an `http://` address, the engine forces an automatic upgrade to `https://`.
2. **Strict Scheme Rejection:** Any resource paths prefixing `javascript:`, `data:`, or `file:` schemes are immediately flagged, rejected, and purged from execution.
3. **Trailing Slash Normalization:** Eliminates absolute URL path ambiguities by standardizing trailing directory breaks (e.g., `[https://example.com/](https://example.com/)` $\rightarrow$ `[https://example.com](https://example.com)`).
4. **Deduplication Core:** Dedupes input queues globally within the scope of a single project, merging identical resource targets into one request to optimize bandwidth.

### 🌐 Proxy Contract API Shape

When a cross-origin resource block is encountered (Mode B), the core infrastructure seamlessly routes network queries through the user-configured proxy using this contract standard:

**HTTP Request Method:** `GET`

**Endpoint Interface Format:** `/fetch?url={encodedUrl}`

**Response JSON Schema:**

```json
{
  "url": "string (Target destination URL being resolved)",
  "status": "number (HTTP Status Code returned, e.g., 200, 404, 500)",
  "contentType": "string (Standard MIME type signature of origin resource)",
  "body": "string (Raw HTML string payload or Base64 string representation for binary assets)"
}

```

---

## 3. Component Detection Rules

Upon passing the raw HTML layout through the DOM Parser, the discovery module applies explicit **Heuristic Structural Constraints** to categorize elements into decoupled UI building blocks:

```text
[HTML DOM Document] ──> Heuristic Rules Engine ──> Component Taxonomy Breakdown
                                                           │
  ├── Tag <header>, <nav>, or ID/Class matching "header", "nav" ──> Header / Navigation Component
  ├── First large-scale view-priority structural <section>      ──> Hero Section Component
  ├── Tag <footer>, or ID/Class matching "footer"               ──> Footer Component
  ├── ID/Class matching "pricing", "price", "subscription"      ──> Pricing Table Component
  └── ID/Class matching "faq", "accordion", "question"         ──> FAQs Component

```

1. **Header Component:** Matches explicit structural `<header>` tags or any element block whose ID or class properties match the sub-string `header` or `top-menu`.
2. **Navigation Component:** Matches structural `<nav>` containers or any block elements containing attributes configured with `nav`, `navbar`, `navigation`, or `menu-bar`.
3. **Hero Section Component:** Isolates the first critical structural `<section>` or root-level wrapper `<div>` context occupying the upper visible viewport containing keywords like `hero`, `jumbotron`, `main-banner`, or `focal-point`.
4. **Pricing Table Component:** Matches structural containers matching attributes with `pricing`, `price`, `subscription`, `tier`, or `package-table`.
5. **FAQs Component:** Catches blocks with selectors or structural wrappers specifying `faq`, `accordion`, `question`, `q-and-a`, or `knowledge-base`.
6. **Footer Component:** Matches target `<footer>` element tags or elements with class/ID markers matching `footer`, `bottom-site`, or `copyright-zone`.
7. **Utility Component:** Fallback capture zone for any structural DOM blocks not satisfying the rule heuristics above but matching generic design utility behaviors.

---

## 4. Component Isolation, Script Policy & Advanced CSS Scoping Rules

### 🧬 csstree AST Selector Transformation Strategy

To guarantee 100% strict interface isolation without global bleeding, the engine applies an absolute scoping attribute selector (e.g., `[data-wpx-scope="wpx-id"]`) directly into the style rules tree via the `csstree` parser based on these operational parameters:

| Selector / Block Type | AST Transformation Rule | Output Compiled Source Code |
| --- | --- | --- |
| **Standard Classes & IDs** | Appends the exact unique attribute token block to the terminal selector | `.card` $\rightarrow$ `.card[data-wpx-scope="wpx-id"]`<br>

<br>`#hero` $\rightarrow$ `#hero[data-wpx-scope="wpx-id"]` |
| **Element Selectors** | Injects the attribute constraint block directly onto the baseline element signature | `p` $\rightarrow$ `p[data-wpx-scope="wpx-id"]`<br>

<br>`div` $\rightarrow$ `div[data-wpx-scope="wpx-id"]` |
| **Pseudo-elements** | Affixes the attribute controller sequence directly *before* the structural pseudo-operator | `.btn::after` $\rightarrow$ `.btn[data-wpx-scope="wpx-id"]::after` |
| **Universal Selector (`*`)** | Binds the unique attribute token wrapper scope to the wildcard signature | `*` $\rightarrow$ `*[data-wpx-scope="wpx-id"]` |
| **Root Tags (`html`, `body`)** | Rewrites the top-level structural identifiers to point to the host scope attribute wrapper | `html, body` $\rightarrow$ `[data-wpx-scope="wpx-id"]` |
| **Global Context (`:root`)** | Transforms the engine keyword into an attribute node block to protect custom variable boundaries | `:root` $\rightarrow$ `[data-wpx-scope="wpx-id"]` |
| **Media Queries (`@media`)** | Retains the condition boundary wrapper while recursively parsing and mutating nested structural rules via the AST pipeline | `@media (...) { .box { ... } }`<br>

<br>$\rightarrow$ `@media (...) { .box[data-wpx-scope="wpx-id"] { ... } }` |
| **Keyframes (`@keyframes`)** | appends a unique scope suffix to the animation identifier and replaces references globally | `@keyframes bounce` $\rightarrow$ `@keyframes bounce-wpx-id`<br>

<br>`animation: bounce` $\rightarrow$ `animation: bounce-wpx-id` |

### 🛠️ Script Handling Policy

* **Default Execution Blockade:** External references (`<script src="...">`) extracted during scraping are stripped from execution pools to enforce absolute workspace stability.
* **Allow Manual Enable:** Engineers can selectively toggle scripts back into service via the Right Inspector pane.
* **Sandboxed Execution Only:** Reactivated interaction code runs in isolation inside a highly secured container framework (`<iframe sandbox="allow-scripts">`) to prevent memory space contamination.
* **Export Scripts as Isolated Modules:** Upon compilation, component interactions are exported cleanly as distinct ES Modules (`/assets/js/components/*.js`).

### 🛡️ Safe Asset Mode Specifications

When **Safe Asset Mode** is enabled prior to generating the deployment package, the system sweeps codebases via an isolated sanitization loop to **mitigate copyright liabilities and prevent unauthorized hotlinking** by transforming external assets into localized placeholders:

1. **`img/src`:** Purges external target routes, substituting uniform placeholder files mapped locally (e.g., `assets/placeholders/wpx-placeholder-400x300.png`).
2. **`video/src`:** Removes streaming routes, replacing video canvas frameworks with an isolated image placeholder layout and custom compliance notice.
3. **`source/srcset`:** Flattens complex screen-responsive density arrays, collapsing outputs down to a single localized placeholder asset file reference.
4. **CSS `background-image`:** Inspects `url(...)` wrappers using `csstree` to strip hotlinked image endpoints, rewriting routes to look for uniform system canvas placeholders.
5. **External Font Resolution:** Scans structural `@font-face` blocks. Cross-origin font routes (`src: url(...)`) are purged and fallback to standard system stacks (e.g., `sans-serif`, `system-ui`) to prevent asset entitlement violations.

### 🔗 Link Rewriter

Scans and updates all asset references across HTML and CSS layers, converting absolute or relative source paths to match the internal static directory output format:

* `[https://site.com/assets/main.css](https://site.com/assets/main.css)` $\rightarrow$ `assets/css/main.css`
* `../images/hero.jpg` $\rightarrow$ `assets/img/hero.jpg`

---

## 5. Application State Management

The frontend workspace relies on a strict single source of truth centralized state manager object configuration to coordinate interface actions:

```typescript
interface Command {
  id: string;               // Unique tracking identifier for tracking historical command transactions (UUID)
  label: string;            // Human-readable string summarizing the execution context (e.g., "Bulk Rename Utility Classes")
  timestamp: number;        // Event execution occurrence mark (Epoch millisecond)
  affectedIds: string[];    // Array of unique component IDs mutated by this state command block
  undo(): void;             // Reverts the app data back to its exact pre-execution model state
  redo(): void;             // Re-commits the exact transactional updates onto the active context state
}

interface AppState {
  activeProjectId: string | null;           // Currently focused workspace target container link ID
  selectedComponentIds: string[];           // Array of active components checked by user inside selection streams
  previewMode: 'desktop' | 'tablet' | 'mobile' | 'diff'; // Display topology configuration toggle state
  fetchQueueStatus: 'idle' | 'processing' | 'paused' | 'error'; // Execution status tracking for network modules
  safeAssetMode: boolean;                   // Operational toggle flag enforcing data scrubbing security paths
  undoStack: Command[];                     // Linear history stack containing actions eligible for undoing
  redoStack: Command[];                     // Linear history stack containing actions eligible for redoing
}

```

---

## 6. User Operational Flows

### 🔄 1. Main Lifecycle Flow

```text
[Create Project] ──> [Paste URL / Upload HTML] ──> [Fetch / Import] ──> [Parse & Detect Rules]
                                                                                │
[Export ZIP Package] <── [Preview in Sandbox Canvas] <── [Select Component Checklist] <──┘

```

### 📥 2. Project Re-Import Subsystem

Supports unpacking historical WPX project artifacts and hydration back into active local storage sessions:

1. **Upload WPX Project ZIP:** User mounts a valid project archive file to the import interface element.
2. **Read `project.json`:** `JSZip` opens the archive, extracting the indexing configuration file `project.json` to parse configuration variables and validate architectural health parameters.
3. **Restore IndexedDB Profile:** The engine builds a fresh project tracking instance record inside the local `wpx_projects` data store.
4. **Restore Assets Blob Archive:** Re-reads localized file asset components, re-hydrating base binary structures securely back into the `wpx_assets` persistence layer.
5. **Reconstruct Component Node Tree:** Unpacks components out into the `wpx_structures` repository while mapping matching layout styles straight into `wpx_stylesheets` to render the user environment immediately.

---

## 7. Core Security Model

The system enforces an **Absolute Zero-Trust Framework** within the client-side browser space to neutralize malicious runtime payloads:

* **DOMPurify Ingestion Scrubbing:** Every scraped HTML asset passes through a recursive `DOMPurify` sanitizer cycle before reaching storage or rendering views. This automatically strips inline event triggers (`onload`, `onerror`), script injections, and unverified element tags.
* **Sandboxed Preview Workspace Enclosure:** Component integration previews execute inside highly constrained iframe wrappers isolated via security attributes:
```html
<iframe sandbox="allow-scripts allow-modals" csp="default-src 'self'; img-src 'self' data:; style-src 'unsafe-inline';"></iframe>

```

* **Content Security Policy (CSP) Reinforcement:** Content execution paths cannot pierce or touch the host system space window layer (`window.top`). Access paths to parent authorization tokens, local session records, or cookies are blocked.
* **Strict Scheme Block:** Mitigates persistent cross-site script execution attempts by blocking bad entry schemas like `javascript:`, alongside runtime evaluation wrappers (`eval()`, `Function()`).
* **Network Request Warning System:** Instantly triggers an interface alert modal if a component attempts to run unverified tracking scripts, external analytical configurations, or pixel calls.

---

## 8. Core Plugin System Interfaces

An extensible plugin runtime model enables the addition of custom parsers and export adapters via strict code interface definitions:

```typescript
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
  /**
   * Accepts a raw string input payload and processes it into an array of compliant WPX component blocks.
   */
  parse(input: string): WPXStructure[];
}

export interface WPXExporterPlugin {
  id: string;
  name: string;
  version: string;
  /**
   * Accepts a valid project blueprint and formats it into a specialized file compilation blob wrapper.
   */
  export(project: WPXProject): Blob;
}

```

---

## 9. Global Operations Subsystem

### 🔍 Project-Wide Search & Replace Engine

* **Unified Query Indexing:** Builds a fast, client-side text index covering all raw HTML structures, component stylesheets, and custom scripting scopes within the loaded project profile.
* **Regex Pattern Matching:** Supports searching via precise string lookups or complex, case-sensitive Regular Expression constraints.
* **Live Multi-File Code Replacement:** Executes simultaneous batch modifications across all component nodes. Updates appear instantly inside the **Diff Viewer Screen** for code review before committing changes to IndexedDB.

### 🛠️ Batch Operations Subsystem

* **Bulk Code Refactoring:** Streamlines mass component changes through multi-selection tools in the right management pane.
* **CSS Class Normalization:** Modifies, appends, or renames groups of classes across all components simultaneously (e.g., standardizing custom utilities into common layout markers).
* **Tag Type Transformations:** Restructures repetitive layout containers (e.g., converting deep nested boilerplate `<div>` wrappers into explicit semantic HTML structures like `<section>` or `<article>`).
* **Tracker Removal:** Sweeps all workspace structures automatically, scanning for and removing external analytical script blocks, pixel call configurations, or monitoring hooks.

### 🔄 Side-by-Side Diff Viewer

* **Structural Diff Canvas:** Toggled during batch adjustments or code generation stages. Provides a side-by-side layout layout comparison engine. Changes highlight precisely in green (additions) and red (deletions) to review code modifications prior to save operations.

### 🗂️ Template Marketplace & Presets

* **Local Component Presets:** Allows users to save customized or cleaned component layouts into personal browser preset modules for future use.
* **Marketplace Integration:** Left sidebar element supports loading remote design templates and user presets, allowing designers to drag historic component assets directly into active design workspaces.

---

## 10. Systematic Error Handling Matrix

| Error Event | Detection Boundary / Context | Recovery Protocol & Mitigations |
| --- | --- | --- |
| `FETCH_FAILED` | Network Queue Request / Async Workers | Suspends the failed worker thread, logs the underlying failure code, and surfaces an error alert on the UI to prompt connection checking. |
| `CORS_BLOCKED` | Mode A Ingestion Core Execution | Intercepts Cross-Origin rejections, logs resource parameters, and falls back to Mode B (Proxy Engine) or Mode C (Manual Paste UI) instantly. |
| `ASSET_MISSING` | Asset Downloader Processing Iteration | Notes the broken target asset path in the project history ledger, skips processing to avoid queue deadlocks, and embeds a broken asset layout icon block. |
| `CSS_PARSE_FAILED` | `csstree` Syntax Analysis Pipeline | Aborts rewrite processing on the failing file, decouples the invalid file path to keep the app space operational, and maps syntax details to the Console log. |
| `STORAGE_QUOTA_EXCEEDED` | IndexedDB Commit Transactions Loop | Halts writing operations instantly to prevent data corruption risks, flips storage usage indicators to red, and invokes the internal data pruning engine. |
| `ZIP_BUILD_FAILED` | `JSZip` Assembly Processing Loop | Aborts compilation routines, cleans memory buffer tracking queues, and alerts the UI with a notification pinpointing corrupted asset files. |
| `PROJECT_IMPORT_FAILED` | Project Archive Upload Pipeline | Halts file registration, runs an automatic roll-back transaction to preserve database integrity, and triggers a modal diagnosing the corrupted `project.json`. |

---

## 11. Performance Limits & Boundary Conditions

To maintain fluid UI interactions at 60 FPS and prevent tab crashes due to excessive browser memory consumption, the client application enforces strict system operational boundaries:

* **Maximum Target Input Paths (Max URL):** Restricts multi-URL batch operations to a maximum boundary of **20 URLs** per batch ingestion cycle.
* **Maximum Extracted Elements (Max Component/Project):** Caps project databases to a maximum threshold of **500 independent component** records.
* **Individual Resource Volume Limit (Max Asset/File):** Rejects any individual file asset exceeding a maximum ceiling of **15 MB** (e.g., heavy image formats or uncompressed web fonts).
* **Total Project Storage Caps (Max Project Size):** Limits total project storage allocation within IndexedDB to **150 MB** before restricting additional data persistence.
* **Max Concurrent Downloads:** Restricts parallel background network operations to a maximum of **5 concurrent connections** to adhere to browser rate limits.

---

## 12. Screen List & UI Architecture

The interface workspace consists of 11 core interactive layout spaces:

1. **Dashboard:** Top-level space summarizing user project history, storage quota monitors, and quick entry tools.
2. **Project Manager:** Control dashboard to create, delete, rename, export, or initialize re-import workflows.
3. **URL Import Panel:** Left control space managing URL ingestion inputs, batch queuing settings, and proxy parameters.
4. **HTML Upload Panel:** Alternative drag-and-drop workspace layout allowing manual markup and code clip injections.
5. **Sandbox Preview Canvas:** Main viewport tracking layout outputs in real-time inside an isolated, responsive iframe environment.
6. **Inspector Panel:** Right control list arranging identified component cards, supporting structure edits and batch operations access.
7. **Asset Manager UI:** Comprehensive panel visualizing local binary payloads and image maps (detailed specification below).
8. **Diff Viewer Screen:** Full screen panel tracing structural code adjustments side-by-side before file serialization.
9. **Export Modal:** Configuration pop-up framing export parameters, file directory naming options, and Safe Asset Mode switches.
10. **Settings:** Preferences control layout storing User-Defined Proxy paths, network download thresholds, and default workspace targets.
11. **Plugin Manager:** Interface configuration center displaying status, logs, updates, and toggle controls for custom parser extensions.

### 🖼️ Asset Manager UI Specifications

Displays local binary assets in a scalable Grid or List View with the following core layout features:

* **Visual Metadata Card:** Renders inline thumbnails for image binaries, alongside precise file sizing metrics, exact file MIME type tags, and local path mapping addresses (`localPath`).
* **Asset Delete Action:** Removes binary files from `wpx_assets` instantly. References within HTML layouts are automatically stripped or swapped with localized bounding boxes to preserve structural layouts.
* **Asset Replace Action:** Features a targeted drag-and-drop file target block. Dropping a replacement asset overrides the internal binary payload while locking the existing tracking file path (`localPath`) in place, updating all component references instantly without manual code editing.

---

## 13. Design Tokens & Layout Adaptability

The interface system leverages a specialized **Dark Mode Tech Studio** theme profile designed to reduce eye strain during prolonged development sessions and convey a precise, professional tool aesthetic.

### 🎨 Core Design System Tokens

| Token Name | Hex Code | System Assignment | Visual Application |
| --- | --- | --- | --- |
| **Canvas Background** | `#0D1117` | Root App Background | Deep background behind the main workspace layout layers |
| **Panel Surface** | `#21262D` | Structural Card Surface | Fills control sheets, contextual tool panes, sidebars, and cards |
| **Primary Accent** | `#8B5CF6` | Active Interactive State | Active triggers, focused inputs, checked state markers, and inspector borders |
| **Secondary Accent** | `#10B981` | Safe Analytics Tracker | Operational status loops, memory bars, and structural addition lines |
| **Alert / Target Accent** | `#EF4444` | Destructive Action / Diff Base | Destructive actions, cache purges, and structural deletions |
| **Main Typography** | `#C9D1D9` | High-Contrast Readability | Code fields, main content headers, form labels, and editor views |
| **Sub Typography** | `#8B949E` | Low-Contrast Metadata | Version strings, asset data labels, item counts, and status indicators |

### 🖥️ Desktop Grid Layout & Columns

On desktop viewports, the application utilizes a strict CSS Grid structure dividing space into a **3-Column Permanent Layout** to direct user workflow linearly from left to right:

1. **Left Panel (WPX Fixed Sidebar):** Houses the `Multiple Input URL` queue engine, the comprehensive **Search & Replace Engine**, the **Template Marketplace & Presets Node**, local IndexedDB quota graphs, and plugin configurations.
2. **Center Canvas (Interactive Sandbox Window):** Mounts the interactive preview environment powered by an **Isolated Iframe**. This area dynamically switches to display the **Dependency Graph Visualizer Node** when requested. Includes top-level controls for the **Responsive Device Toggle** and the **Diff Viewer Mode**.
3. **Right Panel (WPX Inspector Stream):** Displays discovered component cards stacked vertically, topped by the global **Batch Operations Controller**.
* **Highlight Sync Engine:** Hovering over any component card automatically triggers a smooth viewport scroll (**Auto-Scroll**) inside the sandbox view, framing the targeted element with a glowing border accent matching the primary token shade (`#8B5CF6`).

### 📱 Mobile UI Adaptability

* **Dimension A: Mobile View Preview Mode:** Managed via the Responsive Device Toggle in the center canvas header. Selecting the smartphone preset adjusts the interactive sandbox iframe to standard mobile device viewport criteria (**375px** to **412px** width).
* **Dimension B: Application UI Mobile Adaptation:** When the application workspace itself loads on a mobile viewport, the interface collapses the left sidebar and right inspector panes into hidden **Drawer Panels**. Users invoke these side sheets using touch sweep directions (**Swipe Gestures**) or by tapping a persistent navigation hamburger menu trigger.
* **One-Handed Navigation Dock:** Rearranges primary control actions into a consolidated, fixed bottom toolbar (**Bottom-Pinned Mobile Action Bar**). This ensures developers can execute core tasks—such as archiving projects (ZIP), swapping layout preview paradigms, or triggering Undo/Redo operations—efficiently with single-thumb inputs.

---

## 14. Implementation Roadmap & MVP Phasing Plan

To ensure organized delivery and prevent scope creep, development is prioritized across 5 distinct implementation phases:

```text
[Phase 1: Core Engine & ZIP] ──> [Phase 2: Local DB & Workspace] ──> [Phase 3: CSS Parser & Link Rewriter]
                                                                                      │
[Phase 5: Plugin & Marketplace] <── [Phase 4: Diff, Undo/Redo & Batch Tools] <────────┘

```

* **MVP Phase 1: Core Parsing & Basic Ingestion Core**
* *Scope:* Build URL Input UI elements and HTML Upload spaces. Construct the core DOM Parser module equipped with the 7 Heuristic Component Detection Rules. Implement basic project packaging and downloading powered by `JSZip` and `FileSaver.js`.

* **MVP Phase 2: Local Persistence & Project Workspace**
* *Scope:* Connect the local browser storage engine using `IndexedDB` across the 4 primary data schemas. Build the primary workspace layout templates, including the central Dashboard, Project Manager view, and the visual Asset Manager UI grid layout.

* **MVP Phase 3: Code Isolation & Link Transformation Architecture**
* *Scope:* Implement the `csstree AST Parser` pipeline to handle Advanced CSS Scoping. Deploy the Link Rewriter system to normalize relative and absolute paths, and implement the Script Handling Policy alongside Safe Asset Mode to secure iframe workflows.

* **MVP Phase 4: Advanced Workbench Utilities & Operational Tools**
* *Scope:* Build the split-screen code view engine (**Diff Viewer Screen**). Implement historical command tracking loops via the Enhanced Command Interface for multi-level Undo/Redo support. Deploy the **Project-Wide Search & Replace Engine**, the interactive **Dependency Graph**, and the **Batch Operations Subsystem**.

* **MVP Phase 5: Extensibility Layer & Global Eco-System**
* *Scope:* Expose the plugin registry infrastructure to hook custom parsers and export adapters via the Plugin System API. Connect the **Template Marketplace & Presets** UI interface to share custom components across local workspaces.

---

## 15. System Acceptance Criteria / Definition of Done

A development module is officially classified as complete and ready for industrial production environments when it satisfies all 5 acceptance conditions:

1. **Zero Server Computations for Code Processing:** Every data extraction task—including DOM tree segmentations, AST-driven style scoping transformations, internal path adjustments, database transaction commits, and ZIP compilation routines—must execute 100% on the client side inside the browser sandbox. The pipeline must never send user source code payloads to external cloud servers (proxies are limited strictly to bypassing cross-origin network constraints).
2. **100% Style Isolation Fidelity:** Isolated component building blocks extracted into the deployment package archive (ZIP) must render identically to their original source when loaded into blank external browser tabs or different host applications. Style rule leaking (Style Leaks) that breaks or compromises target layouts must be 0%.
3. **Strict Security Sanitization Loops:** All source inputs entering the ingestion stream must be cleaned via a multi-layered `DOMPurify` sanitizer loop to strip malicious script attachments, remove unverified event hooks, and prevent code execution vectors. The center preview canvas must operate strictly within browser sandboxed iframe structures.
4. **Transaction Data Integrity:** Global project mutations (e.g., *Project-Wide Search & Replace* or *Batch Operations*) must never compromise or corrupt source text parameters. The state management engine must follow strict Command Pattern protocols, letting users move backward and forward through multi-level history snapshots without destabilizing or breaking IndexedDB record states.
5. **Clean Asset Directory Packages:** The generated ZIP package produced by `JSZip` and `FileSaver.js` must adhere exactly to the defined target folder tree structure. Asset files must reside cleanly in designated subfolders, with internal path references completely rewritten so that extracted projects run immediately on local servers without broken resource errors or console trace failures.
