import React from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { AppImage } from "@/components/ui/AppImage";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";
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
 * - Direct WhatsApp Inquiry conversion button with product-specific prefilled message
 */
export function ProductCard({ product, className }: ProductCardProps) {
  const theme = getCategoryTheme(product.categorySlug);
  const whatsAppUrl = buildWhatsAppInquiryUrl({ productName: product.name });

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
        className="block relative aspect-[4/3] bg-surface-secondary/40 overflow-hidden p-2.5 sm:p-3"
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
            alt={product.imageAlt || product.name}
            aspectRatioClass="aspect-[4/3]"
            containerClassName="w-full h-full bg-transparent"
            className="transition-transform duration-500 ease-out group-hover:scale-[1.03] object-contain drop-shadow-[0_4px_12px_rgba(20,23,21,0.06)]"
          />
        </div>
      </Link>

      {/* Product Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2 text-xs mb-2 font-sans">
          <div className="flex items-center gap-1.5">
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
            {product.brand && (
              <span className="font-sans font-semibold text-text-primary text-[11px]">
                {product.brand}
              </span>
            )}
          </div>
          {product.subcategory ? (
            <span className="font-sans text-text-muted text-[11px] truncate max-w-[140px]">
              {product.subcategory}
            </span>
          ) : product.model ? (
            <span className="font-mono text-text-muted text-[11px]">
              {product.model}
            </span>
          ) : null}
        </div>

        <h3 className="font-display font-semibold text-text-primary text-base sm:text-lg line-clamp-1 group-hover:text-accent transition-colors duration-200 tracking-[-0.02em]">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>

        <p className="mt-2 text-xs sm:text-sm font-sans text-text-secondary line-clamp-2 leading-relaxed flex-1">
          {product.shortDescription}
        </p>

        {/* Dual Actions: View Specifications + WhatsApp Inquiry */}
        <div className="mt-5 pt-3.5 border-t border-border/70 flex flex-col min-[380px]:flex-row items-stretch min-[380px]:items-center justify-between gap-2 text-xs font-sans">
          <Link
            href={`/products/${product.slug}`}
            className="group/link inline-flex items-center gap-1 font-sans font-semibold text-xs sm:text-[13px] text-accent hover:text-accent-hover transition-colors duration-150 py-1"
          >
            <span>View Specifications</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 ease-out group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>

          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-accent-whatsapp text-emerald-800 hover:text-white border border-emerald-300/80 rounded-lg font-sans font-semibold text-xs transition-colors duration-200 shadow-2xs"
            title={`Inquire about ${product.name} on WhatsApp`}
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
            <span>Inquire on WhatsApp</span>
          </a>
        </div>
      </div>
    </article>
  );
}
