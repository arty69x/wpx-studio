declare module "css-tree" {
  export type CssNode = { type?: string; name?: string; prelude?: CssNode | null };
  export function parse(source: string, options?: { context?: string }): CssNode;
  export function generate(node: CssNode): string;
  export function walk(node: CssNode, callback: (node: CssNode) => void): void;
}
