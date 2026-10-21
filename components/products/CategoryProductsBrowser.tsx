"use client";

import React, { useState, useMemo } from "react";
import { Product } from "@/types/product";
import { ProductCategory, ProductSubcategory } from "@/types/category";
import { ProductCard } from "@/components/products/ProductCard";
import { cn } from "@/lib/utils";
import { Layers, Navigation, Watch, ShieldCheck } from "lucide-react";

export interface CategoryProductsBrowserProps {
  category: ProductCategory;
  products: Product[];
}

/**
 * Normalizes and compares subcategory slugs, ensuring full compatibility
 * with legacy slugs (e.g. garmin-handheld-gps <-> handheld-gps).
 */
function isSubcategoryMatch(productSlug?: string, targetSlug?: string): boolean {
  if (!productSlug || !targetSlug) return false;
  const p = productSlug.toLowerCase();
  const t = targetSlug.toLowerCase();
  if (p === t) return true;
  if (
    (p === "garmin-handheld-gps" || p === "handheld-gps" || p === "wrist-mounted-gps") &&
    (t === "garmin-handheld-gps" || t === "handheld-gps" || t === "wrist-mounted-gps")
  ) {
    return true;
  }
  if (
    (p === "gps-smartwatches-wearables" || p === "smartwatches-wearables" || p === "gps-smartwatches") &&
    (t === "gps-smartwatches-wearables" || t === "smartwatches-wearables" || t === "gps-smartwatches")
  ) {
    return true;
  }
  return false;
}

