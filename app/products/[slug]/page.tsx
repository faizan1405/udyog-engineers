import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import {
  getProductBySlug,
  getAllProductSlugs,
  getRelatedProducts,
} from "@/data/products";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Section } from "@/components/ui/Section";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductHighlights } from "@/components/products/ProductHighlights";
import { SpecificationTable } from "@/components/products/SpecificationTable";
import { ProductFeatures } from "@/components/products/ProductFeatures";
import { ProductApplications } from "@/components/products/ProductApplications";
import { RelatedEquipment } from "@/components/products/RelatedEquipment";
import { generateProductJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";
import {
  ShieldCheck,
  FileText,
  Compass,
  Phone,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Udyog Engineers",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const isDemo = Boolean(product.isDemoPlaceholder);
  const title = product.model
    ? `${product.name} (${product.model}) | Udyog Engineers`
    : `${product.name} | Udyog Engineers`;

  return {
    title,
    description: product.shortDescription,
    robots: isDemo
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
        },
    alternates: isDemo
      ? undefined
      : {
          canonical: `/products/${product.slug}`,
        },
    openGraph: {
      title,
      description: product.shortDescription,
      url: `/products/${product.slug}`,
      type: "website",
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const isDemo = Boolean(product.isDemoPlaceholder);
  const relatedProducts = getRelatedProducts(product, 3);

  // SEO Structured Data (excluded for demo placeholder products)
  const productJsonLd = !isDemo ? generateProductJsonLd(product) : null;
  const breadcrumbJsonLd = !isDemo
    ? generateBreadcrumbJsonLd([
        { name: "Home", url: "/" },
        { name: "Categories", url: "/categories" },
        {
          name: product.category,
          url: `/categories/${product.categorySlug}`,
        },
        { name: product.name, url: `/products/${product.slug}` },
      ])
    : null;

  // Official client-formatted WhatsApp Inquiry URL:
  // "Hello Udyog Engineers India, I am interested in the {productName}. Please share more details and availability."
  const whatsAppUrl = buildWhatsAppInquiryUrl({
    productName: product.name,
  });

  return (
    <div className="bg-background min-h-screen">
      {/* Structured Data */}
      {productJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      )}
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      )}

      {/* Breadcrumb Navigation Bar */}
      <div className="border-b border-border/80 bg-surface-secondary/40 py-2">
        <Container>
          <Breadcrumb
            items={[
              { label: "Categories", href: "/categories" },
              {
                label: product.category,
                href: `/categories/${product.categorySlug}`,
              },
              ...(product.subcategory
                ? [
                    {
                      label: product.subcategory,
                      href: `/categories/${product.categorySlug}?subcategory=${product.subcategorySlug || ""}`,
                    },
                  ]
                : []),
              { label: product.name },
            ]}
          />
        </Container>
      </div>

      {/* 1. PRODUCT HERO & OVERVIEW */}
      <Section variant="default" className="py-8 sm:py-12 lg:py-16">
        <Container>
          {/* Header Block: Brand -> Series -> Product Name */}
          <div className="border-b border-border/80 pb-6 mb-8 sm:mb-10">
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs font-sans mb-3 text-text-secondary">
              <Link
                href={`/categories/${product.categorySlug}`}
                className="text-brand-green font-semibold hover:underline flex items-center gap-1.5"
              >
                <Compass className="w-4 h-4 text-brand-green" />
                <span>{product.category}</span>
              </Link>
              {product.subcategory && (
                <>
                  <span className="text-border-strong select-none" aria-hidden="true">
                    /
                  </span>
                  <Link
                    href={`/categories/${product.categorySlug}?subcategory=${product.subcategorySlug || ""}`}
                    className="hover:text-text-primary transition-colors"
                  >
                    {product.subcategory}
                  </Link>
                </>
              )}
              {product.brand && (
                <>
                  <span className="text-border-strong select-none" aria-hidden="true">
                    /
                  </span>
                  <span className="font-semibold text-text-primary">{product.brand}</span>
                </>
              )}
              {product.series && (
                <>
                  <span className="text-border-strong select-none" aria-hidden="true">
                    /
                  </span>
                  <span className="text-text-muted">{product.series}</span>
                </>
              )}
              {product.model && (
                <>
                  <span className="text-border-strong select-none" aria-hidden="true">
                    •
                  </span>
                  <span className="text-text-muted">
                    Model:{" "}
                    <span className="text-text-primary font-mono font-semibold">
                      {product.model}
                    </span>
                  </span>
                </>
              )}
            </div>

            <h1 className="text-[32px] sm:text-[40px] md:text-[46px] lg:text-[52px] font-semibold font-display text-text-primary tracking-[-0.03em] leading-[1.08]">
              {product.name}
            </h1>
          </div>

          {/* Asymmetric Product Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Dominant Hardware Imaging Canvas */}
            <div className="lg:col-span-7">
              <ProductGallery product={product} />
            </div>

            {/* Right: Product Details & Action Panel */}
            <div className="lg:col-span-5 space-y-6">
              {/* Short Description */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-sans text-brand-green font-semibold">
                  <span className="w-2 h-2 rounded-full bg-brand-green" />
                  <span>Equipment Summary</span>
                </div>
                <p className="font-sans text-base sm:text-lg text-text-secondary leading-[1.65]">
                  {product.shortDescription}
                </p>
              </div>

              {/* Action Block: Inquire on WhatsApp */}
              <div className="p-6 bg-surface-secondary/70 border border-border/80 rounded-2xl space-y-4 shadow-xs">
                <div className="flex items-center justify-between text-xs font-sans text-text-muted">
                  <span className="font-semibold text-text-primary">
                    Procurement Inquiry
                  </span>
                  <span>Direct WhatsApp Channel</span>
                </div>

                <p className="font-sans text-sm text-text-secondary leading-[1.6]">
                  Connect directly with our engineering desk on WhatsApp for formal quotations, technical specifications, and delivery timelines.
                </p>

                <div className="flex flex-col gap-3 pt-1">
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 min-h-[48px] bg-accent-whatsapp text-white font-sans text-[15px] font-semibold rounded-xl hover:bg-emerald-700 transition-colors shadow-xs tracking-normal"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    <span>Inquire on WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${siteConfig.contact.phones[0]?.international || siteConfig.contact.phone}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[48px] bg-surface border border-border/80 text-text-primary font-sans text-[15px] font-semibold rounded-xl hover:bg-surface-secondary transition-colors tracking-normal"
                  >
                    <Phone className="w-4 h-4 text-brand-green" />
                    <span>Call {siteConfig.contact.phones[0]?.display || siteConfig.contact.phone}</span>
                  </a>
                </div>
              </div>

              {/* Technical Identity Card */}
              <div className="border border-border/80 bg-surface rounded-2xl p-5 text-xs font-sans space-y-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-border/70 pb-2.5 text-[11px] text-text-muted">
                  <span className="font-semibold text-text-primary">Equipment Details</span>
                  {product.verificationStatus === "generic-product" ? (
                    <span className="text-brand-green font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
                      <span>Field Equipment Spec</span>
                    </span>
                  ) : (
                    <span className="text-brand-green font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
                      <span>Institutional Equipment Spec</span>
                    </span>
                  )}
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Discipline:</span>
                    <span className="text-text-primary font-medium text-xs sm:text-[13px]">
                      {product.category}
                    </span>
                  </div>

                  {product.subcategory && (
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">Subcategory:</span>
                      <span className="text-text-primary font-medium text-xs sm:text-[13px]">
                        {product.subcategory}
                      </span>
                    </div>
                  )}

                  {product.brand && (
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">Brand:</span>
                      <span className="text-text-primary font-medium text-xs sm:text-[13px]">
                        {product.brand}
                      </span>
                    </div>
                  )}

                  {product.series && (
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">Series:</span>
                      <span className="text-text-primary text-xs sm:text-[13px]">
                        {product.series}
                      </span>
                    </div>
                  )}

                  {product.model && (
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">Model Reference:</span>
                      <span className="text-brand-green font-mono font-semibold text-xs">
                        {product.model}
                      </span>
                    </div>
                  )}

                  {product.variant && (
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">Configuration:</span>
                      <span className="text-text-primary text-xs sm:text-[13px]">
                        {product.variant}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Inquiry Channel:</span>
                    <span className="text-text-primary text-xs sm:text-[13px] font-semibold text-emerald-800">
                      WhatsApp Direct
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Documentation:</span>
                    {product.datasheet ? (
                      <a
                        href={product.datasheet}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-green hover:underline flex items-center gap-1 font-semibold text-xs"
                      >
                        <FileText className="w-3.5 h-3.5 text-brand-green" />
                        <span>Download Datasheet (PDF)</span>
                      </a>
                    ) : (
                      <span className="text-text-primary text-xs flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-brand-green" />
                        <span>Available on WhatsApp</span>
                      </span>
                    )}
                  </div>

                  {product.manufacturerSource && (
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">Verified Reference:</span>
                      <a
                        href={product.manufacturerSource}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-green hover:underline font-medium text-xs truncate max-w-[190px]"
                      >
                        <span>Official Source ↗</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Verified Trust Micro Badges */}
              <div className="flex items-center gap-4 text-xs font-sans text-text-muted pt-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-green" />
                  <span>Verified Specifications</span>
                </div>
                <span>•</span>
                <div>Field-Calibrated Hardware</div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. KEY HIGHLIGHTS SECTION */}
      {product.highlights && product.highlights.length > 0 && (
        <Section variant="secondary" className="border-t border-border/80 py-10 sm:py-14">
          <Container>
            <ProductHighlights highlights={product.highlights} />
          </Container>
        </Section>
      )}

      {/* 3. TECHNICAL SPECIFICATIONS MATRIX */}
      <Section
        id="specifications-section"
        variant="default"
        className="border-t border-border/80 py-10 sm:py-14"
      >
        <Container>
          <div className="max-w-4xl space-y-5">
            <div className="flex items-center justify-between border-b border-border/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-green" />
                <span className="text-xs font-sans text-text-secondary font-semibold uppercase tracking-wider">
                  Technical Parameters
                </span>
              </div>
              <span className="font-sans text-xs text-text-muted">
                Confirmed Parameters ·{" "}
                <span className="font-mono">{String(product.specifications?.length || 0).padStart(2, "0")}</span>
              </span>
            </div>

            <div className="space-y-1.5">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold font-display text-text-primary tracking-[-0.025em]">
                Technical Specifications
              </h2>
              <p className="text-sm sm:text-base font-sans text-text-secondary leading-[1.6]">
                Calibrated parameters and verified specification values for model{" "}
                <span className="font-mono font-medium text-text-primary">
                  {product.model || product.name}
                </span>
                .
              </p>
            </div>

            <div className="pt-2">
              <SpecificationTable specifications={product.specifications} />
            </div>
          </div>
        </Container>
      </Section>

      {/* 4. FEATURES & APPLICATIONS */}
      {((product.features && product.features.length > 0) ||
        (product.applications && product.applications.length > 0)) && (
        <Section
          variant="secondary"
          className="border-t border-border/80 py-10 sm:py-14 space-y-12"
        >
          <Container className="space-y-12">
            {product.features && product.features.length > 0 && (
              <ProductFeatures features={product.features} />
            )}

            {product.applications && product.applications.length > 0 && (
              <ProductApplications applications={product.applications} />
            )}
          </Container>
        </Section>
      )}

      {/* 5. WHATSAPP PRODUCT INQUIRY EXPERIENCE */}
      <Section
        id="inquiry-section"
        variant="default"
        className="border-t border-border/80 py-12 sm:py-18"
      >
        <Container className="max-w-3xl">
          <div className="p-8 sm:p-10 bg-surface border border-border/80 rounded-2xl shadow-xs space-y-6">
            <div className="flex items-center gap-2 text-xs font-sans text-brand-green font-semibold">
              <WhatsAppIcon className="w-4 h-4 text-accent-whatsapp" />
              <span>Direct WhatsApp Inquiry</span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold font-display text-text-primary tracking-[-0.025em]">
                Inquire About {product.name}
              </h2>
              <p className="mt-2 text-sm sm:text-base font-sans text-text-secondary leading-[1.6]">
                Connect directly with our engineering and procurement desk on WhatsApp. We provide prompt technical guidance, datasheets, institutional pricing, and availability confirmation.
              </p>
            </div>

            <div className="p-4 sm:p-5 bg-surface-secondary/70 border border-border/70 rounded-xl space-y-2.5">
              <div className="text-xs font-sans text-text-muted font-medium">
                Your WhatsApp message will open prefilled with:
              </div>
              <div className="p-3 bg-surface border border-border/80 rounded-lg font-sans text-sm text-text-primary">
                &ldquo;Hello Udyog Engineers India, I am interested in the {product.name}. Please share more details and availability.&rdquo;
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[50px] flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-accent-whatsapp text-white font-sans text-[15px] font-semibold rounded-xl hover:bg-emerald-700 transition-colors shadow-xs"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Inquire on WhatsApp</span>
              </a>

              <a
                href={`tel:${siteConfig.contact.phones[0]?.international || siteConfig.contact.phone}`}
                className="min-h-[50px] inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-surface-secondary border border-border/80 text-text-primary font-sans text-[15px] font-semibold rounded-xl hover:bg-surface-tertiary transition-colors"
              >
                <Phone className="w-4 h-4 text-brand-green" />
                <span>Call {siteConfig.contact.phones[0]?.display || siteConfig.contact.phone}</span>
              </a>
            </div>

            <div className="pt-4 border-t border-border/70 flex flex-wrap items-center justify-between gap-3 text-xs font-sans text-text-muted">
              <span>Primary WhatsApp: +91 98183 20178</span>
              <span>•</span>
              <span>Secondary: +91 95559 03186</span>
              <span>•</span>
              <span>Official Email: {siteConfig.contact.email}</span>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. RELATED PRODUCTS */}
      <Section
        variant="secondary"
        className="border-t border-border/80 py-12 sm:py-16"
      >
        <Container>
          <RelatedEquipment
            product={product}
            relatedProducts={relatedProducts}
          />
        </Container>
      </Section>
    </div>
  );
}
