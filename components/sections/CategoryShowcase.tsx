"use client";

import React from "react";
import Link from "next/link";
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
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getAllCategories } from "@/data/categories";
import { ProductCategory } from "@/types/category";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { PRECISION_EASE, DURATION } from "@/lib/motion";

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

interface CategoryPedestalProps {
  category: ProductCategory;
  aspectClass?: string;
  className?: string;
}

/**
 * Tasteful neutral pedestal for equipment category modules.
 * Designed to seamlessly receive authentic photography in the future
 * without altering card layout, typography, or structural framing.
 */
function CategoryPedestal({
  category,
  aspectClass = "aspect-[16/10]",
  className,
}: CategoryPedestalProps) {
  const IconComponent = (category.icon && ICON_MAP[category.icon]) || Compass;
  const indexStr = String(category.order).padStart(2, "0");

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[2px] border border-border-subtle bg-surface-secondary/70 flex items-center justify-center transition-colors group-hover:bg-surface-secondary",
        aspectClass,
        className
      )}
    >
      {/* 4 Corner Micro Registration Crosshairs */}
      <span
        aria-hidden="true"
        className="absolute top-1.5 left-1.5 font-mono text-[9px] text-accent-secondary/50 select-none leading-none"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="absolute top-1.5 right-1.5 font-mono text-[9px] text-accent-secondary/50 select-none leading-none"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-1.5 left-1.5 font-mono text-[9px] text-accent-secondary/50 select-none leading-none"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-1.5 right-1.5 font-mono text-[9px] text-accent-secondary/50 select-none leading-none"
      >
        +
      </span>

      {/* Subtle Hairline Grid Pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.25] bg-[linear-gradient(to_right,#E2DFD6_1px,transparent_1px),linear-gradient(to_bottom,#E2DFD6_1px,transparent_1px)] bg-[size:24px_24px]"
      />

      {/* Optical Reticle Center Rings (Hairline Accent) */}
      <div
        aria-hidden="true"
        className="absolute w-24 h-24 rounded-full border border-border-strong/40 pointer-events-none opacity-40 group-hover:scale-105 transition-transform duration-300 ease-precision"
      />

      {/* Category Index Watermark */}
      <span
        aria-hidden="true"
        className="absolute bottom-2 right-2.5 font-mono text-[10px] text-text-muted/60 font-medium tracking-wider select-none"
      >
        DISCIPLINE // {indexStr}
      </span>

      {/* Architectural Icon Focus Badge */}
      <div className="relative z-10 flex flex-col items-center justify-center p-3 sm:p-4 rounded-[2px] bg-surface border border-border shadow-[0_1px_3px_rgba(20,23,21,0.04)] group-hover:scale-[1.03] group-hover:border-accent-primary transition-all duration-300 ease-precision">
        <IconComponent
          className="w-6 h-6 sm:w-7 sm:h-7 text-accent transition-colors duration-200 ease-precision"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

/**
 * CATEGORY SHOWCASE (PHASE 4B)
 *
 * Curated portfolio of 8 equipment disciplines rendered in an
 * asymmetric editorial grid on desktop and an ergonomic hierarchy on mobile.
 */
