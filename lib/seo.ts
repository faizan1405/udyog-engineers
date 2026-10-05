import { siteConfig } from "@/config/site";
import { Product } from "@/types/product";
import { ProductCategory } from "@/types/category";

/**
 * Technical SEO & Structured Data (JSON-LD) generators.
 * Adheres strictly to Schema.org standards without inventing business details.
 */

export function generateOrganizationJsonLd() {
  const hasPhone =
    Boolean(siteConfig.contact.phone) &&
    !siteConfig.contact.phone.toUpperCase().includes("TODO");
  const hasEmail =
    Boolean(siteConfig.contact.email) &&
    !siteConfig.contact.email.toUpperCase().includes("TODO");
  const hasAddress =
    Boolean(siteConfig.contact.address.line1) &&
    !siteConfig.contact.address.line1.toUpperCase().includes("TODO");

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.companyName || siteConfig.siteName,
    description: siteConfig.siteDescription,
    url: siteConfig.domain,
    logo: `${siteConfig.domain}/images/brand/logo.png`,
    ...(hasPhone ? { telephone: `+91-${siteConfig.contact.phone.replace(/\s+/g, "")}` } : {}),
    ...(hasEmail ? { email: siteConfig.contact.email } : {}),
    ...(hasAddress
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: siteConfig.contact.address.line1,
            ...(siteConfig.contact.address.city
              ? { addressLocality: siteConfig.contact.address.city }
              : {}),
            ...(siteConfig.contact.address.state
              ? { addressRegion: siteConfig.contact.address.state }
              : {}),
            ...(siteConfig.contact.address.postalCode
              ? { postalCode: siteConfig.contact.address.postalCode }
              : {}),
            addressCountry: siteConfig.contact.address.country || "India",
          },
        }
      : {}),
  };
}

export function generateProductJsonLd(product: Product) {
  // Exclude demo placeholder products from emitting production structured data
  if (product.isDemoPlaceholder) {
    return null;
  }

  const imageUrl = product.heroImage
    ? product.heroImage.startsWith("http")
      ? product.heroImage
      : `${siteConfig.domain}${product.heroImage}`
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    ...(product.model ? { model: product.model } : {}),
    ...(product.category ? { category: product.category } : {}),
    ...(imageUrl ? { image: imageUrl } : {}),
    ...(product.specifications && product.specifications.length > 0
      ? {
          additionalProperty: product.specifications.map((spec) => ({
            "@type": "PropertyValue",
            name: spec.label,
            value: spec.unit ? `${spec.value} ${spec.unit}` : spec.value,
          })),
        }
      : {}),
  };
}

export function generateCategoryJsonLd(
  category: ProductCategory,
  products?: Product[]
) {
  const productionProducts =
    products?.filter((p) => !p.isDemoPlaceholder) || [];

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} Equipment | ${siteConfig.siteName}`,
    description: category.description,
    url: `${siteConfig.domain}/categories/${category.slug}`,
    ...(productionProducts.length > 0
      ? {
          mainEntity: {
            "@type": "ItemList",
            itemListElement: productionProducts.map((p, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${siteConfig.domain}/products/${p.slug}`,
              name: p.name,
            })),
          },
        }
      : {}),
  };
}

export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${siteConfig.domain}${item.url}`,
    })),
  };
}
