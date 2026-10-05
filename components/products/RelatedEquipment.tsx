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
 *
 * Implements a restrained related equipment showcase (Phase 5B):
 * - Renders verified related products (demo items excluded)
 * - If no related products exist, provides a subtle link back to parent category
 * - Compact catalogue presentation, avoiding ecommerce carousel patterns
 */
export function RelatedEquipment({
  product,
  relatedProducts,
  className,
}: RelatedEquipmentProps) {
  // If verified related products exist
  if (relatedProducts.length > 0) {
    return (
      <section className={cn("space-y-6", className)}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border pb-3">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-accent-secondary uppercase tracking-wider mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary" />
              <span>RELATED {"//"} EQUIPMENT</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-display text-text-primary tracking-tight">
              Related Equipment
            </h3>
          </div>

          <Link
            href={`/categories/${product.categorySlug}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:underline shrink-0"
          >
            <span>Explore All {product.category}</span>
            <ArrowRight className="w-3.5 h-3.5" />
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

  // If no related products exist: Subtle link back to parent category
  return (
    <section className={cn("border border-border bg-surface rounded-[2px] p-6 sm:p-8", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-[11px] font-mono text-accent-secondary uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-secondary" />
            <span>DISCIPLINE {"//"} CATEGORY PORTFOLIO</span>
          </div>
          <h3 className="text-xl font-bold font-display text-text-primary">
            Explore {product.category} Equipment
          </h3>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            Review the full range of certified {product.category.toLowerCase()} field instruments, technical parameters, and institutional supply specifications.
          </p>
        </div>

        <Link
          href={`/categories/${product.categorySlug}`}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[48px] bg-surface-secondary border border-border-strong text-text-primary text-xs font-display font-semibold rounded-[2px] hover:bg-surface-tertiary transition-colors shrink-0"
        >
          <span>Explore {product.category} Equipment</span>
          <ArrowUpRight className="w-4 h-4 text-accent" />
        </Link>
      </div>
    </section>
  );
}
