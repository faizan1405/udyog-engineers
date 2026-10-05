import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import {
  getProductBySlug,
  getAllProductSlugs,
  getRelatedProducts,
} from "@/data/products";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Section } from "@/components/ui/Section";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductHighlights } from "@/components/products/ProductHighlights";
import { SpecificationTable } from "@/components/products/SpecificationTable";
import { ProductFeatures } from "@/components/products/ProductFeatures";
import { ProductApplications } from "@/components/products/ProductApplications";
import { RelatedEquipment } from "@/components/products/RelatedEquipment";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { generateProductJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";
import {
  ArrowDown,
  AlertTriangle,
  ShieldCheck,
  FileText,
  Compass,
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

  // WhatsApp Inquiry URL (null if WhatsApp is not configured in siteConfig)
  const whatsAppUrl = buildWhatsAppInquiryUrl({
    productName: product.name,
    productModel: product.model,
    categoryName: product.category,
    customMessage: product.model
      ? `Hello, I am interested in ${product.name} [${product.model}]. Please share more details.`
      : `Hello, I am interested in ${product.name}. Please share more details.`,
  });

  return (
    <div className="bg-background min-h-screen">
      {/* Structured Data (Production verified items only) */}
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
      <div className="border-b border-border bg-surface-secondary/40 py-1">
        <Container>
          <Breadcrumb
            items={[
              { label: "Categories", href: "/categories" },
              {
                label: product.category,
                href: `/categories/${product.categorySlug}`,
              },
              { label: product.name },
            ]}
          />
        </Container>
      </div>

      {/* Demo Notice Banner (Visible only for staged development items) */}
      {isDemo && (
        <div className="border-b border-amber-300 bg-amber-50/90 text-amber-950 py-3.5 px-4 text-xs">
          <Container>
            <div className="flex items-start sm:items-center gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5 sm:mt-0" />
              <div className="space-y-0.5">
                <p className="font-mono text-[11px] uppercase tracking-wider font-bold text-amber-900">
                  INTERNAL BENCHMARK {"//"} STAGED DEMO RECORD
                </p>
                <p className="text-xs text-amber-800 leading-relaxed">
                  This product record is staged for development routing and schema validation. Specifications and copy are temporary development placeholders. Excluded from production indexing, public sitemaps, and commercial procurement catalogues.
                </p>
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* 1. PRODUCT HERO & IDENTITY DOSSIER */}
      <Section variant="default" className="py-6 sm:py-10 lg:py-12">
        <Container>
          {/* Product Header / Title Block */}
          <div className="border-b border-border pb-5 mb-8">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono mb-2.5">
              <Link
                href={`/categories/${product.categorySlug}`}
                className="text-accent-secondary uppercase tracking-wider font-semibold hover:underline flex items-center gap-1.5"
              >
                <Compass className="w-3.5 h-3.5 text-accent-secondary" />
                <span>{product.category} {"//"} PRODUCT DOSSIER</span>
              </Link>
              {product.model && (
                <>
                  <span className="text-border-strong select-none" aria-hidden="true">
                    /
                  </span>
                  <span className="text-text-muted uppercase tracking-wider">
                    MODEL {"//"}{" "}
                    <span className="text-text-primary font-semibold">
                      {product.model}
                    </span>
                  </span>
                </>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-text-primary tracking-tight">
              {product.name}
            </h1>
          </div>

          {/* Asymmetric Dossier Composition: Dominant Visual + Structured Dossier */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Dominant Hardware Imaging Canvas */}
            <div className="lg:col-span-7">
              <ProductGallery product={product} />
            </div>

            {/* Right: Technical Dossier Identity & Action Panel */}
            <div className="lg:col-span-5 space-y-6">
              {/* Short Verified Description */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] font-mono text-text-muted uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary" />
                  <span>EQUIPMENT CLASSIFICATION SUMMARY</span>
                </div>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  {product.shortDescription}
                </p>
              </div>

              {/* Action Block: Send Inquiry + WhatsApp (when configured) */}
              <div className="p-5 bg-surface-secondary/70 border border-border rounded-[2px] space-y-3.5 shadow-[0_1px_3px_rgba(20,23,21,0.02)]">
                <div className="flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <span className="font-semibold text-text-primary uppercase tracking-wider">
                    PROCUREMENT INQUIRY
                  </span>
                  <span>B2B / INSTITUTIONAL</span>
                </div>

                <p className="text-xs text-text-secondary leading-relaxed">
                  Direct engineer-to-engineer quotation and datasheet distribution. Submit your required quantities, project parameters, or tender specifications.
                </p>

                <div className="flex flex-col gap-2.5 pt-1">
                  <a
                    href="#inquiry-section"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[48px] bg-accent text-white text-xs sm:text-sm font-semibold rounded-[2px] hover:bg-accent-hover transition-colors duration-200 ease-precision shadow-xs"
                  >
                    <span>Send Inquiry</span>
                    <ArrowDown className="w-4 h-4" />
                  </a>

                  {whatsAppUrl && (
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[48px] bg-surface border border-border-strong text-text-primary text-xs sm:text-sm font-semibold rounded-[2px] hover:bg-surface-secondary transition-colors duration-200 ease-precision"
                    >
                      <WhatsAppIcon className="w-4 h-4 text-accent-whatsapp" />
                      <span>Inquire via WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Technical Identity Meta Matrix */}
              <div className="border border-border bg-surface rounded-[2px] p-4 text-xs font-mono space-y-2.5 shadow-[0_1px_2px_rgba(20,23,21,0.02)]">
                <div className="flex items-center justify-between border-b border-border pb-2 text-[10px] text-text-muted uppercase">
                  <span>METROLOGY DOSSIER</span>
                  <span>STATUS: RECORD ACTIVE</span>
                </div>

                <div className="space-y-2 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">DISCIPLINE:</span>
                    <span className="text-text-primary font-medium">
                      {product.category}
                    </span>
                  </div>

                  {product.model && (
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">MODEL CODE:</span>
                      <span className="text-accent-secondary font-semibold">
                        {product.model}
                      </span>
                    </div>
                  )}

                  {product.manufacturer && (
                    <div className="flex items-center justify-between">
                      <span className="text-text-muted">MANUFACTURER:</span>
                      <span className="text-text-primary font-medium">
                        {product.manufacturer}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">SUPPLY MODE:</span>
                    <span className="text-text-primary">
                      Direct Quotation / Inquiry
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">DOCUMENTATION:</span>
                    {product.datasheet ? (
                      <a
                        href={product.datasheet}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline flex items-center gap-1 font-medium"
                      >
                        <FileText className="w-3 h-3 text-accent" />
                        <span>Download Datasheet (PDF)</span>
                      </a>
                    ) : (
                      <span className="text-text-primary flex items-center gap-1">
                        <FileText className="w-3 h-3 text-accent-secondary" />
                        <span>Available on Inquiry</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Verified Trust / Quality Assurance Micro Badges */}
              <div className="flex items-center gap-4 text-[11px] font-mono text-text-muted pt-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span>Verified Specifications</span>
                </div>
                <span>·</span>
                <div>Field-Calibrated Hardware</div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 2. KEY HIGHLIGHTS SECTION (Rendered only when verified highlights exist) */}
      {product.highlights && product.highlights.length > 0 && (
        <Section variant="secondary" className="border-t border-border py-8 sm:py-12">
          <Container>
            <ProductHighlights highlights={product.highlights} />
          </Container>
        </Section>
      )}

      {/* 3. TECHNICAL SPECIFICATIONS MATRIX */}
      <Section
        id="specifications-section"
        variant="default"
        className="border-t border-border py-8 sm:py-12"
      >
        <Container>
          <div className="max-w-4xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary" />
                <span className="text-xs font-mono uppercase tracking-wider text-text-secondary font-semibold">
                  METROLOGY MATRIX {"//"} SPECIFICATIONS
                </span>
              </div>
              <span className="font-mono text-[10px] text-text-muted">
                CONFIRMED PARAMETERS {"//"}{" "}
                {String(product.specifications?.length || 0).padStart(2, "0")}
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-text-primary tracking-tight">
                Technical Specifications
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                Calibrated parameters and verified metrology values for model{" "}
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

      {/* 4. FEATURES & APPLICATIONS (Rendered only when verified data exists) */}
      {((product.features && product.features.length > 0) ||
        (product.applications && product.applications.length > 0)) && (
        <Section
          variant="secondary"
          className="border-t border-border py-8 sm:py-12 space-y-10"
        >
          <Container className="space-y-10">
            {product.features && product.features.length > 0 && (
              <ProductFeatures features={product.features} />
            )}

            {product.applications && product.applications.length > 0 && (
              <ProductApplications applications={product.applications} />
            )}
          </Container>
        </Section>
      )}

      {/* 5. PRODUCT INQUIRY EXPERIENCE */}
      <Section
        id="inquiry-section"
        variant="default"
        className="border-t border-border py-10 sm:py-16"
      >
        <Container className="max-w-3xl">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-[11px] font-mono text-accent-secondary uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary" />
              <span>DIRECT PROCUREMENT {"//"} TECHNICAL INQUIRY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-text-primary tracking-tight">
              Need Details About This Equipment?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-text-secondary leading-relaxed">
              Share the product reference, required specification or intended application. Pre-configured with reference parameters for{" "}
              <strong className="text-text-primary font-semibold">
                {product.name}
              </strong>
              {product.model ? ` (${product.model})` : ""}.
            </p>
          </div>

          <InquiryForm
            initialProduct={
              product.model
                ? `${product.name} [Model: ${product.model}]`
                : product.name
            }
            initialProductModel={product.model}
            initialCategory={product.category}
            hideHeader
          />
        </Container>
      </Section>

      {/* 6. RELATED PRODUCTS OR CATEGORY EXPLORATION */}
      <Section
        variant="secondary"
        className="border-t border-border py-10 sm:py-14"
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
