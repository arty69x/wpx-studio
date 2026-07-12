import { createDomNode, parseClassAst, wpxNow, wpxUid } from './defaults';
import type { WPXDomNode, WPXDomProject, WPXPatchAction } from './types';

const clone = <T>(value: T): T => structuredClone(value);
const touch = (node: WPXDomNode): WPXDomNode => ({ ...node, updatedAt: wpxNow() });
export const snapshotDom = (label: string, project: WPXDomProject, action: WPXPatchAction = 'snapshot') => ({ id: wpxUid('cmd'), label, action, timestamp: wpxNow(), domTree: clone(project.domTree), selectedNodeId: project.selectedNodeId });
const withHistory = (project: WPXDomProject, label: string, action: WPXPatchAction): WPXDomProject => ({ ...project, commandHistory: [...project.commandHistory, snapshotDom(label, project, action)].slice(-100), redoStack: [], updatedAt: wpxNow() });

export function findNode(node: WPXDomNode, id: string): WPXDomNode | null { if (node.id === id) return node; for (const child of node.children) { const found = findNode(child, id); if (found) return found; } return null; }
function mapNode(node: WPXDomNode, id: string, mapper: (node: WPXDomNode) => WPXDomNode): WPXDomNode { if (node.id === id) return mapper(node); return touch({ ...node, children: node.children.map((child) => mapNode(child, id, mapper)) }); }
function removeFrom(node: WPXDomNode, id: string): WPXDomNode { return touch({ ...node, children: node.children.filter((child) => child.id !== id).map((child) => removeFrom(child, id)) }); }

export function updateDomNode(project: WPXDomProject, id: string, patch: Partial<WPXDomNode>) { const next = withHistory(project, `Update ${id}`, 'update'); const domTree = mapNode(next.domTree, id, (node) => touch({ ...node, ...patch, id: node.id, classAst: patch.className ? parseClassAst(patch.className) : patch.classAst ?? node.classAst })); return { ...next, domTree, pages: next.pages.map((p) => p.rootNodeId === next.domTree.id ? { ...p, domTree, updatedAt: wpxNow() } : p) }; }
export function addDomNode(project: WPXDomProject, parentId: string, node: Partial<WPXDomNode>) { const next = withHistory(project, `Add ${node.name ?? 'node'}`, 'add'); const child = createDomNode(node); const domTree = mapNode(next.domTree, parentId, (parent) => touch({ ...parent, children: [...parent.children, child] })); return { ...next, domTree, selectedNodeId: child.id, pages: next.pages.map((p) => p.rootNodeId === next.domTree.id ? { ...p, domTree, updatedAt: wpxNow() } : p) }; }
export function removeDomNode(project: WPXDomProject, id: string) { const next = withHistory(project, `Remove ${id}`, 'remove'); const domTree = removeFrom(next.domTree, id); return { ...next, domTree, selectedNodeId: next.domTree.id }; }
export function duplicateDomNode(project: WPXDomProject, id: string) { const source = findNode(project.domTree, id); if (!source) return project; return addDomNode(project, project.domTree.id, { ...clone(source), id: wpxUid('node'), name: `${source.name} Copy`, createdAt: wpxNow(), updatedAt: wpxNow() }); }
export function replaceDomNode(project: WPXDomProject, id: string, replacement: Partial<WPXDomNode>) { const next = withHistory(project, `Replace ${id}`, 'replace'); const domTree = mapNode(next.domTree, id, () => createDomNode({ ...replacement, id })); return { ...next, domTree }; }
export const selectDomNode = (project: WPXDomProject, id: string) => ({ ...project, selectedNodeId: id, updatedAt: wpxNow() });
export function undo(project: WPXDomProject) { const previous = project.commandHistory.at(-1); if (!previous) return project; return { ...project, domTree: previous.domTree, selectedNodeId: previous.selectedNodeId, commandHistory: project.commandHistory.slice(0, -1), redoStack: [...project.redoStack, snapshotDom('Redo snapshot', project, 'snapshot')] }; }
export function redo(project: WPXDomProject) { const next = project.redoStack.at(-1); if (!next) return project; return { ...project, domTree: next.domTree, selectedNodeId: next.selectedNodeId, commandHistory: [...project.commandHistory, snapshotDom('Undo snapshot', project, 'snapshot')], redoStack: project.redoStack.slice(0, -1) }; }
export const moveDomNode = (project: WPXDomProject, id: string, newParentId: string) => { const node = findNode(project.domTree, id); return node ? addDomNode(removeDomNode(project, id), newParentId, node) : project; };
export const wrapDomNode = (project: WPXDomProject, id: string, wrapper: Partial<WPXDomNode>) => replaceDomNode(project, id, createDomNode({ ...wrapper, children: [findNode(project.domTree, id) ?? createDomNode()] }));
export const unwrapDomNode = (project: WPXDomProject, id: string) => { const node = findNode(project.domTree, id); return node?.children[0] ? replaceDomNode(project, id, node.children[0]) : project; };

// Compatibility API used by the builder UI.
export const findNodeById = (project: WPXDomProject, id: string) => findNode(project.domTree, id) ?? undefined;
export const getActiveRoot = (project: WPXDomProject) => project.pages[0]?.domTree ?? project.domTree;
export const addNode = addDomNode;
