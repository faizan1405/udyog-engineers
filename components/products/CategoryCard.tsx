import React from "react";
import Link from "next/link";
import { ProductCategory } from "@/types/category";
import { AppImage } from "@/components/ui/AppImage";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CategoryCardProps {
  category: ProductCategory;
  className?: string;
}

/**
 * Minimal structural Category Card.
 */
export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className={cn(
        "group flex flex-col border border-border bg-surface rounded-[2px] overflow-hidden hover:border-accent-primary transition-colors duration-200 ease-precision",
        className
      )}
    >
      <div className="relative aspect-[16/10] bg-surface-secondary overflow-hidden">
        <AppImage
          src={category.image}
          alt={category.name}
          aspectRatioClass="aspect-[16/10]"
          className="transition-transform duration-300 ease-precision group-hover:scale-[1.03]"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-text-primary text-base group-hover:text-accent transition-colors duration-200 ease-precision">
            {category.name}
          </h3>
          <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-200 ease-precision" />
        </div>
        <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
          {category.shortDescription}
        </p>
      </div>
    </Link>
  );
}
