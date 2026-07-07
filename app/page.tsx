import Link from 'next/link';
import { CategoryShowcase } from '@/components/landing/CategoryShowcase';
import { ExportFormats } from '@/components/landing/ExportFormats';
import { Footer } from '@/components/landing/Footer';
import { Hero } from '@/components/landing/Hero';
import { MarketplacePreview } from '@/components/landing/MarketplacePreview';
import { MotionShowcase } from '@/components/landing/MotionShowcase';
import { StructureEngine } from '@/components/landing/StructureEngine';

export default function Home() {
  return (
    <main className="bg-[#09090B] text-white">
      <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#09090B]/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link className="font-semibold tracking-tight" href="/">WPX Studio</Link>
          <Link className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-200 transition hover:border-white/30" href="/marketplace">
            Marketplace
          </Link>
        </div>
      </nav>
      <Hero />
      <MarketplacePreview />
      <CategoryShowcase />
      <StructureEngine />
      <MotionShowcase />
      <ExportFormats />
      <Footer />
    </main>
  );
}
