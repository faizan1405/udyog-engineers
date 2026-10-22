import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ProductCategory } from "@/types/category";
import { ArrowRight } from "lucide-react";
import { cn, assetPath } from "@/lib/utils";
import { getCategoryTheme } from "@/config/categoryThemes";

export interface CategoryCardProps {
  category: ProductCategory;
  className?: string;
}

/**
 * Editorial Category Card with full-bleed product photography.
 */
export function CategoryCard({ category, className }: CategoryCardProps) {
  const theme = getCategoryTheme(category.slug);
  const imageSrc = category.image || category.heroImage;

  return (
    <Link
      href={`/categories/${category.slug}`}
      className={cn(
        "group flex flex-col border border-border/80 bg-surface rounded-2xl overflow-hidden hover:border-brand-green/50 hover:shadow-md transition-all duration-300 ease-out",
        className
      )}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden p-3 sm:p-4 flex items-center justify-center"
        style={{ backgroundColor: theme.bgLight }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${theme.accent}15 0%, transparent 70%)`,
          }}
        />
        {imageSrc ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={assetPath(imageSrc)}
              alt={category.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04] drop-shadow-[0_8px_18px_rgba(20,23,21,0.09)]"
            />
          </div>
        ) : null}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span
            className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded-full border"
            style={{
              backgroundColor: `${theme.bgLight}`,
              borderColor: `${theme.borderLight}`,
              color: theme.accent,
            }}
          >
            {theme.index} · {category.name}
          </span>
          <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-brand-green group-hover:translate-x-1 transition-all duration-200" />
        </div>
        <h3 className="font-display font-semibold text-lg text-text-primary group-hover:text-brand-green transition-colors duration-200 tracking-[-0.02em]">
          {category.name}
        </h3>
        <p className="font-sans text-sm text-text-secondary leading-relaxed line-clamp-2 mt-1 flex-1">
          {category.shortDescription}
        </p>
      </div>
    </Link>
  );
}
