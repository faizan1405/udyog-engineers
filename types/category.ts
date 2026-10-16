import { ContentStatus } from "./content";

/**
 * Category data model for Udyog Engineers equipment categories.
 */

export interface ProductSubcategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  order?: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  image: string;
  heroImage: string;
  icon?: string;
  order: number;
  domain?: string;
  applicationContexts?: string[];
  status?: ContentStatus;
  subcategories?: ProductSubcategory[];
}
