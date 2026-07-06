"use client";

import DOMPurify from "dompurify";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import { type ChangeEvent, type ReactNode, useMemo, useState } from "react";
import { applySafeAssetMode, buildDependencyGraph, createExportZip, defaultProject, deleteProject, detectComponents, fetchHtmlFromUrls, importProjectZip, listProjects, loadProject, MAX_ASSET_SIZE, MAX_COMPONENTS, MAX_CONCURRENT_DOWNLOADS, MAX_PROJECT_SIZE, mergeComponents, normalizeUrls, projectSize, replaceProject, rewriteLinks, sanitizeHtml, saveProject, scopeCss, searchProject, slug, snapshot, type DeviceMode, type IngestionMode, type WPXAsset, type WPXComponent, type WPXProject } from "@/lib/studio";

const phaseCards = [
  ["Phase 1", "Ingest URLs, paste/upload HTML, sanitize, detect components, preview, append/merge, export ZIP."],
  ["Phase 2", "IndexedDB vault, project manager, asset manager, save/load state, storage quota monitor."],
  ["Phase 3", "css-tree selector scoping, link rewriting, script blockade, safe asset mode, dependency graph."],
  ["Phase 4", "Diff viewer, undo/redo commands, search/replace, batch operations."],
  ["Phase 5", "Plugin registry interfaces, presets, marketplace placeholder, parser/exporter extension surface."],
];

