import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn, assetPath } from "@/lib/utils";

export interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "custom";
}

const SIZE_MAP = {
  sm: "h-8 sm:h-9", // Mobile header / compact
  md: "h-9 sm:h-10 md:h-11", // Desktop header standard
  lg: "h-11 sm:h-12 md:h-14", // Footer / prominent cards
  xl: "h-14 sm:h-16 md:h-20", // About page hero / dossier
  custom: "",
};

/**
 * Official Udyog Engineers Brand Logo Component (Phase 6C).
 * Uses the authentic client-provided logo as the single source of truth.
 * Preserves exact proportions (445 × 195, 2.28:1 aspect ratio) without distortion or stretching.
 */
export function BrandLogo({
  className = "",
  imageClassName = "",
  priority = false,
  size = "md",
}: BrandLogoProps) {
  return (
    <div className={cn("inline-flex items-center select-none", className)}>
      <Image
        src={assetPath("/images/brand/logo.png")}
        alt={siteConfig.companyName}
        width={445}
        height={195}
        priority={priority}
        className={cn(
          "w-auto object-contain transition-opacity duration-200",
          SIZE_MAP[size],
          imageClassName
        )}
      />
    </div>
  );
}
