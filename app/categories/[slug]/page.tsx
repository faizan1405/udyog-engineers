import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Binoculars,
  Navigation,
  Eye,
  Flame,
  Compass,
  Tent,
  CloudSun,
  Trees,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { isStagingOrDevelopment } from "@/lib/staging";
import {
  getCategoryBySlug,
  getAllCategorySlugs,
  getPreviousCategory,
  getNextCategory,
} from "@/data/categories";
import { getProductionProductsByCategory } from "@/data/products";
import { ProductCategory } from "@/types/category";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { generateCategoryJsonLd } from "@/lib/seo";
import { buildWhatsAppInquiryUrl, isWhatsAppConfigured } from "@/lib/whatsapp";
import { assetPath } from "@/lib/utils";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Binoculars,
  Navigation,
  Eye,
  Flame,
  Compass,
  Tent,
  CloudSun,
  Trees,
};

export async function generateStaticParams() {
  const slugs = getAllCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found | Udyog Engineers",
    };
  }

  return {
    title: `${category.name} Equipment | Udyog Engineers`,
    description: category.shortDescription || category.description,
    alternates: {
      canonical: `/categories/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} Equipment | Udyog Engineers`,
      description: category.shortDescription || category.description,
    },
  };
}

/**
 * Technical Hardware Dossier Plate for Category Detail Hero.
 * Designed so official hardware photography drops in via `category.heroImage`
 * without modifying layout or framing.
 */
