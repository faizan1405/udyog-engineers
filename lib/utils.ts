/**
 * Lightweight class names joiner utility.
 */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}

/**
 * Format string to slug or display format
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Prepends basePath to static assets when deployed under a subpath (e.g. GitHub Pages)
 */
export function assetPath(path: string): string {
  if (!path) return path;
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:") ||
    path.startsWith("blob:")
  ) {
    return path;
  }
  if (basePath && path.startsWith("/") && !path.startsWith(basePath)) {
    return `${basePath}${path}`;
  }
  return path;
}
