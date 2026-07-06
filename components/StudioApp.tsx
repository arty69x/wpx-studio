"use client";

import DOMPurify from "dompurify";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { createExportZip, defaultProject, loadProject, saveProject, type StudioProject, validateCss } from "@/lib/studio";

export function StudioApp() {
  const [project, setProject] = useState<StudioProject>(defaultProject);
  const [status, setStatus] = useState("Ready");

  useEffect(() => {
    loadProject().then((stored) => {
      if (stored) setProject(stored);
    });
  }, []);

  const sanitizedHtml = useMemo(() => DOMPurify.sanitize(project.html, { USE_PROFILES: { html: true } }), [project.html]);
  const cssStatus = useMemo(() => validateCss(project.css), [project.css]);

  const updateProject = (patch: Partial<StudioProject>) => {
    setProject((current) => ({ ...current, ...patch, updatedAt: new Date().toISOString() }));
  };

  const handleSave = async () => {
    await saveProject(project);
    setStatus("Saved locally in IndexedDB.");
  };

  const handleExport = async () => {
    const blob = await createExportZip(project, sanitizedHtml);
    saveAs(blob, `${project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "wpx-export"}.zip`);
    setStatus("ZIP export generated in browser.");
  };

  return (
    <main className="min-h-screen px-6 py-8 text-slate-100 md:px-10">
      <motion.header initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">WHISPERX | STUDIO</p>
        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-bold md:text-6xl">Client-side WordPress package studio.</h1>
            <p className="mt-4 max-w-2xl text-slate-300">MVP Phase 1 provides a local-only HTML/CSS workspace with sanitization, CSS validation, IndexedDB persistence, and ZIP export.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-slate-200 shadow-2xl backdrop-blur">
            <p>No API routes</p><p>No Server Actions</p><p>No backend processing</p>
          </div>
        </div>
      </motion.header>

      <section className="mx-auto mt-8 grid max-w-6xl gap-6 lg:grid-cols-[1fr_1fr]">
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-2xl">
          <label className="block text-sm font-medium text-slate-300">Project name</label>
          <input className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan-300" value={project.name} onChange={(event) => updateProject({ name: event.target.value })} />
          <label className="block text-sm font-medium text-slate-300">HTML</label>
          <textarea className="h-56 w-full rounded-xl border border-white/10 bg-white/5 p-4 font-mono text-sm outline-none focus:border-cyan-300" value={project.html} onChange={(event) => updateProject({ html: event.target.value })} />
          <label className="block text-sm font-medium text-slate-300">CSS</label>
          <textarea className="h-56 w-full rounded-xl border border-white/10 bg-white/5 p-4 font-mono text-sm outline-none focus:border-cyan-300" value={project.css} onChange={(event) => updateProject({ css: event.target.value })} />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="space-y-4 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur">
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-cyan-300 px-5 py-3 font-semibold text-slate-950" onClick={handleSave}>Save locally</button>
            <button className="rounded-full bg-violet-500 px-5 py-3 font-semibold text-white" onClick={handleExport}>Export ZIP</button>
          </div>
          <p className="text-sm text-slate-300">{status}</p>
          <p className={cssStatus.ok ? "text-sm text-emerald-300" : "text-sm text-rose-300"}>{cssStatus.message}</p>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white">
            <style>{project.css}</style>
            <div className="p-6 text-slate-950" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
          </div>
          <details className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
            <summary className="cursor-pointer font-semibold">Sanitized HTML preview</summary>
            <pre className="mt-3 overflow-auto whitespace-pre-wrap text-xs text-slate-300">{sanitizedHtml}</pre>
          </details>
        </motion.div>
      </section>
    </main>
  );
}
