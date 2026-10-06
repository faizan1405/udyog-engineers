import React from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { AppImage } from "@/components/ui/AppImage";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getCategoryTheme } from "@/config/categoryThemes";

export interface ProductCardProps {
  product: Product;
  className?: string;
}

/**
 * Modern Editorial Product Card
 * Adheres to R2 visual system:
 * - Rounded-2xl card with soft border and subtle hover lift
 * - Category-accented tag
 * - Clean DM Sans text hierarchy & Sora display title
 * - No internal development labels exposed
 */
export function ProductCard({ product, className }: ProductCardProps) {
  const theme = getCategoryTheme(product.categorySlug);

  return (
    <article
      className={cn(
        "group flex flex-col border border-border/80 bg-surface rounded-2xl overflow-hidden hover:border-accent/40 hover:shadow-md transition-all duration-300 ease-out",
        className
      )}
    >
      {/* Product Image Canvas */}
      <Link
        href={`/products/${product.slug}`}
        className="block relative aspect-[4/3] bg-surface-secondary/40 overflow-hidden p-4"
        style={{
          backgroundColor: `${theme.bgLight}66`,
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${theme.accent}15 0%, transparent 70%)`,
          }}
        />
        <div className="relative w-full h-full flex items-center justify-center">
          <AppImage
            src={product.heroImage}
            alt={product.name}
            aspectRatioClass="aspect-[4/3]"
            className="transition-transform duration-500 ease-out group-hover:scale-[1.03] object-contain drop-shadow-[0_4px_12px_rgba(20,23,21,0.06)]"
          />
        </div>
      </Link>

      {/* Product Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <div className="flex items-center justify-between text-xs mb-2 font-sans">
          <span
            className="font-semibold px-2 py-0.5 rounded-full text-[11px] border"
            style={{
              backgroundColor: theme.bgLight,
              borderColor: `${theme.borderLight}99`,
              color: theme.accent,
            }}
          >
            {product.category}
          </span>
          {product.model && (
            <span className="font-mono text-text-muted text-[11px]">
              {product.model}
            </span>
          )}
        </div>

        <h3 className="font-display font-semibold text-text-primary text-base sm:text-lg line-clamp-1 group-hover:text-accent transition-colors duration-200 tracking-[-0.02em]">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>

        <p className="mt-2 text-xs sm:text-sm font-sans text-text-secondary line-clamp-2 leading-relaxed flex-1">
          {product.shortDescription}
        </p>

        <div className="mt-5 pt-3.5 border-t border-border/70 flex items-center justify-between text-xs font-sans">
          <Link
            href={`/products/${product.slug}`}
            className="group/link inline-flex items-center gap-1 font-sans font-semibold text-xs sm:text-[13px] text-accent hover:text-accent-hover transition-colors duration-150"
          >
            <span>View Specifications</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 ease-out group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
          <span className="text-xs text-text-muted">Direct Quotation</span>
        </div>
      </div>
    </article>
  );
}
