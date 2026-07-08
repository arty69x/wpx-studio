import { loadProject, saveProject, type WPXProject } from '@/lib/studio';
import { createDefaultDomProject } from './defaults';
import type { WPXDomProject } from './types';

export function createDomProject(input: Partial<WPXDomProject> = {}): WPXDomProject { return { ...createDefaultDomProject(), ...input, metadata: { ...createDefaultDomProject().metadata, ...input.metadata } }; }
export function fromLegacyProject(project: WPXProject): WPXDomProject { const dom = createDefaultDomProject(); return { ...dom, id: project.id, name: project.name, createdAt: project.createdAt, updatedAt: project.updatedAt, components: project.components, assets: project.assets, stylesheets: project.stylesheets, dependencyEdges: project.dependencyEdges, sourceUrls: project.sourceUrls, safeAssetMode: project.safeAssetMode, metadata: { ...dom.metadata, migratedFrom: 'WPXProject' } }; }
export function toPersistableProject(project: WPXDomProject): WPXProject & { domProject: WPXDomProject } { return { id: project.id, name: project.name, createdAt: project.createdAt, updatedAt: project.updatedAt, sourceUrls: project.sourceUrls, components: project.components, assets: project.assets, stylesheets: project.stylesheets, dependencyEdges: project.dependencyEdges, safeAssetMode: project.safeAssetMode, proxyUrl: '', commandHistory: [], redoStack: [], presets: [], plugins: [], domProject: project }; }
export async function saveDomProject(project: WPXDomProject) { await saveProject(toPersistableProject(project)); return project; }
export async function loadDomProject(id: string) { const project = await loadProject(id) as ((WPXProject & { domProject?: WPXDomProject }) | null); if (!project) return null; return project.domProject ?? fromLegacyProject(project); }
