"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Compass, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getFeaturedProducts } from "@/data/products";
import { Product } from "@/types/product";
import { isStagingOrDevelopment } from "@/lib/staging";
import { motion, useReducedMotion } from "framer-motion";
import { PRECISION_EASE, DURATION } from "@/lib/motion";
import { assetPath } from "@/lib/utils";


interface StagedProductSlot {
  category: string;
  categorySlug: string;
  discipline: string;
  provisionalTitle: string;
  benchmarkSpec: string;
  aspectClass: string;
}

const STAGED_SLOTS: StagedProductSlot[] = [
  {
    category: "Optics",
    categorySlug: "optics",
    discipline: "FIELD SYSTEMS",
    provisionalTitle: "Precision Terrestrial Survey Instrument",
    benchmarkSpec:
      "High-resolution objective lens assembly with diopter graduation, engineered for field triangulation and optical observation.",
    aspectClass: "aspect-[16/10]",
  },
  {
    category: "GPS",
    categorySlug: "gps",
    discipline: "GNSS GEODETIC",
    provisionalTitle: "Multi-Constellation Satellite Receiver",
    benchmarkSpec:
      "Differential positioning array engineered for cadastral survey, mapping, and GIS field data logging.",
    aspectClass: "aspect-[16/9]",
  },
  {
    category: "Thermal",
    categorySlug: "thermal",
    discipline: "ELECTRO-OPTICS",
    provisionalTitle: "Radiometric Field Thermal Imager",
    benchmarkSpec:
      "High-sensitivity uncooled microbolometer detector with dual-field observation optics.",
    aspectClass: "aspect-[16/9]",
  },
];

/**
 * FEATURED PRODUCTS COMPONENT (PHASE 4B)
 *
 * Implements the editorial technical equipment dossier experience.
 *
 * DATA INTEGRITY LOGIC:
 * 1. If genuine production products exist in `data/products.ts` (isDemoPlaceholder: false),
 *    renders verified equipment dossiers.
 * 2. If ZERO real products exist (current state, as only demo placeholders exist),
 *    renders the complete architectural dossier layout with tasteful staging blocks
 *    clearly marked as awaiting authentic manufacturer photography and datasheets.
 *    No fake models or unverified specifications are presented as genuine.
 */
