'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { ComponentItem } from '@/lib/types';
import { validateStructure } from '@/lib/structure-validator';
import { Badge } from './Badge';
import { ComponentPreview } from './ComponentPreview';
import { ExportPanel } from './ExportPanel';
import { RelatedComponents } from './RelatedComponents';
import { SavePanel } from './SavePanel';
import { StructureTree } from './StructureTree';

const devices = [
  { label: 'Desktop', width: 'w-full' },
  { label: 'Tablet', width: 'max-w-[768px]' },
  { label: 'Mobile', width: 'max-w-[360px]' },
];
const states = ['Default', 'Hover', 'Active', 'Selected', 'Motion'];

export function ComponentDetail({ item }: { item: ComponentItem }) {
  const [device, setDevice] = useState(devices[0]);
  const [previewState, setPreviewState] = useState('Default');
  const validation = useMemo(() => validateStructure(item.structure), [item.structure]);

  return (
    <main className="min-h-screen bg-[#09090B] text-white">
      <DetailTopBar />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-8">
          <PreviewSection item={item} device={device} state={previewState} onDevice={setDevice} onState={setPreviewState} />
          <ContentSection title="Overview">
            <p className="max-w-3xl leading-7 text-zinc-300">{item.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {item.tags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
            </div>
          </ContentSection>
          <ContentSection title="Structure">
            <div className={`mb-5 inline-flex rounded-full px-3 py-1 text-sm ${validation.valid ? 'bg-emerald-500/15 text-emerald-300' : 'bg-red-500/15 text-red-300'}`}>
              {validation.valid ? 'Structure Valid' : 'Structure Invalid'}
            </div>
            <StructureTree node={item.structure} />
          </ContentSection>
          <ContentSection title="Properties">
            <div className="grid gap-3 md:grid-cols-3">
              {item.properties.map((property) => (
                <div key={property.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-zinc-500">{property.name}</p>
                  <p className="mt-1 text-zinc-100">{property.value}</p>
                </div>
              ))}
            </div>
          </ContentSection>
          <ContentSection title="Interactions">
            <p className="text-zinc-300">{item.interactionType}</p>
          </ContentSection>
          <ContentSection title="Motion">
            <p className="text-zinc-300">{item.motionType}</p>
          </ContentSection>
          <ContentSection title="Responsive">
            <p className="text-zinc-300">{item.responsive}</p>
          </ContentSection>
          <ContentSection title="Export">
            <ExportPanel formats={item.exportFormats} />
          </ContentSection>
          <ContentSection title="Related">
            <RelatedComponents category={item.category} slug={item.slug} />
          </ContentSection>
        </div>
        <MetadataPanel item={item} />
      </div>
    </main>
  );
}

function DetailTopBar() {
  return (
    <div className="sticky top-0 z-30 border-b border-white/10 bg-[#09090B]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/marketplace" className="text-sm text-zinc-400 transition hover:text-white">← Marketplace</Link>
        <div className="flex gap-2">
          <button className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">Save</button>
          <button className="rounded-full bg-[#4F7CFF] px-4 py-2 text-sm font-semibold text-white">Export</button>
        </div>
      </div>
    </div>
  );
}

function PreviewSection({ item, device, state, onDevice, onState }: { item: ComponentItem; device: { label: string; width: string }; state: string; onDevice: (device: { label: string; width: string }) => void; onState: (state: string) => void }) {
  return (
    <section className="rounded-[32px] border border-white/10 bg-[#111214] p-4 shadow-2xl shadow-black/20">
      <div className="mb-4 flex flex-wrap justify-between gap-3">
        <SegmentedControl values={devices.map((item) => item.label)} active={device.label} onChange={(value) => onDevice(devices.find((item) => item.label === value) ?? devices[0])} />
        <SegmentedControl values={states} active={state} onChange={onState} />
      </div>
      <div className={`mx-auto transition-all duration-300 ${device.width}`}>
        <ComponentPreview item={item} state={state} />
      </div>
    </section>
  );
}

function SegmentedControl({ values, active, onChange }: { values: string[]; active: string; onChange: (value: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2 rounded-full border border-white/10 bg-black/20 p-1">
      {values.map((value) => (
        <button key={value} onClick={() => onChange(value)} className={`rounded-full px-3 py-1 text-xs transition ${active === value ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}>
          {value}
        </button>
      ))}
    </div>
  );
}

function ContentSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[32px] border border-white/10 bg-[#111214] p-6">
      <h2 className="mb-5 text-xl font-semibold text-white">{title}</h2>
      {children}
    </section>
  );
}

function MetadataPanel({ item }: { item: ComponentItem }) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-3xl border border-white/10 bg-[#18181B] p-6">
        <div className="mb-5 flex flex-wrap gap-2">
          <Badge tone="blue">{item.category}</Badge>
          <Badge tone="purple">{item.subCategory}</Badge>
          <Badge tone={item.priceType === 'Premium' ? 'orange' : 'cyan'}>{item.priceType}</Badge>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-white">{item.name}</h1>
        <p className="mt-4 text-sm leading-6 text-zinc-400">Creator: {item.creator}</p>
      </div>
      <div className="rounded-3xl border border-white/10 bg-[#18181B] p-6">
        <h2 className="mb-4 font-semibold text-white">Save UI</h2>
        <SavePanel />
      </div>
      <div className="rounded-3xl border border-white/10 bg-[#18181B] p-6">
        <h2 className="mb-4 font-semibold text-white">Variants</h2>
        <div className="flex flex-wrap gap-2">
          {item.variants.map((variant) => <Badge key={variant}>{variant}</Badge>)}
        </div>
      </div>
    </aside>
  );
}
