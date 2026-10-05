import React from "react";
import Image, { ImageProps } from "next/image";
import { cn, assetPath } from "@/lib/utils";

export interface AppImageProps extends Omit<ImageProps, "alt"> {
  /** Descriptive alternative text for accessibility (mandatory) */
  alt: string;
  /** Optional aspect ratio wrapper class e.g. "aspect-video", "aspect-square", "aspect-4/3" */
  aspectRatioClass?: string;
  /** Container class if wrapping in a responsive box */
  containerClassName?: string;
  /** Fallback image URL if source fails or is empty */
  fallbackSrc?: string;
}

/**
 * Reusable image component wrapping Next.js Image.
 * Supports responsive sizing, aspect ratios, lazy loading by default,
 * and graceful fallback handling without external stock assets.
 */
export function AppImage({
  src,
  alt,
  aspectRatioClass,
  containerClassName,
  className,
  fallbackSrc = "/images/general/placeholder.svg",
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  ...props
}: AppImageProps) {
  const finalSrc = assetPath(src ? String(src) : fallbackSrc);

  if (aspectRatioClass) {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-surface-secondary",
          aspectRatioClass,
          containerClassName
        )}
      >
        <Image
          src={finalSrc}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover transition-opacity duration-300", className)}
          {...props}
        />
      </div>
    );
  }

  return (
    <Image
      src={finalSrc}
      alt={alt}
      sizes={sizes}
      priority={priority}
      className={className}
      {...props}
    />
  );
}
