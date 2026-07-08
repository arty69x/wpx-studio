import { createDomNode, parseClassAst, wpxNow, wpxUid } from './defaults';
import type { WPXDomNode, WPXDomProject } from './types';

const clone = <T>(value: T): T => structuredClone(value);
const activePage = (project: WPXDomProject) => project.pages.find((page) => page.id === project.activePageId) ?? project.pages[0];
const touchNode = (node: WPXDomNode): WPXDomNode => ({ ...node, updatedAt: wpxNow() });
const touchProject = (project: WPXDomProject): WPXDomProject => ({ ...project, updatedAt: wpxNow() });

export function getActiveRoot(project: WPXDomProject) {
  return activePage(project)?.root;
}

export function findNodeInTree(node: WPXDomNode, nodeId: string): WPXDomNode | undefined {
  if (node.id === nodeId) return node;
  for (const child of node.children) {
    const found = findNodeInTree(child, nodeId);
    if (found) return found;
  }
  return undefined;
}

export function findNodeById(project: WPXDomProject, nodeId: string) {
  const root = getActiveRoot(project);
  return root ? findNodeInTree(root, nodeId) : undefined;
}

export function collectNodeIds(node: WPXDomNode, ids = new Set<string>()) {
  ids.add(node.id);
  node.children.forEach((child) => collectNodeIds(child, ids));
  return ids;
}

function mapTree(node: WPXDomNode, nodeId: string, mapper: (node: WPXDomNode) => WPXDomNode): WPXDomNode {
  if (node.id === nodeId) return mapper(node);
  const children = node.children.map((child) => mapTree(child, nodeId, mapper));
  return children.some((child, index) => child !== node.children[index]) ? touchNode({ ...node, children }) : node;
}

function removeFromTree(node: WPXDomNode, nodeId: string): WPXDomNode {
  const children = node.children.filter((child) => child.id !== nodeId).map((child) => removeFromTree(child, nodeId));
  return children.length !== node.children.length || children.some((child, index) => child !== node.children[index]) ? touchNode({ ...node, children }) : node;
}

function replaceActiveRoot(project: WPXDomProject, root: WPXDomNode): WPXDomProject {
  return touchProject({ ...project, pages: project.pages.map((page) => page.id === project.activePageId ? { ...page, root } : page) });
}

function withPatch(before: WPXDomProject, after: WPXDomProject, label: string, affectedNodeIds: string[]): WPXDomProject {
  const command = { id: wpxUid('patch'), label, timestamp: wpxNow(), before: clone(before), after: clone(after), affectedNodeIds };
  return { ...after, commandHistory: [...before.commandHistory, command].slice(-100), redoStack: [] };
}

function rekeyTree(node: WPXDomNode, suffix = 'Copy'): WPXDomNode {
  const timestamp = wpxNow();
  return {
    ...node,
    id: wpxUid('node'),
    name: node.name.endsWith(suffix) ? node.name : `${node.name} ${suffix}`,
    createdAt: timestamp,
    updatedAt: timestamp,
    children: node.children.map((child) => rekeyTree(child, suffix)),
  };
}

function sanitizePatch(node: WPXDomNode, patch: Partial<WPXDomNode>): WPXDomNode {
  return touchNode({
    ...node,
    ...patch,
    id: node.id,
    createdAt: node.createdAt,
    children: patch.children ?? node.children,
    classAst: patch.className !== undefined ? parseClassAst(patch.className) : patch.classAst ?? node.classAst,
  });
}

export function updateNode(project: WPXDomProject, nodeId: string, patch: Partial<WPXDomNode>, label = 'Update node'): WPXDomProject {
  const root = getActiveRoot(project);
  if (!root || !findNodeInTree(root, nodeId)) return project;
  const updatedRoot = mapTree(root, nodeId, (node) => sanitizePatch(node, patch));
  return withPatch(project, replaceActiveRoot(project, updatedRoot), label, [nodeId]);
}

export function addNode(project: WPXDomProject, parentId: string, node: Partial<WPXDomNode>, label = 'Add node'): WPXDomProject {
  const root = getActiveRoot(project);
  if (!root || !findNodeInTree(root, parentId)) return project;
  const child = createDomNode(node);
  const updatedRoot = mapTree(root, parentId, (parent) => touchNode({ ...parent, children: [...parent.children, child] }));
  return withPatch(project, { ...replaceActiveRoot(project, updatedRoot), selectedNodeId: child.id }, label, [parentId, child.id]);
}

export function removeNode(project: WPXDomProject, nodeId: string, label = 'Remove node'): WPXDomProject {
  const root = getActiveRoot(project);
  if (!root || root.id === nodeId || !findNodeInTree(root, nodeId)) return project;
  const updatedRoot = removeFromTree(root, nodeId);
  return withPatch(project, { ...replaceActiveRoot(project, updatedRoot), selectedNodeId: root.id }, label, [nodeId]);
}

export function duplicateNode(project: WPXDomProject, nodeId: string, label = 'Duplicate node'): WPXDomProject {
  const node = findNodeById(project, nodeId);
  const root = getActiveRoot(project);
  if (!node || !root) return project;
  const duplicate = rekeyTree(clone(node));
  const updatedRoot = mapTree(root, root.id, (parent) => touchNode({ ...parent, children: [...parent.children, duplicate] }));
  return withPatch(project, { ...replaceActiveRoot(project, updatedRoot), selectedNodeId: duplicate.id }, label, [nodeId, duplicate.id]);
}

export function moveNode(project: WPXDomProject, nodeId: string, targetParentId: string, index = 0, label = 'Move node'): WPXDomProject {
  const root = getActiveRoot(project);
  const node = findNodeById(project, nodeId);
  const target = findNodeById(project, targetParentId);
  if (!root || !node || !target || nodeId === root.id || collectNodeIds(node).has(targetParentId)) return project;
  const without = removeFromTree(root, nodeId);
  const movedRoot = mapTree(without, targetParentId, (parent) => {
    const children = [...parent.children];
    children.splice(Math.max(0, Math.min(index, children.length)), 0, node);
    return touchNode({ ...parent, children });
  });
  return withPatch(project, { ...replaceActiveRoot(project, movedRoot), selectedNodeId: nodeId }, label, [nodeId, targetParentId]);
}

export function selectNode(project: WPXDomProject, nodeId: string): WPXDomProject {
  return findNodeById(project, nodeId) ? touchProject({ ...project, selectedNodeId: nodeId }) : project;
}

export function undo(project: WPXDomProject): WPXDomProject {
  const command = project.commandHistory.at(-1);
  if (!command) return project;
  return { ...command.before, redoStack: [command, ...project.redoStack], commandHistory: project.commandHistory.slice(0, -1) };
}

export function redo(project: WPXDomProject): WPXDomProject {
  const command = project.redoStack[0];
  if (!command) return project;
  return { ...command.after, commandHistory: [...project.commandHistory, command], redoStack: project.redoStack.slice(1) };
}

export function replaceProject(before: WPXDomProject, after: WPXDomProject, label = 'Replace project'): WPXDomProject {
  return withPatch(before, { ...after, commandHistory: before.commandHistory, redoStack: before.redoStack, updatedAt: wpxNow() }, label, after.pages.map((page) => page.root.id));
}
