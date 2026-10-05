/**
 * Content Status & Verification Model for Udyog Engineers
 *
 * Prevents unverified placeholders and development data from
 * accidentally publishing to production.
 */

export type ContentStatus =
  | "verified" // Verified against authentic client/manufacturer material
  | "pending" // Authentic record identified, awaiting client verification/assets
  | "development-placeholder"; // Temporary stub solely for layout/route testing

export interface ContentRecordMeta {
  status: ContentStatus;
  verifiedAt?: string;
  source?: string;
  verifiedBy?: string;
  notes?: string;
}

/**
 * Checks whether content is verified for production release.
 */
export function isContentVerified(status?: ContentStatus): boolean {
  return status === "verified";
}

/**
 * Checks whether content is a development placeholder.
 */
export function isContentPlaceholder(status?: ContentStatus): boolean {
  return status === "development-placeholder" || !status;
}
