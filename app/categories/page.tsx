import React from "react";
import { Metadata } from "next";
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
  ShieldCheck,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { getAllCategories } from "@/data/categories";
import { ProductCategory } from "@/types/category";
import { Container } from "@/components/ui/Container";
import { isStagingOrDevelopment } from "@/lib/staging";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Professional Equipment Categories | Udyog Engineers",
  description:
    "Explore our 8 specialized equipment disciplines for field research, surveying, optical metrology, and environmental monitoring.",
  alternates: {
    canonical: "/categories",
  },
};

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

/**
 * Image-ready technical hardware pedestal.
 * Designed so authentic photography drops in without layout disruption.
 */
function CategoryPedestal({
  category,
  aspectClass = "aspect-[16/10]",
  className,
}: {
  category: ProductCategory;
  aspectClass?: string;
  className?: string;
}) {
  const IconComponent = (category.icon && ICON_MAP[category.icon]) || Compass;
  const indexStr = String(category.order).padStart(2, "0");

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[2px] border border-border bg-surface-secondary/70 flex items-center justify-center transition-colors duration-200 ease-precision group-hover:bg-surface-secondary",
        aspectClass,
        className
      )}
    >
      {/* 4 Corner Registration Crosshairs */}
      <span
        aria-hidden="true"
        className="absolute top-2 left-2 font-mono text-[9px] text-accent-secondary/50 select-none leading-none"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="absolute top-2 right-2 font-mono text-[9px] text-accent-secondary/50 select-none leading-none"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-2 left-2 font-mono text-[9px] text-accent-secondary/50 select-none leading-none"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="absolute bottom-2 right-2 font-mono text-[9px] text-accent-secondary/50 select-none leading-none"
      >
        +
      </span>

      {/* Subtle Hairline Grid Pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.25] bg-[linear-gradient(to_right,#E2DFD6_1px,transparent_1px),linear-gradient(to_bottom,#E2DFD6_1px,transparent_1px)] bg-[size:24px_24px]"
      />

      {/* Concentric Optical Reticle (Decorative Hairline) */}
      <div
        aria-hidden="true"
        className="absolute w-28 h-28 rounded-full border border-border-strong/40 pointer-events-none opacity-40 group-hover:scale-105 transition-transform duration-300 ease-precision"
      />

      {/* Category Index Watermark */}
      <div className="absolute top-2 right-3 font-mono text-[10px] text-text-muted/70 tracking-wider">
        <span>PLATE // {indexStr}</span>
      </div>

      {/* Architectural Icon Focus Badge */}
      <div className="relative z-10 flex flex-col items-center justify-center p-4 sm:p-5 rounded-[2px] bg-surface border border-border shadow-[0_1px_3px_rgba(20,23,21,0.04)] group-hover:scale-[1.03] group-hover:border-accent-primary transition-all duration-300 ease-precision">
        <IconComponent
          className="w-7 h-7 sm:w-8 sm:h-8 text-accent transition-colors duration-200 ease-precision"
          aria-hidden="true"
        />
      </div>

      {/* Bottom Technical Scale */}
      <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between font-mono text-[9px] text-text-muted pointer-events-none">
        <span>{isStagingOrDevelopment() ? "ASSET STATUS: STAGED" : "TECHNICAL SPECIFICATION"}</span>
        <span>DISCIPLINE // {indexStr}</span>
      </div>
    </div>
  );
}

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="bg-background min-h-screen">
      {/* =========================================================================
          RESTRAINED INNER HERO SECTION
          Non-homepage sized, clean breadcrumb, discipline index stamp
         ========================================================================= */}
      <section
        aria-labelledby="categories-header-heading"
        className="border-b border-border bg-surface py-8 sm:py-12 lg:py-14"
      >
        <Container>
          {/* Breadcrumb Navigation */}
          <Breadcrumb
            items={[{ label: "Categories" }]}
            className="mb-4 sm:mb-6"
          />

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-border-subtle">
            <div className="max-w-2xl">
              {/* Registration Eyebrow */}
              <div className="flex items-center gap-2 font-mono text-xs text-accent-secondary tracking-wider uppercase mb-2.5">
                <span className="font-semibold">02 // EQUIPMENT DISCIPLINES</span>
                <span className="text-border-strong">|</span>
                <span className="text-text-muted">CATALOGUE DIRECTORY</span>
              </div>

              {/* Main Heading */}
              <h1
                id="categories-header-heading"
                className="font-display font-bold text-3xl sm:text-4xl lg:text-[2.75rem] text-text-primary tracking-tight leading-tight"
              >
                Professional Equipment Categories
              </h1>

              {/* Concise Supporting Narrative */}
              <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed mt-3 max-w-xl">
                Precision instrumentation organized across eight specialized disciplines for surveying, optical observation, geodetic positioning, and field research.
              </p>
            </div>

            {/* Micro Telemetry Block (Desktop) */}
            <div className="hidden lg:flex flex-col items-end text-right font-mono text-xs text-text-muted space-y-1 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary" />
                <span className="text-text-primary font-medium">8 DISCIPLINES REGISTERED</span>
              </div>
              <div>INDEX REF // ARCHIVE-DIR-2026</div>
              <div className="text-[11px] text-text-secondary">SPECIFICATION-ALIGNED STRUCTURE</div>
            </div>
          </div>

          {/* Quick Filter / Jump Bar */}
          <div className="mt-4 pt-2 flex flex-wrap items-center gap-2 text-xs font-mono text-text-muted">
            <span className="text-[11px] uppercase tracking-wider text-text-secondary mr-1">
              DISCIPLINES:
            </span>
            {categories.map((c) => (
              <a
                key={c.slug}
                href={`#discipline-${c.slug}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[2px] bg-surface-secondary/70 border border-border text-text-secondary hover:text-text-primary hover:border-accent transition-colors"
              >
                <span className="text-accent-secondary text-[10px]">
                  {String(c.order).padStart(2, "0")}
                </span>
                <span>{c.name}</span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          EDITORIAL DISCIPLINE DIRECTORY (Alternating Architectural Rows)
          Not a generic ecommerce grid; an equipment discipline directory
         ========================================================================= */}
      <section
        aria-label="Discipline Directory"
        className="py-12 sm:py-16 lg:py-20"
      >
        <Container>
          <div className="divide-y divide-border border-y border-border">
            {categories.map((category, index) => {
              const isEven = index % 2 === 1; // 0-indexed: even index is odd row
              const indexStr = String(category.order).padStart(2, "0");

              return (
                <article
                  key={category.id}
                  id={`discipline-${category.slug}`}
                  className="py-10 sm:py-14 lg:py-16 group scroll-mt-24"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* TEXT & SCOPE COLUMN */}
                    <div
                      className={cn(
                        "lg:col-span-7 flex flex-col justify-center",
                        isEven && "lg:order-2"
                      )}
                    >
                      {/* Monospace Taxonomy Eyebrow */}
                      <div className="flex items-center gap-3 mb-2.5">
                        <span className="font-mono text-xs font-bold text-accent-secondary">
                          {`${indexStr} // 08`}
                        </span>
                        <span className="text-border-strong">|</span>
                        <span className="font-mono text-[11px] tracking-wider uppercase text-text-muted font-medium">
                          {category.domain || "SPECIALIST DISCIPLINE"}
                        </span>
                      </div>

                      {/* Discipline Title */}
                      <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary group-hover:text-accent transition-colors duration-200 ease-precision">
                        <Link href={`/categories/${category.slug}`}>
                          {category.name}
                        </Link>
                      </h2>

                      {/* Editorial Narrative */}
                      <p className="font-sans text-sm sm:text-base text-text-secondary mt-3 leading-relaxed max-w-2xl">
                        {category.description}
                      </p>

                      {/* Application Context Pills */}
                      {category.applicationContexts && (
                        <div className="mt-5 pt-4 border-t border-border-subtle">
                          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted block mb-2 font-medium">
                            PRIMARY FIELD CONTEXTS:
                          </span>
                          <ul className="space-y-1.5">
                            {category.applicationContexts.map((ctx, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-xs text-text-secondary leading-snug"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5 text-accent-secondary shrink-0 mt-0.5" />
                                <span>{ctx}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Action CTA Button (Min 48px touch target) */}
                      <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <Link
                          href={`/categories/${category.slug}`}
                          className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-display font-semibold text-xs tracking-wider uppercase rounded-[2px] hover:bg-accent-hover transition-colors duration-200 ease-precision shadow-xs w-full sm:w-auto"
                        >
                          <span>Explore {category.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 ease-precision group-hover:translate-x-1" />
                        </Link>

                        <Link
                          href={`/contact?subject=inquiry-${category.slug}`}
                          className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 bg-surface border border-border text-text-primary font-display font-semibold text-xs rounded-[2px] hover:bg-surface-secondary transition-colors duration-200 ease-precision w-full sm:w-auto"
                        >
                          <span>Inquire Discipline</span>
                        </Link>
                      </div>
                    </div>

                    {/* PEDESTAL / IMAGE COLUMN */}
                    <div
                      className={cn(
                        "lg:col-span-5",
                        isEven && "lg:order-1"
                      )}
                    >
                      <Link
                        href={`/categories/${category.slug}`}
                        className="block focus-visible:outline-2 focus-visible:outline-accent rounded-[2px]"
                        aria-label={`View ${category.name} equipment category`}
                      >
                        <CategoryPedestal
                          category={category}
                          aspectClass="aspect-[16/11] sm:aspect-[16/10] lg:aspect-[4/3]"
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* =========================================================================
              MULTI-DISCIPLINE INQUIRY BRIDGE
             ========================================================================= */}
          <div className="mt-16 p-6 sm:p-8 rounded-[2px] border border-border bg-surface relative overflow-hidden shadow-[0_1px_3px_rgba(20,23,21,0.03)]">
            <span
              aria-hidden="true"
              className="absolute top-2 right-2 font-mono text-[10px] text-accent-secondary/50 select-none"
            >
              +
            </span>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 font-mono text-xs text-accent-secondary uppercase tracking-wider mb-1.5 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>MULTI-DISCIPLINE REQUIREMENT COORDINATION</span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-text-primary">
                  Need equipment across multiple categories?
                </h3>
                <p className="font-sans text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed">
                  Share your full project parameters, required instrument types, or specification scope. The team will review the inquiry and coordinate available documentation.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/contact"
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-display font-semibold text-xs tracking-wider uppercase rounded-[2px] hover:bg-accent-hover transition-colors shadow-xs w-full sm:w-auto"
                >
                  <span>Submit Requirement Inquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
