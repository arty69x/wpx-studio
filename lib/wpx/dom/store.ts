'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { openDB, type DBSchema } from 'idb';
import { addNode, duplicateNode, moveNode, removeNode, replaceProject, selectNode, undo, redo, updateNode } from './actions';
import { createDefaultDomProject } from './defaults';
import type { WPXDomNode, WPXDomProject, WPXPreviewMode, WPXThemeMode } from './types';

type WPXDomDB = DBSchema & {
  wpx_dom_projects: { key: string; value: WPXDomProject };
  wpx_dom_snapshots: { key: string; value: { id: string; projectId: string; project: WPXDomProject; createdAt: number }; indexes: { 'by-project': string } };
};

const DB_NAME = 'WPX_Studio_Vault';
const DB_VERSION = 2;
const DEFAULT_PROJECT_KEY = 'active-dom-project';

async function db() {
  return openDB<WPXDomDB>(DB_NAME, DB_VERSION, {
    upgrade(database) {
      if (!database.objectStoreNames.contains('wpx_dom_projects')) database.createObjectStore('wpx_dom_projects', { keyPath: 'id' });
      if (!database.objectStoreNames.contains('wpx_dom_snapshots')) database.createObjectStore('wpx_dom_snapshots', { keyPath: 'id' }).createIndex('by-project', 'projectId');
    },
  });
}

export async function saveDomProject(project: WPXDomProject) {
  if (typeof window === 'undefined') return project;
  const database = await db();
  const tx = database.transaction(['wpx_dom_projects', 'wpx_dom_snapshots'], 'readwrite');
  await tx.objectStore('wpx_dom_projects').put(project);
  const latestCommand = project.commandHistory.at(-1);
  if (latestCommand) {
    await tx.objectStore('wpx_dom_snapshots').put({ id: latestCommand.id, projectId: project.id, project, createdAt: latestCommand.timestamp });
  }
  await tx.done;
  localStorage.setItem(DEFAULT_PROJECT_KEY, project.id);
  return project;
}

export async function listDomSnapshots(projectId: string) {
  if (typeof window === 'undefined') return [];
  const database = await db();
  return database.getAllFromIndex('wpx_dom_snapshots', 'by-project', projectId);
}

export async function loadDomProject(projectId?: string) {
  if (typeof window === 'undefined') return createDefaultDomProject();
  const database = await db();
  const id = projectId ?? localStorage.getItem(DEFAULT_PROJECT_KEY) ?? undefined;
  if (!id) return createDefaultDomProject();
  return (await database.get('wpx_dom_projects', id)) ?? createDefaultDomProject();
}

export function useDomProjectStore() {
  const [project, setProject] = useState<WPXDomProject>(() => createDefaultDomProject());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    void loadDomProject().then((loaded) => {
      if (!active) return;
      setProject(loaded);
      setHydrated(true);
    });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    void saveDomProject(project);
  }, [hydrated, project]);

  const mutate = useCallback((updater: (current: WPXDomProject) => WPXDomProject) => setProject((current) => updater(current)), []);

  return useMemo(() => ({
    project,
    hydrated,
    setProject: (next: WPXDomProject, label = 'Replace project') => mutate((current) => replaceProject(current, next, label)),
    updateNode: (nodeId: string, patch: Partial<WPXDomNode>, label?: string) => mutate((current) => updateNode(current, nodeId, patch, label)),
    addNode: (parentId: string, node: Partial<WPXDomNode>, label?: string) => mutate((current) => addNode(current, parentId, node, label)),
    removeNode: (nodeId: string, label?: string) => mutate((current) => removeNode(current, nodeId, label)),
    duplicateNode: (nodeId: string, label?: string) => mutate((current) => duplicateNode(current, nodeId, label)),
    moveNode: (nodeId: string, targetParentId: string, index: number, label?: string) => mutate((current) => moveNode(current, nodeId, targetParentId, index, label)),
    selectNode: (nodeId: string) => mutate((current) => selectNode(current, nodeId)),
    undo: () => mutate((current) => undo(current)),
    redo: () => mutate((current) => redo(current)),
    setPreviewMode: (previewMode: WPXPreviewMode) => mutate((current) => ({ ...current, previewMode, updatedAt: Date.now() })),
    setThemeMode: (themeMode: WPXThemeMode) => mutate((current) => ({ ...current, themeMode, updatedAt: Date.now() })),
    setMotionEnabled: (motionEnabled: boolean) => mutate((current) => ({ ...current, motionEnabled, updatedAt: Date.now() })),
    setSafeAssetMode: (safeAssetMode: boolean) => mutate((current) => ({ ...current, safeAssetMode, updatedAt: Date.now() })),
  }), [hydrated, mutate, project]);
}
