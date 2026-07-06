"use client";

import DOMPurify from "dompurify";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import { type ChangeEvent, type ReactNode, useMemo, useState } from "react";
import { applySafeAssetMode, buildDependencyGraph, createExportZip, defaultProject, deleteProject, detectComponents, fetchHtmlFromUrls, importProjectZip, listProjects, loadProject, MAX_ASSET_SIZE, MAX_COMPONENTS, MAX_CONCURRENT_DOWNLOADS, MAX_PROJECT_SIZE, mergeComponents, normalizeUrls, projectSize, replaceProject, rewriteLinks, sanitizeHtml, saveProject, scopeCss, searchProject, slug, snapshot, type DeviceMode, type IngestionMode, type WPXAsset, type WPXComponent, type WPXProject } from "@/lib/studio";

const libraryCategories = ["Backgrounds", "Buttons", "Sections", "Layout", "Utilities", "Data", "Forms"];
const commandItems = [
  ["New Project", "⌘N"],
  ["Import from URL", "⌘I"],
  ["Paste HTML", "⌘V"],
  ["Export Project", "⌘E"],
];
const inspectorTabs = ["Layout", "Style", "Animation", "Interaction", "Code"];
const canonicalNodes = ["Header & Navigation", "Hero Section", "About Us", "Our Work / Portfolio Grid", "Our Services", "Process / How We Work", "Testimonials", "Pricing Table", "FAQs Accordion", "Footer"];
const previewSections = ["Header & Navigation", "Hero Section", "About Us", "Portfolio Grid", "Services", "Process", "Testimonials", "Pricing", "FAQs", "Footer"];

