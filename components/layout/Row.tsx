import type { ElementType, ReactNode } from 'react';

export function Row({
  children,
  className = '',
  as: Component = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return <Component className={`flex flex-wrap gap-6 ${className}`}>{children}</Component>;
}
