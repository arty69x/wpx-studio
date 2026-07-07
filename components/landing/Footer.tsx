import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-12 text-center text-sm text-zinc-500">
      <div className="mx-auto mb-8 max-w-7xl rounded-[32px] border border-white/10 bg-gradient-to-br from-[#4F7CFF]/20 to-[#E052FF]/10 p-10">
        <h2 className="text-3xl font-semibold text-white">Start with the marketplace prototype.</h2>
        <Link className="mt-6 inline-flex rounded-full bg-white px-5 py-3 font-semibold text-black" href="/marketplace">
          Explore Marketplace
        </Link>
      </div>
      WPX Studio frontend-only prototype. No backend, auth, database, analytics, billing, deployment, or real API.
    </footer>
  );
}
