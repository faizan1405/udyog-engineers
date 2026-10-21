import { ContentStatus } from "./content";

/**
 * Product data model for Udyog Engineers technical equipment showcase.
 */

export interface ProductSpecification {
  label: string;
  value: string;
  unit?: string;
  group?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  model: string;
  manufacturer?: string; // Optional manufacturer brand / original equipment partner
  brand?: string;
  series?: string;
  subcategory?: string;
  subcategorySlug?: string;
  variant?: string;
  shortDescription: string;
  description: string;
  heroImage: string;
  gallery: string[];
  galleryImages?: string[];
  highlights: string[];
  keyHighlights?: string[];
  specifications: ProductSpecification[];
  features?: string[];
  applications: string[];
  datasheet?: string; // Optional path or URL to PDF datasheet (e.g. /datasheets/model-name.pdf)
  relatedProducts: string[]; // Related product slugs or IDs
  featured: boolean;
  inquiryLabel?: string;
  /** Verification lifecycle status */
  status?: ContentStatus;
  /** Flag to indicate if this is temporary placeholder demo data */
  isDemoPlaceholder?: boolean;
  /** Official manufacturer research reference */
  sourceUrl?: string;
  sourceManufacturer?: string;
  manufacturerSource?: string;
  verificationStatus?:
    | "manufacturer-verified"
    | "client-supplied-verification-pending"
    | "generic-product"
    | "pending"
    | "client-supplied";
  /** Primary image accessible description */
  imageAlt?: string;
  /** Source URL for the verified product image */
  imageSourceUrl?: string;
  /** Sourced origin classification (e.g. 'official-manufacturer') */
  imageSourceType?: "official-manufacturer" | "client-supplied" | "authorized-catalogue";
}
