const saveActions = ['Save to Library', 'Add to Collection', 'Favorite', 'Duplicate'];

export function SavePanel() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {saveActions.map((action) => (
        <button key={action} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm text-zinc-200 transition hover:border-[#4F7CFF] hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-[#4F7CFF]">
          {action}
        </button>
      ))}
    </div>
  );
}
