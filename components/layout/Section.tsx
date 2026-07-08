import type { ElementType, ReactNode } from 'react';

export function Section({
  children,
  className = '',
  as: Component = 'section',
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return <Component className={`py-16 md:py-24 ${className}`}>{children}</Component>;
}