export function StudioApp() {
  const [project, setProject] = useState<WPXProject>(defaultProject);
  const [projects, setProjects] = useState<WPXProject[]>([]);
  const [urlText, setUrlText] = useState("");
  const [htmlText, setHtmlText] = useState(sampleHtml);
  const [cssText, setCssText] = useState(sampleCss);
  const [mode, setMode] = useState<IngestionMode>("append");
  const [device, setDevice] = useState<DeviceMode>("desktop");
  const [status, setStatus] = useState("Ready. All source processing stays inside this browser tab.");
  const [query, setQuery] = useState("");
  const [replacement, setReplacement] = useState("");
  const [regex, setRegex] = useState(false);
  const [diff, setDiff] = useState<{ before: string; after: string; title: string } | null>(null);
  const [hoveredNode, setHoveredNode] = useState(1);
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const selected = project.components.filter((component) => component.selected);
  const scopedCss = selected.map((component) => scopeCss(component.css, component.scopeId).css).join("\n");
  const previewHtml = selected.map((component) => project.safeAssetMode ? applySafeAssetMode(component.html) : component.html).join("\n");
  const matches = useMemo(() => searchProject(project, query, regex), [project, query, regex]);
  const bytes = projectSize(project);
  const storagePct = Math.min(100, (bytes / MAX_PROJECT_SIZE) * 100);

  const updateProject = (patch: Partial<WPXProject>, label = "Update project") => {
    setProject((current) => ({ ...current, commandHistory: [...current.commandHistory.slice(-19), snapshot(label, current)], redoStack: [], ...patch, updatedAt: Date.now() }));
  };

  const ingestHtml = (source = "Manual HTML") => {
    const clean = sanitizeHtml(DOMPurify, htmlText);
    const rewritten = rewriteLinks(clean, project.sourceUrls[0]);
    const incoming = detectComponents(rewritten.html, project.id, source, cssText);
    const assets = rewritten.assets.map((asset) => ({ ...asset, projectId: project.id }));
    const components = mergeComponents(project.components, incoming, mode);
    updateProject({ components, assets: [...project.assets, ...assets], stylesheets: components.map((component) => ({ id: `${component.id}-css`, projectId: project.id, structureId: component.id, scopeId: component.scopeId, rawCss: component.css, scopedCss: scopeCss(component.css, component.scopeId).css, version: component.version })), dependencyEdges: buildDependencyGraph(components, [...project.assets, ...assets]) }, `Ingest ${source}`);
    setStatus(`Detected ${incoming.length} sanitized components from ${source}.`);
  };

  const ingestUrls = async () => {
    const { urls, rejected } = normalizeUrls(urlText);
    if (!urls.length) { setStatus(`No valid HTTPS URLs. Rejected: ${rejected.join(", ") || "none"}`); return; }
    setStatus(`Fetching ${urls.length} URL(s) in browser with ${MAX_CONCURRENT_DOWNLOADS} concurrent workers...`);
    const results = await fetchHtmlFromUrls(urls, project.proxyUrl);
    const ok = results.filter((result) => result.html);
    const combined = ok.map((result) => `<!-- Source: ${result.url} -->\n${result.html}`).join("\n");
    setHtmlText(combined);
    updateProject({ sourceUrls: Array.from(new Set([...project.sourceUrls, ...urls])) }, "Normalize URL queue");
    setStatus(`Fetched ${ok.length}/${urls.length}. CORS failures can use the raw retrieval proxy contract or manual paste.`);
  };

  const uploadHtml = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setHtmlText(await file.text());
    setStatus(`Loaded ${file.name} locally. Click Detect Components to parse.`);
  };

  const importZip = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try { const imported = await importProjectZip(file); setProject(imported); setProjects(await listProjects()); setStatus(`Imported ${file.name} and restored project.json into IndexedDB.`); } catch (error) { setStatus(error instanceof Error ? error.message : "PROJECT_IMPORT_FAILED"); }
  };

  const restoreProject = async (id: string) => { const restored = await loadProject(id); if (restored) { setProject(restored); setStatus(`Restored ${restored.name} from IndexedDB.`); } };

  const uploadAsset = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_ASSET_SIZE) { setStatus(`Asset rejected: ${file.name} exceeds 15 MB.`); return; }
    const asset: WPXAsset = { id: crypto.randomUUID(), projectId: project.id, originalUrl: file.name, localPath: `assets/uploads/${file.name}`, mimeType: file.type || "application/octet-stream", size: file.size, previewUrl: URL.createObjectURL(file) };
    updateProject({ assets: [...project.assets, asset], dependencyEdges: buildDependencyGraph(project.components, [...project.assets, asset]) }, "Add asset");
  };

  const toggleComponent = (id: string) => updateProject({ components: project.components.map((component) => component.id === id ? { ...component, selected: !component.selected } : component) }, "Toggle component");
  const removeComponent = (id: string) => updateProject({ components: project.components.filter((component) => component.id !== id) }, "Delete component");
  const batchSelect = (type: "all" | "none") => updateProject({ components: project.components.map((component) => ({ ...component, selected: type === "all" })) }, `Batch select ${type}`);
  const batchRemoveTrackers = () => updateProject({ components: project.components.map((component) => ({ ...component, html: component.html.replace(/<script[\s\S]*?<\/script>/gi, "") })) }, "Remove tracker scripts");
  const undo = () => { const last = project.commandHistory.at(-1); if (!last) return; setProject({ ...project, components: last.components, assets: last.assets, dependencyEdges: last.dependencyEdges, commandHistory: project.commandHistory.slice(0, -1), redoStack: [...project.redoStack, snapshot("Redo point", project)] }); };
  const redo = () => { const next = project.redoStack.at(-1); if (!next) return; setProject({ ...project, components: next.components, assets: next.assets, dependencyEdges: next.dependencyEdges, redoStack: project.redoStack.slice(0, -1), commandHistory: [...project.commandHistory, snapshot("Undo point", project)] }); };
  const doReplace = () => { const before = project.components.map((component) => component.html).join("\n"); const next = replaceProject(project, query, replacement, regex); const after = next.components.map((component) => component.html).join("\n"); setDiff({ before, after, title: `Replace ${query}` }); updateProject({ components: next.components }, "Search and replace"); };
  const persist = async () => { await saveProject(project); setProjects(await listProjects()); setStatus("Saved to IndexedDB object stores: projects, structures, stylesheets, assets."); };
  const exportZip = async () => { const blob = await createExportZip(project); saveAs(blob, `${slug(project.name)}.zip`); setToastVisible(true); setStatus("Export complete! Your project has been exported successfully."); window.setTimeout(() => setToastVisible(false), 4200); };
  const toggleBlueprintNode = (id: string) => setSelectedNodeIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  const nodeRows = canonicalNodes.map((label, index) => ({ id: `node-${index + 1}`, label, component: project.components[index] }));
  const selectedCount = selectedNodeIds.length + selected.length;

  return <main className="wpx-shell min-h-screen overflow-hidden bg-[var(--background)] pb-20 text-[var(--text-main)]">
    <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(204,255,0,0.14),transparent_24%),radial-gradient(circle_at_78%_18%,rgba(180,79,255,0.18),transparent_28%),linear-gradient(135deg,rgba(0,30,60,0.28),transparent_42%)]" />
    <div className="pointer-events-none fixed inset-0 opacity-[0.03] mix-blend-multiply [background-image:linear-gradient(45deg,#fff_1px,transparent_1px),linear-gradient(-45deg,#fff_1px,transparent_1px)] [background-size:7px_7px]" />

    <div className="relative mx-auto grid min-h-screen max-w-[1920px] gap-3 p-3 lg:grid-cols-[280px_minmax(0,1fr)_380px]">
      <LeftPanel project={project} projects={projects} urlText={urlText} htmlText={htmlText} cssText={cssText} mode={mode} query={query} replacement={replacement} regex={regex} matches={matches.length} setUrlText={setUrlText} setHtmlText={setHtmlText} setCssText={setCssText} setMode={setMode} setQuery={setQuery} setReplacement={setReplacement} setRegex={setRegex} ingestUrls={ingestUrls} ingestHtml={ingestHtml} uploadHtml={uploadHtml} importZip={importZip} restoreProject={restoreProject} doReplace={doReplace} exportZip={exportZip} />

      <section className="min-w-0 space-y-3">
        <TopToolbar project={project} status={status} device={device} setDevice={setDevice} undo={undo} redo={redo} persist={persist} exportZip={exportZip} />
        <CanvasPanel device={device} hoveredNode={hoveredNode} scopedCss={scopedCss} previewHtml={previewHtml} selected={selected} />
        <BottomWorkGrid project={project} uploadAsset={uploadAsset} updateProject={updateProject} diff={diff} storagePct={storagePct} />
      </section>

      <RightInspector nodeRows={nodeRows} selectedNodeIds={selectedNodeIds} hoveredNode={hoveredNode} setHoveredNode={setHoveredNode} toggleBlueprintNode={toggleBlueprintNode} toggleComponent={toggleComponent} removeComponent={removeComponent} batchSelect={batchSelect} batchRemoveTrackers={batchRemoveTrackers} project={project} />
    </div>

    <button className="glass-card fixed bottom-20 right-4 z-40 px-4 py-3 text-xs font-bold uppercase tracking-[0.24em] text-[var(--primary)] lg:hidden" onClick={() => setMobileSheetOpen(true)}>⌘ Menu</button>
    {mobileSheetOpen && <MobileSheet close={() => setMobileSheetOpen(false)} exportZip={exportZip} ingestHtml={ingestHtml} ingestUrls={ingestUrls} />}
    <ActionBar count={selectedCount} exportZip={exportZip} />
    <Toast visible={toastVisible} />
    <FooterBar />
  </main>;
}

