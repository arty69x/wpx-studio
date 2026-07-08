import type { ReactNode } from 'react';

export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'blue' | 'purple' | 'cyan' | 'orange' }) {
  const tones = {
    neutral: 'border-white/10 bg-white/[0.06] text-zinc-300',
    blue: 'border-blue-400/30 bg-blue-400/10 text-blue-200',
    purple: 'border-purple-400/30 bg-purple-400/10 text-purple-200',
    cyan: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-200',
    orange: 'border-orange-400/30 bg-orange-400/10 text-orange-200',
  };

  return <span className={`rounded-full border px-3 py-1 text-xs ${tones[tone]}`}>{children}</span>;
}
