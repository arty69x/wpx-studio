export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(' ');
}
