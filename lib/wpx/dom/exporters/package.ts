import JSZip from 'jszip';
import { validateDomProject } from '../validation';
import type { WPXDomProject } from '../types';
import { collectDomClassMap } from '../tailwind';
import { createDomExportManifest, exportDomProjectHtml } from './html';

export async function createDomProjectZip(project: WPXDomProject) {
  const report = validateDomProject(project);
  const manifest = createDomExportManifest(project);
  const zip = new JSZip();
  const root = zip.folder(project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'wpx-dom-export')!;

  root.file('index.html', exportDomProjectHtml(project));
  root.file('dom.json', JSON.stringify(project.pages, null, 2));
  root.file('project.json', JSON.stringify(project, null, 2));
  root.file('manifest.json', JSON.stringify(manifest, null, 2));
  root.file('tailwind-class-map.json', JSON.stringify(collectDomClassMap(project), null, 2));
  root.file('production-report.json', JSON.stringify({ ...report, generatedFrom: 'json-dom-kernel', exportType: 'phase-5-static-package' }, null, 2));
  root.file('README.md', `# ${project.name}\n\nExported from WPX Studio JSON DOM Kernel.\n\n- Pages: ${project.pages.length}\n- Validation: ${report.status}\n- Safe asset mode: ${project.safeAssetMode ? 'on' : 'off'}\n`);
  root.file('assets/.gitkeep', '');

  return zip.generateAsync({ type: 'blob' });
}
