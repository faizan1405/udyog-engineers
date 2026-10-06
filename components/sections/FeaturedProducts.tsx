"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getFeaturedProducts } from "@/data/products";
import { Product } from "@/types/product";
import { motion, useReducedMotion } from "framer-motion";
import { PRECISION_EASE, DURATION } from "@/lib/motion";
import { assetPath } from "@/lib/utils";


import { getCategoryTheme } from "@/config/categoryThemes";

interface RepresentativeEquipmentSlot {
  category: string;
  categorySlug: string;
  discipline: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const REPRESENTATIVE_SLOTS: RepresentativeEquipmentSlot[] = [
  {
    category: "Survey & Optical Equipment",
    categorySlug: "optics",
    discipline: "Field & Terrestrial Optics",
    title: "Optical Survey Total Stations & Precision Levels",
    description:
      "High-resolution objective optics engineered for boundary determination, structural monitoring, and terrestrial triangulation in demanding environments.",
    imageSrc: "/images/generated/home/benchmark/benchmark-optics.webp",
    imageAlt: "Precision optical survey total station field instrument",
  },
  {
    category: "GPS & Positioning Equipment",
    categorySlug: "gps",
    discipline: "GNSS & Geospatial Mapping",
    title: "Geodetic GNSS Positioning & Mapping Arrays",
    description:
      "Multi-constellation satellite navigation receivers for geodetic reference, GIS boundary logging, and topographical coordinate recording.",
    imageSrc: "/images/generated/home/benchmark/benchmark-gps.webp",
    imageAlt: "Professional GNSS geodetic receiver and field data collector",
  },
  {
    category: "Thermal Observation Equipment",
    categorySlug: "thermal",
    discipline: "Electro-Optics & Thermography",
    title: "Radiometric Field Thermal Observation Systems",
    description:
      "High-sensitivity radiometric thermal imagers and optics designed for nocturnal monitoring, perimeter security, and environmental tracking.",
    imageSrc: "/images/generated/home/benchmark/benchmark-thermal.webp",
    imageAlt: "High-resolution radiometric thermal imaging observation camera",
  },
];

/**
 * SELECTED EQUIPMENT SECTION
 *
 * Implements representative equipment showcase with authentic category photography.
 * Avoids fabricated product identities, maintaining genuine institutional positioning.
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
            <div className="flex items-center gap-2 font-sans text-xs text-accent-secondary mb-2 font-medium">
              <span className="font-mono font-semibold">03</span>
              <span>·</span>
              <span className="font-semibold text-accent-secondary">Selected Equipment</span>
              <span className="text-border-strong">·</span>
              <span className="text-text-muted">Field Systems</span>
            </div>
            <h2 className="font-display font-semibold text-[30px] sm:text-[36px] md:text-[42px] lg:text-[50px] text-text-primary tracking-[-0.035em] leading-[1.06]">
              Selected for Demanding Field Environments
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="font-sans text-[15px] sm:text-base text-text-secondary max-w-md leading-relaxed">
              Representative instrumentation engineered for field research, geodetic surveying, optical measurement, and environmental observation.
            </p>
            <Link
              href="/categories"
              className="inline-flex items-center gap-1.5 font-sans text-xs sm:text-[13px] text-accent font-semibold hover:underline self-start sm:self-auto shrink-0"
            >
              <span>Explore Categories</span>
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
              <RealPrimaryCard product={realFeaturedProducts[0]} />
            )}

            {/* Supporting Products (5 Cols Stacked) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {realFeaturedProducts.slice(1, 3).map((prod) => (
                <RealSupportingCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        ) : (
          /* =========================================================================
              STATE B: REPRESENTATIVE EQUIPMENT PRESENTATION
              Category-level showcase with authentic photography and verified themes.
             ========================================================================= */
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Primary Representative Equipment: 7 Cols */}
              <RepresentativePrimaryCard slot={REPRESENTATIVE_SLOTS[0]} />

              {/* Supporting Representative Equipment: 5 Cols (Stacked) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <RepresentativeSupportingCard slot={REPRESENTATIVE_SLOTS[1]} />
                <RepresentativeSupportingCard slot={REPRESENTATIVE_SLOTS[2]} />
              </div>
            </div>

            {/* Technical Verification Status Notice */}
            <div className="mt-4 p-5 rounded-xl border border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm font-sans text-text-secondary shadow-xs">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-accent-secondary shrink-0" />
                <span>
                  Authentic instrument configurations, datasheets, and direct procurement specifications available upon inquiry.
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent text-white font-sans text-xs font-semibold rounded-lg hover:bg-accent-hover transition-colors shadow-xs"
                >
                  <span>Send Equipment Inquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
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

