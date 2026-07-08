import type { ElementType, ReactNode } from 'react';

export function Stack({
  children,
  className = '',
  as: Component = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return <Component className={`flex flex-col gap-4 ${className}`}>{children}</Component>;
}
