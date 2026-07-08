'use client';

import type { WPXDomProject, WPXPreviewMode } from '@/lib/wpx/dom/types';

const modes: WPXPreviewMode[] = ['desktop', 'tablet', 'mobile'];

type Props = {
  project: WPXDomProject;
  onUndo: () => void;
  onRedo: () => void;
  onAddSection: () => void;
  onAddHero: () => void;
  onTogglePanel: (panel: 'search' | 'suggestions' | 'export' | 'oneClick' | 'import') => void;
  onPreviewMode: (mode: WPXPreviewMode) => void;
  onThemeToggle: () => void;
  onMotionToggle: () => void;
};

export function CommandBar({ project, onUndo, onRedo, onAddSection, onAddHero, onTogglePanel, onPreviewMode, onThemeToggle, onMotionToggle }: Props) {
  return <div className="sticky top-[57px] z-30 mb-3 flex flex-wrap items-center gap-2 rounded-[18px] border border-[var(--border)] bg-black/70 p-3 backdrop-blur-xl">
    <button className="control" onClick={onUndo} disabled={!project.commandHistory.length}>Undo</button>
    <button className="control" onClick={onRedo} disabled={!project.redoStack.length}>Redo</button>
    <button className="control" onClick={onAddSection}>Add Section</button>
    <button className="control" onClick={onAddHero}>Add Hero</button>
    <button className="control" onClick={() => onTogglePanel('search')}>Search</button>
    <button className="control" onClick={() => onTogglePanel('suggestions')}>Suggestions</button>
    <button className="control" onClick={() => onTogglePanel('oneClick')}>One Click</button>
    <button className="control" onClick={() => onTogglePanel('import')}>Import</button>
    <button className="control" onClick={() => onTogglePanel('export')}>Export</button>
    <div className="ml-auto flex gap-1">
      {modes.map((mode) => <button key={mode} className={project.previewMode === mode ? 'chip-active rounded px-3 py-2 text-xs' : 'control'} onClick={() => onPreviewMode(mode)}>{mode}</button>)}
      <button className="control" onClick={onThemeToggle}>{project.themeMode}</button>
      <button className="control" onClick={onMotionToggle}>Motion {project.motionEnabled ? 'On' : 'Off'}</button>
    </div>
  </div>;
}
