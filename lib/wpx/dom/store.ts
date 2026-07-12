'use client';

import { useCallback, useState } from 'react';
import { loadProject, saveProject, type WPXProject } from '@/lib/studio';
import { addDomNode, duplicateDomNode, redo as redoProject, removeDomNode, selectDomNode, undo as undoProject, updateDomNode } from './actions';
import { createDefaultDomProject } from './defaults';
import type { WPXDomNode, WPXDomProject, WPXResponsiveMode } from './types';

export function createDomProject(input: Partial<WPXDomProject> = {}): WPXDomProject {
  const base = createDefaultDomProject();
  return { ...base, ...input, metadata: { ...base.metadata, ...input.metadata } };
}
export function fromLegacyProject(project: WPXProject): WPXDomProject { const dom = createDefaultDomProject(); return { ...dom, id: project.id, name: project.name, createdAt: project.createdAt, updatedAt: project.updatedAt, components: project.components, assets: project.assets, stylesheets: project.stylesheets, dependencyEdges: project.dependencyEdges, sourceUrls: project.sourceUrls, safeAssetMode: project.safeAssetMode, metadata: { ...dom.metadata, migratedFrom: 'WPXProject' } }; }
export function toPersistableProject(project: WPXDomProject): WPXProject & { domProject: WPXDomProject } { return { id: project.id, name: project.name, createdAt: project.createdAt, updatedAt: project.updatedAt, sourceUrls: project.sourceUrls, components: project.components, assets: project.assets, stylesheets: project.stylesheets, dependencyEdges: project.dependencyEdges, safeAssetMode: project.safeAssetMode, proxyUrl: '', commandHistory: [], redoStack: [], presets: [], plugins: [], domProject: project }; }
export async function saveDomProject(project: WPXDomProject) { await saveProject(toPersistableProject(project)); return project; }
export async function loadDomProject(id: string) { const project = await loadProject(id) as ((WPXProject & { domProject?: WPXDomProject }) | null); if (!project) return null; return project.domProject ?? fromLegacyProject(project); }

export function useDomProjectStore() {
  const [project, setProject] = useState<WPXDomProject>(() => createDefaultDomProject());
  const [hydrated] = useState(true);
  const updateNode = useCallback((id: string, patch: Partial<WPXDomNode>, _label?: string) => setProject((current) => updateDomNode(current, id, patch)), []);
  const addNode = useCallback((parentId: string, node: Partial<WPXDomNode>, _label?: string) => setProject((current) => addDomNode(current, parentId, node)), []);
  const removeNode = useCallback((id: string) => setProject((current) => removeDomNode(current, id)), []);
  const duplicateNode = useCallback((id: string) => setProject((current) => duplicateDomNode(current, id)), []);
  const selectNode = useCallback((id: string) => setProject((current) => selectDomNode(current, id)), []);
  const undo = useCallback(() => setProject((current) => undoProject(current)), []);
  const redo = useCallback(() => setProject((current) => redoProject(current)), []);
  const setPreviewMode = useCallback((previewMode: WPXResponsiveMode) => setProject((current) => ({ ...current, previewMode })), []);
  const setThemeMode = useCallback((themeMode: 'dark' | 'light') => setProject((current) => ({ ...current, themeMode })), []);
  const setMotionEnabled = useCallback((motionEnabled: boolean) => setProject((current) => ({ ...current, motionEnabled })), []);
  return { project, hydrated, setProject, updateNode, addNode, removeNode, duplicateNode, selectNode, undo, redo, setPreviewMode, setThemeMode, setMotionEnabled };
}
