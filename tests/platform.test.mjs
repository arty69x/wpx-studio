import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), 'utf8');

describe('ARTYVERSE X complete platform', () => {
  it('provides role workspaces and authentication routes', () => {
    for (const path of [
      'app/account/[[...section]]/page.tsx',
      'app/seller/[[...section]]/page.tsx',
      'app/admin/[[...section]]/page.tsx',
      'app/auth/[[...mode]]/page.tsx',
    ]) assert.ok(existsSync(join(root, path)), `missing route: ${path}`);
  });

  it('covers every planned account seller and admin module', () => {
    const data = read('data/artyverse-platform.ts');
    for (const label of [
      'My Orders', 'Tracking', 'Returns & Refunds', 'Security & Sessions',
      'Products', 'Inventory', 'Fulfillment', 'Finance & Payouts', 'COA / Serial',
      'Seller Approval', 'Product Moderation', 'Payments & Refunds', 'Commission & Fees',
      'Campaigns & CMS', 'Reports & Audit', 'Integrations',
    ]) assert.ok(data.includes(label), `missing module: ${label}`);
  });

  it('keeps responsive and reduced-motion production rules', () => {
    const platform = read('app/platform.css');
    const auth = read('app/auth/auth.css');
    for (const css of [platform, auth]) {
      assert.ok(css.includes('@media(max-width:'), 'missing responsive breakpoint');
      assert.ok(css.includes('prefers-reduced-motion'), 'missing reduced motion');
    }
  });

  it('keeps the approved ARTYVERSE X naming in new experiences', () => {
    for (const path of ['components/artyverse/PlatformExperience.tsx', 'components/artyverse/AuthExperience.tsx']) {
      const content = read(path);
      assert.ok(content.includes('ARTYVERSE'), `missing brand in ${path}`);
      assert.equal(content.includes('WHISPERX'), false, `legacy brand in ${path}`);
    }
  });
});
