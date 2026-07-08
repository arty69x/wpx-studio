'use client';

import { motion } from 'framer-motion';
import type { CSSProperties, MouseEvent, ReactNode } from 'react';
import type { WPXDomNode, WPXDomProject } from './types';

type RenderContext = {
  project: WPXDomProject;
  selectedNodeId?: string;
  onSelect?: (nodeId: string) => void;
};

const tagFor = (node: WPXDomNode) => {
  if (node.type === 'root' || node.type === 'page') return 'main';
  if (node.type === 'section') return 'section';
  if (node.type === 'container' || node.type === 'grid' || node.type === 'stack') return 'div';
  if (node.type === 'heading') return node.props.level === 2 ? 'h2' : node.props.level === 3 ? 'h3' : 'h1';
  if (node.type === 'text') return node.props.inline ? 'span' : 'p';
  if (node.type === 'button') return node.props.href ? 'a' : 'button';
  if (node.type === 'image') return 'img';
  if (node.type === 'card') return 'article';
  if (node.type === 'footer') return 'footer';
  return 'div';
};

function tokenStyles(node: WPXDomNode): CSSProperties {
  return Object.fromEntries(Object.entries(node.tokens).map(([key, value]) => [`--wpx-${key}`, `var(--${value}, ${value})`])) as CSSProperties;
}

function motionProps(node: WPXDomNode, enabled: boolean) {
  if (!enabled || node.motion?.disabled || !node.motion?.preset) return {};
  const duration = (node.motion.duration ?? 280) / 1000;
  if (node.motion.preset === 'hover') return { whileHover: { y: -4, scale: 1.01 }, transition: { duration } };
  if (node.motion.preset === 'parallax') return { initial: { y: 16 }, animate: { y: 0 }, transition: { duration } };
  return { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration } };
}

const safePropValue = (value: unknown) => typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean' ? value : undefined;
const elementProps = (node: WPXDomNode) => Object.fromEntries(Object.entries(node.props).filter(([key, value]) => !['children', 'className', 'style', 'ref', 'dangerouslySetInnerHTML'].includes(key) && safePropValue(value) !== undefined));

export function renderNode(node: WPXDomNode, context: RenderContext): ReactNode {
  const tag = tagFor(node);
  const selected = context.selectedNodeId === node.id;
  const children = node.children.map((child) => renderNode(child, context));
  const style = { ...tokenStyles(node), ...node.style } as CSSProperties;
  const className = [node.className, selected && 'outline outline-2 outline-[var(--lime)] outline-offset-2'].filter(Boolean).join(' ');
  const common = {
    ...elementProps(node),
    className,
    style,
    'data-wpx-node-id': node.id,
    onClick: (event: MouseEvent) => { event.stopPropagation(); context.onSelect?.(node.id); },
  };

  if (tag === 'img') return <motion.img key={node.id} {...common} alt={String(node.props.alt ?? node.name)} src={String(node.props.src ?? 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22300%22%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22%2321262D%22/%3E%3C/svg%3E')} />;
  const content = node.content ? <>{node.content}</> : null;
  const Component = motion[tag as keyof typeof motion] as typeof motion.div;
  return <Component key={node.id} {...motionProps(node, context.project.motionEnabled)} {...common}>{content}{children}</Component>;
}
