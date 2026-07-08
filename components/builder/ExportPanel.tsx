'use client';

import { saveAs } from 'file-saver';
import { validateDomProject } from '@/lib/wpx/dom/validation';
import type { WPXDomNode, WPXDomProject } from '@/lib/wpx/dom/types';

const countNodes = (node: WPXDomNode): number => 1 + node.children.reduce((sum, child) => sum + countNodes(child), 0);

type Props = { project: WPXDomProject };

export function ExportPanel({ project }: Props) {
  const report = validateDomProject(project);
  const nodeCount = project.pages.reduce((sum, page) => sum + countNodes(page.root), 0);
  return <section className="rounded-[18px] border border-[var(--border)] bg-black/35 p-4">
    <h2 className="text-xs font-black uppercase tracking-[.16em]">DOM Export Readiness</h2>
    <div className="mt-3 grid gap-2 text-sm">
      <p>Nodes: <b>{nodeCount}</b></p>
      <p>Pages: <b>{project.pages.length}</b></p>
      <p>Selected: <b>{project.selectedNodeId ?? 'none'}</b></p>
      <p>Safe asset mode: <b>{project.safeAssetMode ? 'on' : 'off'}</b></p>
      <p>Status: <b className={report.status === 'pass' ? 'text-[var(--lime)]' : 'text-[var(--pink)]'}>{report.status}</b></p>
    </div>
    <button className="control mt-3" onClick={() => saveAs(new Blob([JSON.stringify({ project, report }, null, 2)], { type: 'application/json' }), 'wpx-dom-export-preview.json')}>Download DOM JSON</button>
  </section>;
}
