'use client';

import { useMemo, useState } from 'react';
import { addNode, findNodeById, getActiveRoot } from '@/lib/wpx/dom/actions';
import { createHeroNode, createSectionNode } from '@/lib/wpx/dom/defaults';
import { useDomProjectStore } from '@/lib/wpx/dom/store';
import type { WPXSuggestion } from '@/lib/wpx/dom/types';
import { CommandBar } from './CommandBar';
import { ExportPanel } from './ExportPanel';
import { Inspector } from './Inspector';
import { LayerTree } from './LayerTree';
import { LivePreview } from './LivePreview';
import { OneClickPanel } from './OneClickPanel';
import { SearchPanel } from './SearchPanel';
import { SuggestionPanel } from './SuggestionPanel';

type Panel = 'search' | 'suggestions' | 'export' | 'oneClick' | null;

export function BuilderShell() {
  const store = useDomProjectStore();
  const [panel, setPanel] = useState<Panel>('suggestions');
  const root = getActiveRoot(store.project);
  const selectedNode = useMemo(() => store.project.selectedNodeId ? findNodeById(store.project, store.project.selectedNodeId) : undefined, [store.project]);

  if (!root) return <main className="min-h-screen bg-[var(--background)] p-6 text-[var(--foreground)]">No active JSON DOM page.</main>;

  const addSectionToSelection = () => store.addNode(selectedNode?.id ?? root.id, createSectionNode('New Section'), 'Add Section');
  const addHeroToRoot = () => store.addNode(root.id, createHeroNode('manual'), 'Add Hero');
  const applySuggestion = (suggestion: WPXSuggestion) => {
    const target = suggestion.affectedNodeIds[0] ?? root.id;
    if (suggestion.actionType === 'addNode') store.addNode(target, suggestion.proposedPatch, suggestion.title);
    if (suggestion.actionType === 'updateNode') store.updateNode(target, suggestion.proposedPatch, suggestion.title);
  };

  return <main className="min-h-screen bg-[var(--background)] p-3 text-[var(--foreground)]">
    <CommandBar
      project={store.project}
      onUndo={store.undo}
      onRedo={store.redo}
      onAddSection={addSectionToSelection}
      onAddHero={addHeroToRoot}
      onTogglePanel={(next) => setPanel((current) => current === next ? null : next)}
      onPreviewMode={store.setPreviewMode}
      onThemeToggle={() => store.setThemeMode(store.project.themeMode === 'dark' ? 'light' : 'dark')}
      onMotionToggle={() => store.setMotionEnabled(!store.project.motionEnabled)}
    />
    <section className="grid gap-3 xl:grid-cols-[320px_minmax(0,1fr)_360px]">
      <LayerTree root={root} selectedNodeId={store.project.selectedNodeId} onSelect={store.selectNode} onAdd={(parentId) => store.addNode(parentId, createSectionNode('Layer Section'), 'Add section from layer tree')} onDuplicate={store.duplicateNode} onRemove={store.removeNode} />
      <div className="space-y-3">
        <LivePreview project={store.project} onSelect={store.selectNode} />
        {panel === 'search' && <SearchPanel project={store.project} onSelect={store.selectNode} />}
        {panel === 'suggestions' && <SuggestionPanel project={store.project} onApply={applySuggestion} />}
        {panel === 'export' && <ExportPanel project={store.project} />}
        {panel === 'oneClick' && <OneClickPanel onBuild={store.setProject} />}
      </div>
      <Inspector node={selectedNode} onUpdate={(patch, label) => selectedNode && store.updateNode(selectedNode.id, patch, label)} />
    </section>
    <div className="mt-3 rounded-[18px] border border-[var(--border)] bg-black/35 p-3 text-[10px] uppercase tracking-[.16em] text-[var(--muted)]">
      JSON DOM is the source of truth · patches: {store.project.commandHistory.length} · hydrated: {store.hydrated ? 'yes' : 'loading local vault'}
    </div>
  </main>;
}
