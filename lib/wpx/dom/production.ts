import { validateDomProject } from './validation';
import type { WPXDomNode, WPXDomProject, WPXValidationIssue } from './types';

function flatten(node: WPXDomNode): WPXDomNode[] {
  return [node, ...node.children.flatMap(flatten)];
}

export function createProductionReport(project: WPXDomProject) {
  const validation = validateDomProject(project);
  const nodes = project.pages.flatMap((page) => flatten(page.root));
  const checks: WPXValidationIssue[] = [...validation.issues];
  const hasHeading = nodes.some((node) => node.type === 'heading');
  const hasCta = nodes.some((node) => node.role === 'cta' || /cta|button/i.test(node.name));
  const imagesWithoutAlt = nodes.filter((node) => node.type === 'image' && !node.props.alt);
  const heavyInlineStyles = nodes.filter((node) => Object.keys(node.style).length > 12);

  if (!hasHeading) checks.push({ id: 'prod-heading', severity: 'warning', path: 'seo', message: 'Page should include at least one heading node.' });
  if (!hasCta) checks.push({ id: 'prod-cta', severity: 'info', path: 'conversion', message: 'Consider adding a CTA before production export.' });
  imagesWithoutAlt.forEach((node) => checks.push({ id: `prod-alt-${node.id}`, severity: 'warning', path: node.id, message: 'Image node is missing alt text.' }));
  heavyInlineStyles.forEach((node) => checks.push({ id: `prod-style-${node.id}`, severity: 'info', path: node.id, message: 'Node has many inline style keys; prefer tokens/classes for production.' }));

  return {
    id: `production-${project.id}`,
    createdAt: Date.now(),
    status: checks.some((check) => check.severity === 'error') ? 'blocked' : 'ready',
    summary: {
      pages: project.pages.length,
      nodes: nodes.length,
      validationStatus: validation.status,
      safeAssetMode: project.safeAssetMode,
    },
    checks,
  };
}
