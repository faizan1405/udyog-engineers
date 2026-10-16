import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
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
import { getCategoryTheme } from "@/config/categoryThemes";
import { CategoryProductsBrowser } from "@/components/products/CategoryProductsBrowser";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

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
 * Photorealistic Equipment Showcase Plate for Category Detail Hero.
 * Presents the category's studio product photography with 75%-90% container fill,
 * category-tuned background tinting, and high visual dominance.
 */
function CategoryHeroPlate({ category }: { category: ProductCategory }) {
  const theme = getCategoryTheme(category.slug);
  const imageSrc = category.heroImage || category.image;
  const indexStr = String(category.order).padStart(2, "0");

  return (
    <div
      className="relative w-full rounded-2xl sm:rounded-3xl border overflow-hidden shadow-md transition-all duration-300"
      style={{
        backgroundColor: theme.bgLight,
        borderColor: theme.borderLight,
      }}
    >
      {/* Ambient atmospheric backdrop glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${theme.accent}14 0%, transparent 75%)`,
        }}
      />

      {/* Top Header Plate Strip */}
      <div
        className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-3 border-b text-xs font-sans backdrop-blur-xs"
        style={{
          borderColor: `${theme.borderLight}80`,
          backgroundColor: `${theme.bgLight}B3`,
        }}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full ring-2"
            style={{
              backgroundColor: theme.accent,
              boxShadow: `0 0 8px ${theme.accent}66`,
            }}
          />
          <span className="uppercase tracking-wider font-semibold text-text-primary text-[10px] sm:text-[11px]">
            {category.name} Equipment
          </span>
        </div>
        <span className="font-mono text-[11px] font-semibold text-text-muted">
          {indexStr} / 08
        </span>
      </div>

      {/* Main Product Showcase Canvas */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] p-4 sm:p-6 md:p-8 flex items-center justify-center">
        {imageSrc ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={assetPath(imageSrc)}
              alt={`${category.name} - Professional Field Instrumentation`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px"
              className="object-contain drop-shadow-[0_12px_24px_rgba(20,23,21,0.12)] transition-transform duration-500 ease-out hover:scale-[1.02]"
              priority
            />
          </div>
        ) : (
          <div className="relative z-10 flex flex-col items-center justify-center text-center p-6">
            <span className="font-display text-xs uppercase tracking-widest text-text-primary font-semibold">
              {category.name}
            </span>
            <span className="font-sans text-[11px] text-text-muted mt-1">
              {category.domain || "Field Instrumentation"}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Scope Footer Strip */}
      <div
        className="relative z-10 flex items-center justify-between px-4 sm:px-6 py-2.5 border-t text-xs font-sans text-text-muted backdrop-blur-xs"
        style={{
          borderColor: `${theme.borderLight}80`,
          backgroundColor: `${theme.bgLight}80`,
        }}
      >
        <span className="truncate max-w-[220px] sm:max-w-none text-text-secondary">
          {theme.tagline || category.domain}
        </span>
        <span className="font-semibold text-text-primary text-[11px]">Institutional Supply</span>
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

  // Filter production products
  const productionProducts = getProductionProductsByCategory(category.slug);
  const jsonLd = generateCategoryJsonLd(category, productionProducts);

  const prevCategory = getPreviousCategory(category);
  const nextCategory = getNextCategory(category);

  const whatsAppEnabled = isWhatsAppConfigured();
  const whatsAppUrl = whatsAppEnabled
    ? buildWhatsAppInquiryUrl({ categoryName: category.name })
    : null;

  const indexStr = String(category.order).padStart(2, "0");
  const theme = getCategoryTheme(category.slug);

  return (
    <div className="bg-background min-h-screen">
      {/* JSON-LD Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* =========================================================================
          CATEGORY DETAIL HERO SECTION
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* LEFT (7 cols): Editorial Category Introduction */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Registration Taxon */}
              <div className="flex items-center gap-2 font-sans text-xs mb-3">
                <span
                  className="font-mono font-semibold px-2 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: theme.bgLight,
                    borderColor: `${theme.borderLight}99`,
                    color: theme.accent,
                  }}
                >
                  {indexStr}
                </span>
                <span className="text-border-strong">•</span>
                <span className="font-semibold text-text-primary">{category.name}</span>
                <span className="text-border-strong">•</span>
                <span className="text-text-muted">
                  {category.domain || "Equipment Discipline"}
                </span>
              </div>

              {/* Title */}
              <h1
                id="category-title"
                className="font-display font-semibold text-[38px] sm:text-[46px] md:text-[50px] lg:text-[58px] text-text-primary tracking-[-0.035em] leading-[1.05]"
              >
                {category.name}
              </h1>

              {/* Short Domain Description */}
              <p className="font-sans text-base sm:text-lg text-text-secondary leading-[1.65] mt-4 max-w-xl">
                {category.description}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href={`/contact?subject=inquiry-${category.slug}`}
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-green text-white font-sans font-semibold text-[15px] rounded-xl hover:bg-brand-green-hover transition-colors shadow-xs w-full sm:w-auto tracking-normal"
                >
                  <span>Inquire for {category.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                {whatsAppUrl && (
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 bg-surface-secondary border border-border/80 text-text-primary font-sans font-semibold text-[15px] rounded-xl hover:bg-surface-tertiary transition-colors w-full sm:w-auto tracking-normal"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-accent-whatsapp" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                )}

                <Link
                  href="/categories"
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 px-4 py-3 text-text-secondary hover:text-text-primary font-sans font-medium text-sm transition-colors w-full sm:w-auto"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>All 8 Categories</span>
                </Link>
              </div>

              {/* Micro Metadata Strip */}
              <div className="mt-8 pt-5 border-t border-border-subtle flex flex-wrap items-center gap-4 text-xs font-sans text-text-muted">
                <div>
                  <span className="text-text-secondary font-medium">Discipline: </span>
                  <span className="text-text-primary font-mono font-semibold">{indexStr}</span>
                  <span className="text-text-primary"> of 08</span>
                </div>
                <span>•</span>
                <div>
                  <span className="text-text-secondary font-medium">Procurement: </span>
                  <span className="text-text-primary font-semibold">Institutional &amp; Government</span>
                </div>
                <span>•</span>
                <div>
                  <span className="text-text-secondary font-medium">Service: </span>
                  <span className="text-text-primary font-semibold">Datasheets &amp; Quotations</span>
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
          SELECTED PRODUCTS / CATALOGUE STATUS SECTION
         ========================================================================= */}
      <section
        id="products"
        aria-labelledby="category-products-heading"
        className="py-12 sm:py-16 lg:py-20 border-b border-border/80 bg-surface-secondary/40"
      >
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-border/70">
            <div>
              <div className="flex items-center gap-2 font-sans text-xs text-brand-green mb-1 font-semibold">
                <span>Equipment Models</span>
                <span className="text-border-strong">•</span>
                <span className="text-text-muted font-normal">{category.name}</span>
              </div>
              <h2
                id="category-products-heading"
                className="font-display font-semibold text-2xl sm:text-3xl lg:text-4xl text-text-primary tracking-[-0.025em]"
              >
                Available Instruments &amp; Models
              </h2>
            </div>

            <div className="font-sans text-xs text-text-muted">
              {productionProducts.length > 0
                ? `${productionProducts.length} Confirmed Model(s)`
                : "Custom Sourcing Available"}
            </div>
          </div>

          {/* REAL PRODUCTS EXIST */}
          {productionProducts.length > 0 ? (
            <CategoryProductsBrowser
              category={category}
              products={productionProducts}
            />
          ) : (
            /* POLISHED INQUIRY-DRIVEN STATE (NO FAKE PRODUCTS) */
            <div className="p-8 sm:p-12 lg:p-16 border border-border/80 bg-surface rounded-2xl text-center max-w-2xl mx-auto shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center mx-auto mb-5">
                <FileText className="w-7 h-7 text-brand-green" />
              </div>

              <div className="font-sans text-xs text-brand-green font-semibold mb-2">
                Custom Procurement &amp; Sourcing
              </div>

              <h3 className="font-display font-semibold text-2xl sm:text-3xl text-text-primary tracking-[-0.02em]">
                Equipment Sourcing &amp; Inquiries
              </h3>

              <p className="font-sans text-base text-text-secondary mt-3 leading-[1.65] max-w-lg mx-auto">
                We coordinate and supply specialized {category.name.toLowerCase()} equipment tailored to project requirements, research parameters, and institutional tenders.
              </p>

              <div className="mt-8 pt-6 border-t border-border/70 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href={`/contact?subject=inquiry-${category.slug}`}
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-green text-white font-sans font-semibold text-[15px] rounded-xl hover:bg-brand-green-hover transition-colors shadow-xs w-full sm:w-auto tracking-normal"
                >
                  <span>Send Equipment Inquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/categories"
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 bg-surface-secondary border border-border/80 text-text-primary font-sans font-semibold text-[15px] rounded-xl hover:bg-surface-tertiary transition-colors w-full sm:w-auto tracking-normal"
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
         ========================================================================= */}
      {category.applicationContexts && category.applicationContexts.length > 0 && (
        <section
          aria-labelledby="applications-heading"
          className="py-12 sm:py-16 border-b border-border/80 bg-surface"
        >
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-border/70">
              <div>
                <div className="flex items-center gap-2 font-sans text-xs text-brand-green mb-1 font-semibold">
                  <span>Operational Context</span>
                  <span className="text-border-strong">•</span>
                  <span className="text-text-muted font-normal">Field Deployment</span>
                </div>
                <h2
                  id="applications-heading"
                  className="font-display font-semibold text-2xl sm:text-3xl text-text-primary tracking-[-0.025em]"
                >
                  Field Applications &amp; Context of Use
                </h2>
              </div>
              <p className="font-sans text-sm sm:text-base text-text-secondary max-w-md leading-[1.6]">
                Primary field contexts and technical environments where {category.name} equipment is utilized.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {category.applicationContexts.map((context, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-border/80 bg-surface-secondary/40 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="font-sans text-xs font-semibold text-brand-green mb-3">
                      {`Application 0${idx + 1}`}
                    </div>
                    <h3 className="font-display font-semibold text-base sm:text-lg text-text-primary mb-2 tracking-[-0.015em]">
                      {context}
                    </h3>
                  </div>
                  <div className="mt-4 pt-3 border-t border-border/70 flex items-center gap-2 text-xs font-sans text-text-muted">
                    <CheckCircle2 className="w-4 h-4 text-brand-green shrink-0" />
                    <span>Verified Field Scope</span>
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
        className="py-12 sm:py-16 bg-surface-secondary/60 border-b border-border/80"
      >
        <Container>
          <div className="p-8 sm:p-12 rounded-2xl border border-border/80 bg-surface shadow-xs relative overflow-hidden">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 font-sans text-xs text-brand-green mb-2 font-semibold">
                <ShieldCheck className="w-4 h-4 text-brand-green" />
                <span>Direct Requirement Coordination</span>
              </div>

              <h2
                id="inquiry-cta-heading"
                className="font-display font-semibold text-2xl sm:text-3xl lg:text-4xl text-text-primary tracking-[-0.025em]"
              >
                Looking for equipment in this category?
              </h2>

              <p className="font-sans text-base text-text-secondary mt-3 leading-[1.65]">
                Share the product reference, technical requirement or intended application. Our team will review the inquiry and respond with relevant available documentation.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href={`/contact?subject=inquiry-${category.slug}`}
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-green text-white font-sans font-semibold text-[15px] rounded-xl hover:bg-brand-green-hover transition-colors shadow-xs tracking-normal"
                >
                  <span>Send Equipment Inquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {whatsAppUrl && (
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 bg-surface-secondary border border-border/80 text-text-primary font-sans font-semibold text-[15px] rounded-xl hover:bg-surface-tertiary transition-colors tracking-normal"
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
         ========================================================================= */}
      <nav
        aria-label="Category Navigation"
        className="py-6 sm:py-8 bg-surface border-b border-border/80"
      >
        <Container>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Previous Category Link */}
            <Link
              href={`/categories/${prevCategory.slug}`}
              className="group flex items-center gap-3 p-3.5 rounded-xl border border-border/80 hover:border-brand-green bg-background sm:bg-transparent hover:bg-surface-secondary transition-all duration-200"
            >
              <div className="w-9 h-9 rounded-lg bg-surface-secondary border border-border flex items-center justify-center shrink-0 group-hover:border-brand-green transition-colors">
                <ArrowLeft className="w-4 h-4 text-text-muted group-hover:text-brand-green transition-colors" />
              </div>
              <div className="text-left">
                <span className="font-sans text-[11px] font-medium text-brand-green uppercase block">
                  ← Previous Discipline
                </span>
                <span className="font-display font-semibold text-sm text-text-primary group-hover:text-brand-green transition-colors tracking-tight">
                  {prevCategory.name}
                </span>
              </div>
            </Link>

            {/* Center Index Link */}
            <Link
              href="/categories"
              className="hidden md:inline-flex items-center gap-1.5 font-sans text-xs text-text-muted hover:text-brand-green transition-colors"
            >
              <span>All 8 Disciplines</span>
              <span>•</span>
              <span className="text-text-primary font-semibold">View Index</span>
            </Link>

            {/* Next Category Link */}
            <Link
              href={`/categories/${nextCategory.slug}`}
              className="group flex items-center justify-end gap-3 p-3.5 rounded-xl border border-border/80 hover:border-brand-green bg-background sm:bg-transparent hover:bg-surface-secondary transition-all duration-200 text-right"
            >
              <div>
                <span className="font-sans text-[11px] font-medium text-brand-green uppercase block">
                  Next Discipline →
                </span>
                <span className="font-display font-semibold text-sm text-text-primary group-hover:text-brand-green transition-colors tracking-tight">
                  {nextCategory.name}
                </span>
              </div>
              <div className="w-9 h-9 rounded-lg bg-surface-secondary border border-border flex items-center justify-center shrink-0 group-hover:border-brand-green transition-colors">
                <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-brand-green transition-colors" />
              </div>
            </Link>
          </div>
        </Container>
      </nav>
    </div>
  );
}
