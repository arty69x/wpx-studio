import { wpxNow, wpxUid } from './defaults';
import { findNodeById, getActiveRoot } from './actions';
import type { WPXDomNode, WPXDomProject, WPXValidationIssue, WPXValidationReport } from './types';

function validateNode(node: WPXDomNode, path: string, ids: Set<string>): WPXValidationIssue[] {
  const issues: WPXValidationIssue[] = [];
  for (const field of ['id', 'type', 'name', 'children'] as const) {
    if (node[field] === undefined || node[field] === '') issues.push({ id: wpxUid('issue'), severity: 'error', path, message: `Node is missing ${field}` });
  }
  if (ids.has(node.id)) issues.push({ id: wpxUid('issue'), severity: 'error', path, message: `Duplicate node id: ${node.id}` });
  ids.add(node.id);
  if (!Array.isArray(node.children)) issues.push({ id: wpxUid('issue'), severity: 'error', path, message: 'Node children must be an array' });
  node.children.forEach((child, index) => issues.push(...validateNode(child, `${path}.children[${index}]`, ids)));
  return issues;
}

export function validateDomProject(project: WPXDomProject): WPXValidationReport {
  const issues: WPXValidationIssue[] = [];
  const ids = new Set<string>();
  if (!project.pages.length) issues.push({ id: wpxUid('issue'), severity: 'error', path: 'pages', message: 'Project must have at least one page' });
  for (const page of project.pages) {
    if (!page.root) issues.push({ id: wpxUid('issue'), severity: 'error', path: `pages.${page.id}.root`, message: 'Page must have a root node' });
    else issues.push(...validateNode(page.root, `pages.${page.id}.root`, ids));
  }
  if (project.selectedNodeId && !findNodeById(project, project.selectedNodeId)) issues.push({ id: wpxUid('issue'), severity: 'warning', path: 'selectedNodeId', message: 'Selected node does not exist' });
  if (!getActiveRoot(project)) issues.push({ id: wpxUid('issue'), severity: 'error', path: 'activePageId', message: 'Active page does not exist' });
  return { id: wpxUid('validation'), status: issues.some((issue) => issue.severity === 'error') ? 'fail' : issues.length ? 'warn' : 'pass', issues, createdAt: wpxNow() };
}
