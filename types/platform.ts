export type LibraryType = 'component' | 'template' | 'motion' | 'asset' | 'theme' | 'prompt';
export type LibraryStatus = 'stable' | 'beta' | 'draft' | 'experimental';

export interface PlatformItem {
  id: string;
  title: string;
  type: LibraryType;
  category: string;
  tags: string[];
  description: string;
  status: LibraryStatus;
  premium: boolean;
  featured: boolean;
  thumbnailStyle: string;
  motionPreset: string;
  createdAt: string;
  updatedAt: string;
}

export interface ThemeToken {
  id: string;
  name: string;
  value: string;
  usage: string;
}