function LeftPanel({ project, projects, urlText, htmlText, cssText, mode, query, replacement, regex, matches, setUrlText, setHtmlText, setCssText, setMode, setQuery, setReplacement, setRegex, ingestUrls, ingestHtml, uploadHtml, importZip, restoreProject, doReplace, exportZip }: { project: WPXProject; projects: WPXProject[]; urlText: string; htmlText: string; cssText: string; mode: IngestionMode; query: string; replacement: string; regex: boolean; matches: number; setUrlText: (value: string) => void; setHtmlText: (value: string) => void; setCssText: (value: string) => void; setMode: (value: IngestionMode) => void; setQuery: (value: string) => void; setReplacement: (value: string) => void; setRegex: (value: boolean) => void; ingestUrls: () => void; ingestHtml: () => void; uploadHtml: (event: ChangeEvent<HTMLInputElement>) => void; importZip: (event: ChangeEvent<HTMLInputElement>) => void; restoreProject: (id: string) => void; doReplace: () => void; exportZip: () => void }) {
  return <aside className="hidden min-h-0 space-y-3 lg:block">
    <section className="glass-card overflow-hidden p-4">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="font-syne text-xl font-extrabold tracking-[-0.04em] text-white">WPX <span className="text-[var(--primary)]">| STUDIO</span></p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.42em] text-[var(--neutral)]">Visual Engineering</p>
        </div>
        <GhostMascot />
      </div>
      <div className="mb-5">
        <h1 className="font-syne text-4xl font-extrabold leading-[0.86] tracking-[-0.08em] text-white">WP<span className="text-[var(--primary)]">X</span></h1>
        <p className="mt-4 font-syne text-3xl font-extrabold uppercase leading-[0.9]"><span className="text-[var(--primary)]">Extract.</span><br /><span className="text-[var(--accent)]">Compose.</span><br /><span className="text-[#0A84FF]">Ship.</span></p>
        <p className="mt-3 text-sm text-[var(--neutral)]">Reverse. Remix. Rebuild.</p>
      </div>
      <CodeBlock>{`const mascot = 'GhostSVG'\n// vector motion`}</CodeBlock>
    </section>

    <Panel title="Command Palette" action="⌘K">
      <div className="mb-3 rounded-[12px] border border-[var(--primary)]/40 bg-black/30 px-3 py-2 font-mono text-xs text-[var(--neutral)]">Search commands or trigger quick actions...</div>
      <div className="space-y-1">{commandItems.map(([label, shortcut]) => <button key={label} className="flex w-full items-center justify-between rounded-[12px] px-3 py-2 text-left text-sm text-white transition-all duration-300 ease-out hover:bg-[var(--primary)]/10 hover:text-[var(--primary)]" onClick={label === "Export Project" ? exportZip : undefined}><span>{label}</span><span className="font-mono text-[10px] text-[var(--neutral)]">{shortcut}</span></button>)}</div>
    </Panel>

    <Panel title="Library Tree" action="History">
      <details className="group" open><summary className="cursor-pointer list-none text-sm font-medium text-white">History</summary><div className="mt-2 space-y-2 border-l border-white/10 pl-3 text-xs text-[var(--neutral)]"><p>Autosaved workspace</p><p>{project.components.length} parsed components</p><p>{projects.length} vault projects</p></div></details>
      <details className="group mt-4" open><summary className="cursor-pointer list-none text-sm font-medium text-white">Gallery Categories</summary><div className="mt-2 grid gap-2">{libraryCategories.map((category, index) => <button key={category} className="flex items-center justify-between rounded-[12px] border border-white/10 bg-white/[0.02] px-3 py-2 text-xs uppercase tracking-[0.18em] text-[var(--neutral)] transition-all duration-300 ease-out hover:border-[var(--primary)]/60 hover:text-[var(--primary)]"><span>{category}</span><span className="font-mono">0{index + 1}</span></button>)}</div></details>
    </Panel>

    <Panel title="Ingestion Stack" action="Local">
      <textarea className="field h-20" value={urlText} onChange={(event) => setUrlText(event.target.value)} placeholder="https://example.com" />
      <div className="mt-2 grid grid-cols-2 gap-2"><button onClick={ingestUrls} className="btn-primary">Import URL</button><select className="field" value={mode} onChange={(event) => setMode(event.target.value as IngestionMode)}><option value="append">Append</option><option value="merge">Merge</option></select></div>
      <textarea className="field mt-2 h-24 font-mono text-[10px]" value={htmlText} onChange={(event) => setHtmlText(event.target.value)} />
      <input type="file" accept=".html,.htm,text/html" onChange={uploadHtml} className="mt-2 w-full text-xs text-[var(--neutral)]" />
      <textarea className="field mt-2 h-20 font-mono text-[10px]" value={cssText} onChange={(event) => setCssText(event.target.value)} />
      <button onClick={() => ingestHtml()} className="btn-secondary mt-2 w-full">Paste HTML</button>
      <input type="file" accept=".zip,application/zip" onChange={importZip} className="mt-3 w-full text-xs text-[var(--neutral)]" />
      <div className="mt-2 flex flex-wrap gap-2">{projects.map((saved) => <button key={saved.id} className="btn-ghost text-[10px]" onClick={() => restoreProject(saved.id)}>Restore {saved.name}</button>)}</div>
    </Panel>

    <Panel title="Search / Replace" action={`${matches} hits`}>
      <input className="field" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find text or regex" />
      <input className="field mt-2" value={replacement} onChange={(event) => setReplacement(event.target.value)} placeholder="Replacement" />
      <label className="mt-2 flex items-center gap-2 text-xs text-[var(--neutral)]"><input type="checkbox" checked={regex} onChange={(event) => setRegex(event.target.checked)} /> Regex</label>
      <button onClick={doReplace} disabled={!query} className="btn-primary mt-2 w-full">Preview Diff</button>
    </Panel>
  </aside>;
}

