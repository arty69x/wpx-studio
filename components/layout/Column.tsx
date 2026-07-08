import type { ElementType, ReactNode } from 'react';

export function Column({
  children,
  className = '',
  as: Component = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return <Component className={`min-w-0 flex-1 ${className}`}>{children}</Component>;
}
