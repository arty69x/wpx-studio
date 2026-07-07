const formats = ['HTML', 'CSS', 'React', 'Next.js', 'Tailwind', 'JSON Structure Spec', 'ZIP UI only'];

export function ExportFormats() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <h2 className="mb-8 text-3xl font-semibold text-white md:text-4xl">Preview-only export surfaces</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
        {formats.map((format) => (
          <div className="rounded-2xl border border-white/10 bg-[#18181B] p-4 text-center text-sm text-zinc-200" key={format}>
            {format}
          </div>
        ))}
      </div>
    </section>
  );
}
