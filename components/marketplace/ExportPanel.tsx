export function ExportPanel({ formats }: { formats: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {formats.map((format) => (
        <button key={format} className="rounded-2xl border border-white/10 bg-[#18181B] px-4 py-3 text-left text-sm text-zinc-200 transition hover:border-[#E052FF] hover:bg-white/[0.05]">
          {format}
        </button>
      ))}
    </div>
  );
}