function TopToolbar({ project, status, device, setDevice, undo, redo, persist, exportZip }: { project: WPXProject; status: string; device: DeviceMode; setDevice: (device: DeviceMode) => void; undo: () => void; redo: () => void; persist: () => void; exportZip: () => void }) {
  return <header className="glass-card flex flex-wrap items-center justify-between gap-3 px-4 py-3">
    <div className="flex items-center gap-3"><p className="font-syne text-2xl font-extrabold tracking-[-0.08em] text-white">WP<span className="text-[var(--primary)]">X</span></p><select className="field max-w-[180px]" value={project.name} onChange={() => undefined}><option>{project.name}</option></select></div>
    <p className="max-w-xl truncate text-xs text-[var(--neutral)]">{status}</p>
    <div className="flex flex-wrap items-center gap-2">
      {(["desktop", "tablet", "mobile"] as DeviceMode[]).map((item) => <button key={item} onClick={() => setDevice(item)} className={device === item ? "btn-secondary" : "btn-ghost"}>{item}</button>)}
      <button className="btn-ghost" onClick={undo}>↶</button><button className="btn-ghost" onClick={redo}>↷</button><button className="btn-ghost" onClick={persist}>Save</button><button className="btn-primary" onClick={exportZip}>Export</button>
    </div>
  </header>;
}

