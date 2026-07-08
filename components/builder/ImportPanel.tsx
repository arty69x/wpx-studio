'use client';

import { useMemo, useState } from 'react';
import createDOMPurify from 'dompurify';
import { htmlToDomNodes } from '@/lib/wpx/dom/importers/html';
import type { WPXDomNode } from '@/lib/wpx/dom/types';

type Props = {
  onImportNodes: (nodes: WPXDomNode[], label: string) => void;
};

export function ImportPanel({ onImportNodes }: Props) {
  const [html, setHtml] = useState('<section class="imported-hero"><h1>Imported JSON DOM Hero</h1><p>This HTML becomes structured JSON DOM nodes.</p></section>');
  const purifier = useMemo(() => typeof window === 'undefined' ? null : createDOMPurify(window), []);
  const sanitized = purifier ? purifier.sanitize(html, { USE_PROFILES: { html: true } }) : html;
  const nodes = typeof window === 'undefined' ? [] : htmlToDomNodes(sanitized, 'builder-html-import');

  return <section className="rounded-[18px] border border-[var(--border)] bg-black/35 p-4">
    <h2 className="text-xs font-black uppercase tracking-[.16em]">Import HTML to JSON DOM</h2>
    <p className="mt-2 text-xs leading-5 text-[var(--muted)]">DOMPurify sanitizes the input first, then WPX converts it into JSON DOM nodes before adding it to the canvas.</p>
    <textarea className="field mt-3 min-h-36 font-mono text-xs" value={html} onChange={(event) => setHtml(event.target.value)} />
    <div className="mt-3 rounded-xl border border-[var(--border)] bg-black/30 p-3 text-xs text-[var(--muted)]">
      Sanitized characters: {sanitized.length} · DOM nodes ready: {nodes.length}
    </div>
    <button className="control mt-3" disabled={!nodes.length} onClick={() => onImportNodes(nodes, 'Import sanitized HTML as JSON DOM')}>Import as JSON DOM</button>
  </section>;
}
