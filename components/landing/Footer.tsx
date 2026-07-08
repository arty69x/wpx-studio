import Link from 'next/link';
import { BrandMark } from '@/components/brand/BrandMark';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Stack } from '@/components/layout/Stack';
import { catalogStats } from '@/data/marketplace';

export function Footer() {
  return (
    <footer className="border-t border-white/10 text-center text-sm text-zinc-500">
      <Section className="py-12 md:py-12">
        <Container>
          <Stack className="mx-auto items-center rounded-[32px] border border-white/10 bg-gradient-to-br from-[#CCFF00]/18 via-[#0A4CFF]/12 to-[#FF2D78]/10 p-10">
            <BrandMark />
            <h2 className="text-3xl font-semibold text-white">The full local catalog is wired into WPX Studio.</h2>
            <p className="max-w-xl text-zinc-400">{catalogStats.totalItems} components, {catalogStats.totalCategories} categories, {catalogStats.previewPatterns.length} preview families, and {catalogStats.exportFormats.length} export UI surfaces.</p>
            <Link className="inline-flex rounded-full bg-[#CCFF00] px-5 py-3 font-semibold text-black" href="/marketplace">
              Explore Marketplace
            </Link>
          </Stack>
          <p className="mt-8">WPX Studio frontend-only prototype. No backend, auth, database, analytics, billing, deployment, or real API.</p>
        </Container>
      </Section>
    </footer>
  );
}
