import Link from 'next/link';

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label="WPX Studio home">
      <span className="relative inline-flex h-9 w-14 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/50 shadow-[0_0_30px_rgba(204,255,0,.16)]">
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(204,255,0,.45),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(10,76,255,.35),transparent_35%)]" />
        <span className="relative text-sm font-black tracking-[-0.12em] text-white">WPX</span>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="text-xs font-semibold uppercase tracking-[0.28em] text-white">WhisperX</span>
          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#CCFF00]">Studio</span>
        </span>
      )}
    </Link>
  );
}