export function CategoryShowcase() {
  const shouldReduceMotion = useReducedMotion();
  const categories = getAllCategories();

  // Map categories by order (1-indexed)
  const cat1 = categories.find((c) => c.order === 1) || categories[0];
  const cat2 = categories.find((c) => c.order === 2) || categories[1];
  const cat3 = categories.find((c) => c.order === 3) || categories[2];
  const cat4 = categories.find((c) => c.order === 4) || categories[3];
  const cat5 = categories.find((c) => c.order === 5) || categories[4];
  const cat6 = categories.find((c) => c.order === 6) || categories[5];
  const cat7 = categories.find((c) => c.order === 7) || categories[6];
  const cat8 = categories.find((c) => c.order === 8) || categories[7];

  return (
    <section
      id="equipment-categories"
      aria-label="Equipment Categories Portfolio"
      className="relative bg-surface border-t border-border py-16 md:py-24 overflow-hidden"
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
              <span className="font-semibold">02 // EQUIPMENT CATEGORIES</span>
              <span className="text-border-strong">|</span>
              <span className="text-text-muted">PORTFOLIO DISCIPLINES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-text-primary font-display">
              Curated Technical Portfolios
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="font-sans text-sm text-text-secondary max-w-md leading-relaxed">
              Specialized field instrumentation categorized across eight core disciplines for survey, optical observation, and precision geodetic measurement.
            </p>
            <Link
              href="/categories"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-accent font-semibold hover:underline self-start sm:self-auto shrink-0"
            >
              <span>View All 8 Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* =========================================================================
            DESKTOP EDITORIAL ASYMMETRIC GRID (>= 1024px)
            Rhythm:
            - Tier 1: Large Feature (01 Optics, 7 cols) + Two Stacked Modules (02 GPS, 03 Night Vision, 5 cols)
            - Tier 2: Balanced Module (04 Thermal, 5 cols) + Large Feature (05 Geological Compass, 7 cols)
            - Tier 3: Balanced 3-Col Architectural Rail (06 Camping, 07 Weather, 08 Forestry, 4 cols each)
           ========================================================================= */}
        <div className="hidden lg:flex flex-col gap-8">
          {/* --- TIER 1: Optics Feature (7) + GPS / Night Vision Stack (5) --- */}
          <div className="grid grid-cols-12 gap-8 items-stretch">
            {/* 01 Optics (Primary Large Feature) */}
            <Link
              href={`/categories/${cat1.slug}`}
              className="group col-span-7 flex flex-col justify-between p-7 rounded-[2px] border border-border bg-background hover:border-accent-primary hover:bg-surface-secondary/40 transition-colors duration-200 ease-precision"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <span className="font-mono text-xs font-semibold text-accent-secondary group-hover:text-accent tracking-wider transition-colors duration-150">
                    01 / 08
                  </span>
                  <h3 className="font-display font-bold text-2xl text-text-primary group-hover:text-accent transition-colors duration-150 mt-1">
                    {cat1.name}
                  </h3>
                  <p className="font-sans text-sm text-text-secondary mt-2 max-w-md leading-relaxed">
                    {cat1.shortDescription}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-[2px] border border-border bg-surface flex items-center justify-center shrink-0 group-hover:border-accent-primary transition-colors duration-200 ease-precision">
                  <ArrowRight className="w-4 h-4 text-text-primary group-hover:text-accent group-hover:translate-x-1 transition-all duration-200 ease-precision" />
                </div>
              </div>

              <CategoryPedestal category={cat1} aspectClass="aspect-[16/9]" />
            </Link>

            {/* GPS (02) & Night Vision (03) Stack */}
            <div className="col-span-5 flex flex-col gap-6">
              {[cat2, cat3].map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="group flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-5 rounded-[2px] border border-border bg-background hover:border-accent-primary hover:bg-surface-secondary/40 transition-colors duration-200 ease-precision"
                >
                  <div className="flex-1">
                    <span className="font-mono text-xs font-semibold text-accent-secondary group-hover:text-accent tracking-wider transition-colors duration-150">
                      {String(cat.order).padStart(2, "0")} / 08
                    </span>
                    <h3 className="font-display font-semibold text-lg text-text-primary group-hover:text-accent transition-colors duration-150 mt-0.5">
                      {cat.name}
                    </h3>
                    <p className="font-sans text-xs text-text-secondary mt-1.5 leading-relaxed line-clamp-2">
                      {cat.shortDescription}
                    </p>
                    <div className="mt-3 flex items-center gap-1 font-mono text-[11px] font-semibold text-accent group-hover:underline">
                      <span>Explore Archive</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200 ease-precision" />
                    </div>
                  </div>

                  <div className="w-full sm:w-36 shrink-0">
                    <CategoryPedestal category={cat} aspectClass="aspect-[4/3]" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* --- TIER 2: Thermal (5) + Geological Compass Feature (7) --- */}
          <div className="grid grid-cols-12 gap-8 items-stretch">
            {/* 04 Thermal */}
            {/* 04 Thermal */}
            <Link
              href={`/categories/${cat4.slug}`}
              className="group col-span-5 flex flex-col justify-between p-6 rounded-[2px] border border-border bg-background hover:border-accent-primary hover:bg-surface-secondary/40 transition-colors duration-200 ease-precision"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <span className="font-mono text-xs font-semibold text-accent-secondary group-hover:text-accent tracking-wider transition-colors duration-150">
                    04 / 08
                  </span>
                  <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-200 ease-precision" />
                </div>
                <h3 className="font-display font-bold text-xl text-text-primary group-hover:text-accent transition-colors duration-150">
                  {cat4.name}
                </h3>
                <p className="font-sans text-xs text-text-secondary mt-1.5 leading-relaxed line-clamp-2">
                  {cat4.shortDescription}
                </p>
              </div>

              <div className="mt-6">
                <CategoryPedestal category={cat4} aspectClass="aspect-[16/10]" />
              </div>
            </Link>

            {/* 05 Geological Compass (Feature on Right) */}
            <Link
              href={`/categories/${cat5.slug}`}
              className="group col-span-7 flex flex-col justify-between p-7 rounded-[2px] border border-border bg-background hover:border-accent-primary hover:bg-surface-secondary/40 transition-colors duration-200 ease-precision"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <span className="font-mono text-xs font-semibold text-accent-secondary group-hover:text-accent tracking-wider transition-colors duration-150">
                    05 / 08
                  </span>
                  <h3 className="font-display font-bold text-2xl text-text-primary group-hover:text-accent transition-colors duration-150 mt-1">
                    {cat5.name}
                  </h3>
                  <p className="font-sans text-sm text-text-secondary mt-2 max-w-md leading-relaxed">
                    {cat5.shortDescription}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-[2px] border border-border bg-surface flex items-center justify-center shrink-0 group-hover:border-accent-primary transition-colors duration-200 ease-precision">
                  <ArrowRight className="w-4 h-4 text-text-primary group-hover:text-accent group-hover:translate-x-1 transition-all duration-200 ease-precision" />
                </div>
              </div>

              <CategoryPedestal category={cat5} aspectClass="aspect-[16/9]" />
            </Link>
          </div>

          {/* --- TIER 3: Camping (4) + Weather Station (4) + Forestry Items (4) --- */}
          <div className="grid grid-cols-12 gap-8">
            {[cat6, cat7, cat8].map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group col-span-4 flex flex-col justify-between p-6 rounded-[2px] border border-border bg-background hover:border-accent-primary hover:bg-surface-secondary/40 transition-colors duration-200 ease-precision"
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-mono text-xs font-semibold text-accent-secondary group-hover:text-accent tracking-wider transition-colors duration-150">
                      {String(cat.order).padStart(2, "0")} / 08
                    </span>
                    <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-200 ease-precision" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-text-primary group-hover:text-accent transition-colors duration-150">
                    {cat.name}
                  </h3>
                  <p className="font-sans text-xs text-text-secondary mt-1.5 leading-relaxed line-clamp-2">
                    {cat.shortDescription}
                  </p>
                </div>

                <div className="mt-5">
                  <CategoryPedestal category={cat} aspectClass="aspect-[16/10]" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* =========================================================================
            TABLET VIEW (768px – 1023px): Clean 2-Column Balanced Grid
           ========================================================================= */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group flex flex-col justify-between p-6 rounded-[2px] border border-border bg-background hover:border-accent-primary hover:bg-surface-secondary/40 transition-all duration-200"
            >
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-semibold text-accent-secondary group-hover:text-accent">
                    {String(cat.order).padStart(2, "0")} / 08
                  </span>
                  <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="font-display font-semibold text-xl text-text-primary group-hover:text-accent transition-colors">
                  {cat.name}
                </h3>
                <p className="font-sans text-xs text-text-secondary mt-1.5 leading-relaxed line-clamp-2">
                  {cat.shortDescription}
                </p>
              </div>

              <CategoryPedestal category={cat} aspectClass="aspect-[16/10]" />
            </Link>
          ))}
        </div>

        {/* =========================================================================
            MOBILE VIEW (< 768px): Intentional Handheld Ergonomic Hierarchy
            - Hero Feature: 01 Optics (Prominent full card)
            - Tactile Category Panels: 02 through 08 (Min 56px touch height, clear indices)
           ========================================================================= */}
        <div className="flex flex-col gap-4 md:hidden">
          {/* Top Hero Discipline Feature (01 Optics) */}
          <Link
            href={`/categories/${cat1.slug}`}
            className="group flex flex-col p-5 rounded-[2px] border border-border bg-background hover:border-accent-primary transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs font-semibold text-accent-secondary">
                01 / 08 // FEATURED DISCIPLINE
              </span>
              <ArrowRight className="w-4 h-4 text-text-primary group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-display font-bold text-xl text-text-primary group-hover:text-accent transition-colors">
              {cat1.name}
            </h3>
            <p className="font-sans text-xs text-text-secondary mt-1 leading-relaxed">
              {cat1.shortDescription}
            </p>

            <div className="mt-4">
              <CategoryPedestal category={cat1} aspectClass="aspect-[16/10]" />
            </div>
          </Link>

          {/* Structured Tactile Discipline Panels (02 through 08) */}
          <div className="flex flex-col gap-2 mt-2">
            <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted px-1 font-medium">
              REMAINING DISCIPLINES (02–08):
            </span>

            {categories.slice(1).map((cat) => {
              const IconComp =
                (cat.icon && ICON_MAP[cat.icon]) || Compass;

              return (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="group flex items-center justify-between min-h-[56px] p-3.5 rounded-[2px] border border-border bg-background hover:border-accent-primary hover:bg-surface-secondary/40 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 rounded-[2px] bg-surface-secondary border border-border-subtle flex items-center justify-center shrink-0 group-hover:border-accent-primary transition-colors">
                      <IconComp className="w-5 h-5 text-accent" aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="font-mono text-[10px] text-accent-secondary font-medium shrink-0">
                          {String(cat.order).padStart(2, "0")}
                        </span>
                        <h3 className="font-display font-semibold text-sm text-text-primary group-hover:text-accent transition-colors truncate">
                          {cat.name}
                        </h3>
                      </div>
                      <p className="font-sans text-[11px] text-text-muted truncate">
                        {cat.shortDescription}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-transform shrink-0 ml-2" />
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