function CanvasPanel({ device, hoveredNode, scopedCss, previewHtml, selected }: { device: DeviceMode; hoveredNode: number; scopedCss: string; previewHtml: string; selected: WPXComponent[] }) {
  const width = device === "desktop" ? "100%" : device === "tablet" ? 768 : 390;
  return <section className="glass-card relative min-h-[520px] overflow-hidden p-4">
    <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle,rgba(144,164,174,0.28)_1px,transparent_1px)] [background-size:18px_18px]" />
    <div className="relative mb-3 flex items-center justify-between gap-3"><div><p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--primary)]">Infinite Canvas</p><h2 className="font-syne text-3xl font-bold tracking-[-0.05em] text-white">Live Preview Sandbox</h2></div><div className="glass-card flex items-center gap-3 px-3 py-2 font-mono text-xs"><button>−</button><span>68%</span><button>＋</button></div></div>
    <div className="relative mx-auto transition-all duration-300 ease-out" style={{ width }}>
      <div className="absolute -inset-2 animate-pulse rounded-[18px] border border-[var(--creative)]/80 shadow-[0_0_36px_rgba(180,79,255,0.45)]" style={{ transform: `translateY(${Math.min(hoveredNode, 9) * 8}px)` }} />
      <iframe title="WPX sandbox preview" sandbox={selected.some((component) => component.scriptsEnabled) ? "allow-scripts" : ""} className="relative h-[440px] w-full rounded-[16px] border border-[var(--primary)]/50 bg-white shadow-[0_20px_40px_rgba(0,0,0,0.45)]" srcDoc={`<!doctype html><html><head><style>${scopedCss}</style></head><body>${previewHtml || previewTemplate}</body></html>`} />
    </div>
    <div className="relative mt-3 grid grid-cols-5 gap-2 md:grid-cols-10">{previewSections.map((section, index) => <button key={section} className={`rounded-[10px] border px-2 py-2 font-mono text-[10px] transition-all duration-300 ease-out ${hoveredNode === index + 1 ? "border-[var(--primary)] text-[var(--primary)]" : "border-white/10 text-[var(--neutral)]"}`}>{section}</button>)}</div>
  </section>;
}

