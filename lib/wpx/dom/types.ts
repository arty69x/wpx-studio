export type WPXPreviewMode = 'desktop' | 'tablet' | 'mobile';
export type WPXThemeMode = 'dark' | 'light';
export type WPXDomSourceKind = 'default' | 'prompt' | 'import' | 'template' | 'random' | 'manual';

export type WPXDomMotion = {
  preset?: string;
  duration?: number;
  easing?: string;
  disabled?: boolean;
};

export type WPXDomSource = {
  kind: WPXDomSourceKind;
  ref?: string;
};

export type WPXDomNode = {
  id: string;
  type: string;
  name: string;
  role?: string;
  props: Record<string, unknown>;
  content?: string;
  tokens: Record<string, string>;
  layout: Record<string, unknown>;
  style: Record<string, string | number>;
  className?: string;
  classAst?: unknown;
  motion?: WPXDomMotion;
  events?: Record<string, unknown>;
  states?: Record<string, unknown>;
  responsive?: Record<string, Partial<WPXDomNode>>;
  children: WPXDomNode[];
  source?: WPXDomSource;
  metadata: Record<string, unknown>;
  createdAt: number;
  updatedAt: number;
};

export type WPXDomPage = {
  id: string;
  name: string;
  path: string;
  root: WPXDomNode;
  seo?: Record<string, unknown>;
};

export type WPXDomPatch = {
  id: string;
  label: string;
  timestamp: number;
  before: WPXDomProject;
  after: WPXDomProject;
  affectedNodeIds: string[];
};

export type WPXDomCommand = WPXDomPatch;

export type WPXDomProject = {
  id: string;
  name: string;
  activePageId: string;
  pages: WPXDomPage[];
  selectedNodeId?: string;
  previewMode: WPXPreviewMode;
  themeMode: WPXThemeMode;
  motionEnabled: boolean;
  safeAssetMode: boolean;
  assets: unknown[];
  designTokens: Record<string, string>;
  motionTokens: Record<string, unknown>;
  commandHistory: WPXDomCommand[];
  redoStack: WPXDomCommand[];
  validationReports: unknown[];
  createdAt: number;
  updatedAt: number;
};

export type WPXSearchResult = {
  id: string;
  type: string;
  path: string;
  label: string;
  excerpt: string;
  score: number;
  actionSuggestions: string[];
};

export type WPXSuggestion = {
  id: string;
  title: string;
  reason: string;
  affectedNodeIds: string[];
  actionType: 'addNode' | 'updateNode' | 'replaceProject';
  proposedPatch: Partial<WPXDomNode> | WPXDomNode;
};

export type WPXValidationIssue = {
  id: string;
  severity: 'info' | 'warning' | 'error';
  path: string;
  message: string;
};

export type WPXValidationReport = {
  id: string;
  status: 'pass' | 'warn' | 'fail';
  issues: WPXValidationIssue[];
  createdAt: number;
};