function CategoryHeroPlate({ category }: { category: ProductCategory }) {
  const IconComponent = (category.icon && ICON_MAP[category.icon]) || Compass;
  const indexStr = String(category.order).padStart(2, "0");

  return (
    <div className="relative w-full border border-border bg-surface rounded-[2px] overflow-hidden shadow-[0_1px_3px_rgba(20,23,21,0.03)]">
      {/* 4 Corner Crosshairs */}
      <span
        aria-hidden="true"
        className="absolute top-2 left-2 font-mono text-[9px] text-accent-secondary/50 select-none z-20"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="absolute top-2 right-2 font-mono text-[9px] text-accent-secondary/50 select-none z-20"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-2 left-2 font-mono text-[9px] text-accent-secondary/50 select-none z-20"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-2 right-2 font-mono text-[9px] text-accent-secondary/50 select-none z-20"
      >
        +
      </span>

      {/* Top Telemetry Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface-secondary/70 text-[10px] font-mono text-text-muted">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary" />
          <span className="uppercase tracking-wider font-medium text-text-primary">
            DOSSIER // DISCIPLINE {indexStr}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>PORTFOLIO REF // 0{category.order}</span>
        </div>
      </div>

      {/* Main Visual Staging Canvas */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] w-full flex items-center justify-center p-6 bg-gradient-to-b from-surface to-surface-secondary/40 overflow-hidden">
        {/* Subtle Grid Lines */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.35] bg-[linear-gradient(to_right,#E2DFD6_1px,transparent_1px),linear-gradient(to_bottom,#E2DFD6_1px,transparent_1px)] bg-[size:32px_32px]"
        />

        {/* Concentric Optical Reticle */}
        <svg
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-25 stroke-border-strong"
          viewBox="0 0 600 400"
          fill="none"
        >
          <circle cx="300" cy="200" r="140" strokeDasharray="3 3" />
          <circle cx="300" cy="200" r="90" />
          <line x1="300" y1="40" x2="300" y2="360" strokeDasharray="4 4" />
          <line x1="140" y1="200" x2="460" y2="200" strokeDasharray="4 4" />
        </svg>

        {/* Central Tactical Icon Focus Badge */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[2px] bg-surface border border-border shadow-xs flex items-center justify-center mb-3">
            <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />
          </div>
          <span className="font-mono text-xs uppercase tracking-widest text-text-primary font-semibold">
            {category.name}
          </span>
          <span className="font-mono text-[11px] text-text-muted mt-0.5">
            {category.domain || "Technical Instrumentation Portfolio"}
          </span>

          {isStagingOrDevelopment() && (
            <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-surface/90 border border-border text-[10px] font-mono text-text-muted rounded-[2px]">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary" />
              <span>TEMPORARY ASSET // OFFICIAL PHOTOGRAPHY PENDING</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Technical Metadata Rule */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-surface-secondary/40 text-[10px] font-mono text-text-muted">
        <span>CLASSIFICATION: FIELD INSTRUMENTATION</span>
        <span>ORDER // {indexStr} OF 08</span>
      </div>
    </div>
  );
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  // Filter ONLY production products (excludes demo placeholders)
  const productionProducts = getProductionProductsByCategory(category.slug);
  const jsonLd = generateCategoryJsonLd(category, productionProducts);

  const prevCategory = getPreviousCategory(category);
  const nextCategory = getNextCategory(category);

  const whatsAppEnabled = isWhatsAppConfigured();
  const whatsAppUrl = whatsAppEnabled
    ? buildWhatsAppInquiryUrl({ categoryName: category.name })
    : null;

  const indexStr = String(category.order).padStart(2, "0");

  return (
    <div className="bg-background min-h-screen">
      {/* JSON-LD Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* =========================================================================
          CATEGORY DETAIL HERO SECTION
          Breadcrumbs, taxonomy badge, large title, description, and visual plate
         ========================================================================= */}
      <section
        aria-labelledby="category-title"
        className="border-b border-border bg-surface py-8 sm:py-12 lg:py-16"
      >
        <Container>
          {/* Breadcrumb Navigation */}
          <Breadcrumb
            items={[
              { label: "Categories", href: "/categories" },
              { label: category.name },
            ]}
            className="mb-4 sm:mb-6"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* LEFT (7 cols): Editorial Category Introduction */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Registration Taxon */}
              <div className="flex items-center gap-2 font-mono text-xs text-accent-secondary tracking-wider uppercase mb-3">
                <span className="font-semibold">{`DISCIPLINE ${indexStr} // 08`}</span>
                <span className="text-border-strong">|</span>
                <span className="text-text-muted">
                  {category.domain || "EQUIPMENT PORTFOLIO"}
                </span>
              </div>

              {/* Title */}
              <h1
                id="category-title"
                className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-text-primary tracking-tight leading-[1.12]"
              >
                {category.name}
              </h1>

              {/* Short Domain Description */}
              <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed mt-4 max-w-xl">
                {category.description}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href={`/contact?subject=inquiry-${category.slug}`}
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-display font-semibold text-xs tracking-wider uppercase rounded-[2px] hover:bg-accent-hover transition-colors duration-200 ease-precision shadow-xs w-full sm:w-auto"
                >
                  <span>Inquire for {category.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 ease-precision group-hover:translate-x-1" />
                </Link>

                {whatsAppUrl && (
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 bg-surface-secondary border border-border text-text-primary font-display font-semibold text-xs rounded-[2px] hover:bg-surface-tertiary transition-colors duration-200 ease-precision w-full sm:w-auto"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 text-accent-whatsapp" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                )}

                <Link
                  href="/categories"
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 px-4 py-3 text-text-secondary hover:text-text-primary font-mono text-xs transition-colors duration-200 ease-precision w-full sm:w-auto"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>All 8 Categories</span>
                </Link>
              </div>

              {/* Category Micro Metadata Strip */}
              <div className="mt-8 pt-5 border-t border-border-subtle flex flex-wrap items-center gap-4 text-xs font-mono text-text-muted">
                <div>
                  <span className="text-accent-secondary font-semibold">ORDER: </span>
                  <span className="text-text-primary">{indexStr} OF 08</span>
                </div>
                <span>·</span>
                <div>
                  <span className="text-accent-secondary font-semibold">STATUS: </span>
                  <span className="text-text-primary">ACTIVE CATALOGUE</span>
                </div>
                <span>·</span>
                <div>
                  <span className="text-accent-secondary font-semibold">INQUIRY: </span>
                  <span className="text-text-primary">DIRECT MATCHING</span>
                </div>
              </div>
            </div>

            {/* RIGHT (5 cols): Hardware Visual Plate */}
            <div className="lg:col-span-5">
              <CategoryHeroPlate category={category} />
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          SELECTED PRODUCTS SECTION
          Displays real products if available, or the refined staging empty state.
          Strictly filters out `isDemoPlaceholder: true` items.
         ========================================================================= */}
      <section
        id="products"
        aria-labelledby="category-products-heading"
        className="py-12 sm:py-16 lg:py-20 border-b border-border bg-surface-secondary/40"
      >
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-border">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-accent-secondary uppercase tracking-wider mb-1 font-semibold">
                <span>03 // EQUIPMENT REGISTRY</span>
                <span className="text-border-strong">|</span>
                <span className="text-text-muted">{category.name.toUpperCase()} MODELS</span>
              </div>
              <h2
                id="category-products-heading"
                className="font-display font-bold text-2xl sm:text-3xl text-text-primary"
              >
                Available Instruments &amp; Models
              </h2>
            </div>

            <div className="font-mono text-xs text-text-muted">
              {productionProducts.length > 0
                ? `${productionProducts.length} REGISTERED PRODUCT(S)`
                : "STATUS: COMPILATION IN PROGRESS"}
            </div>
          </div>

          {/* STATE A: REAL PRODUCTION PRODUCTS EXIST */}
          {productionProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {productionProducts.map((product) => {
                const benchmarkSpec =
                  product.highlights?.[0] || product.specifications?.[0]?.value || "";

                return (
                  <article
                    key={product.id}
                    className="flex flex-col justify-between p-6 rounded-[2px] border border-border bg-surface hover:border-accent-primary transition-colors duration-200 ease-precision shadow-[0_1px_3px_rgba(20,23,21,0.03)] group"
                  >
                    <div>
                      {/* Top Taxonomy & Model */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold">
                          {product.category}
                        </span>
                        {product.model && (
                          <span className="font-mono text-[11px] text-text-muted">
                            MODEL: {product.model}
                          </span>
                        )}
                      </div>

                      {/* Product Name */}
                      <h3 className="font-display font-bold text-lg text-text-primary group-hover:text-accent transition-colors duration-200 ease-precision">
                        <Link href={`/products/${product.slug}`}>
                          {product.name}
                        </Link>
                      </h3>

                      {/* Short Benchmark Specification */}
                      {benchmarkSpec && (
                        <p className="font-sans text-xs text-text-secondary mt-2 leading-relaxed line-clamp-2">
                          {benchmarkSpec}
                        </p>
                      )}
                    </div>

                    {/* Product Image Box */}
                    <div className="my-5 relative aspect-[16/10] w-full rounded-[2px] bg-background border border-border-subtle flex items-center justify-center p-4 overflow-hidden">
                      <Image
                        src={assetPath(product.heroImage)}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-contain p-2"
                      />
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                      <span className="font-mono text-[10px] text-text-muted uppercase">
                        SPECIFICATION READY
                      </span>
                      <Link
                        href={`/products/${product.slug}`}
                        className="group inline-flex items-center gap-1 font-display font-semibold text-xs text-accent hover:text-accent-hover transition-colors duration-150"
                      >
                        <span>View Specifications</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 ease-precision group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            /* STATE B: REFINED EMPTY / STAGING STATE (NO FAKE PRODUCTS) */
            <div className="p-8 sm:p-12 lg:p-16 border border-border bg-surface rounded-[2px] text-center max-w-2xl mx-auto shadow-[0_1px_3px_rgba(20,23,21,0.03)] relative overflow-hidden">
              <span
                aria-hidden="true"
                className="absolute top-2.5 right-2.5 font-mono text-[10px] text-accent-secondary/40 select-none"
              >
                +
              </span>

              <div className="w-14 h-14 rounded-[2px] bg-surface-secondary border border-border flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-accent-secondary" />
              </div>

              <div className="font-mono text-xs uppercase tracking-wider text-accent-secondary font-semibold mb-2">
                CATALOGUE STATUS // SPECIFICATION COMPILATION
              </div>

              <h3 className="font-display font-bold text-xl sm:text-2xl text-text-primary">
                Product catalogue being prepared
              </h3>

              <p className="font-sans text-xs sm:text-sm text-text-secondary mt-3 leading-relaxed max-w-lg mx-auto">
                Product information for this category will be added using verified manufacturer references and specifications.
              </p>

              <div className="mt-6 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href={`/contact?subject=inquiry-${category.slug}`}
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-display font-semibold text-xs tracking-wider uppercase rounded-[2px] hover:bg-accent-hover transition-colors shadow-xs w-full sm:w-auto"
                >
                  <span>Send an Equipment Inquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/categories"
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 bg-surface-secondary border border-border text-text-primary font-display font-semibold text-xs rounded-[2px] hover:bg-surface-tertiary transition-colors w-full sm:w-auto"
                >
                  <span>Browse Other Categories</span>
                </Link>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* =========================================================================
          APPLICATION CONTEXT SECTION
          Restrained, context-of-use only. Zero unverified performance claims.
         ========================================================================= */}
      {category.applicationContexts && category.applicationContexts.length > 0 && (
        <section
          aria-labelledby="applications-heading"
          className="py-12 sm:py-16 border-b border-border bg-surface"
        >
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-border-subtle">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-accent-secondary uppercase tracking-wider mb-1 font-semibold">
                  <span>04 // OPERATIONAL CONTEXT</span>
                  <span className="text-border-strong">|</span>
                  <span className="text-text-muted">FIELD DEPLOYMENT</span>
                </div>
                <h2
                  id="applications-heading"
                  className="font-display font-bold text-2xl sm:text-3xl text-text-primary"
                >
                  Field Applications &amp; Context of Use
                </h2>
              </div>
              <p className="font-sans text-xs sm:text-sm text-text-secondary max-w-md leading-relaxed">
                Primary field contexts and technical environments where {category.name} equipment is utilized.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {category.applicationContexts.map((context, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-[2px] border border-border bg-background relative overflow-hidden"
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-2 right-2 font-mono text-[10px] text-accent-secondary/40 select-none"
                  >
                    +
                  </span>
                  <div className="font-mono text-xs font-bold text-accent-secondary mb-3">
                    {`CTX // 0${idx + 1}`}
                  </div>
                  <h3 className="font-display font-semibold text-base text-text-primary mb-2">
                    {context}
                  </h3>
                  <div className="mt-4 pt-3 border-t border-border-subtle flex items-center gap-2 text-[11px] font-mono text-text-muted">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent-secondary shrink-0" />
                    <span>CONTEXT // FIELD PROFILE</span>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* =========================================================================
          CATEGORY INQUIRY CONVERSION BLOCK
         ========================================================================= */}
      <section
        id="inquiry"
        aria-labelledby="inquiry-cta-heading"
        className="py-12 sm:py-16 bg-surface-secondary/60 border-b border-border"
      >
        <Container>
          <div className="p-8 sm:p-12 rounded-[2px] border border-border bg-surface relative overflow-hidden shadow-[0_1px_3px_rgba(20,23,21,0.03)]">
            <span
              aria-hidden="true"
              className="absolute top-2.5 right-2.5 font-mono text-[10px] text-accent-secondary/40 select-none"
            >
              +
            </span>

            <div className="max-w-2xl">
              <div className="flex items-center gap-2 font-mono text-xs text-accent-secondary uppercase tracking-wider mb-2 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>DIRECT REQUIREMENT COORDINATION</span>
              </div>

              <h2
                id="inquiry-cta-heading"
                className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-text-primary"
              >
                Looking for equipment in this category?
              </h2>

              <p className="font-sans text-sm text-text-secondary mt-3 leading-relaxed">
                Share the product reference, technical requirement or intended application. The team can review the inquiry and respond with relevant available information.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href={`/contact?subject=inquiry-${category.slug}`}
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-display font-semibold text-xs tracking-wider uppercase rounded-[2px] hover:bg-accent-hover transition-colors shadow-xs"
                >
                  <span>Send Equipment Inquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {whatsAppUrl && (
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 bg-surface-secondary border border-border text-text-primary font-display font-semibold text-xs rounded-[2px] hover:bg-surface-tertiary transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-accent-whatsapp" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          INTER-CATEGORY CONTINUITY / NAVIGATION
          Subtle way to traverse between all 8 categories
         ========================================================================= */}
      <nav
        aria-label="Category Navigation"
        className="py-6 sm:py-8 bg-surface border-b border-border"
      >
        <Container>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Previous Category Link */}
            <Link
              href={`/categories/${prevCategory.slug}`}
              className="group flex items-center gap-3 p-3 rounded-[2px] border border-border hover:border-accent-primary bg-background sm:bg-transparent hover:bg-surface-secondary transition-colors duration-200 ease-precision"
            >
              <div className="w-8 h-8 rounded-[2px] bg-surface-secondary border border-border flex items-center justify-center shrink-0 group-hover:border-accent-primary transition-colors duration-200 ease-precision">
                <ArrowLeft className="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-colors duration-150" />
              </div>
              <div className="text-left">
                <span className="font-mono text-[10px] text-accent-secondary uppercase block">
                  ← PREVIOUS DISCIPLINE
                </span>
                <span className="font-display font-semibold text-xs sm:text-sm text-text-primary group-hover:text-accent transition-colors duration-150">
                  {prevCategory.name}
                </span>
              </div>
            </Link>

            {/* Center Index Link */}
            <Link
              href="/categories"
              className="hidden md:inline-flex items-center gap-1.5 font-mono text-xs text-text-muted hover:text-accent transition-colors duration-150"
            >
              <span>ALL 8 DISCIPLINES</span>
              <span>·</span>
              <span className="text-text-primary font-semibold">VIEW INDEX</span>
            </Link>

            {/* Next Category Link */}
            <Link
              href={`/categories/${nextCategory.slug}`}
              className="group flex items-center justify-end gap-3 p-3 rounded-[2px] border border-border hover:border-accent-primary bg-background sm:bg-transparent hover:bg-surface-secondary transition-colors duration-200 ease-precision text-right"
            >
              <div>
                <span className="font-mono text-[10px] text-accent-secondary uppercase block">
                  NEXT DISCIPLINE →
                </span>
                <span className="font-display font-semibold text-xs sm:text-sm text-text-primary group-hover:text-accent transition-colors duration-150">
                  {nextCategory.name}
                </span>
              </div>
              <div className="w-8 h-8 rounded-[2px] bg-surface-secondary border border-border flex items-center justify-center shrink-0 group-hover:border-accent-primary transition-colors duration-200 ease-precision">
                <ArrowRight className="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-colors duration-150" />
              </div>
            </Link>
          </div>
        </Container>
      </nav>
    </div>
  );
}
