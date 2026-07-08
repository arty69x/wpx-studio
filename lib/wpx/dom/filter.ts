import { platformItems } from '@/data/platform';
import type { WPXDomNode, WPXDomProject, WPXPreviewMode } from './types';

export type WPXFilterCriteria = Partial<{
  type: string;
  category: string;
  tag: string;
  status: string;
  premium: boolean;
  featured: boolean;
  motion: string;
  token: string;
  responsiveMode: WPXPreviewMode;
  accessibilityStatus: string;
  performanceStatus: string;
  source: string;
  updatedAfter: number;
  updatedBefore: number;
}>;

const tags = (node: WPXDomNode) => Array.isArray(node.metadata.tags) ? node.metadata.tags as string[] : [];
const matchesNode = (node: WPXDomNode, criteria: WPXFilterCriteria) => (!criteria.type || node.type === criteria.type)
  && (!criteria.category || node.metadata.category === criteria.category)
  && (!criteria.tag || tags(node).includes(criteria.tag))
  && (!criteria.status || node.metadata.status === criteria.status)
  && (criteria.premium === undefined || node.metadata.premium === criteria.premium)
  && (criteria.featured === undefined || node.metadata.featured === criteria.featured)
  && (!criteria.motion || node.motion?.preset === criteria.motion)
  && (!criteria.token || Object.keys(node.tokens).includes(criteria.token))
  && (!criteria.responsiveMode || Boolean(node.responsive?.[criteria.responsiveMode]))
  && (!criteria.accessibilityStatus || node.metadata.accessibilityStatus === criteria.accessibilityStatus)
  && (!criteria.performanceStatus || node.metadata.performanceStatus === criteria.performanceStatus)
  && (!criteria.source || node.source?.kind === criteria.source)
  && (!criteria.updatedAfter || node.updatedAt >= criteria.updatedAfter)
  && (!criteria.updatedBefore || node.updatedAt <= criteria.updatedBefore);

export function filterDomNodes(project: WPXDomProject, criteria: WPXFilterCriteria) {
  const out: WPXDomNode[] = [];
  const visit = (node: WPXDomNode) => { if (matchesNode(node, criteria)) out.push(node); node.children.forEach(visit); };
  project.pages.forEach((page) => visit(page.root));
  return out;
}

export const filterRegistry = (criteria: WPXFilterCriteria) => platformItems.filter((item) => (!criteria.type || item.type === criteria.type)
  && (!criteria.category || item.category === criteria.category)
  && (!criteria.tag || item.tags.includes(criteria.tag))
  && (!criteria.status || item.status === criteria.status)
  && (criteria.premium === undefined || item.premium === criteria.premium)
  && (criteria.featured === undefined || item.featured === criteria.featured));
