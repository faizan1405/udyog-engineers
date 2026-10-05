import { Product } from "@/types/product";

/**
 * PRODUCT DATA REPOSITORY
 *
 * IMPORTANT NOTICE:
 * Do NOT invent actual commercial product information or manufacturer claims.
 * The entries below are strictly temporary DEMO PLACEHOLDERS solely for testing
 * dynamic routing, layout rendering, and schema validation.
 * Real equipment data and specifications will be populated during the data entry stage.
 */
export const PRODUCTS: Product[] = [
  {
    id: "demo-optics-001",
    name: "[DEMO PLACEHOLDER] Precision Survey Binocular 10x42",
    slug: "demo-precision-survey-binocular-10x42",
    category: "Optics",
    categorySlug: "optics",
    model: "DEMO-OPT-1042",
    shortDescription:
      "[DEMO PLACEHOLDER] High-definition optical survey binocular with multicoated prism for field inspection.",
    description:
      "THIS IS A TEMPORARY DEMO PLACEHOLDER PRODUCT. Designed to test the dynamic route `/products/[slug]`. No actual specifications or claims are represented here. Real product catalogues and technical datasheets will be added in subsequent phases.",
    heroImage: "/images/products/placeholder-product.svg",
    gallery: [
      "/images/products/placeholder-product.svg",
      "/images/products/placeholder-product.svg",
    ],
    highlights: [
      "DEMO HIGHLIGHT: Dielectric multicoated optics",
      "DEMO HIGHLIGHT: Nitrogen-purged IP67 waterproof housing",
      "DEMO HIGHLIGHT: Integrated tactical reticle scale",
    ],
    specifications: [
      { label: "Magnification", value: "10x" },
      { label: "Objective Lens Diameter", value: "42 mm" },
      { label: "Prism Type", value: "Roof (BaK-4)" },
      { label: "Field of View", value: "114m @ 1000m" },
      { label: "Operating Temperature", value: "-20°C to +55°C" },
      { label: "Weight", value: "780 g" },
    ],
    features: [
      "DEMO FEATURE: High-transmission multi-coating",
      "DEMO FEATURE: Rugged rubberized armour chassis",
      "DEMO FEATURE: Tripod mounting interface",
    ],
    applications: [
      "DEMO APPLICATION: Topographic land inspection",
      "DEMO APPLICATION: Environmental wildlife census",
      "DEMO APPLICATION: Tactical perimeter assessment",
    ],
    relatedProducts: ["demo-thermal-imager-640"],
    featured: true,
    inquiryLabel: "Inquire About Model DEMO-OPT-1042",
    status: "development-placeholder",
    isDemoPlaceholder: true,
  },
  {
    id: "demo-thermal-002",
    name: "[DEMO PLACEHOLDER] Handheld Thermal Imager 640",
    slug: "demo-handheld-thermal-imager-640",
    category: "Thermal",
    categorySlug: "thermal",
    model: "DEMO-THM-640",
    shortDescription:
      "[DEMO PLACEHOLDER] Uncooled microbolometer handheld thermal imaging device for heat leak and surveillance.",
    description:
      "THIS IS A TEMPORARY DEMO PLACEHOLDER PRODUCT. Designed to test multi-category dynamic routes and specification matrices. Replace with authentic manufacturer specifications upon client datasheet submission.",
    heroImage: "/images/products/placeholder-product.svg",
    gallery: [
      "/images/products/placeholder-product.svg",
      "/images/products/placeholder-product.svg",
    ],
    highlights: [
      "DEMO HIGHLIGHT: 640x512 resolution sensor matrix",
      "DEMO HIGHLIGHT: <35mK thermal sensitivity NETD",
      "DEMO HIGHLIGHT: Dual spectral image blending",
    ],
    specifications: [
      { label: "Sensor Resolution", value: "640 × 512 pixels" },
      { label: "Spectral Range", value: "8–14 μm" },
      { label: "Thermal Sensitivity (NETD)", value: "< 35 mK" },
      { label: "Display", value: "OLED 1024 × 768" },
      { label: "Battery Life", value: "Up to 8 hours" },
      { label: "Ingress Protection", value: "IP66" },
    ],
    features: [
      "DEMO FEATURE: Real-time radiometric thermal measurement",
      "DEMO FEATURE: Integrated laser rangefinder support",
      "DEMO FEATURE: Digital zoom 1x - 8x continuous",
    ],
    applications: [
      "DEMO APPLICATION: Industrial thermal diagnostics",
      "DEMO APPLICATION: Electrical switchgear audit",
      "DEMO APPLICATION: Search and rescue operations",
    ],
    relatedProducts: ["demo-precision-survey-binocular-10x42"],
    featured: true,
    inquiryLabel: "Inquire About Model DEMO-THM-640",
    status: "development-placeholder",
    isDemoPlaceholder: true,
  },
];

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

/**
 * Returns only genuine production catalogue items, strictly excluding temporary demo placeholders.
 */
export function getProductionProducts(): Product[] {
  return PRODUCTS.filter((p) => !p.isDemoPlaceholder);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter(
    (p) => p.categorySlug.toLowerCase() === categorySlug.toLowerCase()
  );
}

/**
 * Returns production products for a specific category, excluding demo placeholders.
 */
export function getProductionProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter(
    (p) => !p.isDemoPlaceholder && p.categorySlug.toLowerCase() === categorySlug.toLowerCase()
  );
}

/**
 * Featured product logic intended for production showcase.
 * Demo placeholders are strictly excluded.
 */
export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured && !p.isDemoPlaceholder);
}

/**
 * Related product recommendations intended for production.
 * Demo placeholders are strictly excluded from recommendations.
 */
export function getRelatedProducts(product: Product, limit: number = 3): Product[] {
  if (product.isDemoPlaceholder) return [];

  const explicitRelated = PRODUCTS.filter(
    (p) =>
      !p.isDemoPlaceholder &&
      p.slug.toLowerCase() !== product.slug.toLowerCase() &&
      product.relatedProducts.some(
        (rel) => rel.toLowerCase() === p.slug.toLowerCase() || rel.toLowerCase() === p.id.toLowerCase()
      )
  );

  if (explicitRelated.length >= limit) {
    return explicitRelated.slice(0, limit);
  }

  // Fallback to same-category verified equipment
  const categoryRelated = PRODUCTS.filter(
    (p) =>
      !p.isDemoPlaceholder &&
      p.slug.toLowerCase() !== product.slug.toLowerCase() &&
      p.categorySlug.toLowerCase() === product.categorySlug.toLowerCase() &&
      !explicitRelated.some((item) => item.slug.toLowerCase() === p.slug.toLowerCase())
  );

  return [...explicitRelated, ...categoryRelated].slice(0, limit);
}

export function getAllProductSlugs(): string[] {
  return PRODUCTS.map((p) => p.slug);
}
