export type StructureNodeType =
  | 'website'
  | 'page'
  | 'section'
  | 'container'
  | 'grid'
  | 'row'
  | 'column'
  | 'stack'
  | 'component'
  | 'node'
  | 'element'
  | 'micro-div';

export type StructureNode = {
  id: string;
  type: StructureNodeType;
  label: string;
  role: string;
  children?: StructureNode[];
};

export type PreviewPattern =
  | 'carousel'
  | 'navigation'
  | 'typography'
  | 'layout'
  | 'background'
  | 'interaction';

export type ComponentItem = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  subCategory: string;
  creator: string;
  priceType: 'Free' | 'Premium';
  tags: string[];
  interactionType: string;
  motionType: string;
  responsive: string;
  exportFormats: string[];
  structure: StructureNode;
  variants: string[];
  properties: { name: string; value: string }[];
  previewPattern: PreviewPattern;
  sourceType: 'marketplace-reference' | 'extracted-source' | 'generated';
  sourceMeta: {
    sourceName: string;
    originalPattern: string;
    normalizedAs: string;
    extractionConfidence: number;
    cleanupNotes: string;
  };
};