function RightInspector({ nodeRows, selectedNodeIds, hoveredNode, setHoveredNode, toggleBlueprintNode, toggleComponent, removeComponent, batchSelect, batchRemoveTrackers, project }: { nodeRows: { id: string; label: string; component?: WPXComponent }[]; selectedNodeIds: string[]; hoveredNode: number; setHoveredNode: (index: number) => void; toggleBlueprintNode: (id: string) => void; toggleComponent: (id: string) => void; removeComponent: (id: string) => void; batchSelect: (type: "all" | "none") => void; batchRemoveTrackers: () => void; project: WPXProject }) {
  return <aside className="hidden min-h-0 space-y-3 lg:block">
    <Panel title="Inspector" action="Stream">
      <div className="mb-4 grid grid-cols-5 gap-1">{inspectorTabs.map((tab) => <button key={tab} className={`rounded-[10px] px-2 py-2 text-[10px] transition-all duration-300 ease-out ${tab === "Layout" ? "bg-[var(--primary)] text-black" : "bg-white/[0.03] text-[var(--neutral)] hover:text-white"}`}>{tab}</button>)}</div>
      <div className="mb-3 grid grid-cols-3 gap-2"><button className="btn-ghost" onClick={() => batchSelect("all")}>All</button><button className="btn-ghost" onClick={() => batchSelect("none")}>None</button><button className="btn-danger" onClick={batchRemoveTrackers}>Scripts</button></div>
      <div className="space-y-2">{nodeRows.map((row, index) => <NodeRow key={row.id} row={row} index={index + 1} selected={selectedNodeIds.includes(row.id) || Boolean(row.component?.selected)} active={hoveredNode === index + 1} onHover={() => setHoveredNode(index + 1)} onToggle={() => row.component ? toggleComponent(row.component.id) : toggleBlueprintNode(row.id)} onRemove={() => row.component && removeComponent(row.component.id)} />)}</div>
    </Panel>
    <Panel title="Settings" action="Safe">
      <p className="text-xs text-[var(--neutral)]">Safe Asset Mode: <span className="text-[var(--primary)]">{project.safeAssetMode ? "Enabled" : "Disabled"}</span></p>
      <p className="mt-2 text-xs text-[var(--neutral)]">Scripts execute only inside the sandbox when manually enabled.</p>
    </Panel>
  </aside>;
}

function NodeRow({ row, index, selected, active, onHover, onToggle, onRemove }: { row: { id: string; label: string; component?: WPXComponent }; index: number; selected: boolean; active: boolean; onHover: () => void; onToggle: () => void; onRemove: () => void }) {
  return <article onMouseEnter={onHover} className={`rounded-[16px] border p-3 transition-all duration-300 ease-out ${active ? "-translate-y-0.5 border-[var(--primary)]/80 shadow-[inset_0_0_24px_rgba(204,255,0,0.12)]" : "border-white/10 bg-white/[0.02]"}`}>
    <div className="flex items-start gap-3"><input type="checkbox" checked={selected} onChange={onToggle} className="mt-1 size-4 accent-[var(--primary)]" /><div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><h3 className="truncate text-sm font-medium text-white">{row.label}</h3><span className="font-mono text-[10px] text-[var(--neutral)]">{String(index).padStart(2, "0")}</span></div><p className="mt-1 truncate font-mono text-[10px] text-[var(--neutral)]">{row.component?.scopeId ?? `# wpx-blueprint-${index}`}</p></div></div>
    {row.component && <button onClick={onRemove} className="mt-2 text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">Delete node</button>}
  </article>;
}

