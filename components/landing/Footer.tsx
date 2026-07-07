import Link from 'next/link';
import { BrandMark } from '@/components/brand/BrandMark';
import { catalogStats } from '@/data/marketplace';

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-12 text-center text-sm text-zinc-500">
      <div className="mx-auto mb-8 max-w-7xl rounded-[32px] border border-white/10 bg-gradient-to-br from-[#CCFF00]/18 via-[#0A4CFF]/12 to-[#FF2D78]/10 p-10">
        <div className="mx-auto mb-6 flex justify-center">
          <BrandMark />
        </div>
        <h2 className="text-3xl font-semibold text-white">The full local catalog is wired into WPX Studio.</h2>
        <p className="mx-auto mt-3 max-w-xl text-zinc-400">{catalogStats.totalItems} components, {catalogStats.totalCategories} categories, {catalogStats.previewPatterns.length} preview families, and {catalogStats.exportFormats.length} export UI surfaces.</p>
        <Link className="mt-6 inline-flex rounded-full bg-[#CCFF00] px-5 py-3 font-semibold text-black" href="/marketplace">
          Explore Marketplace
        </Link>
      </div>
      WPX Studio frontend-only prototype. No backend, auth, database, analytics, billing, deployment, or real API.
    </footer>
  );
}
