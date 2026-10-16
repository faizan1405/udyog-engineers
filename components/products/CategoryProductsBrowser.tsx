"use client";

import React, { useState, useMemo } from "react";
import { Product } from "@/types/product";
import { ProductCategory, ProductSubcategory } from "@/types/category";
import { ProductCard } from "@/components/products/ProductCard";
import { cn } from "@/lib/utils";
import { Layers } from "lucide-react";

export interface CategoryProductsBrowserProps {
  category: ProductCategory;
  products: Product[];
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
        if (!p.subcategorySlug || p.subcategorySlug.toLowerCase() !== activeSubcategory.toLowerCase()) {
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
          p.subcategorySlug?.toLowerCase() === subcat.slug.toLowerCase() &&
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
                const count = products.filter(
                  (p) => p.subcategorySlug?.toLowerCase() === subcat.slug.toLowerCase()
                ).length;
                const isSelected = activeSubcategory === subcat.slug;
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
                    (activeSubcategory === "all" || p.subcategorySlug?.toLowerCase() === activeSubcategory.toLowerCase())
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
      {activeSubcategory === "all" && subcategories.length > 0 && activeBrand === "all" ? (
        <div className="space-y-16">
          {productsBySubcategory.map(({ subcat, items }) => {
            if (items.length === 0) return null;
            return (
              <div key={subcat.slug} className="space-y-6 scroll-mt-24" id={subcat.slug}>
                {/* Subcategory Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-border/80">
                  <div>
                    <div className="flex items-center gap-2 font-sans text-xs text-brand-green mb-1 font-semibold">
                      <span>{category.name}</span>
                      <span className="text-border-strong">•</span>
                      <span className="text-text-muted font-normal">Subcategory</span>
                    </div>
                    <h3 className="font-display font-semibold text-2xl sm:text-3xl text-text-primary tracking-[-0.02em]">
                      {subcat.name} ({items.length})
                    </h3>
                    {subcat.description && (
                      <p className="font-sans text-sm text-text-secondary mt-1.5 max-w-2xl leading-relaxed">
                        {subcat.description}
                      </p>
                    )}
                  </div>
                  <span className="font-sans text-xs text-text-muted shrink-0">
                    Verified Manufacturer Models
                  </span>
                </div>

                {/* Subcategory Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {items.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* FILTERED VIEW: When a specific subcategory or brand is active */
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-border/70">
            <div>
              <div className="flex items-center gap-2 font-sans text-xs text-brand-green mb-1 font-semibold">
                <span>{category.name}</span>
                {activeSubcategory !== "all" && (
                  <>
                    <span className="text-border-strong">•</span>
                    <span className="text-text-primary font-medium">
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
                ({filteredProducts.length})
              </h3>
            </div>
            <span className="font-sans text-xs text-text-muted">
              Institutional Supply · Direct Quotation Coordination
            </span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="p-12 border border-border/80 bg-surface rounded-2xl text-center space-y-4 shadow-xs max-w-xl mx-auto">
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
      )}
    </div>
  );
}