export function FeaturedProducts() {
  const shouldReduceMotion = useReducedMotion();
  const realFeaturedProducts = getFeaturedProducts();
  const hasRealProducts = realFeaturedProducts.length > 0;

  return (
    <section
      id="featured-equipment"
      aria-label="Selected Technical Equipment"
      className="relative bg-surface-secondary/70 border-t border-border py-16 md:py-24 overflow-hidden"
    >
      <Container>
        {/* Section Registration Header */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: shouldReduceMotion ? 0 : DURATION.reveal, ease: PRECISION_EASE }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 mb-10 border-b border-border"
        >
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-accent-secondary tracking-wider uppercase mb-2">
              <span className="font-semibold">03 // SELECTED EQUIPMENT</span>
              <span className="text-border-strong">|</span>
              <span className="text-text-muted">BENCHMARK INSTRUMENTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary font-display">
              Benchmark Field Instruments
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="font-sans text-sm text-text-secondary max-w-md leading-relaxed">
              Selected precision instruments engineered for field research, geodetic surveying, and optical metrology.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-accent font-semibold hover:underline self-start sm:self-auto shrink-0"
            >
              <span>View Full Catalogue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* =========================================================================
            STATE A: GENUINE PRODUCTION PRODUCTS EXIST
           ========================================================================= */}
        {hasRealProducts ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Primary Featured Product (7 Cols) */}
            {realFeaturedProducts[0] && (
              <RealPrimaryDossier product={realFeaturedProducts[0]} />
            )}

            {/* Supporting Products (5 Cols Stacked) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {realFeaturedProducts.slice(1, 3).map((prod) => (
                <RealSupportingDossier key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        ) : (
          /* =========================================================================
              STATE B: ASSET STAGING ARCHITECTURE (NO REAL PRODUCTS YET)
              Renders the exact production layout with clean staging pedestals,
              avoiding fake models or fraudulent claims.
             ========================================================================= */
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Primary Staged Dossier: 7 Cols */}
              <StagedPrimaryDossier slot={STAGED_SLOTS[0]} />

              {/* Supporting Staged Dossiers: 5 Cols (Stacked) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <StagedSupportingDossier slot={STAGED_SLOTS[1]} />
                <StagedSupportingDossier slot={STAGED_SLOTS[2]} />
              </div>
            </div>

            {/* Technical Verification Status Notice */}
            <div className="mt-4 p-4 rounded-[2px] border border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-text-secondary">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent-secondary shrink-0" />
                <span>
                  ASSET STATUS: Authentic product datasheets &amp; official photography undergoing client verification.
                </span>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline shrink-0"
              >
                <span>Direct Equipment Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

/* =========================================================================
   GENUINE PRODUCTION PRODUCT SUBCOMPONENTS
   ========================================================================= */

function RealPrimaryDossier({ product }: { product: Product }) {
  const benchmarkSpec =
    product.highlights?.[0] || product.specifications?.[0]?.value || "";

  return (
    <div className="lg:col-span-7 flex flex-col justify-between p-7 sm:p-8 rounded-[2px] border border-border bg-surface shadow-[0_1px_3px_rgba(20,23,21,0.03)] hover:border-accent-primary transition-colors duration-200 ease-precision">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
            {product.category} {"// BENCHMARK SPEC"}
          </span>
          {product.model && (
            <span className="font-mono text-xs text-text-muted">
              MODEL: {product.model}
            </span>
          )}
        </div>
        <h3 className="font-display font-bold text-2xl sm:text-3xl text-text-primary mt-1">
          {product.name}
        </h3>
        {benchmarkSpec && (
          <p className="font-sans text-sm text-text-secondary mt-2 max-w-lg leading-relaxed">
            {benchmarkSpec}
          </p>
        )}
      </div>

      {/* Hardware Pedestal Area */}
      <div className="my-6 relative aspect-[16/10] w-full rounded-[2px] bg-background border border-border-subtle flex items-center justify-center p-6 overflow-hidden">
        <Image
          src={assetPath(product.heroImage)}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-contain p-4 drop-shadow-[0_8px_16px_rgba(20,23,21,0.06)]"
        />
      </div>

      <div className="pt-4 border-t border-border flex items-center justify-between">
        <span className="font-mono text-xs text-text-muted">
          DOSSIER REF // {product.slug}
        </span>
        <Link
          href={`/products/${product.slug}`}
          className="group inline-flex items-center gap-1.5 font-display font-semibold text-sm text-accent hover:text-accent-hover transition-colors duration-150"
        >
          <span>View Specifications</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-precision group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

function RealSupportingDossier({ product }: { product: Product }) {
  const benchmarkSpec =
    product.highlights?.[0] || product.specifications?.[0]?.value || "";

  return (
    <div className="flex-1 flex flex-col justify-between p-6 rounded-[2px] border border-border bg-surface shadow-[0_1px_3px_rgba(20,23,21,0.03)] hover:border-accent-primary transition-colors duration-200 ease-precision">
      <div>
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold">
            {product.category}
          </span>
          {product.model && (
            <span className="font-mono text-[11px] text-text-muted">
              {product.model}
            </span>
          )}
        </div>
        <h3 className="font-display font-bold text-lg text-text-primary">
          {product.name}
        </h3>
        {benchmarkSpec && (
          <p className="font-sans text-xs text-text-secondary mt-1.5 leading-relaxed line-clamp-2">
            {benchmarkSpec}
          </p>
        )}
      </div>

      <div className="my-4 relative aspect-[16/8] w-full rounded-[2px] bg-background border border-border-subtle flex items-center justify-center p-4 overflow-hidden">
        <Image
          src={assetPath(product.heroImage)}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-contain p-2 drop-shadow-[0_4px_12px_rgba(20,23,21,0.04)]"
        />
      </div>

      <div className="pt-3 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="font-mono text-[10px] text-text-muted">
          STATUS: VERIFIED
        </span>
        <Link
          href={`/products/${product.slug}`}
          className="group inline-flex items-center gap-1 font-display font-semibold text-xs text-accent hover:text-accent-hover transition-colors"
        >
          <span>View Specifications</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

/* =========================================================================
   ASSET STAGING SUBCOMPONENTS (DATA INTEGRITY PRESERVATION)
   ========================================================================= */

function StagedPrimaryDossier({ slot }: { slot: StagedProductSlot }) {
  return (
    <div className="lg:col-span-7 flex flex-col justify-between p-7 sm:p-8 rounded-[2px] border border-border bg-surface shadow-[0_1px_3px_rgba(20,23,21,0.03)] hover:border-accent-primary transition-colors duration-200 ease-precision">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
            {`${slot.category} // ${slot.discipline}`}
          </span>
          <span className="font-mono text-[11px] text-accent-secondary bg-surface-secondary px-2 py-0.5 rounded-[2px] border border-border">
            DOSSIER STAGING
          </span>
        </div>
        <h3 className="font-display font-bold text-2xl sm:text-3xl text-text-primary mt-1">
          {slot.provisionalTitle}
        </h3>
        <p className="font-sans text-sm text-text-secondary mt-2 max-w-lg leading-relaxed">
          {slot.benchmarkSpec}
        </p>
      </div>

      {/* Hardware Pedestal with Architectural Precision Crosshair */}
      <div className="my-6 relative aspect-[16/10] w-full rounded-[2px] bg-background border border-border-subtle flex flex-col items-center justify-center p-6 overflow-hidden">
        {/* Corner Crosshairs */}
        <span
          aria-hidden="true"
          className="absolute top-2 left-2 font-mono text-[10px] text-accent-secondary/50 select-none"
        >
          +
        </span>
        <span
          aria-hidden="true"
          className="absolute top-2 right-2 font-mono text-[10px] text-accent-secondary/50 select-none"
        >
          +
        </span>
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-2 font-mono text-[10px] text-accent-secondary/50 select-none"
        >
          +
        </span>
        <span
          aria-hidden="true"
          className="absolute bottom-2 right-2 font-mono text-[10px] text-accent-secondary/50 select-none"
        >
          +
        </span>

        {/* Optical Axis Reticle Marks */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.25] bg-[linear-gradient(to_right,#E2DFD6_1px,transparent_1px),linear-gradient(to_bottom,#E2DFD6_1px,transparent_1px)] bg-[size:32px_32px]"
        />

        {/* Optical Silhouette Icon Graphic */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
          <div className="w-16 h-16 rounded-[2px] bg-surface border border-border flex items-center justify-center mb-3 shadow-xs">
            <Compass className="w-8 h-8 text-accent-secondary" />
          </div>
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-text-primary">
            {isStagingOrDevelopment()
              ? "BENCHMARK HARDWARE ASSET STAGING"
              : "TECHNICAL SPECIFICATION SHOWCASE"}
          </span>
          <span className="font-mono text-[10px] text-text-muted mt-1">
            {isStagingOrDevelopment()
              ? "Official client photograph pending drop-in deployment"
              : "Direct procurement & technical quotation support"}
          </span>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="font-mono text-xs text-text-muted">
          {isStagingOrDevelopment()
            ? "STATUS // HARDWARE PHOTOGRAPHY PENDING"
            : "SPECIFICATION // DIRECT INQUIRY"}
        </span>
        <Link
          href={`/contact?subject=inquiry-${slot.categorySlug}`}
          className="group inline-flex items-center gap-1.5 font-display font-semibold text-sm text-accent hover:text-accent-hover transition-colors duration-150"
        >
          <span>Inquire for Details</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 ease-precision group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

function StagedSupportingDossier({ slot }: { slot: StagedProductSlot }) {
  return (
    <div className="flex-1 flex flex-col justify-between p-6 rounded-[2px] border border-border bg-surface shadow-[0_1px_3px_rgba(20,23,21,0.03)] hover:border-accent-primary transition-colors duration-200 ease-precision">
      <div>
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold">
            {`${slot.category} // ${slot.discipline}`}
          </span>
          <span className="font-mono text-[10px] text-text-muted">
            STAGING REF
          </span>
        </div>
        <h3 className="font-display font-bold text-lg text-text-primary">
          {slot.provisionalTitle}
        </h3>
        <p className="font-sans text-xs text-text-secondary mt-1.5 leading-relaxed line-clamp-2">
          {slot.benchmarkSpec}
        </p>
      </div>

      <div className="my-4 relative aspect-[16/7] w-full rounded-[2px] bg-background border border-border-subtle flex items-center justify-center p-3 overflow-hidden">
        <div className="flex items-center gap-2.5 font-mono text-[11px] text-text-muted">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary" />
          <span>{isStagingOrDevelopment() ? "BENCHMARK ASSET STAGING" : "TECHNICAL SPECIFICATION"}</span>
        </div>
      </div>

      <div className="pt-3 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="font-mono text-[10px] text-text-muted">
          SPECIFICATION // DIRECT INQUIRY
        </span>
        <Link
          href={`/contact?subject=inquiry-${slot.categorySlug}`}
          className="group inline-flex items-center gap-1 font-display font-semibold text-xs text-accent hover:text-accent-hover transition-colors duration-150"
        >
          <span>Inquire for Specs</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 ease-precision group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
