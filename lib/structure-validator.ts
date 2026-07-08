import type { StructureNode } from './types';

export function validateStructure(root: StructureNode) {
  const errors: string[] = [];

  function walk(node: StructureNode, parents: StructureNode[]) {
    const children = node.children ?? [];

    if (node.type === 'section' && !children.some((child) => child.type === 'container')) {
      errors.push(`${node.label}: Section must contain Container`);
    }

    if (node.type === 'container' && parents.some((parent) => parent.type === 'micro-div')) {
      errors.push(`${node.label}: Container cannot be inside Micro Div`);
    }

    if (node.type === 'micro-div' && children.some((child) => child.type === 'section')) {
      errors.push(`${node.label}: Micro Div cannot contain Section`);
    }

    if (node.type === 'component' && children.some((child) => child.type !== 'node')) {
      errors.push(`${node.label}: Component can contain Node only`);
    }

    if (node.type === 'node' && children.some((child) => !['element', 'micro-div'].includes(child.type))) {
      errors.push(`${node.label}: Node can contain Element or Micro Div`);
    }

    if (node.type === 'grid' && children.some((child) => !['row', 'column'].includes(child.type))) {
      errors.push(`${node.label}: Grid can contain Row or Column`);
    }

    if (node.type === 'row' && children.some((child) => child.type !== 'column')) {
      errors.push(`${node.label}: Row can contain Column`);
    }

    if (node.type === 'column' && children.some((child) => !['stack', 'component'].includes(child.type))) {
      errors.push(`${node.label}: Column can contain Stack or Component`);
    }

    children.forEach((child) => walk(child, [...parents, node]));
  }

  walk(root, []);

  return {
    valid: errors.length === 0,
    errors,
  };
}
