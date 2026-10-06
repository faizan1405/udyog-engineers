import React from "react";
import { cn } from "@/lib/utils";

export interface ProductHighlightsProps {
  highlights: string[];
  className?: string;
}

/**
 * KEY TECHNICAL HIGHLIGHTS
 * Adheres to R2 visual system:
 * - Rounded-2xl cards with warm hover
 * - Clean numeric indexing with IBM Plex Mono
 * - No corner + crosshairs
 */
export function ProductHighlights({
  highlights,
  className,
}: ProductHighlightsProps) {
  if (!highlights || highlights.length === 0) {
    return null;
  }

  const visibleHighlights = highlights.slice(0, 6);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between border-b border-border/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-green" />
          <h2 className="text-xs font-sans tracking-wider text-text-primary font-semibold uppercase">
            Key Attributes &amp; Capabilities
          </h2>
        </div>
        <span className="font-sans text-xs text-text-muted">
          Highlights ·{" "}
          <span className="font-mono">{String(visibleHighlights.length).padStart(2, "0")}</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleHighlights.map((highlight, idx) => {
          const indexNum = String(idx + 1).padStart(2, "0");
          return (
            <div
              key={idx}
              className="p-5 sm:p-6 border border-border/80 bg-surface rounded-2xl shadow-xs hover:border-brand-green/40 hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20">
                  {indexNum}
                </span>
              </div>

              <p className="text-sm sm:text-[15px] font-sans text-text-primary font-medium leading-[1.6]">
                {highlight}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
