export function formatName(name: string): string {
  return name
    .replace(/[^a-zA-Z ]/g, '')
    .replaceAll(' ', '_')
    .toLowerCase()
}