function BottomWorkGrid({ project, uploadAsset, updateProject, diff, storagePct }: { project: WPXProject; uploadAsset: (event: ChangeEvent<HTMLInputElement>) => void; updateProject: (patch: Partial<WPXProject>, label?: string) => void; diff: { before: string; after: string; title: string } | null; storagePct: number }) {
  return <div className="grid gap-3 xl:grid-cols-[1fr_1fr_1fr]">
    <Panel title="Components" action={`${project.components.length}/${MAX_COMPONENTS}`}><div className="space-y-2">{project.components.slice(0, 4).map((component) => <div key={component.id} className="rounded-[12px] border border-white/10 bg-black/20 p-2 text-xs text-white">{component.type} · v{component.version}</div>)}{!project.components.length && <p className="text-sm text-[var(--neutral)]">Paste HTML to populate detected components.</p>}</div></Panel>
    <Panel title="Assets" action={`${project.assets.length}`}><input type="file" onChange={uploadAsset} className="mb-3 text-xs text-[var(--neutral)]" /><div className="grid grid-cols-3 gap-2">{project.assets.slice(0, 6).map((asset) => <div key={asset.id} className="rounded-[12px] border border-white/10 bg-black/20 p-2"><div aria-label="asset preview" role="img" className="h-12 rounded-[8px] bg-cover bg-center" style={{ backgroundImage: asset.previewUrl ? `url(${asset.previewUrl})` : "linear-gradient(135deg,#001E3C,#B44FFF)" }} /><p className="mt-1 truncate font-mono text-[9px] text-[var(--neutral)]">{asset.localPath}</p><button className="text-[9px] text-[var(--accent)]" onClick={() => updateProject({ assets: project.assets.filter((item) => item.id !== asset.id) }, "Delete asset")}>Delete</button></div>)}</div></Panel>
    <Panel title="Performance Monitor" action="120 FPS"><PerformanceGraph /><div className="mt-3 grid grid-cols-4 gap-2 font-mono text-[10px]"><Metric label="FPS" value="120" /><Metric label="Frame" value="8.3 ms" /><Metric label="Memory" value="152 MB" /><Metric label="IndexedDB" value="OK" /></div><div className="mt-3 h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-[var(--primary)]" style={{ width: `${storagePct}%` }} /></div></Panel>
    <Panel title="Diff Viewer" action={diff?.title ?? "Idle"}><div className="grid gap-2 md:grid-cols-2"><pre className="max-h-36 overflow-auto rounded-[12px] border border-[var(--accent)]/30 bg-black/30 p-2 text-[10px]">{diff?.before ?? "No diff generated."}</pre><pre className="max-h-36 overflow-auto rounded-[12px] border border-[var(--primary)]/30 bg-black/30 p-2 text-[10px]">{diff?.after ?? "Run search/replace."}</pre></div></Panel>
  </div>;
}

