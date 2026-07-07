export function NeonMascot({ className = '' }: { className?: string }) {
  return (
    <div className={`relative h-32 w-32 ${className}`} aria-hidden="true">
      <div className="absolute inset-x-5 top-3 h-20 rounded-[48%_48%_42%_42%] border border-cyan-200/30 bg-gradient-to-b from-slate-100/20 to-blue-500/20 shadow-[0_0_60px_rgba(69,214,255,.35)] backdrop-blur-md" />
      <div className="absolute left-10 top-10 h-4 w-3 rounded-full bg-[#CCFF00] shadow-[0_0_18px_rgba(204,255,0,.9)]" />
      <div className="absolute right-10 top-10 h-4 w-3 rounded-full bg-[#45D6FF] shadow-[0_0_18px_rgba(69,214,255,.9)]" />
      <div className="absolute bottom-8 left-8 h-8 w-5 rounded-full border border-cyan-200/20 bg-blue-400/10 blur-[1px]" />
      <div className="absolute bottom-7 right-8 h-8 w-5 rounded-full border border-cyan-200/20 bg-blue-400/10 blur-[1px]" />
      <div className="absolute bottom-0 left-1/2 h-5 w-24 -translate-x-1/2 rounded-full border border-[#CCFF00]/30 bg-[#CCFF00]/10 blur-sm" />
    </div>
  );
}
