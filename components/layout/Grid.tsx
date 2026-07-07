import type { ElementType, ReactNode } from 'react';

export function Grid({
  children,
  className = '',
  as: Component = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return <Component className={`grid gap-6 ${className}`}>{children}</Component>;
}
