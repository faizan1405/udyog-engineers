import React from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { AppImage } from "@/components/ui/AppImage";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
  product: Product;
  className?: string;
}

/**
 * Minimal structural Product Card placeholder.
 * Full visual design and micro-interactions will be built in the next design phase.
 */
export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <article
      className={cn(
        "group flex flex-col border border-border bg-surface rounded-[2px] overflow-hidden hover:border-accent-primary transition-colors duration-200 ease-precision",
        className
      )}
    >
      {/* Product Image Placeholder */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-[4/3] bg-surface-secondary overflow-hidden">
        <AppImage
          src={product.heroImage}
          alt={product.name}
          aspectRatioClass="aspect-[4/3]"
          className="transition-transform duration-300 ease-precision group-hover:scale-[1.03]"
        />
        {product.isDemoPlaceholder && (
          <span className="absolute top-2 left-2 z-10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 rounded-[2px]">
            Demo Data
          </span>
        )}
      </Link>

      {/* Product Content */}
      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-center justify-between text-[11px] mb-1.5">
          <span className="font-mono uppercase tracking-wider text-accent font-semibold">{product.category}</span>
          {product.model && <span className="font-mono text-text-muted">{product.model}</span>}
        </div>

        <h3 className="font-display font-semibold text-text-primary text-sm line-clamp-1 group-hover:text-accent transition-colors duration-200 ease-precision">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>

        <p className="mt-1.5 text-xs text-text-secondary line-clamp-2 leading-relaxed flex-1">
          {product.shortDescription}
        </p>

        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
          <Link
            href={`/products/${product.slug}`}
            className="group inline-flex items-center gap-1 font-display font-semibold text-xs text-accent hover:text-accent-hover transition-colors duration-150"
          >
            <span>View Specifications</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 ease-precision group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider">Inquiry Only</span>
        </div>
      </div>
    </article>
  );
}
