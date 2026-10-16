"use client";

import React, { useState, useMemo } from "react";
import { Product } from "@/types/product";
import { ProductCategory } from "@/types/category";
import { ProductCard } from "@/components/products/ProductCard";
import { getCategoryTheme } from "@/config/categoryThemes";
import { Filter, X, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProductsCatalogueBrowserProps {
  products: Product[];
  categories: ProductCategory[];
  initialCategory?: string;
  initialSubcategory?: string;
  initialBrand?: string;
}

function isSubcategoryMatch(productSlug?: string, targetSlug?: string): boolean {
  if (!productSlug || !targetSlug) return false;
  const p = productSlug.toLowerCase();
  const t = targetSlug.toLowerCase();
  if (p === t) return true;
  if (
    (p === "garmin-handheld-gps" || p === "handheld-gps") &&
    (t === "garmin-handheld-gps" || t === "handheld-gps")
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

export function ProductsCatalogueBrowser({
  products,
  categories,
  initialCategory = "all",
  initialSubcategory = "all",
  initialBrand = "all",
}: ProductsCatalogueBrowserProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(initialSubcategory);
  const [selectedBrand, setSelectedBrand] = useState<string>(initialBrand);

  // Available brands derived dynamically from verified products
  const availableBrands = useMemo(() => {
    const brands = new Set<string>();
    products.forEach((p) => {
      if (p.brand) {
        if (selectedCategory === "all" || p.categorySlug.toLowerCase() === selectedCategory.toLowerCase()) {
          brands.add(p.brand);
        }
      }
    });
    return Array.from(brands).sort();
  }, [products, selectedCategory]);

  // Available subcategories derived from selected category
  const availableSubcategories = useMemo(() => {
    if (selectedCategory === "all") {
      const subcats = new Map<string, string>();
      products.forEach((p) => {
        if (p.subcategory && p.subcategorySlug) {
          subcats.set(p.subcategorySlug, p.subcategory);
        }
      });
      return Array.from(subcats.entries()).map(([slug, name]) => ({ slug, name }));
    }
    const cat = categories.find((c) => c.slug.toLowerCase() === selectedCategory.toLowerCase());
    return cat?.subcategories?.map((s) => ({ slug: s.slug, name: s.name })) || [];
  }, [categories, products, selectedCategory]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category match
      if (selectedCategory !== "all" && p.categorySlug.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      // Subcategory match
      if (selectedSubcategory !== "all") {
        if (!isSubcategoryMatch(p.subcategorySlug, selectedSubcategory)) {
          return false;
        }
      }
      // Brand match
      if (selectedBrand !== "all") {
        if (!p.brand || p.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
          return false;
        }
      }
      return true;
    });
  }, [products, selectedCategory, selectedSubcategory, selectedBrand]);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    setSelectedSubcategory("all");
    // If the currently selected brand isn't in the new category, reset brand to "all"
    if (selectedBrand !== "all") {
      const brandStillValid = products.some(
        (p) =>
          (slug === "all" || p.categorySlug.toLowerCase() === slug.toLowerCase()) &&
          p.brand?.toLowerCase() === selectedBrand.toLowerCase()
      );
      if (!brandStillValid) {
        setSelectedBrand("all");
      }
    }
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedSubcategory("all");
    setSelectedBrand("all");
  };

  const hasActiveFilters =
    selectedCategory !== "all" || selectedSubcategory !== "all" || selectedBrand !== "all";

  return (
    <div className="space-y-8">
      {/* Lightweight Filter Controls Container */}
      <div className="p-5 sm:p-6 rounded-2xl border border-border/80 bg-surface shadow-xs space-y-5">
        {/* Row 1: Category Filter Pills */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="font-sans text-xs text-text-muted font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-green" />
              <span>Filter by Equipment Discipline</span>
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-sans text-brand-green hover:underline flex items-center gap-1 font-medium"
              >
                <X className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleCategoryChange("all")}
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-sans font-medium transition-all min-h-[36px]",
                selectedCategory === "all"
                  ? "bg-brand-green text-white border-brand-green shadow-xs"
                  : "bg-surface-secondary/70 border-border/80 text-text-secondary hover:text-text-primary hover:border-brand-green/40"
              )}
            >
              <span>All Disciplines</span>
              <span className="font-mono text-[11px] opacity-80">({products.length})</span>
            </button>
            {categories.map((c) => {
              const theme = getCategoryTheme(c.slug);
              const count = products.filter((p) => p.categorySlug.toLowerCase() === c.slug.toLowerCase()).length;
              const isSelected = selectedCategory === c.slug;
              return (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => handleCategoryChange(c.slug)}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-sans font-medium transition-all min-h-[36px]",
                    isSelected
                      ? "bg-text-primary text-surface border-text-primary shadow-xs"
                      : "bg-surface text-text-secondary border-border/80 hover:text-text-primary hover:border-brand-green/40"
                  )}
                >
                  <span
                    className="font-mono text-[11px] font-semibold"
                    style={{ color: isSelected ? "#FFFFFF" : theme.accent }}
                  >
                    {String(c.order).padStart(2, "0")}
                  </span>
                  <span>{c.name}</span>
                  {count > 0 && (
                    <span className="font-mono text-[11px] text-text-muted">
                      ({count})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Subcategory Pills (when available) */}
        {availableSubcategories.length > 0 && (
          <div className="pt-3 border-t border-border/60">
            <span className="font-sans text-[11px] text-text-muted block mb-2 font-semibold uppercase tracking-wider">
              Subcategory:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedSubcategory("all")}
                className={cn(
                  "px-3 py-1 rounded-full border text-xs font-sans font-medium transition-all",
                  selectedSubcategory === "all"
                    ? "bg-brand-green text-white border-brand-green"
                    : "bg-surface text-text-secondary border-border/80 hover:border-brand-green/40"
                )}
              >
                All Subcategories
              </button>
              {availableSubcategories.map((subcat) => {
                const isSelected = selectedSubcategory === subcat.slug;
                const count = products.filter(
                  (p) =>
                    (selectedCategory === "all" || p.categorySlug.toLowerCase() === selectedCategory.toLowerCase()) &&
                    p.subcategorySlug?.toLowerCase() === subcat.slug.toLowerCase()
                ).length;
                return (
                  <button
                    key={subcat.slug}
                    type="button"
                    onClick={() => setSelectedSubcategory(subcat.slug)}
                    className={cn(
                      "inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-sans font-medium transition-all",
                      isSelected
                        ? "bg-brand-green text-white border-brand-green"
                        : "bg-surface text-text-secondary border-border/80 hover:border-brand-green/40"
                    )}
                  >
                    <span>{subcat.name}</span>
                    {count > 0 && (
                      <span className="font-mono text-[10px] opacity-75">({count})</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Row 3: Brand Filter Pills */}
        {availableBrands.length > 0 && (
          <div className="pt-3 border-t border-border/60">
            <span className="font-sans text-[11px] text-text-muted block mb-2 font-semibold uppercase tracking-wider">
              Manufacturer / Brand:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedBrand("all")}
                className={cn(
                  "px-3 py-1 rounded-full border text-xs font-sans font-medium transition-all",
                  selectedBrand === "all"
                    ? "bg-text-primary text-surface border-text-primary"
                    : "bg-surface text-text-secondary border-border/80 hover:border-brand-green/40"
                )}
              >
                All Brands
              </button>
              {availableBrands.map((brand) => {
                const isSelected = selectedBrand.toLowerCase() === brand.toLowerCase();
                const count = products.filter(
                  (p) =>
                    (selectedCategory === "all" || p.categorySlug.toLowerCase() === selectedCategory.toLowerCase()) &&
                    (selectedSubcategory === "all" || p.subcategorySlug?.toLowerCase() === selectedSubcategory.toLowerCase()) &&
                    p.brand?.toLowerCase() === brand.toLowerCase()
                ).length;
                return (
                  <button
                    key={brand}
                    type="button"
                    onClick={() => setSelectedBrand(brand)}
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

      {/* Catalogue Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-border/70">
        <div>
          <div className="flex items-center gap-2 font-sans text-xs text-brand-green mb-1 font-semibold">
            <span>Verified Equipment Instruments</span>
            <span className="text-border-strong">•</span>
            <span className="text-text-muted font-normal">
              {selectedCategory === "all"
                ? "All Disciplines"
                : categories.find((c) => c.slug === selectedCategory)?.name}
            </span>
            {selectedSubcategory !== "all" && (
              <>
                <span className="text-border-strong">•</span>
                <span className="text-text-primary font-medium">
                  {availableSubcategories.find((s) => s.slug === selectedSubcategory)?.name}
                </span>
              </>
            )}
            {selectedBrand !== "all" && (
              <>
                <span className="text-border-strong">•</span>
                <span className="text-brand-green font-semibold">{selectedBrand}</span>
              </>
            )}
          </div>
          <h2 className="font-display font-semibold text-2xl sm:text-3xl text-text-primary tracking-[-0.025em]">
            Verified Instruments ({filteredProducts.length})
          </h2>
        </div>
        <span className="font-sans text-xs text-text-muted">
          Institutional Supply · Direct Quotation Coordination
        </span>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="p-12 border border-border/80 bg-surface rounded-2xl text-center space-y-4 shadow-xs max-w-xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-surface-secondary border border-border/80 flex items-center justify-center mx-auto text-text-muted">
            <Filter className="w-5 h-5 text-text-muted" />
          </div>
          <h3 className="font-display font-semibold text-xl text-text-primary">
            No instruments match the selected criteria
          </h3>
          <p className="font-sans text-sm text-text-secondary leading-relaxed">
            No equipment items were found for the current combination of discipline, subcategory, and manufacturer.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-green text-white font-sans text-sm font-semibold rounded-xl hover:bg-brand-green-hover transition-colors shadow-xs"
          >
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}
