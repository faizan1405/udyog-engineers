import React from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/products/ProductCard";
import { cn } from "@/lib/utils";

export interface RelatedEquipmentProps {
  product: Product;
  relatedProducts: Product[];
  className?: string;
}

/**
 * RELATED EQUIPMENT SECTION
 * Adheres to R2 visual system:
 * - Rounded-2xl cards and CTA blocks
 * - Smooth layout and clean DM Sans typography
 */
export function RelatedEquipment({
  product,
  relatedProducts,
  className,
}: RelatedEquipmentProps) {
  if (relatedProducts.length > 0) {
    return (
      <section className={cn("space-y-6", className)}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-border/80 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-sans text-brand-green mb-1 font-semibold">
              <span className="w-2 h-2 rounded-full bg-brand-green" />
              <span>Related Equipment</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold font-display text-text-primary tracking-[-0.02em]">
              Related Equipment
            </h3>
          </div>

          <Link
            href={`/categories/${product.categorySlug}`}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-sans font-semibold text-brand-green hover:underline shrink-0"
          >
            <span>Explore All {product.category}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((relProduct) => (
            <ProductCard key={relProduct.id} product={relProduct} />
          ))}
        </div>
      </section>
    );
  }

  // Fallback: Link back to parent category
  return (
    <section className={cn("border border-border/80 bg-surface rounded-2xl p-8 sm:p-10 shadow-xs", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-sans text-brand-green font-semibold">
            <span className="w-2 h-2 rounded-full bg-brand-green" />
            <span>Discipline Category</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold font-display text-text-primary tracking-[-0.02em]">
            Explore {product.category} Equipment
          </h3>
          <p className="text-sm font-sans text-text-secondary leading-[1.6]">
            Review the full range of certified {product.category.toLowerCase()} field instruments, technical parameters, and institutional supply specifications.
          </p>
        </div>

        <Link
          href={`/categories/${product.categorySlug}`}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] bg-brand-green text-white text-[15px] font-sans font-semibold rounded-xl hover:bg-brand-green-hover transition-colors shrink-0 tracking-normal shadow-xs"
        >
          <span>Explore {product.category}</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
