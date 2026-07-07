import Link from 'next/link';
import { BrandMark } from '@/components/brand/BrandMark';
import { CategoryShowcase } from '@/components/landing/CategoryShowcase';
import { ExportFormats } from '@/components/landing/ExportFormats';
import { Footer } from '@/components/landing/Footer';
import { Hero } from '@/components/landing/Hero';
import { MarketplacePreview } from '@/components/landing/MarketplacePreview';
import { MotionShowcase } from '@/components/landing/MotionShowcase';
import { StructureEngine } from '@/components/landing/StructureEngine';

export default function Home() {
  return (
    <main className="bg-[#05070D] text-white">
      <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#05070D]/78 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <BrandMark />
          <Link className="rounded-full border border-[#CCFF00]/25 bg-[#CCFF00]/10 px-4 py-2 text-sm font-semibold text-[#CCFF00] transition hover:border-[#CCFF00]/60" href="/marketplace">
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
