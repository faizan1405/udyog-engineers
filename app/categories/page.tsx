import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { getAllCategories } from "@/data/categories";
import { ProductCategory } from "@/types/category";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { cn, assetPath } from "@/lib/utils";
import { getCategoryTheme } from "@/config/categoryThemes";

export const metadata: Metadata = {
  title: "Professional Equipment Categories | Udyog Engineers",
  description:
    "Explore our 8 specialized equipment disciplines for field research, surveying, optical measurement, and environmental monitoring.",
  alternates: {
    canonical: "/categories",
  },
};

/**
 * Photorealistic technical hardware pedestal for directory listing.
 * Presents the cropped product photo with 75%-90% container fill and category-tuned styling.
 */
function CategoryPedestal({
  category,
  aspectClass = "aspect-[4/3]",
  className,
}: {
  category: ProductCategory;
  aspectClass?: string;
  className?: string;
}) {
  const theme = getCategoryTheme(category.slug);
  const imageSrc = category.image || category.heroImage;
  const indexStr = String(category.order).padStart(2, "0");

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border shadow-sm group-hover:shadow-md transition-all duration-300 flex items-center justify-center p-4 sm:p-6",
        aspectClass,
        className
      )}
      style={{
        backgroundColor: theme.bgLight,
        borderColor: theme.borderLight,
      }}
    >
      {/* Ambient gradient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${theme.accent}14 0%, transparent 70%)`,
        }}
      />

      {/* Category Index Tag */}
      <div
        className="absolute top-3 right-3 font-mono text-[10px] tracking-wider px-2.5 py-0.5 rounded-full border z-10 font-semibold"
        style={{
          backgroundColor: `${theme.bgLight}E6`,
          borderColor: `${theme.borderLight}99`,
          color: theme.accent,
        }}
      >
        <span>{indexStr} · {category.name}</span>
      </div>

      {/* Main Product Photography */}
      {imageSrc ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={assetPath(imageSrc)}
            alt={`${category.name} - ${category.domain || "Field Equipment"}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px"
            className="object-contain drop-shadow-[0_8px_16px_rgba(20,23,21,0.10)] group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          />
        </div>
      ) : (
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
          <span className="font-display text-xs uppercase tracking-widest text-text-primary font-semibold">
            {category.name}
          </span>
          <span className="font-sans text-[10px] text-text-muted mt-1">
            {category.domain || "Technical Discipline"}
          </span>
        </div>
      )}
    </div>
  );
}

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="bg-background min-h-screen">
      {/* =========================================================================
          RESTRAINED INNER HERO SECTION
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
              <div className="flex items-center gap-2 font-sans text-xs text-brand-green mb-2.5 font-semibold">
                <span>Equipment Disciplines</span>
                <span className="text-border-strong">•</span>
                <span className="text-text-muted font-normal">8 Specialized Categories</span>
              </div>

              {/* Main Heading */}
              <h1
                id="categories-header-heading"
                className="font-display font-semibold text-[36px] sm:text-[44px] md:text-[50px] lg:text-[56px] text-text-primary tracking-[-0.035em] leading-[1.05]"
              >
                Professional Equipment Categories
              </h1>

              {/* Narrative */}
              <p className="font-sans text-base sm:text-lg text-text-secondary leading-[1.6] mt-3.5 max-w-xl">
                Precision instrumentation organized across eight specialized disciplines for surveying, optical observation, geodetic positioning, and field research.
              </p>
            </div>

            {/* Micro Block (Desktop) */}
            <div className="hidden lg:flex flex-col items-end text-right font-sans text-xs text-text-muted space-y-1 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-green" />
                <span className="text-text-primary font-semibold">8 Disciplines Coordinated</span>
              </div>
              <div className="text-[11px]">Government &amp; Institutional Supply</div>
              <div className="text-[11px] text-text-secondary">Verified Specifications</div>
            </div>
          </div>

          {/* Quick Filter / Jump Bar */}
          <div className="mt-5 pt-1 flex flex-wrap items-center gap-2 text-xs font-sans">
            <span className="text-[12px] font-semibold text-text-primary mr-1">
              Disciplines:
            </span>
            {categories.map((c) => {
              const theme = getCategoryTheme(c.slug);
              return (
                <a
                  key={c.slug}
                  href={`#discipline-${c.slug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/80 bg-surface-secondary/70 text-text-secondary hover:text-text-primary hover:border-brand-green transition-colors font-sans text-xs font-medium"
                >
                  <span
                    className="font-mono text-[11px] font-semibold"
                    style={{ color: theme.accent }}
                  >
                    {String(c.order).padStart(2, "0")}
                  </span>
                  <span>{c.name}</span>
                </a>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          EDITORIAL DISCIPLINE DIRECTORY (Alternating Architectural Rows)
         ========================================================================= */}
      <section
        aria-label="Discipline Directory"
        className="py-12 sm:py-16 lg:py-20"
      >
        <Container>
          <div className="divide-y divide-border/80 border-y border-border/80">
            {categories.map((category, index) => {
              const isEven = index % 2 === 1;
              const indexStr = String(category.order).padStart(2, "0");
              const theme = getCategoryTheme(category.slug);

              return (
                <article
                  key={category.id}
                  id={`discipline-${category.slug}`}
                  className="py-12 sm:py-16 lg:py-20 group scroll-mt-24"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                    {/* TEXT & SCOPE COLUMN */}
                    <div
                      className={cn(
                        "lg:col-span-7 flex flex-col justify-center",
                        isEven && "lg:order-2"
                      )}
                    >
                      {/* Monospace Taxonomy Eyebrow */}
                      <div className="flex items-center gap-3 mb-2.5">
                        <span
                          className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full border"
                          style={{
                            backgroundColor: theme.bgLight,
                            borderColor: `${theme.borderLight}99`,
                            color: theme.accent,
                          }}
                        >
                          {`${indexStr} / 08`}
                        </span>
                        <span className="text-border-strong">•</span>
                        <span className="font-sans text-xs text-text-muted font-medium">
                          {category.domain || "Specialist Discipline"}
                        </span>
                      </div>

                      {/* Discipline Title */}
                      <h2 className="font-display font-semibold text-2xl sm:text-3xl lg:text-[34px] text-text-primary group-hover:text-brand-green transition-colors duration-200 tracking-[-0.025em]">
                        <Link href={`/categories/${category.slug}`}>
                          {category.name}
                        </Link>
                      </h2>

                      {/* Editorial Narrative */}
                      <p className="font-sans text-base sm:text-[17px] text-text-secondary mt-3 leading-[1.65] max-w-2xl">
                        {category.description}
                      </p>

                      {/* Application Context Pills */}
                      {category.applicationContexts && (
                        <div className="mt-5 pt-4 border-t border-border/70">
                          <span className="font-sans text-sm font-semibold text-text-primary block mb-2.5">
                            Typical Applications
                          </span>
                          <ul className="space-y-2 font-sans">
                            {category.applicationContexts.map((ctx, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2.5 text-[15px] sm:text-[16px] text-text-secondary leading-snug"
                              >
                                <CheckCircle2
                                  className="w-4 h-4 shrink-0 mt-0.5"
                                  style={{ color: theme.accent }}
                                />
                                <span>{ctx}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Action CTA Buttons */}
                      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <Link
                          href={`/categories/${category.slug}`}
                          className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-green text-white font-sans font-semibold text-[15px] rounded-xl hover:bg-brand-green-hover transition-colors shadow-xs w-full sm:w-auto tracking-normal"
                        >
                          <span>Explore {category.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>

                        <Link
                          href={`/contact?subject=inquiry-${category.slug}`}
                          className="min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3 bg-surface border border-border/80 text-text-primary font-sans font-semibold text-[15px] rounded-xl hover:bg-surface-secondary transition-colors w-full sm:w-auto tracking-normal"
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
                        className="block focus-visible:outline-2 focus-visible:outline-brand-green rounded-2xl"
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
          <div className="mt-16 p-8 sm:p-12 rounded-2xl border border-border/80 bg-surface shadow-xs relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 font-sans text-xs text-brand-green mb-2 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-brand-green" />
                  <span>Multi-Discipline Requirement Coordination</span>
                </div>
                <h3 className="font-display font-semibold text-2xl sm:text-3xl text-text-primary tracking-[-0.025em]">
                  Need equipment across multiple categories?
                </h3>
                <p className="font-sans text-base text-text-secondary mt-2.5 leading-[1.65]">
                  Share your full project parameters, required instrument types, or specification scope. Our team will review the inquiry and coordinate available documentation.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/contact"
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-green text-white font-sans font-semibold text-[15px] rounded-xl hover:bg-brand-green-hover transition-colors shadow-xs w-full sm:w-auto tracking-normal"
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
