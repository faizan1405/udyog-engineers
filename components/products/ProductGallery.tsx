"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Product } from "@/types/product";
import { cn, assetPath } from "@/lib/utils";

export interface ProductGalleryProps {
  product: Product;
  className?: string;
}

/**
 * TECHNICAL PRODUCT GALLERY
 *
 * An art-directed equipment dossier imaging canvas adhering to Phase 5B:
 * - Desktop: Large main imaging area with restrained thumbnail rail
 * - Mobile: Touch-friendly gallery with min 48px targets and responsive visibility
 * - Graceful staging state with technical crosshairs & concentric optical reticle
 * - Clear identification of demo placeholder assets
 * - Light Mode only design tokens with hairline rules
 */
export function ProductGallery({ product, className }: ProductGalleryProps) {
  // Deduplicate and consolidate image sources
  const images = React.useMemo(() => {
    const list: string[] = [];
    if (product.heroImage) list.push(product.heroImage);
    if (product.gallery && Array.isArray(product.gallery)) {
      product.gallery.forEach((img) => {
        if (img && !list.includes(img)) {
          list.push(img);
        }
      });
    }
    return list.length > 0 ? list : ["/images/products/placeholder-product.svg"];
  }, [product.heroImage, product.gallery]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [reticleOverlay, setReticleOverlay] = useState(true);

  const rawActiveSrc = images[activeIndex] || "/images/products/placeholder-product.svg";
  const activeSrc = assetPath(rawActiveSrc);
  const isSvgPlaceholder =
    activeSrc.endsWith(".svg") || activeSrc.includes("placeholder");

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={`${product.name} technical image dossier`}
      className={cn("w-full space-y-3", className)}
    >
      {/* Primary Hardware Imaging Dossier Plate */}
      <div className="relative w-full border border-border bg-surface rounded-[2px] overflow-hidden shadow-[0_1px_3px_rgba(20,23,21,0.03)]">
        {/* 4 Corner Crosshairs */}
        <span
          aria-hidden="true"
          className="absolute top-2 left-2 font-mono text-[10px] text-accent-secondary/50 select-none z-20 pointer-events-none"
        >
          +
        </span>
        <span
          aria-hidden="true"
          className="absolute top-2 right-2 font-mono text-[10px] text-accent-secondary/50 select-none z-20 pointer-events-none"
        >
          +
        </span>
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-2 font-mono text-[10px] text-accent-secondary/50 select-none z-20 pointer-events-none"
        >
          +
        </span>
        <span
          aria-hidden="true"
          className="absolute bottom-2 right-2 font-mono text-[10px] text-accent-secondary/50 select-none z-20 pointer-events-none"
        >
          +
        </span>

        {/* Top Telemetry Header Bar */}
        <div className="flex items-center justify-between px-3.5 py-2 border-b border-border bg-surface-secondary/70 text-[10px] font-mono text-text-muted">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                product.isDemoPlaceholder
                  ? "bg-amber-600"
                  : "bg-accent-secondary"
              )}
            />
            <span className="uppercase tracking-wider font-medium text-text-primary">
              IMAGE DOSSIER {"//"} {String(activeIndex + 1).padStart(2, "0")} OF{" "}
              {String(images.length).padStart(2, "0")}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {product.model && (
              <span className="hidden sm:inline text-text-muted uppercase tracking-wider">
                REF {"//"} {product.model}
              </span>
            )}
            <button
              type="button"
              onClick={() => setReticleOverlay((prev) => !prev)}
              title="Toggle optical reticle guide"
              aria-label="Toggle optical reticle guide"
              className="text-[9px] uppercase tracking-wider text-text-secondary hover:text-text-primary px-1.5 py-0.5 rounded-[2px] border border-border bg-surface"
            >
              {reticleOverlay ? "Reticle: On" : "Reticle: Off"}
            </button>
          </div>
        </div>

        {/* Main Visual Display Canvas */}
        <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full flex items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-surface to-surface-secondary/35 overflow-hidden">
          {/* Precision Staging Grid (Subtle) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none opacity-[0.35] bg-[linear-gradient(to_right,#E2DFD6_1px,transparent_1px),linear-gradient(to_bottom,#E2DFD6_1px,transparent_1px)] bg-[size:32px_32px]"
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
              <circle cx="300" cy="225" r="4" fill="#9C824A" />
            </svg>
          )}

          {/* Product Image */}
          <div className="relative w-full h-full flex items-center justify-center z-10">
            <Image
              src={activeSrc}
              alt={`${product.name} - Angle ${activeIndex + 1}`}
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

          {/* Demo Staging Watermark Notice */}
          {product.isDemoPlaceholder && (
            <div className="absolute bottom-3 left-3 z-20 max-w-[calc(100%-1.5rem)] inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50/95 border border-amber-300 text-amber-900 rounded-[2px] text-[10px] font-mono tracking-wider shadow-xs backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
              <span className="truncate">STAGED DEMO SPECIMEN {"//"} FIELD RECORD PENDING</span>
            </div>
          )}

            {/* Next / Previous Controls (when multiple images exist) */}
            {images.length > 1 && (
              <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex items-center justify-between z-20 pointer-events-none">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous product image"
                  className="pointer-events-auto min-w-[44px] min-h-[44px] w-11 h-11 sm:min-w-[48px] sm:min-h-[48px] sm:w-12 sm:h-12 flex items-center justify-center rounded-[2px] bg-surface/90 border border-border hover:border-text-primary text-text-primary shadow-xs transition-colors duration-200 ease-precision focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next product image"
                  className="pointer-events-auto min-w-[44px] min-h-[44px] w-11 h-11 sm:min-w-[48px] sm:min-h-[48px] sm:w-12 sm:h-12 flex items-center justify-center rounded-[2px] bg-surface/90 border border-border hover:border-text-primary text-text-primary shadow-xs transition-colors duration-200 ease-precision focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Bottom Technical Scale Indicator */}
          <div className="flex items-center justify-between px-3.5 py-1.5 border-t border-border bg-surface-secondary/40 text-[10px] font-mono text-text-muted">
            <div className="flex items-center gap-2">
              <span className="text-accent-secondary font-semibold">CALIBRATION:</span>
              <span>STANDARD FIELD ORIENTATION</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3 h-3 text-text-muted" />
              <span>1:1 METROLOGY PLATE</span>
            </div>
          </div>
        </div>

        {/* Restrained Thumbnail / Alternate Image Strip */}
        {images.length > 1 && (
          <div
            role="tablist"
            aria-label="Product image thumbnails"
            className="flex items-center gap-2.5 overflow-x-auto pb-1.5 pt-0.5 scrollbar-thin"
          >
            {images.map((img, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`View specimen image ${idx + 1}`}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "relative flex-shrink-0 w-20 h-16 sm:w-24 sm:h-18 rounded-[2px] border overflow-hidden bg-surface transition-colors duration-200 ease-precision min-h-[48px]",
                    isSelected
                      ? "border-accent ring-1 ring-accent"
                      : "border-border hover:border-border-strong opacity-80 hover:opacity-100"
                  )}
                >
                <Image
                  src={assetPath(img)}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  fill
                  sizes="96px"
                  className="object-contain p-1"
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute bottom-0 right-0 px-1 py-0.2 text-[9px] font-mono",
                    isSelected
                      ? "bg-accent text-white"
                      : "bg-surface-secondary/90 text-text-muted border-t border-l border-border"
                  )}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