function RealPrimaryCard({ product }: { product: Product }) {
  const benchmarkSpec =
    product.highlights?.[0] || product.specifications?.[0]?.value || "";

  return (
    <div className="lg:col-span-7 flex flex-col justify-between p-7 sm:p-8 rounded-2xl border border-border/80 bg-surface shadow-xs hover:border-brand-green/40 hover:shadow-sm transition-all duration-300">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-mono text-xs text-brand-green font-semibold">
            {product.category}
          </span>
          {product.model && (
            <span className="font-mono text-xs text-text-muted">
              Model: {product.model}
            </span>
          )}
        </div>
        <h3 className="font-display font-semibold text-2xl sm:text-[28px] lg:text-[32px] text-text-primary mt-1 tracking-[-0.025em] leading-snug">
          {product.name}
        </h3>
        {benchmarkSpec && (
          <p className="font-sans text-sm sm:text-[15px] text-text-secondary mt-2 max-w-lg leading-relaxed">
            {benchmarkSpec}
          </p>
        )}
      </div>

      {/* Hardware Pedestal Area */}
      <div className="my-6 relative aspect-[16/10] w-full rounded-xl bg-surface-secondary/40 border border-border/70 flex items-center justify-center p-6 overflow-hidden">
        <Image
          src={assetPath(product.heroImage)}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-contain p-4 drop-shadow-[0_8px_16px_rgba(20,23,21,0.06)]"
        />
      </div>

      <div className="pt-4 border-t border-border/70 flex items-center justify-between">
        <span className="font-sans text-xs text-text-muted">
          Ref · {product.slug}
        </span>
        <Link
          href={`/products/${product.slug}`}
          className="group inline-flex items-center gap-1.5 font-sans font-semibold text-xs sm:text-sm text-brand-green hover:underline transition-colors duration-150"
        >
          <span>View Specifications</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

function RealSupportingCard({ product }: { product: Product }) {
  const benchmarkSpec =
    product.highlights?.[0] || product.specifications?.[0]?.value || "";

  return (
    <div className="flex-1 flex flex-col justify-between p-6 rounded-2xl border border-border/80 bg-surface shadow-xs hover:border-brand-green/40 hover:shadow-sm transition-all duration-300">
      <div>
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="font-mono text-xs text-brand-green font-semibold">
            {product.category}
          </span>
          {product.model && (
            <span className="font-mono text-xs text-text-muted">
              {product.model}
            </span>
          )}
        </div>
        <h3 className="font-display font-semibold text-lg sm:text-xl text-text-primary tracking-[-0.02em] leading-snug">
          {product.name}
        </h3>
        {benchmarkSpec && (
          <p className="font-sans text-xs sm:text-sm text-text-secondary mt-1.5 leading-relaxed line-clamp-2">
            {benchmarkSpec}
          </p>
        )}
      </div>

      <div className="my-4 relative aspect-[16/8] w-full rounded-xl bg-surface-secondary/40 border border-border/70 flex items-center justify-center p-4 overflow-hidden">
        <Image
          src={assetPath(product.heroImage)}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-contain p-2 drop-shadow-[0_4px_12px_rgba(20,23,21,0.04)]"
        />
      </div>

      <div className="pt-3 border-t border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="font-sans text-xs text-text-muted">
          Direct Supply
        </span>
        <Link
          href={`/products/${product.slug}`}
          className="group inline-flex items-center gap-1 font-sans font-semibold text-xs text-brand-green hover:underline transition-colors"
        >
          <span>View Specifications</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

/* =========================================================================
   REPRESENTATIVE EQUIPMENT SUBCOMPONENTS (COLOR ACCENT + PHOTOGRAPHY)
   ========================================================================= */

function RepresentativePrimaryCard({ slot }: { slot: RepresentativeEquipmentSlot }) {
  const theme = getCategoryTheme(slot.categorySlug);

  return (
    <div
      className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-2xl border bg-surface shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
      style={{
        borderColor: theme.borderLight,
      }}
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 10% 20%, ${theme.accent}12 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span
            className="text-xs font-sans font-semibold tracking-wide px-2.5 py-1 rounded-full border"
            style={{
              backgroundColor: theme.bgLight,
              borderColor: theme.borderLight,
              color: theme.accent,
            }}
          >
            {slot.discipline}
          </span>
          <span className="font-mono text-xs text-text-muted font-medium">
            Category Scope
          </span>
        </div>

        <h3 className="font-display font-semibold text-2xl sm:text-[28px] lg:text-[32px] text-text-primary tracking-[-0.025em] leading-snug">
          {slot.title}
        </h3>

        <p className="font-sans text-sm sm:text-[15px] text-text-secondary mt-2.5 max-w-xl leading-relaxed">
          {slot.description}
        </p>
      </div>

      {/* Hardware Photography Canvas */}
      <div
        className="my-6 relative aspect-[16/10] w-full rounded-xl overflow-hidden border flex items-center justify-center p-6 transition-all duration-300"
        style={{
          backgroundColor: theme.bgLight,
          borderColor: theme.borderLight,
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          <Image
            src={assetPath(slot.imageSrc)}
            alt={slot.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-contain drop-shadow-[0_12px_24px_rgba(20,23,21,0.12)]"
          />
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <Link
          href={`/categories/${slot.categorySlug}`}
          className="inline-flex items-center gap-1.5 font-sans font-semibold text-xs sm:text-sm text-accent hover:underline"
        >
          <span>Explore {slot.category}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>

        <Link
          href={`/contact?subject=inquiry-${slot.categorySlug}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-surface-secondary border border-border text-text-primary font-sans text-xs font-semibold rounded-lg hover:bg-surface-tertiary transition-colors"
        >
          <span>Inquire Discipline</span>
        </Link>
      </div>
    </div>
  );
}

function RepresentativeSupportingCard({ slot }: { slot: RepresentativeEquipmentSlot }) {
  const theme = getCategoryTheme(slot.categorySlug);

  return (
    <div
      className="flex-1 flex flex-col justify-between p-6 rounded-2xl border bg-surface shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
      style={{
        borderColor: theme.borderLight,
      }}
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 10% 20%, ${theme.accent}12 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span
            className="text-[11px] font-sans font-semibold tracking-wide px-2.5 py-0.5 rounded-full border"
            style={{
              backgroundColor: theme.bgLight,
              borderColor: theme.borderLight,
              color: theme.accent,
            }}
          >
            {slot.discipline}
          </span>
          <span className="font-mono text-xs text-text-muted">
            0{slot.categorySlug === "gps" ? "2" : "4"} / 08
          </span>
        </div>

        <h3 className="font-display font-semibold text-lg sm:text-xl text-text-primary tracking-[-0.02em] leading-snug">
          {slot.title}
        </h3>

        <p className="font-sans text-xs sm:text-sm text-text-secondary mt-1.5 leading-relaxed line-clamp-2">
          {slot.description}
        </p>
      </div>

      {/* Photography Pedestal */}
      <div
        className="my-4 relative aspect-[16/8] w-full rounded-xl overflow-hidden border flex items-center justify-center p-4 transition-all duration-300"
        style={{
          backgroundColor: theme.bgLight,
          borderColor: theme.borderLight,
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          <Image
            src={assetPath(slot.imageSrc)}
            alt={slot.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-contain drop-shadow-[0_8px_16px_rgba(20,23,21,0.08)]"
          />
        </div>
      </div>

      <div className="pt-3 border-t border-border flex items-center justify-between relative z-10">
        <Link
          href={`/categories/${slot.categorySlug}`}
          className="inline-flex items-center gap-1 font-sans font-semibold text-xs text-accent hover:underline"
        >
          <span>Explore Equipment</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>

        <Link
          href={`/contact?subject=inquiry-${slot.categorySlug}`}
          className="text-text-muted hover:text-text-primary font-sans text-xs transition-colors"
        >
          Inquire
        </Link>
      </div>
    </div>
  );
}
