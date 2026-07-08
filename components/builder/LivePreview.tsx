'use client';

import { flushSync } from 'react-dom';
import { renderNode } from '@/lib/wpx/dom/renderer';
import type { WPXDomProject } from '@/lib/wpx/dom/types';

const width = { desktop: '100%', tablet: '820px', mobile: '390px' } as const;

type Props = { project: WPXDomProject; onSelect: (nodeId: string) => void };

export function LivePreview({ project, onSelect }: Props) {
  const page = project.pages.find((item) => item.id === project.activePageId) ?? project.pages[0];
  return <section className="rounded-[18px] border border-[var(--borderStrong)] bg-black/40 p-3">
    <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[.16em] text-[var(--muted)]">
      <span>Live JSON Preview · {project.previewMode}</span>
      <span>{project.themeMode} · motion {project.motionEnabled ? 'on' : 'off'}</span>
    </div>
    <div className="overflow-auto rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4" data-theme={project.themeMode}>
      <div className="mx-auto transition-all" style={{ width: width[project.previewMode], maxWidth: '100%' }}>
        {renderNode(page.root, { project, selectedNodeId: project.selectedNodeId, onSelect: (nodeId) => flushSync(() => onSelect(nodeId)) })}
      </div>
    </div>
  </section>;
}