export function CategoryProductsBrowser({
  category,
  products,
}: CategoryProductsBrowserProps) {
  const [activeSubcategory, setActiveSubcategory] = useState<string>("all");
  const [activeBrand, setActiveBrand] = useState<string>("all");

  const subcategories: ProductSubcategory[] = useMemo(
    () => category.subcategories || [],
    [category.subcategories]
  );

  // Available brands within this category
  const availableBrands = useMemo(() => {
    const brands = new Set<string>();
    products.forEach((p) => {
      if (p.brand) {
        brands.add(p.brand);
      }
    });
    return Array.from(brands).sort();
  }, [products]);

  // Filtered products when filtering by subcategory or brand
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (activeSubcategory !== "all") {
        if (!isSubcategoryMatch(p.subcategorySlug, activeSubcategory)) {
          return false;
        }
      }
      if (activeBrand !== "all") {
        if (!p.brand || p.brand.toLowerCase() !== activeBrand.toLowerCase()) {
          return false;
        }
      }
      return true;
    });
  }, [products, activeSubcategory, activeBrand]);

  // Group products by subcategory for sectioned view when "all" is active
  const productsBySubcategory = useMemo(() => {
    if (subcategories.length === 0) return [];

    return subcategories.map((subcat) => {
      const items = products.filter(
        (p) =>
          isSubcategoryMatch(p.subcategorySlug, subcat.slug) &&
          (activeBrand === "all" || p.brand?.toLowerCase() === activeBrand.toLowerCase())
      );
      return {
        subcat,
        items,
      };
    });
  }, [subcategories, products, activeBrand]);

  const handleSubcategorySelect = (slug: string) => {
    setActiveSubcategory(slug);
  };

  const handleBrandSelect = (brand: string) => {
    setActiveBrand(brand);
  };

  return (
    <div className="space-y-10">
      {/* Subcategory & Brand Navigation Filter Bar */}
      <div className="p-5 sm:p-6 rounded-2xl border border-border/80 bg-surface shadow-xs space-y-4">
        {/* Subcategory Filter Tabs */}
        {subcategories.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="font-sans text-xs text-text-muted font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-brand-green" />
                <span>{category.name} Subcategories</span>
              </span>
              {(activeSubcategory !== "all" || activeBrand !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveSubcategory("all");
                    setActiveBrand("all");
                  }}
                  className="text-xs font-sans text-brand-green hover:underline font-medium"
                >
                  View All Subcategories
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleSubcategorySelect("all")}
                className={cn(
                  "px-3.5 py-1.5 rounded-full border text-xs font-sans font-medium transition-all min-h-[36px]",
                  activeSubcategory === "all"
                    ? "bg-brand-green text-white border-brand-green shadow-xs"
                    : "bg-surface-secondary/70 border-border/80 text-text-secondary hover:text-text-primary hover:border-brand-green/40"
                )}
              >
                <span>All {category.name}</span>
                <span className="font-mono text-[11px] ml-1.5 opacity-80">({products.length})</span>
              </button>
              {subcategories.map((subcat) => {
                const count = products.filter((p) =>
                  isSubcategoryMatch(p.subcategorySlug, subcat.slug)
                ).length;
                const isSelected = activeSubcategory === subcat.slug;
                const isWatch =
                  subcat.slug.includes("watch") ||
                  subcat.name.toLowerCase().includes("watch");

                return (
                  <button
                    key={subcat.slug}
                    type="button"
                    onClick={() => handleSubcategorySelect(subcat.slug)}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-sans font-medium transition-all min-h-[36px]",
                      isSelected
                        ? "bg-text-primary text-surface border-text-primary shadow-xs"
                        : "bg-surface text-text-secondary border-border/80 hover:text-text-primary hover:border-brand-green/40"
                    )}
                  >
                    {isWatch ? (
                      <Watch className="w-3.5 h-3.5 opacity-70" />
                    ) : (
                      <Navigation className="w-3.5 h-3.5 opacity-70" />
                    )}
                    <span>{subcat.name}</span>
                    <span className="font-mono text-[11px] text-text-muted">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Brand Filter Row (when more than 1 brand exists) */}
        {availableBrands.length > 1 && (
          <div className="pt-3 border-t border-border/60">
            <span className="font-sans text-[11px] text-text-muted block mb-2 font-semibold uppercase tracking-wider">
              Filter by Manufacturer / Brand:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleBrandSelect("all")}
                className={cn(
                  "px-3 py-1 rounded-full border text-xs font-sans font-medium transition-all",
                  activeBrand === "all"
                    ? "bg-text-primary text-surface border-text-primary"
                    : "bg-surface text-text-secondary border-border/80 hover:border-brand-green/40"
                )}
              >
                All Brands
              </button>
              {availableBrands.map((brand) => {
                const isSelected = activeBrand.toLowerCase() === brand.toLowerCase();
                const count = products.filter(
                  (p) =>
                    p.brand?.toLowerCase() === brand.toLowerCase() &&
                    (activeSubcategory === "all" || isSubcategoryMatch(p.subcategorySlug, activeSubcategory))
                ).length;
                return (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => handleBrandSelect(brand)}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-sans font-medium transition-all",
                      isSelected
                        ? "bg-text-primary text-surface border-text-primary"
                        : "bg-surface text-text-secondary border-border/80 hover:border-brand-green/40"
                    )}
                  >
                    <span>{brand}</span>
                    <span className="font-mono text-[10px] text-text-muted">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* SECTIONED VIEW: When viewing "All" and subcategories exist */}
      {activeSubcategory === "all" && subcategories.length > 0 ? (
        <div className="space-y-16">
          {productsBySubcategory.map(({ subcat, items }) => {
            if (items.length === 0) return null;
            const isWatchGroup =
              subcat.slug.includes("watch") ||
              subcat.name.toLowerCase().includes("watch");

            return (
              <section
                key={subcat.slug}
                id={subcat.slug}
                aria-labelledby={`heading-${subcat.slug}`}
                className="scroll-mt-24 space-y-6"
              >
                {/* Visual Subcategory Header Plate */}
                <div className="rounded-2xl border border-border/80 bg-surface p-6 sm:p-7 shadow-xs">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/70">
                    <div>
                      {/* Eyebrow Pill */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase bg-brand-green/10 text-brand-green border border-brand-green/20">
                          {isWatchGroup ? (
                            <Watch className="w-3.5 h-3.5" />
                          ) : (
                            <Navigation className="w-3.5 h-3.5" />
                          )}
                          <span>{subcat.name.toUpperCase()}</span>
                        </span>
                        <span className="text-border-strong">•</span>
                        <span className="font-sans text-xs text-text-muted">{category.name} Discipline</span>
                      </div>

                      {/* Main Subcategory Title */}
                      <h3
                        id={`heading-${subcat.slug}`}
                        className="font-display font-semibold text-2xl sm:text-3xl text-text-primary tracking-[-0.025em]"
                      >
                        {subcat.name}
                        <span className="font-mono text-base sm:text-lg font-normal text-text-muted ml-2">
                          ({items.length} {items.length === 1 ? "Model" : "Models"})
                        </span>
                      </h3>

                      {subcat.description && (
                        <p className="font-sans text-sm sm:text-[15px] text-text-secondary mt-2 max-w-3xl leading-relaxed">
                          {subcat.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs font-sans text-text-muted shrink-0 self-start md:self-auto bg-surface-secondary/70 px-3.5 py-1.5 rounded-lg border border-border/60">
                      <ShieldCheck className="w-4 h-4 text-brand-green" />
                      <span>Verified Manufacturer Hardware</span>
                    </div>
                  </div>

                  {/* Independent Subcategory Product Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-6">
                    {items.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        /* FILTERED VIEW: When a specific subcategory is selected */
        <div className="space-y-6">
          <div className="rounded-2xl border border-border/80 bg-surface p-6 sm:p-7 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-border/70">
              <div>
                <div className="flex items-center gap-2 font-sans text-xs text-brand-green mb-1.5 font-semibold">
                  <span>{category.name}</span>
                  {activeSubcategory !== "all" && (
                    <>
                      <span className="text-border-strong">•</span>
                      <span className="font-mono uppercase tracking-wider text-text-primary">
                        {subcategories.find((s) => s.slug === activeSubcategory)?.name}
                      </span>
                    </>
                  )}
                  {activeBrand !== "all" && (
                    <>
                      <span className="text-border-strong">•</span>
                      <span className="text-brand-green font-semibold">{activeBrand}</span>
                    </>
                  )}
                </div>
                <h3 className="font-display font-semibold text-2xl sm:text-3xl text-text-primary tracking-[-0.025em]">
                  {activeSubcategory !== "all"
                    ? subcategories.find((s) => s.slug === activeSubcategory)?.name
                    : "Verified Instruments"}{" "}
                  <span className="font-mono text-base sm:text-lg font-normal text-text-muted ml-1">
                    ({filteredProducts.length} {filteredProducts.length === 1 ? "Model" : "Models"})
                  </span>
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-sans text-text-muted bg-surface-secondary/70 px-3 py-1.5 rounded-lg border border-border/60">
                <ShieldCheck className="w-4 h-4 text-brand-green" />
                <span>Institutional Supply · Direct Quotation Coordination</span>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center space-y-4 max-w-xl mx-auto">
                <h4 className="font-display font-semibold text-lg text-text-primary">
                  No instruments match the selected filter
                </h4>
                <p className="font-sans text-sm text-text-secondary leading-relaxed">
                  Please clear or select another subcategory or manufacturer.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveSubcategory("all");
                    setActiveBrand("all");
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-green text-white font-sans text-sm font-semibold rounded-xl hover:bg-brand-green-hover transition-colors shadow-xs"
                >
                  <span>Reset Category Filters</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
