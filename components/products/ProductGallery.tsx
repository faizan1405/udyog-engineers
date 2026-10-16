"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { cn, assetPath } from "@/lib/utils";

export interface ProductGalleryProps {
  product: Product;
  className?: string;
}

/**
 * Modern Equipment Product Gallery
 * Adheres to R2 visual system:
 * - Rounded-2xl main showcase plate with soft borders
 * - Clean DM Sans micro-copy, no old dossier tags
 * - Rounded controls and thumbnails
 */
export function ProductGallery({ product, className }: ProductGalleryProps) {
  const images: string[] =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.heroImage];

  const [activeIndex, setActiveIndex] = useState(0);
  const [reticleOverlay, setReticleOverlay] = useState(false);

  const activeSrc = images[activeIndex] || product.heroImage;
  const isSvgPlaceholder = activeSrc.endsWith(".svg");

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className={cn("space-y-4", className)}
      role="region"
      aria-label={`${product.name} equipment gallery`}
    >
      {/* Primary Hardware Showcase Plate */}
      <div className="relative border border-border/80 bg-surface rounded-2xl overflow-hidden shadow-xs">
        {/* Top Header Plate Strip */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 border-b border-border/70 bg-surface-secondary/40 text-xs font-sans">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full bg-brand-green ring-2 ring-brand-green/20"
              aria-hidden="true"
            />
            <span className="font-sans font-medium text-text-primary text-xs">
              Equipment View · <span className="font-mono">{String(activeIndex + 1).padStart(2, "0")}</span> of{" "}
              <span className="font-mono">{String(images.length).padStart(2, "0")}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            {product.model && (
              <span className="hidden sm:inline text-text-muted text-xs font-sans">
                Ref · <span className="font-mono">{product.model}</span>
              </span>
            )}
            <button
              type="button"
              onClick={() => setReticleOverlay((prev) => !prev)}
              title="Toggle optical reticle guide"
              aria-label="Toggle optical reticle guide"
              className="text-[10px] text-text-secondary hover:text-text-primary px-2 py-0.5 rounded-full border border-border bg-surface font-sans font-medium"
            >
              {reticleOverlay ? "Reticle: On" : "Reticle: Off"}
            </button>
          </div>
        </div>

        {/* Main Visual Display Canvas */}
        <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full flex items-center justify-center p-4 sm:p-8 bg-gradient-to-b from-surface to-surface-secondary/35 overflow-hidden">
          {/* Subtle Grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-[0.25] bg-[linear-gradient(to_right,#E2DFD6_1px,transparent_1px),linear-gradient(to_bottom,#E2DFD6_1px,transparent_1px)] bg-[size:32px_32px]"
          />

          {/* Concentric Optical Reticle Overlay */}
          {reticleOverlay && (
            <svg
              aria-hidden="true"
              className="absolute inset-0 w-full h-full pointer-events-none opacity-20 stroke-border-strong select-none"
              viewBox="0 0 600 450"
              fill="none"
            >
              <circle cx="300" cy="225" r="150" strokeDasharray="3 3" />
              <circle cx="300" cy="225" r="95" />
              <line x1="300" y1="40" x2="300" y2="410" strokeDasharray="4 4" />
              <line x1="120" y1="225" x2="480" y2="225" strokeDasharray="4 4" />
              <line x1="120" y1="225" x2="480" y2="225" strokeDasharray="4 4" />
              <circle cx="300" cy="225" r="4" fill="#1E6B3E" />
            </svg>
          )}

          {/* Product Image */}
          <div className="relative w-full h-full flex items-center justify-center z-10">
            <Image
              src={assetPath(activeSrc)}
              alt={`${product.name} - View ${activeIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 55vw, 50vw"
              priority={activeIndex === 0}
              className={cn(
                "object-contain transition-opacity duration-200",
                isSvgPlaceholder
                  ? "p-2 opacity-95"
                  : "drop-shadow-[0_12px_24px_rgba(20,23,21,0.06)]"
              )}
            />
          </div>

          {/* Next / Previous Controls (when multiple images exist) */}
          {images.length > 1 && (
            <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 flex items-center justify-between z-20 pointer-events-none">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous product image"
                className="pointer-events-auto min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-full bg-surface/90 border border-border hover:border-brand-green text-text-primary shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-brand-green"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next product image"
                className="pointer-events-auto min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-full bg-surface/90 border border-border hover:border-brand-green text-text-primary shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-brand-green"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Bottom Scale Indicator */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-border/70 bg-surface-secondary/40 text-xs font-sans text-text-muted">
          <div className="flex items-center gap-2">
            <span className="text-brand-green font-semibold">Orientation:</span>
            <span>Standard Field View</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-text-muted" />
            <span>Standard Scale</span>
          </div>
        </div>
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div
          role="tablist"
          aria-label="Product image thumbnails"
          className="flex items-center gap-3 overflow-x-auto pb-1 pt-0.5"
        >
          {images.map((img, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-label={`View image ${idx + 1}`}
                onClick={() => setActiveIndex(idx)}
                className={cn(
                  "relative flex-shrink-0 w-20 h-16 sm:w-24 sm:h-18 rounded-xl border overflow-hidden bg-surface transition-all min-h-[48px]",
                  isSelected
                    ? "border-brand-green ring-2 ring-brand-green/20"
                    : "border-border/80 hover:border-brand-green/50 opacity-80 hover:opacity-100"
                )}
              >
                <Image
                  src={assetPath(img)}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  fill
                  sizes="96px"
                  className="object-contain p-1"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