export function StudioApp() {
  const [project, setProject] = useState<WPXProject>(defaultProject);
  const [projects, setProjects] = useState<WPXProject[]>([]);
  const [urlText, setUrlText] = useState("");
  const [htmlText, setHtmlText] = useState(sampleHtml);
  const [cssText, setCssText] = useState(sampleCss);
  const [mode, setMode] = useState<IngestionMode>("append");
  const [device, setDevice] = useState<DeviceMode>("desktop");
  const [status, setStatus] = useState("Ready. All source processing stays inside this browser tab.");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [query, setQuery] = useState("");
  const [replacement, setReplacement] = useState("");
  const [regex, setRegex] = useState(false);
  const [diff, setDiff] = useState<{ before: string; after: string; title: string } | null>(null);

  const selected = project.components.filter((component) => component.selected);
  const scopedCss = selected.map((component) => scopeCss(component.css, component.scopeId).css).join("\n");
  const previewHtml = selected.map((component) => project.safeAssetMode ? applySafeAssetMode(component.html) : component.html).join("\n");
  const matches = useMemo(() => searchProject(project, query, regex), [project, query, regex]);
  const bytes = projectSize(project);

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
  const doReplace = () => { const before = project.components.map((c) => c.html).join("\n"); const next = replaceProject(project, query, replacement, regex); const after = next.components.map((c) => c.html).join("\n"); setDiff({ before, after, title: `Replace ${query}` }); updateProject({ components: next.components }, "Search and replace"); };
  const persist = async () => { await saveProject(project); setProjects(await listProjects()); setStatus("Saved to IndexedDB object stores: projects, structures, stylesheets, assets."); };
  const exportZip = async () => { const blob = await createExportZip(project); saveAs(blob, `${slug(project.name)}.zip`); setStatus("ZIP package generated client-side with JSZip and FileSaver.js."); };

  return <main className="min-h-screen bg-[#0D1117] text-[#C9D1D9]">
    <header className="border-b border-white/10 bg-[#0D1117]/95 px-5 py-4 backdrop-blur"><div className="mx-auto flex max-w-[1800px] flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.4em] text-[#10B981]">WHISPERX | STUDIO</p><h1 className="text-2xl font-black text-white">Offline Browser Engine</h1></div><div className="flex flex-wrap gap-2 text-xs">{["No API Routes", "No Server Actions", "Client-side DOM", "Client-side CSS", "Vercel Preview Ready"].map((pill) => <span className="rounded-full border border-[#8B5CF6]/40 bg-[#21262D] px-3 py-2" key={pill}>{pill}</span>)}</div></div></header>
    <div className="mx-auto grid max-w-[1800px] gap-4 p-4 lg:grid-cols-[360px_minmax(0,1fr)_390px]">
      <aside className="space-y-4 rounded-2xl border border-white/10 bg-[#21262D] p-4"><Nav active={activeTab} setActive={setActiveTab} /><Panel title="URL Import Panel"><textarea className="field h-24" value={urlText} onChange={(e) => setUrlText(e.target.value)} placeholder="https://example.com&#10;https://example.com/about" /><div className="mt-2 grid grid-cols-2 gap-2"><button onClick={ingestUrls} className="btn-primary">Fetch URLs</button><select className="field" value={mode} onChange={(e) => setMode(e.target.value as IngestionMode)}><option value="append">Append</option><option value="merge">Basic merge</option></select></div><input className="field mt-2" value={project.proxyUrl} onChange={(e) => updateProject({ proxyUrl: e.target.value }, "Set proxy")} placeholder="Optional raw proxy origin" /></Panel><Panel title="HTML Upload Panel"><textarea className="field h-48 font-mono text-xs" value={htmlText} onChange={(e) => setHtmlText(e.target.value)} /><input type="file" accept=".html,.htm,text/html" onChange={uploadHtml} className="mt-2 text-xs" /><textarea className="field mt-2 h-28 font-mono text-xs" value={cssText} onChange={(e) => setCssText(e.target.value)} /><button onClick={() => ingestHtml()} className="btn-primary mt-2 w-full">Detect Components</button></Panel><Panel title="Search & Replace"><input className="field" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Find text or regex" /><input className="field mt-2" value={replacement} onChange={(e) => setReplacement(e.target.value)} placeholder="Replacement" /><label className="mt-2 flex items-center gap-2 text-sm"><input type="checkbox" checked={regex} onChange={(e) => setRegex(e.target.checked)} /> Regex</label><p className="mt-2 text-xs text-[#8B949E]">Matches: {matches.length}</p><button onClick={doReplace} disabled={!query} className="btn-secondary mt-2 w-full">Preview Diff & Replace</button></Panel></aside>
      <section className="space-y-4"><div className="rounded-2xl border border-white/10 bg-[#21262D] p-4"><div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-xl font-bold text-white">Sandbox Preview Canvas</h2><p className="text-sm text-[#8B949E]">{status}</p></div><div className="flex flex-wrap gap-2"><button className="btn-ghost" onClick={undo}>Undo</button><button className="btn-ghost" onClick={redo}>Redo</button>{(["desktop", "tablet", "mobile"] as DeviceMode[]).map((item) => <button key={item} onClick={() => setDevice(item)} className={device === item ? "btn-primary" : "btn-ghost"}>{item}</button>)}<button className="btn-secondary" onClick={persist}>Save</button><button className="btn-primary" onClick={exportZip}>Export ZIP</button></div></div></div>{activeTab === "dashboard" && <Dashboard project={project} projects={projects} bytes={bytes} restoreProject={restoreProject} importZip={importZip} />}{activeTab === "assets" && <Assets project={project} uploadAsset={uploadAsset} updateProject={updateProject} />}{activeTab === "diff" && <Diff diff={diff} />}{activeTab === "graph" && <Graph project={project} />}{activeTab === "plugins" && <Plugins project={project} />}{activeTab === "dashboard" && <div className="rounded-2xl border border-white/10 bg-[#21262D] p-4"><div className="mx-auto transition-all" style={{ width: device === "desktop" ? "100%" : device === "tablet" ? 768 : 390 }}><iframe title="WPX sandbox preview" sandbox={selected.some((component) => component.scriptsEnabled) ? "allow-scripts" : ""} className="h-[620px] w-full rounded-xl border border-[#8B5CF6]/40 bg-white" srcDoc={`<!doctype html><html><head><style>${scopedCss}</style></head><body>${previewHtml || "<main style='font-family:sans-serif;padding:32px'>Import HTML to preview components.</main>"}</body></html>`} /></div></div>}</section>
      <aside className="space-y-4 rounded-2xl border border-white/10 bg-[#21262D] p-4"><Panel title="Inspector Panel"><div className="mb-3 grid grid-cols-3 gap-2"><button className="btn-ghost" onClick={() => batchSelect("all")}>All</button><button className="btn-ghost" onClick={() => batchSelect("none")}>None</button><button className="btn-danger" onClick={batchRemoveTrackers}>Scripts</button></div><div className="space-y-3">{project.components.map((component) => <ComponentCard key={component.id} component={component} toggle={() => toggleComponent(component.id)} remove={() => removeComponent(component.id)} />)}</div></Panel><Panel title="Settings"><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={project.safeAssetMode} onChange={(e) => updateProject({ safeAssetMode: e.target.checked }, "Toggle safe asset mode")} /> Safe Asset Mode</label><input className="field mt-2" value={project.name} onChange={(e) => updateProject({ name: e.target.value }, "Rename project")} /><button className="btn-danger mt-2 w-full" onClick={async () => { await deleteProject(project.id); setProjects(await listProjects()); }}>Delete IndexedDB Project</button></Panel></aside>
    </div>
  </main>;
}

function Nav({ active, setActive }: { active: string; setActive: (tab: string) => void }) { return <div className="grid grid-cols-2 gap-2">{[["dashboard", "Dashboard"], ["assets", "Assets"], ["diff", "Diff"], ["graph", "Graph"], ["plugins", "Plugins"]].map(([id, label]) => <button key={id} onClick={() => setActive(id)} className={active === id ? "btn-primary" : "btn-ghost"}>{label}</button>)}</div>; }
function Panel({ title, children }: { title: string; children: ReactNode }) { return <section><h2 className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#8B949E]">{title}</h2>{children}</section>; }
function Dashboard({ project, projects, bytes, restoreProject, importZip }: { project: WPXProject; projects: WPXProject[]; bytes: number; restoreProject: (id: string) => void; importZip: (event: ChangeEvent<HTMLInputElement>) => void }) { return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">{phaseCards.map(([title, body]) => <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} key={title} className="rounded-2xl border border-white/10 bg-[#21262D] p-4"><h3 className="font-bold text-white">{title}</h3><p className="mt-2 text-sm text-[#8B949E]">{body}</p></motion.div>)}<div className="rounded-2xl border border-white/10 bg-[#21262D] p-4 md:col-span-2 xl:col-span-5"><h3 className="font-bold text-white">Project Manager & Quota</h3><p className="text-sm text-[#8B949E]">Components {project.components.length}/{MAX_COMPONENTS} · Assets {project.assets.length} · Stored projects {projects.length} · Estimated size {(bytes / 1024).toFixed(1)} KB / {(MAX_PROJECT_SIZE / 1024 / 1024).toFixed(0)} MB</p><div className="mt-3 h-2 rounded-full bg-black/40"><div className="h-2 rounded-full bg-[#10B981]" style={{ width: `${Math.min(100, (bytes / MAX_PROJECT_SIZE) * 100)}%` }} /></div><div className="mt-3 flex flex-wrap gap-2"><input type="file" accept=".zip,application/zip" onChange={importZip} className="text-xs" />{projects.map((saved) => <button key={saved.id} className="btn-ghost" onClick={() => restoreProject(saved.id)}>Restore {saved.name}</button>)}</div></div></div>; }
function ComponentCard({ component, toggle, remove }: { component: WPXComponent; toggle: () => void; remove: () => void }) { return <article className="rounded-xl border border-white/10 bg-[#0D1117] p-3"><div className="flex items-start justify-between gap-2"><label className="flex items-center gap-2"><input type="checkbox" checked={component.selected} onChange={toggle} /><span className="font-bold text-white">{component.type}</span></label><button onClick={remove} className="text-[#EF4444]">Remove</button></div><p className="mt-2 text-xs text-[#8B949E]">{component.scopeId} · v{component.version} · Scripts {component.scriptsEnabled ? "enabled" : "blocked"}</p><pre className="mt-2 max-h-28 overflow-auto rounded bg-black/30 p-2 text-[10px]">{component.html}</pre></article>; }
function Assets({ project, uploadAsset, updateProject }: { project: WPXProject; uploadAsset: (event: ChangeEvent<HTMLInputElement>) => void; updateProject: (patch: Partial<WPXProject>, label?: string) => void }) { return <div className="rounded-2xl border border-white/10 bg-[#21262D] p-4"><h2 className="font-bold text-white">Asset Manager UI</h2><input type="file" onChange={uploadAsset} className="mt-3" /><div className="mt-4 grid gap-3 md:grid-cols-3">{project.assets.map((asset) => <div key={asset.id} className="rounded-xl border border-white/10 bg-[#0D1117] p-3">{asset.previewUrl ? <div aria-label="asset preview" role="img" className="h-24 w-full rounded bg-cover bg-center" style={{ backgroundImage: `url(${asset.previewUrl})` }} /> : <div className="grid h-24 place-items-center rounded bg-black/30 text-xs">No thumbnail</div>}<p className="mt-2 break-all text-xs text-white">{asset.localPath}</p><p className="text-xs text-[#8B949E]">{asset.mimeType} · {(asset.size / 1024).toFixed(1)} KB</p><button className="btn-danger mt-2" onClick={() => updateProject({ assets: project.assets.filter((item) => item.id !== asset.id) }, "Delete asset")}>Delete</button></div>)}</div></div>; }
function Diff({ diff }: { diff: { before: string; after: string; title: string } | null }) { return <div className="rounded-2xl border border-white/10 bg-[#21262D] p-4"><h2 className="font-bold text-white">Diff Viewer Screen</h2><p className="text-sm text-[#8B949E]">{diff?.title ?? "Run search and replace to create a diff."}</p><div className="mt-4 grid gap-4 md:grid-cols-2"><pre className="max-h-[600px] overflow-auto rounded-xl border border-[#EF4444]/30 bg-black/40 p-3 text-xs">{diff?.before}</pre><pre className="max-h-[600px] overflow-auto rounded-xl border border-[#10B981]/30 bg-black/40 p-3 text-xs">{diff?.after}</pre></div></div>; }
function Graph({ project }: { project: WPXProject }) { return <div className="rounded-2xl border border-white/10 bg-[#21262D] p-4"><h2 className="font-bold text-white">Dependency Graph</h2><div className="mt-4 space-y-2">{project.dependencyEdges.map((edge, index) => <p key={`${edge.from}-${edge.to}-${index}`} className="rounded bg-[#0D1117] p-2 text-sm"><span className="text-[#8B5CF6]">{edge.from}</span> → <span className="text-[#10B981]">{edge.to}</span> · {edge.type} · {edge.label}</p>)}</div></div>; }
function Plugins({ project }: { project: WPXProject }) { return <div className="rounded-2xl border border-white/10 bg-[#21262D] p-4"><h2 className="font-bold text-white">Plugin Manager & Marketplace Placeholder</h2><p className="text-sm text-[#8B949E]">Phase 5 exposes parser/exporter interfaces and local preset slots without loading untrusted remote code.</p><div className="mt-4 grid gap-3 md:grid-cols-2">{project.plugins.map((plugin) => <div key={plugin.id} className="rounded-xl border border-white/10 bg-[#0D1117] p-3"><p className="font-bold text-white">{plugin.name}</p><p className="text-xs text-[#8B949E]">{plugin.type} · v{plugin.version} · {plugin.status}</p></div>)}</div></div>; }

const sampleHtml = `<header class="site-header"><nav>WPX Navigation</nav></header><section class="hero"><h1>Client-side component studio</h1><p>Paste, sanitize, isolate, preview, and export.</p><img src="https://example.com/hero.jpg" alt="Hero"></section><section class="pricing"><h2>Pricing</h2><p>Package table content.</p></section><footer class="site-footer">Footer content</footer>`;
const sampleCss = `.site-header{padding:24px;background:#111827;color:white}.hero{padding:64px;background:#312e81;color:white}.hero h1{font-size:48px}.pricing{padding:40px;background:#f8fafc;color:#111827}.site-footer{padding:24px;background:#020617;color:white}`;
