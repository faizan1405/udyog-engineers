/**
 * Staging & Environment Utility
 *
 * Controls visibility of development badges, temporary asset watermarks,
 * and staging indicators across the site.
 *
 * Guidelines:
 * - In development: staging labels remain visible to prevent developers and testers
 *   from mistaking placeholders for authentic client data.
 * - In production: developer-facing staging labels are cleanly hidden, ensuring
 *   no internal development jargon is exposed publicly.
 */

export function isStagingOrDevelopment(): boolean {
  if (process.env.NEXT_PUBLIC_ENABLE_STAGING_BADGES === "false") {
    return false;
  }
  if (process.env.NEXT_PUBLIC_ENABLE_STAGING_BADGES === "true") {
    return true;
  }
  return process.env.NODE_ENV !== "production";
}