function Panel({ title, action, children }: { title: string; action?: string; children: ReactNode }) { return <section className="glass-card p-4"><div className="mb-3 flex items-center justify-between gap-3"><h2 className="font-mono text-[10px] uppercase tracking-[0.28em] text-white">{title}</h2>{action && <span className="rounded-full border border-white/10 px-2 py-1 font-mono text-[10px] text-[var(--primary)]">{action}</span>}</div>{children}</section>; }
function Metric({ label, value }: { label: string; value: string }) { return <div><p className="text-[var(--neutral)]">{label}</p><p className="text-[var(--primary)]">{value}</p></div>; }
function CodeBlock({ children }: { children: ReactNode }) { return <pre className="rounded-[12px] border border-white/10 bg-black/30 p-3 font-mono text-xs text-[var(--neutral)]"><code>{children}</code></pre>; }
function GhostMascot() { return <div className="grid size-14 place-items-center rounded-full border border-[var(--primary)]/40 bg-[radial-gradient(circle,#0A84FF,transparent_62%)] text-2xl shadow-[0_0_28px_rgba(10,132,255,0.45)]">◖◗</div>; }
function PerformanceGraph() { return <svg viewBox="0 0 360 120" className="h-28 w-full overflow-visible"><defs><linearGradient id="wpxGraph" x1="0" x2="1"><stop stopColor="#CCFF00" /><stop offset="0.5" stopColor="#B44FFF" /><stop offset="1" stopColor="#FF2D78" /></linearGradient></defs><path d="M0 88 L30 76 L60 82 L90 58 L120 66 L150 48 L180 72 L210 54 L240 62 L270 38 L300 50 L330 44 L360 26" fill="none" stroke="url(#wpxGraph)" strokeWidth="4" strokeLinecap="round"><animate attributeName="stroke-dasharray" values="0 500;500 0" dur="2.8s" repeatCount="indefinite" /></path><path d="M0 88 L30 76 L60 82 L90 58 L120 66 L150 48 L180 72 L210 54 L240 62 L270 38 L300 50 L330 44 L360 26 L360 120 L0 120Z" fill="rgba(204,255,0,0.08)" /></svg>; }
function ActionBar({ count, exportZip }: { count: number; exportZip: () => void }) { return <div className={`fixed left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-[16px] border border-[var(--primary)]/50 bg-black/80 px-5 py-3 shadow-[0_20px_40px_rgba(0,0,0,0.45)] backdrop-blur-[24px] transition-all duration-300 ease-out ${count > 0 ? "bottom-12 opacity-100" : "-bottom-24 opacity-0"}`} style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}><p className="font-mono text-sm text-white">WPX Selected: <span className="text-[var(--primary)]">{count}</span> Components</p><button className="btn-primary" onClick={exportZip}>Bulk Export</button></div>; }
function Toast({ visible }: { visible: boolean }) { return <div className={`fixed right-5 top-5 z-50 w-80 rounded-[16px] border border-[var(--primary)]/50 bg-black/80 p-4 shadow-[0_20px_40px_rgba(0,0,0,0.45)] backdrop-blur-[24px] transition-all duration-300 ease-out ${visible ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0 pointer-events-none"}`}><p className="font-bold text-white">Export complete!</p><p className="mt-1 text-sm text-[var(--neutral)]">Your project has been exported successfully.</p><div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full animate-[wpx-progress_3s_ease-out_forwards] bg-[var(--primary)]" /></div></div>; }
function FooterBar() { return <footer className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between border-t border-white/10 bg-black/70 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.32em] text-[var(--neutral)] backdrop-blur-[24px]"><span className="font-syne text-lg font-extrabold tracking-[-0.06em] text-white">WP<span className="text-[var(--primary)]">X</span> STUDIO</span><span>Storage 24 GB / 100 GB</span><span>Workers 3 Active</span><span>Autosaved 1h ago</span></footer>; }
function MobileSheet({ close, exportZip, ingestHtml, ingestUrls }: { close: () => void; exportZip: () => void; ingestHtml: () => void; ingestUrls: () => void }) { return <div className="fixed inset-0 z-50 bg-black/60 lg:hidden" onClick={close}><motion.div initial={{ y: 260, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="absolute inset-x-3 bottom-3 rounded-[16px] border border-white/10 bg-[var(--surface)] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.45)] backdrop-blur-[24px]" onClick={(event) => event.stopPropagation()}><div className="mb-4 h-1 w-12 rounded-full bg-white/20 mx-auto" /><div className="grid gap-2"><button className="btn-primary" onClick={ingestUrls}>Import from URL ⌘I</button><button className="btn-secondary" onClick={() => ingestHtml()}>Paste HTML ⌘V</button><button className="btn-ghost" onClick={exportZip}>Export Project ⌘E</button><button className="btn-danger" onClick={close}>Close</button></div></motion.div></div>; }

const previewTemplate = `<main style="min-height:100%;background:#05080D;color:white;font-family:DM Sans,system-ui;padding:32px"><nav style="display:flex;justify-content:space-between;align-items:center"><strong style="font-size:28px">acme.</strong><span>Product&nbsp;&nbsp;Features&nbsp;&nbsp;Pricing</span><button style="background:#CCFF00;border:0;border-radius:10px;padding:10px 14px;font-weight:700">Get Started</button></nav><section style="padding:64px 0"><h1 style="font-size:64px;line-height:.9;margin:0">Build stunning<br/>websites <span style="color:#0A84FF">faster</span></h1><p style="max-width:520px;color:#90A4AE">The modern web development platform for teams who ship production-ready websites.</p></section><section style="display:grid;gap:16px;grid-template-columns:repeat(3,1fr)"><div style="border:1px solid #CCFF00;padding:24px;border-radius:16px">Features</div><div style="border:1px solid #B44FFF;padding:24px;border-radius:16px">Pricing</div><div style="border:1px solid #FF2D78;padding:24px;border-radius:16px">Footer</div></section></main>`;
const sampleHtml = `<header class="site-header"><nav>WPX Navigation</nav></header><section class="hero"><h1>Client-side component studio</h1><p>Paste, sanitize, isolate, preview, and export.</p><img src="https://example.com/hero.jpg" alt="Hero"></section><section class="pricing"><h2>Pricing</h2><p>Package table content.</p></section><footer class="site-footer">Footer content</footer>`;
const sampleCss = `.site-header{padding:24px;background:#111827;color:white}.hero{padding:64px;background:#312e81;color:white}.hero h1{font-size:48px}.pricing{padding:40px;background:#f8fafc;color:#111827}.site-footer{padding:24px;background:#020617;color:white}`;
